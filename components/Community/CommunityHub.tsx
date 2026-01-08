
import React, { useState, useMemo } from 'react';
import { Heart, MessageCircle, Share2, TrendingUp, Clock, Award, Search, User, Upload, Zap, X, Image as ImageIcon, Box, Monitor, Layers, Eye } from 'lucide-react';
import { useStore } from '../../store';
import { Artwork } from '../../types';

// --- COMPONENTS ---

const SoftwareBadge: React.FC<{ sw: string }> = ({ sw }) => {
    let color = 'bg-gray-500';
    if(sw.includes('Blender')) color = 'bg-orange-500';
    if(sw.includes('Unreal')) color = 'bg-black';
    if(sw.includes('Maya')) color = 'bg-teal-600';
    if(sw.includes('ZBrush')) color = 'bg-gray-700';
    if(sw.includes('Substance')) color = 'bg-red-500';

    return (
        <span className={`${color} text-white text-[9px] px-2 py-0.5 rounded-sm font-bold uppercase tracking-wide`}>
            {sw}
        </span>
    );
};

const ArtworkDetailModal = ({ art, onClose }: { art: Artwork, onClose: () => void }) => {
    const { user, addToast, startChat, openAuth } = useStore();
    const [commentText, setCommentText] = useState('');

    const handleComment = (e: React.FormEvent) => {
        e.preventDefault();
        if(!user) return openAuth('login');
        if(!commentText.trim()) return;
        addToast('Izohingiz qo\'shildi!', 'success');
        setCommentText('');
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-[#050b14]/95 backdrop-blur-xl" onClick={onClose} />
            <div className="bg-[#0a1220] w-full max-w-6xl h-[90vh] rounded-2xl border border-white/10 shadow-2xl relative flex overflow-hidden animate-scale-in">
                <button onClick={onClose} className="absolute top-4 right-4 z-50 bg-black/50 hover:bg-white text-white hover:text-black p-2 rounded-full transition-colors">
                    <X size={20} />
                </button>

                {/* Left: Image/Canvas */}
                <div className="flex-1 bg-black flex items-center justify-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
                    <img src={art.image} className="max-w-full max-h-full object-contain shadow-2xl" alt={art.title} />
                    
                    {/* Floating Controls */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="text-white hover:text-cyber-cyan" title="Full View"><Eye size={20} /></button>
                        <div className="w-px bg-white/20"></div>
                        <button className="text-white hover:text-pink-500" title="Like"><Heart size={20} /></button>
                    </div>
                </div>

                {/* Right: Details */}
                <div className="w-[350px] md:w-[400px] border-l border-white/10 flex flex-col bg-[#0a1220]">
                    {/* Header Info */}
                    <div className="p-6 border-b border-white/5">
                        <div className="flex items-center gap-3 mb-4">
                            <img src={art.artistAvatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${art.artist}`} className="w-10 h-10 rounded-full border border-white/10" />
                            <div>
                                <h3 className="font-bold text-white text-sm">{art.artist}</h3>
                                <p className="text-xs text-gray-500">Pro Artist • {art.date}</p>
                            </div>
                            <button 
                                onClick={() => user ? startChat(art.artist, art.artistAvatar || '') : openAuth('login')}
                                className="ml-auto bg-blue-600/20 text-blue-400 hover:bg-blue-600 hover:text-white p-2 rounded-lg transition-colors"
                            >
                                <MessageCircle size={16} />
                            </button>
                        </div>
                        <h2 className="text-xl font-bold text-white mb-2">{art.title}</h2>
                        <p className="text-sm text-gray-400 leading-relaxed mb-4">{art.description || "Tavsif berilmagan."}</p>
                        
                        <div className="flex flex-wrap gap-2">
                            {art.software?.map(sw => <SoftwareBadge key={sw} sw={sw} />)}
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="flex justify-around p-4 border-b border-white/5 bg-black/20">
                        <div className="text-center">
                            <div className="flex items-center justify-center gap-1 text-white font-bold"><Heart size={16} className="text-pink-500" /> {art.likes}</div>
                            <div className="text-[10px] text-gray-500 uppercase tracking-wider">Layklar</div>
                        </div>
                        <div className="text-center">
                            <div className="flex items-center justify-center gap-1 text-white font-bold"><Eye size={16} className="text-blue-500" /> 2.4k</div>
                            <div className="text-[10px] text-gray-500 uppercase tracking-wider">Ko'rishlar</div>
                        </div>
                        <div className="text-center">
                            <div className="flex items-center justify-center gap-1 text-white font-bold"><MessageCircle size={16} className="text-green-500" /> {art.comments}</div>
                            <div className="text-[10px] text-gray-500 uppercase tracking-wider">Izohlar</div>
                        </div>
                    </div>

                    {/* Comments Area (Mock) */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        <div className="flex gap-3">
                            <div className="w-8 h-8 rounded-full bg-gray-700 flex-shrink-0"></div>
                            <div>
                                <div className="bg-white/5 p-3 rounded-lg rounded-tl-none">
                                    <span className="text-xs font-bold text-gray-300 block mb-1">User123</span>
                                    <p className="text-xs text-gray-400">Ajoyib yoritish! Cycles yoki Eevee ishlatdingizmi?</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Input */}
                    <div className="p-4 border-t border-white/10 bg-[#0a1220] z-10">
                        <form onSubmit={handleComment} className="relative">
                            <input 
                                type="text" 
                                value={commentText}
                                onChange={e => setCommentText(e.target.value)}
                                placeholder="Izoh qoldirish..."
                                className="w-full bg-[#050b14] border border-white/10 rounded-xl py-3 pl-4 pr-10 text-sm text-white focus:border-cyber-cyan focus:outline-none"
                            />
                            <button type="submit" className="absolute right-2 top-2 p-1 text-cyber-cyan hover:text-white">
                                <Share2 size={16} />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const CommunityHub = () => {
    const { setView, addToast, user, openAuth, artworks, uploadArtwork } = useStore();
    const [filter, setFilter] = useState('Trending');
    const [searchQuery, setSearchQuery] = useState('');
    const [visibleCount, setVisibleCount] = useState(8);
    const [isUploadOpen, setIsUploadOpen] = useState(false);
    const [uploadTitle, setUploadTitle] = useState('');
    const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);

    // Advanced Filtering Logic
    const filteredArtworks = useMemo(() => {
        let sorted = [...artworks];
        
        // Search Filter
        if (searchQuery) {
            sorted = sorted.filter(art => 
                art.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                art.artist.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Category/Sort Filter
        switch (filter) {
            case 'Trending':
                sorted.sort((a, b) => b.likes - a.likes);
                break;
            case 'Latest':
                sorted.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
                break;
            case 'Staff Picks':
                sorted.sort(() => Math.random() - 0.5);
                break;
        }
        
        return sorted;
    }, [filter, searchQuery, artworks]);

    const featuredArt = artworks[0]; // Just picking first for demo

    const handleAction = (action: string) => {
        if (!user) {
            addToast(`Iltimos, tizimga kiring`, 'info');
            openAuth('login');
            return;
        }

        if (action === 'Submit') {
            setIsUploadOpen(true);
        } else if (action === 'Challenge') {
            setView('contests');
        }
    };

    const handleSubmitArtwork = () => {
        if(!uploadTitle.trim()) {
            addToast('Iltimos, sarlavha kiriting', 'error');
            return;
        }
        uploadArtwork(uploadTitle, 'Character'); // Mock type
        setIsUploadOpen(false);
        setUploadTitle('');
        addToast('Ishingiz hamjamiyatga yuklandi!', 'success');
    };

    return (
        <div className="min-h-screen bg-[#050b14] pb-20">
            
            {/* 1. SPOTLIGHT SECTION (Hero) */}
            <div className="relative h-[500px] w-full overflow-hidden mb-12 group">
                <div className="absolute inset-0">
                    <img src={featuredArt.image} className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-[2000ms]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050b14] via-[#050b14]/40 to-transparent"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#050b14] via-transparent to-transparent"></div>
                </div>

                <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 flex flex-col items-start z-10">
                    <div className="inline-flex items-center gap-2 bg-yellow-500 text-black px-3 py-1 rounded font-bold text-xs uppercase tracking-wider mb-4 animate-pulse">
                        <Award size={14} /> Hafta Ishi
                    </div>
                    <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-4 leading-none">
                        {featuredArt.title}
                    </h1>
                    <div className="flex items-center gap-4 mb-8">
                        <img src={featuredArt.artistAvatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${featuredArt.artist}`} className="w-12 h-12 rounded-full border-2 border-white/20" />
                        <div>
                            <p className="text-white font-bold text-lg">{featuredArt.artist}</p>
                            <p className="text-gray-400 text-sm">Lead Environment Artist</p>
                        </div>
                        <button onClick={() => setSelectedArtwork(featuredArt)} className="ml-6 px-6 py-3 bg-white/10 hover:bg-white text-white hover:text-black rounded-lg border border-white/20 font-bold transition-all backdrop-blur-md">
                            Ko'rish
                        </button>
                    </div>
                </div>
            </div>

            {/* 2. ACTIONS & FILTERS */}
            <div className="container mx-auto px-6 mb-8 sticky top-20 z-30 pointer-events-none">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 pointer-events-auto bg-[#0a1220]/80 backdrop-blur-xl p-4 rounded-2xl border border-white/10 shadow-2xl">
                    
                    <div className="flex gap-2">
                        {['Trending', 'Latest', 'Staff Picks'].map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
                                    filter === f 
                                    ? 'bg-cyber-cyan text-black shadow-[0_0_15px_rgba(0,240,255,0.4)]' 
                                    : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                                }`}
                            >
                                {f === 'Trending' && <TrendingUp size={16} />}
                                {f === 'Latest' && <Clock size={16} />}
                                {f === 'Staff Picks' && <Award size={16} />}
                                {f === 'Trending' ? 'Ommabop' : f === 'Latest' ? 'Yangilar' : 'Tavsiyalar'}
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <div className="relative flex-1 md:w-64">
                            <Search className="absolute left-3 top-3 text-gray-500 w-4 h-4" />
                            <input 
                                type="text" 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Ijodkor yoki ishni qidirish..." 
                                className="w-full bg-[#050b14] border border-white/10 rounded-xl py-2.5 pl-10 text-sm text-white focus:outline-none focus:border-cyber-cyan transition-colors"
                            />
                        </div>
                        <button 
                            onClick={() => handleAction('Submit')}
                            className="bg-white/10 hover:bg-white hover:text-black text-white p-2.5 rounded-xl transition-colors border border-white/10"
                            title="Ish Yuklash"
                        >
                            <Upload size={20} />
                        </button>
                    </div>
                </div>
            </div>

            {/* 3. MASONRY GRID (Enhanced) */}
            <div className="container mx-auto px-6">
                <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
                    {filteredArtworks.slice(0, visibleCount).map((art) => (
                        <div 
                            key={art.id} 
                            onClick={() => setSelectedArtwork(art)}
                            className="break-inside-avoid group relative rounded-xl overflow-hidden bg-[#0a1220] border border-white/5 cursor-pointer shadow-lg hover:shadow-neon-cyan/20 transition-all duration-300 hover:-translate-y-2"
                        >
                            {/* Image */}
                            <img 
                                src={art.image} 
                                alt={art.title} 
                                className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
                            />
                            
                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                                <h3 className="text-white font-bold text-lg leading-tight mb-1 font-display">{art.title}</h3>
                                <div className="flex items-center justify-between mt-2">
                                    <div className="flex items-center gap-2">
                                        <img src={art.artistAvatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${art.artist}`} className="w-6 h-6 rounded-full border border-white/20" />
                                        <span className="text-xs text-gray-200 font-bold">{art.artist}</span>
                                    </div>
                                    <div className="flex gap-1">
                                        {art.software?.slice(0, 2).map(sw => <SoftwareBadge key={sw} sw={sw} />)}
                                    </div>
                                </div>
                                
                                <div className="flex justify-between items-center border-t border-white/20 pt-3 mt-3">
                                    <div className="flex gap-4 text-xs font-bold text-gray-300">
                                        <span className="flex items-center gap-1 group-hover:text-pink-500 transition-colors"><Heart size={14} /> {art.likes}</span>
                                        <span className="flex items-center gap-1 group-hover:text-cyber-cyan transition-colors"><MessageCircle size={14} /> {art.comments}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                
                {/* Load More */}
                {visibleCount < filteredArtworks.length && (
                    <div className="mt-16 text-center">
                        <button 
                            onClick={() => setVisibleCount(prev => prev + 4)}
                            className="bg-[#0a1220] border border-white/10 text-white hover:border-cyber-cyan hover:text-cyber-cyan px-8 py-3 rounded-xl text-sm font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 mx-auto"
                        >
                            Ko'proq Yuklash <TrendingUp size={16} />
                        </button>
                    </div>
                )}
            </div>

            {/* MODALS */}
            {selectedArtwork && (
                <ArtworkDetailModal art={selectedArtwork} onClose={() => setSelectedArtwork(null)} />
            )}

            {isUploadOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={() => setIsUploadOpen(false)} />
                    <div className="bg-[#0a1220] rounded-2xl border border-white/10 shadow-2xl w-full max-w-lg relative z-10 animate-scale-in overflow-hidden">
                        <div className="p-6 border-b border-white/10 flex justify-between items-center">
                            <h3 className="text-xl font-bold text-white">Ish Yuklash</h3>
                            <button onClick={() => setIsUploadOpen(false)} className="text-gray-400 hover:text-white"><X size={20} /></button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div className="border-2 border-dashed border-white/10 rounded-xl p-8 text-center bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                                <ImageIcon size={48} className="text-gray-500 mx-auto mb-2" />
                                <p className="text-gray-400 text-sm">Rasm yuklash uchun bosing yoki sudrab tashlang</p>
                                <p className="text-[10px] text-gray-600 mt-1">JPG, PNG (Max 10MB)</p>
                            </div>
                            <div>
                                <label className="text-xs font-bold text-gray-400 uppercase block mb-1">Sarlavha</label>
                                <input 
                                    type="text" 
                                    value={uploadTitle}
                                    onChange={(e) => setUploadTitle(e.target.value)}
                                    className="w-full bg-[#050b14] border border-white/10 rounded-lg p-3 text-white focus:border-cyber-cyan focus:outline-none" 
                                    placeholder="Ishingiz nomi" 
                                />
                            </div>
                            <button 
                                onClick={handleSubmitArtwork}
                                className="w-full bg-cyber-cyan text-black font-bold py-3 rounded-xl hover:bg-white transition-colors"
                            >
                                Chop Etish
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
