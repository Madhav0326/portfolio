'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Initializing Analytics Core...');
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      onComplete();
      return;
    }

    const steps = [
      { p: 25, text: 'Connecting Data Schemas...' },
      { p: 55, text: 'Loading 12,000+ Record Models...' },
      { p: 80, text: 'Validating DAX Measures & KPIs...' },
      { p: 100, text: 'Analytics Ready' },
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        setProgress(steps[currentStep].p);
        setStatusText(steps[currentStep].text);
        currentStep++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setIsFinished(true);
          setTimeout(onComplete, 400);
        }, 250);
      }
    }, 280);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#F8FAF7] text-[#142019] font-mono select-none"
        >
          <div className="relative z-10 flex flex-col items-center max-w-sm w-full px-6">
            {/* Logo Emblem */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="relative mb-6"
            >
              <div className="w-16 h-16 rounded-2xl bg-white border border-[#D8DFD5] flex items-center justify-center shadow-sm relative overflow-hidden">
                <span className="text-xl font-bold tracking-wider text-[#142019] font-mono">
                  N<span className="text-[#1B4332]">M</span>
                </span>
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#1B4332]"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-[#EBF3EE] px-2 py-0.5 rounded-full border border-[#C4D8CB] text-[9px] text-[#1B4332] font-semibold flex items-center gap-1 shadow-xs">
                <Activity className="w-2.5 h-2.5" />
                READY
              </div>
            </motion.div>

            {/* Name & Title */}
            <h1 className="text-base font-bold tracking-wide text-[#18201C] text-center mb-1">
              NADUKURU MADHAV MUKESH
            </h1>
            <p className="text-xs text-stone-500 mb-6 text-center tracking-wider uppercase font-sans">
              Data Analyst & BI Specialist
            </p>

            {/* Progress Bar Container */}
            <div className="w-full bg-[#EAEFE8] border border-[#DDE3DC] rounded-full p-0.5 mb-3 overflow-hidden shadow-inner">
              <motion.div
                className="h-1.5 rounded-full bg-[#1B4332]"
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: 'easeOut', duration: 0.25 }}
              />
            </div>

            {/* Status & % */}
            <div className="flex items-center justify-between w-full text-xs text-stone-500">
              <span className="truncate">{statusText}</span>
              <span className="font-bold text-[#1B4332] ml-2">{progress}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
