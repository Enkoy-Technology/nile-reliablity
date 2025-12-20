'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FeatureProps {
  title: string;
  desc: string;
  icon: LucideIcon;
}

const Feature: React.FC<FeatureProps> = ({ title, desc, icon: Icon }) => (
  <div className="relative flex flex-col items-start p-8 bg-white border border-slate-200 hover:border-slate-900 transition-all duration-300 group hover:shadow-xl rounded-sm overflow-hidden">
    {/* Decorative top border */}
    <div className="absolute top-0 left-0 right-0 h-0.5 bg-slate-900 group-hover:h-1 transition-all duration-300"></div>

    {/* Icon with background circle */}
    <div className="mb-6 relative">
      <div className="absolute inset-0 bg-slate-100 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 scale-150"></div>
      <div className="p-3 bg-slate-50 rounded-full group-hover:bg-slate-100 transition-all duration-300 group-hover:scale-110 border border-slate-200 group-hover:border-slate-300">
        <Icon size={32} strokeWidth={2} className="text-slate-900 group-hover:scale-110 transition-all duration-300" />
      </div>
    </div>

    <h3 className="text-xl sm:text-2xl font-semibold text-slate-900 mb-4 group-hover:text-slate-800 transition-colors">
      {title}
    </h3>
    <p className="text-slate-600 text-base leading-relaxed">{desc}</p>

    {/* Subtle bottom decoration */}
    <div className="absolute bottom-0 left-0 right-0 h-px bg-slate-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
  </div>
);

export default Feature;

