import React from 'react';

interface LoadingSkeletonProps {
  type: 'section' | 'form' | 'cards' | 'faq';
  title?: string;
  description?: string;
  cardCount?: number;
  className?: string;
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  type,
  cardCount = 6,
  className = ""
}) => {
  const baseClasses = "relative py-12 sm:py-16 lg:py-20 bg-muted/20";
  const containerClasses = "container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl";

  const renderHeader = () => (
    <div className="text-center mb-8 space-y-4">
      <div className="h-8 bg-muted rounded w-64 mx-auto animate-pulse"></div>
      <div className="h-4 bg-muted rounded w-96 mx-auto animate-pulse"></div>
    </div>
  );

  const renderCards = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(cardCount)].map((_, i) => (
        <div key={i} className="bg-card rounded-xl p-6 border border-border">
          <div className="h-6 w-6 bg-muted rounded mb-4 animate-pulse"></div>
          <div className="h-5 bg-muted rounded w-3/4 mb-2 animate-pulse"></div>
          <div className="h-4 bg-muted rounded w-full animate-pulse"></div>
        </div>
      ))}
    </div>
  );

  const renderForm = () => (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
      <div className="space-y-6">
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-32 animate-pulse"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
          ))}
        </div>
        <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
        <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
      </div>
    </div>
  );

  const renderFaq = () => (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
      <div className="space-y-6">
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-48 animate-pulse"></div>
        <div className="flex gap-4">
          <div className="flex-1 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
          <div className="w-48 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
        </div>
        {[...Array(4)].map((_, i) => (
          <div key={i} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse"></div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSupportInfo = () => (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
        <div className="space-y-4">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-40 animate-pulse"></div>
          {[...Array(3)].map((_, i) => (
            <div key={i} className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg space-y-3">
              <div className="h-5 bg-gray-200 dark:bg-gray-600 rounded w-32 animate-pulse"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-full animate-pulse"></div>
              <div className="grid grid-cols-2 gap-2">
                <div className="h-8 bg-gray-200 dark:bg-gray-600 rounded animate-pulse"></div>
                <div className="h-8 bg-gray-200 dark:bg-gray-600 rounded animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <section className={`${baseClasses} ${className}`}>
      <div className={containerClasses}>
        <div className="text-center">
          <div className="space-y-8">
            {renderHeader()}
            
            {type === 'section' && renderCards()}
            
            {type === 'form' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {renderForm()}
                {renderSupportInfo()}
              </div>
            )}
            
            {type === 'cards' && renderCards()}
            
            {type === 'faq' && renderFaq()}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoadingSkeleton;
