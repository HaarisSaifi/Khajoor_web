import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { DateVariety, Product, ProductVariant } from '../types';
import { Gift, Check, Sparkles, Heart, ShieldCheck, ArrowRight } from 'lucide-react';
import { formatINR } from '../utils/currency';
import confetti from 'canvas-confetti';

interface GiftBoxesPageProps {
  onOrderSuccess?: (token: string) => void;
}

export const GiftBoxesPage: React.FC<GiftBoxesPageProps> = () => {
  const { addToCart, setIsCartOpen } = useStore();

  const [boxStyle, setBoxStyle] = useState<'emerald' | 'brass' | 'gold'>('emerald');
  const [boxSize, setBoxSize] = useState<'2-variety' | '4-variety'>('4-variety');
  const [selectedVarieties, setSelectedVarieties] = useState<DateVariety[]>([
    'Ajwa',
    'Medjool',
    'Sukkari',
    'Mabroom',
  ]);
  const [ribbonColor, setRibbonColor] = useState<'gold' | 'emerald' | 'burgundy'>('gold');
  const [giftNote, setGiftNote] = useState('Wishing you abundant blessings and sweetness on this blessed occasion.');
  const [added, setAdded] = useState(false);

  const varietiesList: { variety: DateVariety; label: string; desc: string }[] = [
    { variety: 'Ajwa', label: 'Ajwa Al-Madinah', desc: 'Dark, sacred, tender' },
    { variety: 'Medjool', label: 'Royal Medjool', desc: 'Jumbo succulent caramel' },
    { variety: 'Sukkari', label: 'Golden Sukkari', desc: 'Honey melting center' },
    { variety: 'Mabroom', label: 'Mabroom Al-Ula', desc: 'Slender toffee chew' },
    { variety: 'Safawi', label: 'Safawi Madinah', desc: 'Deep cocoa minerals' },
    { variety: 'Khudri', label: 'Everyday Khudri', desc: 'Balanced wholesome bite' },
  ];

  const maxVarieties = boxSize === '4-variety' ? 4 : 2;
  const priceMinor = boxSize === '4-variety' ? 345000 : 185000;

  const toggleVariety = (v: DateVariety) => {
    if (selectedVarieties.includes(v)) {
      if (selectedVarieties.length > 1) {
        setSelectedVarieties((prev) => prev.filter((item) => item !== v));
      }
    } else {
      if (selectedVarieties.length < maxVarieties) {
        setSelectedVarieties((prev) => [...prev, v]);
      } else {
        // Replace last item
        setSelectedVarieties((prev) => [...prev.slice(0, maxVarieties - 1), v]);
      }
    }
  };

  const handleAddToCart = () => {
    const customProduct: Product = {
      id: `custom-gift-${Date.now()}`,
      slug: 'royal-emerald-gift-hamper',
      name: `Bespoke ${boxStyle.toUpperCase()} Luxury Gift Box (${selectedVarieties.join(', ')})`,
      shortDescription: `Curated assortment of ${selectedVarieties.length} varieties with custom note card.`,
      description: `Handcrafted box with ${selectedVarieties.join(', ')}. Note: "${giftNote}"`,
      variety: 'Ajwa',
      origin: 'Saudi Arabia Assortment',
      texture: 'Lush & Melting',
      sweetness: 'Rich Toffee',
      size: 'Jumbo',
      colorTone: '#355B3E',
      badge: 'Gift Pick',
      rating: 5.0,
      reviewCount: 42,
      images: ['/images/gift_box.webp'],
      cutoutImage: '/images/gift_box.webp',
      featured: true,
      category: 'gifts',
      pairingSuggestions: ['Arabic Gahwa', 'Saffron Tea'],
      harvestSeason: 'Bespoke Assembly 2026',
      nutritionalNotes: {
        caloriesPer100g: 284,
        potassiumMg: 680,
        fiberG: 6.9,
        naturalSugarsG: 65.0,
      },
      variants: [
        {
          id: `var-custom-${Date.now()}`,
          sku: `NKH-CUST-${boxSize.toUpperCase()}`,
          weightGrams: boxSize === '4-variety' ? 1000 : 500,
          label: boxSize === '4-variety' ? '1kg Deluxe 4-Variety Box' : '500g Duo 2-Variety Box',
          priceMinor,
          inventoryQuantity: 50,
        },
      ],
    };

    addToCart(customProduct, customProduct.variants[0], 1);
    setAdded(true);

    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#D5A24B', '#355B3E', '#B86B2B'],
      });
    } catch (e) {
      console.error(e);
    }

    setTimeout(() => {
      setAdded(false);
      setIsCartOpen(true);
    }, 500);
  };

  return (
    <div className="py-12 bg-sand-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Title */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sand-200 text-date-900 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-gold-500" />
            <span>BESPOKE CONCIERGE SERVICE</span>
          </div>
          <h1 className="font-serif-luxury text-4xl sm:text-5xl font-bold text-date-900 tracking-tight">
            Build a Custom Gift Box
          </h1>
          <p className="text-date-700/80 text-sm sm:text-base mt-2">
            Curate an unforgettable gift for Ramadan, Eid, family ceremonies, or corporate relationships. Hand-assembled with gold-foil seal and personal note card.
          </p>
        </div>

        {/* Builder Interactive Studio */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Preview Box (5 Cols) */}
          <div className="lg:col-span-5 bg-cream p-6 sm:p-8 rounded-4xl border border-sand-200 shadow-warm-lg space-y-6 sticky top-28">
            <div className="relative w-full aspect-square rounded-3xl overflow-hidden border-2 border-gold-400/40 shadow-xl group">
              <img
                src="/images/gift_box.webp"
                alt="Custom Luxury Gift Box"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-date-900/60 via-transparent to-transparent pointer-events-none" />

              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-date-900 text-gold-300 border border-gold-400/30">
                  {boxStyle === 'emerald' ? 'Emerald Velvet' : boxStyle === 'brass' ? 'Brass & Wood' : 'Sahara Gold'}
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 bg-cream/95 backdrop-blur-md p-3.5 rounded-2xl border border-sand-200 shadow-sm text-center">
                <span className="text-xs font-bold text-date-900 block">
                  {boxSize === '4-variety' ? '1kg Imperial 4-Variety Box' : '500g Duo 2-Variety Box'}
                </span>
                <span className="text-[11px] text-caramel-600 font-semibold block mt-0.5">
                  Contains: {selectedVarieties.join(' • ')}
                </span>
              </div>
            </div>

            {/* Note Preview */}
            <div className="p-4 rounded-2xl bg-sand-100/70 border border-sand-200 space-y-1.5">
              <span className="text-[10px] uppercase font-bold tracking-wider text-date-600 block">
                Calligraphy Card Note:
              </span>
              <p className="text-xs text-date-900 italic font-serif-luxury">
                "{giftNote || 'No message entered'}"
              </p>
            </div>

            {/* Total Price & Add Button */}
            <div className="pt-2 flex items-center justify-between border-t border-sand-200">
              <div>
                <span className="text-xs text-date-600 block font-medium">Bespoke Total:</span>
                <span className="font-serif-luxury text-3xl font-bold text-date-900">
                  {formatINR(priceMinor)}
                </span>
              </div>

              <button
                onClick={handleAddToCart}
                className="bg-caramel-500 hover:bg-caramel-600 text-cream px-7 py-3.5 rounded-full font-bold text-sm transition-all shadow-warm-md hover:shadow-warm-lg flex items-center gap-2 active:scale-95"
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <Gift className="w-4 h-4" />
                    <span>Add Custom Box</span>
                  </>
                )}
              </button>
            </div>

          </div>

          {/* Right Options Configurator (7 Cols) */}
          <div className="lg:col-span-7 bg-cream p-6 sm:p-10 rounded-4xl border border-sand-200 shadow-warm-sm space-y-8">
            
            {/* Step 1: Box Style */}
            <div>
              <h3 className="text-sm font-bold text-date-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-date-900 text-sand-50 text-xs flex items-center justify-center">1</span>
                <span>Select Luxury Box Style</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'emerald', title: 'Emerald Velvet', sub: 'Royal green with gold foil' },
                  { id: 'brass', title: 'Brass & Walnut', sub: 'Handcrafted wood with brass rim' },
                  { id: 'gold', title: 'Sahara Sand', sub: 'Warm beige textured gold seal' },
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setBoxStyle(s.id as any)}
                    className={`p-4 rounded-2xl text-left border transition-all ${
                      boxStyle === s.id
                        ? 'bg-date-900 text-sand-50 border-gold-400 shadow-warm-sm'
                        : 'bg-sand-50 text-date-900 border-sand-200 hover:bg-sand-100'
                    }`}
                  >
                    <span className="text-xs font-bold block">{s.title}</span>
                    <span className={`text-[10px] block mt-1 ${boxStyle === s.id ? 'text-sand-300' : 'text-date-600'}`}>
                      {s.sub}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Box Size */}
            <div>
              <h3 className="text-sm font-bold text-date-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-date-900 text-sand-50 text-xs flex items-center justify-center">2</span>
                <span>Select Box Dimension</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    setBoxSize('4-variety');
                    if (selectedVarieties.length < 4) {
                      setSelectedVarieties(['Ajwa', 'Medjool', 'Sukkari', 'Mabroom']);
                    }
                  }}
                  className={`p-4 rounded-2xl text-left border transition-all ${
                    boxSize === '4-variety'
                      ? 'bg-date-900 text-sand-50 border-gold-400 shadow-warm-sm'
                      : 'bg-sand-50 text-date-900 border-sand-200 hover:bg-sand-100'
                  }`}
                >
                  <span className="text-xs font-bold block">1kg Imperial (4 Varieties)</span>
                  <span className={`text-[11px] block mt-1 ${boxSize === '4-variety' ? 'text-gold-300' : 'text-date-600'}`}>
                    {formatINR(345000)} • 4 Compartments
                  </span>
                </button>

                <button
                  onClick={() => {
                    setBoxSize('2-variety');
                    if (selectedVarieties.length > 2) {
                      setSelectedVarieties(selectedVarieties.slice(0, 2));
                    }
                  }}
                  className={`p-4 rounded-2xl text-left border transition-all ${
                    boxSize === '2-variety'
                      ? 'bg-date-900 text-sand-50 border-gold-400 shadow-warm-sm'
                      : 'bg-sand-50 text-date-900 border-sand-200 hover:bg-sand-100'
                  }`}
                >
                  <span className="text-xs font-bold block">500g Duo (2 Varieties)</span>
                  <span className={`text-[11px] block mt-1 ${boxSize === '2-variety' ? 'text-gold-300' : 'text-date-600'}`}>
                    {formatINR(185000)} • 2 Compartments
                  </span>
                </button>
              </div>
            </div>

            {/* Step 3: Date Varieties Selection */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-date-900 uppercase tracking-wider flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-date-900 text-sand-50 text-xs flex items-center justify-center">3</span>
                  <span>Choose Dates ({selectedVarieties.length}/{maxVarieties})</span>
                </h3>
                <span className="text-xs text-caramel-600 font-semibold">
                  Pick up to {maxVarieties}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {varietiesList.map((item) => {
                  const isChecked = selectedVarieties.includes(item.variety);
                  return (
                    <div
                      key={item.variety}
                      onClick={() => toggleVariety(item.variety)}
                      className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                        isChecked
                          ? 'bg-sand-100/90 border-caramel-500 shadow-sm'
                          : 'bg-sand-50 border-sand-200 hover:bg-sand-100'
                      }`}
                    >
                      <div>
                        <span className="text-xs font-bold text-date-900 block">
                          {item.label}
                        </span>
                        <span className="text-[11px] text-date-600 block mt-0.5">
                          {item.desc}
                        </span>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                          isChecked
                            ? 'bg-caramel-500 text-cream'
                            : 'border border-sand-300'
                        }`}
                      >
                        {isChecked && <Check className="w-3 h-3" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Custom Calligraphy Message */}
            <div>
              <h3 className="text-sm font-bold text-date-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-date-900 text-sand-50 text-xs flex items-center justify-center">4</span>
                <span>Personal Note Card</span>
              </h3>
              <textarea
                rows={3}
                value={giftNote}
                onChange={(e) => setGiftNote(e.target.value)}
                placeholder="Enter personal greetings for your recipient..."
                className="w-full p-4 rounded-2xl bg-sand-50 border border-sand-300 text-xs sm:text-sm text-date-900 placeholder:text-date-500 focus:outline-none focus:ring-1 focus:ring-gold-400 resize-none"
              />
            </div>

            {/* Step 5: Ribbon Color */}
            <div>
              <h3 className="text-sm font-bold text-date-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-date-900 text-sand-50 text-xs flex items-center justify-center">5</span>
                <span>Satin Ribbon & Seal Color</span>
              </h3>
              <div className="flex gap-3">
                {[
                  { id: 'gold', label: 'Embossed Gold', color: '#D5A24B' },
                  { id: 'emerald', label: 'Imperial Emerald', color: '#355B3E' },
                  { id: 'burgundy', label: 'Royal Burgundy', color: '#723A2A' },
                ].map((r) => (
                  <button
                    key={r.id}
                    onClick={() => setRibbonColor(r.id as any)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-semibold transition-all ${
                      ribbonColor === r.id
                        ? 'bg-date-900 text-sand-50 border-gold-400'
                        : 'bg-sand-50 text-date-800 border-sand-200 hover:bg-sand-100'
                    }`}
                  >
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: r.color }} />
                    <span>{r.label}</span>
                  </button>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
