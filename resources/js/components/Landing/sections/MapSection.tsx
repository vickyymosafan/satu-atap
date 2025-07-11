import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Navigation,
  Car,
  Train,
  GraduationCap,
  ShoppingBag,
  Building,
  Coffee,
  Hospital,
  Search,
  Filter,
  X
} from 'lucide-react';
import { KostProperty } from '@/types';

// Mock nearby landmarks data
interface Landmark {
  id: string;
  name: string;
  category: 'university' | 'mall' | 'station' | 'hospital' | 'office' | 'cafe';
  distance: number; // in km
  travelTime: {
    walking: number; // in minutes
    driving: number; // in minutes
    publicTransport?: number; // in minutes
  };
  coordinates: {
    lat: number;
    lng: number;
  };
}

const mockLandmarks: Landmark[] = [
  {
    id: '1',
    name: 'Universitas Indonesia',
    category: 'university',
    distance: 0.8,
    travelTime: { walking: 12, driving: 3, publicTransport: 8 },
    coordinates: { lat: -6.3728, lng: 106.8317 }
  },
  {
    id: '2',
    name: 'Stasiun UI',
    category: 'station',
    distance: 0.5,
    travelTime: { walking: 8, driving: 2, publicTransport: 5 },
    coordinates: { lat: -6.3715, lng: 106.8310 }
  },
  {
    id: '3',
    name: 'Mall Depok',
    category: 'mall',
    distance: 1.2,
    travelTime: { walking: 18, driving: 5, publicTransport: 12 },
    coordinates: { lat: -6.3750, lng: 106.8350 }
  },
  {
    id: '4',
    name: 'RS Universitas Indonesia',
    category: 'hospital',
    distance: 1.0,
    travelTime: { walking: 15, driving: 4, publicTransport: 10 },
    coordinates: { lat: -6.3740, lng: 106.8330 }
  },
  {
    id: '5',
    name: 'Starbucks Margonda',
    category: 'cafe',
    distance: 0.3,
    travelTime: { walking: 5, driving: 1 },
    coordinates: { lat: -6.3720, lng: 106.8300 }
  }
];

interface MapSectionProps {
  properties?: KostProperty[];
  selectedProperty?: KostProperty | null;
  onPropertySelect?: (property: KostProperty) => void;
}

