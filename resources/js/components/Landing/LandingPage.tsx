import React, { useState } from 'react';
import { useAppearance } from '@/hooks/use-appearance';
import { Sun, Moon } from 'lucide-react';
import { KostProperty } from '@/types';
import Header from './sections/Header';
import Hero from './sections/Hero';
import QuickSearch from './sections/QuickSearch';
import FeaturedKosts from './sections/FeaturedKosts';
import WhyChooseUs from './sections/WhyChooseUs';

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

        {/* About Section - Laptop optimized styling */}
        <section id="about" className="relative py-12 sm:py-16 lg:py-20 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            <div className="text-center">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4 md:mb-6 leading-tight">
                Tentang Satu Atap
              </h2>
              <p className="text-sm md:text-base lg:text-lg text-muted-foreground mb-8 md:mb-10 max-w-2xl mx-auto leading-normal">
                Platform terpercaya untuk mencari kost yang aman, nyaman, dan terjangkau di seluruh Indonesia.
                Kami menghubungkan pencari kost dengan pemilik properti terbaik.
              </p>
              <div className="bg-card/80 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-border/50 shadow-lg">
                <p className="text-sm md:text-base text-muted-foreground leading-normal">
                  Konten lengkap akan segera hadir. Saat ini kami fokus mengembangkan fitur pencarian dan katalog kost terbaik untuk Anda.
                </p>
              </div>
            </div>
          </div>
          {/* Consistent Section Divider */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent opacity-50"></div>
        </section>

        {/* Why Choose Us Section */}
        <section id="why-choose-us" className="relative">
          <WhyChooseUs {...themeProps} />
        </section>

        {/* Contact Section - Laptop optimized styling */}
        <section id="contact" className="relative py-12 sm:py-16 lg:py-20 bg-muted/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            <div className="text-center">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4 md:mb-6 leading-tight">
                Hubungi Kami
              </h2>
              <p className="text-sm md:text-base lg:text-lg text-muted-foreground mb-8 md:mb-10 max-w-2xl mx-auto leading-normal">
                Ada pertanyaan atau butuh bantuan? Tim customer service kami siap membantu Anda 24/7.
              </p>
              <div className="bg-card/80 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-border/50 shadow-lg">
                <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6 leading-normal">
                  Fitur kontak dan customer service akan segera tersedia.
                </p>
                <p className="text-xs md:text-sm text-muted-foreground leading-normal">
                  Sementara waktu, Anda dapat menghubungi pemilik kost langsung melalui detail kontak yang tersedia di setiap listing.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default LandingPage;
