'use client';

import { FiAlertTriangle, FiRefreshCw } from 'react-icons/fi';

interface ErrorFallbackProps {
  error?: Error;
  resetError?: () => void;
  title?: string;
  message?: string;
  showRetry?: boolean;
}

export function ErrorFallback({ 
  error, 
  resetError, 
  title = "Something went wrong",
  message = "An unexpected error occurred. Please try again.",
  showRetry = true 
}: ErrorFallbackProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <div className="mb-4 p-4 bg-red-100 dark:bg-red-900 rounded-full">
        <FiAlertTriangle className="h-8 w-8 text-red-600 dark:text-red-400" />
      </div>
      
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        {title}
      </h3>
      
      <p className="text-gray-600 dark:text-gray-400 mb-4 max-w-md">
        {message}
      </p>
      
      {error && process.env.NODE_ENV === 'development' && (
        <details className="mb-4 p-3 bg-gray-100 dark:bg-gray-800 rounded text-left text-sm">
          <summary className="cursor-pointer font-medium">Error Details</summary>
          <pre className="mt-2 text-xs text-red-600 dark:text-red-400 overflow-auto">
            {error.message}
            {error.stack && `\n\n${error.stack}`}
          </pre>
        </details>
      )}
      
      {showRetry && resetError && (
        <button
          onClick={resetError}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
        >
          <FiRefreshCw size={16} />
          Try Again
        </button>
      )}
    </div>
  );
}

// Specific error components for different scenarios
export function PlayerNotFoundError({ onRetry }: { onRetry?: () => void }) {
  return (
    <ErrorFallback
      title="Player Not Found"
      message="The player you're looking for doesn't exist in our database."
      showRetry={!!onRetry}
      resetError={onRetry}
    />
  );
}

export function NetworkError({ onRetry }: { onRetry?: () => void }) {
  return (
    <ErrorFallback
      title="Connection Error"
      message="Unable to connect to the server. Please check your internet connection."
      showRetry={!!onRetry}
      resetError={onRetry}
    />
  );
}
  