'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { EXPERIENCES } from '@/data/portfolioData';
import {
  Briefcase,
  Calendar,
  MapPin,
  CheckCircle2,
  Database,
  Wrench,
  Sparkles,
  ArrowUpRight,
  TrendingUp,
  ShieldCheck,
  Zap
} from 'lucide-react';

export const ExperienceSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Dynamic animated progress beam along the timeline
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 80%', 'end 50%'],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section id="experience" className="py-28 relative bg-[#F8FAF7] border-t border-[#D8DFD5] overflow-hidden">
      
      {/* Subtle Background Lighting Accent */}
      <div className="absolute top-1/3 -left-32 w-80 h-80 bg-forest-200/35 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-0 w-96 h-96 bg-amberGold-100/35 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-20 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest-50 border border-forest-600/25 text-xs font-mono text-forest-800 mb-4 shadow-xs font-semibold">
            <Briefcase className="w-3.5 h-3.5 text-forest-700" />
            WORK EXPERIENCE
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#142019] tracking-tight leading-tight">
            Professional <span className="text-forest-800">Analytics Experience</span>
          </h2>
          <p className="text-[#44544A] text-sm sm:text-base mt-3 leading-relaxed font-sans">
            Hands-on enterprise data analytics reconciling raw AI telephony logs, validating high-volume telemetry datasets, and automating operational stakeholder workflows.
          </p>
        </div>

        {/* Dynamic Timeline Stream Container */}
        <div ref={containerRef} className="relative ml-4 sm:ml-10 pl-8 sm:pl-14">
          
          {/* Base Background Timeline Track */}
          <div className="absolute left-0 top-3 bottom-3 w-[3px] bg-warm-borderStrong rounded-full" />

          {/* Animated Scroll-Driven Beam */}
          <motion.div
            style={{ scaleY }}
            className="absolute left-0 top-3 bottom-3 w-[3px] bg-gradient-to-b from-forest-600 via-tealRich-600 to-amberGold-600 origin-top rounded-full shadow-glow-emerald"
          />

          <div className="space-y-16">
            {EXPERIENCES.map((exp, index) => {
              const isDarwix = exp.id === 'darwix-ai';

              return (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.6, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
                  className="relative group"
                >
                  {/* Glowing Timeline Node */}
                  <div
                    className={`absolute -left-[45px] sm:-left-[69px] top-6 w-7 h-7 rounded-full bg-white border-2 flex items-center justify-center shadow-md transition-transform duration-300 group-hover:scale-125 ${
                      isDarwix ? 'border-forest-700 ring-4 ring-forest-100' : 'border-stone-500'
                    }`}
                  >
                    <div className={`w-2.5 h-2.5 rounded-full ${isDarwix ? 'bg-forest-700 animate-pulse' : 'bg-stone-500'}`} />
                  </div>

                  {/* Experience Card */}
                  <div
                    className={`bg-white rounded-3xl border p-7 sm:p-10 transition-all duration-300 shadow-sm hover:shadow-card-hover ${
                      isDarwix
                        ? 'border-forest-600/30 hover:border-forest-600/60 ring-1 ring-forest-500/10'
                        : 'border-warm-border hover:border-forest-600/40'
                    }`}
                  >
                    {/* Header Row */}
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-warm-border">
                      <div>
                        <div className="flex flex-wrap items-center gap-3 mb-1.5">
                          <h3 className="text-xl sm:text-2xl font-bold text-charcoal-900 tracking-tight">
                            {exp.role}
                          </h3>
                          {exp.isCurrent && (
                            <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-forest-50 text-forest-800 border border-forest-600/30 flex items-center gap-1.5 shadow-2xs">
                              <span className="w-1.5 h-1.5 rounded-full bg-forest-600 animate-ping" />
                              CURRENT INTERNSHIP
                            </span>
                          )}
                          <span className="px-2.5 py-0.5 rounded-md text-[11px] font-mono text-stone-600 bg-warm-100 border border-warm-border">
                            {exp.type}
                          </span>
                        </div>

                        <div className="text-lg font-bold text-forest-800 flex items-center gap-2">
                          <span>{exp.company}</span>
                          <span className="text-stone-300">•</span>
                          <span className="text-xs font-mono text-stone-500 font-normal">{exp.location}</span>
                        </div>
                      </div>

                      {/* Period Badge */}
                      <div className="flex items-center gap-2 text-xs font-mono text-stone-600 shrink-0">
                        <span className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-warm-50 border border-warm-border font-semibold shadow-2xs">
                          <Calendar className="w-3.5 h-3.5 text-forest-700" />
                          {exp.period}
                        </span>
                      </div>
                    </div>

                    {/* Highlight Scope Banner */}
                    <div className="my-6 p-4 rounded-2xl bg-warm-50 border border-warm-border flex items-start sm:items-center gap-3.5 text-xs font-mono">
                      <div className="w-8 h-8 rounded-xl bg-forest-100 text-forest-800 flex items-center justify-center shrink-0">
                        <Database className="w-4 h-4" />
                      </div>
                      <div className="text-stone-700 leading-snug">
                        <strong className="text-charcoal-900 font-bold">{exp.recordCount}:</strong>{' '}
                        <span>{exp.summary}</span>
                      </div>
                    </div>

                    {/* Detailed Responsibilities List */}
                    <div className="space-y-3.5 mb-8">
                      {exp.bulletPoints.map((point, pIdx) => (
                        <motion.div
                          key={pIdx}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.35, delay: pIdx * 0.08 }}
                          className="flex items-start gap-3 text-sm text-stone-700 leading-relaxed"
                        >
                          <CheckCircle2 className="w-4 h-4 text-forest-700 shrink-0 mt-1" />
                          <span>{point}</span>
                        </motion.div>
                      ))}
                    </div>

                    {/* Applied Tools & Technologies */}
                    <div className="flex flex-wrap items-center gap-2 pt-5 border-t border-warm-border">
                      <span className="text-xs font-mono text-stone-500 flex items-center gap-1.5 mr-2">
                        <Wrench className="w-3.5 h-3.5 text-forest-700" /> Applied Tooling:
                      </span>
                      {exp.tools.map((tool) => (
                        <span
                          key={tool}
                          className="px-3 py-1 rounded-lg bg-warm-100 text-xs font-mono font-medium text-charcoal-800 border border-warm-borderStrong hover:border-forest-600/50 hover:bg-white transition-all shadow-2xs"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>

                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
