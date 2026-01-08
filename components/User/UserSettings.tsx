
import React, { useState, useEffect } from 'react';
import { useStore } from '../../store';
import { 
    User, Shield, Bell, Save, Camera, Mail, MapPin, Globe, 
    LogOut, ArrowLeft, Languages, Smartphone, Monitor, Lock, 
    Key, Eye, EyeOff, Zap, Layout, CreditCard, Cpu, Radio 
} from 'lucide-react';
import { translations } from '../../translations';

const Toggle = ({ checked, onChange }: { checked: boolean, onChange: () => void }) => (
    <div 
        onClick={onChange}
        className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors relative ${checked ? 'bg-cyber-cyan' : 'bg-gray-700'}`}
    >
        <div className={`w-4 h-4 rounded-full bg-white shadow-md transform transition-transform ${checked ? 'translate-x-6' : 'translate-x-0'}`} />
    </div>
);

export const UserSettings = () => {
  const { user, updateUser, setView, logout, addToast, language, setLanguage } = useStore();
  const [activeTab, setActiveTab] = useState<'general' | 'security' | 'notifications' | 'system'>('general');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Form Data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bio: '',
    location: '',
    website: '',
    skills: '',
    software: 'Blender'
  });

  const t = translations[language]; 

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        bio: user.bio || '',
        location: user.location || '',
        website: user.website || '',
        skills: user.skills || 'Modeling, Texturing', 
        software: user.primarySoftware || 'Blender'
      });
    }
  }, [user]);

  if (!user) {
    setView('marketplace');
    return null;
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      updateUser({
          ...formData,
          primarySoftware: formData.software
      });
      setIsLoading(false);
    }, 1000);
  };

  const handleAvatarChange = () => {
     const newAvatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${Math.random()}`;
     updateUser({ avatar: newAvatar });
  };

  return (
    <div className="min-h-screen bg-[#050b14] pt-8 pb-20 font-sans">
      <div className="container mx-auto px-6 max-w-6xl">
        
        {/* Back Button */}
        <button 
            onClick={() => setView('dashboard')}
            className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors group px-4 py-2 border border-white/5 rounded-lg hover:border-cyber-cyan/50 hover:bg-cyber-cyan/10"
        >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-mono text-xs uppercase tracking-wider">BACK</span>
        </button>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* SIDEBAR NAVIGATION */}
          <div className="w-full lg:w-72 space-y-3 shrink-0">
            <div className="bg-[#0a1220] border border-white/10 rounded-xl p-6 mb-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyber-cyan/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                <h1 className="text-2xl font-display font-bold text-white mb-1 relative z-10">{t.dashboard.settings}</h1>
                <p className="text-xs text-gray-500 font-mono relative z-10">V.2.4.1 // SECURE</p>
            </div>

            {[
                { id: 'general', icon: User, label: "Profile" },
                { id: 'security', icon: Shield, label: "Security" },
                { id: 'notifications', icon: Bell, label: "Notifications" },
                { id: 'system', icon: Cpu, label: "System" },
            ].map((tab) => (
                <button 
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`w-full flex items-center justify-between px-5 py-4 rounded-xl text-sm font-bold transition-all border ${
                        activeTab === tab.id 
                        ? 'bg-cyber-cyan/10 text-cyber-cyan border-cyber-cyan/50 shadow-[0_0_15px_rgba(0,240,255,0.1)]' 
                        : 'bg-[#0a1220] text-gray-400 hover:text-white border-white/5 hover:border-white/20'
                    }`}
                >
                    <div className="flex items-center gap-3">
                        <tab.icon size={18} />
                        {tab.label}
                    </div>
                    {activeTab === tab.id && <div className="w-1.5 h-1.5 rounded-full bg-cyber-cyan animate-pulse"></div>}
                </button>
            ))}
            
            <div className="pt-6 mt-6 border-t border-white/10">
                <button 
                    onClick={logout}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-bold text-red-500 bg-red-500/5 hover:bg-red-500/10 border border-red-500/20 hover:border-red-500/50 transition-all"
                >
                    <LogOut size={16} />
                    {t.nav.logout}
                </button>
            </div>
          </div>

          {/* MAIN CONTENT PANEL */}
          <div className="flex-1 bg-[#0a1220] rounded-2xl border border-white/10 p-8 relative overflow-hidden shadow-2xl min-h-[600px]">
             {/* Tech Deco Lines */}
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyber-cyan via-purple-500 to-transparent opacity-50"></div>
             <div className="absolute bottom-0 right-0 w-2/3 h-1 bg-gradient-to-l from-cyber-green to-transparent opacity-30"></div>
             
             {/* CONTENT: GENERAL */}
             {activeTab === 'general' && (
               <form onSubmit={handleSave} className="space-y-8 animate-fade-in relative z-10">
                  <div className="flex items-center justify-between border-b border-white/5 pb-6">
                      <h2 className="text-xl font-bold text-white flex items-center gap-2">
                          <User className="text-cyber-cyan" size={24} /> Profile Identity
                      </h2>
                      <div className="text-[10px] text-cyber-green font-mono border border-cyber-green/30 px-2 py-1 rounded bg-cyber-green/5">
                          ID: {user.id.toUpperCase()}
                      </div>
                  </div>

                  {/* Avatar Area */}
                  <div className="flex items-center gap-8">
                      <div className="relative group cursor-pointer" onClick={handleAvatarChange}>
                          <div className="w-28 h-28 rounded-xl border-2 border-white/10 overflow-hidden relative">
                              <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
                              <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                  <Camera className="text-white w-8 h-8" />
                              </div>
                          </div>
                          <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-cyber-cyan rotate-45 border-2 border-[#0a1220]"></div>
                          <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-cyber-cyan rounded-tl-lg"></div>
                      </div>
                      <div className="flex-1">
                          <h3 className="text-white font-bold">Visual Avatar</h3>
                          <p className="text-gray-500 text-xs mb-3 font-mono">JPG, PNG (Max 5MB)</p>
                          <button 
                            type="button" 
                            onClick={handleAvatarChange}
                            className="bg-white/5 hover:bg-white/10 border border-white/10 text-cyber-cyan text-xs font-bold px-4 py-2 rounded transition-colors"
                          >
                              Randomize
                          </button>
                      </div>
                  </div>

                  {/* Form Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                          <label className="text-gray-400 text-[10px] uppercase tracking-wider font-bold">{t.auth.username}</label>
                          <div className="relative group">
                            <User className="absolute left-3 top-3 text-gray-500 w-4 h-4 group-focus-within:text-cyber-cyan transition-colors" />
                            <input 
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                className="w-full bg-[#050b14] border border-white/10 rounded-lg py-2.5 pl-10 text-white text-sm focus:border-cyber-cyan focus:shadow-[0_0_10px_rgba(0,240,255,0.2)] focus:outline-none transition-all"
                            />
                          </div>
                      </div>
                       <div className="space-y-2">
                          <label className="text-gray-400 text-[10px] uppercase tracking-wider font-bold">{t.auth.email}</label>
                          <div className="relative group">
                            <Mail className="absolute left-3 top-3 text-gray-500 w-4 h-4 group-focus-within:text-cyber-cyan transition-colors" />
                            <input 
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                className="w-full bg-[#050b14] border border-white/10 rounded-lg py-2.5 pl-10 text-white text-sm focus:border-cyber-cyan focus:shadow-[0_0_10px_rgba(0,240,255,0.2)] focus:outline-none transition-all"
                            />
                          </div>
                      </div>
                  </div>

                  <div className="space-y-2 mt-6">
                      <label className="text-gray-400 text-[10px] uppercase tracking-wider font-bold">Bio</label>
                      <textarea 
                          rows={3}
                          value={formData.bio}
                          onChange={(e) => setFormData({...formData, bio: e.target.value})}
                          className="w-full bg-[#050b14] border border-white/10 rounded-lg p-3 text-white text-sm focus:border-cyber-cyan focus:shadow-[0_0_10px_rgba(0,240,255,0.2)] focus:outline-none transition-all resize-none"
                          placeholder="Tell us about yourself..."
                      />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                      <div className="space-y-2">
                          <label className="text-gray-400 text-[10px] uppercase tracking-wider font-bold">Location</label>
                          <div className="relative group">
                              <MapPin className="absolute left-3 top-3 text-gray-500 w-4 h-4 group-focus-within:text-cyber-cyan transition-colors" />
                              <input 
                                  type="text"
                                  value={formData.location}
                                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                                  className="w-full bg-[#050b14] border border-white/10 rounded-lg py-2.5 pl-10 text-white text-sm focus:border-cyber-cyan focus:outline-none transition-all"
                                  placeholder="e.g. Tashkent, Uzbekistan"
                              />
                          </div>
                      </div>
                      <div className="space-y-2">
                          <label className="text-gray-400 text-[10px] uppercase tracking-wider font-bold">Website</label>
                          <div className="relative group">
                              <Globe className="absolute left-3 top-3 text-gray-500 w-4 h-4 group-focus-within:text-cyber-cyan transition-colors" />
                              <input 
                                  type="text"
                                  value={formData.website}
                                  onChange={(e) => setFormData({...formData, website: e.target.value})}
                                  className="w-full bg-[#050b14] border border-white/10 rounded-lg py-2.5 pl-10 text-white text-sm focus:border-cyber-cyan focus:outline-none transition-all"
                                  placeholder="https://..."
                              />
                          </div>
                      </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                      <div className="space-y-2">
                          <label className="text-gray-400 text-[10px] uppercase tracking-wider font-bold">Skills (Comma separated)</label>
                          <div className="relative group">
                              <Cpu className="absolute left-3 top-3 text-gray-500 w-4 h-4 group-focus-within:text-cyber-cyan transition-colors" />
                              <input 
                                  type="text"
                                  value={formData.skills}
                                  onChange={(e) => setFormData({...formData, skills: e.target.value})}
                                  className="w-full bg-[#050b14] border border-white/10 rounded-lg py-2.5 pl-10 text-white text-sm focus:border-cyber-cyan focus:outline-none transition-all"
                                  placeholder="Modeling, Rigging..."
                              />
                          </div>
                      </div>
                      <div className="space-y-2">
                          <label className="text-gray-400 text-[10px] uppercase tracking-wider font-bold">Primary Software</label>
                          <div className="relative group">
                              <Monitor className="absolute left-3 top-3 text-gray-500 w-4 h-4 group-focus-within:text-cyber-cyan transition-colors" />
                              <select 
                                  value={formData.software}
                                  onChange={(e) => setFormData({...formData, software: e.target.value})}
                                  className="w-full bg-[#050b14] border border-white/10 rounded-lg py-2.5 pl-10 text-white text-sm focus:border-cyber-cyan focus:outline-none transition-all appearance-none"
                              >
                                  <option>Blender</option>
                                  <option>Maya</option>
                                  <option>3ds Max</option>
                                  <option>ZBrush</option>
                                  <option>Cinema 4D</option>
                                  <option>Houdini</option>
                                  <option>Unreal Engine</option>
                              </select>
                          </div>
                      </div>
                  </div>

                  <div className="pt-6 border-t border-white/5 flex justify-end">
                      <button 
                        type="submit"
                        disabled={isLoading}
                        className="bg-cyber-cyan text-black font-bold px-8 py-3 rounded-lg hover:bg-white hover:scale-105 transition-all flex items-center gap-2 disabled:opacity-50 shadow-neon-cyan"
                      >
                          {isLoading ? "..." : (
                              <>
                                <Save size={18} /> Save Changes
                              </>
                          )}
                      </button>
                  </div>
               </form>
             )}

             {/* CONTENT: SECURITY */}
             {activeTab === 'security' && (
                 <div className="space-y-8 animate-fade-in relative z-10">
                     <div className="flex items-center justify-between border-b border-white/5 pb-6">
                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                            <Shield className="text-cyber-cyan" size={24} /> Security Protocols
                        </h2>
                     </div>

                     <div className="space-y-6">
                         <div className="bg-[#050b14] p-5 rounded-xl border border-white/5">
                             <h3 className="text-white font-bold text-sm mb-4">Change Password</h3>
                             <div className="space-y-4">
                                 <div className="relative">
                                     <Lock className="absolute left-3 top-3 text-gray-500 w-4 h-4" />
                                     <input type="password" placeholder="Current Password" className="w-full bg-[#0a1220] border border-white/10 rounded-lg py-2.5 pl-10 text-white text-sm focus:border-cyber-cyan outline-none" />
                                 </div>
                                 <div className="relative">
                                     <Key className="absolute left-3 top-3 text-gray-500 w-4 h-4" />
                                     <input type="password" placeholder="New Password" className="w-full bg-[#0a1220] border border-white/10 rounded-lg py-2.5 pl-10 text-white text-sm focus:border-cyber-cyan outline-none" />
                                 </div>
                                 <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-xs font-bold transition-colors">
                                     Update Password
                                 </button>
                             </div>
                         </div>

                         <div className="bg-[#050b14] p-5 rounded-xl border border-white/5 flex items-center justify-between">
                             <div>
                                 <h3 className="text-white font-bold text-sm">Two-Factor Authentication (2FA)</h3>
                                 <p className="text-gray-500 text-xs mt-1">Secure your account with Telegram 2FA.</p>
                             </div>
                             <Toggle checked={true} onChange={() => addToast('2FA settings updated', 'success')} />
                         </div>
                     </div>
                 </div>
             )}

             {/* CONTENT: NOTIFICATIONS */}
             {activeTab === 'notifications' && (
                 <div className="space-y-8 animate-fade-in relative z-10">
                     <div className="flex items-center justify-between border-b border-white/5 pb-6">
                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                            <Bell className="text-cyber-cyan" size={24} /> Notification Center
                        </h2>
                     </div>

                     <div className="space-y-4">
                         {[
                             { label: 'Sales Alerts', desc: 'Get notified when you sell an asset' },
                             { label: 'New Comments', desc: 'When someone comments on your work' },
                             { label: 'Product Updates', desc: 'Updates to assets you purchased' },
                             { label: 'Promotions', desc: 'Discounts and community news' }
                         ].map((item, idx) => (
                             <div key={idx} className="bg-[#050b14] p-4 rounded-xl border border-white/5 flex items-center justify-between">
                                 <div>
                                     <h3 className="text-white font-bold text-sm">{item.label}</h3>
                                     <p className="text-gray-500 text-xs mt-1">{item.desc}</p>
                                 </div>
                                 <Toggle checked={true} onChange={() => addToast(`${item.label} updated`, 'info')} />
                             </div>
                         ))}
                     </div>
                 </div>
             )}

             {/* CONTENT: SYSTEM */}
             {activeTab === 'system' && (
                 <div className="space-y-8 animate-fade-in relative z-10">
                     <div className="flex items-center justify-between border-b border-white/5 pb-6">
                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                            <Cpu className="text-red-500" size={24} /> System & Language
                        </h2>
                     </div>

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         {/* Language Selector */}
                         <div className="bg-[#050b14] p-5 rounded-xl border border-white/5 hover:border-cyber-cyan/30 transition-colors">
                             <div className="flex items-center gap-3 mb-4">
                                 <Languages className="text-gray-400" size={20} />
                                 <h3 className="text-white font-bold text-sm">Interface Language</h3>
                             </div>
                             <div className="grid grid-cols-3 gap-2">
                                 <button 
                                    onClick={() => { setLanguage('uz'); addToast('Til O\'zbek tiliga o\'zgartirildi', 'success'); }}
                                    className={`py-2 rounded border text-xs font-bold transition-all ${language === 'uz' ? 'bg-cyber-cyan text-black border-cyber-cyan' : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10'}`}
                                 >
                                     O'ZBEK
                                 </button>
                                 <button 
                                    onClick={() => { setLanguage('ru'); addToast('Язык изменен на Русский', 'success'); }}
                                    className={`py-2 rounded border text-xs font-bold transition-all ${language === 'ru' ? 'bg-cyber-cyan text-black border-cyber-cyan' : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10'}`}
                                 >
                                     РУССКИЙ
                                 </button>
                                 <button 
                                    onClick={() => { setLanguage('en'); addToast('Language changed to English', 'success'); }}
                                    className={`py-2 rounded border text-xs font-bold transition-all ${language === 'en' ? 'bg-cyber-cyan text-black border-cyber-cyan' : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10'}`}
                                 >
                                     ENGLISH
                                 </button>
                             </div>
                         </div>
                     </div>
                 </div>
             )}

          </div>
        </div>
      </div>
    </div>
  );
};
