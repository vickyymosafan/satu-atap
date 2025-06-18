import React, { useState } from 'react';
import { useAppearance } from '@/hooks/use-appearance';
import { Sun, Moon } from 'lucide-react';
import { KostProperty } from '@/types';
import Header from './sections/Header';
import Hero from './sections/Hero';
import QuickSearch from './sections/QuickSearch';
import FeaturedKosts from './sections/FeaturedKosts';
import WhyChooseUs from './sections/WhyChooseUs';
import ContactSupport from './sections/ContactSupport';

// Search filters interface
interface SearchFilters {
  location: string;
  selectedLocation: {
    id: string;
    name: string;
    city: string;
    province: string;
    type: 'city' | 'district' | 'area';
  } | null;
  priceRange: [number, number];
  amenities: string[];
}

const LandingPage: React.FC = () => {
  const { appearance, updateAppearance } = useAppearance();

  // Shared state for search functionality
  const [searchResults, setSearchResults] = useState<KostProperty[]>([]);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  // Theme toggle functionality - Master control
  const toggleTheme = () => {
    updateAppearance(appearance === 'light' ? 'dark' : 'light');
  };

  const getThemeIcon = () => {
    return appearance === 'dark' ? (
      <Moon className="h-5 w-5" />
    ) : (
      <Sun className="h-5 w-5" />
    );
  };

  // Handle search from QuickSearch component
  const handleSearch = async (filters: SearchFilters) => {
    setSearchLoading(true);
    setSearchError(null);

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
        setSearchResults(data.data);
        setIsSearchActive(true);

        // Scroll to FeaturedKosts section to show results
        const featuredSection = document.getElementById('featured');
        if (featuredSection) {
          featuredSection.scrollIntoView({
            behavior: 'smooth',
            block: 'center' // Center the section in viewport as per user preference
          });
        }
      } else {
        setSearchError(data.message || 'Gagal mencari kost.');
        setSearchResults([]);
        setIsSearchActive(false);
      }
    } catch (error) {
      console.error('Search error:', error);
      setSearchError('Gagal mencari kost. Silakan coba lagi.');
      setSearchResults([]);
      setIsSearchActive(false);
    } finally {
      setSearchLoading(false);
    }
  };

  // Reset search to show featured kosts again
  const handleResetSearch = () => {
    setSearchResults([]);
    setIsSearchActive(false);
    setSearchError(null);
  };

  // Theme props to pass to child components
  const themeProps = {
    currentTheme: appearance === 'system' ? 'light' : appearance as 'light' | 'dark',
    toggleTheme,
    getThemeIcon,
  };

  return (
    <div className="bg-background min-h-screen transition-colors duration-300">
      <Header {...themeProps} />
      <main className="relative">
        {/* Hero Section - Beranda */}
        <section id="hero" className="relative">
          <Hero {...themeProps} />
          {/* Consistent Section Divider */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent opacity-50"></div>
        </section>

        {/* Quick Search Section - Cari Kost */}
        <section id="quick-search" className="relative bg-background">
          <QuickSearch
            {...themeProps}
            onSearch={handleSearch}
            isSearching={searchLoading}
          />
          {/* Consistent Section Divider */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent opacity-50"></div>
        </section>

        {/* Featured Kosts Section - Kost */}
        <section id="featured" className="relative bg-muted/20">
          <FeaturedKosts
            {...themeProps}
            searchResults={searchResults}
            isSearchActive={isSearchActive}
            searchLoading={searchLoading}
            searchError={searchError}
            onResetSearch={handleResetSearch}
          />
          {/* Consistent Section Divider */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent opacity-50"></div>
        </section>

        {/* Why Choose Us Section */}
        <section id="why-choose-us" className="relative">
          <WhyChooseUs {...themeProps} />
        </section>

        {/* Contact & Support Section */}
        <section id="contact" className="relative">
          <ContactSupport {...themeProps} />
        </section>
      </main>
    </div>
  );
};

export default LandingPage;
