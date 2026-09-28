'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, FileText, Sparkles } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Skills', href: '#skills' },
    { name: 'Analytics Lab', href: '#lab' },
    { name: 'Software Projects', href: '#technical-projects' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#F8FAF7]/90 backdrop-blur-xl border-b border-[#D8DFD5] py-3 shadow-xs'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 flex items-center justify-between">
        
        {/* Brand Logo & Name */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, '#hero')}
          className="flex items-center gap-3 group focus:outline-none"
        >
          <div className="w-10 h-10 rounded-2xl bg-white border border-[#D8DFD5] flex items-center justify-center font-mono font-bold text-[#142019] shadow-xs group-hover:border-forest-700 transition-all">
            N<span className="text-forest-700">M</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-[#142019] tracking-tight group-hover:text-forest-800 transition-colors whitespace-nowrap">
              Nadukuru Madhav Mukesh
            </span>
            <span className="text-[11px] text-[#6C7D73] font-mono flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-forest-600 animate-pulse" />
              Data Analyst | BI
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-white/95 px-3.5 py-1.5 rounded-full border border-[#D8DFD5] shadow-xs backdrop-blur-md">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace('#', '');
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`px-3 py-1.5 rounded-full text-xs font-mono font-medium transition-all ${
                  isActive
                    ? 'text-white bg-forest-800 font-bold shadow-xs'
                    : 'text-[#44544A] hover:text-[#142019] hover:bg-[#F1F4EE]'
                }`}
              >
                {link.name}
              </a>
            );
          })}
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href="/Nadukuru Madhav Mukesh Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono border border-[#D8DFD5] bg-white text-[#142019] hover:border-forest-700 hover:text-forest-800 transition-all shadow-xs"
          >
            <FileText className="w-3.5 h-3.5 text-forest-700" />
            Resume
          </a>

          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-mono font-bold bg-forest-800 text-white hover:bg-forest-900 transition-all shadow-xs"
          >
            Get in Touch
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-xl bg-white border border-[#D8DFD5] text-[#142019] hover:text-forest-800 transition-colors shadow-xs"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Slide-down Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden bg-white/98 border-b border-[#D8DFD5] backdrop-blur-xl px-4 pt-4 pb-6 mt-2 shadow-lg"
          >
            <div className="flex flex-col gap-1.5">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.replace('#', '');
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`px-4 py-2.5 rounded-xl text-sm font-mono transition-all flex items-center justify-between ${
                      isActive
                        ? 'bg-forest-800 text-white font-bold'
                        : 'text-[#44544A] hover:bg-[#F1F4EE] hover:text-[#142019]'
                    }`}
                  >
                    {link.name}
                    {isActive && <Sparkles className="w-4 h-4 text-white" />}
                  </a>
                );
              })}

              <div className="pt-4 mt-2 border-t border-[#D8DFD5] flex flex-col gap-2">
                <a
                  href="/Nadukuru Madhav Mukesh Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-mono border border-[#D8DFD5] bg-white text-[#142019] shadow-xs"
                >
                  <FileText className="w-4 h-4 text-forest-700" />
                  Download Resume PDF
                </a>
                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, '#contact')}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-mono font-bold bg-forest-800 text-white shadow-xs"
                >
                  Get in Touch
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
