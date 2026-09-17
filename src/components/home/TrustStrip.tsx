import React from 'react';
import { Award, PackageCheck, CreditCard, Truck } from 'lucide-react';

export const TrustStrip: React.FC = () => {
  const trustItems = [
    {
      icon: Award,
      title: 'Handpicked Lots',
      description: 'Only Grade-A harvest selected from Medina & Jordan groves',
    },
    {
      icon: PackageCheck,
      title: 'Hygienically Packed',
      description: 'Nitrogen-flushed cold sealed for locked-in orchard freshness',
    },
    {
      icon: CreditCard,
      title: '100% Secure Checkout',
      description: 'UPI, RuPay, Visa, Mastercard, NetBanking & Cash on Delivery',
    },
    {
      icon: Truck,
      title: 'Pan-India Express',
      description: 'Air-shipped to 26,000+ PIN codes with live dispatch tracking',
    },
  ];

  return (
    <section className="py-8 bg-cream border-y border-sand-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {trustItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex items-start gap-4 p-3 rounded-2xl transition-colors hover:bg-sand-50"
              >
                <div className="w-12 h-12 rounded-xl bg-sand-100 flex items-center justify-center flex-shrink-0 text-caramel-600 border border-sand-200 shadow-sm">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-date-900 tracking-wide">
                    {item.title}
                  </h4>
                  <p className="text-xs text-date-700/80 mt-1 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
