import React from 'react';
import { ArrowRight, Sparkles, HeartHandshake } from 'lucide-react';
import { motion } from 'framer-motion';

interface BrandStoryProps {
  onNavigateStory: () => void;
}

export const BrandStory: React.FC<BrandStoryProps> = ({ onNavigateStory }) => {
  return (
    <section className="relative py-16 lg:py-24 bg-date-900 text-sand-50 overflow-hidden">
      {/* Background Decorative Radial Blobs */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-10 left-10 w-96 h-96 rounded-full bg-gold-400 blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-caramel-500 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Image Collage & Heritage Visual */}
          <div className="lg:col-span-6 relative">
            {/* Warm Gold Organic Backdrop */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-gold-500/20 to-caramel-500/20 rounded-4xl blur-xl" />

            <div className="relative rounded-3xl overflow-hidden border-2 border-gold-400/30 shadow-2xl">
              <img
                src="/images/palm_grove.jpg"
                alt="Date palm orchards in Al-Madinah at sunset"
                className="w-full h-[400px] sm:h-[480px] object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-date-900/80 via-transparent to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-date-800/80 backdrop-blur-md border border-gold-400/30 flex items-center justify-between">
                <div>
                  <span className="text-xs uppercase tracking-widest text-gold-400 font-semibold block">
                    ORIGIN OF PURITY
                  </span>
                  <p className="text-sm font-serif-luxury font-bold text-sand-100">
                    Sacred Groves of Medina & Al-Ula Oases
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-gold-400/20 flex items-center justify-center text-gold-400">
                  <Sparkles className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Small Floating Floating Badge */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="absolute -top-5 -right-5 hidden sm:flex items-center gap-3 bg-cream text-date-900 px-4 py-3 rounded-2xl shadow-warm-lg border border-sand-200"
            >
              <HeartHandshake className="w-6 h-6 text-caramel-600" />
              <div>
                <span className="text-xs font-bold block">100% Tree-Ripened</span>
                <span className="text-[10px] text-date-700">Zero Artificial Glazes</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Narrative Copy */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-date-800 border border-gold-400/30 text-gold-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-gold-400" />
              <span>FROM GROVE TO GIFT BOX</span>
            </div>

            <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-sand-50 leading-tight">
              Selected with care. <br />
              <span className="text-gold-400 italic font-normal">Packed with purpose.</span>
            </h2>

            <div className="space-y-4 text-sand-200/90 text-sm sm:text-base leading-relaxed">
              <p>
                At Nakhla Dates, our journey begins in the historic date palm gardens of Al-Madinah, Al-Ula, and the Jordan Basin. We forge direct relationships with generational farmers who harvest only when each cluster has reached peak physiological maturity under the desert sun.
              </p>
              <p>
                Unlike commercial varieties that sit in ambient transit losing their precious natural oils, our khajoor is cold-transported, rigorously inspected for moisture uniformity, and sealed with inert food-grade nitrogen. The result is pure, tender dates that taste as if you plucked them directly from the oasis.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-date-700/60">
              <div>
                <span className="font-serif-luxury text-2xl sm:text-3xl font-bold text-gold-400 block">
                  100%
                </span>
                <span className="text-xs text-sand-300/80">Natural & Raw</span>
              </div>
              <div>
                <span className="font-serif-luxury text-2xl sm:text-3xl font-bold text-gold-400 block">
                  Grade A
                </span>
                <span className="text-xs text-sand-300/80">Hand-Sorted</span>
              </div>
              <div>
                <span className="font-serif-luxury text-2xl sm:text-3xl font-bold text-gold-400 block">
                  0%
                </span>
                <span className="text-xs text-sand-300/80">Added Sugars</span>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={onNavigateStory}
                className="inline-flex items-center gap-2 bg-gold-400 hover:bg-gold-500 text-date-900 font-bold px-7 py-3.5 rounded-full transition-all shadow-warm-md hover:scale-105"
              >
                <span>Read Our Full Story</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
