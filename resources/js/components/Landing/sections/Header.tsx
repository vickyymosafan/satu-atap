import React from 'react';
import { Menu, X, Search, Home, Phone, HelpCircle, User, MapPin } from 'lucide-react';
import SatuAtapLogo from '../components/SatuAtapLogo';

// Theme props interface
interface ThemeProps {
  currentTheme: 'light' | 'dark';
  toggleTheme: () => void;
  getThemeIcon: () => React.ReactElement;
}

// Location data interface - consistent with QuickSearch
interface LocationData {
  id: string;
  name: string;
  city: string;
  province: string;
  type: 'city' | 'district' | 'area';
  full_name?: string;
  is_popular?: boolean;
}

// API response interface
interface CityApiResponse {
  id: number;
  name: string;
  city: string;
  province: string;
  type?: 'city' | 'district' | 'area';
  full_name?: string;
  is_popular?: boolean;
}

// Navigation link interface
interface NavLink {
  label: string;
  href: string;
  id: string;
  icon?: React.ReactElement;
}



// Main navigation links - simplified and focused
const navLinks: NavLink[] = [
  { label: 'Beranda', href: '#hero', id: 'hero', icon: <Home className="w-4 h-4" /> },
  { label: 'Cari Kost', href: '#quick-search', id: 'quick-search', icon: <Search className="w-4 h-4" /> },
  { label: 'Kost Tersedia', href: '#featured', id: 'featured' },
  { label: 'Panduan', href: '#why-choose-us', id: 'why-choose-us', icon: <HelpCircle className="w-4 h-4" /> },
  { label: 'Hubungi Kami', href: '#contact', id: 'contact', icon: <Phone className="w-4 h-4" /> },
];



// API service for fetching cities - consistent with QuickSearch
const fetchCities = async (search?: string, limit?: number): Promise<LocationData[]> => {
  try {
    const params = new URLSearchParams();
    if (search) params.append('q', search);
    if (limit) params.append('limit', limit.toString());

    const response = await fetch(`/api/kosts/locations/suggestions?${params}`);
    const data = await response.json();

    if (data.success) {
      return data.data.map((item: CityApiResponse) => ({
        id: String(item.id),
        name: item.name,
        city: item.city,
        province: item.province,
        type: item.type || 'city',
        full_name: item.full_name || `${item.name}, ${item.province}`,
        is_popular: item.is_popular || false,
      }));
    } else {
      console.error('Failed to fetch cities:', data.message);
      return [];
    }
  } catch (error) {
    console.error('Error fetching cities:', error);
    return [];
  }
};

const authButtons = [
  { label: 'Masuk', type: 'primary', href: '#', icon: <User className="w-4 h-4" /> },
];

