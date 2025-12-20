'use client';

import { BarChart3, Settings, ShieldCheck } from 'lucide-react';
import React from 'react';
import Feature from './Feature';

const Services: React.FC = () => (
  <section id="services" className="py-16 sm:py-24 bg-slate-50 border-t border-slate-100">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12 sm:mb-16">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-slate-900 mb-4 px-4">Our Expertise</h2>
        <div className="w-12 h-0.5 bg-slate-900 mx-auto mb-4 sm:mb-6"></div>
        <p className="text-base sm:text-lg text-slate-500 max-w-2xl mx-auto font-light px-4">
          Comprehensive solutions designed to maximize your operational efficiency and minimize downtime.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        <Feature
          icon={BarChart3}
          title="Plant Reliability Audit"
          desc="A comprehensive analysis of your facility's health. We identify bottlenecks and potential failure points before they impact production."
        />
        <Feature
          icon={Settings}
          title="Preventive Maintenance"
          desc="Customized maintenance strategies tailored to your specific equipment, ensuring longevity and consistent performance."
        />
        <Feature
          icon={ShieldCheck}
          title="Engineering Solutions"
          desc="On-demand technical support and reliability engineering to solve complex mechanical challenges."
        />
      </div>
    </div>
  </section>
);

export default Services;

