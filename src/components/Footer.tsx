import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, ArrowRight, Shield, CheckCircle2, AlertCircle } from 'lucide-react';
import { COMPANY_IDENTITY, SERVICES_CATALOG } from '../data/companyData';

interface FooterProps {
  setActiveTab: (tab: string) => void;
  onOpenAdmin: () => void;
  onSelectService: (serviceId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, onOpenAdmin, onSelectService }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subStatus, setSubStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [subMessage, setSubMessage] = useState('');

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      setSubStatus('error');
      setSubMessage('Please enter a valid corporate email address.');
      return;
    }

    try {
      setSubStatus('loading');
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newsletterEmail })
      });
      const data = await res.json();
      if (res.ok) {
        setSubStatus('success');
        setSubMessage(data.message || 'Thank you for subscribing to Infranovix Insights.');
        setNewsletterEmail('');
      } else {
        setSubStatus('error');
        setSubMessage(data.error || 'Unable to subscribe. Please try again.');
      }
    } catch (err) {
      setSubStatus('error');
      setSubMessage('Network connection error. Please try again later.');
    }
  };

  const navigateTo = (tab: string) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#07040D] border-t border-white/[0.07] text-slate-300">
      {/* Top Banner / Newsletter Section */}
      <div className="border-b border-white/[0.06] bg-[#0A0713] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <span className="text-xs font-mono uppercase tracking-widest text-[#FFC400] block mb-2">
                Knowledge & Technology Briefs
              </span>
              <h3 className="text-2xl font-semibold text-white tracking-tight">
                Engineering & Digital Transformation Dispatches
              </h3>
              <p className="text-xs text-slate-400 mt-2 max-w-xl leading-relaxed">
                Receive our monthly technical briefs examining cloud resilience, offline data architectures, fintech integrations, and custom ERP deployments.
              </p>
            </div>
            <div className="lg:col-span-5">
              <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter corporate email address"
                    className="flex-1 px-4 py-2.5 bg-[#0D091A] border border-white/[0.08] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#FFC400]/60 transition-colors"
                    required
                  />
                  <button
                    type="submit"
                    disabled={subStatus === 'loading'}
                    className="px-5 py-2.5 bg-[#FFC400] hover:bg-[#ffcd20] text-[#090611] text-xs font-semibold uppercase tracking-wider transition-colors whitespace-nowrap shrink-0 disabled:opacity-50 cursor-pointer"
                  >
                    {subStatus === 'loading' ? 'Subscribing...' : 'Subscribe'}
                  </button>
                </div>
                {subStatus === 'success' && (
                  <div className="flex items-center gap-1.5 text-xs text-emerald-400 mt-1 font-mono">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{subMessage}</span>
                  </div>
                )}
                {subStatus === 'error' && (
                  <div className="flex items-center gap-1.5 text-xs text-rose-400 mt-1 font-mono">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{subMessage}</span>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-5">
            <div className="flex items-center gap-3">
              <img
                src="/assets/aistudio/file_000000004c208211a816f3e41a7710e5_7714a59c.jpg"
                alt="Infranovix Technologies"
                className="h-10 w-auto object-contain rounded"
                referrerPolicy="no-referrer"
              />
              <div>
                <span className="text-base font-semibold text-white tracking-tight uppercase block">
                  INFRANOVIX
                </span>
                <span className="text-[10px] text-[#FFC400] font-mono tracking-widest block">
                  {COMPANY_IDENTITY.slogan}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Empowering institutions, fast-scaling startups, and enterprises across Kenya and internationally through high-impact software engineering, resilient cloud infrastructure, and strategic digital transformation.
            </p>

            <div className="space-y-2.5 pt-2 text-xs text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#FFC400] shrink-0 mt-0.5" />
                <span>Westlands Commercial Hub, Nairobi, Kenya</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#FFC400] shrink-0" />
                <a href="mailto:info@infranovix.co.ke" className="hover:text-white transition-colors font-mono">
                  info@infranovix.co.ke
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#FFC400] shrink-0" />
                <a href="tel:+254700123456" className="hover:text-white transition-colors font-mono">
                  +254 (0) 700 123 456
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#FFC400] shrink-0" />
                <span>Mon – Fri: 8:00 AM – 5:30 PM (EAT)</span>
              </div>
            </div>
          </div>

          {/* Quick Nav */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-white mb-4">
              Company
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li>
                <button onClick={() => navigateTo('home')} className="hover:text-[#FFC400] transition-colors cursor-pointer">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('about')} className="hover:text-[#FFC400] transition-colors cursor-pointer">
                  About Us & Governance
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('services')} className="hover:text-[#FFC400] transition-colors cursor-pointer">
                  Services Directory (8 Verticals)
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('solutions')} className="hover:text-[#FFC400] transition-colors cursor-pointer">
                  Sector Solutions
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('portfolio')} className="hover:text-[#FFC400] transition-colors cursor-pointer">
                  Demonstration Portfolio
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('insights')} className="hover:text-[#FFC400] transition-colors cursor-pointer">
                  Engineering Insights
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('contact')} className="hover:text-[#FFC400] transition-colors cursor-pointer">
                  Direct Inquiries
                </button>
              </li>
            </ul>
          </div>

          {/* Services Quick Directory */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-white mb-4">
              Service Catalog
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              {SERVICES_CATALOG.slice(0, 6).map((service) => (
                <li key={service.id}>
                  <button
                    onClick={() => {
                      navigateTo('services');
                      onSelectService(service.id);
                    }}
                    className="hover:text-[#FFC400] text-left transition-colors cursor-pointer line-clamp-1"
                  >
                    {service.number}. {service.title}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => navigateTo('services')}
                  className="text-[#FFC400] hover:underline inline-flex items-center gap-1 font-medium mt-1 cursor-pointer"
                >
                  <span>View all 8 categories</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </li>
            </ul>
          </div>

          {/* Sector Solutions & Action */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-white mb-4">
              Sector Delivery
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>SMEs & Logistics Hubs</li>
              <li>Fintech & Venture Startups</li>
              <li>School & University MIS</li>
              <li>Healthcare EMR & Clinics</li>
              <li>Retail & Unified M-Pesa</li>
              <li>NGOs & Offline Field Apps</li>
              <li>Multi-Branch Enterprise ERP</li>
            </ul>

            <div className="mt-6 pt-4 border-t border-white/[0.07]">
              <button
                onClick={() => navigateTo('quote')}
                className="w-full text-center py-2 px-3 bg-[#170F2B] hover:bg-[#25004D] border border-white/[0.08] text-white text-xs font-medium tracking-wide transition-colors cursor-pointer"
              >
                Instant Project Estimator
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-3 flex-wrap">
            <span>© {new Date().getFullYear()} Infranovix Technologies. All rights reserved.</span>
            <span aria-hidden="true">·</span>
            <span>Nairobi, Kenya</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono text-[#FFC400]">Innovate. Integrate. Elevate.</span>
          </div>

          <div className="flex items-center gap-5">
            <button 
              onClick={onOpenAdmin}
              className="inline-flex items-center gap-1.5 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
              title="Administrative Access"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Administrative Portal</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
