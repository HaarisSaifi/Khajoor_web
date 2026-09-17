import React, { useState, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import { ProductVariant } from '../../types';
import { X, Star, ShoppingBag, Check, ShieldCheck, MapPin, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatINR } from '../../utils/currency';

interface QuickViewModalProps {
  onSelectProduct: (slug: string) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({ onSelectProduct }) => {
  const { quickViewProduct, setQuickViewProduct, addToCart, setIsCheckoutOpen } = useStore();
  
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState('');
  const [pincodeResult, setPincodeResult] = useState<string | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [addedAnimation, setAddedAnimation] = useState(false);

  useEffect(() => {
    if (quickViewProduct) {
      setSelectedVariant(
        quickViewProduct.variants.find((v) => v.isPopular) || quickViewProduct.variants[0]
      );
      setQuantity(1);
      setActiveImageIndex(0);
      setPincodeResult(null);
    }
  }, [quickViewProduct]);

  if (!quickViewProduct || !selectedVariant) return null;

  const handleCheckPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.trim().length === 6) {
      setPincodeResult('Express delivery available: 2-3 Business Days via Air');
    } else {
      setPincodeResult('Please enter a valid 6-digit Indian PIN code.');
    }
  };

  const handleAddToCart = () => {
    addToCart(quickViewProduct, selectedVariant, quantity);
    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
      setQuickViewProduct(null);
    }, 600);
  };

  const handleBuyNow = () => {
    addToCart(quickViewProduct, selectedVariant, quantity);
    setQuickViewProduct(null);
    setIsCheckoutOpen(true);
  };

  const handleViewFullDetails = () => {
    const slug = quickViewProduct.slug;
    setQuickViewProduct(null);
    onSelectProduct(slug);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setQuickViewProduct(null)}
          className="fixed inset-0 bg-date-900/65 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 280 }}
          style={{ willChange: 'transform, opacity' }}
          className="relative w-full max-w-4xl bg-cream rounded-4xl shadow-2xl border border-sand-200 overflow-hidden z-10 my-auto max-h-[90vh] flex flex-col md:flex-row"
        >
          {/* Close Button */}
          <button
            onClick={() => setQuickViewProduct(null)}
            aria-label="Close modal"
            className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-cream/90 hover:bg-sand-100 text-date-900 flex items-center justify-center shadow-md transition-all border border-sand-200"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left Column: Image Gallery (45%) */}
          <div className="w-full md:w-[46%] bg-sand-100/70 p-6 sm:p-8 flex flex-col justify-between items-center border-b md:border-b-0 md:border-r border-sand-200">
            <div className="relative w-full aspect-square flex items-center justify-center">
              <img
                src={quickViewProduct.images[activeImageIndex] || quickViewProduct.cutoutImage}
                alt={quickViewProduct.name}
                className="w-4/5 h-4/5 object-contain drop-shadow-xl"
                decoding="async"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (target.src.endsWith('.webp')) {
                    target.src = target.src.includes('cutout')
                      ? target.src.replace('.webp', '.png')
                      : target.src.replace('.webp', '.jpg');
                  }
                }}
              />
            </div>

            {/* Thumbnails */}
            {quickViewProduct.images.length > 1 && (
              <div className="flex items-center gap-2 mt-4">
                {quickViewProduct.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition-all ${
                      activeImageIndex === idx
                        ? 'border-caramel-500 scale-105 shadow-sm'
                        : 'border-sand-300 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt="Thumbnail"
                      className="w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (target.src.endsWith('.webp')) {
                          target.src = target.src.replace('.webp', '.jpg');
                        }
                      }}
                    />
                  </button>
                ))}
              </div>
            )}

            <div className="w-full mt-4 p-3 bg-cream/80 rounded-xl border border-sand-200 text-center text-xs text-date-700">
              <span className="font-semibold text-date-900">Origin: </span>
              <span>{quickViewProduct.origin}</span>
            </div>
          </div>

          {/* Right Column: Details & Variant Selection (55%) */}
          <div className="w-full md:w-[54%] p-6 sm:p-8 overflow-y-auto max-h-[85vh] space-y-5">
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-date-900 text-gold-300">
                  {quickViewProduct.variety} Variety
                </span>
                <div className="flex items-center gap-1 text-gold-600 text-xs font-bold">
                  <Star className="w-3.5 h-3.5 fill-gold-500 text-gold-500" />
                  <span>{quickViewProduct.rating}</span>
                  <span className="text-date-600 font-normal">({quickViewProduct.reviewCount})</span>
                </div>
              </div>

              <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-date-900">
                {quickViewProduct.name}
              </h3>

              <p className="text-xs sm:text-sm text-date-700/80 mt-1 leading-relaxed">
                {quickViewProduct.shortDescription}
              </p>
            </div>

            {/* Price Box */}
            <div className="flex items-baseline gap-3 p-3.5 rounded-2xl bg-sand-100/60 border border-sand-200">
              <span className="text-2xl sm:text-3xl font-bold text-date-900">
                {formatINR(selectedVariant.priceMinor)}
              </span>
              {selectedVariant.compareAtPriceMinor && (
                <span className="text-sm text-date-400 line-through">
                  {formatINR(selectedVariant.compareAtPriceMinor)}
                </span>
              )}
              <span className="ml-auto text-xs font-bold text-palm-700 bg-palm-100/70 px-2.5 py-1 rounded-full">
                In Stock • Grade VIP
              </span>
            </div>

            {/* Pack Size / Variant Selector */}
            <div>
              <label className="text-xs font-bold text-date-900 uppercase tracking-wider block mb-2">
                Select Pack Size:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {quickViewProduct.variants.map((variant) => {
                  const isSelected = selectedVariant.id === variant.id;
                  return (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariant(variant)}
                      className={`p-2.5 rounded-2xl text-left border transition-all ${
                        isSelected
                          ? 'bg-date-900 text-sand-50 border-gold-400 shadow-warm-sm'
                          : 'bg-cream text-date-900 border-sand-200 hover:bg-sand-100'
                      }`}
                    >
                      <span className="text-xs font-bold block">{variant.label}</span>
                      <span className={`text-[11px] font-medium block mt-0.5 ${isSelected ? 'text-gold-300' : 'text-date-600'}`}>
                        {formatINR(variant.priceMinor)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity Stepper */}
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold text-date-900 uppercase tracking-wider">
                Quantity:
              </span>
              <div className="flex items-center rounded-full border border-sand-300 bg-cream p-1">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-8 h-8 rounded-full hover:bg-sand-100 flex items-center justify-center text-date-900 font-bold"
                >
                  -
                </button>
                <span className="w-8 text-center text-sm font-bold text-date-900">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-8 h-8 rounded-full hover:bg-sand-100 flex items-center justify-center text-date-900 font-bold"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-caramel-500 hover:bg-caramel-600 text-cream py-3.5 px-6 rounded-full font-bold text-sm transition-all shadow-warm-md flex items-center justify-center gap-2"
              >
                {addedAnimation ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Cart ({formatINR(selectedVariant.priceMinor * quantity)})</span>
                  </>
                )}
              </button>

              <button
                onClick={handleBuyNow}
                className="bg-date-900 hover:bg-date-800 text-sand-50 py-3.5 px-6 rounded-full font-bold text-sm transition-all shadow-warm-sm hover:shadow-warm-md flex-shrink-0"
              >
                Buy Now
              </button>
            </div>

            {/* Pincode Checker */}
            <div className="pt-2 border-t border-sand-200">
              <form onSubmit={handleCheckPincode} className="flex items-center gap-2">
                <div className="relative flex-1">
                  <MapPin className="w-3.5 h-3.5 text-date-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    maxLength={6}
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    placeholder="Check delivery PIN code"
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-sand-100/60 border border-sand-300 text-date-900 placeholder:text-date-500 focus:outline-none focus:ring-1 focus:ring-gold-400 font-mono"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-sand-200 hover:bg-sand-300 text-date-900 text-xs font-bold"
                >
                  Check
                </button>
              </form>
              {pincodeResult && (
                <p className="text-[11px] text-palm-700 font-semibold mt-1.5 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-palm-600" />
                  {pincodeResult}
                </p>
              )}
            </div>

            {/* View Full Details Link */}
            <div className="pt-2 text-center">
              <button
                onClick={handleViewFullDetails}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-caramel-600 hover:text-caramel-700 underline underline-offset-4"
              >
                <span>View Full Tasting Profile & Nutrition</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
