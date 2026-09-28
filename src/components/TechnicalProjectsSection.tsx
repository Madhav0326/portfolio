'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PROJECTS, Project } from '@/data/portfolioData';
import { CaseStudyModal } from './CaseStudyModal';
import {
  Code2,
  Database,
  Shield,
  ExternalLink,
  Github,
  Terminal,
  Activity,
  Maximize2,
  ArrowUpRight
} from 'lucide-react';

export const TechnicalProjectsSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const softwareProjects = PROJECTS.filter((p) => p.projectType === 'software');
  const civicTrack = softwareProjects[0];

  if (!civicTrack) return null;

  const architectureLayers = [
    {
      title: "PostgreSQL & Database Design",
      icon: Database,
      tag: "Relational Schema",
      detail: "Normalized relational schemas on Supabase with Row Level Security (RLS) policies enforcing data authorization and query consistency."
    },
    {
      title: "Unique Lifecycle Tracking",
      icon: Terminal,
      tag: "CIV-AP-XXXXXX",
      detail: "Unique tracking ID generation engine tracking civic complaints across multi-stage lifecycles from submission to resolution."
    },
    {
      title: "Authentication & Verification",
      icon: Shield,
      tag: "Google OAuth",
      detail: "Secure client-side and server-side authentication workflows protecting community reports and preventing duplicate entries."
    },
    {
      title: "Aggregated Analytics Dashboards",
      icon: Activity,
      tag: "Regional Metrics",
      detail: "State-wise and district-wise aggregation dashboards calculating resolution velocity and category distributions."
    }
  ];

  return (
    <section id="technical-projects" className="py-28 relative bg-[#F1F4EE] text-[#142019] border-t border-[#D8DFD5] overflow-hidden">
      
      {/* Grid Pattern Atmosphere */}
      <div className="absolute inset-0 bg-command-grid opacity-60 pointer-events-none" />
      
      {/* Ambient Lighting Accents */}
      <div className="absolute top-1/4 -right-20 w-[500px] h-[500px] bg-forest-200/35 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-amberGold-100/40 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest-50 border border-forest-600/25 text-xs font-mono text-forest-800 mb-4 font-semibold shadow-xs">
              <Code2 className="w-3.5 h-3.5 text-forest-700" />
              SUPPORTING SOFTWARE PROJECT
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#142019] tracking-tight">
              Technical <span className="text-forest-800">Software Project</span>
            </h2>
            <p className="text-[#44544A] text-sm sm:text-base mt-3 max-w-2xl leading-relaxed font-sans">
              Full-stack application engineering demonstrating structured PostgreSQL schemas, Supabase RLS policies, and end-to-end software versatility that directly strengthens my data analytics capability.
            </p>
          </div>

          <div className="text-xs font-mono text-[#44544A] bg-white px-4 py-2 rounded-xl border border-[#D8DFD5] shadow-xs shrink-0">
            Secondary Supporting Project
          </div>
        </div>

        {/* Featured Technical Project Showcase Card */}
        <div className="bg-white rounded-3xl border border-[#D8DFD5] p-6 sm:p-10 shadow-sm hover:shadow-card-hover transition-all">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left: Project Narrative & Architecture Breakdown */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              <div>
                {/* Badges */}
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-forest-50 text-forest-800 border border-forest-600/30">
                    Full-Stack Development
                  </span>
                  <span className="text-xs font-mono text-[#44544A] px-2.5 py-0.5 rounded-md bg-[#F1F4EE] border border-[#D8DFD5]">
                    Supabase &amp; PostgreSQL
                  </span>
                  <span className="text-xs font-mono text-[#6C7D73]">{civicTrack.year}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-[#142019] tracking-tight mb-2">
                  {civicTrack.title}
                </h3>
                <p className="text-xs sm:text-sm font-mono text-forest-700 mb-5">
                  {civicTrack.subtitle}
                </p>

                <p className="text-xs sm:text-sm text-[#44544A] mb-6 leading-relaxed font-sans">
                  {civicTrack.shortDescription}
                </p>

                {/* 4 Architecture Pillars */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                  {architectureLayers.map((layer, idx) => {
                    const IconC = layer.icon;
                    return (
                      <div
                        key={idx}
                        className="p-3.5 rounded-2xl bg-[#F8FAF7] border border-[#D8DFD5] hover:border-forest-600/40 transition-colors"
                      >
                        <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#142019] mb-1">
                          <IconC className="w-3.5 h-3.5 text-forest-700 shrink-0" />
                          <span className="truncate">{layer.title}</span>
                        </div>
                        <p className="text-[11px] text-[#44544A] leading-snug font-sans">
                          {layer.detail}
                        </p>
                      </div>
                    );
                  })}
                </div>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-1.5 mb-8">
                  {civicTrack.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-lg text-[10px] font-mono bg-[#F1F4EE] text-[#44544A] border border-[#D8DFD5]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-[#D8DFD5]">
                {civicTrack.liveUrl && (
                  <a
                    href={civicTrack.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-mono font-bold bg-forest-800 hover:bg-forest-900 text-white transition-colors shadow-sm"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Live Platform (Vercel)
                  </a>
                )}

                {civicTrack.githubUrl && (
                  <a
                    href={civicTrack.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-mono font-bold bg-[#F8FAF7] hover:bg-[#F1F4EE] text-[#142019] border border-[#D8DFD5] transition-colors shadow-xs"
                  >
                    <Github className="w-4 h-4" />
                    GitHub Repository
                  </a>
                )}

                <button
                  onClick={() => setSelectedProject(civicTrack)}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-mono text-[#44544A] hover:text-[#142019] border border-[#D8DFD5] hover:bg-[#F1F4EE] transition-colors ml-auto"
                >
                  Technical Details
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Right: Verified Screenshots & Workstation Stage */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              <div className="rounded-2xl bg-[#0F1C16] p-4 border border-forest-800/40 shadow-xl text-stone-200">
                {/* Screenshot Switcher Tabs */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActiveImageIndex(0)}
                      className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                        activeImageIndex === 0
                          ? 'bg-forest-700 text-white font-bold'
                          : 'bg-stone-800 text-stone-400 hover:text-white'
                      }`}
                    >
                      Platform Interface
                    </button>
                    <button
                      onClick={() => setActiveImageIndex(1)}
                      className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                        activeImageIndex === 1
                          ? 'bg-forest-700 text-white font-bold'
                          : 'bg-stone-800 text-stone-400 hover:text-white'
                      }`}
                    >
                      Platform Statistics
                    </button>
                  </div>

                  <span className="text-[10px] font-mono text-stone-400">
                    Live Screenshots
                  </span>
                </div>

                {/* Screenshot Frame */}
                <div
                  className="relative aspect-video rounded-xl overflow-hidden bg-black/60 border border-white/10 cursor-pointer group"
                  onClick={() => setSelectedProject(civicTrack)}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={
                      activeImageIndex === 0
                        ? '/projects/civictrack/civictrack_hero.png'
                        : '/projects/civictrack/civictrack_stats.png'
                    }
                    alt={civicTrack.title}
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="px-3.5 py-1.5 rounded-lg bg-black/80 text-white text-xs font-mono flex items-center gap-1.5 border border-white/20">
                      <Maximize2 className="w-3.5 h-3.5" /> Click to Expand
                    </span>
                  </div>
                </div>

                <div className="pt-3 text-xs font-mono text-stone-400">
                  {activeImageIndex === 0
                    ? 'Citizen reporting form, issue verification, and unique tracking ID generation'
                    : 'Global platform analytics, resolved status ratios, and regional breakdown metrics'}
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Case Study Modal */}
      <CaseStudyModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
