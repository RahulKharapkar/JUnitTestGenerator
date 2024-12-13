import { TestConfig, CodeInput, TestCase, ParsedResponse } from '../types';

interface ApiResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

export class ApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

export async function generateTestCases(
  config: TestConfig,
  input: CodeInput
): Promise<ParsedResponse> {
  try {
    const prompt = createPrompt(config, input);
    const response = await fetch('https://gptwrapper.onrender.com/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    if (!response.ok) {
      throw new ApiError(`HTTP error! status: ${response.status}`);
    }

    const data: ApiResponse = await response.json();
    
    if (!data.choices?.[0]?.message?.content) {
      throw new ApiError('Invalid API response format');
    }

    return parseResponse(data.choices[0].message.content);
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError('Failed to generate test cases. Please try again.');
  }
}

function createPrompt(config: TestConfig, input: CodeInput): string {
  return `Generate JUnit ${config.junitVersion} and Mockito ${config.mockitoVersion} test cases for:
    Class: ${input.className}
    Method: ${input.methodName}
    Dependencies: ${input.dependencies.join(', ')}
    Code: ${input.codeSnippet}
    Expected Behavior: ${input.expectedBehavior}
    
    Please provide the response in the following format:
    
    [TEST_CASES]
    // Test case implementations here, separated by ---
    [END_TEST_CASES]
    
    Only include Test cases code do not add explanations

    Include test cases for:
    1. Successful execution
    2. failure or negative scenarios
    3. Edge cases
    Include proper mock setup and verifications.`;
}

function parseResponse(content: string): ParsedResponse {
  const testCasesMatch = content.match(/\[TEST_CASES\]([\s\S]*?)\[END_TEST_CASES\]/);
  const explanationMatch = content.match(/\[EXPLANATION\]([\s\S]*?)\[END_EXPLANATION\]/);

  const testCases = testCasesMatch ? parseTestCases(testCasesMatch[1]) : [];
  const explanation = explanationMatch ? explanationMatch[1].trim() : '';

  return { testCases, explanation };
}

function parseTestCases(content: string): TestCase[] {
  return content
    .split('---')
    .filter(section => section.trim())
    .map(section => {
      const lines = section.trim().split('\n');
      return {
        scenario: lines[0].trim(),
        code: lines.slice(1).join('\n').trim()
      };
    });
}