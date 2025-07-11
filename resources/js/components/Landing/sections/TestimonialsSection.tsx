import React, { useState, useEffect } from 'react';
import {
  Star,
  Quote,
  ChevronLeft,
  ChevronRight,
  Shield,
  Users,
  ThumbsUp,
  CheckCircle,
  TrendingUp
} from 'lucide-react';

// Testimonial interface
interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  role: string;
  location: string;
  rating: number;
  review: string;
  propertyName: string;
  stayDuration: string;
  verifiedReview: boolean;
  helpfulCount: number;
  reviewDate: string;
}

// Trust indicator interface
interface TrustIndicator {
  id: string;
  title: string;
  description: string;
  icon: React.ReactElement;
  value: string;
  color: string;
}

// Mock testimonials data
const mockTestimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Putri',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
    role: 'Mahasiswa UI',
    location: 'Depok',
    rating: 5,
    review: 'Kost yang sangat nyaman dan bersih! Lokasinya strategis, dekat dengan kampus UI. Pemilik kost juga sangat ramah dan responsif. Fasilitas lengkap, WiFi cepat, dan keamanan 24 jam membuat saya merasa aman tinggal di sini.',
    propertyName: 'Kost Eksklusif Dekat UI',
    stayDuration: '8 bulan',
    verifiedReview: true,
    helpfulCount: 24,
    reviewDate: '2024-01-15'
  },
  {
    id: '2',
    name: 'Ahmad Rizki',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    role: 'Karyawan Swasta',
    location: 'Jakarta Selatan',
    rating: 5,
    review: 'Sudah 1 tahun tinggal di sini dan sangat puas. Kamar luas, AC dingin, dan kamar mandi bersih. Yang paling saya suka adalah komunitasnya yang solid dan pemilik yang sangat perhatian dengan penghuni.',
    propertyName: 'Kost Putra Jakarta Selatan',
    stayDuration: '1 tahun',
    verifiedReview: true,
    helpfulCount: 18,
    reviewDate: '2024-01-10'
  },
  {
    id: '3',
    name: 'Dina Maharani',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    role: 'Mahasiswa ITB',
    location: 'Bandung',
    rating: 4,
    review: 'Kost putri yang aman dan nyaman. Fasilitas dapur bersama sangat membantu untuk memasak. Lokasi dekat dengan ITB dan akses transportasi mudah. Hanya saja kadang WiFi agak lambat di jam sibuk.',
    propertyName: 'Kost Putri Bandung',
    stayDuration: '6 bulan',
    verifiedReview: true,
    helpfulCount: 12,
    reviewDate: '2024-01-05'
  },
  {
    id: '4',
    name: 'Budi Santoso',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    role: 'Fresh Graduate',
    location: 'Yogyakarta',
    rating: 5,
    review: 'Pengalaman tinggal di kost ini luar biasa! Dari awal pencarian sampai proses sewa sangat mudah melalui platform Satu Atap. Pemilik transparan soal harga dan tidak ada biaya tersembunyi.',
    propertyName: 'Kost Jogja Strategis',
    stayDuration: '4 bulan',
    verifiedReview: true,
    helpfulCount: 15,
    reviewDate: '2023-12-28'
  }
];

// Trust indicators data
const trustIndicators: TrustIndicator[] = [
  {
    id: '1',
    title: 'Properti Terverifikasi',
    description: 'Semua properti telah melalui proses verifikasi ketat',
    icon: <Shield className="w-6 h-6" />,
    value: '100%',
    color: 'bg-green-100 text-green-800 border-green-200'
  },
  {
    id: '2',
    title: 'Kepuasan Penghuni',
    description: 'Rating rata-rata dari ribuan ulasan penghuni',
    icon: <Star className="w-6 h-6" />,
    value: '4.8/5',
    color: 'bg-yellow-100 text-yellow-800 border-yellow-200'
  },
  {
    id: '3',
    title: 'Respons Cepat',
    description: 'Waktu respons rata-rata pemilik kost',
    icon: <TrendingUp className="w-6 h-6" />,
    value: '< 2 jam',
    color: 'bg-blue-100 text-blue-800 border-blue-200'
  },
  {
    id: '4',
    title: 'Penghuni Aktif',
    description: 'Total penghuni yang menggunakan platform',
    icon: <Users className="w-6 h-6" />,
    value: '50K+',
    color: 'bg-purple-100 text-purple-800 border-purple-200'
  }
];

