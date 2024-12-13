import React, { useState } from 'react';
import { CodeInput, TestConfig } from './types';
import { VersionSelector } from './components/VersionSelector';
import { CodeInputForm } from './components/CodeInputForm';
import { TestOutput } from './components/TestOutput';
import { ErrorMessage } from './components/ErrorMessage';
import { ThemeToggle } from './components/ThemeToggle';
import { useTestGenerator } from './hooks/useTestGenerator';
import { useTheme } from './hooks/useTheme';
import { BeakerIcon } from 'lucide-react';
import { LoadingSpinner } from './components/LoadingSpinner';

function App() {
  const { theme, toggleTheme } = useTheme();
  const [config, setConfig] = useState<TestConfig>({
    junitVersion: '5.9.2',
    mockitoVersion: '5.3.1',
  });

  const [input, setInput] = useState<CodeInput>({
    className: '',
    methodName: '',
    dependencies: [],
    codeSnippet: '',
    expectedBehavior: '',
  });

  const { testCases,  loading, error, generateTests, clearError } = useTestGenerator();

  const handleSubmit = () => {
    generateTests(config, input);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <BeakerIcon className="h-8 w-8 text-indigo-600 dark:text-indigo-400 mr-2" />
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                JUnit Test Generator
              </h1>
            </div>
            <ThemeToggle theme={theme} onToggle={toggleTheme} />
          </div>

          {error && (
            <div className="mb-6">
              <ErrorMessage message={error} onDismiss={clearError} />
            </div>
          )}

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="space-y-8">
              <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                  1. Select Versions
                </h2>
                <VersionSelector config={config} onConfigChange={setConfig} />
              </div>

              <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                  2. Enter Code Details
                </h2>
                <CodeInputForm
                  input={input}
                  onInputChange={setInput}
                  onSubmit={handleSubmit}
                />
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                3. Generated Test Cases
                </h2>
              {loading ? (
                <LoadingSpinner />
              ) : (
                <TestOutput testCases={testCases} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;