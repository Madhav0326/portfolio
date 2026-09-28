'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SKILL_CATEGORIES, SkillCategory, SkillItem } from '@/data/portfolioData';
import {
  BarChart3,
  PieChart,
  TrendingUp,
  Database,
  Zap,
  Terminal,
  CheckCircle2,
  Sparkles,
  Layers,
  ArrowRight,
  GitBranch,
  Network,
  Cpu
} from 'lucide-react';

// Comprehensive, verified mapping of where skills are applied across portfolio projects
const SKILL_APPLICATIONS: Record<string, { projects: string[]; related: string[] }> = {
  "SQL & MySQL": {
    projects: ["Customer Churn & Retention Analysis", "Darwix AI Telephony Data Validation", "UT Mart Basket Aggregation"],
    related: ["Data Modelling", "PostgreSQL", "Data Cleaning & Validation"]
  },
  "Python": {
    projects: ["ToffeeTeens Booking EDA & Funnel", "Exploratory Data Analysis"],
    related: ["Statistical Analysis", "Data Cleaning & Validation", "Product Metrics"]
  },
  "Exploratory Data Analysis (EDA)": {
    projects: ["Restaurant Ratings & Consumer Analysis", "ToffeeTeens User Booking Records"],
    related: ["Python", "Statistical Analysis", "Data Visualization"]
  },
  "Data Cleaning & Validation": {
    projects: ["Darwix AI 12,000+ Lead and Call Logs Reconciliation"],
    related: ["SQL & MySQL", "ETL Processes", "Python"]
  },
  "Statistical Analysis": {
    projects: ["Customer Churn Tenure Cohorts", "Darwix AI Reachability Statistics"],
    related: ["Python", "Exploratory Data Analysis (EDA)", "Business Performance Analysis"]
  },
  "Power BI": {
    projects: ["MaDIq Labs: Omni-Channel Analytics Suite", "Restaurant Ratings & Consumer Analysis"],
    related: ["DAX", "Power Query", "Data Modelling", "KPI Tracking & Reporting"]
  },
  "DAX": {
    projects: ["MaDIq Labs: Time Intelligence & MoM Growth %", "Dynamic Executive Narrative Measures"],
    related: ["Power BI", "KPI Tracking & Reporting", "Data Modelling"]
  },
  "Tableau": {
    projects: ["UT Mart Sales Analytics Dashboard"],
    related: ["Data Visualization", "KPI Tracking & Reporting", "Dashboard Development"]
  },
  "Power Query": {
    projects: ["MaDIq Labs Multi-Source Schema Mapping", "Automated Null & Type Enforcement"],
    related: ["Power BI", "ETL Processes", "Data Cleaning & Validation"]
  },
  "Dashboard Development": {
    projects: ["MaDIq Labs 4-Page Executive Suite", "Darwix AI Voice Performance Dashboard"],
    related: ["Power BI", "Tableau", "Data Visualization"]
  },
  "KPI Tracking & Reporting": {
    projects: ["Darwix AI Operational Reachability Score", "MaDIq Labs Executive Overview"],
    related: ["Power BI", "Tableau", "DAX", "Reporting Automation"]
  },
  "Data Visualization": {
    projects: ["UT Mart Dual-Axis & Map Charts", "MaDIq Labs Day-Hour Heatmap"],
    related: ["Power BI", "Tableau", "Dashboard Development"]
  },
  "Customer Segmentation": {
    projects: ["Customer Churn Contract & Tenure Cohorts", "ToffeeTeens Booking Frequency"],
    related: ["Retention & Churn Analysis", "Funnel Analysis", "SQL & MySQL"]
  },
  "Funnel Analysis": {
    projects: ["ToffeeTeens User Booking Progression Funnel", "MaDIq Labs Lead-to-Sale Conversion"],
    related: ["Retention & Churn Analysis", "Product Metrics", "Customer Segmentation"]
  },
  "Retention & Churn Analysis": {
    projects: ["Customer Churn 7,000+ Contract Records Analysis"],
    related: ["Customer Segmentation", "Funnel Analysis", "SQL & MySQL"]
  },
  "Product Metrics": {
    projects: ["ToffeeTeens Monthly Active Users (MAU)", "SalesIQ AI Adoption Rate"],
    related: ["Funnel Analysis", "Operational Analytics", "KPI Tracking & Reporting"]
  },
  "Operational Analytics": {
    projects: ["Darwix AI 12,000+ AI Voice Telephony Logs", "Retry Pattern Diagnostics"],
    related: ["Business Performance Analysis", "Google Apps Script", "KPI Tracking & Reporting"]
  },
  "Business Performance Analysis": {
    projects: ["MaDIq Labs Executive Overview", "UT Mart Regional Profit Analysis"],
    related: ["KPI Tracking & Reporting", "Operational Analytics", "Power BI"]
  },
  "Data Modelling": {
    projects: ["MaDIq Labs Star Schema Architecture", "CivicTrack Relational Schema"],
    related: ["Power BI", "SQL & MySQL", "OLTP & OLAP"]
  },
  "ETL Processes": {
    projects: ["Darwix AI Telephony Log Ingestion", "MaDIq Labs Power Query Pipeline"],
    related: ["Data Cleaning & Validation", "Power Query", "SQL & MySQL"]
  },
  "Data Warehousing Principles": {
    projects: ["MaDIq Labs Shared Dimension Tables", "Analytical Fact Table Separation"],
    related: ["Data Modelling", "OLTP & OLAP", "SQL & MySQL"]
  },
  "OLTP & OLAP": {
    projects: ["CivicTrack Operational Database vs. Analytical Reporting"],
    related: ["Data Warehousing Principles", "Data Modelling", "PostgreSQL"]
  },
  "PostgreSQL": {
    projects: ["CivicTrack Full-Stack Database & RLS Schema"],
    related: ["SQL & MySQL", "Data Modelling", "OLTP & OLAP"]
  },
  "Advanced Excel": {
    projects: ["Darwix AI Telephony Reconciliations", "Customer Churn Cohort Modeling"],
    related: ["Reporting Automation", "Google Apps Script", "Power BI"]
  },
  "Google Apps Script": {
    projects: ["Darwix AI Daily Operational Reporting Automation"],
    related: ["Reporting Automation", "Advanced Excel", "Operational Analytics"]
  },
  "Reporting Automation": {
    projects: ["Darwix AI Automated Telephony Pipeline", "Google Sheets Email Alerts"],
    related: ["Google Apps Script", "Advanced Excel", "KPI Tracking & Reporting"]
  },
  "Stakeholder Communication": {
    projects: ["Darwix AI Cross-functional Telephony Bug Triage", "ToffeeTeens Product Reviews"],
    related: ["Business Performance Analysis", "KPI Tracking & Reporting", "Dashboard Development"]
  }
};

