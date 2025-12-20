'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FeatureProps {
  title: string;
  desc: string;
  icon: LucideIcon;
}

const Feature: React.FC<FeatureProps> = ({ title, desc, icon: Icon }) => (
  <div className="relative flex flex-col items-start p-6 sm:p-8 bg-white border border-slate-200 hover:border-slate-900 transition-all duration-300 group hover:shadow-xl rounded-lg overflow-hidden">
    {/* Decorative top border */}
    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-600 via-orange-500 to-orange-400 group-hover:h-1.5 transition-all duration-300"></div>

    {/* Icon with background circle */}
    <div className="mb-6 relative">
      <div className="absolute inset-0 bg-orange-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 scale-150"></div>
      <div className="p-3 bg-gradient-to-br from-orange-100 to-orange-50 rounded-full group-hover:from-orange-200 group-hover:to-orange-100 transition-all duration-300 group-hover:scale-110">
        <Icon size={32} strokeWidth={2} className="text-orange-600 group-hover:text-orange-700 transition-colors" />
      </div>
    </div>

    <h3 className="text-xl sm:text-2xl font-semibold text-slate-900 mb-3 group-hover:text-slate-800 transition-colors">
      {title}
    </h3>
    <p className="text-slate-600 text-sm sm:text-base leading-relaxed">{desc}</p>

    {/* Subtle bottom decoration */}
    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
  </div>
);

export default Feature;

