import React, { useState, useRef, useEffect } from 'react';
import { Search, MapPin, Sliders, Wifi, Car, Snowflake, ChefHat, Tv, Shield, Zap, Waves, Home, X } from 'lucide-react';

// Theme props interface - consistent with Header.tsx and Hero.tsx
interface ThemeProps {
  currentTheme: 'light' | 'dark';
  toggleTheme: () => void;
  getThemeIcon: () => React.ReactElement;
}

// Extended props interface for QuickSearch
interface QuickSearchProps extends ThemeProps {
  onSearch: (filters: SearchFilters) => Promise<void>;
  isSearching?: boolean;
}

// Location data interface
interface LocationData {
  id: string;
  name: string;
  city: string;
  province: string;
  type: 'city' | 'district' | 'area';
  full_name?: string;
  is_popular?: boolean;
}

// Search filters interface
interface SearchFilters {
  location: string;
  selectedLocation: LocationData | null;
  priceRange: [number, number];
  amenities: string[];
}

// Amenity interface
interface Amenity {
  id: string;
  name: string;
  icon: React.ReactElement;
  popular: boolean;
}

// API service for fetching cities
const fetchCities = async (search?: string, limit?: number): Promise<LocationData[]> => {
  try {
    const params = new URLSearchParams();
    if (search) params.append('q', search);
    if (limit) params.append('limit', limit.toString());

    const response = await fetch(`/api/kosts/locations/suggestions?${params}`);
    const data = await response.json();

    if (data.success) {
      return data.data.map((item: any) => ({
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

// API service for fetching popular cities
const fetchUniqueCities = async (): Promise<LocationData[]> => {
  try {
    const response = await fetch('/api/cities/popular');
    const data = await response.json();

    if (data.success) {
      return data.data.map((item: any) => ({
        id: String(item.id),
        name: item.name,
        city: item.city,
        province: item.province,
        type: item.type || 'city',
        full_name: item.full_name || `${item.name}, ${item.province}`,
        is_popular: item.is_popular || false,
      }));
    } else {
      console.error('Failed to fetch popular cities:', data.message);
      return [];
    }
  } catch (error) {
    console.error('Error fetching popular cities:', error);
    return [];
  }
};

// Amenity interface for API data
interface ApiAmenity {
  id: string;
  name: string;
  icon: string;
  category: string;
  is_popular: boolean;
}

// Icon mapping for amenities
const getAmenityIcon = (iconName: string): React.ReactElement => {
  const iconMap: Record<string, React.ReactElement> = {
    'wifi': <Wifi className="w-4 h-4" />,
    'car': <Car className="w-4 h-4" />,
    'snowflake': <Snowflake className="w-4 h-4" />,
    'chef-hat': <ChefHat className="w-4 h-4" />,
    'tv': <Tv className="w-4 h-4" />,
    'shield': <Shield className="w-4 h-4" />,
    'zap': <Zap className="w-4 h-4" />,
    'waves': <Waves className="w-4 h-4" />,
    'home': <Home className="w-4 h-4" />,
    'refrigerator': <Home className="w-4 h-4" />,
    'cup': <Waves className="w-4 h-4" />,
    'shirt': <Home className="w-4 h-4" />,
    'bath': <Waves className="w-4 h-4" />,
    'building': <Home className="w-4 h-4" />,
    'clock': <Zap className="w-4 h-4" />,
    'video': <Shield className="w-4 h-4" />,
  };
  return iconMap[iconName] || <Home className="w-4 h-4" />;
};

// API service for fetching amenities
const fetchAmenities = async (): Promise<Amenity[]> => {
  try {
    const response = await fetch('/api/kosts/amenities');
    const data = await response.json();

    if (data.success) {
      return data.data.all.map((amenity: ApiAmenity) => ({
        id: amenity.id,
        name: amenity.name,
        icon: getAmenityIcon(amenity.icon),
        popular: amenity.is_popular,
      }));
    } else {
      console.error('Failed to fetch amenities:', data.message);
      return [];
    }
  } catch (error) {
    console.error('Error fetching amenities:', error);
    return [];
  }
};

// Price formatting utility
const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

const QuickSearch: React.FC<QuickSearchProps> = ({ onSearch, isSearching = false }) => {
  // Search state management
  const [filters, setFilters] = useState<SearchFilters>({
    location: '',
    selectedLocation: null,
    priceRange: [500000, 5000000], // Default range: 500k - 5M IDR
    amenities: [],
  });

  // UI state
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [locations, setLocations] = useState<LocationData[]>([]);
  const [uniqueCities, setUniqueCities] = useState<LocationData[]>([]);
  const [loadingLocations, setLoadingLocations] = useState(false);
  const [availableAmenities, setAvailableAmenities] = useState<Amenity[]>([]);
  const [loadingAmenities, setLoadingAmenities] = useState(false);

  // Refs for click outside handling
  const locationDropdownRef = useRef<HTMLDivElement>(null);
  const locationInputRef = useRef<HTMLInputElement>(null);

  // Filtered locations based on search input
  const filteredLocations = locations;

  // Fetch unique cities and amenities on component mount
  useEffect(() => {
    const loadInitialData = async () => {
      // Load cities
      const cities = await fetchUniqueCities();
      setUniqueCities(cities);

      // Load amenities
      setLoadingAmenities(true);
      const amenities = await fetchAmenities();
      setAvailableAmenities(amenities);
      setLoadingAmenities(false);
    };
    loadInitialData();
  }, []);

  // Fetch locations based on search input
  useEffect(() => {
    const loadLocations = async () => {
      if (filters.location.trim()) {
        setLoadingLocations(true);
        const searchResults = await fetchCities(filters.location, 10);
        setLocations(searchResults);
        setLoadingLocations(false);
      } else {
        setLocations([]);
      }
    };

    const timeoutId = setTimeout(loadLocations, 300); // Debounce search
    return () => clearTimeout(timeoutId);
  }, [filters.location]);

  // Handle location input change
  const handleLocationChange = (value: string) => {
    setFilters(prev => ({ ...prev, location: value, selectedLocation: null }));
    setShowLocationDropdown(true);
  };

  // Handle keyboard navigation in location dropdown
  const handleLocationKeyDown = (event: React.KeyboardEvent) => {
    if (!showLocationDropdown || filteredLocations.length === 0) return;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        // Focus first option or move to next
        break;
      case 'ArrowUp':
        event.preventDefault();
        // Move to previous option
        break;
      case 'Enter':
        event.preventDefault();
        // Select current option
        if (filteredLocations.length > 0) {
          handleLocationSelect(filteredLocations[0]);
        }
        break;
      case 'Escape':
        setShowLocationDropdown(false);
        break;
    }
  };

  // Handle location selection
  const handleLocationSelect = (location: LocationData) => {
    setFilters(prev => ({
      ...prev,
      location: location.name,
      selectedLocation: location,
    }));
    setShowLocationDropdown(false);
  };

  // Handle price range change
  const handlePriceRangeChange = (index: number, value: number) => {
    setFilters(prev => {
      const newRange: [number, number] = [...prev.priceRange];
      newRange[index] = value;
      // Ensure min doesn't exceed max and vice versa
      if (index === 0 && value > newRange[1]) {
        newRange[1] = value;
      } else if (index === 1 && value < newRange[0]) {
        newRange[0] = value;
      }
      return { ...prev, priceRange: newRange };
    });
  };

  // Handle amenity toggle
  const handleAmenityToggle = (amenityId: string) => {
    setFilters(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenityId)
        ? prev.amenities.filter(id => id !== amenityId)
        : [...prev.amenities, amenityId],
    }));
  };

  // Handle search submission
  const handleSearch = async () => {
    try {
      await onSearch(filters);
    } catch (error) {
      console.error('Search error:', error);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        locationDropdownRef.current &&
        !locationDropdownRef.current.contains(event.target as Node) &&
        !locationInputRef.current?.contains(event.target as Node)
      ) {
        setShowLocationDropdown(false);
      }
    };

    if (showLocationDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showLocationDropdown]);

  return (
    <section id="quick-search" className="relative py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-background via-background to-muted/20 transition-colors duration-300">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(circle_at_1px_1px,_rgb(0,0,0)_1px,_transparent_0)] bg-[length:32px_32px]"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl relative">
        {/* Modern Header with Badge */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20 mb-6">
            <Search className="w-4 h-4 text-primary" />
            <span className="text-primary font-semibold text-sm">Pencarian Cerdas</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-4 leading-tight">
            Temukan Kost
            <span className="block bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
              Impian Anda
            </span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Pencarian yang mudah, cepat, dan akurat untuk menemukan hunian terbaik
          </p>
        </div>

        {/* Modern Search Container */}
        <div className="bg-card/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-border/50 overflow-hidden">
          {/* Floating Search Section */}
          <div className="p-8 md:p-10">
            {/* Location Search - Modern Design */}
            <div className="space-y-8">
              <div className="text-center">
                <h3 className="text-xl font-bold text-foreground mb-2">
                  Mulai Pencarian Anda
                </h3>
                <p className="text-muted-foreground">
                  Masukkan lokasi untuk menemukan kost terbaik
                </p>
              </div>

              <div className="relative">
                <div className="relative group">
                  {/* Floating Label */}
                  <label className={`absolute left-4 transition-all duration-200 pointer-events-none z-10 ${
                    filters.location
                      ? 'top-2 text-xs text-primary font-medium'
                      : 'top-1/2 -translate-y-1/2 text-base text-muted-foreground'
                  }`}>
                    {filters.location ? 'Lokasi' : 'Di mana Anda ingin tinggal?'}
                  </label>

                  {/* Location Icon */}
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none z-10">
                    <MapPin className="h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors duration-200" />
                  </div>

                  <input
                    ref={locationInputRef}
                    type="text"
                    value={filters.location}
                    onChange={(e) => handleLocationChange(e.target.value)}
                    onFocus={() => setShowLocationDropdown(true)}
                    onKeyDown={handleLocationKeyDown}
                    placeholder=""
                    className={`w-full px-4 pr-12 py-6 text-lg bg-background/50 border-2 border-border rounded-xl focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary text-foreground transition-all duration-300 ${
                      filters.location ? 'pt-8 pb-4' : ''
                    }`}
                    required
                    aria-describedby="location-help"
                    aria-label="Masukkan lokasi kost yang diinginkan"
                    aria-expanded={showLocationDropdown}
                    aria-haspopup="listbox"
                    role="combobox"
                    autoComplete="off"
                  />

                  {/* Clear Button */}
                  {filters.location && (
                    <button
                      type="button"
                      onClick={() => handleLocationChange('')}
                      className="absolute top-1/2 -translate-y-1/2 right-12 p-1 text-muted-foreground hover:text-foreground hover:bg-muted rounded-full transition-all duration-200"
                      aria-label="Hapus lokasi"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>

                {/* Modern Location Dropdown */}
                {showLocationDropdown && (
                  <div
                    ref={locationDropdownRef}
                    className="absolute top-full left-0 right-0 mt-3 bg-popover/95 backdrop-blur-md border border-border/50 rounded-xl shadow-2xl z-50 max-h-80 overflow-hidden"
                    role="listbox"
                    aria-label="Pilihan lokasi"
                  >
                    <div className="p-3">
                      {/* Show all cities when no input */}
                      {!filters.location && (
                        <>
                          <div className="px-4 py-3 text-sm text-muted-foreground font-semibold border-b border-border/30 mb-3">
                            🏙️ Kota Populer
                          </div>
                          <div className="space-y-2 max-h-64 overflow-y-auto">
                            {uniqueCities.map((location) => (
                              <button
                                key={location.id}
                                onClick={() => handleLocationChange(location.name)}
                                className="w-full px-4 py-3 text-left hover:bg-accent/80 rounded-lg transition-all duration-200 group"
                                role="option"
                              >
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                    <MapPin className="w-4 h-4 text-primary" />
                                  </div>
                                  <div>
                                    <div className="font-semibold text-foreground">{location.name}</div>
                                    <div className="text-sm text-muted-foreground">{location.province}</div>
                                  </div>
                                </div>
                              </button>
                            ))}
                          </div>
                        </>
                      )}

                      {/* Show filtered locations when typing */}
                      {filters.location && (
                        <>
                          {loadingLocations ? (
                            <div className="px-4 py-8 text-center">
                              <div className="animate-spin rounded-full h-6 w-6 border-2 border-primary border-t-transparent mx-auto mb-3"></div>
                              <div className="text-sm text-muted-foreground">
                                Mencari lokasi...
                              </div>
                            </div>
                          ) : filteredLocations.length > 0 ? (
                            <div className="space-y-2">
                              {filteredLocations.slice(0, 6).map((location) => (
                                <button
                                  key={location.id}
                                  onClick={() => handleLocationSelect(location)}
                                  className="w-full px-4 py-3 text-left hover:bg-accent/80 rounded-lg transition-all duration-200 group"
                                  role="option"
                                  aria-selected={filters.selectedLocation?.id === location.id}
                                >
                                  <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                      <MapPin className="w-4 h-4 text-primary" />
                                    </div>
                                    <div>
                                      <div className="font-semibold text-popover-foreground">
                                        {location.name}
                                      </div>
                                      <div className="text-sm text-muted-foreground">
                                        {location.city}, {location.province}
                                      </div>
                                    </div>
                                  </div>
                                </button>
                              ))}
                            </div>
                          ) : (
                            <div className="px-4 py-8 text-center">
                              <div className="text-4xl mb-3">🔍</div>
                              <div className="text-sm text-muted-foreground">
                                Tidak ada lokasi yang ditemukan
                              </div>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Search Button - Modern Design */}
            <div className="mt-8">
              <button
                onClick={handleSearch}
                disabled={isSearching || !filters.location.trim()}
                className="w-full px-8 py-5 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-bold text-lg rounded-xl hover:from-primary/90 hover:to-primary/70 focus:outline-none focus:ring-4 focus:ring-primary/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                aria-label={isSearching ? 'Sedang mencari kost' : 'Mulai pencarian kost'}
              >
                {isSearching ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-primary-foreground border-t-transparent"></div>
                    <span>Mencari Kost...</span>
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    <span>Temukan Kost Sekarang</span>
                  </>
                )}
              </button>

              {/* Status Text */}
              <div className="mt-4 text-center">
                {!filters.location.trim() ? (
                  <p className="text-muted-foreground">
                    💡 Masukkan lokasi untuk memulai pencarian
                  </p>
                ) : (
                  <div className="flex items-center justify-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-muted-foreground">
                      Siap mencari di <span className="font-semibold text-foreground">{filters.selectedLocation?.name || filters.location}</span>
                      {filters.amenities.length > 0 && (
                        <span> • {filters.amenities.length} fasilitas dipilih</span>
                      )}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Advanced Filters Toggle - Modern Design */}
          <div className="border-t border-border/30 px-8 py-6 bg-muted/20">
            <div className="flex justify-center">
              <button
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                className="inline-flex items-center gap-3 px-6 py-3 text-sm font-medium text-muted-foreground hover:text-foreground bg-background/50 hover:bg-background/80 rounded-full border border-border/50 hover:border-border transition-all duration-300 hover:shadow-md"
              >
                <Sliders className="w-4 h-4" />
                <span>
                  {showAdvancedFilters ? '🔼 Sembunyikan' : '🔽 Tambah'} Fasilitas
                </span>
                {filters.amenities.length > 0 && (
                  <div className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full font-bold">
                    {filters.amenities.length}
                  </div>
                )}
              </button>
            </div>
          </div>

          {/* Advanced Filters - Modern Design */}
          {showAdvancedFilters && (
            <div className="px-8 pb-8 border-t border-border/30 bg-gradient-to-b from-muted/10 to-muted/30">
              <div className="pt-6">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    ✨ Pilih Fasilitas Favorit
                  </h3>
                  <p className="text-muted-foreground">
                    Sesuaikan pencarian dengan fasilitas yang Anda butuhkan
                  </p>
                </div>

                {/* Modern Amenities Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-6">
                  {availableAmenities.map((amenity) => (
                    <button
                      key={amenity.id}
                      onClick={() => handleAmenityToggle(amenity.id)}
                      className={`group relative flex flex-col items-center gap-3 p-4 rounded-xl border-2 transition-all duration-300 text-center hover:scale-105 hover:shadow-lg ${
                        filters.amenities.includes(amenity.id)
                          ? 'bg-gradient-to-br from-primary to-primary/80 text-primary-foreground border-primary shadow-lg scale-105'
                          : 'bg-background/80 text-foreground border-border/50 hover:bg-background hover:border-primary/30'
                      }`}
                    >
                      {/* Icon Container */}
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                        filters.amenities.includes(amenity.id)
                          ? 'bg-primary-foreground/20 text-primary-foreground'
                          : 'bg-primary/10 text-primary group-hover:bg-primary/20'
                      }`}>
                        {amenity.icon}
                      </div>

                      {/* Amenity Name */}
                      <span className="text-sm font-semibold leading-tight">
                        {amenity.name}
                      </span>

                      {/* Selection Indicator */}
                      {filters.amenities.includes(amenity.id) && (
                        <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </button>
                  ))}
                </div>

                {/* Selection Summary */}
                {filters.amenities.length > 0 && (
                  <div className="flex items-center justify-between p-4 bg-background/50 rounded-xl border border-border/50">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-green-500/10 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="font-semibold text-foreground">
                        {filters.amenities.length} fasilitas dipilih
                      </span>
                    </div>
                    <button
                      onClick={() => setFilters(prev => ({ ...prev, amenities: [] }))}
                      className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground bg-muted/50 hover:bg-muted rounded-lg transition-all duration-200"
                    >
                      Hapus Semua
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default QuickSearch;
