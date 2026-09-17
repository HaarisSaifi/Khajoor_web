import React from 'react';
import { useStore } from '../../context/StoreContext';
import { Sparkles, X } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  const { announcementText, announcementVisible, setAnnouncementVisible } = useStore();

  if (!announcementVisible) return null;

  return (
    <div className="bg-date-900 text-sand-100 text-xs sm:text-sm font-medium py-2 px-4 relative z-50 border-b border-gold-400/20">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex-1 flex items-center justify-center gap-2 text-center truncate">
          <Sparkles className="w-3.5 h-3.5 text-gold-400 flex-shrink-0 animate-pulse" />
          <span className="tracking-wide truncate">
            {announcementText}
          </span>
          <span className="hidden md:inline-block px-2 py-0.5 text-[10px] font-semibold bg-gold-400/20 text-gold-300 rounded-full uppercase tracking-wider">
            Limited Crop
          </span>
        </div>
        <button
          onClick={() => setAnnouncementVisible(false)}
          aria-label="Dismiss banner"
          className="text-sand-200/70 hover:text-sand-100 p-1 rounded-full transition-colors ml-2"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
