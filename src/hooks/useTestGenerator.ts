import { useState } from 'react';
import { TestConfig, CodeInput, ParsedResponse } from '../types';
import { generateTestCases, ApiError } from '../services/api';

interface TestGeneratorState {
  testCases: ParsedResponse['testCases'];
  explanation: string;
  loading: boolean;
  error: string | null;
}

export function useTestGenerator() {
  const [state, setState] = useState<TestGeneratorState>({
    testCases: [],
    explanation: '',
    loading: false,
    error: null,
  });

  const generateTests = async (config: TestConfig, input: CodeInput) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const response = await generateTestCases(config, input);
      setState({ 
        testCases: response.testCases, 
        explanation: response.explanation,
        loading: false, 
        error: null 
      });
    } catch (error) {
      setState({
        testCases: [],
        explanation: '',
        loading: false,
        error: error instanceof ApiError ? error.message : 'An unexpected error occurred'
      });
    }
  };

  return {
    ...state,
    generateTests,
    clearError: () => setState(prev => ({ ...prev, error: null })),
  };
}