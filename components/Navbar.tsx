'use client';

import texts from '@/data/texts.json';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Logo from './Logo';

interface NavbarProps {
  onScrollTo: (id: string) => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onScrollTo, isMenuOpen, setIsMenuOpen }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 border-b transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-lg border-slate-200 shadow-sm'
          : 'bg-white/90 backdrop-blur-md border-slate-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16 md:h-20 lg:h-24">
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <Logo />
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-10">
            {texts.navbar.menuItems.map((item) => (
              <button
                key={item}
                onClick={() => onScrollTo(item.toLowerCase())}
                className="text-sm font-medium uppercase tracking-wider text-slate-500 hover:text-slate-900 transition-colors relative group py-2"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-slate-900 transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}

            <button
              onClick={() => onScrollTo('audit')}
              className="bg-slate-900 text-white px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-slate-800 transition-all transform hover:-translate-y-0.5 hover:shadow-lg"
            >
              {texts.navbar.contactButton}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-slate-900 hover:bg-slate-50 rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <div
        className={`md:hidden bg-white overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-96 border-b border-slate-100' : 'max-h-0'
        }`}
      >
        <div className="px-4 py-6 space-y-4 flex flex-col items-center">
          {texts.navbar.menuItems.filter(item => item !== 'Dashboard').map((item) => (
            <button
              key={item}
              onClick={() => {
                onScrollTo(item.toLowerCase());
                setIsMenuOpen(false);
              }}
              className="text-sm font-medium uppercase tracking-wider text-slate-900 hover:text-slate-600 transition-colors w-full py-2 text-center"
            >
              {item}
            </button>
          ))}
          <Link
            href="/dashboard"
            onClick={() => setIsMenuOpen(false)}
            className="text-sm font-medium uppercase tracking-wider text-slate-900 hover:text-slate-600 transition-colors w-full py-2 text-center"
          >
            Dashboard
          </Link>
          <button
            onClick={() => {
              onScrollTo('audit');
              setIsMenuOpen(false);
            }}
            className="bg-slate-900 text-white w-full py-3 text-xs font-bold uppercase tracking-widest mt-4 hover:bg-slate-800 transition-colors"
          >
            {texts.navbar.mobileMenu.contactButton}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

