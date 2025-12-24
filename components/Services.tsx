'use client';

import texts from '@/data/texts.json';
import { motion } from 'framer-motion';
import React from 'react';

const Services: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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

  const cardVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,

      },
    },
  };
  const imageMap: Record<string, string> = {
    'Infrared thermography': "url('/images/thermography.jpeg')",
    'Vibration': "url('/images/vibration.jpeg')",
    'Oil Analysis': "url('/images/oil-analysis.png')",
    'Laser alignment and balancing': "url('/images/balancing.jpeg')",
    'Ultrasonic Testing': "url('/images/ultrasonic.jpeg')",
  };

  const services = texts.services.items.map(service => ({
    ...service,
    image: imageMap[service.title],
  }));

  return (
    <section id="services" className="relative py-20 sm:py-24 lg:py-32 bg-slate-50 border-t border-slate-100">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 sm:mb-20"
        >
          {/* Decorative accent line */}
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 64 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-block mb-6 overflow-hidden mx-auto"
          >
            <div className="h-0.5 w-16 bg-slate-900 mx-auto"></div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-light text-slate-900 mb-6"
          >
            {texts.services.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto font-light leading-relaxed"
          >
            {texts.services.subtitle}
          </motion.p>
        </motion.div>

        {/* Services Grid - 3 columns on desktop, 1 on mobile */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -10, scale: 1.02 }}
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
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;

