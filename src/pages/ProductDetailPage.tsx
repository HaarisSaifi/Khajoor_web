import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductVariant } from '../types';
import {
  Star,
  ShoppingBag,
  Heart,
  ShieldCheck,
  Truck,
  MapPin,
  Check,
  ChevronRight,
  Leaf,
  Coffee,
  Droplets,
  Flame,
  Award,
  ArrowLeft
} from 'lucide-react';
import { formatINR } from '../utils/currency';

interface ProductDetailPageProps {
  slug: string;
  onNavigateBack: () => void;
  onSelectProduct: (slug: string) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  slug,
  onNavigateBack,
  onSelectProduct,
}) => {
  const { products, addToCart, toggleWishlist, isInWishlist, setIsCheckoutOpen } = useStore();

  const product = products.find((p) => p.slug === slug) || products[0];

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    product.variants.find((v) => v.isPopular) || product.variants[0]
  );
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [pincode, setPincode] = useState('');
  const [pincodeResult, setPincodeResult] = useState<string | null>(null);
  const [addedAnimation, setAddedAnimation] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setSelectedVariant(product.variants.find((v) => v.isPopular) || product.variants[0]);
    setQuantity(1);
    setActiveImageIndex(0);
    setPincodeResult(null);
  }, [slug, product]);

  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, selectedVariant, quantity);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1200);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedVariant, quantity);
    setIsCheckoutOpen(true);
  };

  const handleCheckPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.trim().length === 6) {
      setPincodeResult('Delivery available: Standard 3-4 days (FREE) or Priority Air 24-48 hrs (+₹70)');
    } else {
      setPincodeResult('Please enter a 6-digit Indian PIN code.');
    }
  };

  const relatedProducts = products
    .filter((p) => p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="py-8 bg-sand-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-date-600 mb-6">
          <button onClick={onNavigateBack} className="hover:text-date-900 flex items-center gap-1 font-semibold">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Store</span>
          </button>
          <ChevronRight className="w-3 h-3 text-date-400" />
          <span>{product.variety}</span>
          <ChevronRight className="w-3 h-3 text-date-400" />
          <span className="text-date-900 font-bold truncate">{product.name}</span>
        </div>

        {/* Top Section: Gallery & Purchase Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left: Gallery (6 Cols) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative w-full aspect-square rounded-3xl overflow-hidden bg-cream p-6 sm:p-10 border border-sand-200 shadow-warm-md flex items-center justify-center">
              {product.badge && (
                <span className="absolute top-5 left-5 z-10 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-date-900 text-gold-300 shadow-sm border border-gold-400/30">
                  {product.badge}
                </span>
              )}

              <button
                onClick={() => toggleWishlist(product.id)}
                className={`absolute top-5 right-5 z-10 w-11 h-11 rounded-full flex items-center justify-center transition-all ${
                  isWishlisted
                    ? 'bg-caramel-500 text-cream shadow-md scale-110'
                    : 'bg-sand-100 text-date-800 hover:text-caramel-600 shadow-sm'
                }`}
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-cream' : ''}`} />
              </button>

              <img
                src={product.images[activeImageIndex] || product.cutoutImage}
                alt={product.name}
                className="w-4/5 h-4/5 object-contain drop-shadow-2xl transition-transform duration-500 hover:scale-105"
              />
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex items-center gap-3">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-20 h-20 rounded-2xl overflow-hidden bg-cream p-1 border-2 transition-all ${
                      activeImageIndex === idx
                        ? 'border-caramel-500 shadow-sm scale-105'
                        : 'border-sand-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover rounded-xl" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Buy Controls (6 Cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide bg-sand-200 text-date-900 border border-sand-300">
                  {product.variety} Date Harvest
                </span>
                <div className="flex items-center gap-1 text-gold-600 text-xs font-bold">
                  <Star className="w-4 h-4 fill-gold-500 text-gold-500" />
                  <span>{product.rating}</span>
                  <span className="text-date-600 font-normal">({product.reviewCount} customer reviews)</span>
                </div>
              </div>

              <h1 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-date-900 leading-tight">
                {product.name}
              </h1>

              <div className="flex items-center gap-2 text-xs text-date-700 font-medium mt-2">
                <Leaf className="w-4 h-4 text-palm-600" />
                <span>Harvested in {product.origin}</span>
                <span>•</span>
                <span>{product.harvestSeason}</span>
              </div>
            </div>

            {/* Price Card */}
            <div className="p-4 rounded-2xl bg-cream border border-sand-200 shadow-warm-sm flex items-baseline gap-3">
              <span className="font-serif-luxury text-3xl sm:text-4xl font-bold text-date-900">
                {formatINR(selectedVariant.priceMinor)}
              </span>
              {selectedVariant.compareAtPriceMinor && (
                <span className="text-sm text-date-400 line-through">
                  MRP {formatINR(selectedVariant.compareAtPriceMinor)}
                </span>
              )}
              <span className="ml-auto text-xs font-bold text-palm-700 bg-palm-100/80 px-3 py-1 rounded-full">
                In Stock • Grade VIP
              </span>
            </div>

            {/* Pack Size / Variant Selection */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-date-900 uppercase tracking-wider">
                  Select Pack Size:
                </label>
                <span className="text-xs text-caramel-600 font-semibold">
                  {selectedVariant.label}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {product.variants.map((variant) => {
                  const isSelected = selectedVariant.id === variant.id;
                  return (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariant(variant)}
                      className={`p-3 rounded-2xl text-left border transition-all ${
                        isSelected
                          ? 'bg-date-900 text-sand-50 border-gold-400 shadow-warm-sm scale-102'
                          : 'bg-cream text-date-900 border-sand-200 hover:bg-sand-100'
                      }`}
                    >
                      <span className="text-xs font-bold block">{variant.label}</span>
                      <span className={`text-xs font-semibold block mt-1 ${isSelected ? 'text-gold-300' : 'text-date-600'}`}>
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
              <span className="text-xs text-date-600">
                Total: <strong className="text-date-900 font-bold">{formatINR(selectedVariant.priceMinor * quantity)}</strong>
              </span>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-caramel-500 hover:bg-caramel-600 text-cream py-4 px-6 rounded-full font-bold text-sm sm:text-base transition-all shadow-warm-md hover:shadow-warm-lg flex items-center justify-center gap-2 active:scale-98"
              >
                {addedAnimation ? (
                  <>
                    <Check className="w-5 h-5" />
                    <span>Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5" />
                    <span>Add to Cart</span>
                  </>
                )}
              </button>

              <button
                onClick={handleBuyNow}
                className="bg-date-900 hover:bg-date-800 text-sand-50 py-4 px-8 rounded-full font-bold text-sm sm:text-base transition-all shadow-warm-sm hover:shadow-warm-md flex-shrink-0"
              >
                Instant Buy Now
              </button>
            </div>

            {/* Pincode Serviceability */}
            <div className="p-4 rounded-2xl bg-sand-100/70 border border-sand-200">
              <form onSubmit={handleCheckPincode} className="flex items-center gap-2">
                <div className="relative flex-1">
                  <MapPin className="w-4 h-4 text-date-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    maxLength={6}
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    placeholder="Enter Indian 6-digit Pincode"
                    className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl bg-cream border border-sand-300 text-date-900 placeholder:text-date-500 focus:outline-none focus:ring-1 focus:ring-gold-400 font-mono"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-date-900 text-sand-50 rounded-xl text-xs font-bold hover:bg-date-800 transition-colors"
                >
                  Verify
                </button>
              </form>
              {pincodeResult && (
                <p className="text-xs text-palm-700 font-semibold mt-2 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-palm-600 flex-shrink-0" />
                  <span>{pincodeResult}</span>
                </p>
              )}
            </div>

            {/* Trust Highlights */}
            <div className="grid grid-cols-2 gap-3 pt-2 text-xs text-date-700 border-t border-sand-200">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-palm-600" />
                <span>100% Tree-Ripened • Zero Sugars</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-caramel-600" />
                <span>FREE Shipping on Orders Over ₹999</span>
              </div>
            </div>

          </div>

        </div>

        {/* Below the Fold: Rich Detailed Specifications */}
        <div className="mt-16 pt-12 border-t border-sand-200 space-y-12">
          
          {/* Sourcing Narrative & Taste Spectrum */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 bg-cream p-8 rounded-3xl border border-sand-200 shadow-warm-sm space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sand-100 text-date-900 text-xs font-bold">
                <Award className="w-3.5 h-3.5 text-gold-500" />
                <span>ORCHARD & HARVEST RECORD</span>
              </div>

              <h3 className="font-serif-luxury text-2xl font-bold text-date-900">
                The Heritage of {product.name}
              </h3>

              <p className="text-sm text-date-800/90 leading-relaxed">
                {product.description}
              </p>

              <div className="pt-4 border-t border-sand-200">
                <h4 className="text-xs font-bold uppercase tracking-wider text-date-900 mb-2">
                  Recommended Culinary Pairings:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {product.pairingSuggestions.map((item, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-sand-100 text-date-800 text-xs font-medium rounded-full border border-sand-200 flex items-center gap-1.5"
                    >
                      <Coffee className="w-3 h-3 text-caramel-500" />
                      <span>{item}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Sensory Indicator Matrix */}
            <div className="lg:col-span-5 bg-sand-100/60 p-8 rounded-3xl border border-sand-200 space-y-4">
              <h3 className="font-serif-luxury text-xl font-bold text-date-900">
                Sensory Profile
              </h3>

              <div className="space-y-3 text-xs">
                <div className="p-3 bg-cream rounded-xl border border-sand-200 flex justify-between items-center">
                  <div className="flex items-center gap-2 text-date-700">
                    <Droplets className="w-4 h-4 text-caramel-500" />
                    <span className="font-semibold">Texture Profile</span>
                  </div>
                  <span className="font-bold text-date-900">{product.texture}</span>
                </div>

                <div className="p-3 bg-cream rounded-xl border border-sand-200 flex justify-between items-center">
                  <div className="flex items-center gap-2 text-date-700">
                    <Flame className="w-4 h-4 text-gold-500" />
                    <span className="font-semibold">Natural Sweetness</span>
                  </div>
                  <span className="font-bold text-date-900">{product.sweetness}</span>
                </div>

                <div className="p-3 bg-cream rounded-xl border border-sand-200 flex justify-between items-center">
                  <div className="flex items-center gap-2 text-date-700">
                    <Leaf className="w-4 h-4 text-palm-600" />
                    <span className="font-semibold">Fruit Caliber</span>
                  </div>
                  <span className="font-bold text-date-900">{product.size} Grade</span>
                </div>
              </div>

              {/* Nutrition Table */}
              <div className="mt-4 pt-4 border-t border-sand-200">
                <h4 className="text-xs font-bold uppercase tracking-wider text-date-900 mb-2">
                  Verified Nutrition per 100g:
                </h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-cream p-2 rounded-lg border border-sand-200 text-center">
                    <span className="text-date-600 block text-[10px]">Energy</span>
                    <strong className="text-date-900">{product.nutritionalNotes.caloriesPer100g} kcal</strong>
                  </div>
                  <div className="bg-cream p-2 rounded-lg border border-sand-200 text-center">
                    <span className="text-date-600 block text-[10px]">Potassium</span>
                    <strong className="text-date-900">{product.nutritionalNotes.potassiumMg} mg</strong>
                  </div>
                  <div className="bg-cream p-2 rounded-lg border border-sand-200 text-center">
                    <span className="text-date-600 block text-[10px]">Dietary Fiber</span>
                    <strong className="text-date-900">{product.nutritionalNotes.fiberG} g</strong>
                  </div>
                  <div className="bg-cream p-2 rounded-lg border border-sand-200 text-center">
                    <span className="text-date-600 block text-[10px]">Natural Sugars</span>
                    <strong className="text-date-900">{product.nutritionalNotes.naturalSugarsG} g</strong>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Related Varieties */}
          <div className="pt-8">
            <h3 className="font-serif-luxury text-2xl font-bold text-date-900 mb-6">
              You May Also Appreciate
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedProducts.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => onSelectProduct(rel.slug)}
                  className="bg-cream p-4 rounded-2xl border border-sand-200 shadow-warm-sm hover:shadow-warm-md transition-all cursor-pointer flex items-center gap-4 group"
                >
                  <img
                    src={rel.cutoutImage}
                    alt={rel.name}
                    className="w-16 h-16 object-contain rounded-xl bg-sand-100 p-1 border border-sand-200 group-hover:scale-105 transition-transform"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-date-900 group-hover:text-caramel-600 transition-colors line-clamp-1">
                      {rel.name}
                    </h4>
                    <span className="text-xs text-date-600 block mt-0.5">
                      From {formatINR(rel.variants[0].priceMinor)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
