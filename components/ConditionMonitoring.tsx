'use client';

import React from 'react';
import { Calendar, Monitor } from 'lucide-react';

interface ConditionMonitoringProps {
  onScrollTo: (id: string) => void;
}

const ConditionMonitoring: React.FC<ConditionMonitoringProps> = ({ onScrollTo }) => {
  const stats = [
    { value: '92%', label: 'Uptime Improvement' },
    { value: '6-12mo', label: 'ROI Timeline' },
    { value: '40%', label: 'Cost Reduction' },
  ];

  return (
    <section id="condition-monitoring" className="relative py-20 sm:py-24 lg:py-32 bg-gradient-to-b from-slate-50 to-white border-t border-slate-100">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-slate-100 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-slate-100 rounded-full blur-3xl opacity-30"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Column - Content */}
          <div className="text-center lg:text-left">
            {/* Decorative accent line */}
            <div className="inline-block mb-6 lg:mb-8">
              <div className="h-0.5 w-16 bg-slate-900"></div>
            </div>

            <h2 className="text-4xl sm:text-5xl md:text-6xl font-light text-slate-900 mb-6 leading-tight">
              Advanced Condition Monitoring for <span className="font-semibold italic">Industrial Reliability</span>
            </h2>
            <p className="text-lg sm:text-xl text-slate-600 mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-light">
              Our precision vibration analysis services prevent unplanned downtime and optimize equipment performance for industries across Ethiopia with AI-powered predictive analytics.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={() => window.open('#', '_blank')}
                className="group bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-sm font-bold uppercase tracking-widest text-xs transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] flex items-center justify-center gap-3"
              >
                <Monitor className="w-4 h-4 group-hover:scale-110 transition-transform" />
                View Live Dashboard
              </button>
              <button
                onClick={() => onScrollTo('audit')}
                className="group bg-white hover:bg-slate-50 text-slate-900 border-2 border-slate-900 hover:border-slate-800 px-8 py-4 rounded-sm font-bold uppercase tracking-widest text-xs transition-all hover:scale-[1.02] flex items-center justify-center gap-3"
              >
                <Calendar className="w-4 h-4 group-hover:scale-110 transition-transform" />
                Schedule Audit
              </button>
            </div>
          </div>

          {/* Right Column - Statistics */}
          <div className="grid grid-cols-3 gap-4 sm:gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center p-6 sm:p-8 bg-white rounded-sm border border-slate-200 hover:border-slate-900 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 mb-3 group-hover:scale-105 transition-transform">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-slate-500 font-medium uppercase tracking-wider">
                  {stat.label}
                </div>
                {/* Decorative bottom line */}
                <div className="mt-4 h-0.5 w-0 bg-slate-900 group-hover:w-full transition-all duration-300 mx-auto"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConditionMonitoring;

