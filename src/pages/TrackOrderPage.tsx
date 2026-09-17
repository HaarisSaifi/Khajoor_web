import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Order } from '../types';
import { Search, PackageCheck, Truck, CheckCircle2, Clock, MapPin, AlertCircle } from 'lucide-react';
import { formatINR } from '../utils/currency';

export const TrackOrderPage: React.FC = () => {
  const { getOrderByIdOrNumber, orders } = useStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [matchedOrder, setMatchedOrder] = useState<Order | null>(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setSearched(true);
    const found = getOrderByIdOrNumber(searchQuery.trim());
    setMatchedOrder(found || null);
  };

  const steps = [
    { key: 'confirmed', label: 'Order Confirmed', desc: 'Payment verified & order queued' },
    { key: 'packed', label: 'Nitrogen Packed', desc: 'Hand-sorted & sealed in freshness tins' },
    { key: 'shipped', label: 'In Transit (Air)', desc: 'Handed over to BlueDart / Delhivery' },
    { key: 'delivered', label: 'Delivered', desc: 'Package received at doorstep' },
  ];

  const getStepStatus = (stepKey: string, currentStatus: Order['fulfillmentStatus']) => {
    const orderSequence = ['confirmed', 'packed', 'shipped', 'delivered'];
    const currentIndex = orderSequence.indexOf(currentStatus);
    const stepIndex = orderSequence.indexOf(stepKey);

    if (stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) return 'active';
    return 'pending';
  };

  return (
    <div className="py-12 bg-sand-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Title */}
        <div className="text-center max-w-xl mx-auto">
          <h1 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-date-900 tracking-tight">
            Track Your Shipment
          </h1>
          <p className="text-date-700/80 text-sm mt-2">
            Enter your 8-digit Order Number (e.g. <strong>NKH-98421</strong>) or registered 10-digit mobile number to view live progress.
          </p>
        </div>

        {/* Search Box */}
        <form onSubmit={handleSearch} className="max-w-md mx-auto flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-date-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              required
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="e.g. NKH-98421 or 98765 43210"
              className="w-full pl-10 pr-4 py-3 rounded-full bg-cream border border-sand-300 text-date-900 placeholder:text-date-400 text-sm font-semibold uppercase font-mono focus:outline-none focus:ring-2 focus:ring-gold-400"
            />
          </div>
          <button
            type="submit"
            className="bg-date-900 hover:bg-date-800 text-sand-50 px-6 py-3 rounded-full text-xs sm:text-sm font-bold transition-all shadow-warm-sm"
          >
            Track Order
          </button>
        </form>

        {/* Order Details Card */}
        {matchedOrder ? (
          <div className="bg-cream rounded-4xl p-6 sm:p-10 border border-sand-200 shadow-warm-md space-y-8">
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-sand-200">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-date-600 font-bold block">
                  ORDER REFERENCE
                </span>
                <span className="font-serif-luxury text-2xl font-bold text-date-900">
                  {matchedOrder.orderNumber}
                </span>
                <span className="text-xs text-date-600 block mt-0.5">
                  Placed on {new Date(matchedOrder.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                </span>
              </div>

              <div className="text-left sm:text-right">
                <span className="text-[11px] uppercase tracking-wider text-date-600 font-bold block">
                  ESTIMATED DELIVERY
                </span>
                <span className="text-sm font-bold text-palm-700 block">
                  {matchedOrder.estimatedDeliveryDate}
                </span>
                <span className="text-xs text-date-600 font-mono">
                  AWB: {matchedOrder.trackingNumber || 'BLUEDART-NKH-8829'}
                </span>
              </div>
            </div>

            {/* Timeline Steps */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-date-900 mb-6">
                Fulfillment Timeline:
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 relative">
                {steps.map((step, idx) => {
                  const status = getStepStatus(step.key, matchedOrder.fulfillmentStatus);
                  return (
                    <div key={step.key} className="flex flex-col items-center text-center p-3 rounded-2xl bg-sand-50 border border-sand-200">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 font-bold transition-colors ${
                          status === 'completed'
                            ? 'bg-palm-600 text-cream'
                            : status === 'active'
                            ? 'bg-gold-400 text-date-900 animate-pulse ring-4 ring-gold-200'
                            : 'bg-sand-200 text-date-500'
                        }`}
                      >
                        {status === 'completed' ? (
                          <CheckCircle2 className="w-5 h-5" />
                        ) : status === 'active' ? (
                          <Truck className="w-5 h-5" />
                        ) : (
                          <Clock className="w-4 h-4" />
                        )}
                      </div>
                      <h4 className="text-xs font-bold text-date-900">{step.label}</h4>
                      <p className="text-[10px] text-date-600 mt-1">{step.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Address & Items Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-sand-200">
              <div className="p-4 rounded-2xl bg-sand-100/60 border border-sand-200 space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold text-date-900 mb-1">
                  <MapPin className="w-4 h-4 text-caramel-600" />
                  <span>Delivery Destination</span>
                </div>
                <p className="text-xs font-bold text-date-900">{matchedOrder.customer.fullName}</p>
                <p className="text-xs text-date-700">{matchedOrder.customer.addressLine1}</p>
                <p className="text-xs text-date-700">
                  {matchedOrder.customer.city}, {matchedOrder.customer.state} - {matchedOrder.customer.pincode}
                </p>
                <p className="text-xs text-date-700 font-mono">Mobile: {matchedOrder.customer.phone}</p>
              </div>

              <div className="p-4 rounded-2xl bg-sand-100/60 border border-sand-200 space-y-2">
                <span className="text-xs font-bold text-date-900 block mb-1">
                  Package Contents ({matchedOrder.items.length} items)
                </span>
                <div className="space-y-1.5 text-xs text-date-800 max-h-28 overflow-y-auto">
                  {matchedOrder.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between">
                      <span className="truncate max-w-[200px]">{item.quantity}x {item.productName} ({item.variantLabel})</span>
                      <span className="font-bold">{formatINR(item.priceMinor * item.quantity)}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-2 border-t border-sand-200 flex justify-between text-xs font-bold text-date-900">
                  <span>Total Paid ({matchedOrder.paymentMethod.toUpperCase()})</span>
                  <span className="text-caramel-600 font-serif-luxury text-sm">{formatINR(matchedOrder.totalMinor)}</span>
                </div>
              </div>
            </div>

          </div>
        ) : searched ? (
          <div className="p-8 rounded-3xl bg-cream border border-sand-200 text-center max-w-md mx-auto space-y-3">
            <AlertCircle className="w-8 h-8 text-caramel-500 mx-auto" />
            <h3 className="font-serif-luxury text-lg font-bold text-date-900">
              No shipment found for "{searchQuery}"
            </h3>
            <p className="text-xs text-date-600">
              Please verify your order number in your confirmation email or try searching with demo code <strong>NKH-98421</strong>.
            </p>
          </div>
        ) : (
          <div className="p-8 rounded-3xl bg-cream/70 border border-dashed border-sand-300 text-center max-w-md mx-auto space-y-2">
            <PackageCheck className="w-8 h-8 text-gold-500 mx-auto" />
            <h3 className="font-serif-luxury text-base font-bold text-date-900">
              Track Your Freshness Consignment
            </h3>
            <p className="text-xs text-date-600 leading-relaxed">
              Enter the Order ID from your confirmation receipt or your registered 10-digit mobile number to view live transit milestones.
            </p>
          </div>
        )}

      </div>
    </div>
  );
};
