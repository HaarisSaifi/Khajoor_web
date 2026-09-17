import React, { useState } from 'react';
import { DateVariety } from '../../types';
import { Sparkles, BookOpen, Coffee, Flame, Droplets, ArrowRight } from 'lucide-react';

interface DateGuideSectionProps {
  onNavigateGuide: () => void;
  onSelectProduct: (slug: string) => void;
}

interface GuideItem {
  variety: DateVariety;
  title: string;
  slug: string;
  texture: string;
  sweetness: string;
  size: string;
  moisture: string;
  bestPairing: string;
  colorHex: string;
  image: string;
  idealFor: string;
}

const GUIDE_ITEMS: GuideItem[] = [
  {
    variety: 'Ajwa',
    title: 'Ajwa Al-Madinah',
    slug: 'ajwa-al-madinah',
    texture: 'Soft, tender, slightly prune-like',
    sweetness: 'Subtle, gentle, complex',
    size: 'Medium round',
    moisture: 'Balanced Moist',
    bestPairing: 'Fresh Camel or Almond Milk, Gahwa',
    colorHex: '#2A120D',
    image: '/images/ajwa.webp',
    idealFor: 'Sacred tradition, morning vitality, cardiac support'
  },
  {
    variety: 'Medjool',
    title: 'Royal Medjool',
    slug: 'royal-medjool',
    texture: 'Plump, succulent, velvety fibrous',
    sweetness: 'Rich caramel toffee',
    size: 'Jumbo elongated',
    moisture: 'High Moist',
    bestPairing: 'Blue Cheese, Roasted Walnuts, Espresso',
    colorHex: '#B86B2B',
    image: '/images/medjool.webp',
    idealFor: 'Gourmet dessert substitute, luxury serving, pre-workout'
  },
  {
    variety: 'Sukkari',
    title: 'Golden Sukkari',
    slug: 'golden-sukkari',
    texture: 'Crisp cone edge, melting butter center',
    sweetness: 'Honey sweet',
    size: 'Large conical',
    moisture: 'Soft Rutab',
    bestPairing: 'Cardamom Arabic Coffee, Clotted Cream',
    colorHex: '#D5A24B',
    image: '/images/sukkari.webp',
    idealFor: 'Afternoon tea, festive hospitality, sweet cravings'
  },
  {
    variety: 'Mabroom',
    title: 'Mabroom Al-Ula',
    slug: 'mabroom-al-ula',
    texture: 'Firm, dense, pleasantly chewy',
    sweetness: 'Mild toffee, non-sticky',
    size: 'Slender elongated',
    moisture: 'Semi-Dry',
    bestPairing: 'Black Ceylon Tea, Roasted Almonds',
    colorHex: '#723A2A',
    image: '/images/mabroom.webp',
    idealFor: 'Connoisseurs who prefer low stickiness & sustained energy'
  },
  {
    variety: 'Safawi',
    title: 'Safawi Al-Madinah',
    slug: 'safawi-al-madinah',
    texture: 'Soft, fleshy with gentle wrinkles',
    sweetness: 'Deep cocoa and molasses',
    size: 'Medium oblong',
    moisture: 'Moist',
    bestPairing: 'Ginger Cardamom Tea, Cashews',
    colorHex: '#355B3E',
    image: '/images/safawi.webp',
    idealFor: 'Daily iron & potassium boost, recovery after fasting'
  },
  {
    variety: 'Khudri',
    title: 'Everyday Khudri',
    slug: 'classic-khudri',
    texture: 'Chewy, consistent bite',
    sweetness: 'Moderate balanced caramel',
    size: 'Medium cylindrical',
    moisture: 'Semi-Dry',
    bestPairing: 'Oatmeal, Smoothies, Warm Milk',
    colorHex: '#572A1D',
    image: '/images/khudri.webp',
    idealFor: 'All-day healthy family snacking and natural baking'
  }
];

