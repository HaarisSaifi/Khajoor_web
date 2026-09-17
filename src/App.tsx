import React, { useState } from 'react';
import { useStore } from './context/StoreContext';
import { AnnouncementBar } from './components/layout/AnnouncementBar';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { SearchModal } from './components/layout/SearchModal';
import { QuickViewModal } from './components/modals/QuickViewModal';
import { CartDrawer } from './components/cart/CartDrawer';
import { CheckoutModal } from './components/checkout/CheckoutModal';

// Pages
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { DateGuidePage } from './pages/DateGuidePage';
import { GiftBoxesPage } from './pages/GiftBoxesPage';
import { OurStoryPage } from './pages/OurStoryPage';
import { TrackOrderPage } from './pages/TrackOrderPage';
import { OrderConfirmationPage } from './pages/OrderConfirmationPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { motion, AnimatePresence } from 'framer-motion';

export const App: React.FC = () => {
  const [currentRoute, setCurrentRoute] = useState<string>('home');
  const [selectedProductSlug, setSelectedProductSlug] = useState<string>('ajwa-al-madinah');
  const { toastMessage } = useStore();

  const handleNavigate = (route: string) => {
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProduct = (slug: string) => {
    setSelectedProductSlug(slug);
    setCurrentRoute('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOrderSuccess = (orderToken: string) => {
    setCurrentRoute('order-confirmation');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-sand-50 text-date-900 font-sans selection:bg-gold-400/30 selection:text-date-900">
      {/* 1. Announcement Bar */}
      <AnnouncementBar />

      {/* 2. Glassmorphic Header */}
      <Header
        currentRoute={currentRoute}
        onNavigate={handleNavigate}
      />

      {/* 3. Main Route Content */}
      <div className="flex-1">
        {currentRoute === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onSelectProduct={handleSelectProduct}
          />
        )}

        {currentRoute === 'shop' && (
          <ShopPage
            onSelectProduct={handleSelectProduct}
          />
        )}

        {currentRoute === 'product-detail' && (
          <ProductDetailPage
            slug={selectedProductSlug}
            onNavigateBack={() => handleNavigate('shop')}
            onSelectProduct={handleSelectProduct}
          />
        )}

        {currentRoute === 'date-guide' && (
          <DateGuidePage
            onSelectProduct={handleSelectProduct}
          />
        )}

        {currentRoute === 'gift-boxes' && (
          <GiftBoxesPage />
        )}

        {currentRoute === 'our-story' && (
          <OurStoryPage />
        )}

        {currentRoute === 'track-order' && (
          <TrackOrderPage />
        )}

        {currentRoute === 'order-confirmation' && (
          <OrderConfirmationPage
            onNavigateHome={() => handleNavigate('home')}
            onNavigateTrack={() => handleNavigate('track-order')}
          />
        )}

        {currentRoute === 'admin' && (
          <AdminDashboard />
        )}
      </div>

      {/* 4. Luxury Footer */}
      <Footer
        onNavigate={handleNavigate}
        onSelectProduct={handleSelectProduct}
      />

      {/* 5. Modals & Drawers */}
      <QuickViewModal onSelectProduct={handleSelectProduct} />
      <CartDrawer onNavigateShop={() => handleNavigate('shop')} />
      <CheckoutModal onOrderSuccess={handleOrderSuccess} />
      <SearchModal onSelectProduct={handleSelectProduct} />

      {/* 6. Reactive Floating Toast Feedback */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-6 right-6 z-50 bg-date-900 text-sand-50 px-5 py-3 rounded-2xl shadow-2xl border border-gold-400/40 text-xs sm:text-sm font-semibold flex items-center gap-3 backdrop-blur-md"
          >
            <span className="w-2 h-2 rounded-full bg-gold-400 animate-ping" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
