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

const QuickSearch: React.FC<ThemeProps> = () => {
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
    <section id="quick-search" className="relative py-12 sm:py-16 lg:py-20 bg-background transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        {/* Laptop optimized Header */}
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4 md:mb-6 leading-tight">
            Cari Kost Impian Anda
          </h2>
          <p className="text-sm md:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto leading-normal">
            Temukan kost yang sempurna dengan pencarian yang mudah dan cepat
          </p>
        </div>

        {/* Main Search Container - Laptop optimized Design */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-card/80 backdrop-blur-sm rounded-xl lg:rounded-2xl shadow-lg border border-border/50 overflow-hidden">

            {/* Primary Search Section - Laptop optimized */}
            <div className="p-6 md:p-8 lg:p-10">
              {/* Laptop optimized Progress Indicator */}
              <div className="flex items-center justify-center mb-8 md:mb-10">
                <div className="flex items-center space-x-4 md:space-x-6">
                  <div className="flex items-center space-x-2 md:space-x-3">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs md:text-sm font-bold shadow-lg">1</div>
                    <span className="font-semibold text-foreground hidden sm:inline text-sm md:text-base">Lokasi</span>
                  </div>
                  <div className="w-8 md:w-12 lg:w-16 h-0.5 bg-gradient-to-r from-primary to-border rounded-full"></div>
                  <div className="flex items-center space-x-2 md:space-x-3">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-muted text-muted-foreground rounded-full flex items-center justify-center text-xs md:text-sm font-bold">2</div>
                    <span className="font-semibold text-muted-foreground hidden sm:inline text-sm md:text-base">Budget</span>
                  </div>
                  <div className="w-8 md:w-12 lg:w-16 h-0.5 bg-border rounded-full"></div>
                  <div className="flex items-center space-x-2 md:space-x-3">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-muted text-muted-foreground rounded-full flex items-center justify-center text-xs md:text-sm font-bold">3</div>
                    <span className="font-semibold text-muted-foreground hidden sm:inline text-sm md:text-base">Cari</span>
                  </div>
                </div>
              </div>

              {/* Search Form - Laptop optimized Layout */}
              <div className="space-y-6 md:space-y-8">

                {/* Location Search - Laptop optimized Design */}
                <div>
                  <label className="block text-lg md:text-xl font-bold text-foreground mb-4 md:mb-6">
                    Di mana Anda ingin tinggal?
                    <span className="text-destructive ml-1">*</span>
                  </label>
                  <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6">
                    Masukkan nama kota, daerah, atau landmark terdekat
                  </p>
                  <div className="relative">
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none z-10">
                        <MapPin className="h-6 w-6 text-muted-foreground group-focus-within:text-primary transition-colors duration-200" />
                      </div>
                      <input
                        ref={locationInputRef}
                        type="text"
                        value={filters.location}
                        onChange={(e) => handleLocationChange(e.target.value)}
                        onFocus={() => setShowLocationDropdown(true)}
                        onKeyDown={handleLocationKeyDown}
                        placeholder="Contoh: Jakarta Selatan, Bandung, atau Universitas Indonesia..."
                        className="w-full pl-16 pr-16 py-6 text-lg bg-input border-2 border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-foreground placeholder-muted-foreground transition-all duration-200 hover:border-accent shadow-sm"
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
                          className="absolute inset-y-0 right-0 pr-6 flex items-center text-muted-foreground hover:text-foreground transition-colors duration-200"
                          aria-label="Hapus lokasi"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      )}
                    </div>

                    {/* Enhanced Location Dropdown */}
                    {showLocationDropdown && (
                      <div
                        ref={locationDropdownRef}
                        className="absolute top-full left-0 right-0 mt-3 bg-popover border border-border rounded-xl shadow-2xl z-50 max-h-80 overflow-y-auto"
                        role="listbox"
                        aria-label="Pilihan lokasi"
                      >
                      <div className="p-3">
                        {/* Show popular cities when no input */}
                        {!filters.location && (
                          <>
                            <div className="px-4 py-3 text-sm text-muted-foreground font-semibold border-b border-border mb-3">
                              🏙️ Kota Populer
                            </div>
                            <div className="space-y-1">
                              {['Jakarta', 'Bandung', 'Yogyakarta', 'Surabaya', 'Semarang'].map((city) => (
                                <button
                                  key={city}
                                  onClick={() => handleLocationChange(city)}
                                  className="w-full px-4 py-4 text-left hover:bg-accent rounded-lg transition-all duration-200 group/item min-h-[52px] border border-transparent hover:border-accent"
                                  role="option"
                                >
                                  <div className="flex items-center space-x-4">
                                    <div className="w-3 h-3 bg-primary rounded-full group-hover/item:scale-110 transition-transform duration-200"></div>
                                    <div className="text-popover-foreground font-semibold text-base">
                                      {city}
                                    </div>
                                  </div>
                                </button>
                              ))}
                            </div>
                          </>
                        )}

                        {/* Show filtered locations when typing */}
                        {filters.location && filteredLocations.length > 0 && (
                          <>
                            <div className="px-4 py-3 text-sm text-muted-foreground font-semibold border-b border-border mb-3">
                              📍 Hasil Pencarian
                            </div>
                            <div className="space-y-1">
                              {filteredLocations.slice(0, 6).map((location, index) => (
                                <button
                                  key={location.id}
                                  onClick={() => handleLocationSelect(location)}
                                  className="w-full px-4 py-4 text-left hover:bg-accent rounded-lg transition-all duration-200 group/item min-h-[56px] border border-transparent hover:border-accent"
                                  role="option"
                                  aria-selected={filters.selectedLocation?.id === location.id}
                                  tabIndex={index === 0 ? 0 : -1}
                                >
                                  <div className="flex items-center space-x-4">
                                    <div className="w-3 h-3 bg-muted-foreground rounded-full group-hover/item:bg-primary group-hover/item:scale-110 transition-all duration-200"></div>
                                    <div>
                                      <div className="text-popover-foreground font-semibold text-base">
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
                          </>
                        )}

                        {/* No results message */}
                        {filters.location && filteredLocations.length === 0 && (
                          <div className="px-4 py-6 text-center">
                            <div className="text-muted-foreground mb-2">🔍</div>
                            <div className="text-sm text-muted-foreground font-medium">
                              Tidak ada lokasi yang ditemukan
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">
                              Coba kata kunci lain
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  </div>


                </div>

                {/* Price Range - Enhanced Design */}
                <div>
                  <label className="block text-xl font-bold text-foreground mb-4">
                    Berapa budget Anda per bulan?
                    <span className="text-muted-foreground text-base font-normal ml-2">(Opsional)</span>
                  </label>
                  <p className="text-sm text-muted-foreground mb-6">
                    Pilih rentang harga yang sesuai dengan kemampuan Anda
                  </p>

                  {/* Quick Budget Options - Enhanced */}
                  <div className="mb-8">
                    <span className="block text-sm text-muted-foreground font-semibold mb-4">💰 Budget Populer</span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {[
                        { label: '< 1 Juta', min: 0, max: 1000000, icon: '💵' },
                        { label: '1-2 Juta', min: 1000000, max: 2000000, icon: '💶' },
                        { label: '2-3 Juta', min: 2000000, max: 3000000, icon: '💷' },
                        { label: '> 3 Juta', min: 3000000, max: 10000000, icon: '💸' }
                      ].map((budget) => (
                        <button
                          key={budget.label}
                          type="button"
                          onClick={() => {
                            setFilters(prev => ({ ...prev, priceRange: [budget.min, budget.max] }));
                          }}
                          className={`min-h-[56px] px-4 py-3 text-sm rounded-xl transition-all duration-200 border font-semibold shadow-sm hover:shadow-md transform hover:scale-105 ${
                            filters.priceRange[0] === budget.min && filters.priceRange[1] === budget.max
                              ? 'bg-primary text-primary-foreground border-primary shadow-lg scale-105'
                              : 'bg-card text-card-foreground border-border hover:bg-accent hover:text-accent-foreground hover:border-accent'
                          }`}
                        >
                          <div className="text-lg mb-1">{budget.icon}</div>
                          <div>{budget.label}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Custom Range Inputs - Enhanced */}
                  <div className="bg-muted/30 rounded-xl p-6 border border-border/50">
                    <h4 className="text-base font-semibold text-foreground mb-4">
                      Atau atur budget custom:
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-3">
                          Harga Minimum
                        </label>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground text-base font-medium">
                            Rp
                          </span>
                          <input
                            type="number"
                            value={filters.priceRange[0]}
                            onChange={(e) => handlePriceRangeChange(0, parseInt(e.target.value) || 0)}
                            placeholder="500000"
                            className="w-full pl-10 pr-4 py-4 text-base bg-input border-2 border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-foreground placeholder-muted-foreground transition-all duration-200 shadow-sm"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-3">
                          Harga Maksimum
                        </label>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground text-base font-medium">
                            Rp
                          </span>
                          <input
                            type="number"
                            value={filters.priceRange[1]}
                            onChange={(e) => handlePriceRangeChange(1, parseInt(e.target.value) || 0)}
                            placeholder="2000000"
                            className="w-full pl-10 pr-4 py-4 text-base bg-input border-2 border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-foreground placeholder-muted-foreground transition-all duration-200 shadow-sm"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Budget Display - Enhanced */}
                    <div className="mt-6 p-4 bg-card rounded-xl border border-border shadow-sm">
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground mb-1">Budget yang dipilih:</div>
                        <div className="text-lg font-bold text-primary">
                          {formatPrice(filters.priceRange[0])} - {formatPrice(filters.priceRange[1])}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Search Button - Enhanced Design */}
              <div className="mt-10">
                <button
                  onClick={handleSearch}
                  disabled={isSearching || !filters.location.trim()}
                  className="w-full h-16 px-8 bg-gradient-to-r from-primary to-primary/90 text-primary-foreground font-bold rounded-2xl hover:from-primary/90 hover:to-primary focus:outline-none focus:ring-4 focus:ring-primary/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-4 shadow-xl hover:shadow-2xl text-xl transform hover:scale-[1.02] active:scale-[0.98] group"
                  aria-label={isSearching ? 'Sedang mencari kost' : 'Mulai pencarian kost'}
                >
                  {isSearching ? (
                    <>
                      <div className="animate-spin rounded-full h-6 w-6 border-3 border-primary-foreground border-t-transparent flex-shrink-0"></div>
                      <span>Mencari kost terbaik untuk Anda...</span>
                    </>
                  ) : (
                    <>
                      <Search className="w-6 h-6 flex-shrink-0 group-hover:scale-110 transition-transform duration-200" />
                      <span>Cari Kost Sekarang</span>
                      <div className="ml-2 text-primary-foreground/70 group-hover:text-primary-foreground transition-colors duration-200">
                        →
                      </div>
                    </>
                  )}
                </button>

                {/* Enhanced Helper Text & Search Summary */}
                <div className="mt-6 text-center">
                  {!filters.location.trim() ? (
                    <div className="bg-muted/50 rounded-xl p-4 border border-border/50">
                      <p className="text-sm text-muted-foreground">
                        📍 Masukkan lokasi untuk mulai mencari kost impian Anda
                      </p>
                    </div>
                  ) : (
                    <div className="bg-primary/5 rounded-xl p-4 border border-primary/20">
                      <div className="space-y-2">
                        <p className="text-base text-foreground font-semibold">
                          ✅ Siap mencari kost di <span className="text-primary">{filters.selectedLocation?.name || filters.location}</span>
                        </p>
                        <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                          <span>Budget: {formatPrice(filters.priceRange[0])} - {formatPrice(filters.priceRange[1])}</span>
                          {filters.amenities.length > 0 && (
                            <span>• {filters.amenities.length} fasilitas dipilih</span>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Advanced Filters Toggle - User-Friendly Design */}
            <div className="border-t border-border px-6 sm:px-8 py-6">
              <div className="flex justify-center">
                <button
                  onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-secondary hover:bg-accent text-secondary-foreground rounded-lg transition-all duration-200 text-sm font-medium"
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
                <div className="bg-muted/50 rounded-lg p-6">
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-foreground mb-2">
                      Fasilitas yang Anda butuhkan
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Pilih fasilitas penting untuk kenyamanan Anda
                    </p>
                  </div>

                  {/* Popular Amenities */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-card-foreground mb-3">
                      Fasilitas Populer
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {availableAmenities.filter(amenity => amenity.popular).map((amenity) => (
                        <button
                          key={amenity.id}
                          onClick={() => handleAmenityToggle(amenity.id)}
                          className={`flex items-center gap-3 p-4 min-h-[60px] rounded-lg border transition-all duration-200 text-left ${
                            filters.amenities.includes(amenity.id)
                              ? 'bg-primary text-primary-foreground border-primary'
                              : 'bg-card text-card-foreground border-border hover:bg-accent hover:text-accent-foreground'
                          }`}
                        >
                          <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${
                            filters.amenities.includes(amenity.id)
                              ? 'bg-primary-foreground/20'
                              : 'bg-muted'
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
                    <h4 className="text-sm font-semibold text-card-foreground mb-3">
                      Fasilitas Lainnya
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {availableAmenities.filter(amenity => !amenity.popular).map((amenity) => (
                        <button
                          key={amenity.id}
                          onClick={() => handleAmenityToggle(amenity.id)}
                          className={`flex items-center gap-3 p-4 min-h-[60px] rounded-lg border transition-all duration-200 text-left ${
                            filters.amenities.includes(amenity.id)
                              ? 'bg-primary text-primary-foreground border-primary'
                              : 'bg-card text-card-foreground border-border hover:bg-accent hover:text-accent-foreground'
                          }`}
                        >
                          <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${
                            filters.amenities.includes(amenity.id)
                              ? 'bg-primary-foreground/20'
                              : 'bg-muted'
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
                    <div className="mt-6 p-4 bg-card rounded-lg border border-border">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-card-foreground">
                          {filters.amenities.length} fasilitas dipilih
                        </span>
                        <button
                          onClick={() => setFilters(prev => ({ ...prev, amenities: [] }))}
                          className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-200"
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
