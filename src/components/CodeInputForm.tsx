import React from 'react';
import { CodeInput } from '../types';

interface CodeInputFormProps {
  input: CodeInput;
  onInputChange: (input: CodeInput) => void;
  onSubmit: () => void;
}

export function CodeInputForm({ input, onInputChange, onSubmit }: CodeInputFormProps) {
  const handleDependencyChange = (value: string) => {
    const dependencies = value.split('\n').filter(dep => dep.trim() !== '');
    onInputChange({ ...input, dependencies });
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-slate-400">Class Name</label>
        <input
          type="text"
          className="mt-1 block w-full rounded-sm border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          value={input.className}
          onChange={(e) => onInputChange({ ...input, className: e.target.value })}
          placeholder="e.g., UserService"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-400">Method Name</label>
        <input
          type="text"
          className="mt-1 block w-full rounded-sm border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          value={input.methodName}
          onChange={(e) => onInputChange({ ...input, methodName: e.target.value })}
          placeholder="e.g., createUser"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-400">Dependencies (one per line)</label>
        <textarea
          className="mt-1 block w-full rounded-sm border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          rows={3}
          value={input.dependencies.join('\n')}
          onChange={(e) => handleDependencyChange(e.target.value)}
          placeholder="e.g., UserRepository&#10;EmailService"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-400">Code Snippet</label>
        <textarea
          className="mt-1 block w-full rounded-sm border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 font-mono"
          rows={6}
          value={input.codeSnippet}
          onChange={(e) => onInputChange({ ...input, codeSnippet: e.target.value })}
          placeholder="Paste your code here..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-400">Expected Behavior</label>
        <textarea
          className="mt-1 block w-full rounded-sm border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          rows={3}
          value={input.expectedBehavior}
          onChange={(e) => onInputChange({ ...input, expectedBehavior: e.target.value })}
          placeholder="Describe what the code should do..."
        />
      </div>

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-sm shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Generate Test Cases
      </button>
    </form>
  );
}