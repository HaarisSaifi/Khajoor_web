import React, { useState, useEffect, useRef } from 'react';
import { useStore } from '../../context/StoreContext';
import { HERO_SLIDES } from '../../data/catalog';
import { HeroSlide } from '../../types';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ArrowRight,
  Eye,
  ShoppingBag,
  Star,
  Leaf,
  ShieldCheck,
  Compass
} from 'lucide-react';
import { formatINR } from '../../utils/currency';

interface HeroStageProps {
  onNavigate: (route: string) => void;
  onSelectProduct: (slug: string) => void;
}

export const HeroStage: React.FC<HeroStageProps> = ({ onNavigate, onSelectProduct }) => {
  const { products, setQuickViewProduct, addToCart } = useStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isPaused, setIsPaused] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const sheenRef = useRef<HTMLDivElement>(null);
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);

  // High performance GPU-accelerated motion values (Zero React re-renders on cursor move)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 180, damping: 20, mass: 0.7 });
  const smoothY = useSpring(mouseY, { stiffness: 180, damping: 20, mass: 0.7 });
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-10, 10]);

  // Preload all variety images into browser cache so slide transitions are instant
  useEffect(() => {
    HERO_SLIDES.forEach((slide) => {
      const img = new Image();
      img.src = slide.productCutout;
    });
  }, []);

  const handleStageMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // Avoid running on mobile touch screens to preserve battery and avoid scroll stutter
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return;
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;

    // Direct compositor thread update (0 React re-renders)
    mouseX.set(nx);
    mouseY.set(ny);

    if (sheenRef.current) {
      const px = Math.round((nx + 0.5) * 100);
      const py = Math.round((ny + 0.5) * 100);
      sheenRef.current.style.background = `radial-gradient(circle at ${px}% ${py}%, rgba(255, 255, 255, 0.42) 0%, transparent 62%)`;
    }
  };

  const handleStageMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    if (sheenRef.current) {
      sheenRef.current.style.background = 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.22) 0%, transparent 62%)';
    }
  };

  const activeSlide: HeroSlide = HERO_SLIDES[currentIndex];
  const activeProduct = products.find((p) => p.slug === activeSlide.productSlug) || products[0];

  const totalSlides = HERO_SLIDES.length;

  const goToNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
    setTimeout(() => setIsAnimating(false), 800);
  };

  const goToPrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
    setTimeout(() => setIsAnimating(false), 800);
  };

  const goToIndex = (index: number) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 800);
  };

  // Autoplay management: 5.2s interval
  useEffect(() => {
    if (isPaused) return;

    autoplayTimerRef.current = setInterval(() => {
      goToNext();
    }, 5200);

    return () => {
      if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
    };
  }, [currentIndex, isPaused, isAnimating]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goToNext();
      if (e.key === 'ArrowLeft') goToPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAnimating]);

  return (
    <section
      className="relative w-full overflow-hidden bg-sand-50 pt-4 pb-12 lg:py-14 select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Khajoor Variety Showcase"
    >
      {/* Background Subtle Sand Gradient & Organic Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none opacity-60 overflow-hidden" style={{ transform: 'translateZ(0)' }}>
        <div
          className="absolute -top-32 -right-32 w-[360px] sm:w-[600px] h-[360px] sm:h-[600px] rounded-full blur-2xl sm:blur-3xl transition-colors duration-1000"
          style={{ backgroundColor: `${activeSlide.accentColor}15`, willChange: 'background-color', transform: 'translateZ(0)' }}
        />
        <div
          className="absolute -bottom-32 -left-32 w-[320px] sm:w-[500px] h-[320px] sm:h-[500px] rounded-full blur-2xl sm:blur-3xl transition-colors duration-1000"
          style={{ backgroundColor: `${activeSlide.blobColor}35`, willChange: 'background-color', transform: 'translateZ(0)' }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[640px] lg:min-h-[700px]">
          
          {/* Left Column: Editorial Headline & Actions (44% Width on Desktop) */}
          <div className="lg:col-span-5 flex flex-col justify-center text-left order-2 lg:order-1 pt-4 lg:pt-0">
            
            {/* Eyebrow Pill */}
            <motion.div
              key={`eyebrow-${activeSlide.id}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sand-200/80 border border-sand-300 text-date-900 text-xs font-semibold w-max mb-4 shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-gold-500" />
              <span>{activeSlide.eyebrow}</span>
            </motion.div>

            {/* Main Editorial Headline */}
            <div className="overflow-hidden">
              <motion.h1
                key={`headline-${activeSlide.id}`}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-date-900 leading-[1.08]"
              >
                Khajoor worth <br />
                <span className="italic font-normal text-caramel-600">slowing down</span> for.
              </motion.h1>
            </div>

            {/* Variety Tagline & Sensory Note */}
            <motion.div
              key={`desc-${activeSlide.id}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="mt-4 sm:mt-6 space-y-3"
            >
              <div className="flex items-center gap-3">
                <span className="text-xl sm:text-2xl font-serif-luxury font-bold text-date-900">
                  {activeSlide.title}
                </span>
                <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wider bg-gold-400/20 text-date-900 border border-gold-400/30">
                  {activeSlide.sensoryMicrocopy}
                </span>
              </div>

              <p className="text-date-800/80 text-sm sm:text-base leading-relaxed max-w-lg">
                {activeSlide.description}
              </p>

              {/* Origin & Rating Badge */}
              <div className="flex flex-wrap items-center gap-4 text-xs text-date-700 pt-1">
                <div className="flex items-center gap-1.5 font-medium">
                  <Leaf className="w-3.5 h-3.5 text-palm-600" />
                  <span>{activeSlide.origin}</span>
                </div>
                <div className="flex items-center gap-1 text-gold-600 font-semibold">
                  <Star className="w-3.5 h-3.5 fill-gold-500 text-gold-500" />
                  <span>{activeSlide.rating}</span>
                  <span className="text-date-600 font-normal">({activeSlide.reviews} verified reviews)</span>
                </div>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
              <button
                onClick={() => onNavigate('shop')}
                className="inline-flex items-center justify-center gap-2 bg-caramel-500 hover:bg-caramel-600 text-cream px-7 py-3.5 rounded-full font-semibold text-sm sm:text-base transition-all shadow-warm-md hover:shadow-warm-lg hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-gold-400 group"
              >
                <span>Shop the Collection</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => setQuickViewProduct(activeProduct)}
                className="inline-flex items-center justify-center gap-2 bg-cream hover:bg-sand-100 text-date-900 border border-sand-300 px-5 py-3.5 rounded-full font-semibold text-sm sm:text-base transition-all hover:border-gold-400 focus:outline-none"
              >
                <Eye className="w-4 h-4 text-date-700" />
                <span>Quick View</span>
              </button>

              <button
                onClick={() => addToCart(activeProduct, activeProduct.variants[0])}
                className="inline-flex items-center justify-center gap-2 bg-date-900 hover:bg-date-800 text-sand-100 px-5 py-3.5 rounded-full font-semibold text-sm sm:text-base transition-all shadow-warm-sm hover:shadow-warm-md focus:outline-none"
                title={`Quick buy 250g box for ${formatINR(activeProduct.variants[0].priceMinor)}`}
              >
                <ShoppingBag className="w-4 h-4 text-gold-400" />
                <span>From {formatINR(activeSlide.priceFrom)}</span>
              </button>
            </div>

            {/* Trust Assurance */}
            <div className="mt-8 pt-6 border-t border-sand-200/80 flex items-center gap-6 text-xs text-date-700">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-palm-600" />
                <span>100% Pure & Tree-Ripened</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-gold-500" />
                <span>Nitrogen Sealed Freshness</span>
              </div>
            </div>

          </div>

          {/* Right Column: Ultra-Realistic 3D Pedestal Platter Stage */}
          <div
            ref={stageRef}
            onMouseMove={handleStageMouseMove}
            onMouseLeave={handleStageMouseLeave}
            className="lg:col-span-7 relative flex flex-col items-center justify-center order-1 lg:order-2 py-4"
          >
            {/* 3D Perspective Stage Container */}
            <div
              className="relative w-full max-w-[560px] h-[460px] sm:h-[500px] flex items-center justify-center"
              style={{ perspective: '1200px' }}
            >
              {/* Background Morphing Ambient Glow */}
              <motion.div
                key={`blob-${activeSlide.id}`}
                initial={{ scale: 0.88, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.88, opacity: 0 }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
                className="absolute inset-8 sm:inset-12 rounded-full blur-2xl transition-all duration-700 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at 45% 45%, ${activeSlide.blobColor}, #F7E9D3 70%)`,
                  opacity: 0.75,
                }}
              />

              {/* Orbiting Subtle Golden Halo */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div
                  className="w-[88%] h-[88%] rounded-full border border-gold-400/20 animate-spin"
                  style={{ animationDuration: '45s', willChange: 'transform' }}
                />
              </div>

              {/* Floating Decorative Date Leaf Badge */}
              <motion.div
                className="absolute top-8 right-4 sm:right-6 w-11 h-11 rounded-full bg-cream shadow-warm-md p-2 flex items-center justify-center border border-sand-200 pointer-events-none z-30"
                animate={{ y: [-6, 6, -6], rotate: [0, 8, 0] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
                style={{ willChange: 'transform' }}
              >
                <Leaf className="w-5 h-5 text-palm-600" />
              </motion.div>

              {/* Floating VIP Quality Seal */}
              <motion.div
                className="absolute bottom-20 left-2 sm:left-4 w-14 h-14 rounded-2xl bg-cream shadow-warm-md p-2 flex flex-col items-center justify-center border border-gold-400/40 pointer-events-none z-30"
                animate={{ y: [6, -6, 6], rotate: [-4, 4, -4] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
                style={{ willChange: 'transform' }}
              >
                <span className="text-[10px] font-bold uppercase text-gold-600 leading-none">GRADE</span>
                <span className="text-sm font-black text-date-900 leading-none mt-0.5">VIP</span>
              </motion.div>

              {/* Interactive 3D Parallax Tilt Container (Reacts to Cursor with 0 React re-renders) */}
              <motion.div
                className="relative flex items-center justify-center pointer-events-none"
                style={{
                  rotateX,
                  rotateY,
                  transformStyle: 'preserve-3d',
                  willChange: 'transform',
                }}
              >
                {/* Physically Grounded Floor Shadow Anchored Under the Pedestal Base */}
                <div className="absolute -bottom-6 sm:-bottom-8 w-[340px] sm:w-[420px] lg:w-[460px] h-12 flex items-center justify-center pointer-events-none z-10">
                  <div className="w-[50%] h-6 bg-date-950/75 rounded-[50%] blur-sm" />
                  <div className="absolute w-[80%] h-9 bg-date-900/40 rounded-[50%] blur-md" />
                  <div className="absolute w-[110%] h-14 bg-date-900/20 rounded-[50%] blur-xl" />
                </div>

                {/* The 3D Slide Animation for Platter + Dates */}
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={activeSlide.id}
                    custom={direction}
                    initial={{
                      opacity: 0,
                      x: direction * 220,
                      rotateY: direction * 32,
                      scale: 0.88,
                      rotateZ: direction * 3,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      rotateY: 0,
                      scale: 1,
                      rotateZ: 0,
                    }}
                    exit={{
                      opacity: 0,
                      x: -direction * 220,
                      rotateY: -direction * 32,
                      scale: 0.88,
                      rotateZ: -direction * 3,
                    }}
                    transition={{
                      duration: 0.72,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.25}
                    onDragEnd={(_, info) => {
                      if (info.offset.x > 55) goToPrev();
                      else if (info.offset.x < -55) goToNext();
                    }}
                    style={{ touchAction: 'pan-y' }}
                    className="relative flex flex-col items-center justify-center cursor-grab active:cursor-grabbing pointer-events-auto"
                  >
                    {/* Floating Bobbing Motion */}
                    <motion.div
                      animate={{ y: [-5, 5, -5] }}
                      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                      style={{ willChange: 'transform' }}
                      className="relative w-[340px] sm:w-[440px] lg:w-[480px] aspect-square flex items-center justify-center select-none"
                    >
                      {/* Interactive Studio Specular Sheen (Moves with cursor smoothly without overlay GPU penalty) */}
                      <div
                        ref={sheenRef}
                        className="absolute inset-4 rounded-full pointer-events-none z-10 transition-opacity duration-300"
                        style={{
                          background: 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.22) 0%, transparent 62%)',
                        }}
                      />

                      {/* Pure Photorealistic 3D Dates on Pedestal Platter */}
                      <img
                        src={activeSlide.productCutout}
                        alt={`${activeSlide.title} on artisanal pedestal platter`}
                        className="w-full h-full object-contain pointer-events-auto select-none drop-shadow-[0_16px_28px_rgba(42,18,13,0.32)] hover:scale-[1.03] transition-transform duration-500 ease-out"
                        onClick={() => onSelectProduct(activeSlide.productSlug)}
                        loading="eager"
                        decoding="async"
                        draggable={false}
                        style={{ willChange: 'transform' }}
                        onError={(e) => {
                          const target = e.currentTarget;
                          if (target.src.endsWith('.webp')) {
                            target.src = target.src.replace('.webp', '.png');
                          }
                        }}
                      />
                    </motion.div>

                    {/* Floating Sensory Badge Anchored Below Dish */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25, duration: 0.4 }}
                      className="absolute -bottom-1 flex items-center gap-2 pointer-events-auto z-20"
                    >
                      <div className="bg-date-900/90 backdrop-blur-md px-4 py-1.5 rounded-full border border-gold-400/40 flex items-center gap-2 text-sand-50 text-xs font-semibold shadow-warm-md">
                        <span className="w-2 h-2 rounded-full bg-gold-400 animate-ping" />
                        <span>{activeSlide.variety} Date Harvest</span>
                      </div>
                      <button
                        onClick={() => onSelectProduct(activeSlide.productSlug)}
                        className="bg-cream/95 hover:bg-cream text-date-900 text-xs font-bold px-3 py-1.5 rounded-full shadow-warm-sm border border-sand-300 transition-colors hover:border-gold-400"
                      >
                        Explore →
                      </button>
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
              </motion.div>

              {/* Prev / Next Navigation Arrows */}
              <button
                onClick={goToPrev}
                aria-label="Previous date variety"
                className="absolute left-1 sm:-left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-cream/95 hover:bg-sand-100 text-date-900 shadow-warm-md flex items-center justify-center border border-sand-300 transition-all hover:scale-110 active:scale-95 z-30 focus:outline-none focus:ring-2 focus:ring-gold-400"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={goToNext}
                aria-label="Next date variety"
                className="absolute right-1 sm:-right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-cream/95 hover:bg-sand-100 text-date-900 shadow-warm-md flex items-center justify-center border border-sand-300 transition-all hover:scale-110 active:scale-95 z-30 focus:outline-none focus:ring-2 focus:ring-gold-400"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Micro Interaction Hint */}
            <div className="mt-3 text-[11px] text-date-700/60 font-medium flex items-center gap-1.5">
              <Compass className="w-3 h-3 text-gold-600 animate-spin" style={{ animationDuration: '10s' }} />
              <span>Interactive 3D Stage • Drag or move cursor to tilt</span>
            </div>

            {/* Slide Navigation Indicator Pills */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-2 z-20">
              {HERO_SLIDES.map((slide, idx) => {
                const isActive = idx === currentIndex;
                return (
                  <button
                    key={slide.id}
                    onClick={() => goToIndex(idx)}
                    className={`px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-date-900 text-sand-50 shadow-warm-sm scale-105 border border-gold-400/40'
                        : 'bg-sand-200/80 text-date-800 hover:bg-sand-300'
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        isActive ? 'bg-gold-400' : 'bg-date-500/40'
                      }`}
                    />
                    <span>{slide.variety}</span>
                  </button>
                );
              })}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
