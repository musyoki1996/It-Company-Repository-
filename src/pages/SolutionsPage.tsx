import React, { useState } from 'react';
import { 
  Building2, 
  Rocket, 
  GraduationCap, 
  Activity, 
  ShoppingBag, 
  Globe2, 
  Briefcase, 
  Landmark,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Layers
} from 'lucide-react';
import { SECTOR_SOLUTIONS, SectorSolution } from '../data/companyData';
import { motion } from 'framer-motion';
import { 
  staggerContainerVariants, 
  deliberateCardVariants, 
  subtleCardHover 
} from '../utils/animations';

interface SolutionsPageProps {
  onRequestQuote: (serviceCategory: string) => void;
}

export const SolutionsPage: React.FC<SolutionsPageProps> = ({ onRequestQuote }) => {
  const [selectedSector, setSelectedSector] = useState<string>(SECTOR_SOLUTIONS[0].id);

  const activeSector = SECTOR_SOLUTIONS.find(s => s.id === selectedSector) || SECTOR_SOLUTIONS[0];

  const sectorIcons: Record<string, React.ReactNode> = {
    smes: <Building2 className="w-5 h-5 text-[#FFC400]" />,
    startups: <Rocket className="w-5 h-5 text-[#FFC400]" />,
    healthcare: <Activity className="w-5 h-5 text-[#FFC400]" />,
    education: <GraduationCap className="w-5 h-5 text-[#FFC400]" />,
    retail: <ShoppingBag className="w-5 h-5 text-[#FFC400]" />,
    ngos: <Globe2 className="w-5 h-5 text-[#FFC400]" />,
    'professional-firms': <Briefcase className="w-5 h-5 text-[#FFC400]" />,
    corporates: <Landmark className="w-5 h-5 text-[#FFC400]" />
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-24">
      {/* 1. Header Banner */}
      <section className="relative pt-16 sm:pt-20 pb-16 border-b border-white/[0.07] bg-[#0A0713]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-[#FFC400] mb-4">
            <span>SECTOR DOMAIN ARCHITECTURES</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-semibold text-white tracking-tight">
            Sector-Specific Digital Solutions
          </h1>
          <p className="mt-4 text-base text-slate-300 font-normal leading-relaxed">
            Every vertical operates under distinct regulatory constraints, payment patterns, and logistical bottlenecks. Explore how Infranovix engineers customized digital platforms for your sector.
          </p>
        </div>
      </section>

      {/* 2. Interactive Sector Selector & Spotlight Display */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Sector Tabs Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 mb-10">
          {SECTOR_SOLUTIONS.map((sec) => (
            <button
              key={sec.id}
              onClick={() => setSelectedSector(sec.id)}
              className={`p-3 text-left flex flex-col justify-between transition-all cursor-pointer border ${
                selectedSector === sec.id
                  ? 'bg-[#18112C] border-[#FFC400] text-white shadow-sm'
                  : 'bg-[#0D091A] border-white/[0.07] text-slate-400 hover:text-white hover:border-white/[0.15]'
              }`}
            >
              <div className="mb-2">
                {sectorIcons[sec.id]}
              </div>
              <span className="text-xs font-medium leading-tight line-clamp-2">
                {sec.title.split('(')[0].replace('Small & Medium Enterprises', 'SMEs')}
              </span>
            </button>
          ))}
        </div>

        {/* Active Sector Showcase Card */}
        <div className="bg-[#0D091A] border border-white/[0.08] p-6 sm:p-10 shadow-2xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-white/[0.07]">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#FFC400] uppercase tracking-wider mb-1">
                <span>Domain Focus</span>
                <span aria-hidden="true">·</span>
                <span>{activeSector.targetAudience}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
                {activeSector.title}
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => onRequestQuote(`Solution for ${activeSector.title}`)}
                className="px-6 py-2.5 bg-[#FFC400] hover:bg-[#ffcd20] text-[#090611] font-semibold text-xs uppercase tracking-wider transition-colors shadow-sm cursor-pointer whitespace-nowrap"
              >
                Request Sector Proposal
              </button>
            </div>
          </div>

          {/* Three-Column Ledger Breakdown */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Column 1: Industry Bottlenecks */}
            <div className="p-5 bg-[#08050F] border border-white/[0.07] space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-rose-300">
                <AlertTriangle className="w-4 h-4 text-rose-400" />
                <span>Sector Bottlenecks Solved</span>
              </div>
              <ul className="space-y-3 text-xs text-slate-300 font-normal">
                {activeSector.challenges.map((c, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="text-rose-400 font-mono font-bold shrink-0">✕</span>
                    <span className="leading-relaxed">{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2: Infranovix Systems */}
            <div className="p-5 bg-[#08050F] border border-white/[0.07] space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#FFC400]">
                <Layers className="w-4 h-4 text-[#FFC400]" />
                <span>Engineered Interventions</span>
              </div>
              <ul className="space-y-3 text-xs text-slate-300 font-normal">
                {activeSector.solutions.map((s, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 bg-[#FFC400] mt-1.5 shrink-0" />
                    <span className="leading-relaxed">{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Tangible Business Outcomes */}
            <div className="p-5 bg-[#08050F] border border-white/[0.07] space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Measured Outcomes</span>
              </div>
              <ul className="space-y-3 text-xs text-slate-300 font-normal">
                {activeSector.outcomes.map((o, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                    <span className="leading-relaxed font-medium">{o}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Representative Architecture Callout */}
          <div className="mt-8 p-4 bg-[#140E26] border border-white/[0.08] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                Representative Architecture Benchmark:
              </span>
              <span className="text-sm font-semibold text-white">
                {activeSector.exampleSystem}
              </span>
            </div>

            <button
              onClick={() => onRequestQuote(activeSector.exampleSystem)}
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#FFC400] hover:text-[#ffcd20] transition-colors cursor-pointer"
            >
              <span>Build This System</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </section>

      {/* 3. All Sectors Grid for Fast Browsing */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-[#FFC400] mb-2">
            <span>FULL DIRECTORY</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
            Explore All 8 Commercial Sectors
          </h2>
          <p className="text-xs text-slate-400">
            Click any sector card to review tailored architectures, or initiate a discovery consultation.
          </p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
        >
          {SECTOR_SOLUTIONS.map((sector) => (
            <motion.div
              key={sector.id}
              variants={deliberateCardVariants}
              whileHover={subtleCardHover}
              onClick={() => {
                setSelectedSector(sector.id);
                window.scrollTo({ top: 320, behavior: 'smooth' });
              }}
              className="p-6 bg-[#0D091A] border border-white/[0.07] hover:border-white/[0.18] transition-colors cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 bg-[#160F2A] border border-white/[0.08] flex items-center justify-center mb-4">
                  {sectorIcons[sector.id]}
                </div>
                <h3 className="text-base font-semibold text-white tracking-tight group-hover:text-[#FFC400] transition-colors mb-1">
                  {sector.title}
                </h3>
                <p className="text-[11px] text-slate-400 mb-3 font-mono">
                  {sector.targetAudience}
                </p>
                <p className="text-xs text-slate-300 leading-relaxed line-clamp-3 font-normal">
                  {sector.solutions[0]}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-white/[0.06] flex items-center justify-between text-xs text-[#FFC400] font-medium">
                <span>View Full Roadmap</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
};
