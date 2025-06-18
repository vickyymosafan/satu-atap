import React, { useState, useEffect } from 'react';
import { 
  Search, ShieldCheck, DollarSign, Headphones, CreditCard, Star,
  Lock, BadgeCheck, Award, Activity, Building2, Users, MapPin, TrendingUp,
  Shield, MessageCircle
} from 'lucide-react';
import { WhyChooseUsData, CompanyBenefit, TrustIndicator, PlatformStatistic, VerificationBadge } from '@/types';

interface WhyChooseUsProps {
  currentTheme: 'light' | 'dark';
}

// Icon mapping for dynamic icon rendering
const iconMap = {
  Search, ShieldCheck, DollarSign, Headphones, CreditCard, Star,
  Lock, BadgeCheck, Award, Activity, Building2, Users, MapPin, TrendingUp,
  Shield, MessageCircle
};

const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ currentTheme }) => {
  const [data, setData] = useState<WhyChooseUsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch Why Choose Us data
  useEffect(() => {
    const fetchWhyChooseUsData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/why-choose-us');
        const result = await response.json();

        if (result.success) {
          setData(result.data);
        } else {
          setError(result.message || 'Gagal memuat data.');
        }
      } catch (error) {
        console.error('Error fetching Why Choose Us data:', error);
        setError('Gagal memuat data. Silakan coba lagi.');
      } finally {
        setLoading(false);
      }
    };

    fetchWhyChooseUsData();
  }, []);

  // Get icon component by name
  const getIcon = (iconName: string) => {
    const IconComponent = iconMap[iconName as keyof typeof iconMap];
    return IconComponent ? <IconComponent className="h-6 w-6" /> : null;
  };

  // Get badge color classes
  const getBadgeColorClasses = (color: string) => {
    const colorMap = {
      blue: 'bg-blue-100 text-blue-800 border-blue-200',
      green: 'bg-green-100 text-green-800 border-green-200',
      yellow: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      red: 'bg-red-100 text-red-800 border-red-200',
      purple: 'bg-purple-100 text-purple-800 border-purple-200',
      gray: 'bg-gray-100 text-gray-800 border-gray-200',
    };
    
    if (currentTheme === 'dark') {
      const darkColorMap = {
        blue: 'bg-blue-900/30 text-blue-300 border-blue-700',
        green: 'bg-green-900/30 text-green-300 border-green-700',
        yellow: 'bg-yellow-900/30 text-yellow-300 border-yellow-700',
        red: 'bg-red-900/30 text-red-300 border-red-700',
        purple: 'bg-purple-900/30 text-purple-300 border-purple-700',
        gray: 'bg-gray-900/30 text-gray-300 border-gray-700',
      };
      return darkColorMap[color as keyof typeof darkColorMap] || darkColorMap.gray;
    }
    
    return colorMap[color as keyof typeof colorMap] || colorMap.gray;
  };

  if (loading) {
    return (
      <section className="relative py-12 sm:py-16 lg:py-20 bg-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-muted rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-muted rounded w-96 mx-auto mb-8"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-card rounded-xl p-6 border border-border">
                    <div className="h-6 w-6 bg-muted rounded mb-4"></div>
                    <div className="h-5 bg-muted rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-muted rounded w-full"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error || !data) {
    return (
      <section className="relative py-12 sm:py-16 lg:py-20 bg-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="text-center">
            <p className="text-muted-foreground">{error || 'Data tidak tersedia'}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-12 sm:py-16 lg:py-20 bg-muted/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4 md:mb-6 leading-tight">
            Mengapa Memilih Satu Atap?
          </h2>
          <p className="text-sm md:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto leading-normal">
            Platform terdepan untuk mencari kost dengan berbagai keunggulan dan jaminan kualitas terbaik
          </p>
        </div>

        {/* Company Benefits */}
        {data.benefits.length > 0 && (
          <div className="mb-16">
            <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-8 text-center">
              Keunggulan Layanan Kami
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.benefits.map((benefit) => (
                <div key={benefit.id} className="bg-card/80 backdrop-blur-sm rounded-xl p-6 border border-border/50 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center mb-4">
                    <div className="p-2 bg-primary/10 rounded-lg mr-3">
                      {getIcon(benefit.icon)}
                    </div>
                    <h4 className="text-lg font-semibold text-foreground">{benefit.title}</h4>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Platform Statistics */}
        {data.statistics.length > 0 && (
          <div className="mb-16">
            <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-8 text-center">
              Statistik Platform
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {data.statistics.map((stat) => (
                <div key={stat.id} className="text-center bg-card/80 backdrop-blur-sm rounded-xl p-6 border border-border/50 shadow-lg">
                  <div className="flex justify-center mb-3">
                    <div className="p-3 bg-primary/10 rounded-full">
                      {getIcon(stat.icon)}
                    </div>
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-foreground mb-1">{stat.metric_value}</div>
                  <div className="text-sm text-muted-foreground">{stat.metric_label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Trust Indicators & Verification Badges */}
        <div className="grid md:grid-cols-2 gap-12">
          {/* Trust Indicators */}
          {data.trust_indicators.length > 0 && (
            <div>
              <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-6 text-center">
                Indikator Kepercayaan
              </h3>
              <div className="space-y-4">
                {data.trust_indicators.map((indicator) => (
                  <div key={indicator.id} className="flex items-center p-4 bg-card/80 backdrop-blur-sm rounded-lg border border-border/50">
                    <div className="p-2 bg-green-100 text-green-600 rounded-lg mr-4">
                      {getIcon(indicator.icon)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">{indicator.title}</h4>
                      <p className="text-sm text-muted-foreground">{indicator.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Verification Badges */}
          {data.verification_badges.length > 0 && (
            <div>
              <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-6 text-center">
                Badge Verifikasi
              </h3>
              <div className="space-y-4">
                {data.verification_badges.map((badge) => (
                  <div key={badge.id} className="flex items-center p-4 bg-card/80 backdrop-blur-sm rounded-lg border border-border/50">
                    <div className={`p-2 rounded-lg mr-4 border ${getBadgeColorClasses(badge.badge_color)}`}>
                      {getIcon(badge.icon)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">{badge.title}</h4>
                      <p className="text-sm text-muted-foreground">{badge.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Consistent Section Divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent opacity-50"></div>
    </section>
  );
};

export default WhyChooseUs;
