'use client';

import texts from '@/data/texts.json';
import React from 'react';

const Services: React.FC = () => {
  const imageMap: Record<string, string> = {
    'Thermography': "url('/images/thermography.png')",
    'Vibration': "url('/images/vibration.png')",
    'Oil Analysis': "url('/images/oil-analysis.png')",
    'Balancing & Alignment': "url('/images/balancing.png')",
    'Ultrasonic Testing': "url('/images/ultrasonic.png')",
  };

  const services = texts.services.items.map(service => ({
    ...service,
    image: imageMap[service.title],
  }));

  return (
    <section id="services" className="relative py-20 sm:py-24 lg:py-32 bg-slate-50 border-t border-slate-100">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 sm:mb-20">
          {/* Decorative accent line */}
          <div className="inline-block mb-6">
            <div className="h-0.5 w-16 bg-slate-900 mx-auto"></div>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light text-slate-900 mb-6">
            {texts.services.title}
          </h2>

          <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto font-light leading-relaxed">
            {texts.services.subtitle}
          </p>
        </div>

        {/* Services Grid - 3 columns on desktop, 1 on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {services.map((service, index) => (
            <div
              key={index}
              className="relative"
            >
              {/* Full-width Background Image */}
              <div
                className="w-full h-64 bg-cover bg-center rounded-lg"
                style={{
                  backgroundImage: service.image,
                }}
              >
              </div>

              {/* White Info Card Overlay - 25% overlaps image, 75% extends below, 10% inset */}
              <div className="relative -mt-16 mx-[10%] bg-white rounded-lg p-8 sm:p-10 text-center">
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;

