import React from 'react';
import { useState } from 'react';

interface QuickSearchProps {
  onSearch: (location: string, priceRange: number, amenities: string[]) => void;
}

const QuickSearch: React.FC<QuickSearchProps> = ({ onSearch }) => {
  const [location, setLocation] = useState('');
  const [priceRange, setPriceRange] = useState(1000000); // Default to 1M IDR
  const [amenities, setAmenities] = useState<string[]>([]);

  const handleSearch = () => {
    onSearch(location, priceRange, amenities);
  };

  return (
    <div className="container mx-auto px-4 py-12 bg-white rounded-2xl shadow-xl">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Location Search */}
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location
          </label>
          <div className="relative">
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Search location..."
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Price Range */}
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Price Range
          </label>
          <div className="flex items-center">
            <span className="text-gray-500">Rp</span>
            <input
              type="range"
              min="500000"
              max="5000000"
              value={priceRange}
              onChange={(e) => setPriceRange(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <span className="ml-2 text-gray-500">{new Intl.NumberFormat('id-ID').format(priceRange)}</span>
          </div>
        </div>

        {/* Amenities Filters */}
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Amenities
          </label>
          <div className="flex flex-wrap gap-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={amenities.includes('wifi')}
                onChange={(e) => {
                  if (e.target.checked) {
                    setAmenities([...amenities, 'wifi']);
                  } else {
                    setAmenities(amenities.filter(a => a !== 'wifi'));
                  }
                }}
                className="mr-2"
              />
              <span>WiFi</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={amenities.includes('parking')}
                onChange={(e) => {
                  if (e.target.checked) {
                    setAmenities([...amenities, 'parking']);
                  } else {
                    setAmenities(amenities.filter(a => a !== 'parking'));
                  }
                }}
                className="mr-2"
              />
              <span>Parking</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={amenities.includes('laundry')}
                onChange={(e) => {
                  if (e.target.checked) {
                    setAmenities([...amenities, 'laundry']);
                  } else {
                    setAmenities(amenities.filter(a => a !== 'laundry'));
                  }
                }}
                className="mr-2"
              />
              <span>Laundry</span>
            </label>
          </div>
        </div>
      </div>

      {/* Search Button */}
      <div className="mt-6 flex justify-center">
        <button
          onClick={handleSearch}
          className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Search Kost
        </button>
      </div>
    </div>
  );
};

export { QuickSearch };
