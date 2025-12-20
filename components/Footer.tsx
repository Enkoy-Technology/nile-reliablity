'use client';

import React from 'react';
import { ArrowRight, Clock, Mail, MapPin, Phone } from 'lucide-react';

interface FooterProps {
  onScrollTo: (id: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onScrollTo }) => {
  const services = [
    'Vibration Analysis',
    'Thermal Imaging',
    'Oil Analysis',
    'Balancing & Alignment',
    'Ultrasonic Testing'
  ];

  const technologies = [
    'Emerson AMS',
    'SKF Microlog',
    'Fluke 810',
    'IIoT Platforms',
    'Predictive Analytics'
  ];

  return (
    <footer className="bg-slate-900 text-white py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 mb-12">
          {/* Column 1: Nile Reliability */}
          <div>
            <h3 className="text-lg font-semibold text-orange-500 mb-3">
              Nile Reliability
            </h3>
            <div className="h-0.5 w-12 bg-orange-500 mb-4"></div>
            <p className="text-slate-300 text-sm leading-relaxed">
              Ethiopia&apos;s leading provider of condition monitoring and predictive maintenance services, helping industries optimize equipment reliability and prevent unplanned downtime.
            </p>
          </div>

          {/* Column 2: Services */}
          <div>
            <h3 className="text-lg font-semibold text-orange-500 mb-3">
              Services
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
          </div>

          {/* Column 3: Technologies */}
          <div>
            <h3 className="text-lg font-semibold text-orange-500 mb-3">
              Technologies
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
          </div>

          {/* Column 4: Contact */}
          <div>
            <h3 className="text-lg font-semibold text-orange-500 mb-3">
              Contact
            </h3>
            <div className="h-0.5 w-12 bg-orange-500 mb-4"></div>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-slate-300 text-sm">
                <MapPin className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                <span>Meskel Flower, Addis Ababa</span>
              </li>
              <li className="flex items-center gap-3 text-slate-300 text-sm">
                <Phone className="w-4 h-4 text-orange-500 flex-shrink-0" />
                <a href="tel:+251920224047" className="hover:text-white transition-colors">
                  +251 920224047
                </a>
              </li>
              <li className="flex items-center gap-3 text-slate-300 text-sm">
                <Mail className="w-4 h-4 text-orange-500 flex-shrink-0" />
                <a href="mailto:contact@nilereliability.com" className="hover:text-white transition-colors">
                  contact@nilereliability.com
                </a>
              </li>
              <li className="flex items-center gap-3 text-slate-300 text-sm">
                <Clock className="w-4 h-4 text-orange-500 flex-shrink-0" />
                <span>Mon-Fri: 8:00 AM - 5:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-slate-800">
          <div className="text-slate-400 text-sm text-center">
            © {new Date().getFullYear()} Nile Reliability Solutions. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

