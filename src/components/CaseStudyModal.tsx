'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '@/data/portfolioData';
import { 
  X, 
  CheckCircle2, 
  AlertTriangle, 
  Code2, 
  Layers, 
  FileCode, 
  ExternalLink, 
  Github, 
  Info,
  Image as ImageIcon 
} from 'lucide-react';

interface CaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-stone-900/60 backdrop-blur-sm">
        
        {/* Backdrop click listener */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0"
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: 15 }}
          transition={{ duration: 0.25 }}
          className="relative z-10 w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-white border border-[#D8DFD5] rounded-2xl shadow-2xl text-[#142019] p-5 sm:p-8"
        >
          {/* Top Sticky Header */}
          <div className="flex items-start justify-between pb-6 mb-6 border-b border-[#D8DFD5] gap-4">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold bg-forest-50 text-forest-800 border border-forest-600/30">
                  {project.category}
                </span>
                {project.isProfessionalExp && (
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold bg-[#F1F4EE] text-[#44544A] border border-[#D8DFD5]">
                    Professional Experience
                  </span>
                )}
                <span className="text-xs font-mono text-[#6C7D73]">{project.year}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#142019] tracking-tight">{project.title}</h2>
              <p className="text-sm text-[#44544A]">{project.subtitle}</p>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-[#F8FAF7] border border-[#D8DFD5] text-[#6C7D73] hover:text-[#142019] hover:border-forest-700 transition-colors shrink-0 shadow-2xs cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Illustrative Synthetic Data Notice Banner */}
          {project.isIllustrativeData && (
            <div className="mb-6 p-3.5 rounded-xl bg-[#FEF3C7]/60 border border-[#FDE68A] flex items-start gap-3 text-xs text-stone-700">
              <Info className="w-4 h-4 text-[#92400E] shrink-0 mt-0.5" />
              <div>
                <strong className="text-stone-900 font-mono">Illustrative Synthetic Data:</strong>{' '}
                {project.dataNote || 'Synthetic datasets utilized for analytical framework visualization.'}
              </div>
            </div>
          )}

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
            {project.metrics.map((m, idx) => (
              <div key={idx} className="bg-[#F8FAF7] border border-[#D8DFD5] p-3.5 rounded-xl">
                <div className="text-[11px] text-[#57685D] font-mono mb-1">{m.label}</div>
                <div className="text-base sm:text-lg font-bold font-mono text-[#1B4332]">{m.value}</div>
              </div>
            ))}
          </div>

          {/* Screenshot Gallery / Visual Previews */}
          {project.screenshots && project.screenshots.length > 0 && (
            <div className="mb-8 space-y-4">
              <h3 className="text-sm font-bold text-[#142019] uppercase tracking-wider font-mono flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-[#1B4332]" />
                Dashboard &amp; Interface Previews
              </h3>
              <div className="grid grid-cols-1 gap-4">
                {project.screenshots.map((s, idx) => (
                  <div key={idx} className="rounded-xl overflow-hidden border border-[#D8DFD5] bg-[#F1F4EE]">
                    <div className="relative aspect-video w-full overflow-hidden bg-[#E2E8DF]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={s.url}
                        alt={s.caption}
                        className="w-full h-full object-contain object-top"
                      />
                    </div>
                    <div className="p-3 bg-[#F8FAF7] border-t border-[#D8DFD5] text-xs text-[#57685D] font-mono">
                      {s.caption}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Main Modal Body */}
          <div className="space-y-8">
            
            {/* Business Problem Statement */}
            <div className="bg-[#F8FAF7] border border-[#D8DFD5] p-5 rounded-xl">
              <h3 className="text-xs font-semibold font-mono text-[#1B4332] flex items-center gap-2 mb-2 tracking-wider">
                <AlertTriangle className="w-4 h-4" />
                BUSINESS PROBLEM STATEMENT
              </h3>
              <p className="text-sm text-[#3B4D41] leading-relaxed">
                {project.problemStatement}
              </p>
            </div>

            {/* Analytical Approach Steps */}
            <div>
              <h3 className="text-base font-bold text-[#142019] mb-4 flex items-center gap-2 font-mono">
                <Layers className="w-4 h-4 text-[#1B4332]" />
                ANALYTICAL &amp; MODELING APPROACH
              </h3>
              <div className="space-y-3">
                {project.approach.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-[#F8FAF7] border border-[#D8DFD5] text-sm">
                    <span className="w-6 h-6 rounded-full bg-[#E8F0EA] text-[#1B4332] font-mono text-xs flex items-center justify-center shrink-0 border border-[#C2D6C7] font-bold">
                      {idx + 1}
                    </span>
                    <span className="text-[#3B4D41] leading-relaxed">{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Measurable Outcomes */}
            <div>
              <h3 className="text-base font-bold text-[#142019] mb-4 flex items-center gap-2 font-mono">
                <CheckCircle2 className="w-4 h-4 text-[#1B4332]" />
                KEY MEASURABLE OUTCOMES
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.keyOutcomes.map((outcome, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-[#F8FAF7] border border-[#D8DFD5] flex items-start gap-2.5 text-xs text-[#3B4D41]">
                    <CheckCircle2 className="w-4 h-4 text-[#1B4332] shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{outcome}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Code Snippets Section (DAX or SQL) */}
            {project.daxOrSqlSnippets && project.daxOrSqlSnippets.length > 0 && (
              <div>
                <h3 className="text-base font-bold text-[#142019] mb-4 flex items-center gap-2 font-mono">
                  <Code2 className="w-4 h-4 text-[#1B4332]" />
                  KEY CODE &amp; MEASURE IMPLEMENTATION
                </h3>
                <div className="space-y-4">
                  {project.daxOrSqlSnippets.map((snippet, idx) => (
                    <div key={idx} className="bg-[#101713] border border-[#233329] rounded-xl overflow-hidden shadow-sm">
                      <div className="flex items-center justify-between px-4 py-2 bg-[#0C120F] border-b border-[#233329] text-xs font-mono text-[#A8BDB0]">
                        <span className="flex items-center gap-2">
                          <FileCode className="w-3.5 h-3.5 text-[#52B788]" />
                          {snippet.title}
                        </span>
                        <span className="text-[#76877B] uppercase">{snippet.language}</span>
                      </div>
                      <pre className="p-4 text-xs font-mono text-[#74C69D] overflow-x-auto leading-relaxed bg-[#101713]">
                        <code>{snippet.code}</code>
                      </pre>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tech Stack Tags */}
            <div className="pt-4 border-t border-[#D8DFD5] flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono text-[#57685D] mr-2">Technologies Used:</span>
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-md bg-[#F1F4EE] text-xs font-mono text-[#3B4D41] border border-[#D8DFD5]"
                >
                  {tag}
                </span>
              ))}
            </div>

          </div>

          {/* Modal Footer with External Links & Close Button */}
          <div className="mt-8 pt-6 border-t border-[#D8DFD5] flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-medium border border-[#D8DFD5] bg-white text-[#142019] hover:border-[#1B4332] hover:text-[#1B4332] transition-all shadow-xs"
                >
                  <Github className="w-3.5 h-3.5" />
                  GitHub Repository
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-medium border border-[#A3C4AF] bg-[#E8F0EA] text-[#1B4332] hover:bg-[#1B4332] hover:text-white transition-all shadow-xs"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Live Platform Demo
                </a>
              )}
            </div>

            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl font-semibold text-xs bg-[#1B4332] text-white hover:bg-[#143326] transition-all shadow-sm ml-auto cursor-pointer"
            >
              Close Case Study
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
