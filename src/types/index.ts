export interface TestConfig {
  junitVersion: string;
  mockitoVersion: string;
}

export interface CodeInput {
  className: string;
  methodName: string;
  dependencies: string[];
  codeSnippet: string;
  expectedBehavior: string;
}

export interface TestCase {
  scenario: string;
  code: string;
}

export interface ParsedResponse {
  testCases: TestCase[];
  explanation: string;
}

export type Theme = 'light' | 'dark';