export const DateGuideSection: React.FC<DateGuideSectionProps> = ({
  onNavigateGuide,
  onSelectProduct,
}) => {
  const [activeTab, setActiveTab] = useState<DateVariety>('Ajwa');

  const selected = GUIDE_ITEMS.find((item) => item.variety === activeTab) || GUIDE_ITEMS[0];

  return (
    <section className="py-16 lg:py-20 bg-cream border-t border-sand-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sand-100 text-date-900 text-xs font-semibold mb-3 border border-sand-200">
            <BookOpen className="w-3.5 h-3.5 text-gold-500" />
            <span>TASTING NOTES & VARIETY MATRIX</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-date-900 tracking-tight">
            The Connoisseur’s Date Guide
          </h2>
          <p className="text-date-700/80 text-sm sm:text-base mt-2">
            Every date variety carries a unique texture profile, sweetness gradient, and historical origin. Explore our comparative matrix to discover your match.
          </p>
        </div>

        {/* Variety Tabs */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 no-scrollbar mb-8">
          {GUIDE_ITEMS.map((item) => {
            const isActive = item.variety === activeTab;
            return (
              <button
                key={item.variety}
                onClick={() => setActiveTab(item.variety)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-date-900 text-sand-50 shadow-warm-sm scale-105 border border-gold-400/40'
                    : 'bg-sand-100 text-date-800 hover:bg-sand-200'
                }`}
              >
                {item.variety}
              </button>
            );
          })}
        </div>

        {/* Interactive Comparison Card */}
        <div className="bg-sand-50 rounded-3xl p-6 sm:p-10 border border-sand-200 shadow-warm-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Visual Column */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative w-full max-w-[320px] aspect-square rounded-2xl overflow-hidden bg-sand-100 p-4 border border-sand-200 shadow-warm-sm">
                <img
                  src={selected.image}
                  alt={selected.title}
                  className="w-full h-full object-cover rounded-xl"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (target.src.endsWith('.webp')) {
                      target.src = target.src.replace('.webp', '.jpg');
                    }
                  }}
                />
                <div className="absolute top-6 left-6 px-3 py-1 rounded-full bg-date-900/85 text-gold-300 text-xs font-bold backdrop-blur-sm">
                  {selected.variety} Variety
                </div>
              </div>
            </div>

            {/* Matrix Details Column */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-date-900">
                  {selected.title}
                </h3>
                <p className="text-xs text-date-600 mt-1 uppercase tracking-wider font-semibold">
                  Ideal For: {selected.idealFor}
                </p>
              </div>

              {/* Attributes Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3.5 rounded-2xl bg-cream border border-sand-200">
                  <div className="flex items-center gap-2 text-date-600 text-xs font-semibold mb-1">
                    <Droplets className="w-4 h-4 text-caramel-500" />
                    <span>Texture & Moisture</span>
                  </div>
                  <p className="text-sm font-bold text-date-900">{selected.texture}</p>
                  <span className="text-[11px] text-date-600">({selected.moisture})</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-cream border border-sand-200">
                  <div className="flex items-center gap-2 text-date-600 text-xs font-semibold mb-1">
                    <Flame className="w-4 h-4 text-gold-500" />
                    <span>Sweetness Intensity</span>
                  </div>
                  <p className="text-sm font-bold text-date-900">{selected.sweetness}</p>
                </div>

                <div className="p-3.5 rounded-2xl bg-cream border border-sand-200">
                  <div className="flex items-center gap-2 text-date-600 text-xs font-semibold mb-1">
                    <Sparkles className="w-4 h-4 text-palm-600" />
                    <span>Fruit Dimension</span>
                  </div>
                  <p className="text-sm font-bold text-date-900">{selected.size}</p>
                </div>

                <div className="p-3.5 rounded-2xl bg-cream border border-sand-200">
                  <div className="flex items-center gap-2 text-date-600 text-xs font-semibold mb-1">
                    <Coffee className="w-4 h-4 text-caramel-600" />
                    <span>Ideal Culinary Pairing</span>
                  </div>
                  <p className="text-sm font-bold text-date-900">{selected.bestPairing}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 pt-2">
                <button
                  onClick={() => onSelectProduct(selected.slug)}
                  className="bg-date-900 hover:bg-date-800 text-sand-50 px-6 py-3 rounded-full text-xs sm:text-sm font-bold transition-all shadow-sm flex items-center gap-2"
                >
                  <span>Shop {selected.variety}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={onNavigateGuide}
                  className="text-date-800 hover:text-caramel-600 text-xs sm:text-sm font-bold underline underline-offset-4"
                >
                  View Full Comparison Table
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
