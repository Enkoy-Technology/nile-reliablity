'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FeatureProps {
  title: string;
  desc: string;
  icon: LucideIcon;
}

const Feature: React.FC<FeatureProps> = ({ title, desc, icon: Icon }) => (
  <div className="flex flex-col items-start p-6 sm:p-8 border-l-2 border-slate-200 hover:border-slate-900 transition-all duration-300 group bg-white hover:shadow-lg rounded-r-lg">
    <div className="mb-4 sm:mb-6 text-slate-400 group-hover:text-slate-900 transition-all duration-300 group-hover:scale-110">
      <Icon size={32} strokeWidth={1.5} className="sm:w-9 sm:h-9" />
    </div>
    <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-2 sm:mb-3 group-hover:text-slate-700 transition-colors">
      {title}
    </h3>
    <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
  </div>
);

export default Feature;

