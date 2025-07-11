import React from 'react';
import { useAppearance } from '@/hooks/use-appearance';
import { Sun, Moon } from 'lucide-react';
import Header from './sections/Header';

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

  return (
    <div className="bg-background min-h-screen transition-colors duration-300">
      <Header {...themeProps} />
      <main className="relative">
        {/* Content area - currently empty except for header */}
        <div className="min-h-[calc(100vh-80px)] flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Satu Atap
            </h1>
            <p className="text-lg text-muted-foreground">
              Header-only version - All other sections have been removed
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
