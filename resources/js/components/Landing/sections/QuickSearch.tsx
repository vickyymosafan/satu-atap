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

// Mock location data for autocomplete
const mockLocations: LocationData[] = [
  { id: '1', name: 'Jakarta Pusat', city: 'Jakarta', province: 'DKI Jakarta', type: 'city' },
  { id: '2', name: 'Jakarta Selatan', city: 'Jakarta', province: 'DKI Jakarta', type: 'city' },
  { id: '3', name: 'Jakarta Barat', city: 'Jakarta', province: 'DKI Jakarta', type: 'city' },
  { id: '4', name: 'Jakarta Utara', city: 'Jakarta', province: 'DKI Jakarta', type: 'city' },
  { id: '5', name: 'Jakarta Timur', city: 'Jakarta', province: 'DKI Jakarta', type: 'city' },
  { id: '6', name: 'Bandung', city: 'Bandung', province: 'Jawa Barat', type: 'city' },
  { id: '7', name: 'Surabaya', city: 'Surabaya', province: 'Jawa Timur', type: 'city' },
  { id: '8', name: 'Yogyakarta', city: 'Yogyakarta', province: 'DI Yogyakarta', type: 'city' },
  { id: '9', name: 'Semarang', city: 'Semarang', province: 'Jawa Tengah', type: 'city' },
  { id: '10', name: 'Malang', city: 'Malang', province: 'Jawa Timur', type: 'city' },
];

