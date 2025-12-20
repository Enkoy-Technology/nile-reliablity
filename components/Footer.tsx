'use client';

import React from 'react';
import { Mail } from 'lucide-react';

interface FooterProps {
  onScrollTo: (id: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onScrollTo }) => (
  <footer className="bg-slate-50 border-t border-slate-200 py-12 sm:py-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12 mb-8 sm:mb-12">
        {/* Company Info */}
        <div className="flex flex-col">
          <div className="mb-4">
            <span className="text-xl font-bold tracking-widest text-slate-900 uppercase block">
              Nile Reliability Solutions
            </span>
          </div>
          <p className="text-slate-600 text-sm leading-relaxed mt-4">
            Transforming industrial maintenance into a competitive advantage through expert reliability engineering.
          </p>
      </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-6">
            Quick Links
          </h3>
          <div className="flex flex-col gap-3">
            {['Home', 'Services', 'About'].map((item) => (
        <button
                key={item}
                onClick={() => onScrollTo(item.toLowerCase())}
                className="text-sm text-slate-600 hover:text-slate-900 transition-colors text-left"
        >
                {item}
        </button>
            ))}
        <button
          onClick={() => onScrollTo('audit')}
              className="text-sm text-slate-600 hover:text-slate-900 transition-colors text-left"
        >
          Contact
        </button>
          </div>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-6">
            Contact
          </h3>
          <div className="flex flex-col gap-4">
            <a
              href="mailto:contact@nilereliability.com"
              className="flex items-center gap-3 text-sm text-slate-600 hover:text-slate-900 transition-colors"
            >
              <Mail size={18} className="text-slate-400" />
              contact@nilereliability.com
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="pt-8 border-t border-slate-200">
        <div className="text-slate-400 text-sm text-center">
          © {new Date().getFullYear()} Nile Reliability Solutions. All rights reserved.
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;

