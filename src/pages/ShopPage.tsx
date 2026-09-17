import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/home/ProductCard';
import { Sparkles, SlidersHorizontal, RotateCcw, Search } from 'lucide-react';

interface ShopPageProps {
  onSelectProduct: (slug: string) => void;
}

export const ShopPage: React.FC<ShopPageProps> = ({ onSelectProduct }) => {
  const { products } = useStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTexture, setSelectedTexture] = useState<string>('all');
  const [selectedSweetness, setSelectedSweetness] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches =
          p.name.toLowerCase().includes(q) ||
          p.variety.toLowerCase().includes(q) ||
          p.origin.toLowerCase().includes(q);
        if (!matches) return false;
      }

      // Category
      if (selectedCategory !== 'all' && p.category !== selectedCategory) {
        return false;
      }

      // Texture
      if (selectedTexture !== 'all' && p.texture !== selectedTexture) {
        return false;
      }

      // Sweetness
      if (selectedSweetness !== 'all' && p.sweetness !== selectedSweetness) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') {
        return a.variants[0].priceMinor - b.variants[0].priceMinor;
      }
      if (sortBy === 'price-desc') {
        return b.variants[0].priceMinor - a.variants[0].priceMinor;
      }
      if (sortBy === 'rating') {
        return b.rating - a.rating;
      }
      return b.featured ? 1 : -1;
    });
  }, [products, searchQuery, selectedCategory, selectedTexture, selectedSweetness, sortBy]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedTexture('all');
    setSelectedSweetness('all');
    setSelectedCategory('all');
    setSortBy('featured');
  };

  return (
    <div className="py-10 bg-sand-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sand-200 text-date-900 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-gold-500" />
            <span>COLLECTION OF SACRED & ROYAL HARVESTS</span>
          </div>
          <h1 className="font-serif-luxury text-4xl sm:text-5xl font-bold text-date-900 tracking-tight">
            The Date Boutique
          </h1>
          <p className="text-date-700/80 text-sm sm:text-base mt-2">
            Explore authentic Saudi Arabian and Jordan Valley khajoor varieties, packaged in nitrogen-sealed boxes for ultimate orchard sweetness.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-cream p-5 rounded-3xl border border-sand-200 shadow-warm-sm mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
            {/* Search */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-date-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by variety or origin..."
                className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-full bg-sand-50 border border-sand-300 text-date-900 focus:outline-none focus:ring-1 focus:ring-gold-400"
              />
            </div>

            {/* Sort & Reset */}
            <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
              <div className="flex items-center gap-2 text-xs font-semibold text-date-800">
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-sand-50 border border-sand-300 rounded-full px-3 py-1.5 text-xs text-date-900 font-semibold focus:outline-none focus:ring-1 focus:ring-gold-400"
                >
                  <option value="featured">Featured Picks</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>

              {(selectedCategory !== 'all' || selectedTexture !== 'all' || selectedSweetness !== 'all' || searchQuery) && (
                <button
                  onClick={resetFilters}
                  className="text-xs text-caramel-600 hover:text-caramel-700 font-bold flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              )}
            </div>
          </div>

          {/* Quick Category Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-sand-200 no-scrollbar" style={{ WebkitOverflowScrolling: 'touch' }}>
            {[
              { id: 'all', label: 'All' },
              { id: 'premium', label: 'Royal Premium' },
              { id: 'soft', label: 'Soft & Juicy' },
              { id: 'semi-dry', label: 'Semi-Dry' },
              { id: 'gifts', label: 'Gift Boxes' },
              { id: 'everyday', label: 'Everyday' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-date-900 text-sand-50'
                    : 'bg-sand-100 text-date-800 hover:bg-sand-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results Info */}
        <div className="flex items-center justify-between text-xs text-date-600 mb-6 px-1">
          <span>Showing <strong>{filteredProducts.length}</strong> date varieties</span>
          <span>100% Tree-Ripened • FSSAI Certified</span>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelectProduct={onSelectProduct}
              />
            ))}
          </div>
        ) : (
          <div className="bg-cream rounded-3xl p-12 text-center border border-sand-200 max-w-md mx-auto my-12">
            <h3 className="font-serif-luxury text-xl font-bold text-date-900">
              No matching varieties found
            </h3>
            <p className="text-xs text-date-600 mt-2">
              Try adjusting your search query or reset your filters.
            </p>
            <button
              onClick={resetFilters}
              className="mt-4 bg-caramel-500 hover:bg-caramel-600 text-cream px-5 py-2 rounded-full text-xs font-bold transition-all shadow-sm"
            >
              Reset All Filters
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
