// Design System Constants for Consistent UI/UX
// This file contains all the design tokens and consistent styling patterns

export const DESIGN_TOKENS = {
  // Spacing System - Consistent spacing scale
  spacing: {
    xs: '0.25rem',    // 4px
    sm: '0.5rem',     // 8px
    md: '0.75rem',    // 12px
    lg: '1rem',       // 16px
    xl: '1.5rem',     // 24px
    '2xl': '2rem',    // 32px
    '3xl': '3rem',    // 48px
    '4xl': '4rem',    // 64px
    '5xl': '6rem',    // 96px
    '6xl': '8rem',    // 128px
  },

  // Border Radius System
  borderRadius: {
    sm: '0.5rem',     // 8px
    md: '0.75rem',    // 12px
    lg: '1rem',       // 16px
    xl: '1.5rem',     // 24px
    '2xl': '2rem',    // 32px
    full: '9999px',
  },

  // Shadow System
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  },

  // Typography Scale
  typography: {
    fontSize: {
      xs: '0.75rem',    // 12px
      sm: '0.875rem',   // 14px
      base: '1rem',     // 16px
      lg: '1.125rem',   // 18px
      xl: '1.25rem',    // 20px
      '2xl': '1.5rem',  // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem', // 36px
      '5xl': '3rem',    // 48px
      '6xl': '3.75rem', // 60px
    },
    lineHeight: {
      tight: '1.25',
      normal: '1.5',
      relaxed: '1.625',
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
  },

  // Animation Durations
  animation: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
    slower: '700ms',
  },

  // Z-Index Scale
  zIndex: {
    dropdown: 50,
    modal: 100,
    overlay: 200,
    tooltip: 300,
  },
} as const;

// Component-specific styling patterns
export const COMPONENT_STYLES = {
  // Section padding patterns - Optimized for laptop viewing
  section: {
    padding: {
      mobile: 'py-12 sm:py-16',
      desktop: 'lg:py-20',
      full: 'py-12 sm:py-16 lg:py-20',
      compact: 'py-8 sm:py-12 lg:py-16', // New compact option for laptop optimization
    },
    container: 'container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl', // Reduced from max-w-6xl for better laptop viewing
    containerWide: 'container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl', // Keep original for specific cases
  },

  // Card patterns - Optimized for laptop viewing
  card: {
    base: 'bg-card/80 backdrop-blur-sm border border-border/50 shadow-lg',
    rounded: 'rounded-xl', // Reduced from rounded-2xl for laptop
    roundedLarge: 'rounded-2xl', // Keep original for specific cases
    hover: 'hover:shadow-xl transition-all duration-300',
    interactive: 'hover:-translate-y-1 hover:scale-[1.01]',
    padding: {
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
      laptop: 'p-4 md:p-6', // Laptop-optimized padding
    },
  },

  // Button patterns
  button: {
    primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-accent',
    outline: 'border-2 border-border bg-card text-foreground hover:bg-accent',
    size: {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg',
    },
    rounded: 'rounded-xl',
    transition: 'transition-all duration-300',
    shadow: 'shadow-lg hover:shadow-xl',
    transform: 'transform hover:scale-105 active:scale-95',
  },

  // Input patterns - Optimized for laptop viewing
  input: {
    base: 'bg-input border-2 border-border text-foreground placeholder-muted-foreground',
    focus: 'focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary',
    hover: 'hover:border-accent',
    size: {
      sm: 'px-3 py-2 text-sm',
      md: 'px-4 py-3 text-base',
      lg: 'px-5 py-4 text-lg',
      laptop: 'px-4 py-3 text-sm md:text-base', // Laptop-optimized sizing
    },
    rounded: 'rounded-xl', // Slightly reduced border radius for laptop
    transition: 'transition-all duration-200',
    shadow: 'shadow-sm',
  },

  // Typography patterns - Optimized for laptop readability
  heading: {
    h1: 'text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground leading-tight',
    h2: 'text-xl sm:text-2xl lg:text-3xl font-bold text-foreground leading-tight',
    h3: 'text-lg sm:text-xl lg:text-2xl font-bold text-foreground leading-tight',
    h4: 'text-base sm:text-lg lg:text-xl font-bold text-foreground leading-tight',
    // Laptop-optimized variants
    h1Laptop: 'text-2xl md:text-3xl lg:text-4xl font-bold text-foreground leading-tight',
    h2Laptop: 'text-xl md:text-2xl lg:text-3xl font-bold text-foreground leading-tight',
  },

  text: {
    body: 'text-sm sm:text-base lg:text-lg text-muted-foreground leading-normal',
    bodyLaptop: 'text-sm md:text-base lg:text-lg text-muted-foreground leading-normal', // Optimized line height
    caption: 'text-xs sm:text-sm text-muted-foreground',
    label: 'text-xs sm:text-sm font-semibold text-foreground',
  },

  // Layout patterns
  grid: {
    responsive: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    responsiveFull: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
    gap: 'gap-8',
    multiRow: 'space-y-12',
  },

  // Animation patterns
  fadeIn: 'transition-all duration-700',
  slideUp: 'translate-y-8 opacity-0',
  slideUpVisible: 'translate-y-0 opacity-100',
} as const;

