import React from 'react';
import { cn } from '@/lib/utils';
import { RESPONSIVE_GRIDS, RESPONSIVE_SPACING } from '@/lib/responsive-utils';

interface ResponsiveGridProps {
  children: React.ReactNode;
  variant?: keyof typeof RESPONSIVE_GRIDS;
  gap?: keyof typeof RESPONSIVE_SPACING.gap;
  className?: string;
  itemClassName?: string;
  minItemWidth?: string;
  maxColumns?: number;
  autoFit?: boolean;
}

export const ResponsiveGrid: React.FC<ResponsiveGridProps> = ({
  children,
  variant = 'cards',
  gap = 'md',
  className = '',
  itemClassName = '',
  minItemWidth,
  maxColumns,
  autoFit = false
}) => {
  // Build grid classes
  const getGridClasses = () => {
    if (autoFit && minItemWidth) {
      // CSS Grid auto-fit for truly responsive grids
      return `grid gap-${gap} grid-cols-[repeat(auto-fit,minmax(${minItemWidth},1fr))]`;
    }
    
    if (maxColumns) {
      // Custom max columns
      const baseGrid = RESPONSIVE_GRIDS[variant];
      const customGrid = baseGrid.replace(/xl:grid-cols-\d+/, `xl:grid-cols-${maxColumns}`);
      return customGrid;
    }
    
    // Use predefined responsive grid
    return RESPONSIVE_GRIDS[variant];
  };

  const gridClasses = getGridClasses();
  const gapClasses = RESPONSIVE_SPACING.gap[gap];

  return (
    <div className={cn(gridClasses, gapClasses, className)}>
      {React.Children.map(children, (child, index) => (
        <div key={index} className={itemClassName}>
          {child}
        </div>
      ))}
    </div>
  );
};

// Specialized grid components for common use cases
export const CardGrid: React.FC<Omit<ResponsiveGridProps, 'variant'> & { compact?: boolean }> = ({
  compact = false,
  ...props
}) => (
  <ResponsiveGrid 
    variant={compact ? 'cardsCompact' : 'cards'} 
    {...props} 
  />
);

export const FeatureGrid: React.FC<Omit<ResponsiveGridProps, 'variant'>> = (props) => (
  <ResponsiveGrid variant="features" {...props} />
);

export const StatsGrid: React.FC<Omit<ResponsiveGridProps, 'variant'>> = (props) => (
  <ResponsiveGrid variant="stats" {...props} />
);

export const FormGrid: React.FC<Omit<ResponsiveGridProps, 'variant'> & { compact?: boolean }> = ({
  compact = false,
  ...props
}) => (
  <ResponsiveGrid 
    variant={compact ? 'formFieldsCompact' : 'formFields'} 
    gap="sm"
    {...props} 
  />
);

export const ContentGrid: React.FC<Omit<ResponsiveGridProps, 'variant'> & { wide?: boolean }> = ({
  wide = false,
  ...props
}) => (
  <ResponsiveGrid 
    variant={wide ? 'contentWide' : 'content'} 
    {...props} 
  />
);

export const GalleryGrid: React.FC<Omit<ResponsiveGridProps, 'variant'> & { thumbnails?: boolean }> = ({
  thumbnails = false,
  ...props
}) => (
  <ResponsiveGrid 
    variant={thumbnails ? 'thumbnails' : 'gallery'} 
    gap="sm"
    {...props} 
  />
);

export default ResponsiveGrid;
