import React, { useState, useEffect, useRef } from 'react';
import { Search, Star, Users, Shield, ChevronLeft, ChevronRight, Play } from 'lucide-react';

// Hero-specific props interface (only needs currentTheme)
interface HeroProps {
  currentTheme: 'light' | 'dark';
}

// Data slider dengan konten spesifik kota
const heroSlides = [
  {
    id: 1,
    city: "Semarang",
    title: "Kost Modern di Jantung Semarang",
    subtitle: "Dekat kampus UNDIP & pusat kota • Fasilitas lengkap",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&h=800&fit=crop&crop=center",
    gradient: "from-blue-500/20 via-blue-600/10 to-blue-700/20",
    highlight: "🏛️ Kota Atlas"
  },
  {
    id: 2,
    city: "Jakarta",
    title: "Tempat Premium Jakarta",
    subtitle: "Akses mudah ke CBD & transportasi umum • Lokasi strategis",
    image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=1200&h=800&fit=crop&crop=center",
    gradient: "from-blue-600/20 via-blue-500/10 to-blue-400/20",
    highlight: "🏙️ Ibu Kota"
  },
  {
    id: 3,
    city: "Bandung",
    title: "Kos Aesthetic Bandung",
    subtitle: "Suasana sejuk pegunungan yang nyaman • Udara segar",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=800&fit=crop&crop=center",
    gradient: "from-blue-400/20 via-blue-500/10 to-blue-600/20",
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

const Hero: React.FC<HeroProps> = ({ currentTheme }) => {
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
        className="relative min-h-screen overflow-hidden bg-background transition-colors duration-300"
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

              {/* Theme-aware Overlay for better text readability */}
              <div className={`absolute inset-0 ${
                currentTheme === 'dark'
                  ? 'bg-black/50'
                  : 'bg-black/40'
              }`} />

              {/* Modern Blur Pattern - Theme-aware */}
              <div className={`absolute inset-0 ${
                currentTheme === 'dark'
                  ? 'bg-gradient-to-t from-black/70 via-transparent to-black/30'
                  : 'bg-gradient-to-t from-black/60 via-transparent to-black/20'
              }`} />
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
            <div className={`${
              currentTheme === 'dark'
                ? 'bg-card/20 border-border/30 hover:bg-card/30'
                : 'bg-white/10 border-white/20 hover:bg-white/20'
            } backdrop-blur-md rounded-2xl px-4 py-3 border shadow-xl transition-all duration-700 hover:scale-105 ${highlight.delay} ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              <div className="flex items-center gap-3">
                <div className={`${
                  currentTheme === 'dark'
                    ? 'text-foreground bg-muted/50'
                    : 'text-white/90 bg-white/20'
                } p-2 rounded-xl`}>
                  {highlight.icon}
                </div>
                <span className={`${
                  currentTheme === 'dark' ? 'text-foreground' : 'text-white'
                } font-semibold text-sm whitespace-nowrap`}>
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
            <div className={`inline-flex items-center gap-2 px-6 py-3 ${
              currentTheme === 'dark'
                ? 'bg-card/20 border-border/30'
                : 'bg-white/10 border-white/20'
            } backdrop-blur-md rounded-full border mb-8 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <span className={`${
                currentTheme === 'dark' ? 'text-foreground' : 'text-white'
              } font-bold text-sm`}>
                Dipercaya 5000+ pengguna
              </span>
            </div>

            {/* Dynamic Headline */}
            <h1 className={`text-4xl sm:text-5xl lg:text-7xl font-black ${
              currentTheme === 'dark' ? 'text-foreground' : 'text-white'
            } mb-6 leading-tight transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <span className="block mb-2">Temukan</span>
              <span className="block bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent">
                Kost Impian
              </span>
              <span className={`block text-2xl sm:text-3xl lg:text-4xl font-bold mt-4 ${
                currentTheme === 'dark' ? 'text-foreground/90' : 'text-white/90'
              }`}>
                di {heroSlides[currentSlide].city}
              </span>
              <span className={`block text-lg sm:text-xl font-medium mt-2 ${
                currentTheme === 'dark' ? 'text-muted-foreground' : 'text-white/70'
              }`}>
                {heroSlides[currentSlide].highlight}
              </span>
            </h1>

            {/* Subtitle */}
            <p className={`text-lg sm:text-xl ${
              currentTheme === 'dark' ? 'text-muted-foreground' : 'text-white/80'
            } mb-8 max-w-2xl mx-auto leading-relaxed transition-all duration-1000 delay-400 ${
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
                className="group bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold px-8 py-4 rounded-2xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105 active:scale-95 flex items-center gap-3 min-w-[220px]"
              >
                <Search className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                <span>Temukan Kost Impian Sekarang</span>
              </button>

              <button
                onClick={handleWatchDemo}
                className={`group ${
                  currentTheme === 'dark'
                    ? 'bg-card/20 border-border/30 text-foreground hover:bg-card/30'
                    : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
                } backdrop-blur-md font-semibold px-8 py-4 rounded-2xl border transition-all duration-300 flex items-center gap-3 min-w-[200px]`}
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
                  className={`${
                    currentTheme === 'dark'
                      ? 'bg-card/20 border-border/30 hover:bg-card/30'
                      : 'bg-white/10 border-white/20 hover:bg-white/20'
                  } backdrop-blur-md rounded-2xl p-4 border transition-all duration-300 hover:scale-105`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className={`text-2xl font-black ${
                    currentTheme === 'dark' ? 'text-foreground' : 'text-white'
                  } mb-1`}>
                    {stat.number}
                  </div>
                  <div className={`text-sm ${
                    currentTheme === 'dark' ? 'text-muted-foreground' : 'text-white/70'
                  } font-medium`}>
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
              className={`p-3 ${
                currentTheme === 'dark'
                  ? 'bg-card/20 border-border/30 text-foreground hover:bg-card/30'
                  : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
              } backdrop-blur-md rounded-full border transition-all duration-300 hover:scale-110`}
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
                      ? currentTheme === 'dark'
                        ? 'bg-blue-600 scale-125'
                        : 'bg-blue-500 scale-125'
                      : currentTheme === 'dark'
                        ? 'bg-muted hover:bg-muted-foreground/50'
                        : 'bg-white/40 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className={`p-3 ${
                currentTheme === 'dark'
                  ? 'bg-card/20 border-border/30 text-foreground hover:bg-card/30'
                  : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
              } backdrop-blur-md rounded-full border transition-all duration-300 hover:scale-110`}
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
