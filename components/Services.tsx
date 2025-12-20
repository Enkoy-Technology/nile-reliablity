'use client';

import { Activity, Droplet, Thermometer } from 'lucide-react';
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
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
        <Feature
          icon={Activity}
          title="Vibration Analysis"
          desc="Advanced monitoring to detect early signs of equipment failure and optimize maintenance schedules using ISO 10816 standards."
        />
        <Feature
          icon={Thermometer}
          title="Thermal Imaging"
          desc="Infrared thermography to identify hot spots and thermal anomalies in electrical and mechanical systems with precision accuracy."
        />
        <Feature
          icon={Droplet}
          title="Oil Analysis"
          desc="Comprehensive lubricant testing to monitor equipment health and optimize oil change intervals based on real-time data."
        />
      </div>
    </div>
  </section>
);

export default Services;

