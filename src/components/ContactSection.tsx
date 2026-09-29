'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PERSONAL_INFO } from '@/data/portfolioData';
import {
  Mail,
  Phone,
  Linkedin,
  Github,
  MapPin,
  Copy,
  Check,
  Send,
  Sparkles,
  ExternalLink,
  Loader2,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const openGmailCompose = () => {
    const subject = encodeURIComponent(`Portfolio Inquiry from ${formData.name || 'Recruiter'}`);
    const body = encodeURIComponent(`Sender: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${PERSONAL_INFO.email}&su=${subject}&body=${body}`, '_blank');
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.message) return;

    setStatus('loading');
    setErrorMessage('');

    try {
      const accessKey =
        process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || 'cf3e3cf3-46b5-4785-b7b6-b2b4a5b714dd';

      const data = new FormData();
      data.append('access_key', accessKey);
      data.append('name', formData.name || 'Recruiter / Visitor');
      data.append('email', formData.email);
      data.append('message', formData.message);
      data.append('from_name', `${formData.name || 'Recruiter'} via Portfolio`);
      data.append('subject', `🎯 Portfolio Inquiry from ${formData.name || 'Recruiter'}`);

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: data,
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
        setErrorMessage(result.message || 'Unable to deliver message right now.');
      }
    } catch (err) {
      console.error('Submission error:', err);
      setStatus('error');
      setErrorMessage('Network connection error. Please try opening in Gmail.');
    }
  };

  return (
    <section id="contact" className="py-28 relative bg-[#F8FAF7] text-[#142019] border-t border-[#D8DFD5] overflow-hidden">
      
      {/* Ambient Atmospheric Lighting */}
      <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-forest-200/35 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-[500px] h-[500px] bg-amberGold-100/40 rounded-full blur-[140px] pointer-events-none" />

      {/* Subtle Grid Lines */}
      <div className="absolute inset-0 bg-command-grid opacity-30 pointer-events-none" />

      <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-20 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest-50 border border-forest-600/25 text-xs font-mono text-forest-800 mb-4 font-semibold shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-forest-700" />
            GET IN TOUCH
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#142019] tracking-tight leading-tight">
            Let&apos;s Build Data Insights <span className="text-forest-800">Together</span>
          </h2>
          <p className="text-[#44544A] text-sm sm:text-base mt-4 leading-relaxed font-sans">
            Actively seeking Data Analyst, BI Analyst, and Product Analytics opportunities. Open to full-time roles in Gurugram, India, or immediate relocation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start max-w-5xl mx-auto">
          
          {/* Direct Communication Channels (Left 5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Email Card with 1-Click Copy */}
            <div className="bg-white p-5 rounded-2xl border border-[#D8DFD5] shadow-xs flex items-center justify-between gap-4 hover:border-forest-600/40 transition-all">
              <div className="flex items-center gap-3.5 overflow-hidden">
                <div className="w-11 h-11 rounded-xl bg-forest-50 border border-forest-600/20 flex items-center justify-center shrink-0 text-forest-800 shadow-2xs">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="overflow-hidden">
                  <div className="text-[11px] font-mono text-[#6C7D73]">E-mail Address</div>
                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    className="text-sm font-semibold text-[#142019] hover:text-forest-700 transition-colors truncate block font-mono"
                  >
                    {PERSONAL_INFO.email}
                  </a>
                </div>
              </div>

              <button
                onClick={copyEmailToClipboard}
                className="px-3 py-2 rounded-xl bg-[#F1F4EE] border border-[#D8DFD5] text-[#44544A] hover:text-[#142019] hover:border-forest-700 transition-all shrink-0 text-xs font-mono flex items-center gap-1.5 shadow-2xs cursor-pointer"
                title="Copy Email to Clipboard"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-forest-700" />
                    <span className="text-forest-700 font-bold">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            {/* Telephone Card */}
            <div className="bg-white p-5 rounded-2xl border border-[#D8DFD5] shadow-xs flex items-center gap-3.5 hover:border-forest-600/40 transition-all">
              <div className="w-11 h-11 rounded-xl bg-forest-50 border border-forest-600/20 flex items-center justify-center shrink-0 text-forest-800 shadow-2xs">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] font-mono text-[#6C7D73]">Phone No.</div>
                <a
                  href={`tel:${PERSONAL_INFO.phone}`}
                  className="text-sm font-semibold text-[#142019] hover:text-forest-700 transition-colors font-mono"
                >
                  {PERSONAL_INFO.phone}
                </a>
              </div>
            </div>

            {/* LinkedIn Profile Card */}
            <div className="bg-white p-5 rounded-2xl border border-[#D8DFD5] shadow-xs flex items-center justify-between hover:border-forest-600/40 transition-all">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-forest-50 border border-forest-600/20 flex items-center justify-center shrink-0 text-forest-800 shadow-2xs">
                  <Linkedin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-mono text-[#6C7D73]">LinkedIn Profile</div>
                  <div className="text-sm font-semibold text-[#142019] font-mono">/in/n-madhavmukesh</div>
                </div>
              </div>

              <a
                href={PERSONAL_INFO.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-[#F1F4EE] border border-[#D8DFD5] text-[#44544A] hover:text-[#142019] hover:border-forest-700 transition-colors"
                aria-label="Open LinkedIn Profile"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            {/* GitHub Card */}
            <div className="bg-white p-5 rounded-2xl border border-[#D8DFD5] shadow-xs flex items-center justify-between hover:border-forest-600/40 transition-all">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-forest-50 border border-forest-600/20 flex items-center justify-center shrink-0 text-forest-800 shadow-2xs">
                  <Github className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-mono text-[#6C7D73]">GitHub Profile</div>
                  <div className="text-sm font-semibold text-[#142019] font-mono">github.com/Madhav0326</div>
                </div>
              </div>

              <a
                href={PERSONAL_INFO.gitHub}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-[#F1F4EE] border border-[#D8DFD5] text-[#44544A] hover:text-[#142019] hover:border-forest-700 transition-colors"
                aria-label="Open GitHub Profile"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            {/* Location & Relocation Card */}
            <div className="bg-white p-5 rounded-2xl border border-[#D8DFD5] shadow-xs flex items-center gap-3.5 hover:border-forest-600/40 transition-all">
              <div className="w-11 h-11 rounded-xl bg-amberGold-50 border border-amberGold-200 flex items-center justify-center shrink-0 text-amberGold-700 shadow-2xs">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] font-mono text-[#6C7D73]">Current Location</div>
                <div className="text-sm font-semibold text-[#142019]">{PERSONAL_INFO.location}</div>
                <div className="text-[11px] font-mono text-forest-700 font-bold">{PERSONAL_INFO.relocation}</div>
              </div>
            </div>

          </div>

          {/* Email Contact Form (Right 7 cols) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-9 rounded-3xl border border-[#D8DFD5] shadow-sm">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#D8DFD5]">
              <div className="flex items-center gap-2 text-xs font-mono text-[#142019] font-bold">
                <Mail className="w-4 h-4 text-forest-700" />
                Send a Direct Message
              </div>
              <span className="text-[10px] font-mono text-forest-800 bg-forest-50 px-2.5 py-0.5 rounded-full border border-forest-600/30 font-bold">
                DIRECT INQUIRY
              </span>
            </div>

            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="py-10 text-center flex flex-col items-center justify-center space-y-4 font-mono"
              >
                <div className="w-14 h-14 rounded-2xl bg-forest-50 border border-forest-600/30 flex items-center justify-center text-forest-800 shadow-sm">
                  <CheckCircle2 className="w-7 h-7 text-forest-700" />
                </div>
                <div className="space-y-1.5 max-w-md">
                  <h3 className="text-base font-bold text-[#142019]">Message Delivered Directly!</h3>
                  <p className="text-xs text-[#44544A] font-sans leading-relaxed">
                    Thank you for reaching out. Your inquiry has been sent straight to Madhav&apos;s inbox. I typically respond within 24 hours.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setStatus('idle')}
                  className="mt-3 px-5 py-2.5 rounded-xl bg-[#F1F4EE] border border-[#D8DFD5] text-[#142019] hover:border-forest-700 text-xs font-mono font-bold transition-all shadow-2xs cursor-pointer"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4 font-sans">
                <div>
                  <label className="block text-xs font-mono text-[#6C7D73] mb-1.5 font-semibold">Your Name &amp; Company</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Analytics Hiring Team"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#F8FAF7] border border-[#D8DFD5] text-[#142019] placeholder:text-[#6C7D73] focus:outline-none focus:border-forest-700 focus:ring-1 focus:ring-forest-700/20 text-xs font-mono transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#6C7D73] mb-1.5 font-semibold">Your Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="recruiter@organization.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#F8FAF7] border border-[#D8DFD5] text-[#142019] placeholder:text-[#6C7D73] focus:outline-none focus:border-forest-700 focus:ring-1 focus:ring-forest-700/20 text-xs font-mono transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#6C7D73] mb-1.5 font-semibold">Inquiry / Role Scope</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Hi Madhav, we reviewed your analytics portfolio and would like to connect regarding an opening..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#F8FAF7] border border-[#D8DFD5] text-[#142019] placeholder:text-[#6C7D73] focus:outline-none focus:border-forest-700 focus:ring-1 focus:ring-forest-700/20 text-xs font-mono transition-all resize-none"
                  />
                </div>

                {status === 'error' && (
                  <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs font-mono text-amber-900 space-y-2">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-bold text-amber-950">Notice</div>
                        <div className="text-[11px] text-amber-900/90 font-sans mt-0.5">
                          {errorMessage || 'Unable to submit directly. You can open Gmail directly with your message pre-filled.'}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 pt-1">
                      <button
                        type="button"
                        onClick={openGmailCompose}
                        className="px-3 py-1.5 rounded-lg bg-forest-800 text-white text-[11px] font-mono font-semibold hover:bg-forest-900 transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
                      >
                        <ExternalLink className="w-3 h-3" />
                        Open in Gmail Web
                      </button>
                      <button
                        type="button"
                        onClick={() => setStatus('idle')}
                        className="px-3 py-1.5 rounded-lg bg-white border border-[#D8DFD5] text-[#142019] text-[11px] font-mono hover:bg-[#F1F4EE] transition-colors cursor-pointer"
                      >
                        Try Again
                      </button>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-4 rounded-xl font-mono text-xs font-bold bg-forest-800 hover:bg-forest-900 disabled:opacity-75 disabled:cursor-not-allowed text-white shadow-sm transition-all flex items-center justify-center gap-2 group cursor-pointer"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
