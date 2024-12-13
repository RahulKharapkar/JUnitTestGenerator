import React from 'react';
import { TestCase } from '../types';
import { CopyIcon, CheckIcon } from 'lucide-react';

interface TestOutputProps {
  testCases: TestCase[];
}

export function TestOutput({ testCases }: TestOutputProps) {
  const [copiedIndex, setCopiedIndex] = React.useState<number | null>(null);

  const handleCopy = async (code: string, index: number) => {
    await navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="space-y-6">
      {testCases.map((testCase, index) => (
        <div key={index} className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
          <div className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 px-4 py-3">
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
              {testCase.scenario}
            </h3>
          </div>
          <div className="relative">
            <pre className="p-4 overflow-x-auto bg-gray-50 dark:bg-gray-900">
              <code className="text-sm font-mono text-gray-800 dark:text-gray-200">
                {testCase.code}
              </code>
            </pre>
            <button
              onClick={() => handleCopy(testCase.code, index)}
              className="absolute top-2 right-2 p-2 rounded-md bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              {copiedIndex === index ? (
                <CheckIcon className="h-4 w-4 text-green-500" />
              ) : (
                <CopyIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              )}
            </button>
          </div>
        </div>
      ))}
      
      
    </div>
  );
}