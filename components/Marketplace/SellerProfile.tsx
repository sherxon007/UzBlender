import React, { useState, useMemo } from 'react';
import { useStore } from '../../store';
import { ArrowLeft, UserPlus, Star, MapPin, Globe, MessageCircle, Box, Users, ShoppingBag, Calendar, CheckCircle2, Heart, Download } from 'lucide-react';
import { Tooltip } from '../Tooltip';
import { Asset } from '../../types';

// Mock data generator for seller assets - cast to Asset[] for strict typing
const getMockSellerAssets = (authorName: string): Asset[] => {
    return Array.from({ length: 6 }).map((_, i) => ({
        id: `seller-asset-${i}`,
        title: `${authorName}'s Cyber Asset ${i + 1}`,
        author: authorName,
        authorId: `author-${authorName}`, // Mock ID
        authorAvatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${authorName}`,
        price: 20 + i * 5,
        image: `https://picsum.photos/400/400?random=${i + 100}`,
        category: i % 2 === 0 ? 'Character' : 'Environment',
        formats: ['.blend', '.fbx'],
        rating: 4.5 + (i % 5) / 10,
        polygons: '25k',
        uploadDate: new Date(2024, 9, i + 1).toISOString(),
        status: 'active', // Required field
        description: 'Mock asset description for profile view.', // Required field
        reviews: [] // Required field
    } as Asset));
};

