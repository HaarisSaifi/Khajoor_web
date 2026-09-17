import React from 'react';
import { Gift, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

interface GiftBannerProps {
  onNavigateGifts: () => void;
}

export const GiftBanner: React.FC<GiftBannerProps> = ({ onNavigateGifts }) => {
  return (
    <section className="py-12 lg:py-16 bg-sand-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-palm-700 via-date-900 to-date-800 text-sand-50 p-8 sm:p-12 lg:p-16 shadow-2xl border border-gold-400/30">
          
          {/* Subtle Decorative Golden Corner Accents */}
          <div className="absolute top-0 right-0 w-56 sm:w-80 h-56 sm:h-80 bg-gold-400/10 rounded-full blur-2xl sm:blur-3xl pointer-events-none" style={{ transform: 'translateZ(0)' }} />
          <div className="absolute bottom-0 left-0 w-56 sm:w-80 h-56 sm:h-80 bg-caramel-500/10 rounded-full blur-2xl sm:blur-3xl pointer-events-none" style={{ transform: 'translateZ(0)' }} />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            
            {/* Copy Column */}
            <div className="lg:col-span-7 space-y-5 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-400/20 text-gold-300 text-xs font-semibold border border-gold-400/30">
                <Gift className="w-3.5 h-3.5" />
                <span>BESPOKE FESTIVE & CORPORATE HAMPERS</span>
              </div>

              <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-cream leading-tight">
                A gift that feels <br />
                <span className="italic font-normal text-gold-300">deeply considered.</span>
              </h2>

              <p className="text-sand-200/90 text-sm sm:text-base leading-relaxed max-w-xl">
                Elevate festive celebrations, weddings, and executive corporate relationships with hand-assembled luxury boxes. Choose bespoke packaging styles, handpick your favorite varieties, and personalize each box with embossed calligraphy and wax-sealed note cards.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs sm:text-sm text-sand-200">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-gold-400 flex-shrink-0" />
                  <span>Custom Ribbon & Wax Seal Finish</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-gold-400 flex-shrink-0" />
                  <span>Personal Calligraphy Message Card</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-gold-400 flex-shrink-0" />
                  <span>Multi-Address Corporate Shipping</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-gold-400 flex-shrink-0" />
                  <span>Temperature Controlled Delivery</span>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={onNavigateGifts}
                  className="inline-flex items-center gap-2.5 bg-gold-400 hover:bg-gold-500 text-date-900 font-bold px-7 py-3.5 rounded-full text-sm sm:text-base transition-all shadow-warm-lg hover:scale-105 active:scale-95 group"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Build a Custom Gift Box</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Visual Column */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              <div className="relative w-full max-w-md aspect-square rounded-3xl overflow-hidden border-2 border-gold-400/40 shadow-2xl group">
                <img
                  src="/images/gift_box.webp"
                  alt="Sultan Emerald & Gold Luxury Khajoor Gift Box"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (target.src.endsWith('.webp')) {
                      target.src = target.src.replace('.webp', '.jpg');
                    }
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-date-900/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 bg-date-900/80 backdrop-blur-md p-3 rounded-xl border border-gold-400/30 text-center">
                  <span className="text-xs text-gold-300 font-semibold tracking-wider uppercase">
                    The Sultan's Royal Hamper
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