interface TestimonialsSectionProps {
  testimonials?: Testimonial[];
  loading?: boolean;
}

const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  testimonials = mockTestimonials,
  loading = false
}) => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play testimonials
  useEffect(() => {
    if (!isAutoPlaying || testimonials.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => 
        prev >= testimonials.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  // Navigation handlers
  const goToPrevious = () => {
    setCurrentTestimonial(prev => 
      prev <= 0 ? testimonials.length - 1 : prev - 1
    );
    setIsAutoPlaying(false);
  };

  const goToNext = () => {
    setCurrentTestimonial(prev => 
      prev >= testimonials.length - 1 ? 0 : prev + 1
    );
    setIsAutoPlaying(false);
  };

  // Render stars
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating 
            ? 'fill-yellow-400 text-yellow-400' 
            : 'text-gray-300'
        }`}
      />
    ));
  };

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-96 mx-auto animate-pulse"></div>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-lg animate-pulse">
              <div className="h-32 bg-gray-200 rounded mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const currentTestimonialData = testimonials[currentTestimonial];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Apa Kata Penghuni Kami
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Ribuan penghuni telah merasakan pengalaman terbaik tinggal di kost pilihan kami
          </p>
        </div>

        {/* Trust indicators */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {trustIndicators.map((indicator) => (
            <div
              key={indicator.id}
              className={`bg-white rounded-xl p-6 text-center border-2 ${indicator.color} hover:shadow-lg transition-shadow`}
            >
              <div className="flex justify-center mb-3">
                {indicator.icon}
              </div>
              <div className="text-2xl font-bold mb-1">{indicator.value}</div>
              <div className="text-sm font-medium mb-2">{indicator.title}</div>
              <div className="text-xs opacity-75">{indicator.description}</div>
            </div>
          ))}
        </div>

        {/* Main testimonial */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-50 rounded-full translate-y-12 -translate-x-12"></div>

            {/* Quote icon */}
            <div className="absolute top-6 left-6 text-blue-200">
              <Quote className="w-12 h-12" />
            </div>

            <div className="relative z-10">
              {/* Testimonial content */}
              <div className="text-center mb-8">
                <div className="flex justify-center mb-4">
                  {renderStars(currentTestimonialData.rating)}
                </div>
                <blockquote className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
                  "{currentTestimonialData.review}"
                </blockquote>
              </div>

              {/* Author info */}
              <div className="flex items-center justify-center space-x-4">
                <img
                  src={currentTestimonialData.avatar}
                  alt={currentTestimonialData.name}
                  className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
                />
                <div className="text-left">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-semibold text-gray-900">
                      {currentTestimonialData.name}
                    </h4>
                    {currentTestimonialData.verifiedReview && (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    )}
                  </div>
                  <p className="text-sm text-gray-600">
                    {currentTestimonialData.role} • {currentTestimonialData.location}
                  </p>
                  <p className="text-xs text-gray-500">
                    Tinggal {currentTestimonialData.stayDuration} di {currentTestimonialData.propertyName}
                  </p>
                </div>
              </div>

              {/* Review meta */}
              <div className="flex items-center justify-center space-x-6 mt-6 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <ThumbsUp className="w-4 h-4" />
                  <span>{currentTestimonialData.helpfulCount} orang terbantu</span>
                </div>
                <div>
                  {new Date(currentTestimonialData.reviewDate).toLocaleDateString('id-ID', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center space-x-4 mt-8">
            <button
              onClick={goToPrevious}
              className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow text-gray-600 hover:text-blue-600"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dots indicator */}
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentTestimonial(index);
                    setIsAutoPlaying(false);
                  }}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentTestimonial 
                      ? 'bg-blue-600' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={goToNext}
              className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow text-gray-600 hover:text-blue-600"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Additional stats */}
        <div className="text-center">
          <div className="inline-flex items-center space-x-8 bg-white rounded-2xl px-8 py-6 shadow-lg">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">4.8</div>
              <div className="text-sm text-gray-600">Rating Rata-rata</div>
            </div>
            <div className="w-px h-12 bg-gray-200"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">2,847</div>
              <div className="text-sm text-gray-600">Total Ulasan</div>
            </div>
            <div className="w-px h-12 bg-gray-200"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">96%</div>
              <div className="text-sm text-gray-600">Akan Merekomendasikan</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
