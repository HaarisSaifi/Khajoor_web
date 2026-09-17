import React from 'react';
import { motion } from 'framer-motion';

interface HeroPedestalProps {
  isAnimating?: boolean;
}

export const HeroPedestal: React.FC<HeroPedestalProps> = ({ isAnimating }) => {
  return (
    <div className="absolute inset-x-0 bottom-6 sm:bottom-8 flex flex-col items-center justify-center pointer-events-none z-10">
      
      {/* Dynamic Platter & Base Assembly */}
      <motion.div
        animate={
          isAnimating
            ? { y: [0, 6, -2, 0], scale: [1, 1.01, 0.99, 1] }
            : { y: [0, 2, 0] }
        }
        transition={
          isAnimating
            ? { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
            : { duration: 4, repeat: Infinity, ease: 'easeInOut' }
        }
        className="relative w-[340px] sm:w-[440px] lg:w-[480px] flex flex-col items-center"
      >
        
        {/* Layer 1: The Dark Basalt Stone Platter Surface (Elliptical 3D Perspective) */}
        <div className="relative w-full h-24 sm:h-28 rounded-[50%] shadow-2xl flex items-center justify-center"
          style={{
            background: 'radial-gradient(ellipse at 50% 40%, #35302E 0%, #201A18 60%, #151110 100%)',
            boxShadow: `
              inset 0 2px 4px rgba(255, 255, 255, 0.25),
              inset 0 -4px 8px rgba(0, 0, 0, 0.8),
              0 14px 28px -4px rgba(42, 18, 13, 0.45),
              0 24px 50px -10px rgba(0, 0, 0, 0.35)
            `,
            border: '2px solid rgba(213, 162, 75, 0.65)', // Elegant brushed gold rim
          }}
        >
          {/* Subtle Platter Top Specular Reflection */}
          <div
            className="absolute inset-2 sm:inset-3 rounded-[50%] opacity-40 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at 40% 30%, rgba(255, 248, 237, 0.2) 0%, transparent 60%)',
            }}
          />

          {/* Golden Rim Highlight Inset */}
          <div
            className="absolute inset-0 rounded-[50%] pointer-events-none"
            style={{
              border: '1px solid rgba(255, 255, 255, 0.2)',
            }}
          />
        </div>

        {/* Layer 2: The Platter's Realistic Bevel Edge (Depth Thickness) */}
        <div
          className="w-[98%] h-3.5 sm:h-4 -mt-16 sm:-mt-18 rounded-[50%] pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, #201A18 0%, #120E0D 100%)',
            borderBottom: '2px solid rgba(189, 140, 53, 0.85)',
          }}
        />

        {/* Layer 3: Cylindrical Brushed Brass Pedestal Foot */}
        <div
          className="w-36 sm:w-44 h-7 sm:h-9 -mt-1 sm:-mt-1 rounded-b-2xl shadow-lg relative overflow-hidden"
          style={{
            background: 'linear-gradient(90deg, #8B6520 0%, #D5A24B 25%, #FFF0C8 45%, #B8822B 65%, #6A4912 100%)',
            boxShadow: '0 8px 20px rgba(42, 18, 13, 0.5), inset 0 2px 4px rgba(255, 255, 255, 0.4)',
          }}
        >
          {/* Brass Brushed Sheen Texture Lines */}
          <div className="absolute inset-0 opacity-25 bg-[repeating-linear-gradient(90deg,transparent,transparent_2px,rgba(0,0,0,0.15)_2px,rgba(0,0,0,0.15)_4px)]" />
        </div>

      </motion.div>

      {/* Layer 4: Deep Diffuse Contact Shadow on the Sand Tabletop */}
      <div
        className="w-[380px] sm:w-[480px] lg:w-[520px] h-12 -mt-4 rounded-[50%] pointer-events-none blur-md opacity-60"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(42, 18, 13, 0.75) 0%, rgba(42, 18, 13, 0.25) 50%, transparent 80%)',
        }}
      />
    </div>
  );
};
