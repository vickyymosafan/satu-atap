import React, { useState } from 'react';
import {
  Star,
  MapPin,
  Wifi,
  Shield,
  Eye,
  Heart,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal
} from 'lucide-react';
import { KostProperty } from '@/types';
import AvailabilityIndicator from '@/components/ui/AvailabilityIndicator';

// Mock data for featured properties (will be replaced with API call)
const mockFeaturedProperties: KostProperty[] = [
  {
    id: '1',
    title: 'Kost Eksklusif Dekat UI Depok',
    description: 'Kost modern dengan fasilitas lengkap, lokasi strategis dekat Universitas Indonesia',
    price_monthly: 2500000,
    property_type: 'campur',
    room_type: 'single',
    available_rooms: 3,
    total_rooms: 20,
    rating: 4.8,
    review_count: 124,
    is_featured: true,
    is_verified: true,
    images: [
      {
        id: '1',
        url: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800',
        alt: 'Kamar kost modern',
        is_primary: true,
        order: 1
      },
      {
        id: '2',
        url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800',
        alt: 'Ruang bersama',
        is_primary: false,
        order: 2
      }
    ],
    amenities: [
      { id: '1', name: 'WiFi', icon: 'Wifi', category: 'connectivity', is_popular: true },
      { id: '2', name: 'Parkir', icon: 'Car', category: 'basic', is_popular: true },
      { id: '3', name: 'Keamanan 24 Jam', icon: 'Shield', category: 'security', is_popular: true }
    ],
    location: {
      id: '1',
      address: 'Jl. Margonda Raya No. 123',
      district: 'Beji',
      city: 'Depok',
      province: 'Jawa Barat',
      postal_code: '16424',
      latitude: -6.3728,
      longitude: 106.8317,
      nearby_landmarks: ['Universitas Indonesia', 'Stasiun UI', 'Mall Depok']
    },
    owner: {
      id: '1',
      name: 'Ibu Sari',
      phone: '+6281234567890',
      response_rate: 95,
      response_time: '< 1 jam'
    },
    rules: ['Tidak merokok', 'Tidak membawa tamu menginap'],
    facilities: ['AC', 'Kamar Mandi Dalam', 'Lemari', 'Kasur'],
    created_at: '2024-01-01',
    updated_at: '2024-01-01'
  },
  {
    id: '2',
    title: 'Kost Putri Nyaman Jakarta Selatan',
    description: 'Kost khusus putri dengan keamanan terjamin dan fasilitas premium',
    price_monthly: 1800000,
    property_type: 'putri',
    room_type: 'single',
    available_rooms: 5,
    total_rooms: 15,
    rating: 4.6,
    review_count: 89,
    is_featured: true,
    is_verified: true,
    images: [
      {
        id: '3',
        url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
        alt: 'Kamar kost putri',
        is_primary: true,
        order: 1
      }
    ],
    amenities: [
      { id: '1', name: 'WiFi', icon: 'Wifi', category: 'connectivity', is_popular: true },
      { id: '4', name: 'Dapur Bersama', icon: 'Users', category: 'basic', is_popular: true }
    ],
    location: {
      id: '2',
      address: 'Jl. Kemang Raya No. 456',
      district: 'Kemang',
      city: 'Jakarta Selatan',
      province: 'DKI Jakarta',
      postal_code: '12560',
      latitude: -6.2615,
      longitude: 106.8106,
      nearby_landmarks: ['Mall Kemang Village', 'Stasiun MRT Cipete Raya']
    },
    owner: {
      id: '2',
      name: 'Pak Budi',
      phone: '+6281234567891',
      response_rate: 92,
      response_time: '< 2 jam'
    },
    rules: ['Khusus putri', 'Jam malam 22:00'],
    facilities: ['AC', 'Kamar Mandi Dalam', 'WiFi', 'Lemari'],
    created_at: '2024-01-01',
    updated_at: '2024-01-01'
  }
];

interface FeaturedPropertiesProps {
  properties?: KostProperty[];
  loading?: boolean;
  onPropertyClick?: (property: KostProperty) => void;
  onContactOwner?: (property: KostProperty) => void;
}