const Header: React.FC<ThemeProps> = ({ currentTheme, toggleTheme, getThemeIcon }) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState('hero');


  const [quickSearchQuery, setQuickSearchQuery] = React.useState('');
  const [isHeaderVisible, setIsHeaderVisible] = React.useState(true);
  const [lastScrollY, setLastScrollY] = React.useState(0);

  // Location search states - consistent with QuickSearch
  const [showLocationDropdown, setShowLocationDropdown] = React.useState(false);
  const [locations, setLocations] = React.useState<LocationData[]>([]);
  const [selectedLocation, setSelectedLocation] = React.useState<LocationData | null>(null);
  const [loadingLocations, setLoadingLocations] = React.useState(false);

  // Scroll detection for active section and header visibility
  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Header visibility logic
      if (currentScrollY < 10) {
        // Always show header at top
        setIsHeaderVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down and past threshold - hide header
        setIsHeaderVisible(false);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up - show header
        setIsHeaderVisible(true);
      }

      setLastScrollY(currentScrollY);

      // Active section detection
      const sections = navLinks.map(link => document.getElementById(link.id));
      const scrollPosition = currentScrollY + 100; // Offset for header height

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
  }, [lastScrollY]);

  // Close mobile menu and dropdowns when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (mobileOpen && !target.closest('header')) {
        setMobileOpen(false);
      }
      if (showLocationDropdown && !target.closest('.search-container')) {
        setShowLocationDropdown(false);
      }
    };

    if (mobileOpen || showLocationDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [mobileOpen, showLocationDropdown]);

  // Fetch locations based on search input - consistent with QuickSearch
  React.useEffect(() => {
    const loadLocations = async () => {
      if (quickSearchQuery.trim()) {
        setLoadingLocations(true);
        const searchResults = await fetchCities(quickSearchQuery, 5);
        setLocations(searchResults);
        setLoadingLocations(false);
      } else {
        setLocations([]);
      }
    };

    const timeoutId = setTimeout(loadLocations, 300); // Debounce search
    return () => clearTimeout(timeoutId);
  }, [quickSearchQuery]);

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

  // Handle location selection
  const handleLocationSelect = (location: LocationData) => {
    setQuickSearchQuery(location.name);
    setSelectedLocation(location);
    setShowLocationDropdown(false);

    // Trigger search immediately
    handleQuickSearch(location.name);
  };

  // Handle quick search - enhanced with API integration
  const handleQuickSearch = async (query: string) => {
    if (query.trim()) {
      try {
        // Create search filters similar to QuickSearch
        const searchFilters = {
          location: query,
          selectedLocation: selectedLocation,
          priceRange: [500000, 5000000] as [number, number],
          amenities: [] as string[]
        };

        // Dispatch custom event to trigger search in QuickSearch component
        const searchEvent = new CustomEvent('headerSearch', {
          detail: searchFilters
        });
        window.dispatchEvent(searchEvent);

        // Navigate to featured section (where results will be displayed)
        const featuredSection = document.getElementById('featured');
        if (featuredSection) {
          const headerHeight = 100;
          const targetPosition = featuredSection.offsetTop - headerHeight;

          setTimeout(() => {
            window.scrollTo({
              top: targetPosition,
              behavior: 'smooth'
            });
          }, 300);
        }

        // Clear search query
        setQuickSearchQuery('');
        setShowLocationDropdown(false);
      } catch (error) {
        console.error('Search error:', error);
      }
    }
  };


  return (
    <header className={`fixed left-1/2 transform -translate-x-1/2 w-[98%] sm:w-[95%] md:w-[92%] lg:w-[90%] max-w-7xl bg-card/95 backdrop-blur-lg shadow-lg rounded-lg md:rounded-xl z-[100] border border-border transition-all duration-300 ${
      isHeaderVisible
        ? 'top-1 sm:top-4 translate-y-0 opacity-100'
        : '-top-20 sm:-top-24 -translate-y-full opacity-0'
    }`}>
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
          <div className="relative w-full search-container">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Cari kost..."
                value={quickSearchQuery}
                onChange={(e) => {
                  setQuickSearchQuery(e.target.value);
                  setShowLocationDropdown(true);
                }}
                onFocus={() => setShowLocationDropdown(true)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleQuickSearch(quickSearchQuery);
                  } else if (e.key === 'Escape') {
                    setShowLocationDropdown(false);
                  }
                }}
                className="w-full pl-10 pr-4 py-2 lg:py-2.5 bg-background/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm transition-all duration-200"
              />
            </div>

            {/* Location Dropdown for Desktop */}
            {showLocationDropdown && quickSearchQuery && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-popover/95 backdrop-blur-md border border-border rounded-lg shadow-xl z-50 max-h-60 overflow-y-auto">
                <div className="p-2">
                  {loadingLocations ? (
                    <div className="px-3 py-4 text-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent mx-auto mb-2"></div>
                      <div className="text-xs text-muted-foreground">Mencari lokasi...</div>
                    </div>
                  ) : locations.length > 0 ? (
                    <div className="space-y-1">
                      {locations.slice(0, 5).map((location) => (
                        <button
                          key={location.id}
                          onClick={() => handleLocationSelect(location)}
                          className="w-full px-3 py-2 text-left hover:bg-accent rounded-md transition-colors group"
                        >
                          <div className="flex items-center gap-2">
                            <MapPin className="h-3 w-3 text-primary flex-shrink-0" />
                            <div>
                              <div className="font-medium text-sm text-foreground">{location.name}</div>
                              <div className="text-xs text-muted-foreground">{location.city}, {location.province}</div>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="px-3 py-4 text-center">
                      <div className="text-xs text-muted-foreground">Tidak ada lokasi ditemukan</div>
                    </div>
                  )}
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
              <div className="relative search-container">
                <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Cari kost..."
                  value={quickSearchQuery}
                  onChange={(e) => {
                    setQuickSearchQuery(e.target.value);
                    setShowLocationDropdown(true);
                  }}
                  onFocus={() => setShowLocationDropdown(true)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleQuickSearch(quickSearchQuery);
                      setMobileOpen(false); // Close menu after search
                    } else if (e.key === 'Escape') {
                      setShowLocationDropdown(false);
                    }
                  }}
                  className="w-full pl-9 pr-3 py-2.5 bg-background/60 border border-border/50 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary/30 focus:border-primary text-sm placeholder:text-xs"
                />

                {/* Mobile Location Dropdown */}
                {showLocationDropdown && quickSearchQuery && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-popover/95 backdrop-blur-md border border-border rounded-lg shadow-xl z-50 max-h-48 overflow-y-auto">
                    <div className="p-2">
                      {loadingLocations ? (
                        <div className="px-3 py-3 text-center">
                          <div className="animate-spin rounded-full h-3 w-3 border-2 border-primary border-t-transparent mx-auto mb-2"></div>
                          <div className="text-xs text-muted-foreground">Mencari...</div>
                        </div>
                      ) : locations.length > 0 ? (
                        <div className="space-y-1">
                          {locations.slice(0, 4).map((location) => (
                            <button
                              key={location.id}
                              onClick={() => {
                                handleLocationSelect(location);
                                setMobileOpen(false);
                              }}
                              className="w-full px-2 py-2 text-left hover:bg-accent rounded-md transition-colors"
                            >
                              <div className="flex items-center gap-2">
                                <MapPin className="h-3 w-3 text-primary flex-shrink-0" />
                                <div>
                                  <div className="font-medium text-xs text-foreground">{location.name}</div>
                                  <div className="text-xs text-muted-foreground">{location.city}</div>
                                </div>
                              </div>
                            </button>
                          ))}
                        </div>
                      ) : (
                        <div className="px-3 py-3 text-center">
                          <div className="text-xs text-muted-foreground">Tidak ditemukan</div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
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
