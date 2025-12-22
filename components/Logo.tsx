'use client';

import texts from '@/data/texts.json';
import React from 'react';

const Logo: React.FC = () => (
  <div className="flex flex-col items-center justify-center group cursor-pointer">
    {/* Recreation of the "Handwritten N" Logo */}
    <div className="mb-1">
      <svg
        width="50"
        height="50"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-sm group-hover:drop-shadow-md transition-all duration-500"
      >
        {/* An elegant, fluid N shape simulating the handwritten style */}
        <path
          d="M30 80 C 30 80, 40 10, 50 40 C 60 70, 70 20, 70 20"
          stroke="#0f172a"
          strokeWidth="3"
          strokeLinecap="round"
          className="path-draw group-hover:stroke-slate-700 transition-colors duration-300"
        />
      </svg>
    </div>
    <div className="flex flex-col items-center">
      <span className="text-xl font-medium tracking-[0.2em] text-slate-900 uppercase group-hover:text-slate-700 transition-colors duration-300">
        {texts.logo.mainText}
      </span>
      <span className="text-[10px] tracking-[0.4em] text-slate-500 uppercase mt-1 group-hover:text-slate-600 transition-colors duration-300">
        {texts.logo.subText}
      </span>
    </div>
  </div>
);

export default Logo;

