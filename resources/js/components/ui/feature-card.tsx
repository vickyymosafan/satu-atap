import React from 'react';
import { cn, getIcon } from '@/lib/utils';
import { responsiveCard } from '@/lib/responsive-utils';

interface FeatureCardProps {
  icon?: string;
  iconClassName?: string;
  iconContainerClassName?: string;
  title: string;
  description: string;
  variant?: 'default' | 'benefit' | 'statistic' | 'trust' | 'verification';
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  responsive?: boolean;
  compact?: boolean;
  badge?: {
    text: string;
    color?: string;
  };
  metric?: {
    value: string;
    label: string;
  };
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  iconClassName = "h-6 w-6",
  iconContainerClassName,
  title,
  description,
  variant = 'default',
  className = "",
  children,
  onClick,
  responsive = true,
  compact = false,
  badge,
  metric
}) => {
  // Use responsive card classes or fallback to static
  const baseClasses = responsive
    ? responsiveCard(compact ? 'compact' : 'default')
    : "bg-white dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-700 shadow-xl transition-all duration-300 p-8 hover:shadow-2xl transform hover:scale-[1.02]";
  
  // Variant-specific classes (only for non-responsive cards)
  const variantClasses = {
    default: responsive ? "" : "hover:shadow-2xl transform hover:scale-[1.02]",
    benefit: responsive ? "" : "hover:shadow-2xl transform hover:scale-[1.02]",
    statistic: responsive ? "text-center" : "text-center hover:shadow-2xl transform hover:scale-[1.05]",
    trust: responsive ? "flex items-center" : "flex items-center hover:shadow-xl",
    verification: responsive ? "flex items-center" : "flex items-center hover:shadow-xl"
  };

  // Icon container classes by variant
  const iconContainerClasses = {
    default: "p-3 bg-primary/10 rounded-xl",
    benefit: "p-3 bg-primary/10 rounded-xl",
    statistic: "p-4 bg-primary/10 rounded-full",
    trust: "p-3 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-xl",
    verification: "p-3 rounded-xl border-2"
  };

  // Get badge color classes
  const getBadgeColorClasses = (color: string = 'gray') => {
    const colorMap = {
      blue: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700',
      green: 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700',
      yellow: 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-700',
      red: 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-700',
      purple: 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-700',
      gray: 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/30 dark:text-gray-300 dark:border-gray-700',
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.gray;
  };

  const renderIcon = () => {
    if (!icon) return null;
    
    const containerClass = cn(
      iconContainerClasses[variant],
      iconContainerClassName
    );
    
    return (
      <div className={containerClass}>
        {getIcon(icon, iconClassName)}
      </div>
    );
  };

  const renderContent = () => {
    switch (variant) {
      case 'statistic':
        return (
          <>
            <div className="flex justify-center mb-6">
              {renderIcon()}
            </div>
            {metric && (
              <>
                <div className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
                  {metric.value}
                </div>
                <div className="text-base text-gray-600 dark:text-gray-400 font-medium">
                  {metric.label}
                </div>
              </>
            )}
          </>
        );
        
      case 'trust':
      case 'verification':
        return (
          <>
            {renderIcon()}
            <div className="ml-6">
              <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                {title}
              </h4>
              <p className="text-base text-gray-700 dark:text-gray-300">
                {description}
              </p>
            </div>
          </>
        );
        
      default:
        return (
          <>
            <div className="flex items-center mb-6">
              {renderIcon()}
              <h4 className="text-xl font-bold text-gray-900 dark:text-white ml-4">
                {title}
              </h4>
            </div>
            <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
              {description}
            </p>
            {badge && (
              <div className="mt-4">
                <span className={cn(
                  "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border",
                  getBadgeColorClasses(badge.color)
                )}>
                  {badge.text}
                </span>
              </div>
            )}
          </>
        );
    }
  };

  const CardComponent = onClick ? 'button' : 'div';

  return (
    <CardComponent
      onClick={onClick}
      className={cn(
        baseClasses,
        variantClasses[variant],
        onClick && "cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500/20",
        className
      )}
    >
      {renderContent()}
      {children}
    </CardComponent>
  );
};

export default FeatureCard;