// Utility functions for consistent styling
export const getSpacing = (size: keyof typeof DESIGN_TOKENS.spacing) => DESIGN_TOKENS.spacing[size];
export const getBorderRadius = (size: keyof typeof DESIGN_TOKENS.borderRadius) => DESIGN_TOKENS.borderRadius[size];
export const getShadow = (size: keyof typeof DESIGN_TOKENS.shadows) => DESIGN_TOKENS.shadows[size];

// Consistent class name builders
export const buildCardClasses = (variant: 'default' | 'interactive' = 'default') => {
  const base = `${COMPONENT_STYLES.card.base} ${COMPONENT_STYLES.card.rounded}`;
  if (variant === 'interactive') {
    return `${base} ${COMPONENT_STYLES.card.hover} ${COMPONENT_STYLES.card.interactive}`;
  }
  return `${base} ${COMPONENT_STYLES.card.hover}`;
};

export const buildButtonClasses = (
  variant: 'primary' | 'secondary' | 'outline' = 'primary',
  size: 'sm' | 'md' | 'lg' = 'md'
) => {
  const base = `${COMPONENT_STYLES.button.rounded} ${COMPONENT_STYLES.button.transition} ${COMPONENT_STYLES.button.shadow} ${COMPONENT_STYLES.button.transform}`;
  const variantClass = COMPONENT_STYLES.button[variant];
  const sizeClass = COMPONENT_STYLES.button.size[size];
  return `${base} ${variantClass} ${sizeClass}`;
};

export const buildInputClasses = (size: 'sm' | 'md' | 'lg' = 'md') => {
  const base = `${COMPONENT_STYLES.input.base} ${COMPONENT_STYLES.input.focus} ${COMPONENT_STYLES.input.hover} ${COMPONENT_STYLES.input.rounded} ${COMPONENT_STYLES.input.transition} ${COMPONENT_STYLES.input.shadow}`;
  const sizeClass = COMPONENT_STYLES.input.size[size];
  return `${base} ${sizeClass}`;
};

// Animation utilities
export const buildAnimationClasses = (isVisible: boolean, delay: number = 0) => {
  const baseClasses = COMPONENT_STYLES.fadeIn;
  const visibilityClasses = isVisible 
    ? COMPONENT_STYLES.slideUpVisible 
    : COMPONENT_STYLES.slideUp;
  
  return {
    className: `${baseClasses} ${visibilityClasses}`,
    style: { transitionDelay: `${delay}ms` }
  };
};

// Responsive breakpoints (matching Tailwind defaults)
export const BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

// Laptop-optimized spacing utilities
export const LAPTOP_OPTIMIZED = {
  spacing: {
    sectionGap: 'mb-8 md:mb-12 lg:mb-16', // Reduced section gaps
    cardGap: 'gap-6 md:gap-8', // Optimized card spacing
    contentGap: 'space-y-4 md:space-y-6', // Reduced content spacing
  },
  typography: {
    heroTitle: 'text-2xl md:text-3xl lg:text-4xl font-bold leading-tight',
    sectionTitle: 'text-xl md:text-2xl lg:text-3xl font-bold leading-tight',
    bodyText: 'text-sm md:text-base leading-normal',
    captionText: 'text-xs md:text-sm',
  },
  layout: {
    maxWidth: 'max-w-4xl md:max-w-5xl', // Optimized for laptop screens
    padding: 'px-4 md:px-6 lg:px-8',
    margin: 'mx-auto',
  },
} as const;

export default DESIGN_TOKENS;
