import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { X, Trash2, ShoppingBag, Sparkles, ArrowRight, Truck, Tag, Undo2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatINR } from '../../utils/currency';

interface CartDrawerProps {
  onNavigateShop: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onNavigateShop }) => {
  const {
    cart,
    cartCount,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    lastRemovedItem,
    undoRemoveFromCart,
    subtotalMinor,
    discountMinor,
    shippingFeeMinor,
    totalMinor,
    freeShippingProgress,
    amountLeftForFreeShippingMinor,
    appliedCoupon,
    couponError,
    applyCoupon,
    removeCoupon,
    setIsCheckoutOpen,
  } = useStore();

  const [couponInput, setCouponInput] = useState('');

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput) return;
    if (applyCoupon(couponInput)) {
      setCouponInput('');
    }
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-date-900/60 backdrop-blur-sm"
          />

          {/* Drawer Container */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 260 }}
              className="w-screen max-w-md bg-cream shadow-2xl flex flex-col justify-between border-l border-sand-200"
            >
              {/* Drawer Header */}
              <div className="p-5 border-b border-sand-200 flex items-center justify-between bg-sand-50">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-date-900 text-gold-400 flex items-center justify-center">
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-serif-luxury text-lg font-bold text-date-900">
                      Your Shopping Cart
                    </h3>
                    <span className="text-xs text-date-600">
                      {cartCount} {cartCount === 1 ? 'variety' : 'varieties'} selected
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-1.5 text-date-800 hover:text-date-900 rounded-full hover:bg-sand-200 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Free Shipping Progress Bar */}
              <div className="px-5 py-3 bg-sand-100/80 border-b border-sand-200">
                <div className="flex items-center justify-between text-xs font-semibold text-date-900 mb-1.5">
                  <div className="flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-caramel-600" />
                    <span>
                      {amountLeftForFreeShippingMinor === 0 ? (
                        <strong className="text-palm-700">🎉 FREE Express Shipping Unlocked!</strong>
                      ) : (
                        <>
                          Add <strong className="text-caramel-600">{formatINR(amountLeftForFreeShippingMinor)}</strong> more for FREE shipping
                        </>
                      )}
                    </span>
                  </div>
                  <span className="text-[11px] text-date-600 font-mono">
                    {freeShippingProgress}%
                  </span>
                </div>
                <div className="w-full h-2 bg-sand-200 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-caramel-500 to-gold-400 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${freeShippingProgress}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>

              {/* Drawer Content: Cart Items */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4 divide-y divide-sand-200">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-16 space-y-4">
                    <div className="w-16 h-16 rounded-full bg-sand-100 flex items-center justify-center text-caramel-600 border border-sand-200">
                      <ShoppingBag className="w-8 h-8 opacity-60" />
                    </div>
                    <div>
                      <h4 className="font-serif-luxury text-xl font-bold text-date-900">
                        Your cart is empty
                      </h4>
                      <p className="text-xs sm:text-sm text-date-700/80 mt-1 max-w-xs">
                        Discover the rare Ajwa of Madinah, Royal Medjool, and our artisanal gift boxes.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setIsCartOpen(false);
                        onNavigateShop();
                      }}
                      className="bg-caramel-500 hover:bg-caramel-600 text-cream px-6 py-2.5 rounded-full font-bold text-xs transition-all shadow-sm"
                    >
                      Explore Varieties
                    </button>
                  </div>
                ) : (
                  <>
                    {cart.map((item) => (
                      <div key={item.id} className="pt-4 first:pt-0 flex gap-3.5 items-start">
                        {/* Thumbnail */}
                        <img
                          src={item.image}
                          alt={item.productName}
                          className="w-16 h-16 rounded-xl object-contain bg-sand-100 p-1 border border-sand-200 flex-shrink-0"
                        />

                        {/* Details */}
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-bold text-date-900 truncate">
                            {item.productName}
                          </h4>
                          <span className="text-xs text-date-600 block">
                            Pack: {item.variantLabel}
                          </span>
                          <span className="text-sm font-bold text-date-900 block mt-1">
                            {formatINR(item.priceMinor * item.quantity)}
                          </span>

                          {/* Stepper */}
                          <div className="flex items-center gap-3 mt-2">
                            <div className="flex items-center rounded-lg border border-sand-300 bg-sand-50">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="w-6 h-6 flex items-center justify-center text-date-800 hover:bg-sand-200 text-xs font-bold"
                              >
                                -
                              </button>
                              <span className="w-6 text-center text-xs font-bold text-date-900">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="w-6 h-6 flex items-center justify-center text-date-800 hover:bg-sand-200 text-xs font-bold"
                              >
                                +
                              </button>
                            </div>

                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-date-500 hover:text-red-700 text-xs flex items-center gap-1 transition-colors"
                            >
                              <Trash2 className="w-3 h-3" />
                              <span>Remove</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Undo Notification if item recently removed */}
                    {lastRemovedItem && (
                      <div className="p-2.5 bg-sand-200/80 rounded-xl flex items-center justify-between text-xs text-date-900">
                        <span>Removed "{lastRemovedItem.productName}"</span>
                        <button
                          onClick={undoRemoveFromCart}
                          className="font-bold text-caramel-600 hover:text-caramel-700 flex items-center gap-1 underline"
                        >
                          <Undo2 className="w-3.5 h-3.5" />
                          <span>Undo</span>
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Sticky Drawer Footer */}
              {cart.length > 0 && (
                <div className="p-5 border-t border-sand-200 bg-sand-50 space-y-3">
                  {/* Coupon Code Input */}
                  <div>
                    {appliedCoupon ? (
                      <div className="p-2.5 rounded-xl bg-palm-100/70 border border-palm-300 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1.5 text-palm-800 font-semibold">
                          <Tag className="w-3.5 h-3.5 text-palm-600" />
                          <span>Coupon {appliedCoupon.code} Applied</span>
                        </div>
                        <button
                          onClick={removeCoupon}
                          className="text-xs text-red-700 hover:underline font-bold"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleApplyCoupon} className="flex gap-2">
                        <input
                          type="text"
                          value={couponInput}
                          onChange={(e) => setCouponInput(e.target.value)}
                          placeholder="Promo code (e.g. NAKHLA10)"
                          className="flex-1 px-3 py-2 text-xs rounded-xl bg-cream border border-sand-300 text-date-900 placeholder:text-date-500 focus:outline-none focus:ring-1 focus:ring-gold-400 uppercase font-mono"
                        />
                        <button
                          type="submit"
                          className="px-4 py-2 bg-sand-200 hover:bg-sand-300 text-date-900 rounded-xl text-xs font-bold transition-colors"
                        >
                          Apply
                        </button>
                      </form>
                    )}
                    {couponError && (
                      <p className="text-[11px] text-red-600 mt-1 font-medium">{couponError}</p>
                    )}
                  </div>

                  {/* Pricing Breakdown */}
                  <div className="space-y-1.5 text-xs text-date-700 pt-1">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-semibold text-date-900">{formatINR(subtotalMinor)}</span>
                    </div>

                    {discountMinor > 0 && (
                      <div className="flex justify-between text-palm-700 font-semibold">
                        <span>Promo Discount</span>
                        <span>-{formatINR(discountMinor)}</span>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <span>Express Shipping</span>
                      <span>
                        {shippingFeeMinor === 0 ? (
                          <strong className="text-palm-700">FREE</strong>
                        ) : (
                          formatINR(shippingFeeMinor)
                        )}
                      </span>
                    </div>

                    <div className="flex justify-between text-sm font-bold text-date-900 pt-2 border-t border-sand-200">
                      <span>Estimated Total</span>
                      <span className="font-serif-luxury text-base text-caramel-600">
                        {formatINR(totalMinor)}
                      </span>
                    </div>
                  </div>

                  {/* Checkout CTA */}
                  <button
                    onClick={handleCheckout}
                    className="w-full bg-caramel-500 hover:bg-caramel-600 text-cream py-3.5 rounded-full font-bold text-sm transition-all shadow-warm-md hover:shadow-warm-lg flex items-center justify-center gap-2 group"
                  >
                    <span>Proceed to One-Page Checkout</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <p className="text-[10px] text-center text-date-500">
                    Taxes included • 100% Guaranteed Fresh Delivery
                  </p>
                </div>
              )}
            </motion.aside>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
