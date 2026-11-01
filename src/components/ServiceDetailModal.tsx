import React from 'react';
import { X, CheckCircle2, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import { ServiceCategory } from '../data/companyData';

interface ServiceDetailModalProps {
  service: ServiceCategory | null;
  onClose: () => void;
  onRequestQuote: (serviceCategory: string) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  onClose,
  onRequestQuote,
}) => {
  if (!service) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#0D091A] border border-white/[0.08] shadow-2xl p-6 sm:p-8 text-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 bg-[#160F2A] hover:bg-[#25004D] border border-white/[0.08] text-slate-400 hover:text-white transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="pr-10">
          <div className="flex items-center gap-2 text-xs font-mono text-[#FFC400] uppercase tracking-wider mb-2">
            <span>Category {service.number}</span>
            <span aria-hidden="true">·</span>
            <span>Enterprise Solutions</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
            {service.title}
          </h2>
          <p className="mt-2 text-sm text-[#d4c5f9] font-normal leading-relaxed">
            {service.tagline}
          </p>
        </div>

        {/* Detailed Explanation */}
        <div className="mt-6 pt-6 border-t border-white/[0.07]">
          <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
            Service Architectural Overview
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed font-normal">
            {service.description}
          </p>
        </div>

        {/* Sub-Services Scope */}
        <div className="mt-6">
          <h3 className="text-xs font-mono uppercase tracking-wider text-[#FFC400] mb-3">
            Scope & Capabilities Included
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {service.subServices.map((sub, idx) => (
              <div 
                key={idx} 
                className="flex items-start gap-2.5 p-3 bg-[#08050F] border border-white/[0.06] text-xs text-slate-300"
              >
                <div className="w-1.5 h-1.5 bg-[#FFC400] mt-1.5 shrink-0" />
                <span className="leading-snug">{sub}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Problems Addressed & Key Benefits */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-white/[0.07]">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-rose-400 mb-3">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Operational Problems Solved</span>
            </div>
            <ul className="space-y-2.5 text-xs text-slate-400">
              {service.problemsAddressed.map((prob, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-rose-400 font-mono font-bold shrink-0">✕</span>
                  <span>{prob}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-emerald-400 mb-3">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Commercial & Performance Benefits</span>
            </div>
            <ul className="space-y-2.5 text-xs text-slate-400">
              {service.keyBenefits.map((ben, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold shrink-0">✓</span>
                  <span>{ben}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Formal Deliverables */}
        <div className="mt-6 p-4 bg-[#140E26] border border-white/[0.08]">
          <h4 className="text-xs font-mono uppercase tracking-wider text-white mb-2 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#FFC400]" />
            <span>Standard Production Deliverables</span>
          </h4>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
            {service.deliverables.map((del, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <span className="w-1 h-1 bg-[#FFC400]" />
                <span>{del}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Action CTAs */}
        <div className="mt-8 pt-6 border-t border-white/[0.07] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-400 text-center sm:text-left">
            <span>Ready to implement this engineering vertical for your organization?</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-initial px-4 py-2 bg-[#08050F] hover:bg-white/[0.04] border border-white/[0.1] text-xs font-medium text-slate-300 transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={() => {
                onRequestQuote(service.title);
                onClose();
              }}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 bg-[#FFC400] hover:bg-[#ffcd20] text-[#090611] text-xs font-semibold uppercase tracking-wider shadow-sm transition-colors cursor-pointer"
            >
              <span>Request Scope & Quote</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
