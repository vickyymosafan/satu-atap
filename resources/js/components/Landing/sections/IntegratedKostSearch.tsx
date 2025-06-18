import React, { useState, useRef, useEffect } from 'react';
import { Search, MapPin, Sliders, Wifi, Car, Snowflake, ChefHat, Tv, Shield, Zap, Waves, Home, X, Star, Eye, Heart, ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';
import { KostProperty } from '@/types';

// Theme props interface
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
  district?: string;
  full_name?: string;
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

const IntegratedKostSearch: React.FC<ThemeProps> = () => {
  // Search state management
  const [filters, setFilters] = useState<SearchFilters>({
    location: '',
    selectedLocation: null,
    priceRange: [500000, 5000000], // Default range: 500k - 5M IDR
    amenities: [],
  });

  // Properties state
  const [properties, setProperties] = useState<KostProperty[]>([]);
  const [featuredProperties, setFeaturedProperties] = useState<KostProperty[]>([]);
  const [loading, setLoading] = useState(false);
  const [featuredLoading, setFeaturedLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  // UI state
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [locationSuggestions, setLocationSuggestions] = useState<LocationData[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<KostProperty | null>(null);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [isVisible, setIsVisible] = useState(false);
  const [availableAmenities, setAvailableAmenities] = useState<Amenity[]>([]);
  const [loadingAmenities, setLoadingAmenities] = useState(false);

  // Refs for click outside handling
  const locationDropdownRef = useRef<HTMLDivElement>(null);
  const locationInputRef = useRef<HTMLInputElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Fetch featured properties and amenities on component mount
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        // Fetch featured properties
        setFeaturedLoading(true);
        const propertiesResponse = await fetch('/api/kosts/featured');
        const propertiesData = await propertiesResponse.json();

        if (propertiesData.success) {
          setFeaturedProperties(propertiesData.data);
        } else {
          setError(propertiesData.message || 'Gagal memuat kost unggulan.');
        }

        // Fetch amenities
        setLoadingAmenities(true);
        const amenities = await fetchAmenities();
        setAvailableAmenities(amenities);
        setLoadingAmenities(false);

      } catch (error) {
        console.error('Error fetching initial data:', error);
        setError('Gagal memuat data. Silakan coba lagi.');
      } finally {
        setFeaturedLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Fetch location suggestions
  const fetchLocationSuggestions = async (query: string) => {
    try {
      const response = await fetch(`/api/kosts/locations/suggestions?q=${encodeURIComponent(query)}`);
      const data = await response.json();

      if (data.success) {
        // Ensure ID is converted to string for consistency
        const transformedData = data.data.map((item: any) => ({
          ...item,
          id: String(item.id)
        }));
        setLocationSuggestions(transformedData);
      }
    } catch (error) {
      console.error('Error fetching location suggestions:', error);
    }
  };

  // Handle location input change
  const handleLocationChange = (value: string) => {
    setFilters(prev => ({ ...prev, location: value, selectedLocation: null }));
    setShowLocationDropdown(true);

    if (value.trim()) {
      fetchLocationSuggestions(value);
    } else {
      fetchLocationSuggestions(''); // Get popular cities
    }
  };

  // Handle location selection
  const handleLocationSelect = (location: LocationData) => {
    setFilters(prev => ({
      ...prev,
      location: location.full_name || location.name,
      selectedLocation: location,
    }));
    setShowLocationDropdown(false);
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
    if (!filters.location.trim()) {
      alert('Silakan masukkan lokasi terlebih dahulu');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const searchParams = new URLSearchParams({
        location: filters.selectedLocation?.name || filters.location,
        min_price: filters.priceRange[0].toString(),
        max_price: filters.priceRange[1].toString(),
      });

      if (filters.amenities.length > 0) {
        filters.amenities.forEach(amenity => {
          searchParams.append('amenities[]', amenity);
        });
      }

      const response = await fetch(`/api/kosts/search?${searchParams}`);
      const data = await response.json();

      if (data.success) {
        setProperties(data.data);
        setHasSearched(true);
      } else {
        setError(data.message || 'Gagal mencari kost.');
      }
    } catch (error) {
      console.error('Search error:', error);
      setError('Gagal mencari kost. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickView = (property: KostProperty) => {
    setSelectedProperty(property);
  };

  const handleCloseQuickView = () => {
    setSelectedProperty(null);
  };

  const handleToggleFavorite = (propertyId: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(propertyId)) {
        newFavorites.delete(propertyId);
      } else {
        newFavorites.add(propertyId);
      }
      return newFavorites;
    });
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
    <section
      ref={sectionRef}
      className="py-8 sm:py-12 lg:py-16 bg-background transition-colors duration-300"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Search Section */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            Cari Kost Impian Anda
          </h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-xl mx-auto">
            Temukan kost yang sempurna dengan pencarian yang mudah dan cepat
          </p>
        </div>

        {/* Main Search Container */}
        <div className="bg-card rounded-xl shadow-lg border border-border overflow-hidden mb-12">
          {/* Primary Search Section */}
          <div className="p-6 md:p-8">
            <div className="space-y-6">
              {/* Location Search */}
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
                      placeholder="Contoh: Jakarta Selatan, Bandung..."
                      className="w-full pl-12 pr-12 py-4 text-base bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-foreground placeholder-muted-foreground transition-all duration-200"
                      required
                    />
                    {filters.location && (
                      <button
                        type="button"
                        onClick={() => handleLocationChange('')}
                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-muted-foreground hover:text-foreground transition-colors duration-200"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>

                  {/* Location Dropdown */}
                  {showLocationDropdown && (
                    <div
                      ref={locationDropdownRef}
                      className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto"
                    >
                      <div className="p-2">
                        {locationSuggestions.length > 0 ? (
                          <div className="space-y-1">
                            {locationSuggestions.map((location) => (
                              <button
                                key={location.id}
                                onClick={() => handleLocationSelect(location)}
                                className="w-full px-3 py-2 text-left hover:bg-accent rounded-md transition-colors duration-200"
                              >
                                <div className="text-sm font-medium text-popover-foreground">
                                  {location.name}
                                </div>
                                {location.full_name && (
                                  <div className="text-xs text-muted-foreground">
                                    {location.full_name}
                                  </div>
                                )}
                              </button>
                            ))}
                          </div>
                        ) : (
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

              {/* Price Range */}
              <div>
                <label className="block text-lg font-semibold text-foreground mb-3">
                  Budget per bulan
                  <span className="text-muted-foreground text-sm font-normal ml-2">(Opsional)</span>
                </label>

                {/* Quick Budget Options */}
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

                {/* Budget Display */}
                <div className="text-center">
                  <div className="text-sm text-muted-foreground">
                    Budget: <span className="font-medium text-foreground">{formatPrice(filters.priceRange[0])} - {formatPrice(filters.priceRange[1])}</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Search Button */}
            <div className="mt-6">
              <button
                onClick={handleSearch}
                disabled={loading || !filters.location.trim()}
                className="w-full px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
              >
                {loading ? (
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

              {/* Helper Text */}
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

          {/* Advanced Filters Toggle */}
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

          {/* Advanced Filters */}
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

                {/* Amenities Grid */}
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

                {/* Selected Amenities Summary */}
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

        {/* Results Section */}
        {hasSearched && (
          <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {/* Search Results Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    Hasil Pencarian
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {loading ? 'Mencari...' : `${properties.length} kost ditemukan di ${filters.selectedLocation?.name || filters.location}`}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setHasSearched(false);
                    setProperties([]);
                    setError(null);
                  }}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  Tutup hasil
                </button>
              </div>
            </div>

            {/* Search Results */}
            {loading ? (
              // Loading State
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="bg-card/80 backdrop-blur-sm rounded-xl shadow-lg border border-border/50 overflow-hidden">
                    <div className="aspect-[3/2] bg-muted animate-pulse" />
                    <div className="p-4 space-y-3">
                      <div className="h-4 bg-muted animate-pulse rounded-lg" />
                      <div className="h-3 bg-muted animate-pulse rounded-lg w-3/4" />
                      <div className="h-3 bg-muted animate-pulse rounded-lg w-1/2" />
                      <div className="flex justify-between items-center pt-3 border-t border-border">
                        <div className="h-5 bg-muted animate-pulse rounded-lg w-24" />
                        <div className="h-8 bg-muted animate-pulse rounded-lg w-20" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : error ? (
              // Error State
              <div className="text-center py-12">
                <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-8 border border-border/50 shadow-lg max-w-md mx-auto">
                  <div className="text-muted-foreground mb-6">
                    <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-3">Terjadi Kesalahan</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">{error}</p>
                  <button
                    onClick={handleSearch}
                    className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    Coba Lagi
                  </button>
                </div>
              </div>
            ) : properties.length === 0 ? (
              // No Results State
              <div className="text-center py-12">
                <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-8 border border-border/50 shadow-lg max-w-md mx-auto">
                  <div className="text-muted-foreground mb-6">
                    <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-3">Tidak Ada Hasil</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    Tidak ada kost yang ditemukan dengan kriteria pencarian Anda. Coba ubah filter atau lokasi pencarian.
                  </p>
                  <button
                    onClick={() => {
                      setFilters({
                        location: '',
                        selectedLocation: null,
                        priceRange: [500000, 5000000],
                        amenities: [],
                      });
                      setHasSearched(false);
                    }}
                    className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    Reset Pencarian
                  </button>
                </div>
              </div>
            ) : (
              // Properties Grid
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {properties.map((property) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    onQuickView={handleQuickView}
                    onToggleFavorite={handleToggleFavorite}
                    isFavorite={favorites.has(property.id)}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Featured Properties Section - Show when no search has been performed */}
        {!hasSearched && (
          <div className={`transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {/* Section Header */}
            <div className="text-center mb-8 md:mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-full border border-primary/20 mb-4">
                <span className="text-primary font-semibold text-xs">⭐ Pilihan Terbaik</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3 md:mb-4 leading-tight">
                Kost Unggulan
              </h2>
              <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Temukan kost terbaik dengan fasilitas lengkap dan lokasi strategis yang telah dipilih khusus untuk Anda.
                Semua properti telah diverifikasi dan mendapat rating tinggi dari penghuni.
              </p>
            </div>

            {/* Featured Properties Content */}
            {featuredLoading ? (
              // Loading State
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="bg-card/80 backdrop-blur-sm rounded-xl shadow-lg border border-border/50 overflow-hidden">
                    <div className="aspect-[3/2] bg-muted animate-pulse" />
                    <div className="p-4 space-y-3">
                      <div className="h-4 bg-muted animate-pulse rounded-lg" />
                      <div className="h-3 bg-muted animate-pulse rounded-lg w-3/4" />
                      <div className="h-3 bg-muted animate-pulse rounded-lg w-1/2" />
                      <div className="flex justify-between items-center pt-3 border-t border-border">
                        <div className="h-5 bg-muted animate-pulse rounded-lg w-24" />
                        <div className="h-8 bg-muted animate-pulse rounded-lg w-20" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : error ? (
              // Error State
              <div className="text-center py-12">
                <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-8 border border-border/50 shadow-lg max-w-md mx-auto">
                  <div className="text-muted-foreground mb-6">
                    <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-3">Terjadi Kesalahan</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">{error}</p>
                  <button
                    onClick={() => window.location.reload()}
                    className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    Coba Lagi
                  </button>
                </div>
              </div>
            ) : (
              // Featured Properties Grid
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredProperties.map((property, index) => (
                  <div
                    key={property.id}
                    className="transition-all duration-500"
                    style={{
                      animationDelay: isVisible ? `${index * 150}ms` : '0ms'
                    }}
                  >
                    <PropertyCard
                      property={property}
                      onQuickView={handleQuickView}
                      onToggleFavorite={handleToggleFavorite}
                      isFavorite={favorites.has(property.id)}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Quick View Modal */}
      {selectedProperty && (
        <QuickViewModal
          property={selectedProperty}
          onClose={handleCloseQuickView}
          onToggleFavorite={handleToggleFavorite}
          isFavorite={favorites.has(selectedProperty.id)}
        />
      )}
    </section>
  );
};

// Property card component
interface PropertyCardProps {
  property: KostProperty;
  onQuickView: (property: KostProperty) => void;
  onToggleFavorite: (propertyId: string) => void;
  isFavorite: boolean;
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  onQuickView,
  onToggleFavorite,
  isFavorite
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentImageIndex((prev) =>
      prev === property.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentImageIndex((prev) =>
      prev === 0 ? property.images.length - 1 : prev - 1
    );
  };

  // Reset image state when property changes
  React.useEffect(() => {
    setCurrentImageIndex(0);
    setImageLoaded(false);
    setImageError(false);
  }, [property.id]);

  return (
    <div className="group bg-card/80 backdrop-blur-sm rounded-xl shadow-lg border border-border/50 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] h-full flex flex-col">
      {/* Image Section */}
      <div className="relative aspect-[3/2] overflow-hidden">
        {/* Image */}
        <div className="relative w-full h-full bg-muted">
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 bg-muted animate-pulse flex items-center justify-center">
              <div className="text-muted-foreground text-sm font-medium">Memuat gambar...</div>
            </div>
          )}
          {imageError ? (
            <div className="absolute inset-0 bg-muted flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <div className="w-20 h-20 mx-auto mb-3 bg-muted-foreground/20 rounded-2xl flex items-center justify-center">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="text-sm font-medium">Gambar tidak tersedia</div>
              </div>
            </div>
          ) : (
            <img
              src={property.images[currentImageIndex]?.url || 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&h=600&fit=crop'}
              alt={property.images[currentImageIndex]?.alt || property.title}
              className={`w-full h-full object-cover transition-all duration-300 group-hover:scale-105 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
              loading="lazy"
            />
          )}
        </div>

        {/* Image Navigation */}
        {property.images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              aria-label="Gambar sebelumnya"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              aria-label="Gambar selanjutnya"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}

        {/* Image Indicators */}
        {property.images.length > 1 && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1">
            {property.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                  index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                }`}
                aria-label={`Gambar ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className="absolute top-3 right-3 flex space-x-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={() => onToggleFavorite(property.id)}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 shadow-md backdrop-blur-sm ${
              isFavorite
                ? 'bg-red-500 text-white scale-110'
                : 'bg-white/90 hover:bg-white text-gray-700 hover:text-red-500 hover:scale-110'
            }`}
            aria-label={isFavorite ? 'Hapus dari favorit' : 'Tambah ke favorit'}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
          <button
            onClick={() => onQuickView(property)}
            className="w-8 h-8 bg-white/90 hover:bg-white text-gray-700 hover:text-primary rounded-full flex items-center justify-center transition-all duration-300 shadow-md backdrop-blur-sm hover:scale-110"
            aria-label="Lihat detail cepat"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Property Type Badge */}
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-1 text-xs font-bold rounded-full shadow-md backdrop-blur-sm ${
            property.property_type === 'putra'
              ? 'bg-blue-500/90 text-white'
              : property.property_type === 'putri'
              ? 'bg-pink-500/90 text-white'
              : 'bg-green-500/90 text-white'
          }`}>
            {property.property_type === 'putra' ? '👨 Putra' :
             property.property_type === 'putri' ? '👩 Putri' : '👥 Campur'}
          </span>
        </div>

        {/* Verified Badge */}
        {property.is_verified && (
          <div className="absolute bottom-3 left-3">
            <div className="flex items-center space-x-1 bg-green-500/90 text-white px-2 py-1 rounded-full text-xs font-bold shadow-md backdrop-blur-sm">
              <CheckCircle className="w-3 h-3" />
              <span>Terverifikasi</span>
            </div>
          </div>
        )}

        {/* Rating Badge */}
        <div className="absolute bottom-3 right-3">
          <div className="flex items-center space-x-1 bg-yellow-500/90 text-white px-2 py-1 rounded-full text-xs font-bold shadow-md backdrop-blur-sm">
            <Star className="w-3 h-3 fill-current" />
            <span>{property.rating}</span>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Title and Rating */}
        <div className="space-y-2 mb-3">
          <h3 className="text-base font-bold text-foreground line-clamp-2 group-hover:text-primary transition-colors duration-300 leading-tight min-h-[2.5rem]">
            {property.title}
          </h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1 bg-yellow-50 dark:bg-yellow-900/20 px-2 py-1 rounded-lg">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                <span className="text-xs font-bold text-foreground">
                  {property.rating}
                </span>
              </div>
              <span className="text-xs text-muted-foreground">
                ({property.review_count} ulasan)
              </span>
            </div>
            <div className="text-xs font-semibold text-green-600 dark:text-green-400">
              {property.available_rooms} kamar tersisa
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-start space-x-2 bg-muted/30 rounded-lg p-3 mb-3">
          <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
          <div>
            <div className="text-xs font-semibold text-foreground">
              {property.location.district}, {property.location.city}
            </div>
            <div className="text-xs text-muted-foreground">
              {property.location.province}
            </div>
          </div>
        </div>

        {/* Amenities */}
        <div className="space-y-2 mb-4 flex-grow">
          <div className="text-xs font-semibold text-foreground">Fasilitas:</div>
          <div className="flex flex-wrap gap-1.5">
            {property.amenities.slice(0, 3).map((amenity) => (
              <div key={amenity.id} className="flex items-center space-x-1 bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium">
                {amenity.icon === 'wifi' && <Wifi className="w-3 h-3" />}
                {amenity.icon === 'car' && <Car className="w-3 h-3" />}
                {amenity.icon === 'shield' && <Shield className="w-3 h-3" />}
                {amenity.icon === 'snowflake' && <Snowflake className="w-3 h-3" />}
                {amenity.icon === 'chef-hat' && <ChefHat className="w-3 h-3" />}
                {amenity.icon === 'tv' && <Tv className="w-3 h-3" />}
                {amenity.icon === 'zap' && <Zap className="w-3 h-3" />}
                {amenity.icon === 'waves' && <Waves className="w-3 h-3" />}
                {amenity.icon === 'home' && <Home className="w-3 h-3" />}
                <span>{amenity.name}</span>
              </div>
            ))}
            {property.amenities.length > 3 && (
              <div className="bg-muted text-muted-foreground px-2 py-1 rounded-full text-xs font-medium">
                +{property.amenities.length - 3} lainnya
              </div>
            )}
          </div>
        </div>

        {/* Price */}
        <div className="pt-4 border-t border-border mt-auto">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-lg font-bold text-primary">
                {formatPrice(property.price_monthly)}
              </div>
              <div className="text-xs text-muted-foreground font-medium">per bulan</div>
            </div>
            <button
              onClick={() => onQuickView(property)}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-300 text-xs font-bold shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Lihat Detail
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Quick View Modal Component
interface QuickViewModalProps {
  property: KostProperty;
  onClose: () => void;
  onToggleFavorite: (propertyId: string) => void;
  isFavorite: boolean;
}

const QuickViewModal: React.FC<QuickViewModalProps> = ({
  property,
  onClose,
  onToggleFavorite,
  isFavorite
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const modalRef = useRef<HTMLDivElement>(null);

  // Handle escape key and click outside
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('mousedown', handleClickOutside);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === property.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? property.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="fixed inset-0 z-[200] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div
        ref={modalRef}
        className="bg-card rounded-2xl shadow-2xl border border-border max-w-4xl w-full max-h-[90vh] overflow-hidden"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h3 className="text-lg font-semibold text-foreground">Detail Kost</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-muted flex items-center justify-center transition-colors duration-200"
            aria-label="Tutup modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                <img
                  src={property.images[currentImageIndex]?.url || 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&h=600&fit=crop'}
                  alt={property.images[currentImageIndex]?.alt || property.title}
                  className="w-full h-full object-cover"
                />

                {/* Image Navigation */}
                {property.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors duration-200"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors duration-200"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}

                {/* Image Counter */}
                <div className="absolute bottom-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-sm">
                  {currentImageIndex + 1} / {property.images.length}
                </div>
              </div>

              {/* Image Thumbnails */}
              {property.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {property.images.map((image, index) => (
                    <button
                      key={image.id}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors duration-200 ${
                        index === currentImageIndex
                          ? 'border-primary'
                          : 'border-transparent hover:border-muted-foreground'
                      }`}
                    >
                      <img
                        src={image.url}
                        alt={image.alt}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Property Details */}
            <div className="space-y-6">
              {/* Title and Basic Info */}
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <h2 className="text-2xl font-bold text-foreground pr-4">
                    {property.title}
                  </h2>
                  <button
                    onClick={() => onToggleFavorite(property.id)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${
                      isFavorite
                        ? 'bg-red-500 text-white'
                        : 'bg-muted hover:bg-accent text-muted-foreground hover:text-accent-foreground'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
                  </button>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium text-foreground">{property.rating}</span>
                    <span className="text-muted-foreground">({property.review_count} ulasan)</span>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    property.property_type === 'putra'
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                      : property.property_type === 'putri'
                      ? 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300'
                      : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                  }`}>
                    {property.property_type === 'putra' ? 'Putra' :
                     property.property_type === 'putri' ? 'Putri' : 'Campur'}
                  </span>
                  {property.is_verified && (
                    <div className="flex items-center space-x-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-2 py-1 rounded-full text-xs font-medium">
                      <CheckCircle className="w-3 h-3" />
                      <span>Terverifikasi</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Price */}
              <div className="bg-muted rounded-xl p-4">
                <div className="text-2xl font-bold text-primary mb-1">
                  {formatPrice(property.price_monthly)}
                </div>
                <div className="text-muted-foreground">per bulan</div>
                <div className="text-sm text-muted-foreground mt-2">
                  {property.available_rooms} dari {property.total_rooms} kamar tersedia
                </div>
              </div>

              {/* Location */}
              <div className="space-y-2">
                <h4 className="font-semibold text-foreground">Lokasi</h4>
                <div className="flex items-start space-x-2">
                  <MapPin className="w-4 h-4 text-muted-foreground mt-1 flex-shrink-0" />
                  <div className="text-muted-foreground">
                    <div>{property.location.address}</div>
                    <div>{property.location.district}, {property.location.city}</div>
                    <div>{property.location.province} {property.location.postal_code}</div>
                  </div>
                </div>
                {property.location.nearby_landmarks.length > 0 && (
                  <div className="mt-2">
                    <div className="text-sm font-medium text-foreground mb-1">Dekat dengan:</div>
                    <div className="flex flex-wrap gap-1">
                      {property.location.nearby_landmarks.map((landmark, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-secondary text-secondary-foreground rounded text-xs"
                        >
                          {landmark}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Amenities */}
              <div className="space-y-2">
                <h4 className="font-semibold text-foreground">Fasilitas</h4>
                <div className="grid grid-cols-2 gap-2">
                  {property.amenities.map((amenity) => (
                    <div key={amenity.id} className="flex items-center space-x-2">
                      {amenity.icon === 'wifi' && <Wifi className="w-4 h-4 text-muted-foreground" />}
                      {amenity.icon === 'car' && <Car className="w-4 h-4 text-muted-foreground" />}
                      {amenity.icon === 'shield' && <Shield className="w-4 h-4 text-muted-foreground" />}
                      {amenity.icon === 'snowflake' && <Snowflake className="w-4 h-4 text-muted-foreground" />}
                      {amenity.icon === 'chef-hat' && <ChefHat className="w-4 h-4 text-muted-foreground" />}
                      {amenity.icon === 'tv' && <Tv className="w-4 h-4 text-muted-foreground" />}
                      {amenity.icon === 'zap' && <Zap className="w-4 h-4 text-muted-foreground" />}
                      {amenity.icon === 'waves' && <Waves className="w-4 h-4 text-muted-foreground" />}
                      {amenity.icon === 'home' && <Home className="w-4 h-4 text-muted-foreground" />}
                      <span className="text-sm text-muted-foreground">{amenity.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Owner Info */}
              <div className="space-y-2">
                <h4 className="font-semibold text-foreground">Pemilik</h4>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-primary-foreground font-medium text-sm">
                      {property.owner.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="font-medium text-foreground">{property.owner.name}</div>
                    <div className="text-sm text-muted-foreground">
                      Respon {property.owner.response_rate}% • {property.owner.response_time}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3 pt-4">
                <button className="flex-1 bg-primary text-primary-foreground py-3 rounded-lg hover:bg-primary/90 transition-colors duration-200 font-medium">
                  Hubungi Pemilik
                </button>
                <button className="px-6 py-3 border border-border text-foreground rounded-lg hover:bg-muted transition-colors duration-200 font-medium">
                  Simpan
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntegratedKostSearch;