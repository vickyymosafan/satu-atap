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
        <Hero {...themeProps} />
        <QuickSearch {...themeProps} />
        {/* Additional content sections will be added here */}
      </main>
    </div>
  );
};

export default LandingPage;
