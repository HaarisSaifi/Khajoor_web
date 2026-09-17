import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { CustomerDetails, PaymentMethod } from '../../types';
import { X, ShieldCheck, CreditCard, QrCode, Banknote, Truck, Check, Lock, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatINR } from '../../utils/currency';
import confetti from 'canvas-confetti';

interface CheckoutModalProps {
  onOrderSuccess: (orderToken: string) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ onOrderSuccess }) => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    subtotalMinor,
    discountMinor,
    shippingFeeMinor,
    totalMinor,
    appliedCoupon,
    placeOrder,
  } = useStore();

  const [fullName, setFullName] = useState('Aarav Sharma');
  const [email, setEmail] = useState('aarav.sharma@example.com');
  const [phone, setPhone] = useState('+91 98200 12345');
  const [addressLine1, setAddressLine1] = useState('Flat 502, Palm Heights, Powai');
  const [landmark, setLandmark] = useState('Near Hiranandani Gardens');
  const [city, setCity] = useState('Mumbai');
  const [state, setState] = useState('Maharashtra');
  const [pincode, setPincode] = useState('400076');
  const [deliveryMethod, setDeliveryMethod] = useState<'standard' | 'express'>('standard');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('upi');
  const [upiId, setUpiId] = useState('aarav@okhdfcbank');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isCheckoutOpen) return null;

  // Auto-fill city & state based on common Indian pincodes
  const handlePincodeChange = (val: string) => {
    setPincode(val);
    const prefix = val.substring(0, 2);
    if (prefix === '40') {
      setCity('Mumbai');
      setState('Maharashtra');
    } else if (prefix === '11') {
      setCity('New Delhi');
      setState('Delhi');
    } else if (prefix === '56') {
      setCity('Bangalore');
      setState('Karnataka');
    } else if (prefix === '50') {
      setCity('Hyderabad');
      setState('Telangana');
    } else if (prefix === '60') {
      setCity('Chennai');
      setState('Tamil Nadu');
    }
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !addressLine1 || !pincode) {
      alert('Please fill in all required shipping address fields.');
      return;
    }

    setIsProcessing(true);

    // Simulate secure payment gateway handshake (700ms)
    setTimeout(async () => {
      const customer: CustomerDetails = {
        fullName,
        email,
        phone,
        addressLine1,
        landmark,
        city,
        state,
        pincode,
      };

      const finalShippingFee = deliveryMethod === 'express' ? shippingFeeMinor + 7000 : shippingFeeMinor;

      const order = await placeOrder(customer, paymentMethod, deliveryMethod);

      // Trigger celebratory gold & date confetti
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#D5A24B', '#B86B2B', '#355B3E', '#2A120D', '#FFF8ED'],
        });
      } catch (err) {
        console.error(err);
      }

      setIsProcessing(false);
      onOrderSuccess(order.publicToken);
    }, 750);
  };

  const finalTotalMinor = deliveryMethod === 'express' ? totalMinor + 7000 : totalMinor;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => !isProcessing && setIsCheckoutOpen(false)}
          className="fixed inset-0 bg-date-900/70 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-4xl bg-cream rounded-4xl shadow-2xl border border-sand-200 overflow-hidden z-10 my-auto max-h-[92vh] flex flex-col"
        >
          {/* Header */}
          <div className="p-5 sm:p-6 border-b border-sand-200 bg-sand-50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-date-900 text-gold-400 flex items-center justify-center">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold text-date-900">
                  Instant One-Page Checkout
                </h3>
                <span className="text-xs text-date-600 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-palm-600" />
                  256-Bit SSL Encrypted • India-wide Delivery
                </span>
              </div>
            </div>

            <button
              onClick={() => !isProcessing && setIsCheckoutOpen(false)}
              disabled={isProcessing}
              className="p-2 text-date-800 hover:text-date-900 rounded-full hover:bg-sand-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form & Summary Container */}
          <form onSubmit={handlePlaceOrder} className="flex-1 overflow-y-auto p-5 sm:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Column: Details & Payments (7 Cols) */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* 1. Contact Information */}
                <div>
                  <h4 className="text-xs font-bold text-date-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-date-900 text-sand-50 text-[11px] flex items-center justify-center">1</span>
                    <span>Contact Details</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-medium text-date-700 block mb-1">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-sand-50 border border-sand-300 text-date-900 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-gold-400"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-date-700 block mb-1">Mobile (+91) *</label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-sand-50 border border-sand-300 text-date-900 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-gold-400 font-mono"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="text-xs font-medium text-date-700 block mb-1">Email for Receipt *</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-sand-50 border border-sand-300 text-date-900 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-gold-400"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Shipping Address */}
                <div>
                  <h4 className="text-xs font-bold text-date-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-date-900 text-sand-50 text-[11px] flex items-center justify-center">2</span>
                    <span>Delivery Address</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="sm:col-span-2">
                      <label className="text-xs font-medium text-date-700 block mb-1">Flat, House No., Building *</label>
                      <input
                        type="text"
                        required
                        value={addressLine1}
                        onChange={(e) => setAddressLine1(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-sand-50 border border-sand-300 text-date-900 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-gold-400"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="text-xs font-medium text-date-700 block mb-1">Landmark (Optional)</label>
                      <input
                        type="text"
                        value={landmark}
                        onChange={(e) => setLandmark(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-sand-50 border border-sand-300 text-date-900 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-gold-400"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-date-700 block mb-1">PIN Code *</label>
                      <input
                        type="text"
                        maxLength={6}
                        required
                        value={pincode}
                        onChange={(e) => handlePincodeChange(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-sand-50 border border-sand-300 text-date-900 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-gold-400 font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-date-700 block mb-1">City *</label>
                      <input
                        type="text"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-sand-50 border border-sand-300 text-date-900 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-gold-400"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="text-xs font-medium text-date-700 block mb-1">State *</label>
                      <input
                        type="text"
                        required
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-sand-50 border border-sand-300 text-date-900 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-gold-400"
                      />
                    </div>
                  </div>
                </div>

                {/* 3. Delivery Method */}
                <div>
                  <h4 className="text-xs font-bold text-date-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-date-900 text-sand-50 text-[11px] flex items-center justify-center">3</span>
                    <span>Shipping Method</span>
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setDeliveryMethod('standard')}
                      className={`p-3 rounded-2xl border text-left transition-all ${
                        deliveryMethod === 'standard'
                          ? 'bg-sand-100 border-date-900 shadow-sm'
                          : 'bg-cream border-sand-200 hover:bg-sand-50'
                      }`}
                    >
                      <span className="text-xs font-bold text-date-900 block">Standard Air Express</span>
                      <span className="text-[11px] text-date-600 block mt-0.5">3-5 Business Days</span>
                      <span className="text-xs font-bold text-palm-700 block mt-1">
                        {shippingFeeMinor === 0 ? 'FREE' : formatINR(shippingFeeMinor)}
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setDeliveryMethod('express')}
                      className={`p-3 rounded-2xl border text-left transition-all ${
                        deliveryMethod === 'express'
                          ? 'bg-sand-100 border-date-900 shadow-sm'
                          : 'bg-cream border-sand-200 hover:bg-sand-50'
                      }`}
                    >
                      <span className="text-xs font-bold text-date-900 block">Priority Gold Air</span>
                      <span className="text-[11px] text-date-600 block mt-0.5">24-48 Hours Guaranteed</span>
                      <span className="text-xs font-bold text-caramel-600 block mt-1">+₹70.00</span>
                    </button>
                  </div>
                </div>

                {/* 4. Payment Method */}
                <div>
                  <h4 className="text-xs font-bold text-date-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-date-900 text-sand-50 text-[11px] flex items-center justify-center">4</span>
                    <span>Payment Selection</span>
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('upi')}
                      className={`p-3 rounded-2xl border text-center transition-all ${
                        paymentMethod === 'upi'
                          ? 'bg-date-900 text-sand-50 border-gold-400 shadow-sm'
                          : 'bg-cream text-date-900 border-sand-200 hover:bg-sand-100'
                      }`}
                    >
                      <QrCode className="w-5 h-5 mx-auto mb-1 text-gold-400" />
                      <span className="text-xs font-bold block">UPI / QR</span>
                      <span className="text-[9px] opacity-75">GPay, PhonePe</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`p-3 rounded-2xl border text-center transition-all ${
                        paymentMethod === 'card'
                          ? 'bg-date-900 text-sand-50 border-gold-400 shadow-sm'
                          : 'bg-cream text-date-900 border-sand-200 hover:bg-sand-100'
                      }`}
                    >
                      <CreditCard className="w-5 h-5 mx-auto mb-1 text-gold-400" />
                      <span className="text-xs font-bold block">Card</span>
                      <span className="text-[9px] opacity-75">Debit / Credit</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('netbanking')}
                      className={`p-3 rounded-2xl border text-center transition-all ${
                        paymentMethod === 'netbanking'
                          ? 'bg-date-900 text-sand-50 border-gold-400 shadow-sm'
                          : 'bg-cream text-date-900 border-sand-200 hover:bg-sand-100'
                      }`}
                    >
                      <ShieldCheck className="w-5 h-5 mx-auto mb-1 text-gold-400" />
                      <span className="text-xs font-bold block">NetBanking</span>
                      <span className="text-[9px] opacity-75">All Indian Banks</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('cod')}
                      className={`p-3 rounded-2xl border text-center transition-all ${
                        paymentMethod === 'cod'
                          ? 'bg-date-900 text-sand-50 border-gold-400 shadow-sm'
                          : 'bg-cream text-date-900 border-sand-200 hover:bg-sand-100'
                      }`}
                    >
                      <Banknote className="w-5 h-5 mx-auto mb-1 text-gold-400" />
                      <span className="text-xs font-bold block">Cash on Delivery</span>
                      <span className="text-[9px] opacity-75">Pay at Doorstep</span>
                    </button>
                  </div>

                  {paymentMethod === 'upi' && (
                    <div className="mt-3 p-3 bg-sand-100 rounded-xl border border-sand-200 flex items-center gap-3 text-xs text-date-900">
                      <QrCode className="w-6 h-6 text-caramel-600 flex-shrink-0" />
                      <div className="flex-1">
                        <span className="font-bold block">UPI Auto-Handshake Mode</span>
                        <span className="text-[11px] text-date-600">Enter UPI VPA or Scan QR on next screen</span>
                      </div>
                      <input
                        type="text"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        placeholder="yourname@upi"
                        className="px-2.5 py-1.5 rounded-lg bg-cream border border-sand-300 text-xs w-36 font-mono"
                      />
                    </div>
                  )}
                </div>

              </div>

              {/* Right Column: Order Summary & Place Order CTA (5 Cols) */}
              <div className="lg:col-span-5 bg-sand-100/60 p-5 sm:p-6 rounded-3xl border border-sand-200 flex flex-col justify-between">
                <div>
                  <h4 className="font-serif-luxury text-lg font-bold text-date-900 mb-4 pb-2 border-b border-sand-200">
                    Order Summary ({cart.length} varieties)
                  </h4>

                  {/* Items List */}
                  <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
                    {cart.map((item) => (
                      <div key={item.id} className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2 truncate">
                          <span className="w-5 h-5 rounded-md bg-sand-200 text-date-900 font-bold flex items-center justify-center flex-shrink-0 text-[10px]">
                            {item.quantity}x
                          </span>
                          <span className="font-semibold text-date-900 truncate">
                            {item.productName} ({item.variantLabel})
                          </span>
                        </div>
                        <span className="font-bold text-date-900 flex-shrink-0 ml-2">
                          {formatINR(item.priceMinor * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Pricing Breakdown */}
                  <div className="mt-6 pt-4 border-t border-sand-200 space-y-2 text-xs text-date-700">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-semibold text-date-900">{formatINR(subtotalMinor)}</span>
                    </div>

                    {discountMinor > 0 && (
                      <div className="flex justify-between text-palm-700 font-semibold">
                        <span>Coupon Discount ({appliedCoupon?.code})</span>
                        <span>-{formatINR(discountMinor)}</span>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <span>Shipping Fee</span>
                      <span>
                        {deliveryMethod === 'express'
                          ? formatINR(shippingFeeMinor + 7000)
                          : shippingFeeMinor === 0
                          ? 'FREE'
                          : formatINR(shippingFeeMinor)}
                      </span>
                    </div>

                    <div className="flex justify-between text-base font-bold text-date-900 pt-3 border-t border-sand-200">
                      <span>Final Payable Total</span>
                      <span className="font-serif-luxury text-xl text-caramel-600">
                        {formatINR(finalTotalMinor)}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 p-3 rounded-xl bg-cream border border-sand-200 text-[11px] text-date-700 space-y-1">
                    <div className="flex items-center gap-1.5 font-semibold text-palm-700">
                      <Truck className="w-3.5 h-3.5 text-palm-600" />
                      <span>Estimated Delivery: {deliveryMethod === 'express' ? '24-48 Hours' : '2-4 Business Days'}</span>
                    </div>
                    <p className="text-[10px] text-date-500">
                      Nitrogen-flushed pack with temperature-controlled transit.
                    </p>
                  </div>
                </div>

                {/* Place Order CTA Button */}
                <div className="mt-6 pt-2">
                  <button
                    type="submit"
                    disabled={isProcessing || cart.length === 0}
                    className="w-full bg-caramel-500 hover:bg-caramel-600 disabled:opacity-50 text-cream py-4 rounded-full font-bold text-sm sm:text-base transition-all shadow-warm-lg hover:shadow-warm-xl flex items-center justify-center gap-2 active:scale-98"
                  >
                    {isProcessing ? (
                      <>
                        <span className="w-4 h-4 rounded-full border-2 border-cream border-t-transparent animate-spin" />
                        <span>Verifying & Placing Order...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 text-gold-300" />
                        <span>Confirm & Place Order ({formatINR(finalTotalMinor)})</span>
                      </>
                    )}
                  </button>

                  <p className="text-[10px] text-center text-date-500 mt-2">
                    By confirming, you agree to Nakhla Dates terms and fresh delivery policy.
                  </p>
                </div>

              </div>

            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
