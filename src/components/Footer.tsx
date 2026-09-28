'use client';

import React from 'react';
import { PERSONAL_INFO } from '@/data/portfolioData';
import { Linkedin, Github, Mail, Phone, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0E1A14] border-t border-forest-800/30 py-12 text-[#8FA396] text-xs font-mono">
      <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand & Identity */}
        <div className="flex flex-col items-center md:items-start gap-1">
          <div className="flex items-center gap-2 text-white font-bold tracking-wider">
            <span className="w-2 h-2 rounded-full bg-forest-400 animate-pulse" />
            NADUKURU MADHAV MUKESH
          </div>
          <p className="text-[#6C8074] font-sans text-xs">
            Data Analyst | Business Analyst | BI &amp; Product Analytics &copy; {new Date().getFullYear()}
          </p>
        </div>

        {/* Social Icons & Back to top */}
        <div className="flex items-center gap-3">
          <a
            href={PERSONAL_INFO.linkedIn}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl bg-[#15241C] border border-forest-700/40 text-stone-200 hover:text-white hover:border-forest-500 shadow-sm transition-all"
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="w-4 h-4" />
          </a>

          <a
            href={PERSONAL_INFO.gitHub}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl bg-[#15241C] border border-forest-700/40 text-stone-200 hover:text-white hover:border-forest-500 shadow-sm transition-all"
            aria-label="GitHub Profile"
          >
            <Github className="w-4 h-4" />
          </a>

          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="p-2.5 rounded-xl bg-[#15241C] border border-forest-700/40 text-stone-200 hover:text-white hover:border-forest-500 shadow-sm transition-all"
            aria-label="Email"
          >
            <Mail className="w-4 h-4" />
          </a>

          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-xl bg-forest-800 hover:bg-forest-700 border border-forest-600/40 text-white shadow-sm transition-all ml-2 flex items-center gap-1.5 font-bold cursor-pointer"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
            <span className="hidden sm:inline">Top</span>
          </button>
        </div>

      </div>
    </footer>
  );
};
