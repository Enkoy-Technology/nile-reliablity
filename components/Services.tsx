'use client';

import React from 'react';

const Services: React.FC = () => {
  const services = [
    {
      title: 'Thermography',
      description: 'Infrared inspections that reveal hidden heat issues before they cause damage.',
      image: "url('/images/thermography.png')",
      imageAlt: 'Thermal imaging scan',
    },
    {
      title: 'Vibration',
      description: 'Detailed vibration analysis to spot early signs of wear and prevent breakdowns.',
      image: "url('/images/vibration.png')",
      imageAlt: 'Vibration analysis equipment',
    },
    {
      title: 'Oil Analysis',
      description: 'Comprehensive lubricant testing to monitor equipment health and optimize maintenance schedules.',
      image: "url('/images/oil-analysis.png')",
      imageAlt: 'Oil analysis laboratory',
    },
    {
      title: 'Balancing & Alignment',
      description: 'Precision balancing and alignment services to ensure optimal equipment performance.',
      image: "url('/images/balancing.png')",
      imageAlt: 'Equipment balancing',
    },
    {
      title: 'Ultrasonic Testing',
      description: 'Non-destructive testing to detect internal defects and structural integrity issues.',
      image: "url('/images/ultrasonic.png')",
      imageAlt: 'Ultrasonic testing equipment',
    },
  ];

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
            Our Services
          </h2>

          <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto font-light leading-relaxed">
            Comprehensive condition monitoring solutions to prevent unplanned downtime and optimize equipment reliability.
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

