'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { PERSONAL_INFO, CERTIFICATIONS } from '@/data/portfolioData';
import { GraduationCap, Award, Sparkles, School, CheckCircle2, BookOpen } from 'lucide-react';

export const EducationSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 80%', 'end 50%'],
  });

  const pathLength = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section id="education" className="py-28 relative bg-[#F1F4EE] border-t border-[#D8DFD5] overflow-hidden">
      
      {/* Subtle Background Lighting */}
      <div className="absolute top-1/3 -right-20 w-80 h-80 bg-amberGold-100/35 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-forest-200/35 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-start mb-20 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest-50 border border-forest-600/25 text-xs font-mono text-forest-800 mb-4 shadow-xs font-semibold">
            <GraduationCap className="w-3.5 h-3.5 text-forest-700" />
            EDUCATION &amp; CERTIFICATIONS
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#142019] tracking-tight leading-tight">
            Academic <span className="text-forest-800">Timeline &amp; Certifications</span>
          </h2>
          <p className="text-[#44544A] text-sm sm:text-base mt-3 leading-relaxed font-sans">
            Engineering foundation combining analytical problem solving, signal logic, mathematical modeling, and certified business intelligence principles.
          </p>
        </div>

        <div ref={containerRef} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Education Timeline (Left Column: 7 cols) */}
          <div className="lg:col-span-7 relative pl-8 sm:pl-12 border-l-2 border-[#D8DFD5]">
            
            {/* Animated drawing line overlay */}
            <motion.div
              style={{ scaleY: pathLength }}
              className="absolute left-[-2px] top-0 bottom-0 w-[2px] bg-forest-700 origin-top shadow-glow-emerald"
            />

            <div className="space-y-12">
              
              {/* Higher Education: NIT Andhra Pradesh */}
              <motion.div
                initial={{ opacity: 0, x: -25 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="relative group"
              >
                {/* Node marker */}
                <div className="absolute -left-[41px] sm:-left-[57px] top-1.5 w-6 h-6 rounded-full bg-white border-2 border-forest-700 flex items-center justify-center shadow-xs">
                  <div className="w-2 h-2 rounded-full bg-forest-700" />
                </div>

                <div className="bg-white p-7 sm:p-9 rounded-3xl border border-[#D8DFD5] hover:border-forest-600/40 transition-all shadow-sm hover:shadow-card-hover">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-[#D8DFD5]">
                    <div>
                      <div className="text-xs font-mono text-forest-700 font-bold uppercase tracking-wider mb-1">
                         Undergraduate Engineering
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-[#142019] tracking-tight">
                        {PERSONAL_INFO.education.institution}
                      </h3>
                      <p className="text-sm font-semibold text-forest-800 mt-0.5">
                        {PERSONAL_INFO.education.degree}
                      </p>
                    </div>

                    <div className="text-left sm:text-right shrink-0">
                      <span className="px-3 py-1 rounded-xl text-xs font-mono bg-[#F1F4EE] text-[#142019] border border-[#D8DFD5]">
                        {PERSONAL_INFO.education.period}
                      </span>
                      <div className="text-xs font-mono text-forest-800 mt-2 font-bold">
                        CGPA: {PERSONAL_INFO.education.cgpa}
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-[#44544A] leading-relaxed font-sans">
                    Rigorous engineering curriculum developing structural problem-solving capability, database engineering principles, signals, and statistical reasoning directly relevant to data analytics and business intelligence.
                  </p>
                </div>
              </motion.div>

              {/* Schooling Highlights */}
              <motion.div
                initial={{ opacity: 0, x: -25 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="relative group"
              >
                {/* Node marker */}
                <div className="absolute -left-[41px] sm:-left-[57px] top-1.5 w-6 h-6 rounded-full bg-white border-2 border-stone-400 flex items-center justify-center shadow-xs">
                  <div className="w-2 h-2 rounded-full bg-stone-400" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {PERSONAL_INFO.education.schooling.map((sch, idx) => (
                    <div key={idx} className="p-5 rounded-2xl bg-white border border-[#D8DFD5] shadow-xs hover:border-forest-600/30 transition-colors">
                      <div className="flex items-center gap-1.5 text-xs font-mono text-[#6C7D73] mb-1.5">
                        <School className="w-3.5 h-3.5 text-forest-700" />
                        {sch.year}
                      </div>
                      <div className="text-sm font-bold text-[#142019] mb-0.5">{sch.level}</div>
                      <div className="text-xs text-[#44544A] mb-3 line-clamp-1">{sch.school}</div>
                      <div className="text-xs font-mono text-forest-800 font-bold bg-forest-50 px-2.5 py-1 rounded-lg inline-block border border-forest-600/20">
                        Score: {sch.score}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

            </div>
          </div>

          {/* Industry Certifications (Right Column: 5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-50 border border-forest-600/25 text-xs font-mono text-forest-800 font-semibold shadow-xs">
              <Award className="w-3.5 h-3.5 text-forest-700" />
              VERIFIED CREDENTIALS
            </div>
            <h3 className="text-2xl font-bold text-[#142019] tracking-tight">
              Professional Certifications
            </h3>

            <div className="space-y-4">
              {CERTIFICATIONS.map((cert, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="bg-white p-6 rounded-2xl border border-[#D8DFD5] hover:border-forest-600/40 hover:shadow-card transition-all shadow-sm flex items-start gap-4"
                >
                  <div className="w-12 h-12 rounded-2xl bg-forest-50 border border-forest-600/20 flex items-center justify-center shrink-0 text-forest-800 shadow-2xs">
                    <Award className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-mono text-forest-700 font-bold">{cert.issuer}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-forest-50 text-forest-800 border border-forest-600/20 font-bold">
                        {cert.status}
                      </span>
                    </div>
                    <h4 className="text-base font-bold text-[#142019]">{cert.title}</h4>
                    <div className="text-xs text-[#6C7D73] mt-1 font-mono">{cert.date}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Micro Continuous Learning Callout */}
            <div className="p-5 rounded-2xl bg-forest-50 border border-forest-600/25 text-xs text-[#44544A] leading-relaxed">
              <div className="flex items-center gap-2 text-forest-800 font-bold mb-1.5 font-mono">
                <Sparkles className="w-4 h-4 text-forest-700" />
                Continuous Upskilling
              </div>
              <p className="font-sans">
                Actively expanding expertise across modern cloud warehouses, advanced DAX time intelligence functions, and production data validation workflows.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
