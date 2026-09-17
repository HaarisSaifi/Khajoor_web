import React from 'react';
import { Sparkles, HeartHandshake, ShieldCheck, Leaf, Truck } from 'lucide-react';

export const OurStoryPage: React.FC = () => {
  return (
    <div className="py-12 bg-sand-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Hero Banner */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sand-200 text-date-900 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-gold-500" />
            <span>THE HERITAGE OF NAKHLA DATES</span>
          </div>
          <h1 className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl font-bold text-date-900 tracking-tight">
            From Sacred Groves to Your Family Gathering
          </h1>
          <p className="text-date-700/80 text-base sm:text-lg mt-3 leading-relaxed">
            Founded on reverence for the date palm tree—"Nakhla" in Arabic—our mission is to restore the purity, ritual, and slow indulgence of real khajoor in India.
          </p>
        </div>

        {/* Featured Heritage Photo */}
        <div className="relative rounded-4xl overflow-hidden border-2 border-gold-400/30 shadow-2xl">
          <img
            src="/images/palm_grove.jpg"
            alt="Date Palm groves at golden sunset"
            className="w-full h-[400px] sm:h-[500px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-date-900/80 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-date-900/80 backdrop-blur-md border border-gold-400/30 text-sand-50">
            <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold text-gold-300">
              Direct Farmer Partnerships in Medina & Al-Ula
            </h3>
            <p className="text-xs sm:text-sm text-sand-200/90 mt-1 max-w-2xl">
              We bypass speculative traders and secondary auction markets. Every crop is harvested at peak maturity by fourth-generation farming families.
            </p>
          </div>
        </div>

        {/* The 4 Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
          <div className="p-8 rounded-3xl bg-cream border border-sand-200 shadow-warm-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-sand-100 flex items-center justify-center text-caramel-600">
              <Leaf className="w-6 h-6" />
            </div>
            <h3 className="font-serif-luxury text-xl font-bold text-date-900">
              1. 100% Tree-Ripened
            </h3>
            <p className="text-xs sm:text-sm text-date-700/80 leading-relaxed">
              Many commercial dates are harvested green and chemically cured in heat chambers to accelerate turnover. Nakhla dates ripen naturally under the Middle Eastern desert sun, caramelizing their internal nectar organically.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-cream border border-sand-200 shadow-warm-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-sand-100 flex items-center justify-center text-palm-600">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-serif-luxury text-xl font-bold text-date-900">
              2. Nitrogen-Flushed Sealing
            </h3>
            <p className="text-xs sm:text-sm text-date-700/80 leading-relaxed">
              Oxygen is the enemy of natural date sugars and moisture. Immediately after sorting, our dates are placed in food-grade hermetic containers and flushed with medical-grade nitrogen gas to prevent crystal hardening and preserve tender bite.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-cream border border-sand-200 shadow-warm-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-sand-100 flex items-center justify-center text-gold-600">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="font-serif-luxury text-xl font-bold text-date-900">
              3. Unadulterated Authenticity
            </h3>
            <p className="text-xs sm:text-sm text-date-700/80 leading-relaxed">
              Zero glucose syrup, zero artificial glycerin sprays, zero sulphur dioxide preservatives. When you bite into a Nakhla date, you experience 100% natural, whole food as nature sculpted it.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-cream border border-sand-200 shadow-warm-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-sand-100 flex items-center justify-center text-caramel-600">
              <Truck className="w-6 h-6" />
            </div>
            <h3 className="font-serif-luxury text-xl font-bold text-date-900">
              4. Pan-India Cold-Chain Air Cargo
            </h3>
            <p className="text-xs sm:text-sm text-date-700/80 leading-relaxed">
              From our temperature-regulated central fulfillment hub in Mumbai, packages are dispatched via priority air to ensure prompt arrival in pristine condition at over 26,000 Indian PIN codes.
            </p>
          </div>
        </div>

        {/* Narrative closing quote */}
        <div className="p-10 rounded-3xl bg-date-900 text-sand-50 text-center space-y-3 border border-gold-400/30">
          <p className="font-serif-luxury text-xl sm:text-2xl font-bold text-gold-300 italic">
            "We do not sell dates as bulk commodities. We curate them as mindful rituals worth slowing down for."
          </p>
          <span className="text-xs text-sand-300 uppercase tracking-widest font-semibold block">
            — THE NAKHLA DATES CONCIERGE TEAM
          </span>
        </div>

      </div>
    </div>
  );
};
