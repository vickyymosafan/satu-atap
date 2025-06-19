// Enhanced Responsive Design Utilities
// Optimized for laptop/desktop viewing (1366x768 to 1920x1080)

export const RESPONSIVE_BREAKPOINTS = {
  sm: '640px',   // Small tablets and large phones
  md: '768px',   // Tablets
  lg: '1024px',  // Small laptops
  xl: '1280px',  // Large laptops/desktops
  '2xl': '1536px' // Large desktops
} as const;

// Responsive Grid Patterns
export const RESPONSIVE_GRIDS = {
  // Standard responsive grids
  cards: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  cardsCompact: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  features: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  stats: 'grid grid-cols-2 md:grid-cols-4',
  
  // Form grids
  formFields: 'grid grid-cols-1 sm:grid-cols-2',
  formFieldsCompact: 'grid grid-cols-1 md:grid-cols-2',
  
  // Content grids
  content: 'grid grid-cols-1 lg:grid-cols-2',
  contentWide: 'grid grid-cols-1 xl:grid-cols-3',
  
  // Gallery grids
  gallery: 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6',
  thumbnails: 'grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8'
} as const;

// Responsive Spacing
export const RESPONSIVE_SPACING = {
  // Section padding - optimized for readability
  section: {
    compact: 'py-8 sm:py-12 md:py-16',
    normal: 'py-12 sm:py-16 md:py-20 lg:py-24',
    large: 'py-16 sm:py-20 md:py-24 lg:py-32'
  },
  
  // Container padding
  container: 'px-4 sm:px-6 md:px-8 lg:px-12',
  containerCompact: 'px-4 sm:px-6 lg:px-8',
  
  // Element spacing
  gap: {
    xs: 'gap-2 sm:gap-3',
    sm: 'gap-3 sm:gap-4 md:gap-6',
    md: 'gap-4 sm:gap-6 md:gap-8',
    lg: 'gap-6 sm:gap-8 md:gap-10 lg:gap-12',
    xl: 'gap-8 sm:gap-10 md:gap-12 lg:gap-16'
  },
  
  // Margin spacing
  margin: {
    section: 'mb-8 sm:mb-12 md:mb-16',
    element: 'mb-4 sm:mb-6 md:mb-8',
    small: 'mb-2 sm:mb-3 md:mb-4'
  }
} as const;

// Responsive Typography
export const RESPONSIVE_TYPOGRAPHY = {
  // Headings - optimized for laptop readability
  heading: {
    h1: 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight',
    h2: 'text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight',
    h3: 'text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold leading-tight',
    h4: 'text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-tight',
    h5: 'text-sm sm:text-base md:text-lg lg:text-xl font-bold leading-tight',
    h6: 'text-xs sm:text-sm md:text-base lg:text-lg font-bold leading-tight'
  },
  
  // Body text
  body: {
    large: 'text-base sm:text-lg md:text-xl leading-relaxed',
    normal: 'text-sm sm:text-base md:text-lg leading-normal',
    small: 'text-xs sm:text-sm md:text-base leading-normal',
    caption: 'text-xs sm:text-sm leading-tight'
  },
  
  // Interactive elements
  button: {
    large: 'text-base sm:text-lg font-semibold',
    normal: 'text-sm sm:text-base font-semibold',
    small: 'text-xs sm:text-sm font-semibold'
  },
  
  // Labels and form elements
  label: 'text-sm sm:text-base font-medium',
  input: 'text-sm sm:text-base',
  placeholder: 'text-xs sm:text-sm'
} as const;

