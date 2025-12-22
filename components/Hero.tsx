'use client';

import texts from '@/data/texts.json';
import { ArrowRight, Star } from 'lucide-react';
import React from 'react';

interface HeroProps {
  onScrollTo: (id: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onScrollTo }) => (
  <section id="home" className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden bg-slate-900">
    {/* Background Video */}
    <div className="absolute inset-0 z-0">
      <video
        src="/hero.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover"
      />

      {/* Gradient Overlay - Subtle */}
      <div className="absolute inset-0 bg-slate-900/40 sm:bg-slate-900/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
    </div>

    {/* Content - Centered */}
    <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-center">
      <div className="max-w-4xl mx-auto space-y-8 text-center">

        {/* Main Heading - Centered */}
        <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold text-white leading-[0.9] tracking-tight animate-fade-in-up max-w-5xl mx-auto">
          <span className="block text-slate-100">{texts.hero.heading.line1}</span>
          <span className="block mt-1 text-blue-100">
            {texts.hero.heading.line2}
          </span>
        </h1>

        {/* Subtitle - Centered */}
        <p className="max-w-2xl mx-auto text-lg sm:text-xl md:text-2xl text-slate-300 font-light leading-relaxed animate-fade-in-up delay-100">
          {texts.hero.subtitle}
        </p>

        {/* Actions - Centered */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 pt-6 animate-fade-in-up delay-200">
          <button
            onClick={() => onScrollTo('audit')}
            className="group relative px-8 py-4 bg-white text-slate-900 text-sm font-bold uppercase tracking-widest overflow-hidden transition-all hover:bg-slate-50 hover:scale-105 shadow-lg rounded-sm"
          >
            <span className="relative z-10 flex items-center gap-3">
              {texts.hero.ctaButton}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>

          {/* Social Proof - Centered */}
          <div className="flex flex-col items-center gap-2">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="text-sm font-medium text-slate-200 tracking-wide opacity-90">
              {texts.hero.socialProof}
            </p>
          </div>
        </div>
      </div>
    </div>

    {/* Scroll Indicator */}
    <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
      <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
        <div className="w-1 h-2 bg-white rounded-full" />
      </div>
    </div>
  </section>
);

export default Hero;

