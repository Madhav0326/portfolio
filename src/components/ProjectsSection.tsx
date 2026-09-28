'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS, Project } from '@/data/portfolioData';
import { CaseStudyModal } from './CaseStudyModal';
import {
  ArrowUpRight,
  CheckCircle2,
  Lock,
  Github,
  ChevronLeft,
  ChevronRight,
  Code2,
  Activity,
  BarChart3,
  Calendar,
  Maximize2,
  Terminal,
  Database,
  Layers
} from 'lucide-react';

const getProjectNavLabel = (p: Project): string => {
  if (p.id === 'madiq-labs' || p.id.includes('madiq')) return 'MaDIq Labs';
  if (p.id === 'customer-churn' || p.id.includes('churn')) return 'Customer Churn';
  if (p.id === 'darwix-voice-dashboard' || p.id.includes('darwix')) return 'Darwix AI';
  if (p.id === 'ut-mart-sales' || p.id.includes('ut-mart')) return 'UT Mart';
  if (p.id === 'restaurant-ratings' || p.id.includes('restaurant')) return 'Restaurant Ratings';
  return p.title.split(':')[0].trim();
};

export const ProjectsSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [activeScreenshotIndex, setActiveScreenshotIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Filter analytics projects (CivicTrack is presented in its dedicated software showcase section)
  const analyticsProjects = PROJECTS.filter((p) => p.projectType === 'analytics');

  // Detect desktop screen width for pinned scroll
  useEffect(() => {
    const checkWidth = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    checkWidth();
    window.addEventListener('resize', checkWidth);
    return () => window.removeEventListener('resize', checkWidth);
  }, []);

  // Reset active screenshot index whenever active project changes
  useEffect(() => {
    setActiveScreenshotIndex(0);
  }, [activeProjectIndex]);

  // Robust, dynamic scroll progress calculation
  const handleScroll = useCallback(() => {
    if (!isDesktop || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const containerTop = window.scrollY + rect.top;
    const containerHeight = containerRef.current.offsetHeight;
    const scrollableDistance = containerHeight - window.innerHeight;

    if (scrollableDistance <= 0) return;

    const scrolled = window.scrollY - containerTop;
    const progress = Math.max(0, Math.min(0.9999, scrolled / scrollableDistance));
    setScrollProgress(progress);

    const total = analyticsProjects.length;
    const newIndex = Math.min(total - 1, Math.floor(progress * total));
    setActiveProjectIndex(newIndex);
  }, [isDesktop, analyticsProjects.length]);

  useEffect(() => {
    if (!isDesktop) return;

    let rafId: number;
    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [isDesktop, handleScroll]);

  const currentProject = analyticsProjects[activeProjectIndex] || analyticsProjects[0];

  // Jump to specific project
  const jumpToProject = (index: number) => {
    const safeIndex = Math.max(0, Math.min(analyticsProjects.length - 1, index));
    setActiveProjectIndex(safeIndex);

    if (isDesktop && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const containerTop = window.scrollY + rect.top;
      const containerHeight = containerRef.current.offsetHeight;
      const scrollableDistance = containerHeight - window.innerHeight;
      const total = analyticsProjects.length;
      const targetScroll = containerTop + ((safeIndex + 0.5) / total) * scrollableDistance;

      window.scrollTo({ top: targetScroll, behavior: 'smooth' });
    } else {
      const el = document.getElementById(`mobile-project-${safeIndex}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <section id="projects" className="relative bg-[#F1F4EE] text-[#142019] border-t border-[#D8DFD5]">
      
      {/* SECTION INTRO HEADER */}
      <div className="py-10 sm:py-12 px-4 sm:px-6 lg:px-8 xl:px-12 max-w-[1480px] mx-auto border-b border-[#D8DFD5] relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 sm:gap-6">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#142019] tracking-tight">
            Projects
          </h2>

          {/* Project jump navigation selector */}
          <div className="flex items-center gap-1.5 p-1.5 bg-white rounded-2xl border border-[#D8DFD5] shadow-xs overflow-x-auto max-w-full scrollbar-none">
            {analyticsProjects.map((p, idx) => {
              const label = getProjectNavLabel(p);
              const isActive = activeProjectIndex === idx;
              return (
                <button
                  key={p.id}
                  onClick={() => jumpToProject(idx)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer shrink-0 ${
                    isActive
                      ? 'bg-forest-800 text-white font-bold shadow-xs border border-forest-800'
                      : 'text-[#44544A] hover:text-[#142019] hover:bg-[#F8FAF7]'
                  }`}
                  aria-label={`Jump to project ${idx + 1}: ${p.title}`}
                >
                  <span className={isActive ? 'text-forest-200 font-bold' : 'text-[#6C7D73]'}>
                    0{idx + 1}
                  </span>
                  <span>{label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* DESKTOP PINNED STAGE (Screen width >= 1024px) */}
      {isDesktop ? (
        <div
          ref={containerRef}
          className="relative"
          style={{ height: `${(analyticsProjects.length + 1) * 100}vh` }}
        >
          {/* STICKY CONTAINER */}
          <div className="sticky top-0 h-screen w-full flex flex-col justify-center px-4 sm:px-6 lg:px-8 xl:px-12 py-8 overflow-hidden bg-[#F1F4EE]">
            
            {/* Ambient Lighting Accents */}
            <div className="absolute top-1/4 -right-20 w-[500px] h-[500px] bg-forest-200/35 rounded-full blur-[140px] pointer-events-none" />
            <div className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-amberGold-100/40 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-[1480px] w-full mx-auto relative z-10 flex flex-col justify-between h-[86vh] bg-white rounded-3xl border border-[#D8DFD5] p-6 lg:p-8 shadow-sm">
              
              {/* TOP STAGE STATUS BAR */}
              <div className="flex items-center justify-between pb-4 border-b border-[#D8DFD5]">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full text-xs font-mono bg-forest-50 border border-forest-600/30 text-forest-800 font-bold">
                    CASE STUDY 0{activeProjectIndex + 1} / 0{analyticsProjects.length}
                  </span>
                  <span className="text-sm font-mono text-[#44544A] font-medium hidden sm:inline">
                    {currentProject.title}
                  </span>
                </div>

                {/* Progress Indicators & Prev/Next Controls */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    {analyticsProjects.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => jumpToProject(idx)}
                        aria-label={`Jump to project ${idx + 1}`}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          activeProjectIndex === idx
                            ? 'w-8 bg-forest-800'
                            : 'w-2 bg-[#D0D7CC] hover:bg-forest-600'
                        }`}
                      />
                    ))}
                  </div>

                  <div className="flex items-center gap-1 ml-2">
                    <button
                      onClick={() => jumpToProject(activeProjectIndex - 1)}
                      disabled={activeProjectIndex === 0}
                      className="p-1.5 rounded-lg bg-[#F8FAF7] border border-[#D8DFD5] text-[#44544A] hover:text-[#142019] hover:border-forest-700 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                      aria-label="Previous project"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => jumpToProject(activeProjectIndex + 1)}
                      disabled={activeProjectIndex === analyticsProjects.length - 1}
                      className="p-1.5 rounded-lg bg-[#F8FAF7] border border-[#D8DFD5] text-[#44544A] hover:text-[#142019] hover:border-forest-700 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                      aria-label="Next project"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* MAIN DUAL-PANE SHOWCASE STAGE */}
              <div className="grid grid-cols-12 gap-8 items-center flex-1 my-4 overflow-hidden">
                
                {/* LEFT COLUMN: PROJECT NARRATIVE & METRICS */}
                <div className="col-span-5 flex flex-col justify-between h-full py-1 pr-4 overflow-y-auto scrollbar-none">
                  <div>
                    {/* Meta Pills */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-forest-50 text-forest-800 border border-forest-600/30">
                        {currentProject.category}
                      </span>
                      {currentProject.isProfessionalExp ? (
                        <span className="text-xs font-mono text-amberGold-800 flex items-center gap-1.5 bg-amberGold-50 px-2.5 py-1 rounded-full border border-amberGold-300 font-semibold">
                          <Lock className="w-3.5 h-3.5 text-amberGold-700" /> Professional Experience
                        </span>
                      ) : (
                        <span className="text-xs font-mono text-[#6C7D73] flex items-center gap-1 bg-[#F8FAF7] px-2.5 py-1 rounded-full border border-[#D8DFD5]">
                          <Calendar className="w-3 h-3 text-[#6C7D73]" /> {currentProject.year}
                        </span>
                      )}
                    </div>

                    {/* Title & Subtitle */}
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-[#142019] tracking-tight mb-2 leading-tight">
                      {currentProject.title}
                    </h3>
                    <p className="text-sm font-mono text-forest-700 mb-4 leading-snug">
                      {currentProject.subtitle}
                    </p>

                    {/* Problem Statement Box */}
                    <div className="p-3.5 rounded-xl bg-[#F8FAF7] border border-[#D8DFD5] mb-4">
                      <div className="text-[11px] font-mono text-[#6C7D73] uppercase tracking-wider mb-1 font-semibold">
                        Problem &amp; Analytical Objective
                      </div>
                      <p className="text-xs text-[#44544A] leading-relaxed">
                        {currentProject.problemStatement}
                      </p>
                    </div>

                    {/* Verified Outcomes Checklist */}
                    <div className="space-y-2 mb-4">
                      {currentProject.keyOutcomes.slice(0, 3).map((outcome, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs text-[#44544A] leading-relaxed">
                          <CheckCircle2 className="w-4 h-4 text-forest-700 shrink-0 mt-0.5" />
                          <span>{outcome}</span>
                        </div>
                      ))}
                    </div>

                    {/* Metrics Strip */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
                      {currentProject.metrics.map((m, idx) => (
                        <div key={idx} className="p-2.5 rounded-xl bg-[#F8FAF7] border border-[#D8DFD5]">
                          <div className="text-[10px] font-mono text-[#6C7D73] uppercase truncate font-medium">{m.label}</div>
                          <div className="text-sm font-mono font-bold text-forest-800 truncate">{m.value}</div>
                        </div>
                      ))}
                    </div>

                    {/* Tech Stack Pills */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {currentProject.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-0.5 rounded text-[10px] font-mono bg-[#F1F4EE] text-[#44544A] border border-[#D8DFD5]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-3 pt-3 border-t border-[#D8DFD5]">
                    <button
                      onClick={() => setSelectedProject(currentProject)}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-mono font-bold bg-forest-800 text-white hover:bg-forest-900 shadow-sm transition-all"
                    >
                      Deep-Dive Case Study
                      <ArrowUpRight className="w-4 h-4" />
                    </button>

                    {currentProject.githubUrl && (
                      <a
                        href={currentProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-mono bg-[#F8FAF7] hover:bg-[#F1F4EE] text-[#142019] border border-[#D8DFD5] transition-colors"
                      >
                        <Github className="w-4 h-4" />
                        Code Repository
                      </a>
                    )}
                  </div>
                </div>

                {/* RIGHT COLUMN: VISUAL WORKSTATION STAGE */}
                <div className="col-span-7 h-full flex items-center justify-center p-1">
                  <AnimatePresence mode="popLayout">
                    {/* SCENARIO A: Project has actual screenshot (MaDIq Labs, UT Mart, Restaurant Ratings) */}
                    {currentProject.image ? (
                      <motion.div
                        key={currentProject.id + '-image-stage'}
                        initial={{ opacity: 0, scale: 0.97 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.97 }}
                        transition={{ duration: 0.28, ease: 'easeOut' }}
                        className="w-full h-full flex flex-col justify-between bg-[#0F1C16] rounded-2xl border border-forest-800/40 p-4 shadow-xl relative overflow-hidden text-stone-200"
                      >
                        {/* Top screenshot bar & Multi-page tabs */}
                        <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10 gap-2">
                          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
                            {currentProject.screenshots && currentProject.screenshots.length > 1 ? (
                              currentProject.screenshots.map((s, idx) => (
                                <button
                                  key={idx}
                                  onClick={() => setActiveScreenshotIndex(idx)}
                                  className={`px-3 py-1 rounded-lg text-xs font-mono transition-all truncate max-w-[170px] ${
                                    activeScreenshotIndex === idx
                                      ? 'bg-forest-700 text-white font-bold shadow-xs'
                                      : 'bg-stone-800 text-stone-400 hover:text-white'
                                  }`}
                                >
                                  {`Page ${idx + 1}`}
                                </button>
                              ))
                            ) : (
                              <span className="text-xs font-mono text-stone-300 flex items-center gap-1.5">
                                <BarChart3 className="w-3.5 h-3.5 text-forest-400" />
                                Dashboard Overview
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            {currentProject.isIllustrativeData && (
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amberGold-950/80 text-amberGold-300 border border-amberGold-600/40 font-semibold">
                                SYNTHETIC DATA
                              </span>
                            )}
                            <button
                              onClick={() => setSelectedProject(currentProject)}
                              className="p-1.5 rounded-lg bg-stone-800 text-stone-300 hover:text-white transition-colors"
                              title="Full Screen Preview"
                            >
                              <Maximize2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* Large High-Res Screenshot Display */}
                        <div
                          className="relative flex-1 rounded-xl overflow-hidden bg-black/60 border border-white/10 flex items-center justify-center group cursor-pointer"
                          onClick={() => setSelectedProject(currentProject)}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={
                              currentProject.screenshots && currentProject.screenshots[activeScreenshotIndex]
                                ? currentProject.screenshots[activeScreenshotIndex].url
                                : currentProject.image
                            }
                            alt={currentProject.title}
                            className="w-full h-full object-contain group-hover:scale-[1.01] transition-transform duration-300"
                          />
                        </div>

                        {/* Caption bar */}
                        {currentProject.screenshots && currentProject.screenshots[activeScreenshotIndex] && (
                          <div className="pt-2 text-xs font-mono text-stone-400 line-clamp-1">
                            {currentProject.screenshots[activeScreenshotIndex].caption}
                          </div>
                        )}
                      </motion.div>
                    ) : (
                      /* SCENARIO B: TEXT / CODE / ARCHITECTURE STAGE (Customer Churn, Darwix AI) */
                      <motion.div
                        key={currentProject.id + '-text-stage'}
                        initial={{ opacity: 0, scale: 0.97 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.97 }}
                        transition={{ duration: 0.28, ease: 'easeOut' }}
                        className="w-full h-full flex flex-col justify-between bg-[#0F1C16] rounded-2xl border border-forest-800/40 p-6 shadow-xl relative overflow-hidden text-stone-200"
                      >
                        {/* Terminal Header */}
                        <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500/80" />
                            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                            <span className="ml-2 text-xs font-mono text-stone-200 font-bold flex items-center gap-2">
                              <Code2 className="w-4 h-4 text-forest-400" />
                              {currentProject.id === 'customer-churn' ? 'SQL Cohort Extraction Query' : 'Operational Telephony Architecture'}
                            </span>
                          </div>
                          <span className="text-[10px] font-mono px-2.5 py-0.5 rounded bg-forest-950 text-forest-300 border border-forest-600/40 font-semibold">
                            TECHNICAL ARCHITECTURE
                          </span>
                        </div>

                        {/* Code Editor or Operational Architecture Blueprint */}
                        {currentProject.daxOrSqlSnippets && currentProject.daxOrSqlSnippets.length > 0 ? (
                          <div className="flex-1 rounded-xl bg-black/60 p-4 border border-white/10 overflow-y-auto font-mono text-xs text-stone-300 leading-relaxed scrollbar-none">
                            <div className="text-[11px] text-forest-400 mb-2 font-bold flex items-center gap-1.5">
                              <Terminal className="w-3.5 h-3.5" />
                              {currentProject.daxOrSqlSnippets[0].title}
                            </div>
                            <pre className="text-stone-300 font-mono text-xs overflow-x-auto whitespace-pre">
                              <code>{currentProject.daxOrSqlSnippets[0].code}</code>
                            </pre>
                          </div>
                        ) : (
                          <div className="flex-1 rounded-xl bg-black/60 p-5 border border-white/10 flex flex-col justify-between">
                            <div>
                              <div className="text-xs font-mono text-forest-400 font-bold mb-3 flex items-center gap-2">
                                <Activity className="w-4 h-4" />
                                Operational Telephony &amp; Data Pipeline Architecture
                              </div>
                              <p className="text-xs text-stone-300 mb-4 leading-relaxed font-sans">
                                {currentProject.shortDescription}
                              </p>

                              <div className="grid grid-cols-2 gap-3 mb-4">
                                <div className="p-3 rounded-xl bg-stone-900 border border-white/10">
                                  <div className="text-[10px] font-mono text-stone-400">TELEPHONY SCOPE</div>
                                  <div className="text-base font-bold font-mono text-white mt-0.5">12,000+ Records</div>
                                  <div className="text-[11px] text-forest-400 mt-1 font-mono">Lead &amp; AI Call Logs</div>
                                </div>
                                <div className="p-3 rounded-xl bg-stone-900 border border-white/10">
                                  <div className="text-[10px] font-mono text-stone-400">AUTOMATION STACK</div>
                                  <div className="text-base font-bold font-mono text-white mt-0.5">Google Apps Script</div>
                                  <div className="text-[11px] text-tealRich-300 mt-1 font-mono">Automated Daily Reports</div>
                                </div>
                              </div>
                            </div>

                            <div className="p-3 rounded-xl bg-forest-950/80 border border-forest-600/30 text-xs text-forest-200 flex items-center gap-2">
                              <Activity className="w-4 h-4 text-forest-400 shrink-0" />
                              <span>Reconciled downstream reporting workflows to maintain strict data reliability.</span>
                            </div>
                          </div>
                        )}

                        {/* Bottom Metric Callout */}
                        <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono text-stone-400">
                          <span>Primary Focus</span>
                          <span className="text-forest-400 font-bold">{currentProject.category} Analytics</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

              </div>

              {/* BOTTOM STAGE NAVIGATOR */}
              <div className="pt-3 border-t border-[#D8DFD5] flex items-center justify-between text-xs font-mono text-[#6C7D73]">
                <div className="flex items-center gap-2">
                  <span>Scroll to explore projects</span>
                  <div className="w-24 h-1.5 bg-[#E2E7DE] rounded-full overflow-hidden hidden sm:block">
                    <div
                      className="h-full bg-forest-700 transition-all duration-150 rounded-full"
                      style={{ width: `${Math.round(scrollProgress * 100)}%` }}
                    />
                  </div>
                </div>
                <span className="text-forest-800 font-bold">
                  Project {activeProjectIndex + 1} of {analyticsProjects.length}
                </span>
              </div>

            </div>
          </div>
        </div>
      ) : (
        /* MOBILE & TABLET FALLBACK (< 1024px) */
        /* Clean touch-friendly sequential card presentation, without scroll traps */
        <div className="py-12 px-4 sm:px-6 max-w-3xl mx-auto space-y-10">
          {analyticsProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4 }}
              id={`mobile-project-${idx}`}
              className="bg-white rounded-2xl border border-[#D8DFD5] p-6 shadow-sm scroll-mt-28"
            >
              {/* Header */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-forest-50 text-forest-800 border border-forest-600/30">
                  {project.category}
                </span>
                <span className="text-xs font-mono text-[#6C7D73]">0{idx + 1} / 0{analyticsProjects.length}</span>
              </div>

              <h3 className="text-xl font-bold text-[#142019] mb-1">{project.title}</h3>
              <p className="text-xs text-forest-700 font-mono mb-4">{project.subtitle}</p>

              {/* Screenshot if available */}
              {project.image && (
                <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-[#0F1C16] border border-[#D8DFD5] mb-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  {project.isIllustrativeData && (
                    <span className="absolute top-2 right-2 px-2 py-0.5 rounded text-[9px] font-mono bg-black/80 text-amberGold-300 border border-amberGold-500/40">
                      SYNTHETIC DATA
                    </span>
                  )}
                </div>
              )}

              {/* Text-led snippet if no image */}
              {!project.image && project.daxOrSqlSnippets && project.daxOrSqlSnippets.length > 0 && (
                <div className="rounded-xl bg-[#0F1C16] p-3.5 border border-forest-800/40 mb-4 overflow-x-auto text-[11px] font-mono text-stone-200">
                  <div className="text-forest-400 font-bold mb-1.5">{project.daxOrSqlSnippets[0].title}</div>
                  <pre className="overflow-x-auto">
                    <code>{project.daxOrSqlSnippets[0].code}</code>
                  </pre>
                </div>
              )}

              <p className="text-xs text-[#44544A] mb-4 leading-relaxed font-sans">
                {project.shortDescription}
              </p>

              {/* Metrics */}
              <div className="grid grid-cols-2 gap-2 mb-4 p-3 rounded-xl bg-[#F8FAF7] border border-[#D8DFD5]">
                {project.metrics.slice(0, 2).map((m, mIdx) => (
                  <div key={mIdx}>
                    <div className="text-[10px] font-mono text-[#6C7D73] uppercase font-medium">{m.label}</div>
                    <div className="text-xs font-mono font-bold text-forest-800 truncate">{m.value}</div>
                  </div>
                ))}
              </div>

              {/* Outcomes */}
              <div className="space-y-1.5 mb-5">
                {project.keyOutcomes.slice(0, 2).map((outcome, oIdx) => (
                  <div key={oIdx} className="flex items-start gap-2 text-xs text-[#44544A]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-forest-700 shrink-0 mt-0.5" />
                    <span>{outcome}</span>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-[#D8DFD5] flex items-center justify-between">
                {project.githubUrl ? (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs font-mono text-[#44544A] hover:text-[#142019]"
                  >
                    <Github className="w-3.5 h-3.5" />
                    Code
                  </a>
                ) : (
                  <div />
                )}

                <button
                  onClick={() => setSelectedProject(project)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-mono font-bold bg-forest-800 text-white shadow-xs hover:bg-forest-900"
                >
                  Deep-Dive Case Study
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* CASE STUDY MODAL */}
      <CaseStudyModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
