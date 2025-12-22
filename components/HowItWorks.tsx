'use client';

import texts from '@/data/texts.json';
import { motion } from 'framer-motion';
import React from 'react';

const HowItWorks: React.FC = () => {
  const steps = texts.howItWorks.steps;

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

  const stepVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.5,
        
      },
    },
  };

  return (
    <section id="how-it-works" className="relative py-2 sm:py-2 lg:py-10 bg-slate-50 border-t border-slate-100">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-slate-100 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-slate-100 rounded-full blur-3xl opacity-30"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-16 sm:mb-20"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-6xl font-light text-slate-900 mb-4"
          >
            {texts.howItWorks.title}
          </motion.h2>
          {/* Decorative underline */}
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-block mb-8 overflow-hidden"
          >
            <div className="h-0.5 w-20 bg-slate-900"></div>
          </motion.div>
          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto font-light leading-relaxed"
          >
            {texts.howItWorks.subtitle}
          </motion.p>
        </motion.div>

        {/* Three-Step Process */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid md:grid-cols-3 gap-8 sm:gap-10 lg:gap-12"
        >
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              variants={stepVariants}
              whileHover={{ y: -10, scale: 1.05 }}
              className="relative text-center"
            >
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
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;



