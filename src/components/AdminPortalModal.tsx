import React, { useState, useEffect } from 'react';
import { X, Lock, CheckCircle2, Clock, Mail, Phone, Building, FileText, Settings, RefreshCw, AlertCircle, Save } from 'lucide-react';

interface AdminPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminPortalModal: React.FC<AdminPortalModalProps> = ({ isOpen, onClose }) => {
  const [pin, setPin] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState<'quotes' | 'inquiries' | 'photos' | 'settings'>('quotes');

  const [quotes, setQuotes] = useState<any[]>([]);
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [settings, setSettings] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      fetchAdminData();
    }
  }, [isAuthenticated]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setIsAuthenticated(true);
        setPin('');
      } else {
        setAuthError(data.error || 'Invalid credentials. Please verify your administrative PIN.');
      }
    } catch (err) {
      setAuthError('Connection failed. Please ensure the backend server is active.');
    }
  };

  const fetchAdminData = async () => {
    setIsLoading(true);
    try {
      const [quotesRes, inqRes, statsRes, setRes] = await Promise.all([
        fetch('/api/quotes'),
        fetch('/api/inquiries'),
        fetch('/api/stats'),
        fetch('/api/settings')
      ]);

      if (quotesRes.ok) setQuotes(await quotesRes.json());
      if (inqRes.ok) setInquiries(await inqRes.json());
      if (statsRes.ok) setStats(await statsRes.json());
      if (setRes.ok) setSettings(await setRes.json());
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateQuoteStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/quotes/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        setQuotes(prev => prev.map(q => q.id === id ? { ...q, status: newStatus } : q));
      }
    } catch (err) {
      console.error('Failed to update quote status', err);
    }
  };

  const handleUpdateInquiryStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/inquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        setInquiries(prev => prev.map(i => i.id === id ? { ...i, status: newStatus } : i));
      }
    } catch (err) {
      console.error('Failed to update inquiry status', err);
    }
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });
      if (res.ok) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      }
    } catch (err) {
      console.error('Failed to save settings', err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div 
        className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-[#0d091a] border border-[#5200A8]/60 rounded-xl shadow-2xl p-6 sm:p-8 text-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg bg-[#25004D]/60 hover:bg-[#5200A8] text-slate-400 hover:text-white transition-colors"
          aria-label="Close portal"
        >
          <X className="w-5 h-5" />
        </button>

        {!isAuthenticated ? (
          /* Authentication Screen */
          <div className="max-w-md mx-auto py-12 text-center">
            <div className="w-12 h-12 mx-auto rounded-full bg-[#25004D] border border-[#5200A8] flex items-center justify-center text-[#FFC400] mb-4">
              <Lock className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Infranovix Administrative Portal
            </h2>
            <p className="text-xs text-slate-400 mt-1 mb-6">
              Enter authorized security credential to manage corporate leads, quotation requests, and configuration.
            </p>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <input
                  type="password"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="Enter administrative PIN (e.g. infranovix2026)"
                  className="w-full px-4 py-2.5 bg-[#140e25] border border-[#5200A8]/60 rounded-md text-sm text-center tracking-widest text-white placeholder-slate-500 focus:outline-none focus:border-[#FFC400]"
                  required
                  autoFocus
                />
              </div>

              {authError && (
                <div className="flex items-center justify-center gap-1.5 text-xs text-rose-400">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{authError}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-2.5 bg-[#FFC400] hover:bg-[#ffcd20] text-[#090611] font-bold text-xs uppercase tracking-wider rounded-md transition-colors shadow cursor-pointer"
              >
                Unlock Management Console
              </button>

              <p className="text-[11px] text-slate-500">
                Default authorization PIN for development: <span className="font-mono text-slate-400">infranovix2026</span>
              </p>
            </form>
          </div>
        ) : (
          /* Authenticated Dashboard */
          <div>
            {/* Top Bar with Metrics */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#25004D]/80 pr-12">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-[#FFC400] font-semibold block">
                  Management Console
                </span>
                <h2 className="text-xl font-bold text-white tracking-tight">
                  INFRANOVIX TECHNOLOGIES Operations
                </h2>
              </div>

              <div className="flex items-center gap-4 text-xs font-mono">
                <div className="px-3 py-1.5 rounded bg-[#1a1233] border border-[#5200A8]/40">
                  <span className="text-slate-400">Quotes: </span>
                  <span className="text-[#FFC400] font-bold">{quotes.length}</span>
                </div>
                <div className="px-3 py-1.5 rounded bg-[#1a1233] border border-[#5200A8]/40">
                  <span className="text-slate-400">Inquiries: </span>
                  <span className="text-emerald-400 font-bold">{inquiries.length}</span>
                </div>
                <button
                  onClick={fetchAdminData}
                  disabled={isLoading}
                  className="p-1.5 rounded bg-[#25004D] hover:bg-[#5200A8] text-slate-300 hover:text-white transition-colors"
                  title="Refresh Data"
                >
                  <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                </button>
              </div>
            </div>

            {/* Tab Controls */}
            <div className="flex items-center gap-2 mt-6 border-b border-[#25004D]/60 pb-3">
              <button
                onClick={() => setActiveTab('quotes')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  activeTab === 'quotes'
                    ? 'bg-[#FFC400] text-[#090611] font-bold'
                    : 'text-slate-300 hover:text-white hover:bg-[#25004D]/40'
                }`}
              >
                Quotation Requests ({quotes.length})
              </button>
              <button
                onClick={() => setActiveTab('inquiries')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  activeTab === 'inquiries'
                    ? 'bg-[#FFC400] text-[#090611] font-bold'
                    : 'text-slate-300 hover:text-white hover:bg-[#25004D]/40'
                }`}
              >
                General Inquiries ({inquiries.length})
              </button>
              <button
                onClick={() => setActiveTab('photos')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  activeTab === 'photos'
                    ? 'bg-[#FFC400] text-[#090611] font-bold'
                    : 'text-slate-300 hover:text-white hover:bg-[#25004D]/40'
                }`}
              >
                Photo & Image Assets
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  activeTab === 'settings'
                    ? 'bg-[#FFC400] text-[#090611] font-bold'
                    : 'text-slate-300 hover:text-white hover:bg-[#25004D]/40'
                }`}
              >
                Company Information & WhatsApp
              </button>
            </div>

            {/* Tab 1: Quotes */}
            {activeTab === 'quotes' && (
              <div className="mt-6 space-y-4">
                {quotes.length === 0 ? (
                  <div className="text-center py-12 text-slate-500 text-xs">
                    No quotation requests received yet.
                  </div>
                ) : (
                  quotes.map((q) => (
                    <div 
                      key={q.id}
                      className="p-4 rounded-lg bg-[#140e25] border border-[#25004D]/80 space-y-3"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#25004D]/50 pb-2.5">
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-xs font-bold text-[#FFC400] bg-[#25004D]/60 px-2 py-0.5 rounded">
                            {q.id}
                          </span>
                          <span className="text-sm font-semibold text-white">{q.fullName}</span>
                          <span className="text-xs text-slate-400">({q.organization})</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <select
                            value={q.status}
                            onChange={(e) => handleUpdateQuoteStatus(q.id, e.target.value)}
                            className="text-xs bg-[#090611] border border-[#5200A8]/50 text-slate-300 rounded px-2.5 py-1 focus:outline-none focus:border-[#FFC400]"
                          >
                            <option value="Received">Received</option>
                            <option value="In Review">In Review</option>
                            <option value="Proposal Sent">Proposal Sent</option>
                            <option value="Approved">Approved</option>
                            <option value="Completed">Completed</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-slate-400">
                        <div>
                          <span className="text-slate-500 block">Category:</span>
                          <span className="text-slate-200">{q.category}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 block">Timeline & Budget:</span>
                          <span className="text-slate-200">{q.timeline} · {q.budgetRange}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 block">Contact Info:</span>
                          <span className="text-slate-200">{q.email} · {q.phone}</span>
                        </div>
                      </div>

                      <div className="bg-[#0b0814] p-3 rounded text-xs text-slate-300 border border-[#25004D]/40">
                        <span className="text-slate-500 font-semibold block mb-1">Project Brief & Requirements:</span>
                        <p className="leading-relaxed whitespace-pre-wrap">{q.requirements}</p>
                      </div>

                      <div className="text-[11px] text-slate-500 flex items-center justify-between">
                        <span>Submitted on {new Date(q.createdAt).toLocaleString()}</span>
                        <a 
                          href={`mailto:${q.email}?subject=Infranovix%20Technologies%20Quotation%20Reference%20${q.id}`}
                          className="text-[#FFC400] hover:underline"
                        >
                          Reply via Corporate Email
                        </a>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Tab 2: Inquiries */}
            {activeTab === 'inquiries' && (
              <div className="mt-6 space-y-4">
                {inquiries.length === 0 ? (
                  <div className="text-center py-12 text-slate-500 text-xs">
                    No customer inquiries recorded yet.
                  </div>
                ) : (
                  inquiries.map((inq) => (
                    <div 
                      key={inq.id}
                      className="p-4 rounded-lg bg-[#140e25] border border-[#25004D]/80 space-y-3"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#25004D]/50 pb-2.5">
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-xs font-bold text-emerald-400 bg-[#25004D]/60 px-2 py-0.5 rounded">
                            {inq.id}
                          </span>
                          <span className="text-sm font-semibold text-white">{inq.name}</span>
                          <span className="text-xs text-slate-400">({inq.company})</span>
                        </div>
                        <div>
                          <select
                            value={inq.status}
                            onChange={(e) => handleUpdateInquiryStatus(inq.id, e.target.value)}
                            className="text-xs bg-[#090611] border border-[#5200A8]/50 text-slate-300 rounded px-2.5 py-1 focus:outline-none focus:border-[#FFC400]"
                          >
                            <option value="Pending Review">Pending Review</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Resolved">Resolved</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-slate-400">
                        <div>
                          <span className="text-slate-500 block">Service:</span>
                          <span className="text-slate-200">{inq.service}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 block">Email:</span>
                          <span className="text-slate-200">{inq.email}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 block">Phone:</span>
                          <span className="text-slate-200">{inq.phone || 'Not provided'}</span>
                        </div>
                      </div>

                      <div className="bg-[#0b0814] p-3 rounded text-xs text-slate-300 border border-[#25004D]/40">
                        <span className="text-slate-500 font-semibold block mb-1">Inquiry Message:</span>
                        <p className="leading-relaxed whitespace-pre-wrap">{inq.message}</p>
                      </div>

                      <div className="text-[11px] text-slate-500 flex items-center justify-between">
                        <span>Submitted on {new Date(inq.createdAt).toLocaleString()}</span>
                        <a 
                          href={`mailto:${inq.email}?subject=Infranovix%20Technologies%20Inquiry%20Response%20${inq.id}`}
                          className="text-[#FFC400] hover:underline"
                        >
                          Send Email Response
                        </a>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Tab 3: Photo & Image Assets */}
            {activeTab === 'photos' && settings && (
              <div className="mt-6 space-y-6 max-w-3xl">
                <div className="p-4 rounded-lg bg-[#140e25] border border-[#25004D]">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#FFC400] mb-1">
                    Website Real Photography & Placeholder Manager
                  </h3>
                  <p className="text-xs text-slate-300">
                    Replace any photography placeholder with your custom corporate photos, real office photos, or hosted image URLs. Changes apply immediately upon saving.
                  </p>
                </div>

                <div className="space-y-6">
                  {/* Hero Workspace Photo */}
                  <div className="p-4 rounded-xl bg-[#140e25] border border-white/5 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white uppercase tracking-wider">
                        1. Home Page Hero Workspace Photo
                      </span>
                      <span className="text-[11px] text-[#FFC400] font-mono">Slot: hero</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                      <div className="md:col-span-2">
                        <label className="text-[11px] text-slate-400 block mb-1">Photo URL / File Path:</label>
                        <input
                          type="text"
                          value={settings.photos?.hero || ''}
                          onChange={(e) => setSettings({
                            ...settings,
                            photos: { ...(settings.photos || {}), hero: e.target.value }
                          })}
                          className="w-full px-3 py-2 bg-[#090611] border border-[#5200A8]/50 rounded text-xs text-white focus:outline-none focus:border-[#FFC400]"
                        />
                      </div>
                      <div className="rounded overflow-hidden border border-white/10 bg-black aspect-video max-h-24">
                        <img 
                          src={settings.photos?.hero} 
                          alt="Hero preview" 
                          className="w-full h-full object-cover"
                          onError={(e) => { (e.target as any).src = '/src/assets/images/office_daylight_workspace_1793452674957.jpg'; }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* About Team Photo */}
                  <div className="p-4 rounded-xl bg-[#140e25] border border-white/5 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white uppercase tracking-wider">
                        2. About Us Strategy Session Photo
                      </span>
                      <span className="text-[11px] text-[#FFC400] font-mono">Slot: aboutTeam</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                      <div className="md:col-span-2">
                        <label className="text-[11px] text-slate-400 block mb-1">Photo URL / File Path:</label>
                        <input
                          type="text"
                          value={settings.photos?.aboutTeam || ''}
                          onChange={(e) => setSettings({
                            ...settings,
                            photos: { ...(settings.photos || {}), aboutTeam: e.target.value }
                          })}
                          className="w-full px-3 py-2 bg-[#090611] border border-[#5200A8]/50 rounded text-xs text-white focus:outline-none focus:border-[#FFC400]"
                        />
                      </div>
                      <div className="rounded overflow-hidden border border-white/10 bg-black aspect-video max-h-24">
                        <img 
                          src={settings.photos?.aboutTeam} 
                          alt="About Team preview" 
                          className="w-full h-full object-cover"
                          onError={(e) => { (e.target as any).src = '/src/assets/images/strategy_meeting_whiteboard_1793452675937.jpg'; }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Portfolio Laptop Showcase */}
                  <div className="p-4 rounded-xl bg-[#140e25] border border-white/5 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white uppercase tracking-wider">
                        3. Enterprise Dashboard Desk Showcase
                      </span>
                      <span className="text-[11px] text-[#FFC400] font-mono">Slot: portfolioEnterprise</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                      <div className="md:col-span-2">
                        <label className="text-[11px] text-slate-400 block mb-1">Photo URL / File Path:</label>
                        <input
                          type="text"
                          value={settings.photos?.portfolioEnterprise || ''}
                          onChange={(e) => setSettings({
                            ...settings,
                            photos: { ...(settings.photos || {}), portfolioEnterprise: e.target.value }
                          })}
                          className="w-full px-3 py-2 bg-[#090611] border border-[#5200A8]/50 rounded text-xs text-white focus:outline-none focus:border-[#FFC400]"
                        />
                      </div>
                      <div className="rounded overflow-hidden border border-white/10 bg-black aspect-video max-h-24">
                        <img 
                          src={settings.photos?.portfolioEnterprise} 
                          alt="Laptop preview" 
                          className="w-full h-full object-cover"
                          onError={(e) => { (e.target as any).src = '/src/assets/images/laptop_desk_dashboard_1793452677488.jpg'; }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Portfolio Mobile Showcase */}
                  <div className="p-4 rounded-xl bg-[#140e25] border border-white/5 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white uppercase tracking-wider">
                        4. Mobile Payment App in Hand
                      </span>
                      <span className="text-[11px] text-[#FFC400] font-mono">Slot: portfolioMobile</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                      <div className="md:col-span-2">
                        <label className="text-[11px] text-slate-400 block mb-1">Photo URL / File Path:</label>
                        <input
                          type="text"
                          value={settings.photos?.portfolioMobile || ''}
                          onChange={(e) => setSettings({
                            ...settings,
                            photos: { ...(settings.photos || {}), portfolioMobile: e.target.value }
                          })}
                          className="w-full px-3 py-2 bg-[#090611] border border-[#5200A8]/50 rounded text-xs text-white focus:outline-none focus:border-[#FFC400]"
                        />
                      </div>
                      <div className="rounded overflow-hidden border border-white/10 bg-black aspect-video max-h-24">
                        <img 
                          src={settings.photos?.portfolioMobile} 
                          alt="Mobile preview" 
                          className="w-full h-full object-cover"
                          onError={(e) => { (e.target as any).src = '/src/assets/images/person_holding_phone_app_1793452677022.jpg'; }}
                        />
                      </div>
                    </div>
                  </div>

                  {saveSuccess && (
                    <div className="flex items-center gap-1.5 text-xs text-emerald-400">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Photo configuration saved to database successfully.</span>
                    </div>
                  )}

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={handleSaveSettings}
                      className="flex items-center gap-2 px-5 py-2.5 bg-[#FFC400] hover:bg-[#ffcd20] text-[#090611] font-bold text-xs uppercase tracking-wider rounded transition-colors shadow"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Save Photo Configurations</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 4: Settings */}
            {activeTab === 'settings' && settings && (
              <form onSubmit={handleSaveSettings} className="mt-6 space-y-4 max-w-2xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-400 block mb-1">
                      Business Email Address
                    </label>
                    <input
                      type="email"
                      value={settings.email || ''}
                      onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                      className="w-full px-3 py-2 bg-[#140e25] border border-[#5200A8]/50 rounded text-xs text-white focus:outline-none focus:border-[#FFC400]"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-400 block mb-1">
                      Support Email Address
                    </label>
                    <input
                      type="email"
                      value={settings.supportEmail || ''}
                      onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value })}
                      className="w-full px-3 py-2 bg-[#140e25] border border-[#5200A8]/50 rounded text-xs text-white focus:outline-none focus:border-[#FFC400]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-400 block mb-1">
                      Phone Number Placeholder
                    </label>
                    <input
                      type="text"
                      value={settings.phone || ''}
                      onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                      className="w-full px-3 py-2 bg-[#140e25] border border-[#5200A8]/50 rounded text-xs text-white focus:outline-none focus:border-[#FFC400]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-400 block mb-1">
                      WhatsApp International Number (digits only, e.g. 254700123456)
                    </label>
                    <input
                      type="text"
                      value={settings.whatsappNumber || ''}
                      onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                      className="w-full px-3 py-2 bg-[#140e25] border border-[#5200A8]/50 rounded text-xs text-white focus:outline-none focus:border-[#FFC400]"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-400 block mb-1">
                    Office Physical Location Placeholder
                  </label>
                  <input
                    type="text"
                    value={settings.officeLocation || ''}
                    onChange={(e) => setSettings({ ...settings, officeLocation: e.target.value })}
                    className="w-full px-3 py-2 bg-[#140e25] border border-[#5200A8]/50 rounded text-xs text-white focus:outline-none focus:border-[#FFC400]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-400 block mb-1">
                    Business Operating Hours Placeholder
                  </label>
                  <input
                    type="text"
                    value={settings.operatingHours || ''}
                    onChange={(e) => setSettings({ ...settings, operatingHours: e.target.value })}
                    className="w-full px-3 py-2 bg-[#140e25] border border-[#5200A8]/50 rounded text-xs text-white focus:outline-none focus:border-[#FFC400]"
                  />
                </div>

                {saveSuccess && (
                  <div className="flex items-center gap-1.5 text-xs text-emerald-400">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Configuration updated successfully in persistent store.</span>
                  </div>
                )}

                <div className="pt-2">
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-5 py-2.5 bg-[#FFC400] hover:bg-[#ffcd20] text-[#090611] font-bold text-xs uppercase tracking-wider rounded transition-colors shadow"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Configuration</span>
                  </button>
                </div>
              </form>
            )}

            <div className="mt-8 pt-4 border-t border-[#25004D]/60 flex items-center justify-between text-xs text-slate-500">
              <span>Session active · Infranovix Technologies Systems Admin</span>
              <button
                onClick={() => setIsAuthenticated(false)}
                className="text-slate-400 hover:text-white underline"
              >
                Sign Out
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
