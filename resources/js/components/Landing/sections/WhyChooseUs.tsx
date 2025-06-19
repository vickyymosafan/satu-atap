import React from 'react';
import { WhyChooseUsData } from '@/types';
import { useApiFetch } from '@/hooks/use-api-fetch';
import { LoadingSkeleton } from '@/components/ui/loading-skeleton';
import { ErrorState } from '@/components/ui/error-state';
import { SectionContainer } from '@/components/ui/section-container';
import { FeatureCard } from '@/components/ui/feature-card';

interface WhyChooseUsProps {
  currentTheme: 'light' | 'dark';
}

const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ currentTheme }) => {
  const { data, loading, error, refetch } = useApiFetch<WhyChooseUsData>('/api/why-choose-us');

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
    return <LoadingSkeleton type="section" cardCount={6} />;
  }

  if (error || !data) {
    return <ErrorState error={error} showRetry onRetry={refetch} />;
  }

  return (
    <SectionContainer
      background="muted"
      padding="normal"
      maxWidth="wide"
      withDivider
    >
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 md:mb-8 leading-tight">
          Mengapa Memilih Satu Atap?
        </h2>
        <p className="text-base md:text-lg lg:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed font-medium">
          Platform terdepan untuk mencari kost dengan berbagai keunggulan dan jaminan kualitas terbaik
        </p>
      </div>

      {/* Company Benefits */}
      {data.benefits.length > 0 && (
        <div className="mb-20">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            Keunggulan Layanan Kami
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {data.benefits.map((benefit) => (
              <FeatureCard
                key={benefit.id}
                icon={benefit.icon}
                title={benefit.title}
                description={benefit.description}
                variant="benefit"
              />
            ))}
          </div>
        </div>
      )}

      {/* Platform Statistics */}
      {data.statistics.length > 0 && (
        <div className="mb-20">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            Statistik Platform
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {data.statistics.map((stat) => (
              <FeatureCard
                key={stat.id}
                icon={stat.icon}
                title=""
                description=""
                variant="statistic"
                metric={{
                  value: stat.metric_value,
                  label: stat.metric_label
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Trust Indicators & Verification Badges */}
      <div className="grid md:grid-cols-2 gap-16">
        {/* Trust Indicators */}
        {data.trust_indicators.length > 0 && (
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Indikator Kepercayaan
            </h3>
            <div className="space-y-6">
              {data.trust_indicators.map((indicator) => (
                <FeatureCard
                  key={indicator.id}
                  icon={indicator.icon}
                  title={indicator.title}
                  description={indicator.description}
                  variant="trust"
                />
              ))}
            </div>
          </div>
        )}

        {/* Verification Badges */}
        {data.verification_badges.length > 0 && (
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Badge Verifikasi
            </h3>
            <div className="space-y-6">
              {data.verification_badges.map((badge) => (
                <FeatureCard
                  key={badge.id}
                  icon={badge.icon}
                  title={badge.title}
                  description={badge.description}
                  variant="verification"
                  iconContainerClassName={getBadgeColorClasses(badge.badge_color)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </SectionContainer>
  );
};

export default WhyChooseUs;