const MapSection: React.FC<MapSectionProps> = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredLandmarks, setFilteredLandmarks] = useState<Landmark[]>(mockLandmarks);
  const [showFilters, setShowFilters] = useState(false);

  // Filter landmarks based on category and search
  useEffect(() => {
    let filtered = mockLandmarks;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(landmark => landmark.category === selectedCategory);
    }

    if (searchQuery) {
      filtered = filtered.filter(landmark => 
        landmark.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredLandmarks(filtered);
  }, [selectedCategory, searchQuery]);

  // Get category icon
  const getCategoryIcon = (category: string) => {
    const icons = {
      university: <GraduationCap className="w-4 h-4" />,
      mall: <ShoppingBag className="w-4 h-4" />,
      station: <Train className="w-4 h-4" />,
      hospital: <Hospital className="w-4 h-4" />,
      office: <Building className="w-4 h-4" />,
      cafe: <Coffee className="w-4 h-4" />
    };
    return icons[category as keyof typeof icons] || <MapPin className="w-4 h-4" />;
  };

  // Get category color
  const getCategoryColor = (category: string) => {
    const colors = {
      university: 'bg-blue-100 text-blue-800 border-blue-200',
      mall: 'bg-purple-100 text-purple-800 border-purple-200',
      station: 'bg-green-100 text-green-800 border-green-200',
      hospital: 'bg-red-100 text-red-800 border-red-200',
      office: 'bg-gray-100 text-gray-800 border-gray-200',
      cafe: 'bg-orange-100 text-orange-800 border-orange-200'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  // Format travel time
  const formatTravelTime = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes} menit`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0 ? `${hours}j ${remainingMinutes}m` : `${hours} jam`;
  };

  const categories = [
    { id: 'all', label: 'Semua', icon: <MapPin className="w-4 h-4" /> },
    { id: 'university', label: 'Universitas', icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'mall', label: 'Mall', icon: <ShoppingBag className="w-4 h-4" /> },
    { id: 'station', label: 'Stasiun', icon: <Train className="w-4 h-4" /> },
    { id: 'hospital', label: 'Rumah Sakit', icon: <Hospital className="w-4 h-4" /> },
    { id: 'cafe', label: 'Kafe', icon: <Coffee className="w-4 h-4" /> }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Lokasi Strategis
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Temukan kost dengan akses mudah ke berbagai fasilitas penting di sekitar Anda
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map placeholder */}
          <div className="lg:col-span-2">
            <div className="bg-gray-100 rounded-2xl overflow-hidden shadow-lg">
              {/* Map container - placeholder for Google Maps */}
              <div className="relative h-96 bg-gradient-to-br from-blue-100 to-green-100 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Peta Interaktif
                  </h3>
                  <p className="text-gray-600 max-w-sm">
                    Integrasi Google Maps akan menampilkan lokasi kost dan landmark terdekat
                  </p>
                  <div className="mt-4 text-sm text-gray-500">
                    Google Maps API Integration Coming Soon
                  </div>
                </div>

                {/* Mock property markers */}
                <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  📍 Kost Eksklusif UI
                </div>
                <div className="absolute bottom-4 right-4 bg-pink-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  📍 Kost Putri Kemang
                </div>
              </div>

              {/* Map controls */}
              <div className="p-4 bg-white border-t">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button className="flex items-center space-x-2 px-3 py-2 bg-blue-100 text-blue-800 rounded-lg text-sm font-medium">
                      <Navigation className="w-4 h-4" />
                      <span>Petunjuk Arah</span>
                    </button>
                    <button className="flex items-center space-x-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium">
                      <Search className="w-4 h-4" />
                      <span>Cari Lokasi</span>
                    </button>
                  </div>
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center space-x-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium"
                  >
                    <Filter className="w-4 h-4" />
                    <span>Filter</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Landmarks sidebar */}
          <div className="space-y-6">
            {/* Search and filters */}
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari landmark..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Category filters */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category.icon}
                    <span>{category.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Landmarks list */}
            <div className="space-y-3 max-h-96 overflow-y-auto">
              <h3 className="font-semibold text-gray-900 sticky top-0 bg-white py-2">
                Landmark Terdekat ({filteredLandmarks.length})
              </h3>
              
              {filteredLandmarks.map((landmark) => (
                <div
                  key={landmark.id}
                  className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg border ${getCategoryColor(landmark.category)}`}>
                        {getCategoryIcon(landmark.category)}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{landmark.name}</h4>
                        <p className="text-sm text-gray-500">{landmark.distance} km</p>
                      </div>
                    </div>
                  </div>

                  {/* Travel times */}
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                        🚶
                      </div>
                      <span className="text-gray-600">
                        {formatTravelTime(landmark.travelTime.walking)}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                        <Car className="w-3 h-3" />
                      </div>
                      <span className="text-gray-600">
                        {formatTravelTime(landmark.travelTime.driving)}
                      </span>
                    </div>
                    {landmark.travelTime.publicTransport && (
                      <div className="flex items-center space-x-2 col-span-2">
                        <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                          <Train className="w-3 h-3" />
                        </div>
                        <span className="text-gray-600">
                          {formatTravelTime(landmark.travelTime.publicTransport)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {filteredLandmarks.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <MapPin className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>Tidak ada landmark yang ditemukan</p>
                  <p className="text-sm">Coba ubah filter atau kata kunci pencarian</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick stats */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <GraduationCap className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">15+</div>
            <div className="text-sm text-gray-600">Universitas Terdekat</div>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Train className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">8</div>
            <div className="text-sm text-gray-600">Stasiun Terdekat</div>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <ShoppingBag className="w-6 h-6 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">25+</div>
            <div className="text-sm text-gray-600">Pusat Perbelanjaan</div>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Hospital className="w-6 h-6 text-red-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">12</div>
            <div className="text-sm text-gray-600">Fasilitas Kesehatan</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapSection;
