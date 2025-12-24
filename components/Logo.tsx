'use client';

import texts from '@/data/texts.json';
import React from 'react';

const Logo: React.FC = () => (
  <div className="flex flex-row items-center justify-center group cursor-pointer gap-3">
    <div className="flex-shrink-0">
      <svg
        width="50"
        height="50"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M30 80 C 30 80, 40 10, 50 40 C 60 70, 70 20, 70 20"
          stroke="#1e3a8a"
          strokeWidth="3"
          strokeLinecap="round"
          className="path-draw"
        />
      </svg>
    </div>
    <div className="flex flex-col items-start">
      <span className="text-xl font-medium tracking-[0.2em] text-blue-900 uppercase">
        {texts.logo.mainText}
      </span>
      <span className="text-[10px] tracking-[0.4em] text-slate-500 uppercase mt-1">
        {texts.logo.subText}
      </span>
    </div>
  </div>
);

export default Logo;

