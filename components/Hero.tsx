'use client';

import texts from '@/data/texts.json';
import { motion } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';
import React from 'react';

interface HeroProps {
  onScrollTo: (id: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onScrollTo }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,

      },
    },
  };

  return (
  <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-900 py-20 sm:py-24 md:py-0 md:h-screen">
    {/* Background Video */}
    <div className="absolute inset-0 z-0">
      <video
        src="/hero.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        onEnded={(e) => {
          // Safari occasionally ignores loop; ensure restart.
          e.currentTarget.currentTime = 0;
          e.currentTarget.play();
        }}
        className="w-full h-full object-cover"
      />

      {/* Gradient Overlay - Subtle */}
      <div className="absolute inset-0 bg-slate-900/40 sm:bg-slate-900/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
    </div>

    {/* Content - Centered */}
    <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-0 flex items-center justify-center min-h-0">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto space-y-4 sm:space-y-6 md:space-y-8 text-center w-full"
      >
        {/* Main Heading - Centered */}
        <motion.h1
          variants={itemVariants}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold text-white leading-[1.1] sm:leading-[1.05] md:leading-[0.95] tracking-tight px-2"
        >
          <span className="block text-slate-100 break-words">{texts.hero.heading.line1}</span>
          <span className="block mt-1 sm:mt-2 text-blue-100 break-words">
            {texts.hero.heading.line2}
          </span>
        </motion.h1>

        {/* Subtitle - Centered */}
        <motion.p
          variants={itemVariants}
          className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl lg:text-2xl text-slate-300 font-light leading-relaxed px-4"
        >
          {texts.hero.subtitle}
        </motion.p>

        {/* Actions - Centered */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 md:gap-8 pt-4 sm:pt-6 md:pt-8 px-4"
        >
          <button
            onClick={() => onScrollTo('audit')}
            className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-white text-slate-900 text-xs sm:text-sm font-bold uppercase tracking-widest overflow-hidden transition-all hover:bg-slate-50 hover:scale-105 shadow-lg rounded-sm w-full sm:w-auto"
          >
            <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-3">
              {texts.hero.ctaButton}
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform flex-shrink-0" />
            </span>
          </button>

          {/* Social Proof - Centered */}
          <div className="flex flex-col items-center gap-2">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="text-xs sm:text-sm font-medium text-slate-200 tracking-wide opacity-90">
              {texts.hero.socialProof}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>

    {/* Scroll Indicator */}
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5, duration: 0.8 }}
      className="absolute bottom-6 sm:bottom-8 md:bottom-10 left-1/2 transform -translate-x-1/2 z-10 hidden md:block"
    >
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2"
      >
        <div className="w-1 h-2 bg-white rounded-full" />
      </motion.div>
    </motion.div>
  </section>
  );
};

export default Hero;

