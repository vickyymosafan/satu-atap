import React from 'react';
import { Menu, X, Search, MapPin, ChevronDown, Home, Phone, HelpCircle, User } from 'lucide-react';
import SatuAtapLogo from '../components/SatuAtapLogo';

// Theme props interface
interface ThemeProps {
  currentTheme: 'light' | 'dark';
  toggleTheme: () => void;
  getThemeIcon: () => React.ReactElement;
}

// Navigation link interface
interface NavLink {
  label: string;
  href: string;
  id: string;
  icon?: React.ReactElement;
}

// Popular location interface for quick access
interface PopularLocation {
  id: string;
  name: string;
  type: 'city' | 'campus';
}

// Main navigation links - simplified and focused
const navLinks: NavLink[] = [
  { label: 'Beranda', href: '#hero', id: 'hero', icon: <Home className="w-4 h-4" /> },
  { label: 'Cari Kost', href: '#quick-search', id: 'quick-search', icon: <Search className="w-4 h-4" /> },
  { label: 'Kost Tersedia', href: '#featured', id: 'featured' },
  { label: 'Panduan', href: '#why-choose-us', id: 'why-choose-us', icon: <HelpCircle className="w-4 h-4" /> },
  { label: 'Hubungi Kami', href: '#contact', id: 'contact', icon: <Phone className="w-4 h-4" /> },
];

// Popular locations for quick access - based on competitor analysis
const popularLocations: PopularLocation[] = [
  { id: 'jakarta', name: 'Jakarta', type: 'city' },
  { id: 'bandung', name: 'Bandung', type: 'city' },
  { id: 'yogyakarta', name: 'Yogyakarta', type: 'city' },
  { id: 'surabaya', name: 'Surabaya', type: 'city' },
  { id: 'binus', name: 'BINUS', type: 'campus' },
  { id: 'ugm', name: 'UGM', type: 'campus' },
  { id: 'ipb', name: 'IPB', type: 'campus' },
];

const authButtons = [
  { label: 'Masuk', type: 'primary', href: '#', icon: <User className="w-4 h-4" /> },
];

