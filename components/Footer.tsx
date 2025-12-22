'use client';

import texts from '@/data/texts.json';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, Mail, MapPin, Phone } from 'lucide-react';
import React from 'react';

interface FooterProps {
  onScrollTo: (id: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onScrollTo }) => {
  const services = texts.footer.sections.services.items;
  const technologies = texts.footer.sections.technologies.items;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
        duration: 0.5,
      },
    },
  };

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
      className="bg-slate-900 text-white py-16 sm:py-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 mb-12"
        >
          {/* Column 1: Nile Reliability */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold text-orange-500 mb-3">
              {texts.footer.companyName}
            </h3>
            <div className="h-0.5 w-12 bg-orange-500 mb-4"></div>
            <p className="text-slate-300 text-sm leading-relaxed">
              {texts.footer.companyDescription}
            </p>
          </motion.div>

          {/* Column 2: Services */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold text-orange-500 mb-3">
              {texts.footer.sections.services.title}
            </h3>
            <div className="h-0.5 w-12 bg-orange-500 mb-4"></div>
            <ul className="space-y-2">
              {services.map((service, index) => (
                <li key={index} className="flex items-center gap-2 text-slate-300 text-sm">
                  <ArrowRight className="w-4 h-4 text-orange-500 flex-shrink-0" />
                  <span>{service}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3: Technologies */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold text-orange-500 mb-3">
              {texts.footer.sections.technologies.title}
            </h3>
            <div className="h-0.5 w-12 bg-orange-500 mb-4"></div>
            <ul className="space-y-2">
              {technologies.map((tech, index) => (
                <li key={index} className="flex items-center gap-2 text-slate-300 text-sm">
                  <ArrowRight className="w-4 h-4 text-orange-500 flex-shrink-0" />
                  <span>{tech}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 4: Contact */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold text-orange-500 mb-3">
              {texts.footer.sections.contact.title}
            </h3>
            <div className="h-0.5 w-12 bg-orange-500 mb-4"></div>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-slate-300 text-sm">
                <MapPin className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                <span>{texts.footer.sections.contact.address}</span>
              </li>
              <li className="flex items-center gap-3 text-slate-300 text-sm">
                <Phone className="w-4 h-4 text-orange-500 flex-shrink-0" />
                <a href={`tel:${texts.footer.sections.contact.phone.replace(/\s/g, '')}`} className="hover:text-white transition-colors">
                  {texts.footer.sections.contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-3 text-slate-300 text-sm">
                <Mail className="w-4 h-4 text-orange-500 flex-shrink-0" />
                <a href={`mailto:${texts.footer.sections.contact.email}`} className="hover:text-white transition-colors">
                  {texts.footer.sections.contact.email}
                </a>
              </li>
              <li className="flex items-center gap-3 text-slate-300 text-sm">
                <Clock className="w-4 h-4 text-orange-500 flex-shrink-0" />
                <span>{texts.footer.sections.contact.hours}</span>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="pt-8 border-t border-slate-800"
        >
          <div className="text-slate-400 text-sm text-center">
            © {new Date().getFullYear()} {texts.footer.copyright}
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;

