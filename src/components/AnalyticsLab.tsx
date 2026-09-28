'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SAMPLE_LAB_DATA } from '@/data/portfolioData';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';
import {
  Sliders,
  Activity,
  TrendingUp,
  Terminal,
  Play,
  Database,
  Sparkles,
  Info,
  CheckCircle2,
  Clock,
  Layers
} from 'lucide-react';

export const AnalyticsLab: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<'All' | 'VoxIQ AI' | 'SalesIQ Lead Bot'>('All');
  const [activeTab, setActiveTab] = useState<'dashboard' | 'sql'>('dashboard');
  const [selectedQueryIndex, setSelectedQueryIndex] = useState(0);
  const [isExecuting, setIsExecuting] = useState(false);
  const [executionTime, setExecutionTime] = useState<number | null>(null);

  const sampleQueries = [
    {
      name: "Daily Conversion & Revenue Telemetry",
      sql: `SELECT 
    day, 
    calls, 
    connected, 
    conversions, 
    revenue,
    ROUND((connected * 1.0 / calls) * 100, 2) AS connection_rate_pct
FROM daily_telephony_logs
WHERE connected > 1000
ORDER BY revenue DESC;`,
      result: SAMPLE_LAB_DATA.dailyPerformance.map(d => ({
        Day: d.day,
        "Total Calls": d.calls,
        "Connected": d.connected,
        "Rate": `${((d.connected / d.calls) * 100).toFixed(1)}%`,
        "Revenue ($)": `$${d.revenue.toLocaleString()}`
      }))
    },
    {
      name: "Voice Agent Reachability & Satisfaction Comparison",
      sql: `SELECT 
    product, 
    attempts, 
    connected, 
    reachability, 
    avg_duration, 
    satisfaction
FROM ai_agent_metrics
GROUP BY product;`,
      result: SAMPLE_LAB_DATA.productComparison.map(p => ({
        Product: p.product,
        Attempts: p.attempts,
        Connected: p.connected,
        Reachability: p.reachability,
        "Avg Duration": p.avgTime,
        "Score": `${p.satisfaction} / 5.0`
      }))
    },
    {
      name: "Call Retry Attempt Distribution",
      sql: `SELECT 
    retry_attempt, 
    call_count, 
    percentage
FROM call_retry_analysis
ORDER BY retry_attempt ASC;`,
      result: SAMPLE_LAB_DATA.retryDistribution.map(r => ({
        "Retry Cohort": r.attempt,
        "Call Count": r.count,
        "Distribution %": `${r.percentage}%`
      }))
    }
  ];

  const handleExecuteQuery = () => {
    setIsExecuting(true);
    setTimeout(() => {
      setIsExecuting(false);
      setExecutionTime(Math.floor(Math.random() * 15) + 18);
    }, 350);
  };

  // Filtered telemetry data
  const filteredDailyData = SAMPLE_LAB_DATA.dailyPerformance.map(d => {
    if (selectedProduct === 'VoxIQ AI') {
      return { ...d, calls: Math.round(d.calls * 0.58), connected: Math.round(d.connected * 0.6), revenue: Math.round(d.revenue * 0.6) };
    }
    if (selectedProduct === 'SalesIQ Lead Bot') {
      return { ...d, calls: Math.round(d.calls * 0.42), connected: Math.round(d.connected * 0.4), revenue: Math.round(d.revenue * 0.4) };
    }
    return d;
  });

  return (
    <section id="lab" className="py-28 relative bg-[#F8FAF7] border-t border-[#D8DFD5]">
      
      {/* Background Lighting Accents */}
      <div className="absolute top-10 left-1/4 w-80 h-80 bg-forest-200/35 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-amberGold-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest-50 border border-forest-600/25 text-xs font-mono text-forest-800 mb-4 shadow-xs font-semibold">
              <Sliders className="w-3.5 h-3.5 text-forest-700" />
              ANALYTICS LAB
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#142019] tracking-tight">
              Interactive <span className="text-forest-800">Analytics Lab</span>
            </h2>
            <p className="text-[#44544A] text-sm sm:text-base mt-3 max-w-xl leading-relaxed font-sans">
              Experience dynamic telemetry filtering, responsive trend visualizations, and live SQL query execution simulations.
            </p>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex items-center gap-2 bg-white p-1.5 rounded-2xl border border-[#D8DFD5] shadow-xs">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-mono font-bold transition-all ${
                activeTab === 'dashboard'
                  ? 'bg-forest-800 text-white shadow-xs'
                  : 'text-[#44544A] hover:text-[#142019] hover:bg-[#F8FAF7]'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              Live Dashboard Telemetry
            </button>
            <button
              onClick={() => setActiveTab('sql')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-mono font-bold transition-all ${
                activeTab === 'sql'
                  ? 'bg-forest-800 text-white shadow-xs'
                  : 'text-[#44544A] hover:text-[#142019] hover:bg-[#F8FAF7]'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              SQL Sandbox Runner
            </button>
          </div>
        </div>

        {/* TAB 1: LIVE INTERACTIVE DASHBOARD */}
        {activeTab === 'dashboard' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white p-6 sm:p-10 rounded-3xl border border-[#D8DFD5] shadow-card"
          >
            {/* Top Control Strip */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-[#D8DFD5] gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono text-[#6C7D73] font-semibold mr-1">Product Telemetry Filter:</span>
                <div className="flex items-center gap-1.5 bg-[#F1F4EE] p-1.5 rounded-xl border border-[#D8DFD5]">
                  {(['All', 'VoxIQ AI', 'SalesIQ Lead Bot'] as const).map((prod) => (
                    <button
                      key={prod}
                      onClick={() => setSelectedProduct(prod)}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all ${
                        selectedProduct === prod
                          ? 'bg-forest-800 text-white font-bold shadow-xs'
                          : 'text-[#44544A] hover:text-[#142019]'
                      }`}
                    >
                      {prod}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-amberGold-900 bg-amberGold-100 px-3.5 py-1.5 rounded-xl border border-amberGold-200 font-bold">
                <Info className="w-4 h-4 text-amberGold-700" />
                ILLUSTRATIVE SYNTHETIC DATASET
              </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="p-5 rounded-2xl bg-[#F8FAF7] border border-[#D8DFD5] hover:border-forest-600/30 transition-colors">
                <div className="text-xs font-mono text-[#6C7D73] mb-1">Total Telephony Calls</div>
                <div className="text-2xl sm:text-3xl font-bold font-mono text-[#142019]">
                  {selectedProduct === 'All' ? '12,450' : selectedProduct === 'VoxIQ AI' ? '7,200' : '5,250'}
                </div>
                <div className="text-xs text-forest-700 font-mono mt-1 font-semibold">+14.2% MoM Volume Lift</div>
              </div>

              <div className="p-5 rounded-2xl bg-[#F8FAF7] border border-[#D8DFD5] hover:border-forest-600/30 transition-colors">
                <div className="text-xs font-mono text-[#6C7D73] mb-1">Connection Rate</div>
                <div className="text-2xl sm:text-3xl font-bold font-mono text-[#142019]">
                  {selectedProduct === 'All' ? '79.0%' : selectedProduct === 'VoxIQ AI' ? '81.0%' : '76.3%'}
                </div>
                <div className="text-xs text-forest-700 font-mono mt-1 font-semibold">Exceeds 75% SLA Target</div>
              </div>

              <div className="p-5 rounded-2xl bg-[#F8FAF7] border border-[#D8DFD5] hover:border-forest-600/30 transition-colors">
                <div className="text-xs font-mono text-[#6C7D73] mb-1">Lead Conversion Rate</div>
                <div className="text-2xl sm:text-3xl font-bold font-mono text-[#142019]">24.6%</div>
                <div className="text-xs text-forest-700 font-mono mt-1 font-semibold">+2.8% Conversion Lift</div>
              </div>

              <div className="p-5 rounded-2xl bg-[#F8FAF7] border border-[#D8DFD5] hover:border-forest-600/30 transition-colors">
                <div className="text-xs font-mono text-[#6C7D73] mb-1">Attributed Revenue</div>
                <div className="text-2xl sm:text-3xl font-bold font-mono text-[#142019]">
                  {selectedProduct === 'All' ? '$342,800' : selectedProduct === 'VoxIQ AI' ? '$205,680' : '$137,120'}
                </div>
                <div className="text-xs text-forest-700 font-mono mt-1 font-semibold">Pipeline Attribution</div>
              </div>
            </div>

            {/* Charts Visual Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Daily Calls Trend Area Chart */}
              <div className="lg:col-span-8 bg-[#F8FAF7] border border-[#D8DFD5] p-6 rounded-2xl">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-[#142019] font-mono flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-forest-700" />
                    Daily Call Volume &amp; Connected Telephony Trend
                  </h3>
                  <span className="text-xs text-[#6C7D73] font-mono">Past 7 Days</span>
                </div>
                <div className="h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={filteredDailyData}>
                      <defs>
                        <linearGradient id="callsGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#1B4332" stopOpacity={0.25} />
                          <stop offset="95%" stopColor="#1B4332" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="connectedGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#2D7356" stopOpacity={0.35} />
                          <stop offset="95%" stopColor="#2D7356" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#DDE3DC" />
                      <XAxis dataKey="day" stroke="#5C6B62" fontSize={12} tickLine={false} />
                      <YAxis stroke="#5C6B62" fontSize={12} tickLine={false} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#FFFFFF',
                          borderColor: '#D7DCD2',
                          color: '#151D18',
                          borderRadius: '1rem',
                          boxShadow: '0 8px 24px rgba(27,67,50,0.08)',
                          fontSize: '12px'
                        }}
                      />
                      <Area type="monotone" dataKey="calls" stroke="#1B4332" strokeWidth={2.5} fillOpacity={1} fill="url(#callsGrad)" name="Total Attempts" />
                      <Area type="monotone" dataKey="connected" stroke="#2D7356" strokeWidth={2.5} fillOpacity={1} fill="url(#connectedGrad)" name="Connected" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Retry Cohorts Bar Chart */}
              <div className="lg:col-span-4 bg-[#F8FAF7] border border-[#D8DFD5] p-6 rounded-2xl flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold text-[#142019] font-mono flex items-center gap-2 mb-1">
                    <Activity className="w-4 h-4 text-forest-700" />
                    Retry Timing Distribution
                  </h3>
                  <p className="text-xs text-[#6C7D73] mb-4 font-sans">Connection success by attempt sequence</p>

                  <div className="h-56 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={SAMPLE_LAB_DATA.retryDistribution} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" stroke="#DDE3DC" horizontal={false} />
                        <XAxis type="number" stroke="#5C6B62" fontSize={11} domain={[0, 70]} />
                        <YAxis type="category" dataKey="attempt" stroke="#5C6B62" fontSize={11} width={80} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: '#FFFFFF',
                            borderColor: '#D7DCD2',
                            color: '#151D18',
                            borderRadius: '0.75rem',
                            fontSize: '11px'
                          }}
                        />
                        <Bar dataKey="percentage" fill="#1B4332" radius={[0, 6, 6, 0]} name="Percentage (%)" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#D8DFD5] text-[11px] font-mono text-[#6C7D73]">
                  <strong className="text-forest-800">Key Finding:</strong> 60% of connections succeed on initial attempt.
                </div>
              </div>

            </div>
          </motion.div>
        )}

        {/* TAB 2: INTERACTIVE SQL RUNNER */}
        {activeTab === 'sql' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white p-6 sm:p-10 rounded-3xl border border-[#D8DFD5] shadow-card"
          >
            {/* Query Selector Tabs */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-[#D8DFD5] gap-4">
              <div className="flex flex-wrap items-center gap-2">
                {sampleQueries.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedQueryIndex(idx);
                      setExecutionTime(null);
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-mono transition-all ${
                      selectedQueryIndex === idx
                        ? 'bg-forest-800 text-white font-bold shadow-xs'
                        : 'bg-[#F1F4EE] text-[#44544A] hover:text-[#142019]'
                    }`}
                  >
                    Query 0{idx + 1}: {q.name}
                  </button>
                ))}
              </div>

              {/* Run Query Action Button */}
              <button
                onClick={handleExecuteQuery}
                disabled={isExecuting}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-mono text-xs font-bold bg-forest-800 hover:bg-forest-900 text-white transition-all shadow-sm shrink-0"
              >
                <Play className={`w-3.5 h-3.5 fill-current ${isExecuting ? 'animate-spin' : ''}`} />
                {isExecuting ? 'Executing Query...' : 'Execute Query'}
              </button>
            </div>

            {/* SQL Editor Code Window */}
            <div className="rounded-2xl bg-[#0E1A14] p-5 border border-forest-800/40 text-stone-200 font-mono text-xs mb-6 overflow-x-auto shadow-md">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10 text-stone-400 text-[11px]">
                <span className="flex items-center gap-2 text-stone-300">
                  <Terminal className="w-3.5 h-3.5 text-forest-400" />
                  SQL Query Runner Simulation
                </span>
                {executionTime && (
                  <span className="text-forest-400 font-bold">
                    Execution Time: {executionTime}ms • 12,450 rows scanned
                  </span>
                )}
              </div>
              <pre className="text-stone-300 leading-relaxed overflow-x-auto whitespace-pre">
                <code>{sampleQueries[selectedQueryIndex].sql}</code>
              </pre>
            </div>

            {/* Simulated Query Results Table */}
            <div className="overflow-x-auto rounded-2xl border border-[#D8DFD5]">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-[#F1F4EE] text-[#142019] border-b border-[#D8DFD5]">
                  <tr>
                    {Object.keys(sampleQueries[selectedQueryIndex].result[0]).map((header) => (
                      <th key={header} className="p-3.5 font-bold uppercase tracking-wider text-[11px]">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#D8DFD5] bg-white">
                  {sampleQueries[selectedQueryIndex].result.map((row, rIdx) => (
                    <tr key={rIdx} className="hover:bg-[#F8FAF7] transition-colors">
                      {Object.values(row).map((val, cIdx) => (
                        <td key={cIdx} className="p-3.5 text-[#44544A]">
                          {String(val)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

      </div>
    </section>
  );
};
