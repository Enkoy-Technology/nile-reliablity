'use client';

import texts from '@/data/texts.json';
import { motion } from 'framer-motion';
import { Calendar, Monitor } from 'lucide-react';
import React from 'react';

interface ConditionMonitoringProps {
  onScrollTo: (id: string) => void;
}

const ConditionMonitoring: React.FC<ConditionMonitoringProps> = ({ onScrollTo }) => {
  const stats = texts.conditionMonitoring.stats;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        
      },
    },
  };

  const statVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        
      },
    },
  };

  return (
    <section id="dashboard" className="relative py-20 sm:py-24 lg:py-32 bg-gradient-to-b from-slate-50 to-white border-t border-slate-100">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-slate-100 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-slate-100 rounded-full blur-3xl opacity-30"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center"
        >
          {/* Left Column - Content */}
          <motion.div variants={itemVariants} className="text-center lg:text-left">
            {/* Decorative accent line */}
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 64 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="inline-block mb-6 lg:mb-8 overflow-hidden"
            >
              <div className="h-0.5 w-16 bg-slate-900"></div>
            </motion.div>

            <motion.h2
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl font-light text-slate-900 mb-6 leading-tight"
            >
              {texts.conditionMonitoring.heading.main} <span className="font-semibold italic">{texts.conditionMonitoring.heading.highlighted}</span>
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-lg sm:text-xl text-slate-600 mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-light"
            >
              {texts.conditionMonitoring.description}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <a
                href="/dashboard"
                className="group bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-sm font-bold uppercase tracking-widest text-xs transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] flex items-center justify-center gap-3"
              >
                <Monitor className="w-4 h-4 group-hover:scale-110 transition-transform" />
                {texts.conditionMonitoring.viewDashboardButton}
              </a>
              <button
                onClick={() => onScrollTo('audit')}
                className="group bg-white hover:bg-slate-50 text-slate-900 border-2 border-slate-900 hover:border-slate-800 px-8 py-4 rounded-sm font-bold uppercase tracking-widest text-xs transition-all hover:scale-[1.02] flex items-center justify-center gap-3"
              >
                <Calendar className="w-4 h-4 group-hover:scale-110 transition-transform" />
                {texts.conditionMonitoring.scheduleAuditButton}
              </button>
            </motion.div>
          </motion.div>

          {/* Right Column - Statistics */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={statVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                className="text-center p-6 sm:p-8 bg-white rounded-sm border border-slate-200 hover:border-slate-900 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="text-3xl sm:text-5xl md:text-4xl font-bold text-slate-900 mb-3 group-hover:scale-105 transition-transform">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-slate-500 font-medium uppercase tracking-wider">
                  {stat.label}
                </div>
                {/* Decorative bottom line */}
                <div className="mt-4 h-0.5 w-0 bg-slate-900 group-hover:w-full transition-all duration-300 mx-auto"></div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ConditionMonitoring;

