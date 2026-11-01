import React from 'react';
import { 
  ShieldCheck, 
  Target, 
  Eye, 
  CheckCircle2, 
  ArrowRight
} from 'lucide-react';
import { COMPANY_IDENTITY } from '../data/companyData';
import { motion } from 'framer-motion';
import { 
  staggerContainerVariants, 
  deliberateCardVariants, 
  subtleCardHover 
} from '../utils/animations';

interface AboutPageProps {
  setActiveTab: (tab: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ setActiveTab }) => {
  return (
    <div className="space-y-24 sm:space-y-32 pb-28 text-slate-100">
      {/* 1. Header Banner */}
      <section className="relative pt-12 sm:pt-16 pb-14 border-b border-white/[0.07]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <span className="text-[11px] font-mono uppercase tracking-[0.12em] text-[#FFC400] font-semibold block mb-2.5">
            Corporate Profile & Philosophy
          </span>
          <h1 className="text-3xl sm:text-5xl font-medium text-white tracking-tight leading-tight">
            Innovate. Integrate. Elevate.
          </h1>
          <p className="mt-4 text-[15px] text-slate-300 leading-relaxed font-normal">
            Infranovix Technologies is a technology solutions company providing digital transformation, software engineering, and strategic IT consultancy to institutions, enterprises, fast-growth startups, and visionary individuals.
          </p>
        </div>
      </section>

      {/* 2. Our Story & Team Imagery */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <span className="text-[11px] font-mono uppercase tracking-[0.12em] text-[#FFC400] font-semibold block">
              Our Story & Purpose
            </span>
            <h2 className="text-2xl sm:text-3xl font-medium text-white tracking-tight leading-snug">
              Bridging the Gap Between Business Ambition and Technical Execution
            </h2>
            <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              <p>
                Infranovix Technologies was founded on a singular conviction: technology should never be a cost-center bottleneck, but an accelerating catalyst that transforms operational capability and client satisfaction.
              </p>
              <p>
                Too often, organizations across Kenya and emerging markets find themselves caught between two extremes: overpriced international software that is poorly adapted to local infrastructure and payments, or cheap, fragile templates that fail the moment transaction volumes spike.
              </p>
              <p>
                Infranovix delivers the enterprise balance: world-class software engineering standards, modular cloud architecture, seamless mobile money integrations, and dependable, accessible local technical stewardship.
              </p>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-300 font-medium">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Engineering Rigor
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Complete Data Ownership
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Transparent Collaboration
              </span>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-xl overflow-hidden border border-white/[0.08] bg-[#0D091A] shadow-xl relative">
              <img
                src="/src/assets/images/strategy_meeting_whiteboard_1793452675937.jpg"
                alt="Infranovix Technologies Technical Strategy and Architecture Session"
                className="w-full h-auto object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="p-3 bg-[#0A0713]/90 border-t border-white/[0.08] flex items-center justify-between text-[11px] text-slate-400 font-mono">
                <span>Enterprise Technical Strategy & Roadmap Planning</span>
                <span className="text-[#FFC400]">Slot: aboutTeam</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Mission & Vision - Refined Handcrafted Cards */}
      {/* 3. Mission & Vision - Refined Handcrafted Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-7"
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
        >
          <motion.div 
            variants={deliberateCardVariants}
            whileHover={subtleCardHover}
            className="p-8 sm:p-9 rounded-xl bg-[#0D091A] border border-white/[0.07] space-y-4"
          >
            <div className="w-10 h-10 rounded bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-[#FFC400]">
              <Target className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-mono uppercase tracking-[0.12em] text-[#FFC400] font-semibold block">
              Our Mission
            </span>
            <h3 className="text-xl font-medium text-white tracking-tight">
              Empowering Through Scalable Technology
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed italic border-l border-[#FFC400] pl-3 py-1 font-normal">
              "{COMPANY_IDENTITY.mission}"
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              We design digital infrastructure that solves real operational headaches today while building the technical runway for your organization's expansion over the next decade.
            </p>
          </motion.div>

          <motion.div 
            variants={deliberateCardVariants}
            whileHover={subtleCardHover}
            className="p-8 sm:p-9 rounded-xl bg-[#0D091A] border border-white/[0.07] space-y-4"
          >
            <div className="w-10 h-10 rounded bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-[#FFC400]">
              <Eye className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-mono uppercase tracking-[0.12em] text-[#FFC400] font-semibold block">
              Our Vision
            </span>
            <h3 className="text-xl font-medium text-white tracking-tight">
              Driving Digital Transformation Across Borders
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed italic border-l border-white/[0.2] pl-3 py-1 font-normal">
              "{COMPANY_IDENTITY.vision}"
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              We envision an interconnected economy where African businesses operate with software systems on par with the world's most sophisticated digital enterprises.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* 4. Core Values - Ledger Layout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-[11px] font-mono uppercase tracking-[0.12em] text-[#FFC400] font-semibold block">
            Guiding Principles
          </span>
          <h2 className="text-2xl sm:text-3xl font-medium text-white tracking-tight">
            Our Core Values
          </h2>
          <p className="text-xs text-slate-400">
            These six non-negotiable principles govern how we write code, formulate architecture, quote contracts, and support clients.
          </p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
        >
          {COMPANY_IDENTITY.coreValues.map((val, idx) => (
            <motion.div 
              key={idx}
              variants={deliberateCardVariants}
              whileHover={subtleCardHover}
              className="p-6 rounded-xl bg-[#0D091A] border border-white/[0.07] hover:border-white/[0.18] transition-colors space-y-2.5"
            >
              <div className="flex items-center gap-2.5">
                <span className="font-mono text-xs font-bold text-[#FFC400]">
                  0{idx + 1}
                </span>
                <span aria-hidden="true" className="text-white/20">/</span>
                <h3 className="text-sm font-semibold text-white tracking-tight">
                  {val.title}
                </h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                {val.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 5. Architectural Standards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-xl bg-[#0D091A] border border-white/[0.08]">
          <div className="max-w-3xl mb-8 space-y-2">
            <span className="text-[11px] font-mono uppercase tracking-[0.12em] text-[#FFC400] font-semibold block">
              Architectural Philosophy
            </span>
            <h2 className="text-2xl font-medium text-white tracking-tight">
              Engineered to Endure: Our Technical Standard
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              We discard fleeting fads in favor of proven engineering patterns that guarantee high availability, minimal maintenance burden, and effortless scalability.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-1.5">
              <h4 className="text-xs font-semibold text-white">Modular & Type-Safe</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Strict TypeScript across frontend and backend, catching logic errors at compile-time before code ever reaches production.
              </p>
            </div>

            <div className="space-y-1.5">
              <h4 className="text-xs font-semibold text-white">Cloud-Native Architecture</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Containerized microservices and automated CI/CD pipelines allow deployment of new capabilities with zero application downtime.
              </p>
            </div>

            <div className="space-y-1.5">
              <h4 className="text-xs font-semibold text-white">Defense in Depth</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                End-to-end encryption, automated database snapshots, strict RBAC, and adherence to the Kenya Data Protection Act 2019.
              </p>
            </div>

            <div className="space-y-1.5">
              <h4 className="text-xs font-semibold text-white">Bandwidth Conscious</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Smart local caching and lightweight payloads ensure our web applications perform briskly even on volatile 3G networks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Industries We Serve */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-[11px] font-mono uppercase tracking-[0.12em] text-[#FFC400] font-semibold block">
            Domain Versatility
          </span>
          <h2 className="text-2xl font-medium text-white tracking-tight">
            Industries We Serve
          </h2>
          <p className="text-xs text-slate-400">
            Deep contextual expertise across the economic sectors powering regional commerce and institutional services.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          {[
            'Financial Services & Fintech',
            'Healthcare & Clinical EMR',
            'Education & Academies',
            'Logistics & Supply Chain',
            'Retail & E-Commerce',
            'Non-Governmental Organizations (NGOs)',
            'Legal & Professional Consultancies',
            'Real Estate & Facility Management'
          ].map((ind, i) => (
            <div key={i} className="p-3.5 rounded bg-[#0D091A] border border-white/[0.06] text-xs font-medium text-slate-300 flex items-center justify-center">
              <span>{ind}</span>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <button
            onClick={() => setActiveTab('solutions')}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#FFC400] hover:bg-[#ffcd20] text-[#0A0713] font-semibold text-xs tracking-wide rounded transition-colors shadow-sm"
          >
            <span>Explore Industry Case Solutions</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>
    </div>
  );
};
