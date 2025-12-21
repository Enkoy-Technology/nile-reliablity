'use client';

import React from 'react';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: 1,
      title: 'Comprehensive Data Collection',
      description: 'We deploy our advanced sensors across your critical equipment to capture vibration signatures with precision accuracy following ISO 10816 standards.'
    },
    {
      number: 2,
      title: 'Advanced Signal Processing',
      description: 'Our proprietary algorithms process raw data using FFT analysis, time waveform diagnostics, and envelope detection for comprehensive fault identification.'
    },
    {
      number: 3,
      title: 'AI-Powered Diagnostics',
      description: 'Machine learning algorithms trained on 15,000+ vibration signatures identify developing faults with 94% accuracy and provide actionable recommendations.'
    }
  ];

  return (
    <section id="how-it-works" className="relative py-2 sm:py-2 lg:py-10 bg-slate-50 border-t border-slate-100">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-slate-100 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-slate-100 rounded-full blur-3xl opacity-30"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 sm:mb-20">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light text-slate-900 mb-4">
            How It Works
          </h2>
          {/* Decorative underline */}
          <div className="inline-block mb-8">
            <div className="h-0.5 w-20 bg-slate-900"></div>
          </div>
          <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto font-light leading-relaxed">
            Our scientific approach to condition monitoring combines ISO-standard techniques with advanced AI-powered diagnostics.
          </p>
        </div>

        {/* Three-Step Process */}
        <div className="grid md:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
          {steps.map((step, index) => (
            <div key={step.number} className="relative text-center">
              {/* Number Circle */}
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-2xl font-bold text-white">{step.number}</span>
                  </div>
                  {/* Subtle background circle */}
                  <div className="absolute inset-0 w-16 h-16 bg-slate-900/20 rounded-full blur-xl -z-10 scale-150"></div>
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl sm:text-2xl font-semibold text-slate-900 mb-4">
                {step.title}
              </h3>
              <p className="text-base text-slate-600 leading-relaxed font-light">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;


