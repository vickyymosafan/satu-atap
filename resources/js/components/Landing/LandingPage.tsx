import React from 'react';
import { useAppearance } from '@/hooks/use-appearance';
import { Sun, Moon } from 'lucide-react';
import Header from './sections/Header';
import HeroSection from './sections/HeroSection';
import FeaturedProperties from './sections/FeaturedProperties';
import MapSection from './sections/MapSection';
import TestimonialsSection from './sections/TestimonialsSection';
import CTASection from './sections/CTASection';
import { KostProperty } from '@/types';

const LandingPage: React.FC = () => {
  const { appearance, updateAppearance } = useAppearance();

  // Theme toggle functionality
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

  // Theme props to pass to Header component
  const themeProps = {
    currentTheme: appearance === 'system' ? 'light' : appearance as 'light' | 'dark',
    toggleTheme,
    getThemeIcon,
  };

  // Handle search from hero section
  const handleSearch = (query: string, propertyType: string) => {
    console.log('Search:', { query, propertyType });
    // TODO: Implement search functionality
  };

  // Handle property interactions
  const handlePropertyClick = (property: KostProperty) => {
    console.log('Property clicked:', property);
    // TODO: Navigate to property detail page
  };

  const handleContactOwner = (property: KostProperty) => {
    console.log('Contact owner:', property.owner);
    // TODO: Open WhatsApp or contact modal
  };

  // Handle CTA interactions
  const handleSearchClick = () => {
    console.log('Search CTA clicked');
    // TODO: Scroll to search or navigate to search page
  };

  const handleScheduleVisit = (data: { name: string; email: string; phone: string; message: string }) => {
    console.log('Schedule visit:', data);
    // TODO: Submit visit request to API
  };

  const handleContactSubmit = (data: { name: string; email: string; phone: string; message: string }) => {
    console.log('Contact form submitted:', data);
    // TODO: Submit contact form to API
  };

  return (
    <div className="bg-background min-h-screen transition-colors duration-300">
      <Header {...themeProps} />
      <main className="relative">
        <HeroSection onSearch={handleSearch} />
        <FeaturedProperties
          onPropertyClick={handlePropertyClick}
          onContactOwner={handleContactOwner}
        />
        <MapSection />
        <TestimonialsSection />
        <CTASection
          onSearchClick={handleSearchClick}
          onScheduleVisit={handleScheduleVisit}
          onContactSubmit={handleContactSubmit}
        />
        {/* Additional sections will be added here */}
      </main>
    </div>
  );
};

export default LandingPage;
