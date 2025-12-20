'use client';

import { Activity, Droplet, Thermometer } from 'lucide-react';
import React from 'react';
import Feature from './Feature';

const Services: React.FC = () => (
  <section id="services" className="relative py-16 sm:py-24 bg-gradient-to-b from-white via-slate-50 to-slate-50 border-t border-slate-100 overflow-hidden">
    {/* Background decorations */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-20 left-10 w-64 h-64 bg-orange-100 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute bottom-20 right-10 w-64 h-64 bg-slate-200 rounded-full blur-3xl opacity-20"></div>
    </div>

    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header with decorative line */}
      <div className="text-center mb-16 sm:mb-20">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-slate-900 mb-4">
          Our Services
        </h2>
        <div className="inline-block mb-6">
          <div className="h-1 w-20 bg-gradient-to-r from-orange-500 to-orange-600 mx-auto rounded-full"></div>
        </div>
        <p className="text-base sm:text-lg md:text-xl text-slate-700 max-w-4xl mx-auto font-light px-4 leading-relaxed">
          Comprehensive condition monitoring solutions to prevent unplanned downtime and optimize equipment reliability.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
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

