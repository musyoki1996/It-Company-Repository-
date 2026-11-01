import React from 'react';
import { X, CheckCircle2, ArrowRight, ExternalLink, ShieldCheck, Code, Layers } from 'lucide-react';
import { PortfolioProject } from '../data/companyData';

interface ProjectDetailModalProps {
  project: PortfolioProject | null;
  onClose: () => void;
  onRequestSimilar: (serviceName: string) => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  onRequestSimilar,
}) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-[#0D091A] border border-white/[0.08] shadow-2xl p-6 sm:p-8 text-slate-200"
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

        {/* Top Tag & Header */}
        <div className="pr-12">
          <div className="flex items-center gap-2 text-xs font-mono text-[#FFC400] uppercase tracking-wider mb-2 flex-wrap">
            <span>{project.category}</span>
            <span aria-hidden="true">·</span>
            <span className="text-amber-300">Demonstration Project</span>
            <span aria-hidden="true">·</span>
            <span className="text-slate-400">{project.demoMetrics}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
            {project.title}
          </h2>
          <p className="mt-2 text-sm text-[#d4c4f5] font-normal leading-relaxed">
            {project.tagline}
          </p>
        </div>

        {/* Project Visual Showcase */}
        <div className="mt-6 overflow-hidden border border-white/[0.08] bg-[#08050F] max-h-80 relative">
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover object-top"
            referrerPolicy="no-referrer"
          />
          <div className="absolute bottom-3 left-3 bg-[#0A0713]/90 backdrop-blur-md px-3 py-1.5 border border-white/[0.08] text-xs text-slate-300 font-mono">
            <span>Architecture Benchmark · Infranovix Systems Lab</span>
          </div>
        </div>

        {/* Architecture Details Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="p-4 bg-[#08050F] border border-white/[0.07]">
            <h3 className="text-xs font-mono uppercase tracking-wider text-rose-300 mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-rose-400" />
              <span>Operational Challenge</span>
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed font-normal">
              {project.challenge}
            </p>
          </div>

          <div className="p-4 bg-[#08050F] border border-white/[0.07]">
            <h3 className="text-xs font-mono uppercase tracking-wider text-emerald-300 mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-emerald-400" />
              <span>Engineered Solution</span>
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed font-normal">
              {project.solution}
            </p>
          </div>
        </div>

        {/* Measured Results */}
        <div className="mt-6 p-4 bg-[#140E26] border border-white/[0.08]">
          <h3 className="text-xs font-mono uppercase tracking-wider text-[#FFC400] mb-3 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#FFC400]" />
            <span>Target Performance & Measurable Outcomes</span>
          </h3>
          <ul className="space-y-2 text-xs text-slate-300">
            {project.results.map((res, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="font-normal">{res}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Technologies Employed */}
        <div className="mt-6">
          <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-2">
            <Code className="w-3.5 h-3.5 text-slate-400" />
            <span>Core Technology Stack</span>
          </h4>
          <div className="flex flex-wrap gap-2 text-xs">
            {project.technologies.map((tech, idx) => (
              <span 
                key={idx} 
                className="px-2.5 py-1 bg-[#08050F] border border-white/[0.08] text-slate-300 font-mono text-[11px]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Disclaimer & Action */}
        <div className="mt-8 pt-6 border-t border-white/[0.07] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-slate-500 max-w-sm text-center sm:text-left font-mono">
            * Clearly marked demonstration project illustrating Infranovix Technologies' technical architecture standards and deliverable benchmarks.
          </p>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-initial px-4 py-2 bg-[#08050F] hover:bg-white/[0.04] border border-white/[0.1] text-xs font-medium text-slate-300 transition-colors cursor-pointer"
            >
              Back to Portfolio
            </button>
            <button
              onClick={() => {
                onRequestSimilar(project.title);
                onClose();
              }}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 bg-[#FFC400] hover:bg-[#ffcd20] text-[#090611] text-xs font-semibold uppercase tracking-wider shadow-sm transition-colors cursor-pointer"
            >
              <span>Build Equivalent System</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
