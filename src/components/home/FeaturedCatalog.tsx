import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { ProductCard } from './ProductCard';
import { Sparkles, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FeaturedCatalogProps {
  onNavigateShop: () => void;
  onSelectProduct: (slug: string) => void;
}

type FilterCategory = 'all' | 'premium' | 'soft' | 'semi-dry' | 'gifts' | 'everyday';

export const FeaturedCatalog: React.FC<FeaturedCatalogProps> = ({
  onNavigateShop,
  onSelectProduct,
}) => {
  const { products } = useStore();
  const [activeCategory, setActiveCategory] = useState<FilterCategory>('all');

  const filterPills: { id: FilterCategory; label: string; count: number }[] = [
    { id: 'all', label: 'All Varieties', count: products.length },
    { id: 'premium', label: 'Royal Premium', count: products.filter((p) => p.category === 'premium').length },
    { id: 'soft', label: 'Soft & Juicy', count: products.filter((p) => p.category === 'soft').length },
    { id: 'semi-dry', label: 'Semi-Dry & Chewy', count: products.filter((p) => p.category === 'semi-dry').length },
    { id: 'gifts', label: 'Luxury Gift Boxes', count: products.filter((p) => p.category === 'gifts').length },
    { id: 'everyday', label: 'Everyday Essentials', count: products.filter((p) => p.category === 'everyday').length },
  ];

  const filteredProducts =
    activeCategory === 'all'
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <section className="py-16 lg:py-20 bg-sand-50" id="collection">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sand-200 text-date-900 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-gold-500" />
              <span>THE 2026 HARVEST PORTFOLIO</span>
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-date-900 tracking-tight">
              Explore the Collection
            </h2>
            <p className="text-date-700/80 text-sm sm:text-base mt-2 max-w-xl">
              From the sacred soft Ajwa of Medina to jumbo amber Medjool, discover nuanced sweetness levels and exquisite handpicked textures.
            </p>
          </div>

          <button
            onClick={onNavigateShop}
            className="inline-flex items-center gap-2 text-sm font-bold text-caramel-600 hover:text-caramel-700 hover:translate-x-1 transition-all group self-start md:self-auto"
          >
            <span>View All Products ({products.length})</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 no-scrollbar mb-8">
          {filterPills.map((pill) => {
            const isActive = activeCategory === pill.id;
            return (
              <button
                key={pill.id}
                onClick={() => setActiveCategory(pill.id)}
                className={`px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap flex items-center gap-2 ${
                  isActive
                    ? 'bg-date-900 text-sand-50 shadow-warm-md scale-105 border border-gold-400/30'
                    : 'bg-cream text-date-800 hover:bg-sand-100 border border-sand-200'
                }`}
              >
                <span>{pill.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                    isActive ? 'bg-gold-400/30 text-gold-300' : 'bg-sand-200 text-date-600'
                  }`}
                >
                  {pill.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Product Cards Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence>
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <ProductCard
                  product={product}
                  onSelectProduct={onSelectProduct}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
};
