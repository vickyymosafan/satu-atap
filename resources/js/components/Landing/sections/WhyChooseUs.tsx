import React, { useState } from 'react';
import { WhyChooseUsData } from '@/types';
import { useApiFetch } from '@/hooks/use-api-fetch';
import { LoadingSkeleton } from '@/components/ui/loading-skeleton';
import { ErrorState } from '@/components/ui/error-state';
import { SectionContainer } from '@/components/ui/section-container';
import { FeatureCard } from '@/components/ui/feature-card';
import { cn, getIcon } from '@/lib/utils';
import { RESPONSIVE_GRIDS, RESPONSIVE_SPACING, RESPONSIVE_TYPOGRAPHY } from '@/lib/responsive-utils';

interface WhyChooseUsProps {
  currentTheme: 'light' | 'dark';
}

// Tab navigation types
type TabType = 'benefits' | 'statistics' | 'trust';

interface TabConfig {
  id: TabType;
  label: string;
  icon: string;
  description: string;
}

const WhyChooseUs: React.FC<WhyChooseUsProps> = () => {
  const { data, loading, error, refetch } = useApiFetch<WhyChooseUsData>('/api/why-choose-us');
  const [activeTab, setActiveTab] = useState<TabType>('benefits');
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Handle tab change with smooth transition
  const handleTabChange = (tabId: TabType) => {
    if (tabId === activeTab) return;

    setIsTransitioning(true);
    setTimeout(() => {
      setActiveTab(tabId);
      setIsTransitioning(false);
    }, 150);
  };

  // Tab configuration
  const tabs: TabConfig[] = [
    {
      id: 'benefits',
      label: 'Keunggulan Layanan',
      icon: 'Award',
      description: 'Layanan unggulan kami'
    },
    {
      id: 'statistics',
      label: 'Statistik Platform',
      icon: 'TrendingUp',
      description: 'Data dan pencapaian'
    },
    {
      id: 'trust',
      label: 'Kepercayaan & Verifikasi',
      icon: 'ShieldCheck',
      description: 'Indikator & sertifikasi'
    }
  ];

  // Get badge color classes using design system
  const getBadgeColorClasses = (color: string) => {
    const colorMap = {
      blue: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700',
      green: 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700',
      yellow: 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-700',
      red: 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-700',
      purple: 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-700',
      gray: 'bg-muted text-muted-foreground border-border',
    };

    return colorMap[color as keyof typeof colorMap] || colorMap.gray;
  };

  // Get tab button classes with consistent styling
  const getTabButtonClasses = (tabId: TabType) => {
    const isActive = activeTab === tabId;
    const baseClasses = 'relative flex-1 flex flex-col items-center justify-center p-4 sm:p-6 rounded-xl transition-all duration-300 group cursor-pointer text-center';
    const activeClasses = isActive
      ? 'bg-primary text-primary-foreground shadow-lg transform scale-105'
      : 'bg-card text-card-foreground hover:bg-accent hover:text-accent-foreground hover:shadow-md border border-border';

    return cn(baseClasses, activeClasses);
  };

  // Get content container classes for smooth transitions
  const getContentClasses = () => {
    return cn(
      'transition-all duration-500 ease-in-out',
      isTransitioning ? 'opacity-0 transform translate-y-4' : 'opacity-100 transform translate-y-0'
    );
  };

  // Render simplified tab navigation
  const renderTabNavigation = () => (
    <div className="mb-12">
      {/* Tab buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
        {tabs.map((tab) => {
          const iconElement = getIcon(tab.icon);
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={getTabButtonClasses(tab.id)}
              disabled={isTransitioning}
            >
              {/* Icon container */}
              <div className={cn(
                'flex items-center justify-center w-14 h-14 mb-4 rounded-xl transition-all duration-300 shadow-sm mx-auto',
                isActive
                  ? 'bg-primary-foreground/20 shadow-lg scale-110'
                  : 'bg-muted group-hover:bg-primary/10 group-hover:shadow-md group-hover:scale-105'
              )}>
                <div className={cn(
                  'h-7 w-7 transition-all duration-300 flex items-center justify-center',
                  isActive ? 'text-primary-foreground' : 'text-muted-foreground group-hover:text-primary'
                )}>
                  {iconElement}
                </div>
              </div>

              <h3 className={cn(
                'font-bold text-sm sm:text-base mb-2 transition-all duration-300',
                isActive ? 'text-primary-foreground' : 'text-card-foreground group-hover:text-accent-foreground'
              )}>
                {tab.label}
              </h3>
              <p className={cn(
                'text-xs sm:text-sm leading-tight transition-all duration-300',
                isActive ? 'text-primary-foreground/80' : 'text-muted-foreground group-hover:text-accent-foreground/80'
              )}>
                {tab.description}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );



  // Render simplified benefits content
  const renderBenefitsContent = () => (
    <div className="space-y-12">
      <div className="text-center mb-12">
        <h3 className={cn(RESPONSIVE_TYPOGRAPHY.heading.h3, "text-foreground mb-4")}>
          Keunggulan Layanan Kami
        </h3>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Berbagai keunggulan yang membuat platform kami menjadi pilihan terbaik untuk mencari kost
        </p>
      </div>

      {data?.benefits && data.benefits.length > 0 && (
        <div className={cn(RESPONSIVE_GRIDS.features, RESPONSIVE_SPACING.gap.md)}>
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
      )}
    </div>
  );

  // Render simplified statistics content
  const renderStatisticsContent = () => (
    <div className="space-y-12">
      <div className="text-center mb-12">
        <h3 className={cn(RESPONSIVE_TYPOGRAPHY.heading.h3, "text-foreground mb-4")}>
          Statistik Platform
        </h3>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Data dan pencapaian yang membuktikan kualitas layanan kami
        </p>
      </div>

      {data?.statistics && data.statistics.length > 0 && (
        <div className={cn(RESPONSIVE_GRIDS.stats, RESPONSIVE_SPACING.gap.lg)}>
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
      )}
    </div>
  );

  // Render simplified trust content
  const renderTrustContent = () => (
    <div className="space-y-12">
      <div className="text-center mb-12">
        <h3 className={cn(RESPONSIVE_TYPOGRAPHY.heading.h3, "text-foreground mb-4")}>
          Kepercayaan & Verifikasi
        </h3>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Indikator kepercayaan dan badge verifikasi yang menjamin kualitas layanan
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Trust Indicators */}
        {data?.trust_indicators && data.trust_indicators.length > 0 && (
          <div>
            <h4 className="text-xl font-bold text-foreground mb-6 text-center lg:text-left">
              Indikator Kepercayaan
            </h4>
            <div className="space-y-4">
              {data.trust_indicators.map((indicator) => (
                <FeatureCard
                  key={indicator.id}
                  icon={indicator.icon}
                  title={indicator.title}
                  description={indicator.description}
                  variant="trust"
                  compact
                />
              ))}
            </div>
          </div>
        )}

        {/* Verification Badges */}
        {data?.verification_badges && data.verification_badges.length > 0 && (
          <div>
            <h4 className="text-xl font-bold text-foreground mb-6 text-center lg:text-left">
              Badge Verifikasi
            </h4>
            <div className="space-y-4">
              {data.verification_badges.map((badge) => (
                <FeatureCard
                  key={badge.id}
                  icon={badge.icon}
                  title={badge.title}
                  description={badge.description}
                  variant="verification"
                  iconContainerClassName={getBadgeColorClasses(badge.badge_color)}
                  compact
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // Render active tab content
  const renderActiveContent = () => {
    switch (activeTab) {
      case 'benefits':
        return renderBenefitsContent();
      case 'statistics':
        return renderStatisticsContent();
      case 'trust':
        return renderTrustContent();
      default:
        return renderBenefitsContent();
    }
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
      {/* Main Header */}
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 md:mb-8 leading-tight">
          Mengapa Memilih Satu Atap?
        </h2>
        <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-medium">
          Platform terdepan untuk mencari kost dengan berbagai keunggulan dan jaminan kualitas terbaik
        </p>
      </div>

      {/* Tab Navigation */}
      {renderTabNavigation()}

      {/* Dynamic Content Area */}
      <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 lg:p-12 shadow-xl border border-border/50">
        <div className={getContentClasses()}>
          {renderActiveContent()}
        </div>
      </div>
    </SectionContainer>
  );
};

export default WhyChooseUs;
