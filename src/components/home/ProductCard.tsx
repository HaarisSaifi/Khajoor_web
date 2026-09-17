import React, { useState } from 'react';
import { Product, ProductVariant } from '../../types';
import { useStore } from '../../context/StoreContext';
import { Heart, Eye, ShoppingBag, Star, Check } from 'lucide-react';
import { formatINR } from '../../utils/currency';

interface ProductCardProps {
  product: Product;
  onSelectProduct: (slug: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onSelectProduct }) => {
  const { addToCart, setQuickViewProduct, toggleWishlist, isInWishlist } = useStore();
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    product.variants.find((v) => v.isPopular) || product.variants[0]
  );
  const [addedAnimation, setAddedAnimation] = useState(false);

  const isWishlisted = isInWishlist(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, selectedVariant, 1);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1400);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    setQuickViewProduct(product);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div
      onClick={() => onSelectProduct(product.slug)}
      className="group bg-cream rounded-3xl p-4 sm:p-5 border border-sand-200/90 shadow-warm-sm hover:shadow-warm-lg transition-all duration-300 flex flex-col justify-between cursor-pointer relative"
    >
      {/* Top Media Panel */}
      <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-gradient-to-b from-sand-100 to-sand-200/60 p-4 flex items-center justify-center">
        
        {/* Badge */}
        {product.badge && (
          <div className="absolute top-3 left-3 z-10">
            <span className="px-3 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase shadow-sm bg-date-900 text-gold-300 border border-gold-400/30">
              {product.badge}
            </span>
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          className={`absolute top-3 right-3 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all ${
            isWishlisted
              ? 'bg-caramel-500 text-cream shadow-md scale-110'
              : 'bg-cream/90 text-date-800 hover:text-caramel-600 hover:bg-cream shadow-sm'
          }`}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-cream' : ''}`} />
        </button>

        {/* Product Image with Hover Lift & Scale */}
        <div className="relative w-full h-full flex items-center justify-center">
          <img
            src={product.cutoutImage}
            alt={product.name}
            className="w-4/5 h-4/5 object-contain transition-transform duration-500 ease-out group-hover:scale-108 group-hover:-translate-y-2 drop-shadow-lg"
            loading="lazy"
            decoding="async"
            onError={(e) => {
              const target = e.currentTarget;
              if (target.src.endsWith('.webp')) {
                target.src = target.src.replace('.webp', '.png');
              }
            }}
          />
        </div>

        {/* Floating Quick View Overlay on Hover */}
        <button
          onClick={handleQuickView}
          className="absolute bottom-3 inset-x-4 py-2 px-3 rounded-full bg-cream/95 hover:bg-cream text-date-900 text-xs font-bold shadow-warm-md opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 border border-sand-200"
        >
          <Eye className="w-3.5 h-3.5 text-date-700" />
          <span>Quick View</span>
        </button>
      </div>

      {/* Content & Metadata */}
      <div className="mt-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Origin & Rating */}
          <div className="flex items-center justify-between text-xs text-date-600 mb-1">
            <span className="truncate max-w-[170px] font-medium">{product.origin}</span>
            <div className="flex items-center gap-1 text-gold-600 font-bold">
              <Star className="w-3 h-3 fill-gold-500 text-gold-500" />
              <span>{product.rating}</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="font-serif-luxury font-bold text-base sm:text-lg text-date-900 group-hover:text-caramel-600 transition-colors line-clamp-1">
            {product.name}
          </h3>

          {/* Short sensory note */}
          <p className="text-xs text-date-700/80 line-clamp-1 mt-1">
            {product.shortDescription}
          </p>

          {/* Pack Size Pills */}
          <div className="mt-3 flex items-center gap-1.5 overflow-x-auto py-1 no-scrollbar">
            {product.variants.map((variant) => {
              const isSelected = selectedVariant.id === variant.id;
              return (
                <button
                  key={variant.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedVariant(variant);
                  }}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold whitespace-nowrap transition-all ${
                    isSelected
                      ? 'bg-date-900 text-sand-50 shadow-sm'
                      : 'bg-sand-100 text-date-800 hover:bg-sand-200'
                  }`}
                >
                  {variant.weightGrams >= 1000 ? `${variant.weightGrams / 1000}kg` : `${variant.weightGrams}g`}
                </button>
              );
            })}
          </div>
        </div>

        {/* Pricing & Add to Cart Footer */}
        <div className="mt-4 pt-3 border-t border-sand-200 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base sm:text-lg font-bold text-date-900">
                {formatINR(selectedVariant.priceMinor)}
              </span>
              {selectedVariant.compareAtPriceMinor && (
                <span className="text-xs text-date-400 line-through">
                  {formatINR(selectedVariant.compareAtPriceMinor)}
                </span>
              )}
            </div>
            <span className="text-[10px] text-palm-700 font-semibold block">
              In Stock • Nitrogen Sealed
            </span>
          </div>

          <button
            onClick={handleQuickAdd}
            aria-label={`Add ${selectedVariant.label} of ${product.name} to cart`}
            className={`px-3.5 py-2.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm active:scale-95 ${
              addedAnimation
                ? 'bg-palm-600 text-cream'
                : 'bg-caramel-500 hover:bg-caramel-600 text-cream hover:shadow-warm-md'
            }`}
          >
            {addedAnimation ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
