import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { SolutionsPage } from './pages/SolutionsPage';
import { PortfolioPage } from './pages/PortfolioPage';
import { InsightsPage } from './pages/InsightsPage';
import { ContactPage } from './pages/ContactPage';
import { QuotePage } from './pages/QuotePage';
import { ServiceDetailModal } from './components/ServiceDetailModal';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { AdminPortalModal } from './components/AdminPortalModal';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { SERVICES_CATALOG, ServiceCategory, PortfolioProject } from './data/companyData';

function AppContent() {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedService, setSelectedService] = useState<ServiceCategory | null>(null);
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [quotePreselectedService, setQuotePreselectedService] = useState<string>('');

  // Handle URL hash changes for SEO and bookmarking
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (['home', 'about', 'services', 'solutions', 'portfolio', 'insights', 'contact', 'quote'].includes(hash)) {
        setActiveTab(hash);
      }
    };

    if (window.location.hash) {
      handleHashChange();
    }

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    window.location.hash = tab;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRequestQuote = (serviceName: string) => {
    setQuotePreselectedService(serviceName);
    handleTabChange('quote');
  };

  const handleSelectServiceFromFooter = (serviceId: string) => {
    const s = SERVICES_CATALOG.find(item => item.id === serviceId);
    if (s) {
      setSelectedService(s);
    }
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-200 selection:bg-[#FFC400] selection:text-[#090611] ${
      theme === 'light' ? 'bg-[#F8F9FD] text-slate-900' : 'bg-[#090611] text-slate-100'
    }`}>
      {/* 3-Zone Top Navigation with Hamburger, Search & Theme Toggle */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenServiceModal={(service) => setSelectedService(service)}
        onOpenProjectModal={(project) => setSelectedProject(project)}
      />

      {/* Main Page Content Body */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <HomePage
            setActiveTab={handleTabChange}
            onOpenServiceModal={(service) => setSelectedService(service)}
            onOpenProjectModal={(project) => setSelectedProject(project)}
          />
        )}

        {activeTab === 'about' && (
          <AboutPage setActiveTab={handleTabChange} />
        )}

        {activeTab === 'services' && (
          <ServicesPage
            onOpenServiceModal={(service) => setSelectedService(service)}
            onRequestQuote={handleRequestQuote}
          />
        )}

        {activeTab === 'solutions' && (
          <SolutionsPage onRequestQuote={handleRequestQuote} />
        )}

        {activeTab === 'portfolio' && (
          <PortfolioPage
            onOpenProjectModal={(project) => setSelectedProject(project)}
            onRequestQuote={handleRequestQuote}
          />
        )}

        {activeTab === 'insights' && (
          <InsightsPage />
        )}

        {activeTab === 'contact' && (
          <ContactPage />
        )}

        {activeTab === 'quote' && (
          <QuotePage preselectedService={quotePreselectedService} />
        )}
      </main>

      {/* Comprehensive Corporate Footer */}
      <Footer
        setActiveTab={handleTabChange}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onSelectService={handleSelectServiceFromFooter}
      />

      {/* Persistent WhatsApp Contact Launcher */}
      <WhatsAppFloatingButton />

      {/* Modals */}
      <ServiceDetailModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onRequestQuote={handleRequestQuote}
      />

      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onRequestSimilar={handleRequestQuote}
      />

      <AdminPortalModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

