import React, { useState } from 'react';
import { 
  Calculator, 
  CheckCircle2, 
  ArrowRight, 
  FileText, 
  Calendar, 
  DollarSign, 
  ShieldCheck, 
  AlertCircle, 
  Paperclip,
  Building,
  Mail,
  User,
  Phone
} from 'lucide-react';
import { SERVICES_CATALOG } from '../data/companyData';

interface QuotePageProps {
  preselectedService?: string;
}

export const QuotePage: React.FC<QuotePageProps> = ({ preselectedService }) => {
  const [currency, setCurrency] = useState<'KES' | 'USD'>('KES');
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    organization: '',
    category: preselectedService || SERVICES_CATALOG[0].title,
    serviceScope: 'Complete End-to-End Build',
    timeline: '1 - 3 Months',
    budgetRange: 'KES 1,000,000 - 2,500,000 ($8,000 - $20,000 USD)',
    requirements: '',
    hasDocuments: false,
    documentNotes: ''
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [feedback, setFeedback] = useState('');
  const [generatedQuote, setGeneratedQuote] = useState<any>(null);

  const budgetOptionsKES = [
    'KES 300,000 - 600,000 (MVP / Startup Web Build)',
    'KES 600,000 - 1,500,000 (Mid-tier Web App / PWA)',
    'KES 1,500,000 - 3,500,000 (Custom ERP / MIS / Mobile App)',
    'KES 3,500,000 - 8,000,000+ (Enterprise Multi-Branch Platform)'
  ];

  const budgetOptionsUSD = [
    '$2,500 - $5,000 USD (MVP / Corporate Presence)',
    '$5,000 - $12,000 USD (Mid-tier Full-Stack Platform)',
    '$12,000 - $30,000 USD (Custom MIS / Scalable PWA)',
    '$30,000 - $70,000+ USD (Enterprise Architecture & Cloud)'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('idle');
    setFeedback('');

    if (!formData.fullName.trim() || !formData.email.trim() || !formData.requirements.trim()) {
      setStatus('error');
      setFeedback('Please provide your name, business email, and initial project requirements.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setStatus('error');
      setFeedback('Please provide a valid corporate email address.');
      return;
    }

    try {
      setStatus('loading');
      const payload = {
        ...formData,
        currency,
        requirements: formData.hasDocuments && formData.documentNotes
          ? `${formData.requirements.trim()}\n\n[Supporting Document Note: ${formData.documentNotes}]`
          : formData.requirements.trim()
      };

      const res = await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus('success');
        setGeneratedQuote(data.quote);
        setFeedback(`Quotation request successfully filed under Reference ID: ${data.quote.id}.`);
      } else {
        setStatus('error');
        setFeedback(data.error || 'Failed to submit quotation. Please check your information.');
      }
    } catch (err) {
      setStatus('error');
      setFeedback('Network error transmitting quote request. Please try again.');
    }
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-24">
      {/* 1. Header Banner */}
      <section className="relative pt-16 sm:pt-20 pb-16 border-b border-white/[0.07] bg-[#0A0713]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-[#FFC400] mb-4">
            <span>COMMERCIAL & SCOPE ARCHITECTURE</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-semibold text-white tracking-tight">
            Request an Enterprise Quotation
          </h1>
          <p className="mt-4 text-base text-slate-300 font-normal leading-relaxed">
            Provide your project parameters, desired timeline, and key operational targets. Our technical team prepares itemized milestone estimates with complete architectural transparency.
          </p>
        </div>
      </section>

      {/* 2. Quotation Engine Form */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-12 bg-[#0D091A] border border-white/[0.08] shadow-2xl">
          
          {status === 'success' && generatedQuote ? (
            <div className="space-y-6 text-center py-6">
              <div className="w-16 h-16 bg-[#160F2A] border border-[#FFC400]/40 flex items-center justify-center mx-auto text-[#FFC400]">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="font-mono text-xs text-[#FFC400] uppercase tracking-wider block mb-1">
                  Reference: {generatedQuote.id}
                </span>
                <h2 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
                  Quotation Request Registered
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-lg mx-auto leading-relaxed">
                  Thank you, <span className="text-white font-medium">{generatedQuote.fullName}</span>. Your technical scope for <span className="text-[#FFC400] font-medium">{generatedQuote.category}</span> has been logged into our core pipeline.
                </p>
              </div>

              {/* Summary Card */}
              <div className="p-6 bg-[#08050F] border border-white/[0.07] text-left text-xs space-y-3 max-w-lg mx-auto font-mono">
                <div className="flex justify-between border-b border-white/[0.06] pb-2">
                  <span className="text-slate-400 font-sans">Organization:</span>
                  <span className="text-white font-medium">{generatedQuote.organization || 'Individual / Founder'}</span>
                </div>
                <div className="flex justify-between border-b border-white/[0.06] pb-2">
                  <span className="text-slate-400 font-sans">Target Timeline:</span>
                  <span className="text-white font-medium">{generatedQuote.timeline}</span>
                </div>
                <div className="flex justify-between border-b border-white/[0.06] pb-2">
                  <span className="text-slate-400 font-sans">Budget Bracket:</span>
                  <span className="text-white font-medium">{generatedQuote.budgetRange}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400 font-sans">Contact Email:</span>
                  <span className="text-[#FFC400]">{generatedQuote.email}</span>
                </div>
              </div>

              <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
                Our solutions engineering lead is reviewing your requirements. You will receive an official commercial proposal within 24 to 48 business hours.
              </p>

              <div className="pt-4 flex justify-center gap-4">
                <button
                  onClick={() => {
                    setStatus('idle');
                    setGeneratedQuote(null);
                  }}
                  className="px-6 py-2.5 bg-[#FFC400] hover:bg-[#ffcd20] text-[#090611] font-semibold text-xs uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
                >
                  Submit Another Scope
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-10">
              
              {/* Step 1: Service Category & Scope */}
              <div className="space-y-5">
                <div className="flex items-center justify-between border-b border-white/[0.07] pb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 bg-[#160F2A] border border-white/[0.1] text-[#FFC400] flex items-center justify-center text-xs font-semibold font-mono">
                      01
                    </span>
                    <h3 className="text-base font-semibold text-white tracking-tight">
                      Service Scope & Engagement Model
                    </h3>
                  </div>

                  {/* Currency Selector */}
                  <div className="flex items-center gap-1 bg-[#08050F] p-1 border border-white/[0.08]">
                    <button
                      type="button"
                      onClick={() => setCurrency('KES')}
                      className={`px-3 py-1 text-xs font-semibold font-mono transition-colors cursor-pointer ${
                        currency === 'KES' ? 'bg-[#FFC400] text-[#090611]' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      KES
                    </button>
                    <button
                      type="button"
                      onClick={() => setCurrency('USD')}
                      className={`px-3 py-1 text-xs font-semibold font-mono transition-colors cursor-pointer ${
                        currency === 'USD' ? 'bg-[#FFC400] text-[#090611]' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      USD
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-slate-300 block mb-1.5">
                      Target Service Category <span className="text-[#FFC400]">*</span>
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#08050F] border border-white/[0.08] text-xs text-white focus:outline-none focus:border-[#FFC400]/60 transition-colors"
                      required
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
                      Engagement Model
                    </label>
                    <select
                      value={formData.serviceScope}
                      onChange={(e) => setFormData({ ...formData, serviceScope: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#08050F] border border-white/[0.08] text-xs text-white focus:outline-none focus:border-[#FFC400]/60 transition-colors"
                    >
                      <option value="Complete End-to-End Build">Complete End-to-End Build & Launch</option>
                      <option value="System Modernization & Redesign">System Modernization & Redesign</option>
                      <option value="Consultancy & Architecture Blueprint">Consultancy & Architecture Blueprint</option>
                      <option value="Dedicated Retainer / SLA Maintenance">Dedicated Retainer / SLA Maintenance</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Step 2: Timeline & Budget Bracket */}
              <div className="space-y-5">
                <div className="flex items-center gap-2.5 border-b border-white/[0.07] pb-3">
                  <span className="w-6 h-6 bg-[#160F2A] border border-white/[0.1] text-[#FFC400] flex items-center justify-center text-xs font-semibold font-mono">
                    02
                  </span>
                  <h3 className="text-base font-semibold text-white tracking-tight">
                    Timeline & Commercial Allocation
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-slate-300 block mb-1.5">
                      Preferred Deployment Timeline
                    </label>
                    <select
                      value={formData.timeline}
                      onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#08050F] border border-white/[0.08] text-xs text-white focus:outline-none focus:border-[#FFC400]/60 transition-colors"
                    >
                      <option value="Urgent (< 1 Month)">Urgent (&lt; 1 Month Delivery)</option>
                      <option value="1 - 3 Months">1 - 3 Months (Standard Production)</option>
                      <option value="3 - 6 Months">3 - 6 Months (Enterprise Multi-Module)</option>
                      <option value="Flexible / Phased Rollout">Flexible / Phased Milestone Rollout</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-slate-300 block mb-1.5">
                      Estimated Project Investment ({currency})
                    </label>
                    <select
                      value={formData.budgetRange}
                      onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#08050F] border border-white/[0.08] text-xs text-white focus:outline-none focus:border-[#FFC400]/60 transition-colors"
                    >
                      {(currency === 'KES' ? budgetOptionsKES : budgetOptionsUSD).map((b, i) => (
                        <option key={i} value={b}>
                          {b}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Step 3: Detailed Specifications & Attachments */}
              <div className="space-y-5">
                <div className="flex items-center gap-2.5 border-b border-white/[0.07] pb-3">
                  <span className="w-6 h-6 bg-[#160F2A] border border-white/[0.1] text-[#FFC400] flex items-center justify-center text-xs font-semibold font-mono">
                    03
                  </span>
                  <h3 className="text-base font-semibold text-white tracking-tight">
                    Project Requirements & Documentation
                  </h3>
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1.5">
                    Technical Scope & Functional Specifications <span className="text-[#FFC400]">*</span>
                  </label>
                  <textarea
                    rows={4}
                    value={formData.requirements}
                    onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                    placeholder="Describe target user roles, core workflow modules, third-party integrations (e.g. M-Pesa, ERP, CRM), and current hosting infrastructure..."
                    className="w-full px-3.5 py-2.5 bg-[#08050F] border border-white/[0.08] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#FFC400]/60 transition-colors"
                    required
                  />
                </div>

                <div className="p-4 bg-[#08050F] border border-white/[0.07] space-y-3">
                  <div className="flex items-center gap-2.5">
                    <input
                      type="checkbox"
                      id="hasDocs"
                      checked={formData.hasDocuments}
                      onChange={(e) => setFormData({ ...formData, hasDocuments: e.target.checked })}
                      className="w-4 h-4 rounded text-[#FFC400] bg-[#0A0713] border-white/[0.2] focus:ring-0 cursor-pointer"
                    />
                    <label htmlFor="hasDocs" className="text-xs font-medium text-slate-200 cursor-pointer flex items-center gap-2">
                      <Paperclip className="w-3.5 h-3.5 text-[#FFC400]" />
                      <span>We have an existing RFP, wireframe, or technical specification document</span>
                    </label>
                  </div>

                  {formData.hasDocuments && (
                    <div>
                      <input
                        type="text"
                        value={formData.documentNotes}
                        onChange={(e) => setFormData({ ...formData, documentNotes: e.target.value })}
                        placeholder="Provide secure cloud link (Google Drive / OneDrive) or note for document email..."
                        className="w-full px-3 py-2 bg-[#0D091A] border border-white/[0.1] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#FFC400]/60 transition-colors"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Step 4: Contact & Organization Details */}
              <div className="space-y-5">
                <div className="flex items-center gap-2.5 border-b border-white/[0.07] pb-3">
                  <span className="w-6 h-6 bg-[#160F2A] border border-white/[0.1] text-[#FFC400] flex items-center justify-center text-xs font-semibold font-mono">
                    04
                  </span>
                  <h3 className="text-base font-semibold text-white tracking-tight">
                    Authorized Stakeholder Information
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-slate-300 block mb-1.5">
                      Full Name <span className="text-[#FFC400]">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Kelvin Mutua"
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
                      placeholder="e.g. kelvin@company.co.ke"
                      className="w-full px-3.5 py-2.5 bg-[#08050F] border border-white/[0.08] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#FFC400]/60 transition-colors"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-slate-300 block mb-1.5">
                      Phone Number (Direct Line)
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. +254 700 000 000"
                      className="w-full px-3.5 py-2.5 bg-[#08050F] border border-white/[0.08] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#FFC400]/60 transition-colors font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-slate-300 block mb-1.5">
                      Company / Organization Name
                    </label>
                    <input
                      type="text"
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      placeholder="e.g. Summit Healthcare Services"
                      className="w-full px-3.5 py-2.5 bg-[#08050F] border border-white/[0.08] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#FFC400]/60 transition-colors"
                    />
                  </div>
                </div>
              </div>

              {status === 'error' && (
                <div className="flex items-center gap-2 p-3 bg-rose-950/30 border border-rose-500/30 text-xs text-rose-300">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{feedback}</span>
                </div>
              )}

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-6 bg-[#FFC400] hover:bg-[#ffcd20] text-[#090611] font-semibold text-xs uppercase tracking-wider transition-all shadow-sm disabled:opacity-50 cursor-pointer"
                >
                  <Calculator className="w-4 h-4" />
                  <span>{status === 'loading' ? 'Processing Technical Scope...' : 'Submit Quotation Request'}</span>
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#FFC400]" />
                <span>NDA & Commercial Confidentiality Maintained. Stored directly to Infranovix Core DB.</span>
              </div>

            </form>
          )}

        </div>
      </section>
    </div>
  );
};
