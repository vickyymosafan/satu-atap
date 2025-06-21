import React from 'react';
import { Menu, X, Search, MapPin, ChevronDown, Home, Phone, HelpCircle } from 'lucide-react';
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
  { label: 'Masuk', type: 'primary', href: '#' },
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
    <header className="fixed top-2 sm:top-4 left-1/2 transform -translate-x-1/2 w-[96%] sm:w-[95%] md:w-[90%] max-w-7xl bg-card/90 backdrop-blur-lg shadow-lg rounded-lg md:rounded-xl z-[100] border border-border transition-all duration-300">
      <div className="flex items-center justify-between py-2 md:py-3 px-4 md:px-6 lg:px-8">
        {/* Logo Section */}
        <div className="flex items-center space-x-3">
          <SatuAtapLogo size="md" className="rounded-lg" />
          <div className="hidden sm:block">
            <h1 className="text-lg font-bold text-foreground">SatuAtap</h1>
            <p className="text-xs text-muted-foreground">Temukan Kost Impian</p>
          </div>
        </div>

        {/* Desktop Quick Search Bar - Prominent like competitor sites */}
        <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Cari kost di Jakarta, Bandung, Yogya..."
                value={quickSearchQuery}
                onChange={(e) => setQuickSearchQuery(e.target.value)}
                onFocus={() => setShowQuickSearch(true)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleQuickSearch(quickSearchQuery);
                  }
                }}
                className="w-full pl-10 pr-12 py-2.5 bg-background/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm transition-all duration-200"
              />
              <button
                onClick={() => setShowLocationDropdown(!showLocationDropdown)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1.5 text-muted-foreground hover:text-primary transition-colors location-dropdown"
              >
                <ChevronDown className="h-4 w-4" />
              </button>
            </div>

            {/* Quick Location Dropdown */}
            {showLocationDropdown && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-popover/95 backdrop-blur-md border border-border rounded-lg shadow-xl z-50 location-dropdown">
                <div className="p-3">
                  <div className="text-xs font-semibold text-muted-foreground mb-2 px-2">Lokasi Populer</div>
                  <div className="grid grid-cols-2 gap-1">
                    {popularLocations.map((location) => (
                      <button
                        key={location.id}
                        onClick={() => handleLocationClick(location)}
                        className="flex items-center gap-2 px-3 py-2 text-sm text-left hover:bg-accent rounded-md transition-colors"
                      >
                        <MapPin className="h-3 w-3 text-primary" />
                        <span>{location.name}</span>
                        {location.type === 'campus' && (
                          <span className="text-xs text-muted-foreground">(Kampus)</span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Desktop Navigation - Simplified */}
        <nav className="hidden md:flex items-center space-x-1">
          {navLinks.slice(0, 3).map(link => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                activeSection === link.id
                  ? 'text-white bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg'
                  : 'text-gray-600 dark:text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-600 hover:shadow-md transition-all duration-200'
              }`}
            >
              {link.icon}
              <span className="hidden xl:inline">{link.label}</span>
            </a>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-2">
          {/* Support & Contact Links */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.slice(3).map(link => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.id)}
                className="flex items-center gap-1 px-2 py-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
                title={link.label}
              >
                {link.icon}
                <span className="hidden xl:inline text-xs">{link.label}</span>
              </a>
            ))}
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-600 hover:text-white hover:shadow-md transition-all duration-200"
            aria-label={`Switch to ${currentTheme === 'light' ? 'dark' : 'light'} mode`}
          >
            {getThemeIcon()}
          </button>

          {/* Auth Buttons - Compact */}
          {authButtons.map(btn => (
            <a
              key={btn.label}
              href={btn.href}
              className={
                btn.type === 'primary'
                  ? 'px-4 py-2 rounded-lg font-semibold text-sm text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105'
                  : 'px-4 py-2 rounded-lg font-semibold text-sm text-gray-600 dark:text-gray-300 border border-blue-300 dark:border-blue-400 hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-600 hover:text-white hover:border-blue-600 hover:shadow-md transition-all duration-200'
              }
            >
              {btn.label}
            </a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className={`md:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-600 hover:text-white hover:shadow-md transition-all duration-200 ${
            mobileOpen ? 'ring-2 ring-blue-500' : ''
          }`}
          aria-label="Toggle menu"
          onClick={() => setMobileOpen(v => !v)}
        >
          <span className="sr-only">Toggle menu</span>
          {mobileOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Mobile Quick Search Bar */}
      <div className="lg:hidden border-t border-border/30 px-4 py-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Cari kost..."
            value={quickSearchQuery}
            onChange={(e) => setQuickSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleQuickSearch(quickSearchQuery);
              }
            }}
            className="w-full pl-10 pr-4 py-2.5 bg-background/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
          />
        </div>

        {/* Popular Locations for Mobile */}
        <div className="mt-3 flex flex-wrap gap-2">
          {popularLocations.slice(0, 4).map((location) => (
            <button
              key={location.id}
              onClick={() => handleLocationClick(location)}
              className="flex items-center gap-1 px-2 py-1 text-xs bg-muted/50 hover:bg-muted rounded-md transition-colors"
            >
              <MapPin className="h-3 w-3" />
              {location.name}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-card/95 backdrop-blur-lg rounded-b-xl sm:rounded-b-2xl shadow-lg">
          <div className="flex flex-col p-4 sm:p-6 space-y-3 sm:space-y-4">
            {/* Mobile Navigation */}
            <div className="space-y-2">
              {navLinks.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                    activeSection === link.id
                      ? 'text-white bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg'
                      : 'text-gray-600 dark:text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-600 hover:shadow-md transition-all duration-200'
                  }`}
                >
                  {link.icon}
                  <div className="flex items-center justify-between flex-1">
                    <span>{link.label}</span>
                    {activeSection === link.id && (
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </div>
                </a>
              ))}
            </div>

            {/* Mobile Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="flex items-center justify-center space-x-3 w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-600 hover:text-white hover:shadow-md transition-all duration-200"
              aria-label={`Switch to ${currentTheme === 'light' ? 'dark' : 'light'} mode`}
            >
              {getThemeIcon()}
              <span className="font-medium">
                {currentTheme === 'dark' ? 'Mode Gelap' : 'Mode Terang'}
              </span>
            </button>

            {/* Mobile Auth Buttons */}
            <div className="space-y-3 pt-2">
              {authButtons.map(btn => (
                <a
                  key={btn.label}
                  href={btn.href}
                  className={
                    btn.type === 'primary'
                      ? 'block w-full px-6 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all duration-200 text-center shadow-lg hover:shadow-xl transform hover:scale-105'
                      : 'block w-full px-6 py-3 rounded-lg font-semibold text-gray-600 dark:text-gray-300 border border-blue-300 dark:border-blue-400 hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-600 hover:text-white hover:border-blue-600 hover:shadow-md transition-all duration-200 text-center'
                  }
                  onClick={() => setMobileOpen(false)}
                >
                  {btn.label}
                </a>
              ))}
            </div>

            {/* Mobile Quick Actions */}
            <div className="pt-3 border-t border-border/30">
              <div className="text-sm font-semibold text-muted-foreground mb-3">Akses Cepat</div>
              <div className="grid grid-cols-2 gap-2">
                {popularLocations.slice(0, 6).map((location) => (
                  <button
                    key={location.id}
                    onClick={() => {
                      handleLocationClick(location);
                      setMobileOpen(false);
                    }}
                    className="flex items-center gap-2 px-3 py-2 text-sm bg-muted/50 hover:bg-muted rounded-lg transition-colors"
                  >
                    <MapPin className="h-3 w-3 text-primary" />
                    <span>{location.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
