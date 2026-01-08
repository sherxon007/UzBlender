
import React, { useState, useEffect, useRef } from 'react';
import { Search, ShoppingCart, Menu, User as UserIcon, LogIn, X, MessageSquare, Wallet, ShieldAlert, Briefcase, Zap, Newspaper, Bell, Check, Box, ChevronRight, Settings as SettingsIcon, LogOut, LayoutDashboard, Coins } from 'lucide-react';
import { useStore } from '../store';
import { Tooltip } from './Tooltip';
import { ViewType } from '../types';
import { translations } from '../translations'; 

export const Navbar = () => {
  const { user, cart, conversations, openAuth, logout, toggleCart, toggleWallet, setView, setSearchQuery, searchQuery, currentView, language, assets, jobs, markNotificationsRead, currency, setCurrency } = useStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  
  const t = translations[language].nav;

  const unreadMessages = conversations.reduce((acc, curr) => acc + curr.unreadCount, 0);

  // Live Search Logic
  const filteredAssets = assets.filter(a => a.title.toLowerCase().includes(searchQuery.toLowerCase()) && a.status === 'active').slice(0, 3);
  const filteredJobs = jobs.filter(j => j.title.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 2);
  const filteredCreators = (Array.from(new Set(assets.map(a => a.author))) as string[]).filter(author => author.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 2);

  // Close menus when clicking outside
  useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
          if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
              setShowSearchResults(false);
          }
          if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
              setIsUserMenuOpen(false);
          }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const notifications = user?.notifications?.length ? user.notifications : [
      { id: 'n1', title: 'Asset Tasdiqlandi', message: '"Cyber Samurai" assetingiz sotuvga chiqdi.', type: 'success', time: '2 daq oldin', read: false },
      { id: 'n2', title: 'Tizim Yangilanishi', message: 'UzBlender V2.5 ishga tushdi!', type: 'info', time: '1 soat oldin', read: false },
      { id: 'n3', title: 'Yangi Savdo', message: 'Siz "Neon Pack" sotdingiz (+45 UZC)', type: 'success', time: '5 soat oldin', read: true },
  ];

  const unreadNotificationsCount = notifications.filter(n => !n.read).length;

  const handleNavClick = (view: ViewType) => {
    setView(view);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchResultClick = (type: 'asset' | 'job' | 'creator', id: string) => {
      setShowSearchResults(false);
      setSearchQuery('');
      if (type === 'asset') setView('product', id);
      if (type === 'creator') setView('seller', id);
      if (type === 'job') setView('jobs');
  };

  const toggleCurrency = () => {
      setCurrency(currency === 'USD' ? 'UZS' : 'USD');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-20 transition-all duration-300 bg-[#0f172a]/90 backdrop-blur-xl border-b border-white/5 shadow-lg">
      <div className="container mx-auto px-6 h-full flex items-center justify-between">
        {/* Logo */}
        <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => handleNavClick('marketplace')}
        >
            <div className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center shadow-lg shadow-blue-900/50">
                <span className="font-bold font-mono text-xl">Uz</span>
            </div>
            <h1 className="text-xl font-display font-bold text-white tracking-tight group-hover:text-blue-400 transition-colors">
              Blender <span className="text-blue-500">3D</span>
            </h1>
        </div>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-8">
            {['marketplace', 'jobs', 'contests', 'blog', 'community', 'learn'].map((item) => (
                <button 
                  key={item}
                  onClick={() => handleNavClick(item as ViewType)}
                  className={`font-medium transition-all text-sm tracking-wide hover:text-white ${currentView === item ? 'text-blue-400' : 'text-slate-400'}`}
                >
                  {(t as any)[item]}
                </button>
            ))}

          {/* ADMIN LINK */}
          {user && user.isAdmin && (
             <Tooltip content="Admin Boshqaruv Paneli" position="bottom">
                 <button 
                  onClick={() => handleNavClick('admin')}
                  className={`font-bold transition-colors text-sm flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10 hover:bg-white/10 ${
                      currentView === 'admin' 
                      ? 'text-white border-white/30' 
                      : 'text-slate-400'
                  }`}
                >
                  <ShieldAlert size={16} /> Admin
                </button>
             </Tooltip>
          )}
        </div>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-4 xl:gap-6">
          
          {/* LIVE SEARCH BAR */}
          <Tooltip content="Asset va Ijodkorlarni Qidirish" position="bottom" className="hidden xl:block">
              <div className="relative group" ref={searchRef}>
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setShowSearchResults(true);
                  }}
                  onFocus={() => setShowSearchResults(true)}
                  placeholder={t.search}
                  className="bg-[#1e293b] border border-white/5 rounded-lg py-2.5 px-4 pl-10 text-sm text-white focus:outline-none focus:border-blue-500 focus:bg-[#1e293b] w-48 xl:w-64 transition-all placeholder-slate-500"
                />
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-500 group-hover:text-blue-400" />

                {/* Dropdown Results */}
                {showSearchResults && searchQuery.length > 1 && (
                    <div className="absolute top-12 left-0 w-80 bg-[#1e293b] border border-white/10 rounded-xl shadow-2xl overflow-hidden animate-fade-in-up origin-top-left z-50">
                        {/* Assets Section */}
                        {filteredAssets.length > 0 && (
                            <div className="p-2">
                                <div className="text-[10px] uppercase font-bold text-slate-500 px-2 mb-1">Assetlar</div>
                                {filteredAssets.map(asset => (
                                    <div 
                                        key={asset.id} 
                                        onClick={() => handleSearchResultClick('asset', asset.id)}
                                        className="flex items-center gap-3 p-2 hover:bg-white/5 rounded-lg cursor-pointer transition-colors"
                                    >
                                        <img src={asset.image} className="w-8 h-8 rounded bg-slate-800 object-cover" alt={asset.title} />
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-bold text-white truncate">{asset.title}</p>
                                            <p className="text-[10px] text-slate-400">{asset.category} • ${asset.price}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Jobs Section */}
                        {filteredJobs.length > 0 && (
                            <div className="p-2 border-t border-white/5">
                                <div className="text-[10px] uppercase font-bold text-slate-500 px-2 mb-1">Ishlar</div>
                                {filteredJobs.map(job => (
                                    <div 
                                        key={job.id} 
                                        onClick={() => handleSearchResultClick('job', job.id)}
                                        className="flex items-center gap-3 p-2 hover:bg-white/5 rounded-lg cursor-pointer transition-colors"
                                    >
                                        <div className="w-8 h-8 rounded bg-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                                            <Briefcase size={14} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-bold text-white truncate">{job.title}</p>
                                            <p className="text-[10px] text-slate-400">{job.company}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Creators Section */}
                        {filteredCreators.length > 0 && (
                            <div className="p-2 border-t border-white/5">
                                <div className="text-[10px] uppercase font-bold text-slate-500 px-2 mb-1">Ijodkorlar</div>
                                {filteredCreators.map(creator => (
                                    <div 
                                        key={creator} 
                                        onClick={() => handleSearchResultClick('creator', creator)}
                                        className="flex items-center gap-3 p-2 hover:bg-white/5 rounded-lg cursor-pointer transition-colors"
                                    >
                                        <div className="w-8 h-8 rounded-full bg-slate-700 overflow-hidden border border-white/10 shrink-0">
                                            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${creator}`} alt={creator} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-bold text-white truncate">{creator}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                        
                        {filteredAssets.length === 0 && filteredJobs.length === 0 && filteredCreators.length === 0 && (
                            <div className="p-6 text-center text-slate-500 text-sm">
                                "{searchQuery}" bo'yicha hech narsa topilmadi
                            </div>
                        )}
                    </div>
                )}
              </div>
          </Tooltip>

          {/* CURRENCY TOGGLE */}
          <Tooltip content="Valyutani O'zgartirish (USD/UZS)" position="bottom">
              <button 
                onClick={toggleCurrency}
                className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-slate-300 font-bold text-xs transition-all"
              >
                  {currency === 'USD' ? '$' : 'UZS'}
              </button>
          </Tooltip>

          {/* Wallet Display */}
          {user && (
              <Tooltip content={user.isTelegramLinked ? "Balansni Boshqarish" : "Hamyonni Ulash"} position="bottom">
                  <button 
                    onClick={() => toggleWallet(true)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all ${
                        user.isTelegramLinked 
                        ? 'bg-blue-500/10 border-blue-500/30 text-blue-400 hover:bg-blue-500/20' 
                        : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                      <Wallet size={16} />
                      <span className="text-xs font-bold font-mono">
                          {user.isTelegramLinked ? `${user.balance.toFixed(0)} UZC` : "Ulash"}
                      </span>
                  </button>
              </Tooltip>
          )}

          {/* Notifications Dropdown */}
          {user && (
              <div className="relative">
                  <Tooltip content="Bildirishnomalar" position="bottom">
                    <button 
                        onClick={() => setShowNotifications(!showNotifications)}
                        className={`relative transition-colors ${showNotifications ? 'text-blue-400' : 'text-slate-400 hover:text-white'}`}
                    >
                        <Bell className="w-6 h-6" />
                        {unreadNotificationsCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-red-500 w-2.5 h-2.5 rounded-full border border-[#0f172a]"></span>
                        )}
                    </button>
                  </Tooltip>

                  {/* Dropdown */}
                  {showNotifications && (
                      <div className="absolute top-12 right-0 w-80 bg-[#1e293b] border border-white/10 rounded-xl shadow-2xl p-2 animate-fade-in-up origin-top-right z-50">
                          <div className="flex justify-between items-center px-4 py-2 border-b border-white/10 mb-2">
                              <span className="font-bold text-sm text-white">Xabarnomalar</span>
                              <button onClick={markNotificationsRead} className="text-[10px] text-blue-400 font-bold hover:underline">O'qilgan deb belgilash</button>
                          </div>
                          <div className="max-h-64 overflow-y-auto space-y-1">
                              {notifications.map((note: any) => (
                                  <div key={note.id} className={`p-3 rounded-lg flex items-start gap-3 hover:bg-white/5 transition-colors ${!note.read ? 'bg-blue-500/10' : ''}`}>
                                      <div className={`w-2 h-2 mt-1.5 rounded-full shrink-0 ${note.type === 'success' ? 'bg-green-500' : 'bg-blue-500'}`}></div>
                                      <div className="flex-1">
                                          <h4 className="text-xs font-bold text-white">{note.title}</h4>
                                          <p className="text-xs text-slate-400 leading-tight">{note.message}</p>
                                          <span className="text-[10px] text-slate-500 mt-1 block">{note.time || note.date}</span>
                                      </div>
                                  </div>
                              ))}
                          </div>
                      </div>
                  )}
                  {showNotifications && <div className="fixed inset-0 z-40" onClick={() => setShowNotifications(false)}></div>}
              </div>
          )}

          {/* Messages */}
          {user && (
              <Tooltip content="Chat va Yordam" position="bottom">
                <button 
                    onClick={() => handleNavClick('messages')}
                    className={`relative transition-colors ${currentView === 'messages' ? 'text-blue-400' : 'text-slate-400 hover:text-white'}`}
                >
                    <MessageSquare className="w-6 h-6" />
                    {unreadMessages > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full border border-[#0f172a]">
                            {unreadMessages}
                        </span>
                    )}
                </button>
              </Tooltip>
          )}

          <Tooltip content="Savat" position="bottom">
            <button 
                onClick={() => toggleCart(true)}
                className="relative text-slate-400 hover:text-blue-400 transition-colors"
            >
              <ShoppingCart className="w-6 h-6" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-lg">
                  {cart.length}
                </span>
              )}
            </button>
          </Tooltip>

          {user ? (
            <div className="relative" ref={userMenuRef}>
                <Tooltip content="Hisob Kabineti" position="bottom">
                    <button 
                        className="flex items-center gap-3 focus:outline-none"
                        onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    >
                        <img 
                            src={user.avatar} 
                            alt={user.name} 
                            className={`w-10 h-10 rounded-full border-2 object-cover ${user.isAdmin ? 'border-blue-500' : 'border-white/10 hover:border-blue-400 transition-colors'}`} 
                        />
                        <div className="text-left hidden xl:block">
                            <p className="text-sm font-bold text-white leading-none">{user.name}</p>
                            <p className={`text-xs ${user.isAdmin ? 'text-blue-400 font-bold' : 'text-slate-400'}`}>
                                {user.isAdmin ? 'Administrator' : 'Foydalanuvchi'}
                            </p>
                        </div>
                    </button>
                </Tooltip>

                {/* User Dropdown */}
                {isUserMenuOpen && (
                    <div className="absolute top-14 right-0 w-56 bg-[#1e293b] border border-white/10 rounded-xl shadow-2xl overflow-hidden animate-fade-in-up origin-top-right z-50">
                        <div className="p-4 border-b border-white/5">
                            <p className="text-white font-bold text-sm truncate">{user.name}</p>
                            <p className="text-xs text-slate-400 truncate">{user.email}</p>
                        </div>
                        <div className="p-2">
                            <button onClick={() => { handleNavClick('dashboard'); setIsUserMenuOpen(false); }} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-white/5 hover:text-white transition-colors">
                                <LayoutDashboard size={16} /> Kabinet
                            </button>
                            <button onClick={() => { handleNavClick('settings'); setIsUserMenuOpen(false); }} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-white/5 hover:text-white transition-colors">
                                <SettingsIcon size={16} /> Sozlamalar
                            </button>
                        </div>
                        <div className="p-2 border-t border-white/5">
                            <button onClick={logout} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-red-400 hover:bg-red-500/10 transition-colors">
                                <LogOut size={16} /> Chiqish
                            </button>
                        </div>
                    </div>
                )}
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <button 
                onClick={() => openAuth('login')}
                className="text-slate-400 hover:text-white font-medium transition-colors"
              >
                {t.login}
              </button>
              <button 
                onClick={() => openAuth('signup')}
                className="bg-blue-600 hover:bg-blue-700 text-white border border-transparent px-5 py-2 rounded-lg font-bold transition-all shadow-lg shadow-blue-900/20"
              >
                {t.signup}
              </button>
            </div>
          )}
        </div>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-20 left-0 right-0 bg-[#0f172a] border-b border-white/10 p-6 flex flex-col gap-4 shadow-2xl h-[calc(100vh-80px)] overflow-y-auto">
           <button onClick={() => handleNavClick('marketplace')} className="text-lg font-medium text-left text-slate-200">{t.marketplace}</button>
           <button onClick={() => handleNavClick('jobs')} className="text-lg font-medium text-left text-slate-200 flex items-center gap-2"><Briefcase size={18} /> {t.jobs}</button>
           <button onClick={() => handleNavClick('contests')} className="text-lg font-medium text-left text-slate-200 flex items-center gap-2"><Zap size={18} /> {t.contests}</button>
           <button onClick={() => handleNavClick('blog')} className="text-lg font-medium text-left text-slate-200 flex items-center gap-2"><Newspaper size={18} /> {t.blog}</button>
           <button onClick={() => handleNavClick('community')} className="text-lg font-medium text-left text-slate-200">{t.community}</button>
           <button onClick={() => handleNavClick('learn')} className="text-lg font-medium text-left text-slate-200">{t.learn}</button>

          {user && user.isAdmin && (
             <button onClick={() => handleNavClick('admin')} className="text-lg font-medium text-left text-white bg-blue-600/10 p-2 rounded flex items-center gap-2">
                <ShieldAlert size={18} /> Admin
             </button>
          )}
          {user && (
             <button onClick={() => handleNavClick('messages')} className="text-lg font-medium text-left text-slate-200">
                {t.messages} {unreadMessages > 0 && `(${unreadMessages})`}
             </button>
          )}
          <div className="h-[1px] bg-white/10 w-full my-2" />
           {!user ? (
             <div className="flex flex-col gap-3">
               <button onClick={() => openAuth('login')} className="w-full py-3 text-center text-white border border-white/20 rounded-lg">{t.login}</button>
               <button onClick={() => openAuth('signup')} className="w-full py-3 text-center bg-blue-600 text-white font-bold rounded-lg">{t.signup}</button>
             </div>
           ) : (
            <>
                <button onClick={() => toggleWallet(true)} className="w-full py-3 text-center text-white border border-white/20 rounded-lg flex items-center justify-center gap-2">
                     <Wallet size={18} /> {t.wallet} ({user.balance} UZC)
                </button>
                <button onClick={() => handleNavClick('dashboard')} className="w-full py-3 text-center text-blue-400 border border-blue-500/30 rounded-lg font-bold">{t.dashboard}</button>
                <button onClick={() => handleNavClick('settings')} className="w-full py-3 text-center text-slate-200 border border-white/10 rounded-lg font-bold">Sozlamalar</button>
                <button onClick={logout} className="text-red-500 font-bold text-center">{t.logout}</button>
            </>
           )}
        </div>
      )}
    </nav>
  );
};
