import React, { useState, useEffect, useRef } from 'react';
import { 
  Star, 
  MapPin, 
  Users, 
  Wifi, 
  Car, 
  Shield, 
  Eye, 
  Heart,
  ChevronLeft,
  ChevronRight,
  X,
  Phone,
  Clock,
  CheckCircle
} from 'lucide-react';
import { KostProperty } from '@/types';

// Theme props interface - consistent with other components
interface ThemeProps {
  currentTheme: 'light' | 'dark';
  toggleTheme: () => void;
  getThemeIcon: () => React.ReactElement;
}

// Component props interface
interface FeaturedKostsProps extends ThemeProps {}

// Mock data for featured properties (will be replaced with API call)
const mockFeaturedProperties: KostProperty[] = [
  {
    id: '1',
    title: 'Kost Nyaman Dekat Kampus UI',
    description: 'Kost modern dengan fasilitas lengkap, lokasi strategis dekat Universitas Indonesia',
    price_monthly: 1500000,
    property_type: 'campur',
    room_type: 'single',
    available_rooms: 3,
    total_rooms: 20,
    images: [
      { id: '1', url: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&h=600&fit=crop', alt: 'Kamar kost modern', is_primary: true, order: 1 },
      { id: '2', url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop', alt: 'Ruang bersama', is_primary: false, order: 2 },
      { id: '3', url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop', alt: 'Dapur bersama', is_primary: false, order: 3 }
    ],
    amenities: [
      { id: 'wifi', name: 'WiFi Gratis', icon: 'wifi', category: 'connectivity', is_popular: true },
      { id: 'parking', name: 'Parkir Motor', icon: 'car', category: 'basic', is_popular: true },
      { id: 'security', name: 'Keamanan 24 Jam', icon: 'shield', category: 'security', is_popular: true }
    ],
    location: {
      id: '1',
      address: 'Jl. Margonda Raya No. 123',
      district: 'Beji',
      city: 'Depok',
      province: 'Jawa Barat',
      postal_code: '16424',
      nearby_landmarks: ['Universitas Indonesia', 'Stasiun UI', 'Mall Depok']
    },
    rating: 4.8,
    review_count: 124,
    is_featured: true,
    is_verified: true,
    owner: {
      id: '1',
      name: 'Bu Sari',
      phone: '+62812345678',
      response_rate: 95,
      response_time: '< 1 jam'
    },
    rules: ['Tidak boleh merokok', 'Tidak boleh membawa tamu menginap', 'Jam malam 22:00'],
    facilities: ['Kamar mandi dalam', 'AC', 'Kasur + lemari', 'Meja belajar'],
    created_at: '2024-01-15T00:00:00Z',
    updated_at: '2024-01-20T00:00:00Z'
  },
  {
    id: '2',
    title: 'Kost Eksklusif Jakarta Selatan',
    description: 'Kost premium dengan fasilitas hotel, cocok untuk profesional muda',
    price_monthly: 2800000,
    property_type: 'putra',
    room_type: 'single',
    available_rooms: 1,
    total_rooms: 15,
    images: [
      { id: '4', url: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop', alt: 'Kamar premium', is_primary: true, order: 1 },
      { id: '5', url: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop', alt: 'Lobby modern', is_primary: false, order: 2 }
    ],
    amenities: [
      { id: 'wifi', name: 'WiFi Gratis', icon: 'wifi', category: 'connectivity', is_popular: true },
      { id: 'gym', name: 'Gym', icon: 'dumbbell', category: 'comfort', is_popular: false },
      { id: 'laundry', name: 'Laundry', icon: 'washing-machine', category: 'basic', is_popular: true }
    ],
    location: {
      id: '2',
      address: 'Jl. Kemang Raya No. 45',
      district: 'Kemang',
      city: 'Jakarta Selatan',
      province: 'DKI Jakarta',
      postal_code: '12560',
      nearby_landmarks: ['Kemang Village', 'Stasiun MRT Cipete', 'Mall Kemang']
    },
    rating: 4.9,
    review_count: 89,
    is_featured: true,
    is_verified: true,
    owner: {
      id: '2',
      name: 'Pak Budi',
      phone: '+62812345679',
      response_rate: 98,
      response_time: '< 30 menit'
    },
    rules: ['Khusus pria', 'Tidak boleh merokok', 'Jam malam 23:00'],
    facilities: ['Kamar mandi dalam', 'AC', 'Smart TV', 'Mini fridge', 'Balkon'],
    created_at: '2024-01-10T00:00:00Z',
    updated_at: '2024-01-18T00:00:00Z'
  },
  {
    id: '3',
    title: 'Kost Strategis Dekat Stasiun',
    description: 'Kost dengan akses mudah ke transportasi umum, cocok untuk pekerja',
    price_monthly: 1200000,
    property_type: 'putri',
    room_type: 'single',
    available_rooms: 5,
    total_rooms: 25,
    images: [
      { id: '6', url: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop', alt: 'Kamar nyaman', is_primary: true, order: 1 },
      { id: '7', url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop', alt: 'Area bersama', is_primary: false, order: 2 }
    ],
    amenities: [
      { id: 'wifi', name: 'WiFi Gratis', icon: 'wifi', category: 'connectivity', is_popular: true },
      { id: 'security', name: 'Keamanan 24 Jam', icon: 'shield', category: 'security', is_popular: true },
      { id: 'laundry', name: 'Laundry', icon: 'washing-machine', category: 'basic', is_popular: true }
    ],
    location: {
      id: '3',
      address: 'Jl. Sudirman No. 89',
      district: 'Tanah Abang',
      city: 'Jakarta Pusat',
      province: 'DKI Jakarta',
      postal_code: '10270',
      nearby_landmarks: ['Stasiun Sudirman', 'Plaza Indonesia', 'Grand Indonesia']
    },
    rating: 4.6,
    review_count: 67,
    is_featured: true,
    is_verified: true,
    owner: {
      id: '3',
      name: 'Ibu Rina',
      phone: '+62812345680',
      response_rate: 92,
      response_time: '< 2 jam'
    },
    rules: ['Khusus wanita', 'Tidak boleh merokok', 'Jam malam 21:30'],
    facilities: ['Kamar mandi dalam', 'AC', 'Lemari pakaian', 'Meja kerja'],
    created_at: '2024-01-12T00:00:00Z',
    updated_at: '2024-01-19T00:00:00Z'
  },
  {
    id: '4',
    title: 'Kost Budget Friendly',
    description: 'Kost terjangkau dengan fasilitas lengkap untuk mahasiswa',
    price_monthly: 800000,
    property_type: 'campur',
    room_type: 'shared',
    available_rooms: 8,
    total_rooms: 30,
    images: [
      { id: '8', url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop', alt: 'Kamar bersama', is_primary: true, order: 1 }
    ],
    amenities: [
      { id: 'wifi', name: 'WiFi Gratis', icon: 'wifi', category: 'connectivity', is_popular: true },
      { id: 'parking', name: 'Parkir Motor', icon: 'car', category: 'basic', is_popular: true }
    ],
    location: {
      id: '4',
      address: 'Jl. Kebon Jeruk No. 45',
      district: 'Kebon Jeruk',
      city: 'Jakarta Barat',
      province: 'DKI Jakarta',
      postal_code: '11530',
      nearby_landmarks: ['Universitas Trisakti', 'Mall Taman Anggrek', 'Stasiun Palmerah']
    },
    rating: 4.3,
    review_count: 45,
    is_featured: true,
    is_verified: false,
    owner: {
      id: '4',
      name: 'Pak Joko',
      phone: '+62812345681',
      response_rate: 88,
      response_time: '< 3 jam'
    },
    rules: ['Tidak boleh merokok', 'Jam malam 22:30'],
    facilities: ['Kamar mandi bersama', 'Kipas angin', 'Lemari bersama'],
    created_at: '2024-01-08T00:00:00Z',
    updated_at: '2024-01-17T00:00:00Z'
  }
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
    <div className="group bg-card rounded-2xl shadow-sm border border-border overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      {/* Image Section */}
      <div className="relative aspect-[4/3] overflow-hidden">
        {/* Image */}
        <div className="relative w-full h-full bg-muted">
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 bg-muted animate-pulse flex items-center justify-center">
              <div className="text-muted-foreground text-sm">Memuat gambar...</div>
            </div>
          )}
          {imageError ? (
            <div className="absolute inset-0 bg-muted flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <div className="w-16 h-16 mx-auto mb-2 bg-muted-foreground/20 rounded-lg flex items-center justify-center">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="text-xs">Gambar tidak tersedia</div>
              </div>
            </div>
          ) : (
            <img
              src={property.images[currentImageIndex]?.url || 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&h=600&fit=crop'}
              alt={property.images[currentImageIndex]?.alt || property.title}
              className={`w-full h-full object-cover transition-opacity duration-300 ${
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
        <div className="absolute top-3 right-3 flex space-x-2">
          <button
            onClick={() => onToggleFavorite(property.id)}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 ${
              isFavorite 
                ? 'bg-red-500 text-white' 
                : 'bg-white/90 hover:bg-white text-gray-700 hover:text-red-500'
            }`}
            aria-label={isFavorite ? 'Hapus dari favorit' : 'Tambah ke favorit'}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
          <button
            onClick={() => onQuickView(property)}
            className="w-9 h-9 bg-white/90 hover:bg-white text-gray-700 hover:text-primary rounded-full flex items-center justify-center transition-all duration-200"
            aria-label="Lihat detail cepat"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Property Type Badge */}
        <div className="absolute top-3 left-3">
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
        </div>

        {/* Verified Badge */}
        {property.is_verified && (
          <div className="absolute bottom-3 left-3">
            <div className="flex items-center space-x-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-2 py-1 rounded-full text-xs font-medium">
              <CheckCircle className="w-3 h-3" />
              <span>Terverifikasi</span>
            </div>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4 space-y-3">
        {/* Title and Rating */}
        <div className="space-y-2">
          <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors duration-200">
            {property.title}
          </h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium text-foreground">
                {property.rating}
              </span>
              <span className="text-sm text-muted-foreground">
                ({property.review_count} ulasan)
              </span>
            </div>
            <div className="text-sm text-muted-foreground">
              {property.available_rooms} kamar tersisa
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-start space-x-2">
          <MapPin className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
          <div className="text-sm text-muted-foreground line-clamp-2">
            {property.location.district}, {property.location.city}
          </div>
        </div>

        {/* Amenities */}
        <div className="flex items-center space-x-3">
          {property.amenities.slice(0, 3).map((amenity) => (
            <div key={amenity.id} className="flex items-center space-x-1">
              {amenity.icon === 'wifi' && <Wifi className="w-4 h-4 text-muted-foreground" />}
              {amenity.icon === 'car' && <Car className="w-4 h-4 text-muted-foreground" />}
              {amenity.icon === 'shield' && <Shield className="w-4 h-4 text-muted-foreground" />}
              <span className="text-xs text-muted-foreground">{amenity.name}</span>
            </div>
          ))}
          {property.amenities.length > 3 && (
            <span className="text-xs text-muted-foreground">
              +{property.amenities.length - 3} lainnya
            </span>
          )}
        </div>

        {/* Price */}
        <div className="pt-2 border-t border-border">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-lg font-bold text-primary">
                {formatPrice(property.price_monthly)}
              </div>
              <div className="text-sm text-muted-foreground">per bulan</div>
            </div>
            <button
              onClick={() => onQuickView(property)}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-200 text-sm font-medium"
            >
              Lihat Detail
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const FeaturedKosts: React.FC<FeaturedKostsProps> = () => {
  const [properties, setProperties] = useState<KostProperty[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProperty, setSelectedProperty] = useState<KostProperty | null>(null);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Simulate API call to fetch featured properties
  useEffect(() => {
    const fetchFeaturedProperties = async () => {
      try {
        setLoading(true);
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setProperties(mockFeaturedProperties);
      } catch (err) {
        setError('Gagal memuat kost unggulan. Silakan coba lagi.');
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProperties();
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
      className="py-16 sm:py-20 lg:py-24 bg-background"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Header */}
        <div className={`text-center mb-12 sm:mb-16 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Kost Unggulan
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Temukan kost terbaik dengan fasilitas lengkap dan lokasi strategis yang telah dipilih khusus untuk Anda
          </p>
        </div>

        {/* Content */}
        {loading ? (
          // Loading State
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="bg-card rounded-2xl shadow-sm border border-border overflow-hidden">
                <div className="aspect-[4/3] bg-muted animate-pulse" />
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-muted animate-pulse rounded" />
                  <div className="h-3 bg-muted animate-pulse rounded w-3/4" />
                  <div className="h-3 bg-muted animate-pulse rounded w-1/2" />
                  <div className="flex justify-between items-center pt-2">
                    <div className="h-6 bg-muted animate-pulse rounded w-24" />
                    <div className="h-8 bg-muted animate-pulse rounded w-20" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          // Error State
          <div className="text-center py-12">
            <div className="text-muted-foreground mb-4">
              <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Terjadi Kesalahan</h3>
            <p className="text-muted-foreground mb-6">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-200 font-medium"
            >
              Coba Lagi
            </button>
          </div>
        ) : (
          // Properties Grid
          <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            {properties.map((property, index) => (
              <div
                key={property.id}
                className="transition-all duration-300"
                style={{
                  animationDelay: isVisible ? `${index * 100}ms` : '0ms'
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

        {/* View More Button */}
        {!loading && !error && properties.length > 0 && (
          <div className={`text-center mt-12 transition-all duration-700 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <button className="px-8 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors duration-200 font-medium">
              Lihat Semua Kost Unggulan
            </button>
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
                  src={property.images[currentImageIndex]?.url || '/images/placeholder-kost.jpg'}
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
