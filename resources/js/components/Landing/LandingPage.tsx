import React from 'react';
import { FirstImpression } from './FirstImpression';
import { QuickSearch } from './QuickSearch';

const LandingPage = () => {
  const handleSearch = (location: string, priceRange: number, amenities: string[]) => {
    // TODO: Implement search functionality
    console.log('Searching for:', { location, priceRange, amenities });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <FirstImpression />
      <QuickSearch onSearch={handleSearch} />
    </div>
  );
};

export { LandingPage };
