import React from 'react';
import { HeroStage } from '../components/hero/HeroStage';
import { TrustStrip } from '../components/home/TrustStrip';
import { BrandStory } from '../components/home/BrandStory';
import { FeaturedCatalog } from '../components/home/FeaturedCatalog';
import { GiftBanner } from '../components/home/GiftBanner';
import { DateGuideSection } from '../components/home/DateGuideSection';
import { ReviewsSection } from '../components/home/ReviewsSection';
import { NewsletterSection } from '../components/home/NewsletterSection';

interface HomePageProps {
  onNavigate: (route: string) => void;
  onSelectProduct: (slug: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onSelectProduct }) => {
  return (
    <main>
      {/* 1. Cinematic Rotating Hero Stage */}
      <HeroStage
        onNavigate={onNavigate}
        onSelectProduct={onSelectProduct}
      />

      {/* 2. Trust Strip */}
      <TrustStrip />

      {/* 3. Deep Date-Brown Brand Story Section */}
      <BrandStory onNavigateStory={() => onNavigate('our-story')} />

      {/* 4. Filterable Featured Collection */}
      <FeaturedCatalog
        onNavigateShop={() => onNavigate('shop')}
        onSelectProduct={onSelectProduct}
      />

      {/* 5. Luxury Gift Box Banner */}
      <GiftBanner onNavigateGifts={() => onNavigate('gift-boxes')} />

      {/* 6. Tasting Notes & Comparison Guide Matrix */}
      <DateGuideSection
        onNavigateGuide={() => onNavigate('date-guide')}
        onSelectProduct={onSelectProduct}
      />

      {/* 7. Verified Customer Reviews */}
      <ReviewsSection />

      {/* 8. Newsletter & WhatsApp VIP Opt-in */}
      <NewsletterSection />
    </main>
  );
};
