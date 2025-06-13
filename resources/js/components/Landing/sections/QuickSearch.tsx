import React, { useState, useRef, useEffect } from 'react';
import { Search, MapPin, Sliders, Wifi, Car, Snowflake, ChefHat, Tv, Shield, Zap, Waves, Home, X } from 'lucide-react';

// Theme props interface - consistent with Header.tsx and Hero.tsx
interface ThemeProps {
  currentTheme: 'light' | 'dark';
  toggleTheme: () => void;
  getThemeIcon: () => React.ReactElement;
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

const QuickSearch: React.FC<ThemeProps> = ({ currentTheme }) => {
  // Search state management
  const [filters, setFilters] = useState<SearchFilters>({
    location: '',
    selectedLocation: null,
    priceRange: [500000, 5000000], // Default range: 500k - 5M IDR
    amenities: [],
  });

  // UI state
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
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
    setIsSearching(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Here you would typically make an API call with the filters
      console.log('Search filters:', filters);
      
      // For now, just log the search
      alert(`Mencari kost di ${filters.selectedLocation?.name || filters.location} dengan budget ${formatPrice(filters.priceRange[0])} - ${formatPrice(filters.priceRange[1])}`);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsSearching(false);
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
    <section id="quick-search" className="relative py-8 sm:py-12 md:py-16 lg:py-20 bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Simplified Header - User-Focused */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-3 sm:mb-4">
            Temukan Kost Impian Anda
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
            Cari kost dengan mudah berdasarkan lokasi dan budget Anda
          </p>
        </div>

        {/* Main Search Container - User-Friendly Design */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden">

            {/* Primary Search Section */}
            <div className="p-6 sm:p-8">
              {/* Step Indicator - Mobile Optimized */}
              <div className="flex items-center justify-center mb-6 sm:mb-8">
                <div className="flex items-center space-x-3 sm:space-x-4 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  <div className="flex items-center space-x-2">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 bg-slate-600 dark:bg-slate-400 text-white dark:text-slate-900 rounded-full flex items-center justify-center text-xs sm:text-sm font-semibold">1</div>
                    <span className="font-medium hidden sm:inline">Lokasi</span>
                    <span className="font-medium sm:hidden">Lokasi</span>
                  </div>
                  <div className="w-6 sm:w-8 h-px bg-slate-300 dark:bg-slate-600"></div>
                  <div className="flex items-center space-x-2">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 bg-slate-300 dark:bg-slate-600 text-slate-600 dark:text-slate-400 rounded-full flex items-center justify-center text-xs sm:text-sm font-semibold">2</div>
                    <span className="hidden sm:inline">Budget</span>
                    <span className="sm:hidden">Budget</span>
                  </div>
                  <div className="w-6 sm:w-8 h-px bg-slate-300 dark:bg-slate-600"></div>
                  <div className="flex items-center space-x-2">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 bg-slate-300 dark:bg-slate-600 text-slate-600 dark:text-slate-400 rounded-full flex items-center justify-center text-xs sm:text-sm font-semibold">3</div>
                    <span className="hidden sm:inline">Cari</span>
                    <span className="sm:hidden">Cari</span>
                  </div>
                </div>
              </div>

              {/* Search Form - Simplified Layout */}
              <div className="space-y-6">

                {/* Location Search - User-Friendly Design */}
                <div>
                  <label className="block text-lg font-semibold text-slate-900 dark:text-white mb-3">
                    Di mana Anda ingin tinggal?
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <div className="relative">
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                        <MapPin className="h-5 w-5 text-slate-400 group-focus-within:text-slate-600 dark:group-focus-within:text-slate-300 transition-colors duration-200" />
                      </div>
                      <input
                        ref={locationInputRef}
                        type="text"
                        value={filters.location}
                        onChange={(e) => handleLocationChange(e.target.value)}
                        onFocus={() => setShowLocationDropdown(true)}
                        onKeyDown={handleLocationKeyDown}
                        placeholder="Coba ketik 'Jakarta', 'Bandung', atau nama daerah lainnya..."
                        className="w-full pl-12 pr-12 py-4 text-base bg-slate-50 dark:bg-slate-700 border-2 border-slate-200 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500/30 focus:border-slate-500 dark:focus:border-slate-400 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 transition-all duration-200 hover:border-slate-300 dark:hover:border-slate-500"
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
                          className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors duration-200"
                          aria-label="Hapus lokasi"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                    </div>

                    {/* Enhanced Location Dropdown with Popular Cities */}
                    {showLocationDropdown && (
                      <div
                        ref={locationDropdownRef}
                        className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg shadow-xl z-50 max-h-64 overflow-y-auto"
                        role="listbox"
                        aria-label="Pilihan lokasi"
                      >
                      <div className="p-2">
                        {/* Show popular cities when no input */}
                        {!filters.location && (
                          <>
                            <div className="px-3 py-2 text-xs text-slate-500 dark:text-slate-400 font-medium border-b border-slate-200 dark:border-slate-600 mb-2">
                              Kota populer:
                            </div>
                            {['Jakarta', 'Bandung', 'Yogyakarta', 'Surabaya', 'Semarang'].map((city) => (
                              <button
                                key={city}
                                onClick={() => handleLocationChange(city)}
                                className="w-full px-3 py-3 text-left hover:bg-slate-50 dark:hover:bg-slate-600 rounded-md transition-all duration-200 group/item min-h-[44px]"
                                role="option"
                              >
                                <div className="flex items-center space-x-3">
                                  <div className="w-2 h-2 bg-slate-400 dark:bg-slate-500 rounded-full group-hover/item:bg-slate-600 dark:group-hover/item:bg-slate-300 transition-colors duration-200"></div>
                                  <div className="text-slate-800 dark:text-slate-200 font-medium text-sm">
                                    {city}
                                  </div>
                                </div>
                              </button>
                            ))}
                          </>
                        )}

                        {/* Show filtered locations when typing */}
                        {filters.location && filteredLocations.length > 0 && (
                          <>
                            {filteredLocations.slice(0, 8).map((location, index) => (
                              <button
                                key={location.id}
                                onClick={() => handleLocationSelect(location)}
                                className="w-full px-3 py-3 text-left hover:bg-slate-50 dark:hover:bg-slate-600 rounded-md transition-all duration-200 group/item min-h-[44px]"
                                role="option"
                                aria-selected={filters.selectedLocation?.id === location.id}
                                tabIndex={index === 0 ? 0 : -1}
                              >
                                <div className="flex items-center space-x-3">
                                  <div className="w-2 h-2 bg-slate-400 dark:bg-slate-500 rounded-full group-hover/item:bg-slate-600 dark:group-hover/item:bg-slate-300 transition-colors duration-200"></div>
                                  <div>
                                    <div className="text-slate-800 dark:text-slate-200 font-medium text-sm">
                                      {location.name}
                                    </div>
                                    <div className="text-xs text-slate-500 dark:text-slate-400">
                                      {location.city}, {location.province}
                                    </div>
                                  </div>
                                </div>
                              </button>
                            ))}
                          </>
                        )}

                        {/* No results message */}
                        {filters.location && filteredLocations.length === 0 && (
                          <div className="px-3 py-4 text-center text-sm text-slate-500 dark:text-slate-400">
                            Tidak ada lokasi yang ditemukan
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  </div>


                </div>

                {/* Price Range - User-Friendly Design */}
                <div>
                  <label className="block text-lg font-semibold text-slate-900 dark:text-white mb-3">
                    Berapa budget Anda per bulan?
                    <span className="text-slate-500 dark:text-slate-400 text-sm font-normal ml-2">(Opsional)</span>
                  </label>

                  {/* Quick Budget Options - Touch-Friendly */}
                  <div className="mb-6">
                    <span className="block text-xs text-slate-500 dark:text-slate-400 font-medium mb-3">Budget populer:</span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
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
                          className={`min-h-[44px] px-3 py-2 text-sm rounded-lg transition-colors duration-200 border font-medium ${
                            filters.priceRange[0] === budget.min && filters.priceRange[1] === budget.max
                              ? 'bg-slate-600 dark:bg-slate-400 text-white dark:text-slate-900 border-slate-600 dark:border-slate-400'
                              : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-600 hover:bg-slate-200 dark:hover:bg-slate-600'
                          }`}
                        >
                          {budget.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Custom Range Inputs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Minimum
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 dark:text-slate-400 text-sm">
                          Rp
                        </span>
                        <input
                          type="number"
                          value={filters.priceRange[0]}
                          onChange={(e) => handlePriceRangeChange(0, parseInt(e.target.value) || 0)}
                          placeholder="500000"
                          className="w-full pl-8 pr-4 py-3 text-base bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500/30 focus:border-slate-500 dark:focus:border-slate-400 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 transition-all duration-200"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Maksimum
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 dark:text-slate-400 text-sm">
                          Rp
                        </span>
                        <input
                          type="number"
                          value={filters.priceRange[1]}
                          onChange={(e) => handlePriceRangeChange(1, parseInt(e.target.value) || 0)}
                          placeholder="2000000"
                          className="w-full pl-8 pr-4 py-3 text-base bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500/30 focus:border-slate-500 dark:focus:border-slate-400 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 transition-all duration-200"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Budget Display */}
                  <div className="mt-3 p-3 bg-slate-100 dark:bg-slate-700 rounded-lg">
                    <div className="text-sm text-slate-700 dark:text-slate-300">
                      <span className="font-medium">Budget Anda: </span>
                      {formatPrice(filters.priceRange[0])} - {formatPrice(filters.priceRange[1])}
                    </div>
                  </div>
                </div>

              </div>

              {/* Search Button - User-Friendly Design */}
              <div className="mt-8">
                <button
                  onClick={handleSearch}
                  disabled={isSearching || !filters.location.trim()}
                  className="w-full h-14 px-8 bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-800 font-bold rounded-lg hover:bg-slate-700 dark:hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl text-lg transform hover:scale-[1.02] active:scale-[0.98]"
                  aria-label={isSearching ? 'Sedang mencari kost' : 'Mulai pencarian kost'}
                >
                  {isSearching ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white dark:border-slate-800 border-t-transparent flex-shrink-0"></div>
                      <span>Mencari kost terbaik...</span>
                    </>
                  ) : (
                    <>
                      <Search className="w-5 h-5 flex-shrink-0" />
                      <span>Cari Kost Sekarang</span>
                    </>
                  )}
                </button>

                {/* Helper Text & Search Summary */}
                <div className="mt-3 text-center">
                  {!filters.location.trim() ? (
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Masukkan lokasi untuk mulai mencari kost
                    </p>
                  ) : (
                    <div className="space-y-1">
                      <p className="text-sm text-slate-600 dark:text-slate-300">
                        Siap mencari kost di <span className="font-semibold">{filters.selectedLocation?.name || filters.location}</span>
                      </p>
                      {filters.amenities.length > 0 && (
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          dengan {filters.amenities.length} fasilitas pilihan
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Advanced Filters Toggle - User-Friendly Design */}
            <div className="border-t border-slate-200 dark:border-slate-600 px-6 sm:px-8 py-6">
              <div className="flex justify-center">
                <button
                  onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 rounded-lg transition-all duration-200 text-sm font-medium"
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

            {/* Advanced Filters - User-Friendly Design */}
            {showAdvancedFilters && (
              <div className="px-6 sm:px-8 pb-6">
                <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-6">
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                      Fasilitas yang Anda butuhkan
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Pilih fasilitas penting untuk kenyamanan Anda
                    </p>
                  </div>

                  {/* Popular Amenities */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                      Fasilitas Populer
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {availableAmenities.filter(amenity => amenity.popular).map((amenity) => (
                        <button
                          key={amenity.id}
                          onClick={() => handleAmenityToggle(amenity.id)}
                          className={`flex items-center gap-3 p-4 min-h-[60px] rounded-lg border transition-all duration-200 text-left ${
                            filters.amenities.includes(amenity.id)
                              ? 'bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-800 border-slate-800 dark:border-slate-200'
                              : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-600'
                          }`}
                        >
                          <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${
                            filters.amenities.includes(amenity.id)
                              ? 'bg-white/20 dark:bg-slate-800/20'
                              : 'bg-slate-100 dark:bg-slate-600'
                          }`}>
                            {amenity.icon}
                          </div>
                          <span className="text-sm sm:text-base font-medium">{amenity.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Other Amenities */}
                  <div>
                    <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                      Fasilitas Lainnya
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {availableAmenities.filter(amenity => !amenity.popular).map((amenity) => (
                        <button
                          key={amenity.id}
                          onClick={() => handleAmenityToggle(amenity.id)}
                          className={`flex items-center gap-3 p-4 min-h-[60px] rounded-lg border transition-all duration-200 text-left ${
                            filters.amenities.includes(amenity.id)
                              ? 'bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-800 border-slate-800 dark:border-slate-200'
                              : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-600'
                          }`}
                        >
                          <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${
                            filters.amenities.includes(amenity.id)
                              ? 'bg-white/20 dark:bg-slate-800/20'
                              : 'bg-slate-100 dark:bg-slate-600'
                          }`}>
                            {amenity.icon}
                          </div>
                          <span className="text-sm sm:text-base font-medium">{amenity.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Selected Amenities Summary */}
                  {filters.amenities.length > 0 && (
                    <div className="mt-6 p-4 bg-white dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                          {filters.amenities.length} fasilitas dipilih
                        </span>
                        <button
                          onClick={() => setFilters(prev => ({ ...prev, amenities: [] }))}
                          className="text-xs text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 transition-colors duration-200"
                        >
                          Hapus semua
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuickSearch;
