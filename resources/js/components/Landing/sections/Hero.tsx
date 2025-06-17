import React, { useState, useEffect, useRef } from 'react';
import { Search, Star, Users, Shield, ChevronLeft, ChevronRight, Play } from 'lucide-react';

// Theme props interface
interface ThemeProps {
  currentTheme: 'light' | 'dark';
  toggleTheme: () => void;
  getThemeIcon: () => React.ReactElement;
}

// Data slider dengan konten spesifik kota
const heroSlides = [
  {
    id: 1,
    city: "Semarang",
    title: "Kost Modern di Jantung Semarang",
    subtitle: "Dekat kampus UNDIP & pusat kota • Fasilitas lengkap",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&h=800&fit=crop&crop=center",
    gradient: "from-orange-500/20 via-red-500/10 to-pink-500/20",
    highlight: "🏛️ Kota Atlas"
  },
  {
    id: 2,
    city: "Jakarta",
    title: "Hunian Premium Jakarta",
    subtitle: "Akses mudah ke CBD & transportasi umum • Lokasi strategis",
    image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=1200&h=800&fit=crop&crop=center",
    gradient: "from-blue-500/20 via-cyan-500/10 to-teal-500/20",
    highlight: "🏙️ Ibu Kota"
  },
  {
    id: 3,
    city: "Bandung",
    title: "Kost Aesthetic Bandung",
    subtitle: "Suasana sejuk pegunungan yang nyaman • Udara segar",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=800&fit=crop&crop=center",
    gradient: "from-purple-500/20 via-indigo-500/10 to-blue-500/20",
    highlight: "🏔️ Paris van Java"
  }
];

// Data kartu highlight mengambang
const floatingHighlights = [
  {
    icon: <Shield className="w-5 h-5" />,
    text: "Keamanan Terverifikasi",
    position: "top-20 left-10",
    delay: "delay-300"
  },
  {
    icon: <Users className="w-5 h-5" />,
    text: "5000+ Pengguna Aktif",
    position: "top-32 right-16",
    delay: "delay-500"
  },
  {
    icon: <Star className="w-5 h-5" />,
    text: "Rating Rata-rata 4.8/5",
    position: "bottom-40 left-20",
    delay: "delay-700"
  }
];

// Add floating animation styles
const floatingAnimation = `
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }
  .animate-float {
    animation: float 3s ease-in-out infinite;
  }
`;

const Hero: React.FC<ThemeProps> = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const heroRef = useRef<HTMLElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-slide functionality
  useEffect(() => {
    setIsVisible(true);

    // Inject floating animation styles
    const styleElement = document.createElement('style');
    styleElement.textContent = floatingAnimation;
    document.head.appendChild(styleElement);

    // Auto slide every 5 seconds
    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      // Clean up styles
      document.head.removeChild(styleElement);
    };
  }, []);



  // Manual slide navigation
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    // Reset auto-slide timer
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
      }, 5000);
    }
  };

  const nextSlide = () => {
    goToSlide((currentSlide + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    goToSlide(currentSlide === 0 ? heroSlides.length - 1 : currentSlide - 1);
  };

  // Handle scroll to search section
  const scrollToSearch = () => {
    const searchSection = document.getElementById('quick-search');
    if (searchSection) {
      searchSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // Handle demo button click
  const handleWatchDemo = () => {
    // You can implement demo functionality here
    console.log('Menampilkan demo aplikasi');
    // Example: open modal, navigate to demo page, etc.
  };

  return (
    <>
      <section
        ref={heroRef}
        className="relative min-h-screen overflow-hidden"
      >
        {/* Slider Background */}
        <div className="absolute inset-0">
          {heroSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${slide.image})` }}
              />

              {/* Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${slide.gradient}`} />

              {/* Dark Overlay for better text readability */}
              <div className="absolute inset-0 bg-black/40" />

              {/* Modern Blur Pattern */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
            </div>
          ))}
        </div>

        {/* Floating Highlight Cards */}
        {floatingHighlights.map((highlight, index) => (
          <div
            key={index}
            className={`hidden lg:block absolute ${highlight.position} z-20 animate-float`}
            style={{
              animationDelay: `${index * 0.5}s`,
              animationDuration: '3s'
            }}
          >
            <div className={`bg-white/10 backdrop-blur-md rounded-2xl px-4 py-3 border border-white/20 shadow-xl transition-all duration-700 hover:scale-105 hover:bg-white/20 ${highlight.delay} ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              <div className="flex items-center gap-3">
                <div className="text-white/90 bg-white/20 p-2 rounded-xl">
                  {highlight.icon}
                </div>
                <span className="text-white font-semibold text-sm whitespace-nowrap">
                  {highlight.text}
                </span>
              </div>
            </div>
          </div>
        ))}

        {/* Main Content */}
        <div className="relative z-10 flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">

            {/* Brand Badge */}
            <div className={`inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-8 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <span className="text-white font-bold text-sm">
                Dipercaya 5000+ pengguna
              </span>
            </div>

            {/* Dynamic Headline */}
            <h1 className={`text-4xl sm:text-5xl lg:text-7xl font-black text-white mb-6 leading-tight transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <span className="block mb-2">Temukan</span>
              <span className="block bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 bg-clip-text text-transparent">
                Kost Impian
              </span>
              <span className="block text-2xl sm:text-3xl lg:text-4xl font-bold mt-4 text-white/90">
                di {heroSlides[currentSlide].city}
              </span>
              <span className="block text-lg sm:text-xl font-medium mt-2 text-white/70">
                {heroSlides[currentSlide].highlight}
              </span>
            </h1>

            {/* Subtitle */}
            <p className={`text-lg sm:text-xl text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed transition-all duration-1000 delay-400 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              {heroSlides[currentSlide].subtitle} • Terverifikasi, aman, dan terjangkau
            </p>

            {/* CTA Buttons */}
            <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 transition-all duration-1000 delay-600 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <button
                onClick={scrollToSearch}
                className="group bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold px-8 py-4 rounded-2xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow-2xl hover:shadow-orange-500/25 transform hover:scale-105 active:scale-95 flex items-center gap-3 min-w-[220px]"
              >
                <Search className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                <span>Temukan Kost Impian Sekarang</span>
              </button>

              <button
                onClick={handleWatchDemo}
                className="group bg-white/10 backdrop-blur-md text-white font-semibold px-8 py-4 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 flex items-center gap-3 min-w-[200px]"
              >
                <Play className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                <span>Tonton Demo</span>
              </button>
            </div>

            {/* Stats Cards */}
            <div className={`grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-3xl mx-auto transition-all duration-1000 delay-800 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              {[
                { number: "5000+", label: "Pengguna Aktif" },
                { number: "4.8/5", label: "Rating Rata-rata" },
                { number: "1000+", label: "Kost Terverifikasi" },
                { number: "50+", label: "Kota" }
              ].map((stat, index) => (
                <div
                  key={stat.label}
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="text-2xl font-black text-white mb-1">
                    {stat.number}
                  </div>
                  <div className="text-sm text-white/70 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Slider Controls */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="flex items-center gap-4">
            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="p-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white hover:bg-white/20 transition-all duration-300 hover:scale-110"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Slide Indicators */}
            <div className="flex gap-2">
              {heroSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? 'bg-white scale-125'
                      : 'bg-white/40 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="p-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white hover:bg-white/20 transition-all duration-300 hover:scale-110"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>


    </>
  );
};

export default Hero;
