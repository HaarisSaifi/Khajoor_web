import React from 'react';
import { REVIEWS } from '../../data/catalog';
import { Star, CheckCircle2, Quote } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  return (
    <section className="py-16 lg:py-20 bg-sand-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-caramel-600 mb-2">
            <Star className="w-3.5 h-3.5 fill-gold-500 text-gold-500" />
            <span>CUSTOMER REVIEWS & TESTIMONIALS</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-date-900 tracking-tight">
            Loved Across India
          </h2>
          <p className="text-date-700/80 text-sm sm:text-base mt-2">
            Read unedited feedback from households, chefs, and gift recipients who count on Nakhla Dates for uncompromising quality.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {REVIEWS.map((review) => (
            <div
              key={review.id}
              className="bg-cream p-6 rounded-3xl border border-sand-200 shadow-warm-sm flex flex-col justify-between"
            >
              <div>
                {/* Rating Stars */}
                <div className="flex items-center gap-1 text-gold-500 mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-gold-500 text-gold-500" />
                  ))}
                </div>

                <Quote className="w-6 h-6 text-sand-300 mb-2" />

                <h4 className="font-serif-luxury font-bold text-date-900 text-base mb-2">
                  "{review.title}"
                </h4>

                <p className="text-xs sm:text-sm text-date-800/80 leading-relaxed italic">
                  {review.content}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-sand-200">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-date-900 block">
                      {review.author}
                    </span>
                    <span className="text-[11px] text-date-600 block">
                      {review.location}
                    </span>
                  </div>
                  {review.verifiedPurchase && (
                    <div className="flex items-center gap-1 text-[10px] font-semibold text-palm-700 bg-palm-100/50 px-2 py-0.5 rounded-full">
                      <CheckCircle2 className="w-3 h-3 text-palm-600" />
                      <span>Verified</span>
                    </div>
                  )}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
