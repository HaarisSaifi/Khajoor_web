import React, { useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { CheckCircle2, Sparkles, Truck, Package, MessageCircle, ArrowRight, Printer } from 'lucide-react';
import { formatINR } from '../utils/currency';
import confetti from 'canvas-confetti';

interface OrderConfirmationPageProps {
  onNavigateHome: () => void;
  onNavigateTrack: () => void;
}

export const OrderConfirmationPage: React.FC<OrderConfirmationPageProps> = ({
  onNavigateHome,
  onNavigateTrack,
}) => {
  const { currentOrder, orders } = useStore();

  const order = currentOrder || (orders.length > 0 ? orders[0] : null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Fire festive celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.5 },
        colors: ['#D5A24B', '#B86B2B', '#355B3E', '#2A120D', '#FFF8ED'],
      });
    } catch (e) {
      console.error(e);
    }
  }, []);

  if (!order) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-xl font-bold text-date-900">No recent order found</h2>
        <button
          onClick={onNavigateHome}
          className="mt-4 bg-caramel-500 text-cream px-6 py-2 rounded-full text-xs font-bold"
        >
          Return Home
        </button>
      </div>
    );
  }

  return (
    <div className="py-12 bg-sand-50 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Celebration Header Card */}
        <div className="bg-cream rounded-4xl p-8 sm:p-12 border border-sand-200 shadow-warm-lg text-center space-y-4 relative overflow-hidden">
          <div className="w-16 h-16 rounded-full bg-palm-100 text-palm-700 flex items-center justify-center mx-auto shadow-sm border border-palm-200">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sand-100 text-date-900 text-xs font-bold border border-sand-200">
            <Sparkles className="w-3.5 h-3.5 text-gold-500" />
            <span>HARVEST CONFIRMED & QUEUED FOR PACKING</span>
          </div>

          <h1 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-date-900 tracking-tight">
            Thank you, {order.customer.fullName}!
          </h1>

          <p className="text-date-700 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
            Your royal khajoor order <strong className="font-mono text-date-900 font-bold">{order.orderNumber}</strong> has been received and verified. A confirmation receipt has been sent to <strong>{order.customer.email}</strong>.
          </p>

          <div className="pt-2 flex items-center justify-center gap-4 text-xs font-semibold text-palm-700">
            <span className="flex items-center gap-1">
              <Truck className="w-4 h-4" />
              <span>Estimated Delivery: {order.estimatedDeliveryDate}</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <MessageCircle className="w-4 h-4" />
              <span>SMS & WhatsApp Dispatch Alerts Active</span>
            </span>
          </div>
        </div>

        {/* Order Receipt Details */}
        <div className="bg-cream rounded-4xl p-6 sm:p-10 border border-sand-200 shadow-warm-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-sand-200">
            <div>
              <span className="text-[11px] text-date-600 font-bold uppercase tracking-wider block">
                ORDER NUMBER
              </span>
              <span className="font-serif-luxury text-xl font-bold text-date-900 font-mono">
                {order.orderNumber}
              </span>
            </div>

            <div className="text-right">
              <span className="text-[11px] text-date-600 font-bold uppercase tracking-wider block">
                PAYMENT METHOD
              </span>
              <span className="text-xs font-bold text-palm-700 uppercase bg-palm-100/70 px-2.5 py-0.5 rounded-full">
                {order.paymentMethod.toUpperCase()} • {order.paymentStatus.toUpperCase()}
              </span>
            </div>
          </div>

          {/* Line Items */}
          <div className="space-y-3 divide-y divide-sand-200">
            {order.items.map((item, idx) => (
              <div key={idx} className="pt-3 first:pt-0 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.productName}
                    className="w-12 h-12 rounded-xl object-contain bg-sand-100 p-1 border border-sand-200"
                  />
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-date-900">{item.productName}</h4>
                    <span className="text-[11px] text-date-600">
                      Pack: {item.variantLabel} • Qty: {item.quantity}
                    </span>
                  </div>
                </div>
                <span className="text-xs sm:text-sm font-bold text-date-900">
                  {formatINR(item.priceMinor * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          {/* Summary Breakdown */}
          <div className="pt-4 border-t border-sand-200 space-y-2 text-xs text-date-700">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold text-date-900">{formatINR(order.subtotalMinor)}</span>
            </div>

            {order.discountMinor > 0 && (
              <div className="flex justify-between text-palm-700 font-semibold">
                <span>Coupon Savings ({order.couponApplied})</span>
                <span>-{formatINR(order.discountMinor)}</span>
              </div>
            )}

            <div className="flex justify-between">
              <span>Express Delivery Fee</span>
              <span>{order.shippingFeeMinor === 0 ? 'FREE' : formatINR(order.shippingFeeMinor)}</span>
            </div>

            <div className="flex justify-between text-base font-bold text-date-900 pt-3 border-t border-sand-200">
              <span>Total Paid</span>
              <span className="font-serif-luxury text-xl text-caramel-600">{formatINR(order.totalMinor)}</span>
            </div>
          </div>

          {/* Destination */}
          <div className="pt-4 border-t border-sand-200 text-xs text-date-700 space-y-1">
            <span className="font-bold text-date-900 block">Shipping Destination:</span>
            <p>{order.customer.fullName}, {order.customer.addressLine1}</p>
            <p>{order.customer.city}, {order.customer.state} - {order.customer.pincode}</p>
            <p className="font-mono">Contact: {order.customer.phone}</p>
          </div>

          {/* Action CTAs */}
          <div className="pt-4 flex flex-col sm:flex-row gap-3">
            <button
              onClick={onNavigateTrack}
              className="flex-1 bg-date-900 hover:bg-date-800 text-sand-50 py-3.5 px-6 rounded-full text-xs sm:text-sm font-bold transition-all shadow-warm-sm flex items-center justify-center gap-2"
            >
              <Truck className="w-4 h-4 text-gold-400" />
              <span>Track Live Dispatch Status</span>
            </button>

            <button
              onClick={() => window.print()}
              className="bg-cream hover:bg-sand-100 text-date-900 border border-sand-300 py-3.5 px-6 rounded-full text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2"
            >
              <Printer className="w-4 h-4 text-date-700" />
              <span>Print Tax Invoice</span>
            </button>

            <button
              onClick={onNavigateHome}
              className="bg-caramel-500 hover:bg-caramel-600 text-cream py-3.5 px-6 rounded-full text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2"
            >
              <span>Continue Shopping</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
