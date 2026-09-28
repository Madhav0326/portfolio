'use client';

import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { PERSONAL_INFO } from '@/data/portfolioData';
import { DataNetworkCanvas } from './DataNetworkCanvas';
import {
  ArrowRight,
  FileText,
  TrendingUp,
  Activity,
  ShieldCheck,
  MapPin,
  Sparkles,
  BarChart3,
  Terminal,
  Clock,
  CheckCircle2,
  Database,
  Layers,
  ArrowUpRight
} from 'lucide-react';

export const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLElement | null>(null);

  // 3D Perspective Tilt Values for Dashboard Preview Widget
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 180 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [7, -7]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), springConfig);

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleCardMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Headline words for staggered choreographic entrance
  const headlineWords = [
    { text: "I turn complex data", highlight: false },
    { text: " into ", highlight: false },
    { text: "clear insights", highlight: true },
    { text: " and smarter business decisions.", highlight: false },
  ];

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-[96vh] pt-32 pb-20 flex items-center justify-center overflow-hidden bg-[#F8FAF7]"
    >
      {/* Generative Interactive Data Network Canvas */}
      <DataNetworkCanvas />

      {/* Atmospheric Radial Gradient Lighting */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-forest-200/35 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-[480px] h-[480px] bg-amberGold-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-1/3 w-80 h-80 bg-tealRich-100/30 rounded-full blur-3xl pointer-events-none" />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-command-grid opacity-70 pointer-events-none" />

      <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">

          {/* Left Column: Choreographed Typography & Narrative */}
          <div className="lg:col-span-7 flex flex-col items-start">
            
            {/* Live Status Pill with Pulse Radar */}
            <motion.div
              initial={{ opacity: 0, y: -16, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest-50/90 border border-forest-600/25 text-xs font-mono text-forest-800 mb-6 shadow-sm backdrop-blur-md"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-forest-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-forest-700" />
              </span>
              <span className="font-semibold tracking-tight">Junior Data Analyst Intern</span>
              <span className="text-stone-400">@</span>
              <span className="font-bold text-forest-900">Darwix AI</span>
            </motion.div>

            {/* Candidate Identity Strip */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="mb-4"
            >
              <div className="text-xs sm:text-sm font-mono uppercase tracking-widest text-forest-700 font-bold flex items-center gap-2">
                <span className="w-4 h-[2px] bg-forest-600" />
                {PERSONAL_INFO.name}
              </div>
              <div className="text-sm sm:text-base font-mono text-stone-600 font-medium mt-1">
                {PERSONAL_INFO.title}
              </div>
            </motion.div>

            {/* Choreographed Headline Reveal */}
            <h1 className="text-3xl sm:text-5xl lg:text-[3.75rem] font-extrabold text-charcoal-900 tracking-tight leading-[1.12] mb-6">
              {headlineWords.map((part, idx) => (
                <motion.span
                  key={idx}
                  initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{
                    duration: 0.65,
                    delay: 0.2 + idx * 0.12,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className={part.highlight ? "text-forest-800 underline decoration-forest-400/40 decoration-4 underline-offset-4" : ""}
                >
                  {part.text}
                </motion.span>
              ))}
            </h1>

            {/* Analytics Value Proposition & Introduction */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-base sm:text-lg text-stone-600 mb-8 max-w-2xl leading-relaxed font-sans"
            >
              Specializing in translating raw operational records and stakeholder requirements into measurable KPIs, automated pipelines, and interactive dashboards using{' '}
              <span className="text-charcoal-900 font-mono font-semibold bg-forest-50 px-1.5 py-0.5 rounded border border-forest-600/20">SQL</span>,{' '}
              <span className="text-charcoal-900 font-mono font-semibold bg-forest-50 px-1.5 py-0.5 rounded border border-forest-600/20">Power BI</span>,{' '}
              <span className="text-charcoal-900 font-mono font-semibold bg-forest-50 px-1.5 py-0.5 rounded border border-forest-600/20">Python</span>,{' '}
              <span className="text-charcoal-900 font-mono font-semibold bg-forest-50 px-1.5 py-0.5 rounded border border-forest-600/20">Excel</span>, and{' '}
              <span className="text-charcoal-900 font-mono font-semibold bg-forest-50 px-1.5 py-0.5 rounded border border-forest-600/20">Tableau</span>. Practical experience reconciling 12,000+ lead and AI call logs at Darwix AI and analyzing product conversion funnels at ToffeeTeens.
            </motion.p>

            {/* Location & Academic Metadata Pills */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.75 }}
              className="flex flex-wrap items-center gap-3 mb-9 text-xs font-mono text-stone-600"
            >
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/90 border border-warm-border shadow-xs backdrop-blur-sm">
                <MapPin className="w-3.5 h-3.5 text-forest-700" />
                {PERSONAL_INFO.location} ({PERSONAL_INFO.relocation})
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/90 border border-warm-border shadow-xs backdrop-blur-sm">
                <Sparkles className="w-3.5 h-3.5 text-amberGold-600" />
                NIT Andhra Pradesh (B.Tech ECE &apos;26)
              </span>
            </motion.div>

            {/* Interactive CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.85 }}
              className="flex flex-wrap items-center gap-4 w-full sm:w-auto"
            >
              <a
                href="#projects"
                className="group relative flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl font-semibold text-sm bg-forest-800 text-white hover:bg-forest-900 transition-all duration-300 shadow-md hover:shadow-glow-emerald w-full sm:w-auto overflow-hidden"
              >
                <span className="relative z-10">Explore Analytics Showcase</span>
                <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-r from-forest-700 to-forest-900 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>

              <a
                href="/Nadukuru Madhav Mukesh Resume.pdf"
                download="Nadukuru Madhav Mukesh Resume.pdf"
                className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-mono text-sm border border-warm-borderStrong bg-white text-stone-800 hover:border-forest-700 hover:text-forest-800 transition-all w-full sm:w-auto shadow-xs hover:shadow-sm"
              >
                <FileText className="w-4 h-4 text-forest-700" />
                Download Resume
              </a>

              <a
                href="#contact"
                className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm border border-warm-border bg-white/80 text-stone-700 hover:bg-warm-150 transition-all w-full sm:w-auto shadow-xs"
              >
                Get in Touch
              </a>
            </motion.div>

            {/* Key Verified Metrics Strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 1 }}
              className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-warm-border w-full"
            >
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold font-mono text-charcoal-900">12,000+</div>
                <div className="text-xs text-stone-500 font-sans mt-0.5">Call Logs Reconciled (Darwix AI)</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold font-mono text-charcoal-900">5,000+</div>
                <div className="text-xs text-stone-500 font-sans mt-0.5">Booking Records (ToffeeTeens)</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold font-mono text-charcoal-900">4-Page</div>
                <div className="text-xs text-stone-500 font-sans mt-0.5">Power BI Omni Suite (MaDIq Labs)</div>
              </div>
            </motion.div>

          </div>

          {/* Right Column: Layered 3D Perspective Command Center Preview */}
          <div className="lg:col-span-5 relative perspective-1500">
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              style={{
                rotateX,
                rotateY,
                transformStyle: 'preserve-3d',
              }}
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              className="relative rounded-2xl bg-white/95 p-6 border border-warm-borderStrong shadow-stage backdrop-blur-xl transition-shadow duration-300"
            >
              {/* Subtle Ambient Back-Glow */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-forest-500/20 via-tealRich-500/15 to-amberGold-500/15 blur-xl -z-10" />

              {/* Top Window Bar */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-warm-border">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
                  <span className="ml-2 text-xs font-mono text-charcoal-800 flex items-center gap-1.5 font-bold">
                    <Terminal className="w-3.5 h-3.5 text-forest-700" />
                    Telephony KPI Engine
                  </span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amberGold-100 text-amberGold-900 border border-amberGold-200 font-bold">
                  ILLUSTRATIVE SYNTHETIC DATA
                </span>
              </div>

              {/* 4 Telemetry Metric Tiles */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-warm-50 border border-warm-border rounded-xl p-3 hover:border-forest-600/40 transition-colors">
                  <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
                    <span>Connection Rate</span>
                    <Activity className="w-3.5 h-3.5 text-forest-700" />
                  </div>
                  <div className="text-xl font-bold font-mono text-charcoal-900">79.0%</div>
                  <div className="text-[10px] text-forest-700 mt-1 flex items-center gap-1 font-semibold">
                    <TrendingUp className="w-3 h-3" /> +4.2% MoM Lift
                  </div>
                </div>

                <div className="bg-warm-50 border border-warm-border rounded-xl p-3 hover:border-forest-600/40 transition-colors">
                  <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
                    <span>Reconciled Logs</span>
                    <ShieldCheck className="w-3.5 h-3.5 text-tealRich-700" />
                  </div>
                  <div className="text-xl font-bold font-mono text-charcoal-900">12,450</div>
                  <div className="text-[10px] text-stone-500 mt-1 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-forest-700" /> 100% Consistency
                  </div>
                </div>

                <div className="bg-warm-50 border border-warm-border rounded-xl p-3 hover:border-forest-600/40 transition-colors">
                  <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
                    <span>Reachability Score</span>
                    <BarChart3 className="w-3.5 h-3.5 text-forest-700" />
                  </div>
                  <div className="text-xl font-bold font-mono text-charcoal-900">81.2%</div>
                  <div className="text-[10px] text-stone-500 mt-1 font-mono">VoxIQ Engine</div>
                </div>

                <div className="bg-warm-50 border border-warm-border rounded-xl p-3 hover:border-forest-600/40 transition-colors">
                  <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
                    <span>Avg Duration</span>
                    <Clock className="w-3.5 h-3.5 text-amberGold-700" />
                  </div>
                  <div className="text-xl font-bold font-mono text-charcoal-900">2m 15s</div>
                  <div className="text-[10px] text-stone-500 mt-1 font-mono">SLA: &lt; 2m 30s</div>
                </div>
              </div>

              {/* Dynamic Animated Funnel Visual */}
              <div className="bg-warm-50 border border-warm-border rounded-xl p-4 mb-4">
                <div className="flex items-center justify-between mb-3 text-xs">
                  <span className="font-semibold text-charcoal-900 flex items-center gap-1.5">
                    <BarChart3 className="w-3.5 h-3.5 text-forest-700" />
                    Telephony Conversion Funnel
                  </span>
                  <span className="text-stone-500 font-mono text-[10px]">Synthetic Telemetry</span>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-[11px] font-mono text-stone-700 mb-1">
                      <span>Total Call Attempts</span>
                      <span className="font-bold">12,450</span>
                    </div>
                    <div className="w-full bg-warm-200 rounded-full h-2 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
                        className="bg-forest-800 h-full rounded-full"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] font-mono text-stone-700 mb-1">
                      <span>Successful Connections</span>
                      <span className="font-bold text-forest-800">9,840 (79.0%)</span>
                    </div>
                    <div className="w-full bg-warm-200 rounded-full h-2 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '79%' }}
                        transition={{ duration: 1.1, delay: 0.65, ease: 'easeOut' }}
                        className="bg-forest-600 h-full rounded-full"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] font-mono text-stone-700 mb-1">
                      <span>Engaged Conversations</span>
                      <span className="font-bold text-forest-700">3,062 (24.6%)</span>
                    </div>
                    <div className="w-full bg-warm-200 rounded-full h-2 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '24.6%' }}
                        transition={{ duration: 1.2, delay: 0.8, ease: 'easeOut' }}
                        className="bg-tealRich-600 h-full rounded-full"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Dynamic Telemetry Wave SVG Graphic */}
              <div className="bg-warm-100/70 border border-warm-border rounded-xl p-3 mb-4">
                <div className="flex items-center justify-between mb-1.5 text-[11px] font-mono text-stone-600">
                  <span className="flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-forest-700" />
                    Hourly Telephony Call Activity
                  </span>
                  <span className="text-[10px] text-forest-700 font-bold">LIVE METRIC STREAM</span>
                </div>
                <div className="h-10 w-full overflow-hidden">
                  <svg viewBox="0 0 300 40" className="w-full h-full stroke-forest-700 fill-none" preserveAspectRatio="none">
                    <motion.path
                      d="M0,20 Q30,5 60,25 T120,15 T180,30 T240,10 T300,20"
                      strokeWidth="2"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.8, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                    />
                  </svg>
                </div>
              </div>

              {/* Bottom Feature Callout */}
              <div className="p-3 rounded-xl bg-forest-50 border border-forest-600/25 text-xs text-stone-700 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-forest-700 shrink-0" />
                <span>
                  <strong className="text-charcoal-900 font-mono">Google Apps Script:</strong> Automated daily reporting workflows active.
                </span>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
