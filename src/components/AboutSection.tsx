'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  GraduationCap,
  TrendingUp,
  Database,
  Zap,
  Sparkles,
  BarChart,
  FileCheck,
  CheckCircle2,
  Workflow
} from 'lucide-react';

export const AboutSection: React.FC = () => {
  const pillars = [
    {
      icon: Database,
      title: "Data Validation & Hygiene",
      description: "Rigorous auditing of raw telephony and transactional logs to guarantee 100% metric consistency before dashboard deployment."
    },
    {
      icon: BarChart,
      title: "Star-Schema BI Modeling",
      description: "Designing scalable dimension and fact tables in Power BI with complex DAX measures, time intelligence, and dynamic narratives."
    },
    {
      icon: Zap,
      title: "Reporting Automation",
      description: "Eliminating repetitive manual reporting tasks using Google Apps Script and automated Power Query data refresh schedules."
    },
    {
      icon: TrendingUp,
      title: "Business & Product Strategy",
      description: "Translating conversion drop-offs, churn rates, and telephony reachability into actionable growth and operational decisions."
    }
  ];

  return (
    <section id="about" className="py-28 relative bg-[#F8FAF7] border-t border-[#D8DFD5]">
      
      {/* Background Lighting */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-forest-200/35 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-amberGold-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-20 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest-50 border border-forest-600/25 text-xs font-mono text-forest-800 mb-4 shadow-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-forest-700" />
            BACKGROUND &amp; APPROACH
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#142019] tracking-tight leading-tight">
            Engineering Precision Meets <span className="text-forest-800">Data Analytics</span>
          </h2>
          <p className="text-[#44544A] text-sm sm:text-base mt-3 leading-relaxed font-sans">
            Bridging rigorous engineering fundamentals with Business Intelligence to extract true business signals from complex data systems.
          </p>
        </div>

        {/* Narrative & Pillars Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          
          {/* Bio Story Column (7 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 flex flex-col gap-6"
          >
            <div className="text-stone-700 leading-relaxed text-base sm:text-lg space-y-5 font-sans">
              <p>
                My analytical journey began at <strong className="text-charcoal-900 font-bold">NIT Andhra Pradesh</strong> studying Electronics and Communication Engineering. Engineering taught me to view complex systems through signals, noise, and structured logic. Whether analyzing electrical waveforms or 12,000+ AI call logs, the core challenge remains identical:{' '}
                <span className="text-forest-800 font-semibold underline decoration-forest-400/40 underline-offset-4 decoration-2">
                  extracting meaningful signal from overwhelming noise
                </span>.
              </p>
              <p>
                Currently serving as a <strong className="text-charcoal-900 font-bold">Junior Data Analyst Intern at Darwix AI</strong>, I take ownership of raw telephony and lead dataset validation, engineering performance monitoring frameworks, and coordinating with AI engineers to trace metric abnormalities back to source pipelines.
              </p>
              <p>
                Previously at <strong className="text-charcoal-900 font-bold">ToffeeTeens</strong>, I analyzed over 5,000+ user booking records to track conversion funnels and active user growth metrics, delivering recommendations that directly influenced product roadmap decisions.
              </p>
            </div>

            {/* Credential Pills */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="p-5 rounded-2xl bg-white border border-[#D8DFD5] flex items-start gap-3.5 shadow-xs hover:border-forest-600/30 transition-colors">
                <GraduationCap className="w-5 h-5 text-forest-700 shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-bold text-[#142019] font-mono">NIT Andhra Pradesh</div>
                  <div className="text-xs text-[#6C7D73] mt-0.5">B.Tech ECE (2022 - 2026) • CGPA 7.49</div>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-[#D8DFD5] flex items-start gap-3.5 shadow-xs hover:border-forest-600/30 transition-colors">
                <FileCheck className="w-5 h-5 text-forest-700 shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-bold text-[#142019] font-mono">micro1 Certified Intern</div>
                  <div className="text-xs text-[#6C7D73] mt-0.5">Data Analytics Certification (Mar 2026)</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Core Pillars Column (5 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {pillars.map((pillar, idx) => {
              const IconComp = pillar.icon;
              return (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-3xl border border-[#D8DFD5] flex flex-col justify-between hover:border-forest-600/40 hover:shadow-card-hover transition-all duration-300 shadow-sm"
                >
                  <div className="w-11 h-11 rounded-2xl bg-forest-50 border border-forest-600/20 flex items-center justify-center text-forest-800 mb-5 shadow-2xs">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#142019] font-mono mb-2">{pillar.title}</h3>
                    <p className="text-xs text-[#44544A] leading-relaxed font-sans">{pillar.description}</p>
                  </div>
                </div>
              );
            })}
          </motion.div>

        </div>

      </div>
    </section>
  );
};