// Available amenities with Indonesian labels
const availableAmenities: Amenity[] = [
  { id: 'wifi', name: 'WiFi Gratis', icon: <Wifi className="w-4 h-4" />, popular: true },
  { id: 'parking', name: 'Parkir Motor', icon: <Car className="w-4 h-4" />, popular: true },
  { id: 'ac', name: 'AC', icon: <Snowflake className="w-4 h-4" />, popular: true },
  { id: 'kitchen', name: 'Dapur Bersama', icon: <ChefHat className="w-4 h-4" />, popular: true },
  { id: 'tv', name: 'TV Kabel', icon: <Tv className="w-4 h-4" />, popular: false },
  { id: 'security', name: 'Keamanan 24 Jam', icon: <Shield className="w-4 h-4" />, popular: true },
  { id: 'electricity', name: 'Listrik Termasuk', icon: <Zap className="w-4 h-4" />, popular: false },
  { id: 'water', name: 'Air Bersih', icon: <Waves className="w-4 h-4" />, popular: false },
  { id: 'furnished', name: 'Kamar Furnished', icon: <Home className="w-4 h-4" />, popular: true },
];

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

  // Refs for click outside handling
  const locationDropdownRef = useRef<HTMLDivElement>(null);
  const locationInputRef = useRef<HTMLInputElement>(null);

  // Filter locations based on search input
  const filteredLocations = mockLocations.filter(location =>
    location.name.toLowerCase().includes(filters.location.toLowerCase()) ||
    location.city.toLowerCase().includes(filters.location.toLowerCase()) ||
    location.province.toLowerCase().includes(filters.location.toLowerCase())
  );

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
    <section id="quick-search" className="relative py-8 sm:py-12 lg:py-16 bg-background transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Simplified Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            Cari Kost Impian Anda
          </h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-xl mx-auto">
            Temukan kost yang sempurna dengan pencarian yang mudah dan cepat
          </p>
        </div>

        {/* Main Search Container - Simplified Design */}
        <div className="bg-card rounded-xl shadow-lg border border-border overflow-hidden">
          {/* Primary Search Section */}
          <div className="p-6 md:p-8">
            {/* Search Form - Clean Layout */}
            <div className="space-y-6">

              {/* Location Search - Simplified Design */}
              <div>
                <label className="block text-lg font-semibold text-foreground mb-3">
                  Di mana Anda ingin tinggal?
                  <span className="text-destructive ml-1">*</span>
                </label>
                <p className="text-sm text-muted-foreground mb-4">
                  Masukkan nama kota, daerah, atau landmark terdekat
                </p>
                <div className="relative">
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                      <MapPin className="h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors duration-200" />
                    </div>
                    <input
                      ref={locationInputRef}
                      type="text"
                      value={filters.location}
                      onChange={(e) => handleLocationChange(e.target.value)}
                      onFocus={() => setShowLocationDropdown(true)}
                      onKeyDown={handleLocationKeyDown}
                      placeholder="Contoh: Jakarta Selatan, Bandung..."
                      className="w-full pl-12 pr-12 py-4 text-base bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-foreground placeholder-muted-foreground transition-all duration-200"
                      required
                      aria-describedby="location-help"
                      aria-label="Masukkan lokasi kost yang diinginkan"
                      aria-expanded={showLocationDropdown}
                      aria-haspopup="listbox"
                      role="combobox"
                      autoComplete="off"
                    />
                    {filters.location && (
                      <button
                        type="button"
                        onClick={() => handleLocationChange('')}
                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-muted-foreground hover:text-foreground transition-colors duration-200"
                        aria-label="Hapus lokasi"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>

                  {/* Simplified Location Dropdown */}
                  {showLocationDropdown && (
                    <div
                      ref={locationDropdownRef}
                      className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto"
                      role="listbox"
                      aria-label="Pilihan lokasi"
                    >
                      <div className="p-2">
                        {/* Show popular cities when no input */}
                        {!filters.location && (
                          <>
                            <div className="px-3 py-2 text-xs text-muted-foreground font-medium border-b border-border mb-2">
                              Kota Populer
                            </div>
                            <div className="space-y-1">
                              {['Jakarta', 'Bandung', 'Yogyakarta', 'Surabaya', 'Semarang'].map((city) => (
                                <button
                                  key={city}
                                  onClick={() => handleLocationChange(city)}
                                  className="w-full px-3 py-2 text-left hover:bg-accent rounded-md transition-colors duration-200 text-sm"
                                  role="option"
                                >
                                  {city}
                                </button>
                              ))}
                            </div>
                          </>
                        )}

                        {/* Show filtered locations when typing */}
                        {filters.location && filteredLocations.length > 0 && (
                          <div className="space-y-1">
                            {filteredLocations.slice(0, 5).map((location) => (
                              <button
                                key={location.id}
                                onClick={() => handleLocationSelect(location)}
                                className="w-full px-3 py-2 text-left hover:bg-accent rounded-md transition-colors duration-200"
                                role="option"
                                aria-selected={filters.selectedLocation?.id === location.id}
                              >
                                <div className="text-sm font-medium text-popover-foreground">
                                  {location.name}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  {location.city}, {location.province}
                                </div>
                              </button>
                            ))}
                          </div>
                        )}

                        {/* No results message */}
                        {filters.location && filteredLocations.length === 0 && (
                          <div className="px-3 py-4 text-center">
                            <div className="text-sm text-muted-foreground">
                              Tidak ada lokasi yang ditemukan
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Price Range - Simplified Design */}
              <div>
                <label className="block text-lg font-semibold text-foreground mb-3">
                  Budget per bulan
                  <span className="text-muted-foreground text-sm font-normal ml-2">(Opsional)</span>
                </label>

                {/* Quick Budget Options - Simplified */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
                  {[
                    { label: '< 1 Juta', min: 0, max: 1000000 },
                    { label: '1-2 Juta', min: 1000000, max: 2000000 },
                    { label: '2-3 Juta', min: 2000000, max: 3000000 },
                    { label: '> 3 Juta', min: 3000000, max: 10000000 }
                  ].map((budget) => (
                    <button
                      key={budget.label}
                      type="button"
                      onClick={() => {
                        setFilters(prev => ({ ...prev, priceRange: [budget.min, budget.max] }));
                      }}
                      className={`px-3 py-2 text-sm rounded-lg transition-colors duration-200 border ${
                        filters.priceRange[0] === budget.min && filters.priceRange[1] === budget.max
                          ? 'bg-primary text-primary-foreground border-primary'
                          : 'bg-card text-card-foreground border-border hover:bg-accent'
                      }`}
                    >
                      {budget.label}
                    </button>
                  ))}
                </div>

                {/* Custom Range Inputs - Simplified */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm text-muted-foreground mb-2">
                      Minimum
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground text-sm">
                        Rp
                      </span>
                      <input
                        type="number"
                        value={filters.priceRange[0]}
                        onChange={(e) => handlePriceRangeChange(0, parseInt(e.target.value) || 0)}
                        placeholder="500000"
                        className="w-full pl-8 pr-3 py-2 text-sm bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-muted-foreground mb-2">
                      Maksimum
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground text-sm">
                        Rp
                      </span>
                      <input
                        type="number"
                        value={filters.priceRange[1]}
                        onChange={(e) => handlePriceRangeChange(1, parseInt(e.target.value) || 0)}
                        placeholder="2000000"
                        className="w-full pl-8 pr-3 py-2 text-sm bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                      />
                    </div>
                  </div>
                </div>

                {/* Budget Display - Simplified */}
                <div className="mt-3 text-center">
                  <div className="text-sm text-muted-foreground">
                    Budget: <span className="font-medium text-foreground">{formatPrice(filters.priceRange[0])} - {formatPrice(filters.priceRange[1])}</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Search Button - Simplified Design */}
            <div className="mt-6">
              <button
                onClick={handleSearch}
                disabled={isSearching || !filters.location.trim()}
                className="w-full px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
                aria-label={isSearching ? 'Sedang mencari kost' : 'Mulai pencarian kost'}
              >
                {isSearching ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary-foreground border-t-transparent"></div>
                    <span>Mencari...</span>
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4" />
                    <span>Cari Kost Sekarang</span>
                  </>
                )}
              </button>

              {/* Simplified Helper Text */}
              <div className="mt-4 text-center">
                {!filters.location.trim() ? (
                  <p className="text-sm text-muted-foreground">
                    Masukkan lokasi untuk mulai pencarian
                  </p>
                ) : (
                  <div className="text-sm text-muted-foreground">
                    Mencari di <span className="font-medium text-foreground">{filters.selectedLocation?.name || filters.location}</span>
                    {filters.amenities.length > 0 && (
                      <span> • {filters.amenities.length} fasilitas</span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Advanced Filters Toggle - Simplified */}
          <div className="border-t border-border px-6 py-4">
            <div className="flex justify-center">
              <button
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                className="inline-flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                <Sliders className="w-4 h-4" />
                <span>
                  {showAdvancedFilters ? 'Sembunyikan' : 'Pilih'} Fasilitas
                </span>
                <div className={`transform transition-transform duration-200 ${showAdvancedFilters ? 'rotate-180' : ''}`}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
            </div>
          </div>

          {/* Advanced Filters - Simplified */}
          {showAdvancedFilters && (
            <div className="px-6 pb-6">
              <div className="bg-muted/30 rounded-lg p-4">
                <div className="mb-4">
                  <h3 className="text-base font-semibold text-foreground mb-1">
                    Pilih Fasilitas
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Fasilitas yang Anda butuhkan
                  </p>
                </div>

                {/* All Amenities in one grid - Simplified */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
                  {availableAmenities.map((amenity) => (
                    <button
                      key={amenity.id}
                      onClick={() => handleAmenityToggle(amenity.id)}
                      className={`flex items-center gap-2 p-3 rounded-lg border transition-colors duration-200 text-left ${
                        filters.amenities.includes(amenity.id)
                          ? 'bg-primary text-primary-foreground border-primary'
                          : 'bg-card text-card-foreground border-border hover:bg-accent'
                      }`}
                    >
                      <div className={`flex-shrink-0 w-6 h-6 rounded flex items-center justify-center ${
                        filters.amenities.includes(amenity.id)
                          ? 'bg-primary-foreground/20'
                          : 'bg-muted'
                      }`}>
                        {amenity.icon}
                      </div>
                      <span className="text-sm font-medium">{amenity.name}</span>
                    </button>
                  ))}
                </div>

                {/* Selected Amenities Summary - Simplified */}
                {filters.amenities.length > 0 && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      {filters.amenities.length} fasilitas dipilih
                    </span>
                    <button
                      onClick={() => setFilters(prev => ({ ...prev, amenities: [] }))}
                      className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                    >
                      Hapus semua
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
