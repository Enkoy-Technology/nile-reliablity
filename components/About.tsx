'use client';

import texts from '@/data/texts.json';
import { motion } from 'framer-motion';
import { Award, CheckCircle2, Target, Users } from 'lucide-react';
import React from 'react';

const About: React.FC = () => {
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        
      },
    },
  };
  const iconMap = {
    'Precision Focus': Target,
    'Expert Team': Users,
    'Proven Results': Award,
  };

  const values = texts.about.values.map(value => ({
    icon: iconMap[value.title as keyof typeof iconMap],
    title: value.title,
    desc: value.description
  }));

  const achievements = texts.about.trackRecord.achievements;

  return (
    <section id="about" className="py-16 sm:py-24 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-2xl sm:text-3xl lg:text-4xl font-light text-slate-900 mb-4 px-4"
          >
            {texts.about.title.main} <span className="font-semibold">{texts.about.title.highlighted}</span>
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 48 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8,  delay: 0.2 }}
            className="h-0.5 bg-slate-900 mx-auto mb-4 sm:mb-6 overflow-hidden"
          ></motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-base sm:text-lg text-slate-500 max-w-3xl mx-auto font-light leading-relaxed px-4"
          >
            {texts.about.subtitle}
          </motion.p>
        </motion.div>

        {/* Values Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-20"
        >
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ y: -5, scale: 1.02 }}
                className="p-6 sm:p-8 border border-slate-200 hover:border-slate-900 transition-all duration-300 group hover:shadow-lg"
              >
                <div className="mb-4 sm:mb-6 text-slate-400 group-hover:text-slate-900 transition-colors">
                  <Icon size={36} strokeWidth={1.5} className="sm:w-10 sm:h-10" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-2 sm:mb-3">{value.title}</h3>
                <p className="text-slate-500 leading-relaxed text-sm sm:text-base">{value.desc}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Achievements Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="bg-slate-50 p-6 sm:p-12 lg:p-16 border border-slate-100"
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center"
          >
            <motion.div variants={itemVariants}>
              <h3 className="text-xl sm:text-2xl font-semibold text-slate-900 mb-4 sm:mb-6">
                {texts.about.trackRecord.title}
              </h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6 sm:mb-8">
                {texts.about.trackRecord.description}
              </p>
            </motion.div>
            <motion.div
              variants={containerVariants}
              className="space-y-3 sm:space-y-4"
            >
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-start gap-3 sm:gap-4"
                >
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <p className="text-sm sm:text-base text-slate-700 font-medium">{achievement}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;

