
import React, { useState } from 'react';
import { Settings, Box, Upload, DollarSign, Download, Clock, Heart, Loader2, TrendingUp, AlertCircle } from 'lucide-react';
import { useStore } from '../../store';
import { UploadAssetModal } from '../Marketplace/UploadAssetModal'; 
import { translations } from '../../translations';

const SimpleLineChart = () => (
    <div className="w-full h-32 flex items-end gap-1 px-2">
        {[40, 65, 45, 80, 55, 90, 70, 85, 60, 75, 95, 100].map((h, i) => (
            <div key={i} className="flex-1 bg-cyber-green/10 rounded-t hover:bg-cyber-green/30 transition-colors relative group">
                <div 
                    className="w-full bg-cyber-green/80 rounded-t shadow-[0_0_10px_rgba(0,255,0,0.2)]" 
                    style={{ height: `${h}%` }}
                ></div>
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black border border-white/20 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    ${h * 5}
                </div>
            </div>
        ))}
    </div>
);

export const Dashboard = () => {
  const { user, setView, language, addToast, assets } = useStore();
  const [activeTab, setActiveTab] = useState<'library' | 'creator'>('library');
  const [isUploadOpen, setIsUploadOpen] = useState(false); 
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  
  const t = translations[language].dashboard;

  if (!user) {
      setView('marketplace');
      return null;
  }

  // --- REAL DATA FILTERING ---
  // Get items the user bought
  const myLibrary = assets.filter(a => user.purchasedAssets.includes(a.id));
  
  // Get items the user created (for Creator Studio)
  const myCreations = assets.filter(a => a.authorId === user.id);

  const handleDownload = (id: string, title: string) => {
      setDownloadingId(id);
      addToast(`${title} yuklanmoqda...`, 'info');
      
      // Simulate download delay
      setTimeout(() => {
          setDownloadingId(null);
          addToast('Yuklash avtomatik boshlandi', 'success');
      }, 2000);
  };

  const showHistory = (title: string) => {
      addToast(`${title} uchun tarix ko'rsatilmoqda`, 'info');
  };

  return (
    <div className="min-h-screen bg-[#050b14] pt-8 pb-20">
      <div className="container mx-auto px-6">
        
        {/* Profile Header */}
        <div className="bg-[#0a1220] rounded-2xl p-8 border border-white/10 mb-8 flex flex-col md:flex-row items-center md:items-start gap-6 relative overflow-hidden shadow-2xl">
             <div className="absolute top-0 right-0 w-64 h-64 bg-cyber-cyan/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
             
             <img src={user.avatar} alt={user.name} className="w-24 h-24 rounded-full border-4 border-[#050b14] shadow-lg z-10 object-cover" />
             
             <div className="flex-1 text-center md:text-left z-10">
                 <h1 className="text-3xl font-display font-bold text-white">{user.name}</h1>
                 <p className="text-gray-400 text-sm mb-4">
                    {user.email} • Ro'yxatdan o'tgan: {user.joinedDate}
                    {user.location && <span className="block mt-1 text-gray-500 text-xs">{user.location}</span>}
                 </p>
                 <div className="flex flex-wrap justify-center md:justify-start gap-3">
                     <span className="px-3 py-1 bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs rounded-full font-bold">
                         Foydalanuvchi
                     </span>
                     {user.isCreator && (
                        <span className="px-3 py-1 bg-green-500/10 border border-green-500/30 text-green-400 text-xs rounded-full font-bold">
                            Ijodkor
                        </span>
                     )}
                 </div>
                 {user.bio && <p className="mt-4 text-gray-300 text-sm max-w-2xl italic">"{user.bio}"</p>}
             </div>

             <button 
                onClick={() => setView('settings')}
                className="flex items-center gap-2 text-gray-400 hover:text-white bg-white/5 px-4 py-2 rounded-lg transition-colors z-10 border border-white/5 hover:border-white/20"
            >
                 <Settings size={18} />
                 <span>Sozlamalar</span>
             </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-white/10 mb-8">
            <button 
                onClick={() => setActiveTab('library')}
                className={`px-6 py-4 text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${activeTab === 'library' ? 'border-cyber-cyan text-white' : 'border-transparent text-gray-500 hover:text-gray-300'}`}
            >
                <Box size={18} />
                Kutubxona
            </button>
            <button 
                onClick={() => setActiveTab('creator')}
                className={`px-6 py-4 text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${activeTab === 'creator' ? 'border-cyber-green text-white' : 'border-transparent text-gray-500 hover:text-gray-300'}`}
            >
                <Upload size={18} />
                Studiya
            </button>
        </div>

        {/* Content Area */}
        <div className="min-h-[400px]">
            {activeTab === 'library' && (
                <div className="animate-fade-in">
                    <h2 className="text-xl font-bold text-white mb-6">{t.purchased} ({myLibrary.length})</h2>
                    {myLibrary.length > 0 ? (
                        <div className="grid gap-4">
                            {myLibrary.map(item => (
                                <div key={item.id} className="bg-[#0a1220] p-4 rounded-xl border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 hover:border-cyber-cyan/50 hover:shadow-lg transition-all">
                                    <div className="flex items-center gap-4 w-full md:w-auto">
                                        <div className="w-16 h-16 bg-black rounded-lg overflow-hidden border border-white/5 flex-shrink-0">
                                            <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-white">{item.title}</h3>
                                            <p className="text-xs text-gray-500">{item.category} • 2.4 GB</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 w-full md:w-auto">
                                        <button 
                                            onClick={() => showHistory(item.title)}
                                            className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-gray-300 px-4 py-2 rounded-lg text-sm transition-colors border border-white/5"
                                        >
                                            <Clock size={16} /> Tarix
                                        </button>
                                        <button 
                                            onClick={() => handleDownload(item.id, item.title)}
                                            disabled={downloadingId === item.id}
                                            className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-cyber-cyan text-black font-bold px-6 py-2 rounded-lg text-sm hover:bg-white transition-all shadow-[0_0_15px_rgba(0,240,255,0.3)] disabled:opacity-70 disabled:cursor-not-allowed"
                                        >
                                            {downloadingId === item.id ? (
                                                <Loader2 size={16} className="animate-spin" />
                                            ) : (
                                                <Download size={16} />
                                            )} 
                                            Yuklash
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-[#0a1220] rounded-2xl border border-dashed border-white/10">
                            <Box className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                            <h3 className="text-xl text-gray-400 mb-2">Kutubxonangiz bo'sh</h3>
                            <button onClick={() => setView('marketplace')} className="text-cyber-cyan hover:underline font-bold">
                                Marketni ko'rish
                            </button>
                        </div>
                    )}
                </div>
            )}

            {activeTab === 'creator' && (
                <div className="animate-fade-in">
                     {/* ANALYTICS SECTION */}
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        {/* Stats Cards */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-[#0a1220] p-6 rounded-xl border border-white/10 shadow-lg">
                                <p className="text-gray-400 text-sm mb-1">{t.totalSales}</p>
                                <h3 className="text-3xl font-mono text-green-400">$1,204.50</h3>
                                <div className="text-xs text-green-500 flex items-center gap-1 mt-2 font-bold"><TrendingUp size={12}/> +12% bu hafta</div>
                            </div>
                            <div className="bg-[#0a1220] p-6 rounded-xl border border-white/10 shadow-lg">
                                <p className="text-gray-400 text-sm mb-1">{t.activeList}</p>
                                <h3 className="text-3xl font-mono text-white">{myCreations.filter(a => a.status === 'active').length}</h3>
                            </div>
                            <div className="bg-[#0a1220] p-6 rounded-xl border border-white/10 shadow-lg col-span-2">
                                <p className="text-gray-400 text-sm mb-1">{t.views}</p>
                                <h3 className="text-3xl font-mono text-blue-400">12.5k</h3>
                            </div>
                        </div>

                        {/* Chart */}
                        <div className="bg-[#0a1220] p-6 rounded-xl border border-white/10 shadow-lg flex flex-col justify-between">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-bold text-white">Daromad Analitikasi</h3>
                                <span className="text-xs bg-white/5 px-2 py-1 rounded text-gray-400">So'nggi 12 oy</span>
                            </div>
                            <SimpleLineChart />
                        </div>
                     </div>

                     {/* CREATOR ASSETS LIST */}
                     {myCreations.length > 0 ? (
                         <div className="bg-[#0a1220] rounded-xl border border-white/10 overflow-hidden mb-8">
                             <div className="p-4 border-b border-white/10 font-bold text-white">Sizning Yuklanmalaringiz</div>
                             <div className="divide-y divide-white/5">
                                 {myCreations.map(asset => (
                                     <div key={asset.id} className="p-4 flex items-center justify-between">
                                         <div className="flex items-center gap-3">
                                             <img src={asset.image} className="w-10 h-10 rounded object-cover" />
                                             <div>
                                                 <p className="font-bold text-white text-sm">{asset.title}</p>
                                                 <div className="flex gap-2">
                                                     <span className={`text-[10px] font-bold px-2 rounded ${
                                                         asset.status === 'active' ? 'bg-green-500/20 text-green-500' :
                                                         asset.status === 'pending' ? 'bg-yellow-500/20 text-yellow-500' :
                                                         'bg-red-500/20 text-red-500'
                                                     }`}>
                                                         {asset.status.toUpperCase()}
                                                     </span>
                                                     <span className="text-[10px] text-gray-500">${asset.price}</span>
                                                 </div>
                                             </div>
                                         </div>
                                         <div className="text-right">
                                             <span className="text-xs text-gray-500">{new Date(asset.uploadDate).toLocaleDateString()}</span>
                                         </div>
                                     </div>
                                 ))}
                             </div>
                         </div>
                     ) : (
                        <div className="bg-[#0a1220] rounded-xl border border-white/10 p-12 text-center shadow-lg">
                            <Upload className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-white mb-2">{t.uploadFirst}</h3>
                            <p className="text-gray-400 max-w-md mx-auto mb-8">
                                {t.uploadDesc}
                            </p>
                        </div>
                     )}

                     <button 
                        onClick={() => setIsUploadOpen(true)}
                        className="w-full bg-cyber-green text-black font-bold px-8 py-4 rounded-lg hover:bg-white hover:scale-105 transition-all shadow-[0_0_20px_rgba(0,255,0,0.3)]"
                    >
                        {t.createListing}
                    </button>
                </div>
            )}
        </div>

        <UploadAssetModal isOpen={isUploadOpen} onClose={() => setIsUploadOpen(false)} />
      </div>
    </div>
  );
};
