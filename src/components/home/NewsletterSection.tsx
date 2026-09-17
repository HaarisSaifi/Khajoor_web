import React, { useState } from 'react';
import { Send, Check, Sparkles, MessageCircle } from 'lucide-react';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [whatsappOptIn, setWhatsappOptIn] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitted(true);
  };

  return (
    <section className="py-16 bg-sand-100/70 border-t border-sand-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sand-200 text-date-900 text-xs font-semibold mb-4">
          <Sparkles className="w-3.5 h-3.5 text-gold-500" />
          <span>JOIN THE NAKHLA PRIVILEGE CIRCLE</span>
        </div>

        <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-date-900 tracking-tight">
          First Access to New Harvests & Festive Drops
        </h2>

        <p className="text-date-700/80 text-sm sm:text-base mt-2 max-w-xl mx-auto">
          Subscribe to receive private harvest notifications, seasonal gifting concierge, and an instant 10% welcome coupon.
        </p>

        {isSubmitted ? (
          <div className="mt-8 p-6 bg-cream rounded-3xl border border-gold-400/40 shadow-warm-md max-w-md mx-auto">
            <div className="w-12 h-12 rounded-full bg-palm-100 text-palm-600 flex items-center justify-center mx-auto mb-3">
              <Check className="w-6 h-6" />
            </div>
            <h4 className="font-serif-luxury font-bold text-lg text-date-900">
              Welcome to Nakhla Dates!
            </h4>
            <p className="text-xs text-date-700 mt-1">
              Your code <strong className="text-caramel-600 font-mono">NAKHLA10</strong> is active for 10% off at checkout.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 max-w-xl mx-auto space-y-4">
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email (e.g. name@example.com)"
                className="flex-1 px-5 py-3.5 rounded-full bg-cream text-date-900 placeholder:text-date-400 border border-sand-300 focus:outline-none focus:ring-2 focus:ring-gold-400 text-sm font-medium shadow-sm"
              />
              <button
                type="submit"
                className="bg-date-900 hover:bg-date-800 text-sand-50 px-7 py-3.5 rounded-full font-bold text-sm transition-all shadow-warm-sm hover:shadow-warm-md flex items-center justify-center gap-2 flex-shrink-0"
              >
                <span>Subscribe</span>
                <Send className="w-4 h-4 text-gold-400" />
              </button>
            </div>

            {/* Optional WhatsApp VIP Alerts */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-xs text-date-700 pt-2">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={whatsappOptIn}
                  onChange={(e) => setWhatsappOptIn(e.target.checked)}
                  className="rounded border-sand-300 text-caramel-500 focus:ring-gold-400"
                />
                <span className="flex items-center gap-1 font-medium">
                  <MessageCircle className="w-3.5 h-3.5 text-palm-600" />
                  Also receive WhatsApp tracking & seasonal VIP offers
                </span>
              </label>

              {whatsappOptIn && (
                <input
                  type="tel"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  placeholder="e.g. 98765 43210"
                  className="px-3 py-1.5 rounded-full bg-cream text-date-900 placeholder:text-date-400 text-xs border border-sand-300 focus:outline-none focus:ring-1 focus:ring-gold-400 w-36 font-mono"
                />
              )}
            </div>

            <p className="text-[11px] text-date-500">
              We respect your privacy. No spam. One-click unsubscribe at any time.
            </p>
          </form>
        )}

      </div>
    </section>
  );
};
