import React from 'react';
import { useAppearance } from '@/hooks/use-appearance';
import { Sun, Moon } from 'lucide-react';
import Header from './sections/Header';
import Hero from './sections/Hero';
import QuickSearch from './sections/QuickSearch';

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
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen transition-colors duration-300">
      <Header {...themeProps} />
      <main className="relative">
        <section id="hero">
          <Hero {...themeProps} />
        </section>
        <section id="quick-search">
          <QuickSearch {...themeProps} />
        </section>
        {/* Additional content sections will be added here */}
        <section id="featured" className="min-h-screen bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
          <div className="text-center text-slate-600 dark:text-slate-400">
            <h2 className="text-2xl font-bold mb-4">Kost Unggulan</h2>
            <p>Section ini akan segera hadir</p>
          </div>
        </section>
        <section id="about" className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
          <div className="text-center text-slate-600 dark:text-slate-400">
            <h2 className="text-2xl font-bold mb-4">Tentang Kami</h2>
            <p>Section ini akan segera hadir</p>
          </div>
        </section>
        <section id="contact" className="min-h-screen bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
          <div className="text-center text-slate-600 dark:text-slate-400">
            <h2 className="text-2xl font-bold mb-4">Kontak</h2>
            <p>Section ini akan segera hadir</p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default LandingPage;
