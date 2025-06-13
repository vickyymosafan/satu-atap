import React from 'react';
import { useAppearance } from '@/hooks/use-appearance';
import { Sun, Moon } from 'lucide-react';
import Header from './sections/Header';
import Hero from './sections/Hero';
import QuickSearch from './sections/QuickSearch';
import FeaturedKosts from './sections/FeaturedKosts';

const LandingPage: React.FC = () => {
  const { appearance, updateAppearance } = useAppearance();

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
        <section id="hero">
          <Hero {...themeProps} />
        </section>
        <section id="quick-search">
          <QuickSearch {...themeProps} />
        </section>
        <section id="featured">
          <FeaturedKosts {...themeProps} />
        </section>
        <section id="about" className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <h2 className="text-2xl font-bold mb-4 text-foreground">Tentang Kami</h2>
            <p>Section ini akan segera hadir</p>
          </div>
        </section>
        <section id="contact" className="min-h-screen bg-muted flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <h2 className="text-2xl font-bold mb-4 text-foreground">Kontak</h2>
            <p>Section ini akan segera hadir</p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default LandingPage;
