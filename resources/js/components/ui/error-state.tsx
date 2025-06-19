import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorStateProps {
  error?: string | null;
  title?: string;
  description?: string;
  showRetry?: boolean;
  onRetry?: () => void;
  className?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  error,
  title = "Terjadi Kesalahan",
  description,
  showRetry = false,
  onRetry,
  className = ""
}) => {
  const defaultDescription = error || 'Data tidak tersedia';
  const finalDescription = description || defaultDescription;

  return (
    <section className={`relative py-12 sm:py-16 lg:py-20 bg-background ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="text-center">
          <div className="flex flex-col items-center space-y-4">
            <div className="p-4 bg-red-100 dark:bg-red-900/30 rounded-full">
              <AlertCircle className="h-12 w-12 text-red-600 dark:text-red-400" />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {title}
              </h3>
              <p className="text-muted-foreground max-w-md">
                {finalDescription}
              </p>
            </div>

            {showRetry && onRetry && (
              <button
                onClick={onRetry}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                <RefreshCw className="h-4 w-4" />
                Coba Lagi
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ErrorState;
