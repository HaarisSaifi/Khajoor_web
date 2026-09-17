import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Order, Product } from '../types';
import {
  Package,
  ShoppingBag,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Truck,
  Clock,
  Edit,
  Save,
  Sparkles,
  Layers,
  Bell
} from 'lucide-react';
import { formatINR } from '../utils/currency';

export const AdminDashboard: React.FC = () => {
  const {
    products,
    updateProduct,
    orders,
    updateOrderStatus,
    announcementText,
    setAnnouncementText,
    announcementVisible,
    setAnnouncementVisible,
  } = useStore();

  const [activeTab, setActiveTab] = useState<'orders' | 'inventory' | 'settings'>('orders');
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [bannerInput, setBannerInput] = useState(announcementText);

  // Metrics
  const totalRevenueMinor = orders.reduce((sum, o) => sum + o.totalMinor, 0);
  const totalOrdersCount = orders.length;
  const pendingOrdersCount = orders.filter((o) => o.fulfillmentStatus !== 'delivered').length;
  const lowStockCount = products.filter((p) =>
    p.variants.some((v) => v.inventoryQuantity < 30)
  ).length;

  const handleSaveBanner = (e: React.FormEvent) => {
    e.preventDefault();
    setAnnouncementText(bannerInput);
    alert('Announcement banner updated across the storefront!');
  };

  const handleStockChange = (product: Product, variantIndex: number, delta: number) => {
    const updatedVariants = [...product.variants];
    const target = updatedVariants[variantIndex];
    target.inventoryQuantity = Math.max(0, target.inventoryQuantity + delta);
    updateProduct({ ...product, variants: updatedVariants });
  };

  return (
    <div className="py-10 bg-sand-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Admin Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-sand-200">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-date-900 text-gold-400 text-xs font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>NAKHLA STORE CONSOLE</span>
            </div>
            <h1 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-date-900">
              Merchant Operations Portal
            </h1>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 bg-cream p-1 rounded-2xl border border-sand-200 shadow-sm self-start sm:self-auto">
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                activeTab === 'orders'
                  ? 'bg-date-900 text-sand-50'
                  : 'text-date-800 hover:bg-sand-100'
              }`}
            >
              Live Orders ({orders.length})
            </button>
            <button
              onClick={() => setActiveTab('inventory')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                activeTab === 'inventory'
                  ? 'bg-date-900 text-sand-50'
                  : 'text-date-800 hover:bg-sand-100'
              }`}
            >
              Inventory & Products
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                activeTab === 'settings'
                  ? 'bg-date-900 text-sand-50'
                  : 'text-date-800 hover:bg-sand-100'
              }`}
            >
              Store Banners & Rules
            </button>
          </div>
        </div>

        {/* Top Summary Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-cream p-5 rounded-3xl border border-sand-200 shadow-warm-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-sand-100 flex items-center justify-center text-caramel-600">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-date-600 block">Gross Sales Value</span>
              <span className="font-serif-luxury text-xl font-bold text-date-900">
                {formatINR(totalRevenueMinor)}
              </span>
            </div>
          </div>

          <div className="bg-cream p-5 rounded-3xl border border-sand-200 shadow-warm-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-sand-100 flex items-center justify-center text-gold-600">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-date-600 block">Total Orders</span>
              <span className="font-serif-luxury text-xl font-bold text-date-900">
                {totalOrdersCount}
              </span>
            </div>
          </div>

          <div className="bg-cream p-5 rounded-3xl border border-sand-200 shadow-warm-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-sand-100 flex items-center justify-center text-palm-600">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-date-600 block">Fulfillment Queue</span>
              <span className="font-serif-luxury text-xl font-bold text-date-900">
                {pendingOrdersCount} in progress
              </span>
            </div>
          </div>

          <div className="bg-cream p-5 rounded-3xl border border-sand-200 shadow-warm-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-sand-100 flex items-center justify-center text-amber-600">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-date-600 block">Stock Watchlist</span>
              <span className="font-serif-luxury text-xl font-bold text-date-900">
                {lowStockCount} items low
              </span>
            </div>
          </div>
        </div>

        {/* Tab 1: Orders Pipeline */}
        {activeTab === 'orders' && (
          <div className="bg-cream rounded-4xl p-6 sm:p-8 border border-sand-200 shadow-warm-sm space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-sand-200">
              <div>
                <h3 className="font-serif-luxury text-xl font-bold text-date-900">
                  Live Dispatch Pipeline
                </h3>
                <p className="text-xs text-date-600 mt-0.5">
                  Advance fulfillment states in real-time. Changes immediately reflect in customer order tracking.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-date-800">
                <thead className="bg-sand-100 text-date-900 font-bold uppercase text-[10px] tracking-wider border-b border-sand-200">
                  <tr>
                    <th className="py-3 px-4 rounded-l-xl">Order Ref</th>
                    <th className="py-3 px-4">Customer</th>
                    <th className="py-3 px-4">Contents</th>
                    <th className="py-3 px-4">Total</th>
                    <th className="py-3 px-4">Current Status</th>
                    <th className="py-3 px-4 rounded-r-xl">Advance Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sand-200">
                  {orders.map((order) => (
                    <tr key={order.id} className="hover:bg-sand-50 transition-colors">
                      <td className="py-4 px-4 font-mono font-bold text-date-900">
                        {order.orderNumber}
                      </td>
                      <td className="py-4 px-4">
                        <span className="font-bold block text-date-900">{order.customer.fullName}</span>
                        <span className="text-[11px] text-date-600 block">{order.customer.city}, {order.customer.pincode}</span>
                        <span className="text-[10px] text-date-500 font-mono">{order.customer.phone}</span>
                      </td>
                      <td className="py-4 px-4 max-w-xs">
                        {order.items.map((i, idx) => (
                          <span key={idx} className="block truncate">
                            {i.quantity}x {i.productName} ({i.variantLabel})
                          </span>
                        ))}
                      </td>
                      <td className="py-4 px-4 font-bold text-date-900">
                        {formatINR(order.totalMinor)}
                        <span className="block text-[10px] text-palm-700 font-semibold uppercase">
                          {order.paymentMethod}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                            order.fulfillmentStatus === 'delivered'
                              ? 'bg-palm-100 text-palm-800 border border-palm-300'
                              : order.fulfillmentStatus === 'shipped'
                              ? 'bg-blue-100 text-blue-800 border border-blue-300'
                              : order.fulfillmentStatus === 'packed'
                              ? 'bg-amber-100 text-amber-800 border border-amber-300'
                              : 'bg-sand-200 text-date-900'
                          }`}
                        >
                          {order.fulfillmentStatus}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <select
                          value={order.fulfillmentStatus}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value as any)}
                          className="px-2.5 py-1.5 rounded-lg bg-sand-100 text-date-900 text-xs font-semibold border border-sand-300 focus:outline-none focus:ring-1 focus:ring-gold-400"
                        >
                          <option value="confirmed">Confirmed</option>
                          <option value="packed">Packed</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Inventory Manager */}
        {activeTab === 'inventory' && (
          <div className="bg-cream rounded-4xl p-6 sm:p-8 border border-sand-200 shadow-warm-sm space-y-6">
            <div>
              <h3 className="font-serif-luxury text-xl font-bold text-date-900">
                Varieties & Stock Control
              </h3>
              <p className="text-xs text-date-600 mt-0.5">
                Adjust warehouse stock levels in real-time.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {products.map((p) => (
                <div key={p.id} className="p-5 rounded-3xl bg-sand-50 border border-sand-200 space-y-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={p.cutoutImage}
                      alt={p.name}
                      className="w-14 h-14 rounded-2xl object-cover border border-sand-200"
                    />
                    <div>
                      <h4 className="font-bold text-date-900 text-sm">{p.name}</h4>
                      <span className="text-xs text-date-600">{p.variety} • {p.origin}</span>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-sand-200">
                    {p.variants.map((v, vIdx) => (
                      <div key={v.id} className="flex items-center justify-between text-xs bg-cream p-2.5 rounded-xl border border-sand-200">
                        <div>
                          <span className="font-bold text-date-900 block">{v.label}</span>
                          <span className="text-[11px] text-date-600">{formatINR(v.priceMinor)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-date-600">Stock:</span>
                          <button
                            onClick={() => handleStockChange(p, vIdx, -10)}
                            className="w-6 h-6 rounded bg-sand-100 hover:bg-sand-200 text-date-900 font-bold"
                          >
                            -10
                          </button>
                          <span className="w-8 text-center font-bold text-date-900 font-mono">
                            {v.inventoryQuantity}
                          </span>
                          <button
                            onClick={() => handleStockChange(p, vIdx, 10)}
                            className="w-6 h-6 rounded bg-sand-100 hover:bg-sand-200 text-date-900 font-bold"
                          >
                            +10
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Settings & Banner */}
        {activeTab === 'settings' && (
          <div className="bg-cream rounded-4xl p-6 sm:p-8 border border-sand-200 shadow-warm-sm space-y-6 max-w-2xl">
            <div>
              <h3 className="font-serif-luxury text-xl font-bold text-date-900">
                Store Announcement & Banner Controls
              </h3>
              <p className="text-xs text-date-600 mt-0.5">
                Update the promotional message rendered on the topmost announcement bar.
              </p>
            </div>

            <form onSubmit={handleSaveBanner} className="space-y-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-date-900 block mb-2">
                  Announcement Bar Copy:
                </label>
                <input
                  type="text"
                  value={bannerInput}
                  onChange={(e) => setBannerInput(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-sand-50 border border-sand-300 text-date-900 text-sm focus:outline-none focus:ring-1 focus:ring-gold-400"
                />
              </div>

              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 text-xs font-semibold text-date-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={announcementVisible}
                    onChange={(e) => setAnnouncementVisible(e.target.checked)}
                    className="rounded border-sand-300 text-caramel-500"
                  />
                  <span>Show Announcement Bar across storefront</span>
                </label>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="bg-caramel-500 hover:bg-caramel-600 text-cream px-6 py-3 rounded-full text-xs font-bold shadow-warm-sm"
                >
                  Save Storefront Settings
                </button>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