export const SellerProfile = () => {
    const { activeAssetId, setView, addToCart, cart, user, addToast, startChat, toggleWishlist } = useStore();
    const [isFollowing, setIsFollowing] = useState(false);
    const [sortOption, setSortOption] = useState('Newest First');
    
    // activeAssetId serves as the Author Name/ID here
    const authorName = activeAssetId || 'Unknown Creator';
    const authorAvatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${authorName}`;
    const initialAssets = useMemo(() => getMockSellerAssets(authorName), [authorName]);

    // Sorting Logic
    const assets = useMemo(() => {
        let sorted = [...initialAssets];
        switch (sortOption) {
            case 'Newest First':
                sorted.sort((a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime());
                break;
            case 'Most Popular':
                sorted.sort((a, b) => b.rating - a.rating);
                break;
            case 'Price: Low to High':
                sorted.sort((a, b) => a.price - b.price);
                break;
            case 'Price: High to Low':
                sorted.sort((a, b) => b.price - a.price);
                break;
        }
        return sorted;
    }, [initialAssets, sortOption]);
    
    const handleFollow = () => {
        if (!user) {
            addToast('Please login to follow creators', 'info');
            return;
        }
        setIsFollowing(!isFollowing);
        addToast(isFollowing ? `Unfollowed ${authorName}` : `Now following ${authorName}`, 'success');
    };

    const handleMessage = () => {
        if (!user) {
            addToast('Please login to message creators', 'info');
            return;
        }
        startChat(authorName, authorAvatar);
    };

    return (
        <div className="min-h-screen bg-[#050b14] pt-8 pb-20">
            <div className="container mx-auto px-6">
                 {/* Back Button */}
                 <button 
                    onClick={() => setView('marketplace')}
                    className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors group"
                >
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    <span>Back to Marketplace</span>
                </button>

                {/* Profile Header */}
                <div className="relative mb-12">
                    {/* Banner */}
                    <div className="h-64 w-full rounded-2xl overflow-hidden relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-cyber-cyan/30"></div>
                        <img 
                            src={`https://picsum.photos/1200/400?blur=4`} 
                            className="w-full h-full object-cover opacity-60"
                            alt="Cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#050b14] via-transparent to-transparent"></div>
                    </div>

                    {/* Info Card */}
                    <div className="absolute -bottom-16 left-6 md:left-12 right-6 md:right-12 bg-[#0a1220]/80 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-2xl flex flex-col md:flex-row items-center md:items-end justify-between gap-6">
                        <div className="flex flex-col md:flex-row items-center md:items-end gap-6">
                            <div className="relative">
                                <img 
                                    src={authorAvatar} 
                                    className="w-32 h-32 rounded-full border-4 border-[#050b14] bg-[#0a1220] shadow-[0_0_20px_rgba(0,240,255,0.4)]"
                                    alt={authorName}
                                />
                                <div className="absolute bottom-2 right-2 w-6 h-6 bg-cyber-green rounded-full border-4 border-[#0a1220]" title="Online"></div>
                            </div>
                            
                            <div className="text-center md:text-left mb-2">
                                <div className="flex items-center gap-2 justify-center md:justify-start mb-1">
                                    <h1 className="text-3xl font-display font-bold text-white">{authorName}</h1>
                                    <Tooltip content="Verified Creator">
                                        <div className="bg-cyber-cyan/20 p-1 rounded-full">
                                            <CheckCircle2 size={14} className="text-cyber-cyan" />
                                        </div>
                                    </Tooltip>
                                </div>
                                <p className="text-gray-400 text-sm max-w-md">
                                    Senior 3D Artist specializing in Hard Surface Modeling and Cyberpunk Environments. Creating assets for the future.
                                </p>
                                <div className="flex items-center justify-center md:justify-start gap-4 mt-3 text-xs text-gray-500 font-mono">
                                    <span className="flex items-center gap-1"><MapPin size={12}/> Tokyo, Japan</span>
                                    <span className="flex items-center gap-1"><Globe size={12}/> artstation.com/{authorName.toLowerCase()}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 mb-2">
                            <button 
                                onClick={handleMessage}
                                className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white px-5 py-2.5 rounded-lg transition-colors text-sm font-bold"
                            >
                                <MessageCircle size={18} />
                                Message
                            </button>
                            <button 
                                onClick={handleFollow}
                                className={`flex items-center gap-2 px-6 py-2.5 rounded-lg transition-all text-sm font-bold shadow-neon-cyan ${
                                    isFollowing 
                                    ? 'bg-transparent border border-cyber-cyan text-cyber-cyan' 
                                    : 'bg-cyber-cyan text-black hover:bg-white'
                                }`}
                            >
                                <UserPlus size={18} />
                                {isFollowing ? 'Following' : 'Follow'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                    <div className="bg-[#0a1220] p-4 rounded-xl border border-white/5 text-center group hover:border-cyber-cyan/30 transition-colors">
                        <Box className="w-6 h-6 text-cyber-cyan mx-auto mb-2 group-hover:scale-110 transition-transform" />
                        <h3 className="text-xl font-bold text-white">142</h3>
                        <p className="text-xs text-gray-500 uppercase tracking-widest">Total Assets</p>
                    </div>
                    <div className="bg-[#0a1220] p-4 rounded-xl border border-white/5 text-center group hover:border-cyber-cyan/30 transition-colors">
                        <ShoppingBag className="w-6 h-6 text-green-500 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                        <h3 className="text-xl font-bold text-white">12.5k</h3>
                        <p className="text-xs text-gray-500 uppercase tracking-widest">Sales</p>
                    </div>
                    <div className="bg-[#0a1220] p-4 rounded-xl border border-white/5 text-center group hover:border-cyber-cyan/30 transition-colors">
                        <Users className="w-6 h-6 text-purple-500 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                        <h3 className="text-xl font-bold text-white">2.8k</h3>
                        <p className="text-xs text-gray-500 uppercase tracking-widest">Followers</p>
                    </div>
                    <div className="bg-[#0a1220] p-4 rounded-xl border border-white/5 text-center group hover:border-cyber-cyan/30 transition-colors">
                        <Calendar className="w-6 h-6 text-orange-500 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                        <h3 className="text-xl font-bold text-white">2021</h3>
                        <p className="text-xs text-gray-500 uppercase tracking-widest">Joined</p>
                    </div>
                </div>

                {/* Seller Assets */}
                <div>
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                            <Box className="text-cyber-cyan" /> Portfolio
                        </h2>
                        <select 
                            value={sortOption} 
                            onChange={(e) => setSortOption(e.target.value)}
                            className="bg-[#0a1220] border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-cyber-cyan"
                        >
                            <option>Newest First</option>
                            <option>Most Popular</option>
                            <option>Price: Low to High</option>
                            <option>Price: High to Low</option>
                        </select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {assets.map((asset) => {
                            const isInCart = cart.some(item => item.id === asset.id);
                            // Ensure user.wishlist exists before checking includes (Critical fix for logout state)
                            const isLiked = user?.wishlist ? user.wishlist.includes(asset.id) : false;

                            return (
                                <div key={asset.id} className="group bg-[#0a1220] rounded-xl overflow-hidden border border-white/10 hover:border-cyber-cyan/50 transition-all hover:-translate-y-1 shadow-lg">
                                    <div className="aspect-video relative overflow-hidden bg-black">
                                        <img src={asset.image} alt={asset.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                        <div className="absolute top-2 right-2 flex gap-2">
                                            <button 
                                                onClick={() => toggleWishlist(asset.id)}
                                                className={`p-2 rounded-full backdrop-blur-md transition-colors ${isLiked ? 'bg-pink-500 text-white' : 'bg-black/50 text-white hover:bg-pink-500'}`}
                                            >
                                                <Heart size={14} fill={isLiked ? "currentColor" : "none"} />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <h3 className="font-bold text-white text-sm line-clamp-1">{asset.title}</h3>
                                                <p className="text-xs text-gray-500">{asset.category} • {asset.polygons} Polys</p>
                                            </div>
                                            <div className="flex items-center gap-1 text-yellow-400 text-xs font-bold">
                                                <Star size={12} fill="currentColor" /> {asset.rating.toFixed(1)}
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-center justify-between mt-4">
                                            <span className="text-xl font-bold text-cyber-cyan">${asset.price}</span>
                                            <button 
                                                onClick={() => addToCart(asset)}
                                                disabled={isInCart}
                                                className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-all ${
                                                    isInCart 
                                                    ? 'bg-white/10 text-gray-400 cursor-not-allowed' 
                                                    : 'bg-white text-black hover:bg-cyber-cyan'
                                                }`}
                                            >
                                                {isInCart ? <CheckCircle2 size={14} /> : <Download size={14} />}
                                                {isInCart ? 'Added' : 'Add to Cart'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};