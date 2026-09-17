import React from 'react';
import { Sparkles, BookOpen, Coffee, Droplets, Flame, ArrowRight, ShieldCheck } from 'lucide-react';
import { HERO_SLIDES } from '../data/catalog';
import { formatINR } from '../utils/currency';

interface DateGuidePageProps {
  onSelectProduct: (slug: string) => void;
}

export const DateGuidePage: React.FC<DateGuidePageProps> = ({ onSelectProduct }) => {
  const guideData = [
    {
      variety: 'Ajwa Al-Madinah',
      slug: 'ajwa-al-madinah',
      origin: 'Al-Madinah Al-Munawwarah, Saudi Arabia',
      texture: 'Soft, tender, slightly prune-like with fine wrinkles',
      sweetness: 'Subtle, gentle, nuanced fruit sugar',
      size: 'Medium round',
      color: 'Near-black mahogany',
      pairings: 'Fresh Camel or Almond Milk, Arabic Gahwa',
      healthFocus: 'Rich in polyphenols, flavonoids and cardiac support',
      image: '/images/ajwa.jpg',
      price: 75000,
    },
    {
      variety: 'Royal Medjool',
      slug: 'royal-medjool',
      origin: 'Jericho & Jordan Rift Basin',
      texture: 'Lush, plump, velvety fibrous and melt-in-mouth',
      sweetness: 'Rich browned butter and toffee caramel',
      size: 'Jumbo elongated',
      color: 'Amber-brown glossy',
      pairings: 'Blue Cheese, Roasted Walnuts, Espresso',
      healthFocus: 'Natural electrolyte replenishment & sustained athletic fuel',
      image: '/images/medjool.jpg',
      price: 65000,
    },
    {
      variety: 'Golden Sukkari',
      slug: 'golden-sukkari',
      origin: 'Al-Qassim Oasis, Saudi Arabia',
      texture: 'Crisp cone exterior giving way to melting honey center',
      sweetness: 'Intense honey-like natural confection',
      size: 'Large conical',
      color: 'Golden amber honey',
      pairings: 'Cardamom Gahwa, Clotted Cream, Tahini dip',
      healthFocus: 'Digestive enzyme support & natural sucrose boost',
      image: '/images/sukkari.jpg',
      price: 52000,
    },
    {
      variety: 'Mabroom Royal',
      slug: 'mabroom-al-ula',
      origin: 'Al-Ula Valley, Saudi Arabia',
      texture: 'Dense, firm, non-sticky and pleasantly chewy',
      sweetness: 'Balanced toffee with nutty undertones',
      size: 'Slender elongated',
      color: 'Mahogany with copper tones',
      pairings: 'Ceylon Black Tea, Roasted Almonds, Dark Chocolate',
      healthFocus: 'High dietary fiber and balanced glycemic release',
      image: '/images/mabroom.jpg',
      price: 59000,
    },
    {
      variety: 'Safawi Al-Madinah',
      slug: 'safawi-al-madinah',
      origin: 'Al-Madinah, Saudi Arabia',
      texture: 'Moist, supple, tender dark body',
      sweetness: 'Deep cocoa, molasses, and dark plum',
      size: 'Medium oblong',
      color: 'Dark purplish-black',
      pairings: 'Ginger Cardamom Tea, Roasted Cashews',
      healthFocus: 'High elemental iron, magnesium and post-fast restoration',
      image: '/images/safawi.jpg',
      price: 48000,
    },
    {
      variety: 'Classic Khudri',
      slug: 'classic-khudri',
      origin: 'Central Arabian Peninsula',
      texture: 'Chewy, hearty, uniform texture',
      sweetness: 'Moderate, mellow date sugar',
      size: 'Medium cylindrical',
      color: 'Chestnut sandstone',
      pairings: 'Oatmeal, Green Smoothies, Warm Milk',
      healthFocus: 'Everyday vitality, potassium and clean wholesome energy',
      image: '/images/khudri.jpg',
      price: 38000,
    },
  ];

  return (
    <div className="py-12 bg-sand-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sand-200 text-date-900 text-xs font-semibold mb-3">
            <BookOpen className="w-3.5 h-3.5 text-gold-500" />
            <span>AUTHENTIC VARIETAL TAXONOMY</span>
          </div>
          <h1 className="font-serif-luxury text-4xl sm:text-5xl font-bold text-date-900 tracking-tight">
            The Definitive Khajoor Encyclopedia
          </h1>
          <p className="text-date-700/80 text-sm sm:text-base mt-3 leading-relaxed">
            Not all dates are created equal. Different soils, altitudes, and microclimates create markedly different moisture levels, fruit textures, and sweetness profiles. Use our verified guide to choose the ideal variety for your health goals and palate.
          </p>
        </div>

        {/* Master Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {guideData.map((item) => (
            <div
              key={item.slug}
              className="bg-cream rounded-3xl p-6 border border-sand-200 shadow-warm-sm flex flex-col justify-between"
            >
              <div>
                <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-sand-100 p-2 border border-sand-200 mb-5">
                  <img
                    src={item.image}
                    alt={item.variety}
                    className="w-full h-full object-cover rounded-xl"
                  />
                  <div className="absolute top-4 left-4 bg-date-900/85 text-gold-300 text-[11px] font-bold px-3 py-1 rounded-full backdrop-blur-sm">
                    {item.origin}
                  </div>
                </div>

                <h3 className="font-serif-luxury text-2xl font-bold text-date-900">
                  {item.variety}
                </h3>

                <div className="mt-4 space-y-3 text-xs">
                  <div className="p-3 bg-sand-50 rounded-xl border border-sand-200">
                    <span className="text-date-600 block text-[10px] uppercase font-bold tracking-wider">
                      Texture & Feel
                    </span>
                    <p className="text-date-900 font-semibold mt-0.5">{item.texture}</p>
                  </div>

                  <div className="p-3 bg-sand-50 rounded-xl border border-sand-200">
                    <span className="text-date-600 block text-[10px] uppercase font-bold tracking-wider">
                      Sweetness Gradient
                    </span>
                    <p className="text-date-900 font-semibold mt-0.5">{item.sweetness}</p>
                  </div>

                  <div className="p-3 bg-sand-50 rounded-xl border border-sand-200">
                    <span className="text-date-600 block text-[10px] uppercase font-bold tracking-wider">
                      Suggested Pairings
                    </span>
                    <p className="text-date-900 font-semibold mt-0.5">{item.pairings}</p>
                  </div>

                  <div className="p-3 bg-sand-50 rounded-xl border border-sand-200">
                    <span className="text-date-600 block text-[10px] uppercase font-bold tracking-wider">
                      Nutritional Focus
                    </span>
                    <p className="text-date-900 font-semibold mt-0.5">{item.healthFocus}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-sand-200 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-date-600 block">Starting From</span>
                  <span className="font-bold text-base text-date-900">{formatINR(item.price)}</span>
                </div>

                <button
                  onClick={() => onSelectProduct(item.slug)}
                  className="bg-caramel-500 hover:bg-caramel-600 text-cream px-5 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
                >
                  <span>Shop Variety</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Disclaimer note as mandated by PRD Section 7.9 */}
        <div className="mt-12 p-4 rounded-2xl bg-sand-100 border border-sand-200 text-center text-xs text-date-600 max-w-2xl mx-auto">
          <p>
            * Disclaimer: General product information and traditional wellness customs are shared for educational discovery and culinary enjoyment. They are not intended as medical advice or clinical guarantees.
          </p>
        </div>

      </div>
    </div>
  );
};
