import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck,
  ExternalLink
} from 'lucide-react';
import { SERVICES_CATALOG } from '../data/companyData';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: SERVICES_CATALOG[0].title,
    budget: '',
    message: ''
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [submittedInquiryId, setSubmittedInquiryId] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('idle');
    setFeedbackMessage('');

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('error');
      setFeedbackMessage('Please fill in your name, email address, and inquiry specifications.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setStatus('error');
      setFeedbackMessage('Please provide a valid business email address.');
      return;
    }

    try {
      setStatus('loading');
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setStatus('success');
        setSubmittedInquiryId(result.inquiry.id);
        setFeedbackMessage(
          `Your inquiry has been successfully transmitted and logged under reference ${result.inquiry.id}. A senior technical consultant will review your specifications within one business day.`
        );
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          service: SERVICES_CATALOG[0].title,
          budget: '',
          message: ''
        });
      } else {
        setStatus('error');
        setFeedbackMessage(result.error || 'Failed to submit inquiry. Please review your input.');
      }
    } catch (err) {
      setStatus('error');
      setFeedbackMessage('Network communication error. Please check your internet connection or reach out on WhatsApp.');
    }
  };

  const whatsappUrl = `https://wa.me/254714664379?text=${encodeURIComponent(
    'Hello Infranovix Technologies, I would like to schedule a technical consultation regarding our project.'
  )}`;

  return (
    <div className="space-y-16 sm:space-y-24 pb-24">
      {/* 1. Header Banner */}
      <section className="relative pt-16 sm:pt-20 pb-16 border-b border-white/[0.07] bg-[#0A0713]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-[#FFC400] mb-4">
            <span>COMMUNICATION & ENGAGEMENT</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-semibold text-white tracking-tight">
            Initiate a Technical Conversation
          </h1>
          <p className="mt-4 text-base text-slate-300 font-normal leading-relaxed">
            Have a project in mind, need architectural guidance, or wish to explore an enterprise partnership? Connect directly with our engineering team in Nairobi.
          </p>
        </div>
      </section>

      {/* 2. Main Contact Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Direct Office Details */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-[#FFC400] block mb-2">
                Regional Hub & Operations
              </span>
              <h2 className="text-2xl font-semibold text-white tracking-tight">
                Infranovix Technologies HQ
              </h2>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Operating from Nairobi, Kenya, serving institutions, enterprises, and venture-backed startups regionally across East Africa and internationally.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <div className="p-4 bg-[#0D091A] border border-white/[0.08] flex items-start gap-3.5">
                <MapPin className="w-5 h-5 text-[#FFC400] shrink-0 mt-0.5" />
                <div className="text-xs">
                  <span className="text-white font-medium block mb-0.5">Physical Location</span>
                  <span className="text-slate-300">Westlands Commercial Hub, Nairobi, Kenya</span>
                  <span className="text-slate-500 block text-[11px] mt-0.5 font-mono">P.O. Box 45820-00100, Nairobi</span>
                </div>
              </div>

              <div className="p-4 bg-[#0D091A] border border-white/[0.08] flex items-start gap-3.5">
                <Mail className="w-5 h-5 text-[#FFC400] shrink-0 mt-0.5" />
                <div className="text-xs">
                  <span className="text-white font-medium block mb-0.5">Electronic Mail</span>
                  <a href="mailto:info@infranovix.co.ke" className="text-slate-300 hover:text-white transition-colors block font-mono">
                    info@infranovix.co.ke (General Inquiries)
                  </a>
                  <a href="mailto:support@infranovix.co.ke" className="text-slate-400 hover:text-white transition-colors block mt-0.5 font-mono text-[11px]">
                    support@infranovix.co.ke (Client Support)
                  </a>
                </div>
              </div>

              <div className="p-4 bg-[#0D091A] border border-white/[0.08] flex items-start gap-3.5">
                <Phone className="w-5 h-5 text-[#FFC400] shrink-0 mt-0.5" />
                <div className="text-xs">
                  <span className="text-white font-medium block mb-0.5">Telephone Dispatch</span>
                  <a href="tel:+254714664379" className="text-slate-300 hover:text-white transition-colors block font-mono">
                    +254 (0) 714 664 379
                  </a>
                  <span className="text-slate-500 block text-[11px] mt-0.5">Direct line: 0714 664 379</span>
                </div>
              </div>

              <div className="p-4 bg-[#0D091A] border border-white/[0.08] flex items-start gap-3.5">
                <Clock className="w-5 h-5 text-[#FFC400] shrink-0 mt-0.5" />
                <div className="text-xs">
                  <span className="text-white font-medium block mb-0.5">Operational Hours</span>
                  <span className="text-slate-300">Monday – Friday: 8:00 AM – 5:30 PM (EAT)</span>
                  <span className="text-slate-500 block text-[11px] mt-0.5">24/7 incident monitoring for active SLA agreements</span>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Callout */}
            <div className="p-5 bg-[#0A160F] border border-emerald-500/25 space-y-3">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-mono uppercase tracking-wider text-emerald-300">
                  Instant WhatsApp Dispatch
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-normal">
                Prefer direct messaging or want to share documentation quickly? Reach our solutions desk on WhatsApp.
              </p>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold rounded transition-colors shadow-sm"
              >
                <span>Open WhatsApp Chat</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Right Column: Verified Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-10 bg-[#0D091A] border border-white/[0.08] shadow-2xl">
              <div className="mb-6">
                <div className="inline-flex items-center gap-2 text-xs font-mono text-[#FFC400] uppercase tracking-wider mb-1">
                  <span>Direct Routing</span>
                  <span aria-hidden="true">·</span>
                  <span>Core Backend</span>
                </div>
                <h3 className="text-2xl font-semibold text-white tracking-tight">
                  Send a Business Inquiry
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Every inquiry is stored in our database and routed to the lead architect within 24 hours.
                </p>
              </div>

              {status === 'success' ? (
                <div className="p-6 bg-emerald-950/25 border border-emerald-500/30 space-y-4 text-slate-200">
                  <div className="flex items-center gap-2 text-emerald-400">
                    <CheckCircle2 className="w-5 h-5 shrink-0" />
                    <h4 className="text-base font-semibold text-white">Inquiry Received</h4>
                  </div>
                  <p className="text-xs leading-relaxed text-slate-300 font-normal">
                    {feedbackMessage}
                  </p>
                  <div className="pt-2">
                    <button
                      onClick={() => setStatus('idle')}
                      className="px-4 py-2 bg-[#1A1230] hover:bg-[#25004D] border border-white/[0.1] text-white text-xs font-medium transition-colors cursor-pointer"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-medium text-slate-300 block mb-1.5">
                        Full Name <span className="text-[#FFC400]">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Grace Wanjiku"
                        className="w-full px-3.5 py-2.5 bg-[#08050F] border border-white/[0.08] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#FFC400]/60 transition-colors"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-xs font-medium text-slate-300 block mb-1.5">
                        Corporate Email <span className="text-[#FFC400]">*</span>
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. grace@enterprise.co.ke"
                        className="w-full px-3.5 py-2.5 bg-[#08050F] border border-white/[0.08] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#FFC400]/60 transition-colors"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-medium text-slate-300 block mb-1.5">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="e.g. +254 712 345 678"
                        className="w-full px-3.5 py-2.5 bg-[#08050F] border border-white/[0.08] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#FFC400]/60 transition-colors font-mono"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-medium text-slate-300 block mb-1.5">
                        Organization / Company
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="e.g. Apex Holdings Ltd"
                        className="w-full px-3.5 py-2.5 bg-[#08050F] border border-white/[0.08] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#FFC400]/60 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-medium text-slate-300 block mb-1.5">
                        Service Category Required
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-[#08050F] border border-white/[0.08] text-xs text-white focus:outline-none focus:border-[#FFC400]/60 transition-colors"
                      >
                        {SERVICES_CATALOG.map((s) => (
                          <option key={s.id} value={s.title}>
                            {s.number}. {s.title}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-medium text-slate-300 block mb-1.5">
                        Estimated Budget Bracket (Optional)
                      </label>
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-[#08050F] border border-white/[0.08] text-xs text-white focus:outline-none focus:border-[#FFC400]/60 transition-colors"
                      >
                        <option value="">To be determined in consultation</option>
                        <option value="Under KES 500,000 (< $4,000 USD)">Under KES 500,000 (&lt; $4,000 USD)</option>
                        <option value="KES 500,000 - 1,500,000 ($4k - $12k USD)">KES 500,000 - 1,500,000 ($4k - $12k USD)</option>
                        <option value="KES 1,500,000 - 3,500,000 ($12k - $27k USD)">KES 1,500,000 - 3,500,000 ($12k - $27k USD)</option>
                        <option value="KES 3,500,000+ ($27k+ USD Enterprise)">KES 3,500,000+ ($27k+ USD Enterprise)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-slate-300 block mb-1.5">
                      Project Description & Requirements <span className="text-[#FFC400]">*</span>
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Describe your current systems, operational pain points, desired features, and expected timeline..."
                      className="w-full px-3.5 py-2.5 bg-[#08050F] border border-white/[0.08] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#FFC400]/60 transition-colors"
                      required
                    />
                  </div>

                  {status === 'error' && (
                    <div className="flex items-center gap-2 p-3 bg-rose-950/30 border border-rose-500/30 text-xs text-rose-300">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{feedbackMessage}</span>
                    </div>
                  )}

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="w-full flex items-center justify-center gap-2 py-3.5 px-6 bg-[#FFC400] hover:bg-[#ffcd20] text-[#090611] font-semibold text-xs uppercase tracking-wider transition-all shadow-sm disabled:opacity-50 cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>{status === 'loading' ? 'Transmitting Inquiry...' : 'Submit Inquiry'}</span>
                    </button>
                  </div>

                  <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 pt-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#FFC400]" />
                    <span>Transmitted securely under Infranovix data governance protocols.</span>
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};
