import React from 'react';
import { cn } from '@/lib/utils';
import { RESPONSIVE_SPACING, RESPONSIVE_CONTAINERS } from '@/lib/responsive-utils';

interface SectionContainerProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  background?: 'default' | 'muted' | 'gradient' | 'transparent';
  padding?: 'compact' | 'normal' | 'large';
  maxWidth?: 'narrow' | 'normal' | 'wide' | 'form' | 'formWide' | 'content' | 'reading';
  withDivider?: boolean;
  id?: string;
  responsive?: boolean;
}

export const SectionContainer: React.FC<SectionContainerProps> = ({
  children,
  className = "",
  containerClassName = "",
  background = 'default',
  padding = 'normal',
  maxWidth = 'normal',
  withDivider = false,
  id,
  responsive = true
}) => {
  // Background classes
  const backgroundClasses = {
    default: 'bg-background',
    muted: 'bg-gray-50 dark:bg-gray-900/50',
    gradient: 'bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900',
    transparent: 'bg-transparent'
  };

  // Get responsive padding or fallback to static
  const paddingClass = responsive
    ? RESPONSIVE_SPACING.section[padding]
    : `py-16 lg:py-24`;

  // Get responsive container width or fallback to static
  const maxWidthClass = responsive
    ? RESPONSIVE_CONTAINERS[maxWidth]
    : 'max-w-7xl';

  // Responsive container padding
  const containerPadding = responsive
    ? RESPONSIVE_SPACING.containerCompact
    : 'px-4 sm:px-6 lg:px-8';

  return (
    <section
      id={id}
      className={cn(
        'relative',
        backgroundClasses[background],
        paddingClass,
        className
      )}
    >
      <div className={cn(
        'container mx-auto',
        containerPadding,
        maxWidthClass,
        containerClassName
      )}>
        {children}
      </div>

      {withDivider && (
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent opacity-50"></div>
      )}
    </section>
  );
};

export default SectionContainer;
