import React, { useState, useEffect } from 'react';
import { Search, UserPlus, MapPin, Star, Users, Shield, Clock, ChevronDown } from 'lucide-react';

// Theme props interface
interface ThemeProps {
  currentTheme: 'light' | 'dark';
  toggleTheme: () => void;
  getThemeIcon: () => React.ReactElement;
}

// Trust indicators data
const trustIndicators = [
  { icon: <Shield className="w-5 h-5" />, text: "Verifikasi Keamanan", value: "100%" },
  { icon: <Users className="w-5 h-5" />, text: "Pengguna Aktif", value: "5000+" },
  { icon: <Star className="w-5 h-5" />, text: "Rating Rata-rata", value: "4.8/5" },
  { icon: <Clock className="w-5 h-5" />, text: "Respon Cepat", value: "< 1 Jam" }
];

// Popular locations for quick access
const popularLocations = [
  "Jakarta", "Bandung", "Yogyakarta", "Surabaya", "Semarang"
];

const Hero: React.FC<ThemeProps> = ({ currentTheme, toggleTheme, getThemeIcon }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentLocationIndex, setCurrentLocationIndex] = useState(0);

  // Animate elements on mount
  useEffect(() => {
    setIsVisible(true);

    // Rotate through popular locations
    const interval = setInterval(() => {
      setCurrentLocationIndex((prev) => (prev + 1) % popularLocations.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Smooth scroll to search section
  const scrollToSearch = () => {
    const searchSection = document.getElementById('quick-search');
    if (searchSection) {
      searchSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <section className="relative min-h-screen bg-slate-50 dark:bg-slate-900 pt-16 sm:pt-20 md:pt-24 lg:pt-28 transition-colors duration-300">
      {/* Mobile-First Background */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-slate-100 dark:bg-slate-800"></div>
      </div>

      {/* Mobile-Optimized Container */}
      <div className="relative z-10 w-full min-h-[calc(100vh-4rem)] sm:min-h-[calc(100vh-5rem)] md:min-h-[calc(100vh-6rem)]">

        {/* Mobile Hero Layout */}
        <div className="lg:hidden">
          {/* Mobile Content Stack */}
          <div className="flex flex-col min-h-[calc(100vh-4rem)] px-4 sm:px-6 py-6 sm:py-8">

            {/* Mobile Hero Header */}
            <div className={`text-center mb-8 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>

              {/* Trust Badge - Mobile Card Style */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 rounded-full border border-slate-200 dark:border-slate-700 mb-6 shadow-sm">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                </div>
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  5000+ pengguna
                </span>
              </div>

              {/* Mobile-First Headline */}
              <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4 leading-tight">
                Temukan Kost Impian di{' '}
                <span className="block text-slate-600 dark:text-slate-400 mt-2">
                  {popularLocations[currentLocationIndex]}
                </span>
              </h1>

              {/* Mobile Value Proposition */}
              <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 leading-relaxed px-2">
                Platform terpercaya untuk mencari kost yang{' '}
                <span className="font-semibold text-slate-800 dark:text-slate-100">aman, nyaman, dan terjangkau</span>
              </p>
            </div>

            {/* Mobile Quick Stats Cards */}
            <div className={`grid grid-cols-2 gap-3 mb-8 transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              {[
                { number: "1000+", label: "Kost Tersedia", icon: <MapPin className="w-5 h-5" /> },
                { number: "50+", label: "Kota", icon: <Users className="w-5 h-5" /> },
                { number: "5000+", label: "Pengguna", icon: <Star className="w-5 h-5" /> },
                { number: "4.8/5", label: "Rating", icon: <Shield className="w-5 h-5" /> }
              ].map((stat, index) => (
                <div
                  key={stat.label}
                  className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 text-center shadow-sm"
                >
                  <div className="flex justify-center mb-2 text-slate-600 dark:text-slate-400">
                    {stat.icon}
                  </div>
                  <div className="text-xl font-bold text-slate-800 dark:text-white mb-1">
                    {stat.number}
                  </div>
                  <div className="text-xs font-medium text-slate-600 dark:text-slate-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile Key Benefits */}
            <div className={`space-y-3 mb-8 transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              {[
                { icon: <Shield className="w-5 h-5" />, text: "Verifikasi Keamanan" },
                { icon: <Clock className="w-5 h-5" />, text: "Respon Cepat < 1 Jam" },
                { icon: <Users className="w-5 h-5" />, text: "Komunitas Terpercaya" }
              ].map((benefit, index) => (
                <div
                  key={benefit.text}
                  className="flex items-center gap-3 p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="text-slate-600 dark:text-slate-400 flex-shrink-0">
                    {benefit.icon}
                  </div>
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    {benefit.text}
                  </span>
                </div>
              ))}
            </div>

            {/* Mobile CTA Section */}
            <div className={`mt-auto transition-all duration-1000 delay-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              {/* Primary CTA - Mobile-First Design */}
              <button
                onClick={scrollToSearch}
                className="w-full bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-800 font-bold py-4 px-6 rounded-2xl hover:bg-slate-700 dark:hover:bg-slate-100 transition-all duration-300 shadow-lg hover:shadow-xl transform active:scale-95 mb-4 min-h-[56px] flex items-center justify-center"
                aria-label="Mulai mencari kost sekarang"
              >
                <Search className="h-5 w-5 mr-3 flex-shrink-0" />
                <span className="text-lg font-bold">Cari Kost Sekarang</span>
              </button>

              {/* Secondary CTA */}
              <button
                onClick={() => {
                  // Handle registration - could navigate to registration page
                  console.log('Register clicked');
                  // Example: window.location.href = '/register';
                }}
                className="w-full border-2 border-slate-800 dark:border-slate-200 text-slate-800 dark:text-slate-200 font-semibold py-4 px-6 rounded-2xl hover:bg-slate-800 dark:hover:bg-slate-200 hover:text-white dark:hover:text-slate-800 transition-all duration-300 min-h-[56px] flex items-center justify-center bg-transparent"
                aria-label="Daftar akun gratis"
              >
                <UserPlus className="h-5 w-5 mr-3 flex-shrink-0" />
                <span className="text-lg font-bold">Daftar Gratis</span>
              </button>

              {/* Mobile Tips */}
              <div className="mt-6 text-center">
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  💡 <span className="font-semibold">Tips:</span> Coba cari "Jakarta Selatan" atau "Bandung"
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:block">
          <div className="max-w-7xl mx-auto px-8 lg:px-10 xl:px-12 py-16 xl:py-20 flex items-center justify-center min-h-[calc(100vh-6rem)]">
            <div className="grid grid-cols-12 gap-16 items-center w-full">

              {/* Desktop Left Column */}
              <div className={`col-span-7 flex flex-col justify-center text-left transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>

                {/* Desktop Trust Badge */}
                <div className="inline-flex items-center gap-2 px-5 py-3 bg-white dark:bg-slate-800 rounded-full border border-slate-200 dark:border-slate-700 mb-8 shadow-sm w-fit">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  </div>
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Dipercaya 5000+ pengguna
                  </span>
                </div>

                {/* Desktop Headline */}
                <h1 className="text-6xl xl:text-7xl font-bold text-slate-900 dark:text-white mb-8 leading-tight tracking-tight">
                  Temukan Kost Impian di{' '}
                  <span className="relative inline-block">
                    <span className="text-slate-600 dark:text-slate-400 transition-all duration-500">
                      {popularLocations[currentLocationIndex]}
                    </span>
                    <div className="absolute -bottom-2 left-0 right-0 h-1.5 bg-slate-600 dark:bg-slate-400 rounded-full transform scale-x-100 opacity-60"></div>
                  </span>
                </h1>

                {/* Desktop Value Proposition */}
                <p className="text-2xl text-slate-600 dark:text-slate-300 mb-10 leading-relaxed max-w-2xl">
                  Platform terpercaya untuk mencari kost yang{' '}
                  <span className="font-semibold text-slate-800 dark:text-slate-100">aman, nyaman, dan terjangkau</span>{' '}
                  di seluruh Indonesia.
                </p>

                {/* Desktop Benefits */}
                <div className="grid grid-cols-2 gap-4 mb-10 max-w-2xl">
                  {[
                    { icon: <Shield className="w-5 h-5" />, text: "Verifikasi Keamanan" },
                    { icon: <Clock className="w-5 h-5" />, text: "Respon Cepat < 1 Jam" },
                    { icon: <Users className="w-5 h-5" />, text: "Komunitas Terpercaya" },
                    { icon: <MapPin className="w-5 h-5" />, text: "Lokasi Strategis" }
                  ].map((benefit, index) => (
                    <div
                      key={benefit.text}
                      className={`flex items-center gap-3 p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 transition-all duration-700 hover:shadow-md ${
                        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
                      }`}
                      style={{ transitionDelay: `${index * 100}ms` }}
                    >
                      <div className="text-slate-600 dark:text-slate-400 flex-shrink-0">
                        {benefit.icon}
                      </div>
                      <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                        {benefit.text}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Desktop CTAs */}
                <div className="flex gap-4">
                  <button
                    onClick={scrollToSearch}
                    className="inline-flex items-center justify-center px-10 py-4 bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-800 font-bold rounded-xl hover:bg-slate-700 dark:hover:bg-slate-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 min-h-[56px]"
                    aria-label="Mulai mencari kost sekarang"
                  >
                    <Search className="mr-3 h-5 w-5 flex-shrink-0" />
                    <span className="text-lg font-bold">Cari Kost Sekarang</span>
                  </button>

                  <button
                    onClick={() => {
                      // Handle registration - could navigate to registration page
                      console.log('Register clicked');
                      // Example: window.location.href = '/register';
                    }}
                    className="inline-flex items-center justify-center px-10 py-4 border-2 border-slate-800 dark:border-slate-200 text-slate-800 dark:text-slate-200 font-semibold rounded-xl hover:bg-slate-800 dark:hover:bg-slate-200 hover:text-white dark:hover:text-slate-800 transition-all duration-300 min-h-[56px] bg-transparent"
                    aria-label="Daftar akun gratis"
                  >
                    <UserPlus className="mr-3 h-5 w-5 flex-shrink-0" />
                    <span className="text-lg font-bold">Daftar Gratis</span>
                  </button>
                </div>

                {/* Desktop Tips */}
                <div className="mt-8">
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    💡 <span className="font-semibold">Tips:</span> Coba cari "Jakarta Selatan" atau "Bandung" untuk hasil terbaik
                  </p>
                </div>
              </div>

              {/* Desktop Right Column */}
              <div className={`col-span-5 flex flex-col justify-center transition-all duration-1000 delay-300 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>

                {/* Desktop Statistics Cards */}
                <div className="grid grid-cols-2 gap-5 mb-8">
                  {[
                    { number: "1000+", label: "Kost Tersedia", icon: <MapPin className="w-5 h-5" /> },
                    { number: "50+", label: "Kota di Indonesia", icon: <Users className="w-5 h-5" /> },
                    { number: "5000+", label: "Pengguna Aktif", icon: <Star className="w-5 h-5" /> },
                    { number: "4.8/5", label: "Rating Rata-rata", icon: <Shield className="w-5 h-5" /> }
                  ].map((stat, index) => (
                    <div
                      key={stat.label}
                      className={`bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                      }`}
                      style={{ transitionDelay: `${(index + 4) * 100}ms` }}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="text-slate-600 dark:text-slate-400 flex-shrink-0">
                          {stat.icon}
                        </div>
                        <div className="text-2xl font-bold text-slate-800 dark:text-white">
                          {stat.number}
                        </div>
                      </div>
                      <div className="text-sm font-semibold text-slate-600 dark:text-slate-400">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Desktop Trust Indicators */}
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                  <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">
                    Mengapa Memilih Satu Atap?
                  </h3>
                  <div className="space-y-3">
                    {trustIndicators.map((indicator, index) => (
                      <div
                        key={indicator.text}
                        className={`flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700 rounded-lg transition-all duration-500 ${
                          isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
                        }`}
                        style={{ transitionDelay: `${(index + 8) * 100}ms` }}
                      >
                        <div className="flex items-center gap-3">
                          <div className="text-slate-600 dark:text-slate-400 flex-shrink-0">
                            {indicator.icon}
                          </div>
                          <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                            {indicator.text}
                          </span>
                        </div>
                        <span className="text-sm font-bold text-slate-800 dark:text-white flex-shrink-0">
                          {indicator.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator - Desktop Only */}
      <div className="hidden lg:block absolute bottom-6 sm:bottom-8 md:bottom-10 left-1/2 transform -translate-x-1/2 z-10">
        <button
          onClick={scrollToSearch}
          className="group flex flex-col items-center justify-center space-y-1 p-4 sm:p-5 hover:bg-white/20 dark:hover:bg-slate-800/20 rounded-xl transition-all duration-300 min-h-[64px] min-w-[80px] bg-white/10 dark:bg-slate-800/10 backdrop-blur-sm"
          aria-label="Scroll ke bagian pencarian"
        >
          <span className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm font-semibold opacity-90 group-hover:opacity-100 transition-opacity duration-300 text-center leading-tight whitespace-nowrap">
            Mulai Pencarian
          </span>
          <div className="animate-bounce group-hover:animate-pulse">
            <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600 dark:text-slate-300 group-hover:text-slate-800 dark:group-hover:text-slate-100 transition-colors duration-300" />
          </div>
        </button>
      </div>

      {/* Accessibility: Skip to main content */}
      <a
        href="#quick-search"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-slate-800 focus:text-white focus:rounded-lg focus:shadow-lg"
      >
        Lewati ke pencarian utama
      </a>
    </section>
  );
};

export default Hero;
