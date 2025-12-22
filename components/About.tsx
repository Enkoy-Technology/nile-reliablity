'use client';

import texts from '@/data/texts.json';
import { Award, CheckCircle2, Target, Users } from 'lucide-react';
import React from 'react';

const About: React.FC = () => {
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
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-slate-900 mb-4 px-4">
            {texts.about.title.main} <span className="font-semibold">{texts.about.title.highlighted}</span>
          </h2>
          <div className="w-12 h-0.5 bg-slate-900 mx-auto mb-4 sm:mb-6"></div>
          <p className="text-base sm:text-lg text-slate-500 max-w-3xl mx-auto font-light leading-relaxed px-4">
            {texts.about.subtitle}
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-20">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <div
                key={index}
                className="p-6 sm:p-8 border border-slate-200 hover:border-slate-900 transition-all duration-300 group hover:shadow-lg"
              >
                <div className="mb-4 sm:mb-6 text-slate-400 group-hover:text-slate-900 transition-colors">
                  <Icon size={36} strokeWidth={1.5} className="sm:w-10 sm:h-10" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-2 sm:mb-3">{value.title}</h3>
                <p className="text-slate-500 leading-relaxed text-sm sm:text-base">{value.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Achievements Section */}
        <div className="bg-slate-50 p-6 sm:p-12 lg:p-16 border border-slate-100">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div>
              <h3 className="text-xl sm:text-2xl font-semibold text-slate-900 mb-4 sm:mb-6">
                {texts.about.trackRecord.title}
              </h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6 sm:mb-8">
                {texts.about.trackRecord.description}
              </p>
            </div>
            <div className="space-y-3 sm:space-y-4">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-start gap-3 sm:gap-4">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <p className="text-sm sm:text-base text-slate-700 font-medium">{achievement}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

