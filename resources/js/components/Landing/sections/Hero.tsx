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

const Hero: React.FC<ThemeProps> = () => {
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
    <section className="relative min-h-screen bg-gradient-to-br from-background via-background to-muted/20 pt-20 sm:pt-24 lg:pt-32 transition-colors duration-300">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-gradient-to-br from-background via-background to-muted/20"></div>
        <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(circle_at_1px_1px,_rgb(0,0,0)_1px,_transparent_0)] bg-[length:24px_24px]"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full">
        <div className="flex items-center justify-center min-h-[calc(100vh-5rem)] sm:min-h-[calc(100vh-6rem)] lg:min-h-[calc(100vh-8rem)]">

          {/* Mobile Layout */}
          <div className="lg:hidden w-full">
            <div className="container mx-auto px-4 sm:px-6 max-w-lg">
              <div className="flex flex-col justify-center min-h-[calc(100vh-5rem)] py-12 sm:py-16 text-center">

            {/* Mobile Hero Header - Consistent spacing */}
            <div className={`text-center mb-12 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>

              {/* Trust Badge - Consistent styling */}
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-primary/10 rounded-full border border-primary/20 mb-10 shadow-sm">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-primary fill-current" />
                  <Star className="w-4 h-4 text-primary fill-current" />
                  <Star className="w-4 h-4 text-primary fill-current" />
                  <Star className="w-4 h-4 text-primary fill-current" />
                  <Star className="w-4 h-4 text-primary fill-current" />
                </div>
                <span className="text-sm font-semibold text-primary">
                  Dipercaya 5000+ pengguna
                </span>
              </div>

              {/* Mobile-First Headline - Laptop optimized typography */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-6 md:mb-8 leading-tight">
                Temukan Kost Impian di{' '}
                <span className="block text-primary mt-2 relative">
                  {popularLocations[currentLocationIndex]}
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-16 md:w-20 h-1 bg-primary/30 rounded-full"></div>
                </span>
              </h1>

              {/* Mobile Value Proposition - Laptop optimized spacing */}
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground mb-8 md:mb-10 leading-normal px-2 max-w-lg mx-auto">
                Platform terpercaya untuk mencari kost yang{' '}
                <span className="font-semibold text-foreground">aman, nyaman, dan terjangkau</span>
              </p>
            </div>

            {/* Mobile Quick Stats - Laptop optimized grid */}
            <div className={`grid grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-10 transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              {[
                { number: "1000+", label: "Kost Tersedia" },
                { number: "50+", label: "Kota" },
                { number: "4.8/5", label: "Rating" }
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="text-center bg-card/50 backdrop-blur-sm rounded-lg md:rounded-xl p-3 md:p-4 border border-border/50 shadow-sm"
                >
                  <div className="text-lg sm:text-xl md:text-2xl font-bold text-foreground mb-1 md:mb-2">
                    {stat.number}
                  </div>
                  <div className="text-xs md:text-sm font-medium text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile Key Benefits - Laptop optimized styling */}
            <div className={`mb-8 md:mb-10 transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <div className="bg-card/80 backdrop-blur-sm rounded-xl md:rounded-2xl p-6 md:p-8 border border-border/50 shadow-lg">
                <div className="grid grid-cols-1 gap-4 md:gap-6">
                  {[
                    { icon: <Shield className="w-4 h-4 md:w-5 md:h-5" />, text: "Verifikasi Keamanan", desc: "Semua kost telah diverifikasi" },
                    { icon: <Clock className="w-4 h-4 md:w-5 md:h-5" />, text: "Respon Cepat", desc: "Balasan dalam 1 jam" },
                    { icon: <Users className="w-4 h-4 md:w-5 md:h-5" />, text: "Komunitas Terpercaya", desc: "5000+ pengguna aktif" }
                  ].map((benefit, index) => (
                    <div
                      key={benefit.text}
                      className="flex items-center gap-3 md:gap-4"
                      style={{ transitionDelay: `${index * 100}ms` }}
                    >
                      <div className="text-primary flex-shrink-0 bg-primary/10 p-2 md:p-3 rounded-lg md:rounded-xl">
                        {benefit.icon}
                      </div>
                      <div>
                        <div className="text-xs sm:text-sm md:text-base font-semibold text-foreground">
                          {benefit.text}
                        </div>
                        <div className="text-xs md:text-sm text-muted-foreground">
                          {benefit.desc}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile CTA Section - Improved */}
            <div className={`mt-auto space-y-4 transition-all duration-1000 delay-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              {/* Primary CTA - Enhanced Design */}
              <button
                onClick={scrollToSearch}
                className="w-full bg-primary text-primary-foreground font-bold py-5 px-6 rounded-2xl hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-95 min-h-[60px] flex items-center justify-center group"
                aria-label="Mulai mencari kost sekarang"
              >
                <Search className="h-5 w-5 mr-3 flex-shrink-0 group-hover:scale-110 transition-transform duration-200" />
                <span className="text-lg font-bold">Cari Kost Sekarang</span>
              </button>

              {/* Secondary CTA - Improved styling */}
              <button
                onClick={() => {
                  // Handle registration - could navigate to registration page
                  console.log('Register clicked');
                  // Example: window.location.href = '/register';
                }}
                className="w-full border-2 border-border bg-card text-foreground font-semibold py-4 px-6 rounded-2xl hover:bg-accent hover:text-accent-foreground hover:border-accent transition-all duration-300 min-h-[56px] flex items-center justify-center group"
                aria-label="Daftar akun gratis"
              >
                <UserPlus className="h-5 w-5 mr-3 flex-shrink-0 group-hover:scale-110 transition-transform duration-200" />
                <span className="text-base font-semibold">Daftar Gratis</span>
              </button>

              {/* Mobile Tips - Enhanced */}
              <div className="mt-8 text-center">
                <div className="bg-muted/50 rounded-xl p-4 border border-border/50">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    💡 <span className="font-semibold text-foreground">Tips:</span> Mulai dengan mencari "Jakarta Selatan" atau "Bandung"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>

        {/* Desktop Layout - Laptop optimized */}
        <div className="hidden lg:block w-full">
          <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
            <div className="flex items-center justify-center min-h-[calc(100vh-8rem)]">
              <div className="grid grid-cols-12 gap-12 lg:gap-16 items-center w-full max-w-6xl">

              {/* Desktop Left Column - Improved */}
              <div className={`col-span-7 flex flex-col justify-center pr-8 transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>

                {/* Desktop Trust Badge - Enhanced */}
                <div className="inline-flex items-center gap-3 px-6 py-3 bg-primary/10 rounded-full border border-primary/20 mb-10 shadow-sm w-fit">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-primary fill-current" />
                    <Star className="w-4 h-4 text-primary fill-current" />
                    <Star className="w-4 h-4 text-primary fill-current" />
                    <Star className="w-4 h-4 text-primary fill-current" />
                    <Star className="w-4 h-4 text-primary fill-current" />
                  </div>
                  <span className="text-sm font-semibold text-primary">
                    Dipercaya 5000+ pengguna
                  </span>
                </div>

                {/* Desktop Headline - Laptop optimized */}
                <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground mb-6 lg:mb-8 leading-tight tracking-tight">
                  Temukan Kost Impian di{' '}
                  <span className="block text-primary mt-2 relative">
                    <span className="transition-all duration-500">
                      {popularLocations[currentLocationIndex]}
                    </span>
                    <div className="absolute -bottom-2 left-0 w-24 lg:w-32 h-1.5 bg-primary/30 rounded-full"></div>
                  </span>
                </h1>

                {/* Desktop Value Proposition - Laptop optimized */}
                <p className="text-base lg:text-lg text-muted-foreground mb-8 lg:mb-10 leading-normal max-w-xl">
                  Platform terpercaya untuk mencari kost yang{' '}
                  <span className="font-semibold text-foreground">aman, nyaman, dan terjangkau</span>{' '}
                  di seluruh Indonesia.
                </p>

                {/* Desktop Benefits - Laptop optimized */}
                <div className="mb-8 lg:mb-10 max-w-xl">
                  <div className="bg-card/50 backdrop-blur-sm rounded-xl lg:rounded-2xl p-6 lg:p-8 border border-border/50 shadow-sm">
                    <div className="grid grid-cols-2 gap-4 lg:gap-6">
                      {[
                        { icon: <Shield className="w-6 h-6" />, text: "Verifikasi Keamanan", desc: "Semua kost telah diverifikasi" },
                        { icon: <Clock className="w-6 h-6" />, text: "Respon Cepat", desc: "Balasan dalam 1 jam" },
                        { icon: <Users className="w-6 h-6" />, text: "Komunitas Terpercaya", desc: "5000+ pengguna aktif" },
                        { icon: <MapPin className="w-6 h-6" />, text: "Lokasi Strategis", desc: "50+ kota tersedia" }
                      ].map((benefit, index) => (
                        <div
                          key={benefit.text}
                          className={`flex items-start gap-4 transition-all duration-700 ${
                            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
                          }`}
                          style={{ transitionDelay: `${index * 100}ms` }}
                        >
                          <div className="text-primary flex-shrink-0 bg-primary/10 p-3 rounded-xl">
                            {benefit.icon}
                          </div>
                          <div>
                            <div className="text-base font-semibold text-foreground mb-1">
                              {benefit.text}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {benefit.desc}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Desktop CTAs - Enhanced */}
                <div className="flex gap-6">
                  <button
                    onClick={scrollToSearch}
                    className="inline-flex items-center justify-center px-12 py-5 bg-primary text-primary-foreground font-bold rounded-2xl hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 min-h-[64px] group"
                    aria-label="Mulai mencari kost sekarang"
                  >
                    <Search className="mr-3 h-6 w-6 flex-shrink-0 group-hover:scale-110 transition-transform duration-200" />
                    <span className="text-xl font-bold">Cari Kost Sekarang</span>
                  </button>

                  <button
                    onClick={() => {
                      // Handle registration - could navigate to registration page
                      console.log('Register clicked');
                      // Example: window.location.href = '/register';
                    }}
                    className="inline-flex items-center justify-center px-12 py-5 border-2 border-border bg-card text-foreground font-semibold rounded-2xl hover:bg-accent hover:text-accent-foreground hover:border-accent transition-all duration-300 min-h-[64px] group"
                    aria-label="Daftar akun gratis"
                  >
                    <UserPlus className="mr-3 h-6 w-6 flex-shrink-0 group-hover:scale-110 transition-transform duration-200" />
                    <span className="text-xl font-semibold">Daftar Gratis</span>
                  </button>
                </div>

                {/* Desktop Tips - Enhanced */}
                <div className="mt-10">
                  <div className="bg-muted/50 rounded-xl p-4 border border-border/50 max-w-lg">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      💡 <span className="font-semibold text-foreground">Tips:</span> Mulai dengan mencari "Jakarta Selatan" atau "Bandung" untuk hasil terbaik
                    </p>
                  </div>
                </div>
              </div>

              {/* Desktop Right Column - Enhanced */}
              <div className={`col-span-5 flex flex-col justify-center transition-all duration-1000 delay-300 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>

                {/* Desktop Statistics Cards - Improved */}
                <div className="grid grid-cols-2 gap-6 mb-10">
                  {[
                    { number: "1000+", label: "Kost Tersedia", icon: <MapPin className="w-6 h-6" />, color: "text-blue-500" },
                    { number: "50+", label: "Kota di Indonesia", icon: <Users className="w-6 h-6" />, color: "text-green-500" },
                    { number: "5000+", label: "Pengguna Aktif", icon: <Star className="w-6 h-6" />, color: "text-yellow-500" },
                    { number: "4.8/5", label: "Rating Rata-rata", icon: <Shield className="w-6 h-6" />, color: "text-purple-500" }
                  ].map((stat, index) => (
                    <div
                      key={stat.label}
                      className={`bg-card/80 backdrop-blur-sm p-8 rounded-2xl border border-border/50 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 hover:bg-card ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                      }`}
                      style={{ transitionDelay: `${(index + 4) * 100}ms` }}
                    >
                      <div className="flex flex-col items-center text-center">
                        <div className={`${stat.color} mb-3 bg-current/10 p-3 rounded-xl`}>
                          {stat.icon}
                        </div>
                        <div className="text-3xl font-bold text-foreground mb-2">
                          {stat.number}
                        </div>
                        <div className="text-sm font-semibold text-muted-foreground">
                          {stat.label}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Desktop Trust Indicators - Enhanced */}
                <div className="bg-card/80 backdrop-blur-sm p-8 rounded-2xl border border-border/50 shadow-lg">
                  <h3 className="text-xl font-bold text-foreground mb-6 text-center">
                    Mengapa Memilih Satu Atap?
                  </h3>
                  <div className="space-y-4">
                    {trustIndicators.map((indicator, index) => (
                      <div
                        key={indicator.text}
                        className={`flex items-center justify-between p-5 bg-muted/50 rounded-xl transition-all duration-500 hover:bg-muted/70 ${
                          isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
                        }`}
                        style={{ transitionDelay: `${(index + 8) * 100}ms` }}
                      >
                        <div className="flex items-center gap-4">
                          <div className="text-primary bg-primary/10 p-2 rounded-lg flex-shrink-0">
                            {indicator.icon}
                          </div>
                          <span className="text-base font-semibold text-foreground">
                            {indicator.text}
                          </span>
                        </div>
                        <span className="text-lg font-bold text-primary flex-shrink-0">
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

        </div>
      </div>

      {/* Scroll Indicator - Desktop Only */}
      <div className="hidden lg:block absolute bottom-6 sm:bottom-8 md:bottom-10 left-1/2 transform -translate-x-1/2 z-10">
        <button
          onClick={scrollToSearch}
          className="group flex flex-col items-center justify-center space-y-1 p-4 sm:p-5 hover:bg-accent/20 rounded-xl transition-all duration-300 min-h-[64px] min-w-[80px] bg-card/10 backdrop-blur-sm"
          aria-label="Scroll ke bagian pencarian"
        >
          <span className="text-muted-foreground text-xs sm:text-sm font-semibold opacity-90 group-hover:opacity-100 transition-opacity duration-300 text-center leading-tight whitespace-nowrap">
            Mulai Pencarian
          </span>
          <div className="animate-bounce group-hover:animate-pulse">
            <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground group-hover:text-foreground transition-colors duration-300" />
          </div>
        </button>
      </div>

      {/* Accessibility: Skip to main content */}
      <a
        href="#quick-search"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-lg focus:shadow-lg"
      >
        Lewati ke pencarian utama
      </a>
    </section>
  );
};

export default Hero;
