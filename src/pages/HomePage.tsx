import React, { useState } from 'react';
import { 
  ArrowRight, 
  ArrowUpRight, 
  CheckCircle2, 
  Globe, 
  Smartphone, 
  Layers, 
  Cpu, 
  Cloud, 
  ShieldCheck, 
  Workflow, 
  Palette,
  ExternalLink,
  ChevronRight,
  Clock,
  Sliders,
  DollarSign,
  Building,
  Check,
  MapPin,
  Shield
} from 'lucide-react';
import { 
  COMPANY_IDENTITY, 
  SERVICES_CATALOG, 
  PORTFOLIO_PROJECTS, 
  VENDOR_COMPARISON_MATRIX,
  ServiceCategory, 
  PortfolioProject 
} from '../data/companyData';
import { DEFAULT_PHOTOS } from '../data/assetsConfig';
import { motion } from 'framer-motion';
import { 
  staggerContainerVariants, 
  deliberateCardVariants, 
  deliberateHeroVariants, 
  subtleCardHover 
} from '../utils/animations';

interface HomePageProps {
  setActiveTab: (tab: string) => void;
  onOpenServiceModal: (service: ServiceCategory) => void;
  onOpenProjectModal: (project: PortfolioProject) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  setActiveTab,
  onOpenServiceModal,
  onOpenProjectModal
}) => {
  // Interactive Project Estimator State
  const [projectType, setProjectType] = useState<'web' | 'mobile' | 'erp' | 'cloud'>('web');
  const [scaleTier, setScaleTier] = useState<'mvp' | 'growth' | 'enterprise'>('growth');
  const [includeMpesa, setIncludeMpesa] = useState(true);
  const [includeOffline, setIncludeOffline] = useState(false);
  const [currency, setCurrency] = useState<'KES' | 'USD'>('KES');

  // Compute dynamic estimate
  const calculateEstimate = () => {
    let baseKES = 450000;
    let weeks = 4;

    if (projectType === 'mobile') {
      baseKES = 850000;
      weeks = 6;
    } else if (projectType === 'erp') {
      baseKES = 1800000;
      weeks = 10;
    } else if (projectType === 'cloud') {
      baseKES = 650000;
      weeks = 5;
    }

    if (scaleTier === 'mvp') {
      baseKES *= 0.75;
      weeks = Math.max(3, weeks - 1);
    } else if (scaleTier === 'enterprise') {
      baseKES *= 1.8;
      weeks += 4;
    }

    if (includeMpesa) baseKES += 80000;
    if (includeOffline) baseKES += 120000;

    const baseUSD = Math.round(baseKES / 130);
    return {
      weeks: Math.round(weeks),
      formattedKES: `KES ${Math.round(baseKES).toLocaleString()}`,
      formattedUSD: `$${baseUSD.toLocaleString()} USD`
    };
  };

  const estimate = calculateEstimate();

  const iconMap: Record<string, React.ReactNode> = {
    Globe: <Globe className="w-4 h-4 text-[#FFC400]" />,
    Smartphone: <Smartphone className="w-4 h-4 text-[#FFC400]" />,
    Layers: <Layers className="w-4 h-4 text-[#FFC400]" />,
    Cpu: <Cpu className="w-4 h-4 text-[#FFC400]" />,
    Cloud: <Cloud className="w-4 h-4 text-[#FFC400]" />,
    ShieldCheck: <ShieldCheck className="w-4 h-4 text-[#FFC400]" />,
    Workflow: <Workflow className="w-4 h-4 text-[#FFC400]" />,
    Palette: <Palette className="w-4 h-4 text-[#FFC400]" />
  };

  return (
    <div className="space-y-28 sm:space-y-36 pb-32 text-slate-100">
      
      {/* 1. Hero Section - Refined Hand-Crafted Layout */}
      <section className="relative pt-10 sm:pt-16 lg:pt-20 border-b border-white/[0.07]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Top Status & Context Strip */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/[0.06] text-[12px] text-slate-400">
            <div className="flex items-center gap-2.5">
              <span className="font-mono text-[#FFC400] text-[11px] tracking-wider uppercase font-semibold">
                EST. 2026
              </span>
              <span aria-hidden="true" className="text-white/20">/</span>
              <span className="text-slate-300 font-medium">Infranovix Technologies Practice</span>
              <span aria-hidden="true" className="text-white/20">/</span>
              <span>Software Engineering & IT Advisory</span>
            </div>

            <div className="flex items-center gap-4 font-mono text-[11px] text-slate-400">
              <div className="flex items-center gap-1.5 text-slate-300">
                <MapPin className="w-3 h-3 text-[#FFC400]" />
                <span>Nairobi HQ (EAT · UTC+3)</span>
              </div>
              <span aria-hidden="true" className="text-white/20">·</span>
              <span className="text-emerald-400/90 font-medium">Engineering Active</span>
            </div>
          </div>

          {/* Hero Grid - Asymmetric Typographic Stance */}
          <div className="py-16 sm:py-20 lg:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Hand-crafted Typography */}
            <motion.div 
              className="lg:col-span-7 space-y-7"
              variants={deliberateHeroVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="inline-flex items-center gap-2 text-xs font-mono tracking-wider text-slate-400">
                <span className="w-1.5 h-1.5 bg-[#FFC400] rounded-full" />
                <span className="uppercase text-[#FFC400] font-semibold">INNOVATE</span>
                <span aria-hidden="true" className="text-white/20">·</span>
                <span className="uppercase text-slate-300">INTEGRATE</span>
                <span aria-hidden="true" className="text-white/20">·</span>
                <span className="uppercase text-slate-400">ELEVATE</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-white leading-[1.08] text-balance">
                Transforming Ideas Into{' '}
                <span className="font-semibold text-[#FFC400]">
                  Powerful Digital Solutions.
                </span>
              </h1>

              <p className="text-[15px] sm:text-[16px] text-slate-300/90 max-w-xl leading-relaxed font-normal">
                At Infranovix Technologies, we help businesses, institutions, and individuals embrace technology through innovative software development, modern web solutions, intelligent digital systems, and professional IT consultancy.
              </p>

              {/* Action Pair */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <button
                  onClick={() => setActiveTab('services')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#FFC400] hover:bg-[#ffcd20] text-[#0A0713] font-semibold text-xs tracking-wide rounded transition-all cursor-pointer shadow-sm active:scale-95 whitespace-nowrap"
                >
                  <span>Explore Our Services</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => setActiveTab('quote')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.12] text-white font-medium text-xs tracking-wide rounded transition-colors cursor-pointer whitespace-nowrap"
                >
                  <span>Start a Project</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#FFC400]" />
                </button>
              </div>

              {/* Editorial Trust Markers */}
              <div className="pt-8 border-t border-white/[0.06] grid grid-cols-1 sm:grid-cols-3 gap-5 text-[12px] text-slate-400">
                <div className="space-y-1">
                  <span className="text-white font-medium block">Regulatory Security</span>
                  <span className="text-slate-400 text-[11px] block leading-normal">
                    Kenya Data Protection Act 2019 compliance & zero-trust IAM
                  </span>
                </div>
                <div className="space-y-1">
                  <span className="text-white font-medium block">IP & Code Custody</span>
                  <span className="text-slate-400 text-[11px] block leading-normal">
                    100% full source code and data ownership with no licensing lock-in
                  </span>
                </div>
                <div className="space-y-1">
                  <span className="text-white font-medium block">Regional Telemetry</span>
                  <span className="text-slate-400 text-[11px] block leading-normal">
                    Native M-Pesa STK push, multi-bank reconciliation, and offline cache
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Architectural Workplace Photography */}
            <motion.div 
              className="lg:col-span-5"
              variants={deliberateHeroVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.15 }}
            >
              <div className="relative p-2.5 rounded-2xl bg-white/[0.02] border border-white/[0.08] shadow-2xl">
                <div className="rounded-xl overflow-hidden border border-white/[0.08] relative aspect-[4/3] bg-[#0E0A1A]">
                  <img
                    src={DEFAULT_PHOTOS.hero.url}
                    alt={DEFAULT_PHOTOS.hero.alt}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="mt-3 px-2 py-1.5 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                  <span className="text-slate-300">Nairobi Engineering Hub · Real Environment</span>
                  <span className="text-[#FFC400]">Slot: hero</span>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 2. Architectural Capabilities Ledger (Instead of generic icon card clone) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border border-white/[0.08] rounded-xl overflow-hidden bg-[#0D091A]">
          <div className="p-6 sm:p-8 border-b border-white/[0.06] flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-[0.12em] text-[#FFC400] font-semibold block mb-1">
                Core Competencies
              </span>
              <h2 className="text-xl sm:text-2xl font-medium text-white tracking-tight">
                Architectural Standards Across the Stack
              </h2>
            </div>
            <span className="text-xs text-slate-400 font-mono">
              04 Foundation Pillars
            </span>
          </div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/[0.06]"
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
          >
            {[
              {
                number: '01',
                title: 'Full-Stack Software Engineering',
                desc: 'Type-safe React, TypeScript, and Node.js microservices engineered with strict unit test coverage and high concurrent throughput.',
                tag: 'Web & Mobile Apps'
              },
              {
                number: '02',
                title: 'Management Information Systems',
                desc: 'Purpose-built ERP, multi-warehouse inventory, and electronic health record systems tailored to operational realities.',
                tag: 'Institutional MIS'
              },
              {
                number: '03',
                title: 'Cloud Infrastructure & DevOps',
                desc: 'Containerized Docker/Kubernetes clusters with automated point-in-time database snapshotting and 99.99% availability.',
                tag: 'Cloud & SLA'
              },
              {
                number: '04',
                title: 'Cybersecurity & Compliance',
                desc: 'Rigorous penetration testing, access control architecture, and complete compliance with the Kenya Data Protection Act 2019.',
                tag: 'Security & Audit'
              }
            ].map((pillar) => (
              <motion.div 
                key={pillar.number}
                variants={deliberateCardVariants}
                className="p-6 sm:p-8 space-y-4 hover:bg-white/[0.015] transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-[#FFC400] font-bold">
                    {pillar.number}
                  </span>
                  <span className="text-[10px] font-mono uppercase text-slate-400 tracking-wider">
                    {pillar.tag}
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-white tracking-tight leading-snug">
                  {pillar.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {pillar.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 3. Services Directory - Refined Human-Crafted Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-6 border-b border-white/[0.06]">
          <div className="space-y-2">
            <span className="text-[11px] font-mono uppercase tracking-[0.12em] text-[#FFC400] font-semibold block">
              Catalog of Disciplines
            </span>
            <h2 className="text-2xl sm:text-3xl font-medium text-white tracking-tight">
              Specialized Technology Services
            </h2>
            <p className="text-xs text-slate-400 max-w-xl">
              Engineered for sustained operational continuity, sub-second latency, and frictionless customer transactions.
            </p>
          </div>

          <button
            onClick={() => setActiveTab('services')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#FFC400] hover:text-[#ffcd20] transition-colors self-start md:self-auto cursor-pointer"
          >
            <span>Complete 8-Service Breakdown</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 8 Categories with custom padding, deliberate spacing, and staggered visual rhythm */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7 xl:gap-8 items-stretch"
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
        >
          {SERVICES_CATALOG.map((service, idx) => (
            <motion.div
              key={service.id}
              variants={deliberateCardVariants}
              whileHover={subtleCardHover}
              onClick={() => onOpenServiceModal(service)}
              className={`p-7 sm:p-8 rounded-2xl bg-[#0D091A] border border-white/[0.07] hover:border-white/[0.2] transition-all cursor-pointer group flex flex-col justify-between shadow-lg ${
                idx % 2 === 1 ? 'lg:translate-y-4' : 'lg:-translate-y-1'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-1">
                  <div className="w-10 h-10 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-[#FFC400]">
                    {iconMap[service.icon]}
                  </div>
                  <span className="font-mono text-xs text-slate-400 font-semibold px-2 py-0.5 rounded bg-white/[0.02] border border-white/[0.05]">
                    {service.number}
                  </span>
                </div>

                <h3 className="text-sm sm:text-[15px] font-semibold text-white tracking-tight group-hover:text-[#FFC400] transition-colors leading-snug">
                  {service.title}
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                  {service.description}
                </p>
              </div>

              <div className="pt-5 mt-7 border-t border-white/[0.05] flex items-center justify-between text-[11px]">
                <span className="text-slate-400 font-mono">{service.subServices.length} sub-services</span>
                <span className="inline-flex items-center gap-1.5 text-[#FFC400] font-medium group-hover:translate-x-1 transition-transform">
                  <span>Scope</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 4. Interactive Commercial Planning Engine (Fine-Grain Borders & Negative Space) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-[#0D091A] border border-white/[0.08] p-6 sm:p-10 lg:p-12 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-white/[0.06]">
            <div>
              <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.12em] text-[#FFC400] font-semibold mb-1">
                <Sliders className="w-3.5 h-3.5" />
                <span>Commercial Estimator</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-medium text-white tracking-tight">
                Project Scope & Estimated Investment Calculator
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Configure your project requirements to calculate estimated sprint duration and capital allocation.
              </p>
            </div>

            {/* Currency Selector */}
            <div className="flex items-center gap-1 bg-white/[0.04] p-1 rounded border border-white/[0.08] shrink-0">
              <button
                onClick={() => setCurrency('KES')}
                className={`px-3 py-1 text-xs font-semibold rounded transition-colors ${
                  currency === 'KES' ? 'bg-[#FFC400] text-[#0A0713]' : 'text-slate-400 hover:text-white'
                }`}
              >
                KES (KSh)
              </button>
              <button
                onClick={() => setCurrency('USD')}
                className={`px-3 py-1 text-xs font-semibold rounded transition-colors ${
                  currency === 'USD' ? 'bg-[#FFC400] text-[#0A0713]' : 'text-slate-400 hover:text-white'
                }`}
              >
                USD ($)
              </button>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Input Controls */}
            <div className="lg:col-span-8 space-y-7">
              
              {/* Architecture Type */}
              <div>
                <label className="text-[11px] font-mono uppercase tracking-wider text-slate-300 block mb-2.5">
                  1. Core Architecture Platform
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {[
                    { id: 'web', label: 'Corporate Web / Portal' },
                    { id: 'mobile', label: 'Mobile App / PWA' },
                    { id: 'erp', label: 'Custom ERP / MIS' },
                    { id: 'cloud', label: 'Cloud Infrastructure' }
                  ].map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setProjectType(p.id as any)}
                      className={`p-3 rounded border text-left text-xs font-medium transition-all ${
                        projectType === p.id
                          ? 'bg-white/[0.08] border-[#FFC400] text-white shadow-sm'
                          : 'bg-white/[0.02] border-white/[0.06] text-slate-400 hover:text-white hover:border-white/[0.12]'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Scale Tier */}
              <div>
                <label className="text-[11px] font-mono uppercase tracking-wider text-slate-300 block mb-2.5">
                  2. Concurrency & Scale Model
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {[
                    { id: 'mvp', title: 'Lean Pilot Launch', desc: 'Up to 1,000 active users' },
                    { id: 'growth', title: 'Growth Business', desc: '1,000 to 25,000 users' },
                    { id: 'enterprise', title: 'Enterprise Concurrency', desc: '25,000+ users & multi-branch' }
                  ].map((tier) => (
                    <button
                      key={tier.id}
                      onClick={() => setScaleTier(tier.id as any)}
                      className={`p-3.5 rounded border text-left transition-all ${
                        scaleTier === tier.id
                          ? 'bg-white/[0.08] border-[#FFC400] text-white shadow-sm'
                          : 'bg-white/[0.02] border-white/[0.06] text-slate-400 hover:text-white hover:border-white/[0.12]'
                      }`}
                    >
                      <span className="text-xs font-semibold block mb-0.5">{tier.title}</span>
                      <span className="text-[11px] text-slate-400 block">{tier.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Addon Modules */}
              <div>
                <label className="text-[11px] font-mono uppercase tracking-wider text-slate-300 block mb-2.5">
                  3. Critical Integrations
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label className="flex items-center gap-3 p-3 rounded bg-white/[0.02] border border-white/[0.06] cursor-pointer text-xs text-slate-200 hover:border-white/[0.12] transition-colors">
                    <input
                      type="checkbox"
                      checked={includeMpesa}
                      onChange={(e) => setIncludeMpesa(e.target.checked)}
                      className="w-4 h-4 text-[#FFC400] bg-transparent rounded focus:ring-0"
                    />
                    <span>Automated M-Pesa STK Push & Multi-Bank Reconciliation</span>
                  </label>

                  <label className="flex items-center gap-3 p-3 rounded bg-white/[0.02] border border-white/[0.06] cursor-pointer text-xs text-slate-200 hover:border-white/[0.12] transition-colors">
                    <input
                      type="checkbox"
                      checked={includeOffline}
                      onChange={(e) => setIncludeOffline(e.target.checked)}
                      className="w-4 h-4 text-[#FFC400] bg-transparent rounded focus:ring-0"
                    />
                    <span>Offline-First Data Caching for Low-Bandwidth Regions</span>
                  </label>
                </div>
              </div>

            </div>

            {/* Dynamic Results Card */}
            <div className="lg:col-span-4 p-6 rounded-xl bg-white/[0.02] border border-white/[0.08] flex flex-col justify-between">
              <div className="space-y-4">
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                  Project Estimate Breakdown
                </span>

                <div className="py-2 border-b border-white/[0.06]">
                  <span className="text-xs text-slate-400 block mb-1">Target Development Duration:</span>
                  <span className="text-2xl font-semibold text-white font-mono">
                    ~{estimate.weeks} Weeks
                  </span>
                  <span className="text-[11px] text-slate-400 block mt-0.5">
                    Structured in 2-week agile sprints with staged client reviews.
                  </span>
                </div>

                <div className="py-2">
                  <span className="text-xs text-slate-400 block mb-1">Estimated Investment Bracket:</span>
                  <span className="text-2xl font-semibold text-[#FFC400] font-mono">
                    {currency === 'KES' ? estimate.formattedKES : estimate.formattedUSD}
                  </span>
                  <span className="text-[11px] text-slate-400 block mt-1">
                    Includes source code, documentation, QA testing, and 60-day post-launch warranty.
                  </span>
                </div>
              </div>

              <div className="pt-6 border-t border-white/[0.06] space-y-2">
                <button
                  onClick={() => setActiveTab('quote')}
                  className="w-full py-3 bg-[#FFC400] hover:bg-[#ffcd20] text-[#0A0713] font-semibold text-xs tracking-wide rounded transition-colors shadow text-center cursor-pointer"
                >
                  Proceed to Formal Quote
                </button>
                <p className="text-[11px] text-slate-400 font-mono text-center">
                  Subject to final technical specification charter.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. Capability Comparison Matrix (Fine-Grain Borders) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-[11px] font-mono uppercase tracking-[0.12em] text-[#FFC400] font-semibold block">
            Objective Criteria
          </span>
          <h2 className="text-2xl font-medium text-white tracking-tight">
            Why Infranovix Outperforms Traditional Alternatives
          </h2>
          <p className="text-xs text-slate-400">
            A transparent comparison of engineering accountability and commercial return.
          </p>
        </div>

        <div className="rounded-xl overflow-hidden border border-white/[0.08] bg-[#0D091A]">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-white/[0.08] bg-white/[0.02]">
                  <th className="p-4 text-slate-300 font-semibold uppercase tracking-wider text-[11px]">Evaluation Dimension</th>
                  <th className="p-4 text-[#FFC400] font-semibold uppercase tracking-wider text-[11px] bg-white/[0.04]">
                    Infranovix Technologies
                  </th>
                  <th className="p-4 text-slate-400 font-medium uppercase tracking-wider text-[11px]">Foreign Off-the-Shelf SaaS</th>
                  <th className="p-4 text-slate-400 font-medium uppercase tracking-wider text-[11px]">Freelancers / Templates</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06] text-slate-300">
                {VENDOR_COMPARISON_MATRIX.map((row, idx) => (
                  <tr key={idx} className="hover:bg-white/[0.015] transition-colors">
                    <td className="p-4 font-medium text-white">
                      {row.criterion}
                    </td>
                    <td className="p-4 text-white font-medium bg-white/[0.02] border-x border-white/[0.06]">
                      <div className="flex items-start gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{row.infranovix}</span>
                      </div>
                    </td>
                    <td className="p-4 text-slate-400">
                      {row.foreignSaaS}
                    </td>
                    <td className="p-4 text-slate-400">
                      {row.genericFreelancers}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 6. Process Section - Clean Editorial Flow */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <span className="text-[11px] font-mono uppercase tracking-[0.12em] text-[#FFC400] font-semibold block">
            Delivery Discipline
          </span>
          <h2 className="text-2xl sm:text-3xl font-medium text-white tracking-tight">
            Six-Stage Delivery Framework
          </h2>
          <p className="text-xs text-slate-400">
            A milestone-driven lifecycle providing absolute visibility from discovery to long-term SLA support.
          </p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
        >
          {COMPANY_IDENTITY.deliveryProcess.map((proc) => (
            <motion.div 
              key={proc.step}
              variants={deliberateCardVariants}
              whileHover={subtleCardHover}
              className="p-6 rounded-xl bg-[#0D091A] border border-white/[0.07] hover:border-white/[0.18] transition-colors space-y-2.5"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm font-bold text-[#FFC400]">
                  {proc.step}
                </span>
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                  Stage
                </span>
              </div>
              <h3 className="text-base font-semibold text-white tracking-tight">
                {proc.title}
              </h3>
              <p className="text-[12px] text-slate-400 font-medium">
                {proc.tagline}
              </p>
              <p className="text-xs text-slate-400 leading-relaxed pt-1">
                {proc.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 7. Featured Demonstration Projects (With Daylight Real Photos) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-white/[0.06]">
          <div className="space-y-2">
            <span className="text-[11px] font-mono uppercase tracking-[0.12em] text-[#FFC400] font-semibold block">
              Architectural Artifacts
            </span>
            <h2 className="text-2xl sm:text-3xl font-medium text-white tracking-tight">
              Featured Demonstration Cases
            </h2>
            <p className="text-xs text-slate-400 max-w-xl">
              Inspect our high-performance demonstration architectures illustrating our software engineering and MIS standards.
            </p>
          </div>
          <button
            onClick={() => setActiveTab('portfolio')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#FFC400] hover:text-[#ffcd20] transition-colors whitespace-nowrap cursor-pointer"
          >
            <span>View All Projects</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-start"
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
        >
          {PORTFOLIO_PROJECTS.slice(0, 2).map((proj, idx) => (
            <motion.div
              key={proj.id}
              variants={deliberateCardVariants}
              whileHover={subtleCardHover}
              onClick={() => onOpenProjectModal(proj)}
              className={`rounded-2xl overflow-hidden bg-[#0D091A] border border-white/[0.07] hover:border-white/[0.2] transition-all cursor-pointer group flex flex-col justify-between shadow-xl ${
                idx === 1 ? 'lg:mt-12' : 'lg:mb-6'
              }`}
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-black/40">
                <img
                  src={proj.image}
                  alt={proj.title}
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-[1.03]"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-[#0A0713]/90 backdrop-blur-md px-3 py-1.5 rounded border border-white/10 text-[10px] text-[#FFC400] font-mono uppercase tracking-wider font-semibold">
                  {proj.category}
                </div>
                <div className="absolute top-4 right-4 bg-[#0A0713]/90 backdrop-blur-md px-3 py-1.5 rounded border border-white/10 text-[10px] text-slate-300 font-mono">
                  Demonstration Lab
                </div>
              </div>

              <div className="p-7 sm:p-9 lg:p-10 space-y-5">
                <div>
                  <h3 className="text-xl font-semibold text-white tracking-tight group-hover:text-[#FFC400] transition-colors">
                    {proj.title}
                  </h3>
                  <p className="text-xs sm:text-[13px] text-slate-300 font-medium mt-1.5">
                    {proj.tagline}
                  </p>
                </div>

                <p className="text-xs sm:text-[13px] text-slate-400 leading-relaxed line-clamp-3">
                  {proj.description}
                </p>

                <div className="flex flex-wrap gap-2 pt-1.5">
                  {proj.technologies.slice(0, 4).map((tech, i) => (
                    <span key={i} className="px-2.5 py-1 rounded bg-white/[0.03] text-[10px] font-mono text-slate-300 border border-white/[0.07]">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="pt-6 mt-4 border-t border-white/[0.06] flex items-center justify-between text-xs text-slate-400">
                  <span className="font-mono text-slate-300 text-[11px]">{proj.demoMetrics}</span>
                  <span className="inline-flex items-center gap-1.5 text-[#FFC400] font-medium group-hover:translate-x-1 transition-transform">
                    <span>Inspect Architecture</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 8. Conversion Section - Architectural Frame */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-white/[0.1] bg-[#0E0A1A] p-8 sm:p-12 lg:p-14 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-3">
              <span className="text-[11px] font-mono uppercase tracking-[0.12em] text-[#FFC400] font-semibold block">
                Begin Technical Consultation
              </span>
              <h2 className="text-2xl sm:text-3xl font-medium text-white tracking-tight">
                Ready to Build Something Extraordinary?
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
                Whether you need a full enterprise MIS system, a high-converting web presence, or strategic IT advice, our senior engineering team is ready to assist.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-center justify-center lg:items-end gap-3">
              <button
                onClick={() => setActiveTab('quote')}
                className="w-full sm:w-auto lg:w-full py-3.5 px-6 bg-[#FFC400] hover:bg-[#ffcd20] text-[#0A0713] font-semibold text-xs tracking-wide rounded transition-all shadow text-center cursor-pointer active:scale-95"
              >
                Let's Discuss Your Project
              </button>
              <button
                onClick={() => setActiveTab('contact')}
                className="w-full sm:w-auto lg:w-full py-3 px-6 bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.12] text-white font-medium text-xs rounded transition-colors text-center cursor-pointer"
              >
                Schedule Consultation Call
              </button>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};
