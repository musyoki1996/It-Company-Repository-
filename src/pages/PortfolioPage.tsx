import React, { useState } from 'react';
import { 
  ArrowRight, 
  CheckCircle2, 
  Code, 
  Filter
} from 'lucide-react';
import { PORTFOLIO_PROJECTS, PortfolioProject } from '../data/companyData';
import { motion } from 'framer-motion';
import { 
  staggerContainerVariants, 
  deliberateCardVariants, 
  subtleCardHover 
} from '../utils/animations';

interface PortfolioPageProps {
  onOpenProjectModal: (project: PortfolioProject) => void;
  onRequestQuote: (serviceCategory: string) => void;
}

export const PortfolioPage: React.FC<PortfolioPageProps> = ({
  onOpenProjectModal,
  onRequestQuote
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Websites', 'Web Apps', 'Mobile Apps', 'Business Systems', 'Cloud & Security'];

  const filteredProjects = selectedCategory === 'All'
    ? PORTFOLIO_PROJECTS
    : PORTFOLIO_PROJECTS.filter(p => p.category === selectedCategory);

  return (
    <div className="space-y-16 sm:space-y-24 pb-28">
      {/* 1. Header Banner */}
      <section className="relative pt-12 sm:pt-16 pb-14 border-b border-white/[0.07]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <span className="text-[11px] font-mono uppercase tracking-[0.12em] text-[#FFC400] font-semibold block mb-2.5">
            Architectural Artifacts & Case Studies
          </span>
          <h1 className="text-3xl sm:text-5xl font-medium text-white tracking-tight leading-tight">
            Demonstration Portfolio & Case Studies
          </h1>
          <p className="mt-4 text-[15px] text-slate-300 leading-relaxed font-normal">
            Inspect our high-performance demonstration architectures, enterprise ERP systems, and cloud-native mobile applications built to international technical benchmarks.
          </p>

          <div className="mt-6 inline-flex items-center gap-2 px-3.5 py-1.5 rounded bg-white/[0.03] border border-white/[0.08] text-[11px] text-slate-300 font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFC400]" />
            <span>Clearly labeled demonstration projects showcasing Infranovix Technologies' engineering rigor.</span>
          </div>
        </div>
      </section>

      {/* 2. Interactive Category Filter */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 overflow-x-auto pb-4 no-scrollbar border-b border-white/[0.06]">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mr-2 shrink-0 font-mono">
            <Filter className="w-3.5 h-3.5" />
            <span>Filter:</span>
          </div>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#FFC400] text-[#0A0713] font-semibold'
                  : 'text-slate-300 hover:text-white bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.06]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* 3. Responsive Projects Grid - Handcrafted Cards with Deliberate Negative Space */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-14 xl:gap-16 items-start"
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
        >
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              variants={deliberateCardVariants}
              whileHover={subtleCardHover}
              onClick={() => onOpenProjectModal(project)}
              className={`rounded-2xl overflow-hidden bg-[#0D091A] border border-white/[0.07] hover:border-white/[0.2] transition-all cursor-pointer group flex flex-col justify-between shadow-xl ${
                idx % 2 === 1 ? 'md:mt-12 lg:mt-16' : 'md:mb-6'
              }`}
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-black/40">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-[1.03]"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-[#0A0713]/90 backdrop-blur-md px-3 py-1.5 rounded border border-white/10 text-[10px] text-[#FFC400] font-mono uppercase tracking-wider font-semibold">
                  {project.category}
                </div>
                <div className="absolute top-4 right-4 bg-[#0A0713]/90 backdrop-blur-md px-3 py-1.5 rounded border border-white/10 text-[10px] text-slate-300 font-mono">
                  Demonstration Lab
                </div>
              </div>

              <div className="p-7 sm:p-9 lg:p-10 space-y-5">
                <div>
                  <h3 className="text-xl font-semibold text-white tracking-tight group-hover:text-[#FFC400] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-[13px] text-slate-300 font-medium mt-1.5">
                    {project.tagline}
                  </p>
                </div>

                <p className="text-xs sm:text-[13px] text-slate-400 leading-relaxed line-clamp-3">
                  {project.description}
                </p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2 pt-1.5">
                  {project.technologies.map((tech, i) => (
                    <span 
                      key={i} 
                      className="px-2.5 py-1 rounded bg-white/[0.03] text-[10px] font-mono text-slate-300 border border-white/[0.07]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Measured Benchmark Outcome */}
                <div className="pt-6 mt-4 border-t border-white/[0.06] flex items-center justify-between text-xs text-slate-400">
                  <div className="flex items-center gap-1.5 font-mono text-slate-300 text-[11px]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{project.demoMetrics}</span>
                  </div>

                  <span className="inline-flex items-center gap-1.5 text-[#FFC400] font-medium group-hover:translate-x-1 transition-transform">
                    <span>Inspect Case</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 4. Portfolio Conversion CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-xl bg-[#0E0A1A] border border-white/[0.08] text-center space-y-3.5">
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#FFC400] font-semibold">
            Tailored Engineering
          </span>
          <h2 className="text-xl sm:text-2xl font-medium text-white tracking-tight">
            Have a Proprietary Project Architecture in Mind?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Our engineering team will assess your technical requirements, recommend optimal databases and cloud providers, and deliver a detailed scope of work.
          </p>
          <div className="pt-3">
            <button
              onClick={() => onRequestQuote('Custom Architecture Design')}
              className="px-6 py-3 bg-[#FFC400] hover:bg-[#ffcd20] text-[#0A0713] font-semibold text-xs tracking-wide rounded transition-colors shadow cursor-pointer"
            >
              Request Custom Project Quotation
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
