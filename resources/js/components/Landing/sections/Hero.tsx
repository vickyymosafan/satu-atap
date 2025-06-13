import React from 'react';
import { Search, UserPlus, BookOpen } from 'lucide-react';

// Theme props interface
interface ThemeProps {
  currentTheme: 'light' | 'dark';
  toggleTheme: () => void;
  getThemeIcon: () => React.ReactElement;
}

const Hero: React.FC<ThemeProps> = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-50 dark:bg-slate-900 pt-20 sm:pt-24 md:pt-28 lg:pt-32 transition-colors duration-300">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"
          alt="Modern boarding house interior"
          className="w-full h-full object-cover"
          loading="eager"
        />
        {/* Professional overlay for better text readability - Light/Dark mode support */}
        <div className="absolute inset-0 bg-slate-200/80 dark:bg-slate-900/85"></div>
        {/* Subtle gradient overlay for depth - Light/Dark mode support */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-300/90 via-slate-200/50 to-slate-100/70 dark:from-slate-900/80 dark:via-slate-900/40 dark:to-slate-900/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-8 sm:py-12 md:py-16 lg:py-20">
        <div className="max-w-5xl mx-auto">
          {/* Main Headline */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-slate-800 dark:text-white mb-4 sm:mb-6 leading-tight tracking-tight">
            Temukan Kost Impian Anda dengan{' '}
            <span className="text-slate-900 dark:text-slate-100 font-extrabold">Satu Atap</span>
          </h1>

          {/* Subheadline */}
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-slate-600 dark:text-slate-200 mb-8 sm:mb-10 md:mb-12 leading-relaxed max-w-4xl mx-auto font-light">
            Platform terpercaya untuk mencari, mengelola, dan menyewakan kost di seluruh Indonesia.{' '}
            <span className="text-slate-800 dark:text-slate-100 font-medium">Mudah, aman, dan terjangkau.</span>
          </p>

          {/* Call-to-Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center max-w-4xl mx-auto">
            <a
              href="#search"
              className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-slate-800 dark:bg-white text-white dark:text-slate-800 font-semibold rounded-lg hover:bg-slate-700 dark:hover:bg-slate-100 transition-colors duration-200 shadow-lg w-full sm:w-auto sm:min-w-[200px] md:min-w-[220px] justify-center group"
            >
              <Search className="mr-2 sm:mr-3 h-4 sm:h-5 w-4 sm:w-5 group-hover:text-slate-200 dark:group-hover:text-slate-600 transition-colors duration-200" />
              <span className="text-sm sm:text-base">Cari Kost Sekarang</span>
            </a>

            <a
              href="#register"
              className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-slate-600 dark:bg-slate-800 text-white font-semibold rounded-lg hover:bg-slate-500 dark:hover:bg-slate-700 transition-colors duration-200 shadow-lg w-full sm:w-auto sm:min-w-[200px] md:min-w-[220px] justify-center group"
            >
              <UserPlus className="mr-2 sm:mr-3 h-4 sm:h-5 w-4 sm:w-5 group-hover:text-slate-200 transition-colors duration-200" />
              <span className="text-sm sm:text-base">Daftar Gratis</span>
            </a>

            <a
              href="#learn-more"
              className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 border-2 border-slate-800 dark:border-white text-slate-800 dark:text-white font-semibold rounded-lg hover:bg-slate-800 dark:hover:bg-white hover:text-white dark:hover:text-slate-800 transition-colors duration-200 w-full sm:w-auto sm:min-w-[200px] md:min-w-[220px] justify-center group"
            >
              <BookOpen className="mr-2 sm:mr-3 h-4 sm:h-5 w-4 sm:w-5 group-hover:text-white dark:group-hover:text-slate-600 transition-colors duration-200" />
              <span className="text-sm sm:text-base">Pelajari Lebih Lanjut</span>
            </a>
          </div>

          {/* Statistics */}
          <div className="mt-12 sm:mt-16 md:mt-20 pt-8 sm:pt-10 md:pt-12 border-t border-slate-600/30 dark:border-slate-400/30">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto">
              <div className="text-center group">
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 dark:text-white mb-2 sm:mb-3 group-hover:text-slate-600 dark:group-hover:text-slate-100 transition-colors duration-200">1000+</div>
                <div className="text-slate-600 dark:text-slate-200 font-medium text-base sm:text-lg">Kost Tersedia</div>
              </div>
              <div className="text-center group">
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 dark:text-white mb-2 sm:mb-3 group-hover:text-slate-600 dark:group-hover:text-slate-100 transition-colors duration-200">50+</div>
                <div className="text-slate-600 dark:text-slate-200 font-medium text-base sm:text-lg">Kota di Indonesia</div>
              </div>
              <div className="text-center group">
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 dark:text-white mb-2 sm:mb-3 group-hover:text-slate-600 dark:group-hover:text-slate-100 transition-colors duration-200">5000+</div>
                <div className="text-slate-600 dark:text-slate-200 font-medium text-base sm:text-lg">Pengguna Aktif</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Professional Scroll Indicator */}
      <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="flex flex-col items-center space-y-1 sm:space-y-2">
          <span className="text-slate-600 dark:text-slate-200 text-xs sm:text-sm font-medium hidden sm:block">Scroll untuk melihat lebih banyak</span>
          <div className="animate-bounce">
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600 dark:text-slate-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
