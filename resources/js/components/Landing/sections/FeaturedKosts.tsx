import React, { useState, useEffect, useRef } from 'react';
import {
  Star,
  MapPin,
  Wifi,
  Car,
  Shield,
  Eye,
  Heart,
  ChevronLeft,
  ChevronRight,
  X,
  CheckCircle
} from 'lucide-react';
import { KostProperty } from '@/types';

// Theme props interface - consistent with other components
interface ThemeProps {
  currentTheme: 'light' | 'dark';
  toggleTheme: () => void;
  getThemeIcon: () => React.ReactElement;
}

// Extended props interface for FeaturedKosts
interface FeaturedKostsProps extends ThemeProps {
  searchResults?: KostProperty[];
  isSearchActive?: boolean;
  searchLoading?: boolean;
  searchError?: string | null;
  onResetSearch?: () => void;
}

// Mock data removed - now using API

// Price formatting utility
const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
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
    <div className="group bg-white dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] h-full flex flex-col">
      {/* Optimized Image Section - Reduced aspect ratio for compactness */}
      <div className="relative aspect-[3/2] overflow-hidden">
        {/* Image */}
        <div className="relative w-full h-full bg-gray-100 dark:bg-gray-800">
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

        {/* Optimized Action Buttons - Smaller and more compact */}
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

        {/* Optimized Property Type Badge - Smaller and more compact */}
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

        {/* Optimized Verified Badge - Smaller and more compact */}
        {property.is_verified && (
          <div className="absolute bottom-3 left-3">
            <div className="flex items-center space-x-1 bg-green-500/90 text-white px-2 py-1 rounded-full text-xs font-bold shadow-md backdrop-blur-sm">
              <CheckCircle className="w-3 h-3" />
              <span>Terverifikasi</span>
            </div>
          </div>
        )}

        {/* Optimized Rating Badge - Smaller and more compact */}
        <div className="absolute bottom-3 right-3">
          <div className="flex items-center space-x-1 bg-yellow-500/90 text-white px-2 py-1 rounded-full text-xs font-bold shadow-md backdrop-blur-sm">
            <Star className="w-3 h-3 fill-current" />
            <span>{property.rating}</span>
          </div>
        </div>
      </div>

      {/* Optimized Content Section - Reduced padding for compactness */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Title and Rating - Reduced spacing */}
        <div className="space-y-2 mb-3">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-2 group-hover:text-primary transition-colors duration-300 leading-tight min-h-[3rem]">
            {property.title}
          </h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1 bg-yellow-50 dark:bg-yellow-900/30 px-3 py-1.5 rounded-lg">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-bold text-gray-900 dark:text-white">
                  {property.rating}
                </span>
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                ({property.review_count} ulasan)
              </span>
            </div>
            <div className="text-sm font-bold text-green-600 dark:text-green-400">
              {property.available_rooms} kamar tersisa
            </div>
          </div>
        </div>

        {/* Location - Optimized for compactness */}
        <div className="flex items-start space-x-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 mb-4">
          <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
          <div>
            <div className="text-sm font-bold text-gray-900 dark:text-white">
              {property.location.district}, {property.location.city}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {property.location.province}
            </div>
          </div>
        </div>

        {/* Amenities - Optimized for compactness */}
        <div className="space-y-3 mb-6 flex-grow">
          <div className="text-sm font-bold text-gray-900 dark:text-white">Fasilitas:</div>
          <div className="flex flex-wrap gap-2">
            {property.amenities.slice(0, 3).map((amenity) => (
              <div key={amenity.id} className="flex items-center space-x-2 bg-primary/10 text-primary px-3 py-2 rounded-full text-sm font-medium">
                {amenity.icon === 'wifi' && <Wifi className="w-4 h-4" />}
                {amenity.icon === 'car' && <Car className="w-4 h-4" />}
                {amenity.icon === 'shield' && <Shield className="w-4 h-4" />}
                <span>{amenity.name}</span>
              </div>
            ))}
            {property.amenities.length > 3 && (
              <div className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-2 rounded-full text-sm font-medium">
                +{property.amenities.length - 3} lainnya
              </div>
            )}
          </div>
        </div>

        {/* Price - Optimized for compactness */}
        <div className="pt-6 border-t-2 border-gray-200 dark:border-gray-700 mt-auto">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xl font-bold text-primary">
                {formatPrice(property.price_monthly)}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">per bulan</div>
            </div>
            <button
              onClick={() => onQuickView(property)}
              className="px-5 py-3 bg-gradient-to-r from-primary to-primary/90 text-white rounded-xl hover:from-primary/90 hover:to-primary transition-all duration-300 text-sm font-bold shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Lihat Detail
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const FeaturedKosts: React.FC<FeaturedKostsProps> = ({
  searchResults = [],
  isSearchActive = false,
  searchLoading = false,
  searchError = null,
  onResetSearch
}) => {
  const [featuredProperties, setFeaturedProperties] = useState<KostProperty[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProperty, setSelectedProperty] = useState<KostProperty | null>(null);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Determine which properties to display
  const displayProperties = isSearchActive ? searchResults : featuredProperties;
  const displayLoading = isSearchActive ? searchLoading : loading;
  const displayError = isSearchActive ? searchError : error;

  // Fetch featured properties from API (only when not showing search results)
  useEffect(() => {
    if (!isSearchActive) {
      const fetchFeaturedProperties = async () => {
        try {
          setLoading(true);
          const response = await fetch('/api/kosts/featured');
          const data = await response.json();

          if (data.success) {
            setFeaturedProperties(data.data);
          } else {
            setError(data.message || 'Gagal memuat kost.');
          }
        } catch (error) {
          console.error('Error fetching featured properties:', error);
          setError('Gagal memuat kost. Silakan coba lagi.');
        } finally {
          setLoading(false);
        }
      };

      fetchFeaturedProperties();
    }
  }, [isSearchActive]);

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

  return (
    <section
      ref={sectionRef}
      className="py-16 sm:py-20 lg:py-24 bg-gray-50 dark:bg-gray-900/50 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(circle_at_1px_1px,_rgb(0,0,0)_1px,_transparent_0)] bg-[length:32px_32px]"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative">
        {/* Section Header - Dynamic based on search state */}
        <div className={`text-center mb-8 md:mb-12 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          {isSearchActive ? (
            // Search Results Header
            <>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 rounded-full border border-blue-500/20 mb-4">
                <span className="text-blue-600 font-semibold text-xs">🔍 Hasil Pencarian</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 md:mb-6 leading-tight">
                {displayProperties.length > 0
                  ? `Ditemukan ${displayProperties.length} Kost`
                  : 'Tidak Ada Kost Ditemukan'
                }
              </h2>
              <p className="text-base md:text-lg lg:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed font-medium">
                {displayProperties.length > 0
                  ? 'Berikut adalah kost yang sesuai dengan kriteria pencarian Anda. Semua properti telah diverifikasi.'
                  : 'Maaf, tidak ada kost yang sesuai dengan kriteria pencarian Anda. Coba ubah filter pencarian.'
                }
              </p>
              {onResetSearch && (
                <button
                  onClick={onResetSearch}
                  className="mt-4 px-4 py-2 text-sm bg-muted hover:bg-accent text-muted-foreground hover:text-accent-foreground rounded-lg transition-colors duration-200"
                >
                  ← Kembali ke Kost
                </button>
              )}
            </>
          ) : (
            // Featured Kosts Header
            <>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 md:mb-6 leading-tight">
                Kost
              </h2>
              <p className="text-base md:text-lg lg:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed font-medium">
                Temukan kost terbaik dengan fasilitas lengkap dan lokasi strategis yang telah dipilih khusus untuk Anda.
                Semua properti telah diverifikasi dan mendapat rating tinggi dari penghuni.
              </p>
            </>
          )}
        </div>

        {/* Content Section */}
        {displayLoading ? (
          // Loading State - Optimized for compact cards
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
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
        ) : displayError ? (
          // Error State
          <div className="text-center py-12">
            <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-8 border border-border/50 shadow-lg max-w-md mx-auto">
              <div className="text-muted-foreground mb-6">
                <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-foreground mb-3">Terjadi Kesalahan</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">{displayError}</p>
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Coba Lagi
              </button>
            </div>
          </div>
        ) : (
          // Properties Grid - Standard 3 Column Layout
          <div className={`transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            {/* Properties Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {displayProperties.map((property, index) => (
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
          </div>
        )}



        {/* Search Results Actions */}
        {!displayLoading && !displayError && isSearchActive && (
          <div className={`text-center mt-10 transition-all duration-700 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-border/50 shadow-lg">
              {displayProperties.length > 0 ? (
                <>
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    Ingin melihat lebih banyak pilihan?
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 max-w-md mx-auto">
                    Coba ubah kriteria pencarian atau lihat kost unggulan kami
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                      onClick={() => {
                        const searchSection = document.getElementById('quick-search');
                        if (searchSection) {
                          searchSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }
                      }}
                      className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      Ubah Pencarian
                    </button>
                    {onResetSearch && (
                      <button
                        onClick={onResetSearch}
                        className="px-6 py-3 bg-muted hover:bg-accent text-muted-foreground hover:text-accent-foreground rounded-lg transition-all duration-300 font-medium"
                      >
                        Lihat Kost
                      </button>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    Tidak menemukan yang Anda cari?
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 max-w-md mx-auto">
                    Coba ubah kriteria pencarian atau lihat rekomendasi kost kami
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                      onClick={() => {
                        const searchSection = document.getElementById('quick-search');
                        if (searchSection) {
                          searchSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }
                      }}
                      className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      Coba Pencarian Lain
                    </button>
                    {onResetSearch && (
                      <button
                        onClick={onResetSearch}
                        className="px-6 py-3 bg-muted hover:bg-accent text-muted-foreground hover:text-accent-foreground rounded-lg transition-all duration-300 font-medium"
                      >
                        Lihat Kost
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>
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

export default FeaturedKosts;
