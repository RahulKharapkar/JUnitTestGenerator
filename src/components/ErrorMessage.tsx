import React from 'react';
import { XCircleIcon } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onDismiss: () => void;
}

export function ErrorMessage({ message, onDismiss }: ErrorMessageProps) {
  return (
    <div className="rounded-md bg-red-50 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <XCircleIcon className="h-5 w-5 text-red-400" />
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium text-red-800">{message}</p>
        </div>
        <div className="ml-auto pl-3">
          <button
            onClick={onDismiss}
            className="inline-flex rounded-md bg-red-50 p-1.5 text-red-500 hover:bg-red-100"
          >
            <span className="sr-only">Dismiss</span>
            <XCircleIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}