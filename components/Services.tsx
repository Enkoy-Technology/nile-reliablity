'use client';

import { Activity, Droplet, Gauge, Thermometer, Waves } from 'lucide-react';
import React from 'react';
import Feature from './Feature';

const Services: React.FC = () => (
  <section id="services" className="relative py-20 sm:py-24 lg:py-32 bg-white border-t border-slate-100">
    {/* Subtle background decoration */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-0 left-0 w-96 h-96 bg-slate-50 rounded-full blur-3xl opacity-40"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-slate-50 rounded-full blur-3xl opacity-40"></div>
    </div>

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

      {/* Services Grid */}
      <div className="flex flex-wrap justify-center gap-8 sm:gap-10">
        <div className="w-full sm:w-[calc(50%-1.25rem)] lg:w-[calc(33.333%-1.67rem)] max-w-md">
          <Feature
            icon={Activity}
            title="Vibration Analysis"
            desc="Advanced monitoring to detect early signs of equipment failure and optimize maintenance schedules using ISO 10816 standards."
          />
        </div>
        <div className="w-full sm:w-[calc(50%-1.25rem)] lg:w-[calc(33.333%-1.67rem)] max-w-md">
          <Feature
            icon={Thermometer}
            title="Thermal Imaging"
            desc="Infrared thermography to identify hot spots and thermal anomalies in electrical and mechanical systems with precision accuracy."
          />
        </div>
        <div className="w-full sm:w-[calc(50%-1.25rem)] lg:w-[calc(33.333%-1.67rem)] max-w-md">
          <Feature
            icon={Droplet}
            title="Oil Analysis"
            desc="Comprehensive lubricant testing to monitor equipment health and optimize oil change intervals based on real-time data."
          />
        </div>
        <div className="w-full sm:w-[calc(50%-1.25rem)] lg:w-[calc(33.333%-1.67rem)] max-w-md">
          <Feature
            icon={Gauge}
            title="Balancing & Alignment"
            desc="Precision balancing and alignment services to ensure optimal equipment performance, reduce wear, and extend machinery lifespan."
          />
        </div>
        <div className="w-full sm:w-[calc(50%-1.25rem)] lg:w-[calc(33.333%-1.67rem)] max-w-md">
          <Feature
            icon={Waves}
            title="Ultrasonic Testing"
            desc="Non-destructive testing using ultrasonic waves to detect internal defects, leaks, and structural integrity issues in equipment and pipelines."
          />
        </div>
      </div>
    </div>
  </section>
);

export default Services;