const FeaturedProperties: React.FC<FeaturedPropertiesProps> = ({
  properties = mockFeaturedProperties,
  loading = false,
  onPropertyClick,
  onContactOwner
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState<Record<string, number>>({});
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [showFilters, setShowFilters] = useState(false);

  // Handle image navigation
  const handleImageNavigation = (propertyId: string, direction: 'prev' | 'next', totalImages: number) => {
    setCurrentImageIndex(prev => {
      const current = prev[propertyId] || 0;
      let newIndex;
      
      if (direction === 'next') {
        newIndex = current >= totalImages - 1 ? 0 : current + 1;
      } else {
        newIndex = current <= 0 ? totalImages - 1 : current - 1;
      }
      
      return { ...prev, [propertyId]: newIndex };
    });
  };

  // Toggle favorite
  const toggleFavorite = (propertyId: string) => {
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

  // Format price
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  // Get property type badge color
  const getPropertyTypeBadge = (type: string) => {
    const badges = {
      putra: { label: 'Putra', color: 'bg-blue-100 text-blue-800' },
      putri: { label: 'Putri', color: 'bg-pink-100 text-pink-800' },
      campur: { label: 'Campur', color: 'bg-green-100 text-green-800' }
    };
    return badges[type as keyof typeof badges] || badges.campur;
  };

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-96 mx-auto animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
                <div className="h-64 bg-gray-200"></div>
                <div className="p-6">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                  <div className="h-8 bg-gray-200 rounded w-full"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Kost Pilihan Terbaik
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Temukan kost berkualitas dengan fasilitas lengkap dan lokasi strategis
          </p>
        </div>

        {/* Filter toggle */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">
              Menampilkan {properties.length} properti unggulan
            </span>
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filter</span>
          </button>
        </div>

        {/* Properties grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => {
            const currentImage = currentImageIndex[property.id] || 0;
            const propertyTypeBadge = getPropertyTypeBadge(property.property_type);
            const isFavorite = favorites.has(property.id);

            return (
              <div
                key={property.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
              >
                {/* Image carousel */}
                <div className="relative h-64 overflow-hidden">
                  {property.images.length > 0 && (
                    <>
                      <img
                        src={property.images[currentImage]?.url}
                        alt={property.images[currentImage]?.alt}
                        className="w-full h-full object-cover"
                      />
                      
                      {/* Image navigation */}
                      {property.images.length > 1 && (
                        <>
                          <button
                            onClick={() => handleImageNavigation(property.id, 'prev', property.images.length)}
                            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                          >
                            <ChevronLeft className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleImageNavigation(property.id, 'next', property.images.length)}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                          >
                            <ChevronRight className="w-4 h-4" />
                          </button>
                          
                          {/* Image indicators */}
                          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                            {property.images.map((_, index) => (
                              <div
                                key={index}
                                className={`w-2 h-2 rounded-full ${
                                  index === currentImage ? 'bg-white' : 'bg-white/50'
                                }`}
                              />
                            ))}
                          </div>
                        </>
                      )}
                    </>
                  )}

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col space-y-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${propertyTypeBadge.color}`}>
                      {propertyTypeBadge.label}
                    </span>
                    {property.is_verified && (
                      <span className="px-2 py-1 bg-green-500 text-white rounded-full text-xs font-medium flex items-center space-x-1">
                        <Shield className="w-3 h-3" />
                        <span>Verified</span>
                      </span>
                    )}
                  </div>

                  {/* Favorite button */}
                  <button
                    onClick={() => toggleFavorite(property.id)}
                    className="absolute top-3 right-3 p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
                  >
                    <Heart className={`w-4 h-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                  </button>

                  {/* Real-time availability indicator */}
                  <div className="absolute bottom-3 right-3">
                    <AvailabilityIndicator
                      propertyId={property.id}
                      showDetails={false}
                      className="bg-black/70 text-white rounded"
                    />
                  </div>
                </div>

                {/* Property details */}
                <div className="p-6">
                  {/* Title and rating */}
                  <div className="mb-3">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">
                      {property.title}
                    </h3>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium text-gray-900">{property.rating}</span>
                      </div>
                      <span className="text-sm text-gray-500">({property.review_count} ulasan)</span>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-center space-x-2 mb-3 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{property.location.district}, {property.location.city}</span>
                  </div>

                  {/* Amenities */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {property.amenities.slice(0, 3).map((amenity) => (
                      <div key={amenity.id} className="flex items-center space-x-1 bg-gray-100 px-2 py-1 rounded text-xs">
                        <Wifi className="w-3 h-3" />
                        <span>{amenity.name}</span>
                      </div>
                    ))}
                    {property.amenities.length > 3 && (
                      <span className="text-xs text-gray-500">+{property.amenities.length - 3} lainnya</span>
                    )}
                  </div>

                  {/* Price */}
                  <div className="mb-4">
                    <div className="text-2xl font-bold text-blue-600">
                      {formatPrice(property.price_monthly)}
                    </div>
                    <div className="text-sm text-gray-500">per bulan</div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onPropertyClick?.(property)}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
                    >
                      <Eye className="w-4 h-4" />
                      <span>Lihat Detail</span>
                    </button>
                    <button
                      onClick={() => onContactOwner?.(property)}
                      className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-lg transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View more button */}
        <div className="text-center mt-12">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
            Lihat Semua Properti
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
