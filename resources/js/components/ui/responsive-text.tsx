import React from 'react';
import { cn } from '@/lib/utils';
import { RESPONSIVE_TYPOGRAPHY } from '@/lib/responsive-utils';

interface ResponsiveTextProps {
  children: React.ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div' | 'label';
  variant?: 
    | keyof typeof RESPONSIVE_TYPOGRAPHY.heading
    | keyof typeof RESPONSIVE_TYPOGRAPHY.body
    | keyof typeof RESPONSIVE_TYPOGRAPHY.button
    | 'label' | 'input' | 'placeholder';
  className?: string;
  color?: 'default' | 'muted' | 'primary' | 'secondary' | 'accent' | 'destructive';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  align?: 'left' | 'center' | 'right' | 'justify';
  truncate?: boolean;
  lineClamp?: number;
}

export const ResponsiveText: React.FC<ResponsiveTextProps> = ({
  children,
  as: Component = 'p',
  variant = 'normal',
  className = '',
  color = 'default',
  weight,
  align,
  truncate = false,
  lineClamp
}) => {
  // Get typography classes
  const getTypographyClasses = () => {
    // Check if variant exists in heading
    if (variant in RESPONSIVE_TYPOGRAPHY.heading) {
      return RESPONSIVE_TYPOGRAPHY.heading[variant as keyof typeof RESPONSIVE_TYPOGRAPHY.heading];
    }
    
    // Check if variant exists in body
    if (variant in RESPONSIVE_TYPOGRAPHY.body) {
      return RESPONSIVE_TYPOGRAPHY.body[variant as keyof typeof RESPONSIVE_TYPOGRAPHY.body];
    }
    
    // Check if variant exists in button
    if (variant in RESPONSIVE_TYPOGRAPHY.button) {
      return RESPONSIVE_TYPOGRAPHY.button[variant as keyof typeof RESPONSIVE_TYPOGRAPHY.button];
    }
    
    // Handle special variants
    switch (variant) {
      case 'label':
        return RESPONSIVE_TYPOGRAPHY.label;
      case 'input':
        return RESPONSIVE_TYPOGRAPHY.input;
      case 'placeholder':
        return RESPONSIVE_TYPOGRAPHY.placeholder;
      default:
        return RESPONSIVE_TYPOGRAPHY.body.normal;
    }
  };

  // Color classes
  const colorClasses = {
    default: 'text-foreground',
    muted: 'text-muted-foreground',
    primary: 'text-primary',
    secondary: 'text-secondary',
    accent: 'text-accent',
    destructive: 'text-destructive'
  };

  // Weight classes (override default from typography)
  const weightClasses = weight ? {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold'
  }[weight] : '';

  // Alignment classes
  const alignClasses = align ? {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
    justify: 'text-justify'
  }[align] : '';

  // Truncation classes
  const truncateClasses = truncate ? 'truncate' : '';
  const lineClampClasses = lineClamp ? `line-clamp-${lineClamp}` : '';

  const typographyClasses = getTypographyClasses();

  return (
    <Component
      className={cn(
        typographyClasses,
        colorClasses[color],
        weightClasses,
        alignClasses,
        truncateClasses,
        lineClampClasses,
        className
      )}
    >
      {children}
    </Component>
  );
};

// Specialized text components for common use cases
export const ResponsiveHeading: React.FC<Omit<ResponsiveTextProps, 'variant'> & {
  level: 1 | 2 | 3 | 4 | 5 | 6;
}> = ({ level, as, ...props }) => {
  const headingVariants = {
    1: 'h1',
    2: 'h2', 
    3: 'h3',
    4: 'h4',
    5: 'h5',
    6: 'h6'
  } as const;

  return (
    <ResponsiveText
      as={as || (`h${level}` as ResponsiveTextProps['as'])}
      variant={headingVariants[level]}
      {...props}
    />
  );
};

export const ResponsiveBody: React.FC<Omit<ResponsiveTextProps, 'variant'> & {
  size?: 'small' | 'normal' | 'large';
}> = ({ size = 'normal', ...props }) => (
  <ResponsiveText variant={size} {...props} />
);

export const ResponsiveCaption: React.FC<Omit<ResponsiveTextProps, 'variant'>> = (props) => (
  <ResponsiveText variant="caption" color="muted" {...props} />
);

export const ResponsiveLabel: React.FC<Omit<ResponsiveTextProps, 'variant'>> = (props) => (
  <ResponsiveText variant="label" as="label" {...props} />
);

// Section title component with consistent styling
export const SectionTitle: React.FC<{
  children: React.ReactNode;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}> = ({ children, subtitle, centered = true, className }) => (
  <div className={cn('mb-8 sm:mb-12 md:mb-16', centered && 'text-center', className)}>
    <ResponsiveHeading level={2} className="mb-4 md:mb-6">
      {children}
    </ResponsiveHeading>
    {subtitle && (
      <ResponsiveBody size="large" color="muted" className="max-w-3xl mx-auto">
        {subtitle}
      </ResponsiveBody>
    )}
  </div>
);

export default ResponsiveText;
