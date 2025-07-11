import React, { useState } from 'react';
import { Search, MapPin, Users, Home, Star, ChevronDown } from 'lucide-react';

// Property type options
interface PropertyType {
  id: string;
  label: string;
  icon: React.ReactElement;
  description: string;
}

const propertyTypes: PropertyType[] = [
  {
    id: 'putra',
    label: 'Kost Putra',
    icon: <Users className="w-5 h-5" />,
    description: 'Khusus Laki-laki'
  },
  {
    id: 'putri',
    label: 'Kost Putri',
    icon: <Users className="w-5 h-5" />,
    description: 'Khusus Perempuan'
  },
  {
    id: 'campur',
    label: 'Kost Campur',
    icon: <Users className="w-5 h-5" />,
    description: 'Laki-laki & Perempuan'
  }
];

// Hero section props interface
interface HeroSectionProps {
  onSearch?: (query: string, propertyType: string) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPropertyType, setSelectedPropertyType] = useState('');
  const [isPropertyTypeOpen, setIsPropertyTypeOpen] = useState(false);

  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery, selectedPropertyType);
    }
  };

  // Handle property type selection
  const handlePropertyTypeSelect = (type: PropertyType) => {
    setSelectedPropertyType(type.id);
    setIsPropertyTypeOpen(false);
  };

  // Get selected property type label
  const getSelectedPropertyTypeLabel = () => {
    const selected = propertyTypes.find(type => type.id === selectedPropertyType);
    return selected ? selected.label : 'Pilih Tipe Kost';
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800">
        {/* Background pattern */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        ></div>
        
        {/* Animated floating elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-white/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-white/10 rounded-full blur-xl animate-pulse delay-500"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Trust indicators */}
        <div className="flex justify-center items-center space-x-8 mb-8 text-white/80">
          <div className="flex items-center space-x-2">
            <Home className="w-5 h-5" />
            <span className="text-sm font-medium">2000+ Kost</span>
          </div>
          <div className="flex items-center space-x-2">
            <Users className="w-5 h-5" />
            <span className="text-sm font-medium">50K+ Penghuni</span>
          </div>
          <div className="flex items-center space-x-2">
            <Star className="w-5 h-5 fill-current" />
            <span className="text-sm font-medium">4.8 Rating</span>
          </div>
        </div>

        {/* Main headline */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Temukan Kost
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
              Impianmu
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-4 max-w-3xl mx-auto leading-relaxed">
            Platform terpercaya untuk mencari kost berkualitas dengan fasilitas lengkap
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Ribuan pilihan kost di seluruh Indonesia dengan harga transparan dan lokasi strategis
          </p>
        </div>

        {/* Search form */}
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSearch} className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
              {/* Location search */}
              <div className="md:col-span-6">
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                  Lokasi atau Area
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    id="location"
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Cari berdasarkan kota, kampus, atau alamat..."
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                  />
                </div>
              </div>

              {/* Property type selector */}
              <div className="md:col-span-4">
                <label htmlFor="property-type" className="block text-sm font-medium text-gray-700 mb-2">
                  Tipe Kost
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsPropertyTypeOpen(!isPropertyTypeOpen)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-left focus:ring-2 focus:ring-blue-500 focus:border-transparent flex items-center justify-between"
                  >
                    <span className={selectedPropertyType ? 'text-gray-900' : 'text-gray-500'}>
                      {getSelectedPropertyTypeLabel()}
                    </span>
                    <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isPropertyTypeOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown menu */}
                  {isPropertyTypeOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
                      {propertyTypes.map((type) => (
                        <button
                          key={type.id}
                          type="button"
                          onClick={() => handlePropertyTypeSelect(type)}
                          className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center space-x-3 first:rounded-t-lg last:rounded-b-lg"
                        >
                          {type.icon}
                          <div>
                            <div className="font-medium text-gray-900">{type.label}</div>
                            <div className="text-sm text-gray-500">{type.description}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Search button */}
              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
                >
                  <Search className="w-5 h-5" />
                  <span>Cari</span>
                </button>
              </div>
            </div>

            {/* Quick filters */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600 mb-3">Pencarian populer:</p>
              <div className="flex flex-wrap gap-2">
                {[
                  'Kost dekat UI',
                  'Kost Jakarta Selatan',
                  'Kost murah Depok',
                  'Kost Bandung',
                  'Kost dekat ITB',
                  'Kost Yogyakarta'
                ].map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setSearchQuery(tag)}
                    className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-full transition-colors duration-200"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </form>
        </div>

        {/* Additional trust indicators */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto text-white/80">
          <div className="text-center">
            <div className="text-2xl font-bold text-white mb-2">100%</div>
            <div className="text-sm">Verifikasi Properti</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white mb-2">24/7</div>
            <div className="text-sm">Customer Support</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white mb-2">0%</div>
            <div className="text-sm">Biaya Tersembunyi</div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 animate-bounce">
        <div className="flex flex-col items-center space-y-2">
          <span className="text-sm">Scroll untuk melihat lebih banyak</span>
          <ChevronDown className="w-5 h-5" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
