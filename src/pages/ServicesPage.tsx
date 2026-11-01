import React, { useState } from 'react';
import { 
  Globe, 
  Smartphone, 
  Layers, 
  Cpu, 
  Cloud, 
  ShieldCheck, 
  Workflow, 
  Palette, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  Search,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { SERVICES_CATALOG, ServiceCategory } from '../data/companyData';
import { motion } from 'framer-motion';
import { 
  staggerContainerVariants, 
  deliberateCardVariants, 
  subtleCardHover 
} from '../utils/animations';

interface ServicesPageProps {
  onOpenServiceModal: (service: ServiceCategory) => void;
  onRequestQuote: (serviceCategory: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  onOpenServiceModal,
  onRequestQuote,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [expandedServices, setExpandedServices] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string) => {
    setExpandedServices(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const iconMap: Record<string, React.ReactNode> = {
    Globe: <Globe className="w-5 h-5 text-[#FFC400]" />,
    Smartphone: <Smartphone className="w-5 h-5 text-[#FFC400]" />,
    Layers: <Layers className="w-5 h-5 text-[#FFC400]" />,
    Cpu: <Cpu className="w-5 h-5 text-[#FFC400]" />,
    Cloud: <Cloud className="w-5 h-5 text-[#FFC400]" />,
    ShieldCheck: <ShieldCheck className="w-5 h-5 text-[#FFC400]" />,
    Workflow: <Workflow className="w-5 h-5 text-[#FFC400]" />,
    Palette: <Palette className="w-5 h-5 text-[#FFC400]" />
  };

  const filteredServices = SERVICES_CATALOG.filter(service => {
    const matchesFilter = selectedFilter === 'all' || service.id === selectedFilter;
    const query = searchQuery.toLowerCase();
    const matchesSearch = 
      service.title.toLowerCase().includes(query) ||
      service.description.toLowerCase().includes(query) ||
      service.subServices.some(sub => sub.toLowerCase().includes(query));
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-16 sm:space-y-24 pb-28">
      {/* 1. Header Banner with Refined Spacing */}
      <section className="relative pt-12 sm:pt-16 pb-14 border-b border-white/[0.07]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <span className="text-[11px] font-mono uppercase tracking-[0.12em] text-[#FFC400] font-semibold block mb-2.5">
            Specialized Engineering Practices
          </span>
          <h1 className="text-3xl sm:text-5xl font-medium text-white tracking-tight leading-tight">
            Enterprise Solutions Directory
          </h1>
          <p className="mt-4 text-[15px] text-slate-300 leading-relaxed font-normal">
            From modern responsive web design to enterprise ERP development, cloud infrastructure, and cybersecurity, explore our eight specialized technology disciplines.
          </p>

          {/* Search Bar - Fine-Grain Border */}
          <div className="mt-8 max-w-xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter services by keyword (e.g. ERP, PWA, Cloud, Cybersecurity)..."
              className="w-full pl-11 pr-4 py-3 bg-[#0D091A] border border-white/[0.08] rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#FFC400] transition-colors shadow-sm"
            />
          </div>
        </div>
      </section>

      {/* 2. Interactive Category Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-4 no-scrollbar border-b border-white/[0.06]">
          <button
            onClick={() => setSelectedFilter('all')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              selectedFilter === 'all'
                ? 'bg-[#FFC400] text-[#0A0713]'
                : 'text-slate-300 hover:text-white bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06]'
            }`}
          >
            All Services ({SERVICES_CATALOG.length})
          </button>
          {SERVICES_CATALOG.map((s) => (
            <button
              key={s.id}
              onClick={() => setSelectedFilter(s.id)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                selectedFilter === s.id
                  ? 'bg-[#FFC400] text-[#0A0713] font-semibold'
                  : 'text-slate-300 hover:text-white bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06]'
              }`}
            >
              {s.number}. {s.title.split(' ')[0]} {s.title.split(' ')[1] || ''}
            </button>
          ))}
        </div>
      </section>

      {/* 3. Detailed Services Catalog - Handcrafted Fine-Grain Cards with Generous Spacing */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="space-y-10 sm:space-y-14"
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
        >
          {filteredServices.map((service) => {
            const isExpanded = Boolean(expandedServices[service.id]);
            return (
              <motion.div 
                key={service.id}
                variants={deliberateCardVariants}
                whileHover={subtleCardHover}
                className="rounded-2xl bg-[#0D091A] border border-white/[0.07] hover:border-white/[0.2] transition-colors p-7 sm:p-10 lg:p-12 shadow-xl"
              >
                {/* Top Header Row with Generous Negative Space */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-white/[0.06]">
                  <div className="flex items-start gap-4 sm:gap-5">
                    <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center shrink-0 text-[#FFC400]">
                      {iconMap[service.icon]}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-1.5">
                        <span className="text-[#FFC400] font-semibold">Category {service.number}</span>
                        <span aria-hidden="true" className="text-white/20">/</span>
                        <span>{service.subServices.length} Sub-Services</span>
                      </div>
                      <h2 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
                        {service.title}
                      </h2>
                      <p className="text-xs sm:text-[13px] text-slate-300 font-medium mt-1.5">
                        {service.tagline}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 pt-2 md:pt-0">
                    <button
                      onClick={() => onOpenServiceModal(service)}
                      className="px-4 py-2.5 bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] rounded-lg text-xs font-medium text-slate-200 transition-colors cursor-pointer"
                    >
                      Quick Overview
                    </button>
                    <button
                      onClick={() => onRequestQuote(service.title)}
                      className="px-5 py-2.5 bg-[#FFC400] hover:bg-[#ffcd20] text-[#0A0713] font-semibold text-xs rounded-lg transition-colors shadow-sm cursor-pointer whitespace-nowrap"
                    >
                      Request Service
                    </button>
                  </div>
                </div>

                {/* Service Overview Prose */}
                <div className="py-7">
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-4xl font-normal">
                    {service.description}
                  </p>
                </div>

                {/* Sub-Services Listing with Dedicated Spacing */}
                <div className="pt-2 pb-7">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                      Deliverable Scope ({service.subServices.length})
                    </span>
                    <button
                      onClick={() => toggleExpand(service.id)}
                      className="text-xs text-[#FFC400] hover:underline flex items-center gap-1 font-medium cursor-pointer"
                    >
                      <span>{isExpanded ? 'Collapse' : `View All (${service.subServices.length})`}</span>
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {(isExpanded ? service.subServices : service.subServices.slice(0, 6)).map((sub, idx) => (
                      <div 
                        key={idx}
                        className="p-3.5 rounded-lg bg-white/[0.02] border border-white/[0.05] flex items-start gap-2.5 text-xs text-slate-300"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FFC400] mt-1.5 shrink-0" />
                        <span className="leading-snug">{sub}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Problems vs Benefits Columns with Fine-Grain Negative Space */}
                <div className="pt-8 mt-2 border-t border-white/[0.06] grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                  {/* Problems Addressed */}
                  <div className="p-5 sm:p-6 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                    <div className="flex items-center gap-2 text-xs font-semibold text-rose-300 mb-3.5">
                      <AlertCircle className="w-4 h-4 text-rose-400" />
                      <span>Business Problems Addressed</span>
                    </div>
                    <ul className="space-y-2 text-xs text-slate-300">
                      {service.problemsAddressed.map((prob, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-rose-400 font-bold shrink-0">✕</span>
                          <span>{prob}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Benefits */}
                  <div className="p-4 rounded-lg bg-white/[0.02] border border-white/[0.05]">
                    <div className="flex items-center gap-2 text-xs font-semibold text-emerald-300 mb-2.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Commercial Outcomes & Returns</span>
                    </div>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {service.keyBenefits.map((ben, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-emerald-400 font-bold shrink-0">✓</span>
                          <span>{ben}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Deliverables Footer Strip */}
                <div className="mt-6 pt-4 border-t border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-slate-400">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-white font-medium">Deliverables:</span>
                    {service.deliverables.map((del, dIdx) => (
                      <span key={dIdx} className="bg-white/[0.03] px-2 py-0.5 rounded border border-white/[0.06] text-slate-300 text-[11px]">
                        {del}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => onRequestQuote(service.title)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#FFC400] hover:text-[#ffcd20] transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <span>Request Quotation</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </section>
    </div>
  );
};
