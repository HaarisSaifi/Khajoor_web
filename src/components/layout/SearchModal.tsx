import React, { useState, useEffect, useRef } from 'react';
import { useStore } from '../../context/StoreContext';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatINR } from '../../utils/currency';

interface SearchModalProps {
  onSelectProduct: (slug: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ onSelectProduct }) => {
  const { isSearchOpen, setIsSearchOpen, products, setQuickViewProduct } = useStore();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsSearchOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setIsSearchOpen]);

  const filteredProducts = query.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.variety.toLowerCase().includes(query.toLowerCase()) ||
          p.origin.toLowerCase().includes(query.toLowerCase()) ||
          p.texture.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const handleProductClick = (slug: string) => {
    setIsSearchOpen(false);
    onSelectProduct(slug);
  };

  const handleQuickView = (p: typeof products[0], e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSearchOpen(false);
    setQuickViewProduct(p);
  };

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSearchOpen(false)}
            className="fixed inset-0 bg-date-900/60 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="w-full max-w-2xl bg-cream rounded-3xl shadow-2xl border border-sand-200 overflow-hidden relative z-10"
          >
            {/* Search Input Bar */}
            <div className="p-4 sm:p-5 border-b border-sand-200 flex items-center gap-3">
              <Search className="w-5 h-5 text-gold-500 flex-shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search Ajwa, Medjool, gift boxes, soft texture..."
                className="w-full bg-transparent text-date-900 placeholder:text-date-700/50 text-base sm:text-lg font-medium focus:outline-none"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="p-1 text-date-600 hover:text-date-900 rounded-full hover:bg-sand-100"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={() => setIsSearchOpen(false)}
                className="text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-sand-100 text-date-800 hover:bg-sand-200"
              >
                ESC
              </button>
            </div>

            {/* Results or Suggestions */}
            <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-6">
              {query.trim() === '' ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-date-700/70">
                    <Sparkles className="w-3.5 h-3.5 text-gold-500" />
                    <span>Popular Searches</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {['Ajwa Al-Madinah', 'Royal Medjool', 'Golden Sukkari', 'Luxury Gift Box', 'Soft & Moist'].map((tag) => (
                      <button
                        key={tag}
                        onClick={() => setQuery(tag)}
                        className="px-3 py-1.5 text-xs font-medium bg-sand-100 text-date-800 hover:bg-sand-200 rounded-full transition-colors"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              ) : filteredProducts.length > 0 ? (
                <div className="space-y-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-date-600">
                    Products ({filteredProducts.length})
                  </span>
                  <div className="divide-y divide-sand-200">
                    {filteredProducts.map((product) => (
                      <div
                        key={product.id}
                        onClick={() => handleProductClick(product.slug)}
                        className="py-3 flex items-center justify-between gap-4 hover:bg-sand-100/70 p-3 rounded-2xl cursor-pointer transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={product.cutoutImage}
                            alt={product.name}
                            className="w-12 h-12 rounded-xl object-cover border border-sand-200"
                          />
                          <div>
                            <h4 className="text-sm font-bold text-date-900 group-hover:text-caramel-600 transition-colors">
                              {product.name}
                            </h4>
                            <p className="text-xs text-date-700/70">
                              {product.variety} • {product.origin}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-bold text-date-900">
                            From {formatINR(product.variants[0].priceMinor)}
                          </span>
                          <button
                            onClick={(e) => handleQuickView(product, e)}
                            className="hidden sm:inline-block px-3 py-1 text-xs font-semibold rounded-full bg-sand-200/80 hover:bg-sand-300 text-date-900"
                          >
                            Quick View
                          </button>
                          <ArrowRight className="w-4 h-4 text-date-400 group-hover:text-caramel-600 group-hover:translate-x-1 transition-all" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-sm text-date-800 font-medium">
                    No date varieties found for "{query}".
                  </p>
                  <p className="text-xs text-date-600 mt-1">
                    Try searching for "Ajwa", "Medjool", "Gift", or "Sukkari".
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
