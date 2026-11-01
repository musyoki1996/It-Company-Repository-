import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  ArrowUpRight, 
  Shield, 
  Search, 
  Sun, 
  Moon, 
  ChevronRight, 
  Layers,
  Briefcase,
  FileText,
  Building2
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { searchPlatform, SearchResultItem } from '../utils/searchIndex';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenAdmin: () => void;
  onOpenServiceModal?: (service: any) => void;
  onOpenProjectModal?: (project: any) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  activeTab, 
  setActiveTab, 
  onOpenAdmin,
  onOpenServiceModal,
  onOpenProjectModal
}) => {
  const { theme, setTheme } = useTheme();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResultItem[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileSearchExpanded, setIsMobileSearchExpanded] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  const searchContainerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const mobileInputRef = useRef<HTMLInputElement>(null);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'services', label: 'Services' },
    { id: 'solutions', label: 'Solutions' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'insights', label: 'Insights' },
    { id: 'contact', label: 'Contact' },
  ];

  // Handle live search
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setIsSearchOpen(false);
      setSelectedIndex(-1);
      return;
    }
    const results = searchPlatform(searchQuery);
    setSearchResults(results);
    setIsSearchOpen(true);
    setSelectedIndex(-1);
  }, [searchQuery]);

  // Click outside to close search dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard navigation for search & drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
        setIsMobileSearchExpanded(false);
        setDrawerOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setDrawerOpen(false);
    setIsSearchOpen(false);
    setIsMobileSearchExpanded(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectResult = (item: SearchResultItem) => {
    setIsSearchOpen(false);
    setIsMobileSearchExpanded(false);
    setSearchQuery('');

    setActiveTab(item.tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (item.type === 'service' && onOpenServiceModal && item.payload) {
      setTimeout(() => onOpenServiceModal(item.payload), 100);
    } else if (item.type === 'project' && onOpenProjectModal && item.payload) {
      setTimeout(() => onOpenProjectModal(item.payload), 100);
    }
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (!searchResults.length) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev < searchResults.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : searchResults.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const target = selectedIndex >= 0 ? searchResults[selectedIndex] : searchResults[0];
      if (target) {
        handleSelectResult(target);
      }
    }
  };

  const getItemIcon = (type: string) => {
    switch (type) {
      case 'service': return <Layers className="w-3.5 h-3.5 text-[#FFC400]" />;
      case 'project': return <Briefcase className="w-3.5 h-3.5 text-amber-400" />;
      case 'solution': return <Building2 className="w-3.5 h-3.5 text-purple-400" />;
      case 'insight': return <FileText className="w-3.5 h-3.5 text-slate-300" />;
      default: return <Search className="w-3.5 h-3.5 text-[#FFC400]" />;
    }
  };

  return (
    <>
      <header className={`sticky top-0 z-40 w-full border-b transition-colors duration-200 ${
        theme === 'light' 
          ? 'bg-white/95 border-slate-200 text-slate-900 shadow-sm' 
          : 'bg-[#0A0713]/92 border-white/[0.07] text-slate-100'
      } backdrop-blur-md`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-3 sm:gap-4 h-[72px]">
            
            {/* Left Zone: Hamburger Menu & Official Brand Logo */}
            <div className="flex items-center gap-3 shrink-0">
              {/* Three-line Hamburger Button */}
              <button
                onClick={() => setDrawerOpen(true)}
                className={`p-2 rounded-lg transition-colors cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-[#FFC400] ${
                  theme === 'light'
                    ? 'hover:bg-slate-100 text-slate-700'
                    : 'text-slate-300 hover:text-white hover:bg-white/[0.06]'
                }`}
                aria-label="Open navigation menu"
                title="Navigation Menu"
              >
                <div className="w-5 h-3.5 flex flex-col justify-between">
                  <span className={`h-0.5 w-5 rounded-full transition-all ${theme === 'light' ? 'bg-slate-800' : 'bg-white'}`} />
                  <span className="h-0.5 w-3.5 rounded-full bg-[#FFC400] transition-all" />
                  <span className={`h-0.5 w-5 rounded-full transition-all ${theme === 'light' ? 'bg-slate-800' : 'bg-white'}`} />
                </div>
              </button>

              {/* Infranovix Official Brand Logo & Name */}
              <button 
                onClick={() => handleNavClick('home')}
                className="flex items-center gap-2.5 text-left group focus:outline-none focus-visible:ring-1 focus-visible:ring-[#FFC400] rounded-lg cursor-pointer"
                aria-label="Infranovix Technologies Home"
              >
                <img 
                  src="/assets/aistudio/file_000000004c208211a816f3e41a7710e5_7714a59c.jpg" 
                  alt="Infranovix Technologies Logo"
                  className="h-9 w-auto object-contain rounded transition-transform group-hover:scale-[1.02]"
                  referrerPolicy="no-referrer"
                />
                <div className="hidden sm:block">
                  <span className={`text-[15px] font-semibold tracking-tight block uppercase leading-tight font-sans ${
                    theme === 'light' ? 'text-slate-900' : 'text-white'
                  }`}>
                    INFRANOVIX
                  </span>
                  <span className="text-[9.5px] tracking-[0.18em] text-[#FFC400] font-semibold block font-mono">
                    TECHNOLOGIES
                  </span>
                </div>
              </button>
            </div>

            {/* Middle Zone: Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-5 xl:gap-6 text-[13px] font-medium">
              {navLinks.map((link) => {
                const isActive = activeTab === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className={`transition-colors whitespace-nowrap shrink-0 py-1.5 border-b font-medium cursor-pointer ${
                      isActive 
                        ? 'text-[#FFC400] border-[#FFC400] font-semibold' 
                        : theme === 'light'
                          ? 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
                          : 'border-transparent text-slate-300 hover:text-white hover:border-white/20'
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}
            </nav>

            {/* Right Zone: Search Bar, Theme Switcher & Quote CTA */}
            <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
              
              {/* Responsive Search Field (Desktop) */}
              <div ref={searchContainerRef} className="relative hidden md:block w-44 lg:w-56 xl:w-64">
                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all ${
                  theme === 'light'
                    ? 'bg-slate-100/90 border-slate-300 text-slate-900 focus-within:border-[#FFC400] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#FFC400]/20'
                    : 'bg-white/[0.04] border-white/[0.08] hover:border-white/[0.14] text-white focus-within:border-[#FFC400]/60 focus-within:bg-[#0A0713] focus-within:ring-2 focus-within:ring-[#FFC400]/15'
                }`}>
                  <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => {
                      if (searchQuery.trim().length >= 2) setIsSearchOpen(true);
                    }}
                    onKeyDown={handleSearchKeyDown}
                    placeholder="Search Infranovix..."
                    className="w-full bg-transparent text-xs outline-none placeholder-slate-400 font-sans"
                    aria-label="Search platform services, projects, and insights"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setIsSearchOpen(false);
                      }}
                      className="text-slate-400 hover:text-slate-200 text-xs p-0.5 cursor-pointer"
                      aria-label="Clear search query"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Search Results Dropdown Overlay */}
                <AnimatePresence>
                  {isSearchOpen && searchResults.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.18 }}
                      className={`absolute right-0 mt-2 w-80 sm:w-96 rounded-xl border shadow-2xl overflow-hidden z-50 ${
                        theme === 'light'
                          ? 'bg-white border-slate-200 text-slate-800 divide-y divide-slate-100'
                          : 'bg-[#0D091A] border-white/[0.12] text-slate-200 divide-y divide-white/[0.06]'
                      }`}
                    >
                      <div className="p-2.5 flex items-center justify-between text-[11px] font-mono text-slate-400">
                        <span>{searchResults.length} Match{searchResults.length > 1 ? 'es' : ''} Found</span>
                        <span>Press Enter to Open</span>
                      </div>

                      <div className="max-h-80 overflow-y-auto divide-y divide-white/[0.04]">
                        {searchResults.map((item, idx) => (
                          <div
                            key={item.id}
                            onClick={() => handleSelectResult(item)}
                            className={`p-3 flex items-start gap-3 cursor-pointer transition-colors ${
                              selectedIndex === idx
                                ? theme === 'light' ? 'bg-slate-100' : 'bg-white/[0.08]'
                                : theme === 'light' ? 'hover:bg-slate-50' : 'hover:bg-white/[0.04]'
                            }`}
                          >
                            <div className={`p-1.5 rounded mt-0.5 shrink-0 ${
                              theme === 'light' ? 'bg-slate-100' : 'bg-white/[0.06]'
                            }`}>
                              {getItemIcon(item.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-0.5">
                                <span className="text-[10px] font-mono uppercase tracking-wider text-[#FFC400] font-semibold">
                                  {item.badge}
                                </span>
                              </div>
                              <h4 className={`text-xs font-semibold truncate ${
                                theme === 'light' ? 'text-slate-900' : 'text-white'
                              }`}>
                                {item.title}
                              </h4>
                              {item.matchSnippet && (
                                <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5 font-normal">
                                  {item.matchSnippet}
                                </p>
                              )}
                            </div>
                            <ChevronRight className="w-4 h-4 text-slate-400 shrink-0 self-center" />
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Mobile Search Button (Compact Trigger) */}
              <button
                onClick={() => {
                  setIsMobileSearchExpanded(!isMobileSearchExpanded);
                  setTimeout(() => mobileInputRef.current?.focus(), 150);
                }}
                className={`md:hidden p-2 rounded-lg border transition-colors cursor-pointer ${
                  theme === 'light'
                    ? 'border-slate-300 text-slate-700 hover:bg-slate-100'
                    : 'border-white/[0.08] text-slate-300 hover:bg-white/[0.06] hover:text-white'
                }`}
                aria-label="Toggle mobile search field"
              >
                <Search className="w-4 h-4" />
              </button>

              {/* Moon and Sun Theme Switcher (Recognizable Crescent Moon & Sun Icons) */}
              <div 
                className={`flex items-center p-0.5 rounded-full border transition-all ${
                  theme === 'light'
                    ? 'bg-slate-100 border-slate-300'
                    : 'bg-white/[0.04] border-white/[0.08]'
                }`}
                role="group"
                aria-label="Theme switcher"
              >
                {/* Sun Icon (Activates Light Mode) */}
                <button
                  type="button"
                  onClick={() => setTheme('light')}
                  className={`p-1.5 rounded-full transition-all cursor-pointer focus:outline-none ${
                    theme === 'light'
                      ? 'bg-white text-[#FFC400] shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                  aria-label="Activate light mode"
                  title="Light Mode"
                >
                  <Sun className="w-3.5 h-3.5 stroke-[2.2]" />
                </button>

                {/* Crescent Moon Icon (Activates Dark Mode) */}
                <button
                  type="button"
                  onClick={() => setTheme('dark')}
                  className={`p-1.5 rounded-full transition-all cursor-pointer focus:outline-none ${
                    theme === 'dark'
                      ? 'bg-white/[0.08] text-[#FFC400] shadow-sm'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                  aria-label="Activate dark mode"
                  title="Dark Mode"
                >
                  <Moon className="w-3.5 h-3.5 stroke-[2.2]" />
                </button>
              </div>

              {/* Primary Call to Action Button */}
              <button
                onClick={() => handleNavClick('quote')}
                className="inline-flex items-center justify-center gap-1.5 px-3.5 sm:px-4 py-2 text-[12px] font-semibold tracking-wide text-[#0A0713] bg-[#FFC400] hover:bg-[#ffcd20] rounded transition-all shadow-sm whitespace-nowrap shrink-0 cursor-pointer active:scale-95"
              >
                <span>Get a Quote</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>

            </div>
          </div>

          {/* Mobile Expanded Search Bar Drawer */}
          <AnimatePresence>
            {isMobileSearchExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className={`md:hidden pb-3 pt-1 border-t ${
                  theme === 'light' ? 'border-slate-200' : 'border-white/[0.08]'
                }`}
              >
                <div className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${
                  theme === 'light'
                    ? 'bg-slate-100 border-slate-300 text-slate-900'
                    : 'bg-[#0E0A1A] border-white/[0.1] text-white'
                }`}>
                  <Search className="w-4 h-4 text-slate-400 shrink-0" />
                  <input
                    ref={mobileInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleSearchKeyDown}
                    placeholder="Search services, case studies, insights..."
                    className="w-full bg-transparent text-xs outline-none placeholder-slate-400 font-sans"
                    aria-label="Mobile platform search"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="text-slate-400 hover:text-white p-1"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    onClick={() => setIsMobileSearchExpanded(false)}
                    className="text-xs font-mono text-[#FFC400] px-1"
                  >
                    Done
                  </button>
                </div>

                {/* Mobile Search Results */}
                {searchResults.length > 0 && (
                  <div className={`mt-2 rounded-lg border shadow-xl divide-y max-h-64 overflow-y-auto ${
                    theme === 'light'
                      ? 'bg-white border-slate-200 divide-slate-100'
                      : 'bg-[#0D091A] border-white/[0.1] divide-white/[0.06]'
                  }`}>
                    {searchResults.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => handleSelectResult(item)}
                        className="p-3 flex items-center justify-between gap-2 cursor-pointer hover:bg-white/[0.04]"
                      >
                        <div className="flex items-center gap-2.5">
                          {getItemIcon(item.type)}
                          <div>
                            <span className="text-[10px] font-mono text-[#FFC400] uppercase block">
                              {item.badge}
                            </span>
                            <span className={`text-xs font-semibold block ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>
                              {item.title}
                            </span>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-400" />
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </header>

      {/* Slide-out Navigation Drawer (Connected to Left-Side Hamburger Menu) */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawerOpen(false)}
              className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm"
              aria-hidden="true"
            />

            {/* Slide-out Panel from Left */}
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 240 }}
              className={`fixed top-0 left-0 bottom-0 z-50 w-full max-w-sm border-r shadow-2xl flex flex-col justify-between overflow-y-auto ${
                theme === 'light'
                  ? 'bg-white border-slate-200 text-slate-900'
                  : 'bg-[#0A0713] border-white/[0.08] text-slate-100'
              }`}
            >
              {/* Drawer Header */}
              <div className="p-5 border-b border-white/[0.08] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <img
                    src="/assets/aistudio/file_000000004c208211a816f3e41a7710e5_7714a59c.jpg"
                    alt="Infranovix Technologies"
                    className="h-8 w-auto object-contain rounded"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <span className={`text-sm font-semibold tracking-tight block uppercase leading-tight ${
                      theme === 'light' ? 'text-slate-900' : 'text-white'
                    }`}>
                      INFRANOVIX
                    </span>
                    <span className="text-[9px] tracking-[0.16em] text-[#FFC400] font-mono block">
                      INNOVATE · INTEGRATE · ELEVATE
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setDrawerOpen(false)}
                  className={`p-2 rounded-lg transition-colors cursor-pointer ${
                    theme === 'light' ? 'hover:bg-slate-100 text-slate-600' : 'hover:bg-white/[0.08] text-slate-300'
                  }`}
                  aria-label="Close navigation drawer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Links Body */}
              <div className="p-5 space-y-6 flex-1">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#FFC400] font-semibold block px-3 mb-2">
                    Navigation Menu
                  </span>
                  {navLinks.map((link) => {
                    const isActive = activeTab === link.id;
                    return (
                      <button
                        key={link.id}
                        onClick={() => handleNavClick(link.id)}
                        className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                          isActive
                            ? 'bg-[#FFC400] text-[#0A0713] font-semibold shadow-sm'
                            : theme === 'light'
                              ? 'text-slate-700 hover:bg-slate-100'
                              : 'text-slate-300 hover:bg-white/[0.06] hover:text-white'
                        }`}
                      >
                        <span>{link.label}</span>
                        <ChevronRight className={`w-4 h-4 ${isActive ? 'text-[#0A0713]' : 'text-slate-500'}`} />
                      </button>
                    );
                  })}
                </div>

                {/* Direct Action Card in Drawer */}
                <div className={`p-4 rounded-xl border space-y-3 ${
                  theme === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-[#0E0A1A] border-white/[0.08]'
                }`}>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#FFC400] block">
                    Enterprise Project Request
                  </span>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Ready to modernize operations or deploy custom web applications?
                  </p>
                  <button
                    onClick={() => handleNavClick('quote')}
                    className="w-full flex items-center justify-center gap-1.5 py-2.5 px-4 bg-[#FFC400] hover:bg-[#ffcd20] text-[#0A0713] font-semibold text-xs rounded transition-all cursor-pointer shadow"
                  >
                    <span>Request Quotation</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Drawer Footer */}
              <div className="p-5 border-t border-white/[0.08] space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="font-mono text-[11px]">Nairobi Headquarters</span>
                  <button
                    onClick={() => {
                      setDrawerOpen(false);
                      onOpenAdmin();
                    }}
                    className="inline-flex items-center gap-1 text-slate-400 hover:text-[#FFC400] transition-colors cursor-pointer"
                  >
                    <Shield className="w-3.5 h-3.5" />
                    <span>Staff Portal</span>
                  </button>
                </div>
                <div className="text-[11px] text-slate-500 font-mono">
                  © {new Date().getFullYear()} Infranovix Technologies
                </div>
              </div>

            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