// Responsive Container Widths
export const RESPONSIVE_CONTAINERS = {
  // Optimized for laptop viewing
  narrow: 'max-w-2xl sm:max-w-3xl md:max-w-4xl',
  normal: 'max-w-4xl sm:max-w-5xl md:max-w-6xl lg:max-w-7xl',
  wide: 'max-w-5xl sm:max-w-6xl md:max-w-7xl lg:max-w-full',
  
  // Form containers
  form: 'max-w-md sm:max-w-lg md:max-w-xl',
  formWide: 'max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl',
  
  // Content containers
  content: 'max-w-3xl sm:max-w-4xl md:max-w-5xl',
  reading: 'max-w-2xl sm:max-w-3xl md:max-w-4xl'
} as const;

// Responsive Aspect Ratios
export const RESPONSIVE_ASPECTS = {
  // Card images - adaptive based on screen size
  card: 'aspect-[4/3] sm:aspect-[3/2] lg:aspect-[16/9]',
  cardCompact: 'aspect-[3/2] lg:aspect-[16/9]',
  
  // Hero images
  hero: 'aspect-[16/9] sm:aspect-[21/9] lg:aspect-[24/9]',
  
  // Gallery images
  gallery: 'aspect-square sm:aspect-[4/3] lg:aspect-[3/2]',
  thumbnail: 'aspect-square',
  
  // Video
  video: 'aspect-video'
} as const;

// Responsive Visibility
export const RESPONSIVE_VISIBILITY = {
  // Show/hide at different breakpoints
  mobileOnly: 'block sm:hidden',
  tabletOnly: 'hidden sm:block lg:hidden',
  desktopOnly: 'hidden lg:block',
  
  // Progressive disclosure
  showSm: 'hidden sm:block',
  showMd: 'hidden md:block',
  showLg: 'hidden lg:block',
  showXl: 'hidden xl:block',
  
  // Hide at breakpoints
  hideSm: 'sm:hidden',
  hideMd: 'md:hidden',
  hideLg: 'lg:hidden',
  hideXl: 'xl:hidden'
} as const;

// Utility function to build responsive classes
export const buildResponsiveClasses = (config: {
  grid?: keyof typeof RESPONSIVE_GRIDS;
  spacing?: keyof typeof RESPONSIVE_SPACING.section;
  typography?: keyof typeof RESPONSIVE_TYPOGRAPHY.heading | keyof typeof RESPONSIVE_TYPOGRAPHY.body;
  container?: keyof typeof RESPONSIVE_CONTAINERS;
  gap?: keyof typeof RESPONSIVE_SPACING.gap;
}) => {
  const classes: string[] = [];
  
  if (config.grid) {
    classes.push(RESPONSIVE_GRIDS[config.grid]);
  }
  
  if (config.spacing) {
    classes.push(RESPONSIVE_SPACING.section[config.spacing]);
  }
  
  if (config.container) {
    classes.push(RESPONSIVE_CONTAINERS[config.container]);
  }
  
  if (config.gap) {
    classes.push(RESPONSIVE_SPACING.gap[config.gap]);
  }
  
  return classes.join(' ');
};

// Responsive component class builders
export const responsiveCard = (variant: 'default' | 'compact' = 'default') => {
  const base = 'bg-white dark:bg-gray-800/90 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300';
  const padding = variant === 'compact' ? 'p-4 sm:p-6' : 'p-4 sm:p-6 md:p-8';
  const hover = 'hover:-translate-y-1 hover:scale-[1.01] sm:hover:scale-[1.02]';
  
  return `${base} ${padding} ${hover}`;
};

export const responsiveButton = (size: 'sm' | 'md' | 'lg' = 'md') => {
  const base = 'inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const sizes = {
    sm: 'px-3 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm',
    md: 'px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base',
    lg: 'px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg'
  };
  
  return `${base} ${sizes[size]}`;
};

export default {
  RESPONSIVE_GRIDS,
  RESPONSIVE_SPACING,
  RESPONSIVE_TYPOGRAPHY,
  RESPONSIVE_CONTAINERS,
  RESPONSIVE_ASPECTS,
  RESPONSIVE_VISIBILITY,
  buildResponsiveClasses,
  responsiveCard,
  responsiveButton
};
