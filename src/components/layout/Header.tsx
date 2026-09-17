import React, { useState, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import { Search, ShoppingBag, Heart, Menu, X, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface HeaderProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentRoute, onNavigate }) => {
  const { cartCount, wishlist, setIsCartOpen, setIsSearchOpen } = useStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', route: 'home' },
    { label: 'Shop Varieties', route: 'shop' },
    { label: 'Date Guide', route: 'date-guide' },
    { label: 'Gift Boxes', route: 'gift-boxes' },
    { label: 'Our Story', route: 'our-story' },
    { label: 'Track Order', route: 'track-order' },
    { label: 'Admin', route: 'admin' },
  ];

  const handleLinkClick = (route: string) => {
    onNavigate(route);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'glass-nav py-3.5 shadow-warm-sm'
            : 'bg-sand-50/90 py-5 border-b border-sand-200/50'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 text-date-900 hover:text-caramel-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400"
              aria-label="Open Navigation Menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

          {/* Logo / Brand Mark */}
          <button
            onClick={() => handleLinkClick('home')}
            className="flex items-center gap-3 text-left group focus:outline-none"
          >
            <div className="w-10 h-10 rounded-full bg-date-900 border border-gold-400/40 flex items-center justify-center shadow-warm-sm group-hover:border-gold-400 transition-colors">
              <svg className="w-6 h-6 text-gold-400" viewBox="0 0 100 100" fill="none">
                <path d="M50 85V45" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                <path d="M50 48C42 40 30 38 22 45" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                <path d="M50 48C58 40 70 38 78 45" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                <path d="M50 42C44 32 35 28 26 31" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                <path d="M50 42C56 32 65 28 74 31" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                <ellipse cx="44" cy="52" rx="4" ry="6" fill="#B86B2B" />
                <ellipse cx="56" cy="52" rx="4" ry="6" fill="#B86B2B" />
                <ellipse cx="50" cy="57" rx="4" ry="6" fill="#D5A24B" />
              </svg>
            </div>
            <div>
              <span className="font-serif-luxury text-xl sm:text-2xl font-bold tracking-wider text-date-900 uppercase block leading-none">
                NAKHLA
              </span>
              <span className="text-[10px] tracking-[0.28em] text-caramel-600 font-semibold uppercase block mt-1">
                DATES • EST. 2026
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = currentRoute === link.route;
              return (
                <button
                  key={link.route}
                  onClick={() => handleLinkClick(link.route)}
                  className={`px-3.5 py-2 text-sm font-medium rounded-full transition-all duration-200 relative ${
                    isActive
                      ? 'text-date-900 font-semibold bg-sand-200/70 shadow-sm'
                      : 'text-date-800/80 hover:text-date-900 hover:bg-sand-100'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="navIndicator"
                      className="absolute bottom-1 left-3.5 right-3.5 h-0.5 bg-gold-500 rounded-full"
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action Icons: Search, Wishlist, Cart */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search Products"
              className="p-2.5 text-date-900 hover:text-caramel-600 hover:bg-sand-100 rounded-full transition-colors relative"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Trigger */}
            <button
              onClick={() => handleLinkClick('shop')}
              aria-label="View Wishlist"
              className="p-2.5 text-date-900 hover:text-caramel-600 hover:bg-sand-100 rounded-full transition-colors relative"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute 1 top-1 right-1 w-4 h-4 bg-caramel-500 text-cream text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Drawer Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="Shopping Cart"
              className="flex items-center gap-2.5 bg-date-900 hover:bg-date-800 text-sand-50 pl-3.5 pr-4 py-2 rounded-full transition-all shadow-warm-sm hover:shadow-warm-md group"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4 text-gold-400 group-hover:scale-110 transition-transform" />
                {cartCount > 0 && (
                  <motion.span
                    key={cartCount}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="absolute -top-2 -right-2.5 bg-caramel-500 text-cream text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-date-900"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </div>
              <span className="text-xs font-semibold tracking-wide hidden sm:inline-block">
                Cart
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-date-900/60 backdrop-blur-sm z-50 lg:hidden"
            />

            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-4/5 max-w-sm bg-sand-50 z-50 shadow-2xl flex flex-col justify-between p-6 lg:hidden border-r border-sand-200"
            >
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-sand-200">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-date-900 flex items-center justify-center">
                      <span className="text-gold-400 font-serif-luxury font-bold text-sm">N</span>
                    </div>
                    <span className="font-serif-luxury font-bold text-lg text-date-900 uppercase">
                      NAKHLA DATES
                    </span>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1.5 text-date-800 hover:text-date-900 rounded-full hover:bg-sand-100"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <nav className="mt-6 flex flex-col gap-2">
                  {navLinks.map((link) => {
                    const isActive = currentRoute === link.route;
                    return (
                      <button
                        key={link.route}
                        onClick={() => handleLinkClick(link.route)}
                        className={`w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                          isActive
                            ? 'bg-sand-200/80 text-date-900 font-semibold'
                            : 'text-date-800 hover:bg-sand-100'
                        }`}
                      >
                        {link.label}
                      </button>
                    );
                  })}
                </nav>
              </div>

              <div className="pt-6 border-t border-sand-200 text-xs text-date-700/80 space-y-3">
                <div className="flex items-center gap-2 text-date-900 font-semibold">
                  <ShieldCheck className="w-4 h-4 text-palm-600" />
                  <span>100% Authentic Medina & Middle Eastern Crop</span>
                </div>
                <p>Pan-India Express Cold-Chain Delivery within 2-4 days.</p>
                <div className="pt-2 flex justify-between items-center text-xs text-date-600">
                  <span>Customer Support: 1800-NAKHLA</span>
                  <span>v1.0 Ready</span>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