const getCategoryIcon = (iconName: string) => {
  switch (iconName) {
    case 'BarChart3': return BarChart3;
    case 'PieChart': return PieChart;
    case 'TrendingUp': return TrendingUp;
    case 'Database': return Database;
    case 'Zap': return Zap;
    default: return Terminal;
  }
};

const findCategoryForSkill = (skillName: string): string | null => {
  for (const cat of SKILL_CATEGORIES) {
    if (cat.skills.some(s => s.name === skillName)) {
      return cat.title;
    }
  }
  return null;
};

export const SkillsSection: React.FC = () => {
  const [activeCategoryTitle, setActiveCategoryTitle] = useState<string>('Business Intelligence');
  const [selectedSkillName, setSelectedSkillName] = useState<string>('Power BI');
  const [hoveredSkillName, setHoveredSkillName] = useState<string | null>(null);

  const currentCategory = useMemo(() => {
    return SKILL_CATEGORIES.find(c => c.title === activeCategoryTitle) || SKILL_CATEGORIES[0];
  }, [activeCategoryTitle]);

  const currentSkillItem = useMemo(() => {
    // Look in current category first, then anywhere
    const inCurrent = currentCategory.skills.find(s => s.name === selectedSkillName);
    if (inCurrent) return inCurrent;
    for (const cat of SKILL_CATEGORIES) {
      const match = cat.skills.find(s => s.name === selectedSkillName);
      if (match) return match;
    }
    return currentCategory.skills[0];
  }, [currentCategory, selectedSkillName]);

  const activeApplicationData = useMemo(() => {
    return SKILL_APPLICATIONS[currentSkillItem.name] || {
      projects: ["Applied across portfolio projects and production analytics workflows"],
      related: ["SQL & MySQL", "Power BI", "Advanced Excel"]
    };
  }, [currentSkillItem.name]);

  const handleCategorySwitch = (categoryTitle: string) => {
    setActiveCategoryTitle(categoryTitle);
    const cat = SKILL_CATEGORIES.find(c => c.title === categoryTitle);
    if (cat && cat.skills.length > 0) {
      setSelectedSkillName(cat.skills[0].name);
    }
  };

  const handleSkillSelect = (skillName: string) => {
    const catTitle = findCategoryForSkill(skillName);
    if (catTitle && catTitle !== activeCategoryTitle) {
      setActiveCategoryTitle(catTitle);
    }
    setSelectedSkillName(skillName);
  };

  // Node orbital positioning calculation for harmonic constellation (Desktop)
  const skillsCount = currentCategory.skills.length;
  const nodes = useMemo(() => {
    // rx and ry scaled to keep buttons with up to 30 chars safely inside card boundaries
    const rx = 29; // horizontal radius %
    const ry = 28; // vertical radius %
    return currentCategory.skills.map((skill, index) => {
      // For 6 nodes (Business & Product Analytics), applying the PI/skillsCount (30°) offset forces
      // two wide labels (e.g., "Business Performance Analysis" and "Customer Segmentation") side-by-side
      // at 11 o'clock and 1 o'clock sharing y=25.75%, which causes them to collide horizontally.
      // Setting offset = 0 creates a clean, symmetrical pointy-top hexagon with a single centered node
      // at 12 o'clock, one at 6 o'clock, and well-spaced flank nodes at 2, 4, 8, and 10 o'clock with zero overlap.
      const offset = skillsCount === 6 ? 0 : Math.PI / skillsCount;
      const angle = (2 * Math.PI * index) / skillsCount - Math.PI / 2 + offset;
      const x = 50 + rx * Math.cos(angle);
      const y = 50 + ry * Math.sin(angle);
      return { skill, x, y };
    });
  }, [currentCategory, skillsCount]);

  const ActiveCategoryIcon = getCategoryIcon(currentCategory.iconName);

  return (
    <section id="skills" className="py-12 sm:py-16 relative bg-[#F1F4EE] border-t border-[#D8DFD5]">
      {/* Subtle Background Lighting Accent */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-forest-200/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-amberGold-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        
        {/* COMPACT SECTION HEADER WITH INTEGRATED CATEGORY SWITCHER */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 sm:gap-6 mb-8 pb-6 border-b border-[#D8DFD5]">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#142019] tracking-tight">
            Skills
          </h2>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 p-1.5 bg-white rounded-2xl border border-[#D8DFD5] shadow-xs overflow-x-auto max-w-full scrollbar-none">
            {SKILL_CATEGORIES.map((cat) => {
              const IconComp = getCategoryIcon(cat.iconName);
              const isActive = activeCategoryTitle === cat.title;

              return (
                <button
                  key={cat.title}
                  onClick={() => handleCategorySwitch(cat.title)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer shrink-0 ${
                    isActive
                      ? 'bg-forest-800 text-white font-bold shadow-xs border border-forest-800'
                      : 'text-[#44544A] hover:text-[#142019] hover:bg-[#F8FAF7]'
                  }`}
                  aria-label={`Select category: ${cat.title}`}
                >
                  <IconComp className={`w-3.5 h-3.5 ${isActive ? 'text-forest-200' : 'text-[#6C7D73]'}`} />
                  <span>{cat.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* DESKTOP CONSTELLATION & INSPECTOR WORKSPACE (Screen width >= 1024px) */}
        <div className="hidden lg:grid grid-cols-12 gap-6 items-stretch min-h-[460px]">
          
          {/* LEFT: INTERACTIVE SKILL CONSTELLATION MAP (7 Columns) */}
          <div className="col-span-7 bg-white rounded-3xl border border-[#D8DFD5] p-6 shadow-sm relative overflow-hidden flex flex-col justify-between select-none">
            
            {/* Background Ambient Glows */}
            <div className="absolute inset-0 bg-radial from-forest-50/40 via-transparent to-transparent pointer-events-none" />

            {/* Top Hint Bar */}
            <div className="relative z-10 flex items-center justify-between text-xs font-mono text-[#6C7D73] pb-2 border-b border-[#E8EEE4]">
              <span className="flex items-center gap-1.5 font-semibold text-forest-800">
                <Network className="w-3.5 h-3.5 text-forest-700" />
                {currentCategory.title} Matrix
              </span>
              <span>{skillsCount} competencies</span>
            </div>

            {/* CENTER HUB, SVG NETWORK & ORBITAL NODES WORKSPACE */}
            <div className="relative flex-1 w-full min-h-[380px] my-2">
              
              {/* SVG Connecting Vector Network & Orbit Rings - perfectly shares (50%, 50%) with HUB and nodes */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                {/* Outer Guide Orbit - passes directly through center of all nodes */}
                <ellipse
                  cx="50%"
                  cy="50%"
                  rx="29%"
                  ry="28%"
                  fill="none"
                  stroke="#D8DFD5"
                  strokeWidth="1"
                  strokeDasharray="4 6"
                />
                {/* Inner Guide Orbit */}
                <ellipse
                  cx="50%"
                  cy="50%"
                  rx="15%"
                  ry="14%"
                  fill="none"
                  stroke="#E8EEE4"
                  strokeWidth="1"
                  strokeDasharray="2 4"
                />

                {/* Dynamic Connection Lines from Center Hub (50%, 50%) to Orbit Node Centers (x%, y%) */}
                {nodes.map(({ skill, x, y }) => {
                  const isSelected = selectedSkillName === skill.name;
                  const isHovered = hoveredSkillName === skill.name;
                  const isLineActive = isSelected || isHovered;

                  return (
                    <line
                      key={skill.name}
                      x1="50%"
                      y1="50%"
                      x2={`${x}%`}
                      y2={`${y}%`}
                      stroke={isLineActive ? '#1B4332' : '#CBD6C7'}
                      strokeWidth={isLineActive ? 2.5 : 1.2}
                      strokeDasharray={isLineActive ? 'none' : '3 3'}
                      strokeOpacity={isLineActive ? 1 : 0.7}
                      className="transition-all duration-300"
                    />
                  );
                })}
              </svg>

              {/* CENTRAL CATEGORY HUB */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center justify-center pointer-events-none">
                <motion.div
                  key={currentCategory.title}
                  initial={{ scale: 0.85, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="w-16 h-16 rounded-2xl bg-forest-800 text-white flex flex-col items-center justify-center shadow-md border-2 border-forest-600/30"
                >
                  <ActiveCategoryIcon className="w-6 h-6 text-forest-100 mb-0.5" />
                  <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-forest-200">
                    HUB
                  </span>
                </motion.div>
              </div>

              {/* SATELLITE SKILL NODES */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentCategory.title}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0"
                >
                  {nodes.map(({ skill, x, y }, idx) => {
                    const isSelected = selectedSkillName === skill.name;
                    const isHovered = hoveredSkillName === skill.name;

                    return (
                      <div
                        key={skill.name}
                        className="absolute -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-auto"
                        style={{
                          left: `${x}%`,
                          top: `${y}%`
                        }}
                      >
                        <motion.div
                          initial={{ scale: 0.5, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{
                            type: 'spring',
                            stiffness: 300,
                            damping: 24,
                            delay: idx * 0.04
                          }}
                        >
                          <button
                            onClick={() => handleSkillSelect(skill.name)}
                            onMouseEnter={() => setHoveredSkillName(skill.name)}
                            onMouseLeave={() => setHoveredSkillName(null)}
                            className={`px-3 py-2 rounded-xl text-xs font-mono transition-all duration-200 flex items-center gap-2 cursor-pointer shadow-xs whitespace-nowrap ${
                              isSelected
                                ? 'bg-forest-800 text-white font-bold border-2 border-forest-700 shadow-md ring-4 ring-forest-600/20 scale-105'
                                : isHovered
                                ? 'bg-white text-forest-800 border-2 border-forest-600 shadow-sm scale-105'
                                : 'bg-white text-[#142019] border border-[#D8DFD5] hover:border-forest-600'
                            }`}
                            aria-label={`Select skill ${skill.name}`}
                          >
                            <span
                              className={`w-2 h-2 rounded-full shrink-0 ${
                                isSelected
                                  ? 'bg-forest-200'
                                  : skill.isKeyHighlight
                                  ? 'bg-forest-600'
                                  : 'bg-[#6C7D73]'
                              }`}
                            />
                            <span className="font-semibold">{skill.name}</span>
                            {skill.isKeyHighlight && (
                              <span
                                className={`px-1.5 py-0.2 rounded text-[9px] font-bold ${
                                  isSelected
                                    ? 'bg-forest-900 text-forest-200'
                                    : 'bg-forest-50 text-forest-800 border border-forest-600/20'
                                }`}
                              >
                                Core
                              </span>
                            )}
                          </button>
                        </motion.div>
                      </div>
                    );
                  })}
                </motion.div>
              </AnimatePresence>

            </div>

            {/* Bottom Subtext */}
            <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-[#6C7D73] pt-2 border-t border-[#E8EEE4]">
              <span>Click any skill node to inspect practical implementation</span>
              <span className="flex items-center gap-1 text-forest-800 font-semibold">
                Interactive Graph <Sparkles className="w-3 h-3 text-forest-700" />
              </span>
            </div>

          </div>

          {/* RIGHT: COMPACT DETAIL INSPECTOR (5 Columns) */}
          <div className="col-span-5 bg-white rounded-3xl border border-[#D8DFD5] p-6 shadow-sm flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSkillItem.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-5"
              >
                {/* Header Tag Bar */}
                <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#D8DFD5]">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-forest-50 text-forest-800 border border-forest-600/30">
                      {currentCategory.title}
                    </span>
                    {currentSkillItem.isKeyHighlight && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amberGold-50 text-amberGold-800 border border-amberGold-300">
                        Primary Proficiency
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] font-mono text-[#6C7D73]">Skill Detail</span>
                </div>

                {/* Skill Name & Summary */}
                <div>
                  <h3 className="text-2xl font-bold font-mono text-[#142019] tracking-tight">
                    {currentSkillItem.name}
                  </h3>
                  <p className="text-xs text-[#44544A] mt-2 leading-relaxed font-sans">
                    {currentSkillItem.description}
                  </p>
                </div>

                {/* Verified Project Applications */}
                <div>
                  <div className="text-[11px] font-mono text-[#6C7D73] uppercase tracking-wider mb-2 font-semibold flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-forest-700" />
                    Verified Project Applications
                  </div>
                  <div className="space-y-1.5">
                    {activeApplicationData.projects.map((proj, idx) => (
                      <div
                        key={idx}
                        className="px-3 py-2 rounded-xl bg-[#F8FAF7] border border-[#D8DFD5] text-xs font-mono text-[#142019] flex items-center gap-2 shadow-2xs"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-forest-700 shrink-0" />
                        <span className="truncate">{proj}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Connected Tool Network */}
                <div>
                  <div className="text-[11px] font-mono text-[#6C7D73] uppercase tracking-wider mb-2 font-semibold flex items-center gap-1.5">
                    <GitBranch className="w-3.5 h-3.5 text-forest-700" />
                    Connected Tool Network
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {activeApplicationData.related.map((rel, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSkillSelect(rel)}
                        className="px-2.5 py-1 rounded-lg text-xs font-mono border border-[#D8DFD5] bg-[#F1F4EE] hover:bg-forest-100 hover:text-forest-800 text-[#44544A] transition-colors cursor-pointer flex items-center gap-1"
                        aria-label={`View related skill: ${rel}`}
                      >
                        <span>{rel}</span>
                        <ArrowRight className="w-2.5 h-2.5 text-[#6C7D73]" />
                      </button>
                    ))}
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>

            {/* Bottom Status Footnote */}
            <div className="pt-4 border-t border-[#D8DFD5] text-[11px] font-mono text-[#6C7D73] flex items-center justify-between">
              <span>Applied in production & verified deliverables</span>
              <span className="text-forest-800 font-bold">100% Genuine</span>
            </div>

          </div>

        </div>

        {/* MOBILE & TABLET FALLBACK VIEWPORT (< 1024px) */}
        <div className="lg:hidden space-y-4">
          
          {/* Interactive Skills Chip Matrix */}
          <div className="bg-white rounded-2xl border border-[#D8DFD5] p-4 shadow-sm">
            <div className="text-xs font-mono text-[#6C7D73] mb-3 flex items-center justify-between">
              <span className="font-semibold text-forest-800 flex items-center gap-1.5">
                <ActiveCategoryIcon className="w-3.5 h-3.5 text-forest-700" />
                {currentCategory.title}
              </span>
              <span>{skillsCount} skills</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {currentCategory.skills.map((skill) => {
                const isSelected = selectedSkillName === skill.name;

                return (
                  <button
                    key={skill.name}
                    onClick={() => handleSkillSelect(skill.name)}
                    className={`px-3 py-2 rounded-xl text-xs font-mono transition-all flex items-center gap-1.5 shrink-0 ${
                      isSelected
                        ? 'bg-forest-800 text-white font-bold shadow-xs'
                        : 'bg-[#F8FAF7] text-[#142019] border border-[#D8DFD5]'
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-forest-200' : 'bg-[#6C7D73]'}`} />
                    <span>{skill.name}</span>
                    {skill.isKeyHighlight && (
                      <span className={`text-[9px] px-1 rounded ${isSelected ? 'bg-forest-900 text-forest-200' : 'bg-forest-100 text-forest-800'}`}>
                        Core
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Compact Mobile Inspector Card */}
          <div className="bg-white rounded-2xl border border-[#D8DFD5] p-5 shadow-sm space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-lg font-bold font-mono text-[#142019]">
                  {currentSkillItem.name}
                </h3>
                {currentSkillItem.isKeyHighlight && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-forest-50 text-forest-800 border border-forest-600/30">
                    Primary Core
                  </span>
                )}
              </div>
              <p className="text-xs text-[#44544A] leading-relaxed font-sans">
                {currentSkillItem.description}
              </p>
            </div>

            {/* Mobile Project Applications */}
            <div>
              <div className="text-[11px] font-mono text-[#6C7D73] uppercase tracking-wider mb-1.5 font-semibold">
                Verified Projects
              </div>
              <div className="space-y-1">
                {activeApplicationData.projects.map((proj, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 text-xs font-mono text-[#142019]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-forest-700 shrink-0" />
                    <span className="truncate">{proj}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile Connected Tools */}
            <div>
              <div className="text-[11px] font-mono text-[#6C7D73] uppercase tracking-wider mb-1.5 font-semibold">
                Connected Tools
              </div>
              <div className="flex flex-wrap gap-1.5">
                {activeApplicationData.related.map((rel, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSkillSelect(rel)}
                    className="px-2 py-0.5 rounded-lg text-[11px] font-mono border border-[#D8DFD5] bg-[#F1F4EE] text-[#44544A]"
                  >
                    {rel}
                  </button>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
