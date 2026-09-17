import React from 'react';
import { ShieldCheck, Phone, Mail, MapPin, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (route: string) => void;
  onSelectProduct: (slug: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onSelectProduct }) => {
  return (
    <footer className="bg-date-900 text-sand-100 pt-16 pb-12 border-t border-date-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-date-800">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-date-800 border border-gold-400/40 flex items-center justify-center">
                <svg className="w-6 h-6 text-gold-400" viewBox="0 0 100 100" fill="none">
                  <path d="M50 85V45" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                  <path d="M50 48C42 40 30 38 22 45" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  <path d="M50 48C58 40 70 38 78 45" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  <ellipse cx="44" cy="52" rx="4" ry="6" fill="#B86B2B" />
                  <ellipse cx="56" cy="52" ry="6" rx="4" fill="#B86B2B" />
                  <ellipse cx="50" cy="57" rx="4" ry="6" fill="#D5A24B" />
                </svg>
              </div>
              <div>
                <span className="font-serif-luxury text-2xl font-bold tracking-wider text-sand-50 block leading-none">
                  NAKHLA DATES
                </span>
                <span className="text-[10px] tracking-[0.28em] text-gold-400 font-semibold uppercase block mt-1">
                  ROYAL KHAJOOR • EST. 2026
                </span>
              </div>
            </div>

            <p className="text-sand-300/80 text-xs sm:text-sm leading-relaxed max-w-sm">
              Dedicated to sourcing authentic, unadulterated dates from the sacred oases of Al-Madinah, Al-Ula, and the Jordan Valley. Nitrogen-sealed and air-shipped across India.
            </p>

            <div className="flex items-center gap-3 text-xs text-gold-400/90 pt-2">
              <ShieldCheck className="w-4 h-4 text-gold-400" />
              <span>FSSAI Lic. No: 11526999000142 • 100% Natural</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-serif-luxury font-bold text-sand-50 text-base tracking-wide">
              Store Navigation
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-sand-300/80">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-gold-400 transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop')} className="hover:text-gold-400 transition-colors">
                  Shop All Varieties
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('gift-boxes')} className="hover:text-gold-400 transition-colors">
                  Bespoke Gift Boxes
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('date-guide')} className="hover:text-gold-400 transition-colors">
                  Variety Tasting Guide
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('our-story')} className="hover:text-gold-400 transition-colors">
                  Our Harvest Story
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('track-order')} className="hover:text-gold-400 transition-colors">
                  Track Your Order
                </button>
              </li>
            </ul>
          </div>

          {/* Date Varieties */}
          <div className="space-y-3">
            <h4 className="font-serif-luxury font-bold text-sand-50 text-base tracking-wide">
              Royal Varieties
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-sand-300/80">
              <li>
                <button onClick={() => onSelectProduct('ajwa-al-madinah')} className="hover:text-gold-400 transition-colors">
                  Ajwa Al-Madinah VIP
                </button>
              </li>
              <li>
                <button onClick={() => onSelectProduct('royal-medjool')} className="hover:text-gold-400 transition-colors">
                  Imperial Jumbo Medjool
                </button>
              </li>
              <li>
                <button onClick={() => onSelectProduct('golden-sukkari')} className="hover:text-gold-400 transition-colors">
                  Golden Sukkari Rutab
                </button>
              </li>
              <li>
                <button onClick={() => onSelectProduct('mabroom-al-ula')} className="hover:text-gold-400 transition-colors">
                  Mabroom Royal Al-Ula
                </button>
              </li>
              <li>
                <button onClick={() => onSelectProduct('safawi-al-madinah')} className="hover:text-gold-400 transition-colors">
                  Safawi Al-Madinah
                </button>
              </li>
              <li>
                <button onClick={() => onSelectProduct('classic-khudri')} className="hover:text-gold-400 transition-colors">
                  Classic Everyday Khudri
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="space-y-3">
            <h4 className="font-serif-luxury font-bold text-sand-50 text-base tracking-wide">
              Concierge & Care
            </h4>
            <div className="space-y-2.5 text-xs text-sand-300/80">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-gold-400 flex-shrink-0" />
                <span>+91 98765 43210 (Mon-Sat, 9AM-8PM)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-gold-400 flex-shrink-0" />
                <span>concierge@nakhladates.com</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-gold-400 flex-shrink-0 mt-0.5" />
                <span>Flagship Boutique & Central Fulfilment, Delhi, India</span>
              </div>
              <div className="pt-2">
                <button
                  onClick={() => onNavigate('admin')}
                  className="px-3 py-1 rounded bg-date-800 hover:bg-date-700 text-[11px] text-gold-400 font-semibold border border-gold-400/20"
                >
                  Admin Management Portal →
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Policies & Payment Badges */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-sand-400">
          <div>
            © {new Date().getFullYear()} Nakhla Dates Inc. All rights reserved. Crafted with authentic heritage.
          </div>

          {/* Payment Badges in clean stylized typography */}
          <div className="flex items-center gap-3">
            <span className="px-2 py-1 bg-date-800 rounded font-mono text-[10px] text-sand-200 border border-date-700">
              UPI
            </span>
            <span className="px-2 py-1 bg-date-800 rounded font-mono text-[10px] text-sand-200 border border-date-700">
              GPay
            </span>
            <span className="px-2 py-1 bg-date-800 rounded font-mono text-[10px] text-sand-200 border border-date-700">
              PhonePe
            </span>
            <span className="px-2 py-1 bg-date-800 rounded font-mono text-[10px] text-sand-200 border border-date-700">
              RuPay
            </span>
            <span className="px-2 py-1 bg-date-800 rounded font-mono text-[10px] text-sand-200 border border-date-700">
              Visa / MC
            </span>
            <span className="px-2 py-1 bg-date-800 rounded font-mono text-[10px] text-gold-300 border border-date-700">
              COD Available
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