const Header: React.FC<ThemeProps> = ({ currentTheme, toggleTheme, getThemeIcon }) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState('hero');
  const [showQuickSearch, setShowQuickSearch] = React.useState(false);
  const [showLocationDropdown, setShowLocationDropdown] = React.useState(false);
  const [quickSearchQuery, setQuickSearchQuery] = React.useState('');

  // Scroll detection for active section
  React.useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map(link => document.getElementById(link.id));
      const scrollPosition = window.scrollY + 100; // Offset for header height

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navLinks[i].id);
          break;
        }
      }
    };

    // Set initial active section
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu and dropdowns when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (mobileOpen && !target.closest('header')) {
        setMobileOpen(false);
      }
      if (showLocationDropdown && !target.closest('.location-dropdown')) {
        setShowLocationDropdown(false);
      }
    };

    if (mobileOpen || showLocationDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [mobileOpen, showLocationDropdown]);

  // Handle navigation click with smooth scroll
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      const headerHeight = 100; // Account for fixed header
      const targetPosition = section.offsetTop - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });

      // Update active section immediately for better UX
      setActiveSection(sectionId);
      setMobileOpen(false); // Close mobile menu if open
    }
  };

  // Handle quick search
  const handleQuickSearch = (query: string) => {
    if (query.trim()) {
      // Navigate to search section and trigger search
      const searchSection = document.getElementById('quick-search');
      if (searchSection) {
        const headerHeight = 100;
        const targetPosition = searchSection.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });

        // Trigger search with the query (this would need to be connected to the search component)
        setQuickSearchQuery('');
        setShowQuickSearch(false);
      }
    }
  };

  // Handle popular location click
  const handleLocationClick = (location: PopularLocation) => {
    handleQuickSearch(location.name);
    setShowLocationDropdown(false);
  };
  return (
    <header className="fixed top-1 sm:top-4 left-1/2 transform -translate-x-1/2 w-[98%] sm:w-[95%] md:w-[92%] lg:w-[90%] max-w-7xl bg-card/95 backdrop-blur-lg shadow-lg rounded-lg md:rounded-xl z-[100] border border-border transition-all duration-300">
      <div className="flex items-center justify-between py-1.5 sm:py-2.5 md:py-3 px-2 sm:px-4 md:px-6 lg:px-8">
        {/* Logo Section - User Friendly with Brand Name */}
        <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-shrink-0">
          <SatuAtapLogo size="sm" className="rounded-lg flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10" />
          <div className="flex flex-col min-w-0">
            <h1 className="text-sm sm:text-base lg:text-lg font-bold text-blue-600 dark:text-blue-400 leading-tight truncate">
              Satu Atap
            </h1>
            <p className="hidden sm:block text-xs text-muted-foreground leading-none truncate">
              Platform Kost Terpercaya
            </p>
          </div>
        </div>

        {/* Desktop/Tablet Quick Search Bar - Hidden on Mobile */}
        <div className="hidden md:flex items-center flex-1 max-w-xs lg:max-w-md mx-2 lg:mx-8">
          <div className="relative w-full">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Cari kost..."
                value={quickSearchQuery}
                onChange={(e) => setQuickSearchQuery(e.target.value)}
                onFocus={() => setShowQuickSearch(true)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleQuickSearch(quickSearchQuery);
                  }
                }}
                className="w-full pl-10 pr-10 py-2 lg:py-2.5 bg-background/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm transition-all duration-200"
              />
              <button
                onClick={() => setShowLocationDropdown(!showLocationDropdown)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 lg:p-1.5 text-muted-foreground hover:text-primary transition-colors location-dropdown"
              >
                <ChevronDown className="h-3 w-3 lg:h-4 lg:w-4" />
              </button>
            </div>

            {/* Quick Location Dropdown - Responsive */}
            {showLocationDropdown && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-popover/95 backdrop-blur-md border border-border rounded-lg shadow-xl z-50 location-dropdown max-h-80 overflow-y-auto">
                <div className="p-2 lg:p-3">
                  <div className="text-xs font-semibold text-muted-foreground mb-2 px-2">Lokasi Populer</div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-1">
                    {popularLocations.map((location) => (
                      <button
                        key={location.id}
                        onClick={() => handleLocationClick(location)}
                        className="flex items-center gap-2 px-2 lg:px-3 py-1.5 lg:py-2 text-xs lg:text-sm text-left hover:bg-accent rounded-md transition-colors w-full"
                      >
                        <MapPin className="h-3 w-3 text-primary flex-shrink-0" />
                        <span className="truncate">{location.name}</span>
                        {location.type === 'campus' && (
                          <span className="text-xs text-muted-foreground hidden lg:inline">(Kampus)</span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Desktop/Tablet Navigation - Responsive */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navLinks.slice(0, 3).map(link => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.id)}
              className={`flex items-center gap-1 lg:gap-2 px-2 lg:px-3 py-1.5 lg:py-2 rounded-lg font-medium text-xs lg:text-sm transition-all duration-200 ${
                activeSection === link.id
                  ? 'text-white bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg'
                  : 'text-gray-600 dark:text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-600 hover:shadow-md transition-all duration-200'
              }`}
              title={link.label}
            >
              {link.icon && React.cloneElement(link.icon, { className: 'h-3 w-3 lg:h-4 lg:w-4' } as any)}
              <span className="hidden xl:inline">{link.label}</span>
            </a>
          ))}
        </nav>

        {/* Mobile-First Actions - Compact Layout */}
        <div className="flex items-center space-x-1 flex-shrink-0">
          {/* Support & Contact Links - Only on large screens */}
          <div className="hidden xl:flex items-center space-x-1">
            {navLinks.slice(3).map(link => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.id)}
                className="flex items-center gap-1 px-2 py-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
                title={link.label}
              >
                {link.icon && React.cloneElement(link.icon, { className: 'h-3 w-3' } as any)}
                <span className="text-xs">{link.label}</span>
              </a>
            ))}
          </div>

          {/* Theme Toggle - Mobile Optimized */}
          <button
            onClick={toggleTheme}
            className="p-1 sm:p-2 rounded-md sm:rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-600 hover:text-white hover:shadow-md transition-all duration-200"
            aria-label={`Switch to ${currentTheme === 'light' ? 'dark' : 'light'} mode`}
          >
            {React.cloneElement(getThemeIcon(), { className: 'h-3.5 w-3.5 sm:h-4 sm:w-4' } as any)}
          </button>

          {/* Auth Button - Mobile Optimized */}
          {authButtons.map(btn => (
            <a
              key={btn.label}
              href={btn.href}
              className="p-1 sm:p-2 lg:p-2.5 rounded-md sm:rounded-lg text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              title={btn.label}
              aria-label={btn.label}
            >
              {React.cloneElement(btn.icon, { className: 'h-3.5 w-3.5 sm:h-4 sm:w-4' } as any)}
            </a>
          ))}

          {/* Mobile Menu Button - Compact */}
          <button
            className={`lg:hidden p-1 sm:p-2 rounded-md sm:rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-600 hover:text-white hover:shadow-md transition-all duration-200 ${
              mobileOpen ? 'ring-2 ring-blue-500' : ''
            }`}
            aria-label="Toggle menu"
            onClick={() => setMobileOpen(v => !v)}
          >
            <span className="sr-only">Toggle menu</span>
            {mobileOpen ? (
              <X className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            ) : (
              <Menu className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            )}
          </button>
        </div>

      </div>



      {/* Mobile Menu - Clean & Organized */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-border/30 bg-card/98 backdrop-blur-lg rounded-b-lg shadow-xl">
          <div className="flex flex-col p-3 space-y-3">
            {/* Mobile Search Bar - Inside Burger Menu */}
            <div className="mb-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Cari kost..."
                  value={quickSearchQuery}
                  onChange={(e) => setQuickSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleQuickSearch(quickSearchQuery);
                      setMobileOpen(false); // Close menu after search
                    }
                  }}
                  className="w-full pl-9 pr-3 py-2.5 bg-background/60 border border-border/50 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary/30 focus:border-primary text-sm placeholder:text-xs"
                />
              </div>
            </div>

            {/* Mobile Navigation - Clean Layout */}
            <div className="space-y-1">
              {navLinks.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.id)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 ${
                    activeSection === link.id
                      ? 'text-white bg-gradient-to-r from-blue-600 to-blue-700 shadow-md'
                      : 'text-gray-600 dark:text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-600 hover:shadow-sm transition-all duration-200'
                  }`}
                >
                  {link.icon && React.cloneElement(link.icon, { className: 'h-4 w-4 flex-shrink-0' } as any)}
                  <div className="flex items-center justify-between flex-1 min-w-0">
                    <span className="truncate">{link.label}</span>
                    {activeSection === link.id && (
                      <div className="w-1.5 h-1.5 bg-white rounded-full flex-shrink-0"></div>
                    )}
                  </div>
                </a>
              ))}
            </div>

            {/* Mobile Theme Toggle - Compact */}
            <button
              onClick={toggleTheme}
              className="flex items-center justify-center space-x-2 w-full p-2.5 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-600 hover:text-white hover:shadow-sm transition-all duration-200"
              aria-label={`Switch to ${currentTheme === 'light' ? 'dark' : 'light'} mode`}
            >
              {React.cloneElement(getThemeIcon(), { className: 'h-4 w-4' } as any)}
              <span className="font-medium text-sm">
                {currentTheme === 'dark' ? 'Mode Gelap' : 'Mode Terang'}
              </span>
            </button>

            {/* Mobile Auth Button - Clean Design */}
            <div className="pt-1">
              {authButtons.map(btn => (
                <a
                  key={btn.label}
                  href={btn.href}
                  className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-lg font-semibold text-sm text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-md hover:shadow-lg"
                  onClick={() => setMobileOpen(false)}
                >
                  {React.cloneElement(btn.icon, { className: 'h-4 w-4' } as any)}
                  <span>{btn.label}</span>
                </a>
              ))}
            </div>


          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
