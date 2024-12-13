import React from 'react';
import { Loader2 } from 'lucide-react';

export function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center h-64 space-y-4">
      <div className="relative">
        <Loader2 className="h-16 w-16 text-indigo-600 dark:text-indigo-400 animate-spin" />
        <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent dark:from-gray-800/20 animate-pulse" />
      </div>
      <div className="text-lg font-medium text-gray-700 dark:text-gray-300">
        Generating Test Cases...
      </div>
      <div className="text-sm text-gray-500 dark:text-gray-400 text-center max-w-sm">
        Analyzing code structure and creating comprehensive test cases with proper assertions
      </div>
    </div>
  );
}