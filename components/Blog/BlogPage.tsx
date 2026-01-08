
import React, { useState, useMemo } from 'react';
import { Clock, User, ArrowRight, Tag, BookOpen, X, Share2, Calendar, Eye, ChevronRight } from 'lucide-react';
import { useStore } from '../../store';
import { BlogPost } from '../../types';

// --- READ MODE MODAL ---
const ArticleModal = ({ post, onClose }: { post: BlogPost, onClose: () => void }) => {
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-[#050b14]/90 backdrop-blur-md" onClick={onClose} />
            <div className="bg-[#0a1220] w-full max-w-4xl h-[90vh] rounded-2xl border border-white/10 shadow-2xl relative flex flex-col overflow-hidden animate-scale-in">
                
                {/* Header Image */}
                <div className="h-64 w-full relative shrink-0">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a1220] via-transparent to-transparent"></div>
                    <button 
                        onClick={onClose}
                        className="absolute top-4 right-4 bg-black/50 hover:bg-white text-white hover:text-black p-2 rounded-full backdrop-blur-md transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto custom-scrollbar p-8 md:p-12">
                    <div className="flex items-center gap-3 mb-6 text-xs font-bold uppercase tracking-widest text-cyber-cyan">
                        <span className="bg-cyber-cyan/10 px-3 py-1 rounded border border-cyber-cyan/20">{post.category}</span>
                        <span className="text-gray-500">•</span>
                        <span className="text-gray-400 flex items-center gap-1"><Clock size={12}/> {post.readTime}</span>
                        <span className="text-gray-500">•</span>
                        <span className="text-gray-400">{post.date}</span>
                    </div>

                    <h1 className="text-3xl md:text-5xl font-display font-bold text-white mb-8 leading-tight">
                        {post.title}
                    </h1>

                    <div className="flex items-center justify-between border-y border-white/5 py-6 mb-8">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-gray-800 border border-white/10 overflow-hidden">
                                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${post.author}`} alt="Author" />
                            </div>
                            <div>
                                <p className="text-white font-bold text-sm">{post.author}</p>
                                <p className="text-gray-500 text-xs">UzBlender Muharriri</p>
                            </div>
                        </div>
                        <button className="text-gray-400 hover:text-white flex items-center gap-2 text-sm font-bold transition-colors">
                            <Share2 size={16} /> Ulashish
                        </button>
                    </div>

                    <div className="prose prose-invert prose-lg max-w-none text-gray-300">
                        <p className="text-xl text-white font-medium mb-6 leading-relaxed border-l-4 border-cyber-cyan pl-6 italic">
                            "{post.desc}"
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </p>
                        <h3 className="text-white font-bold text-2xl mt-8 mb-4">Kelajak Texnologiyalari</h3>
                        <p>
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                        <div className="my-8 rounded-xl overflow-hidden border border-white/10">
                            <img src={`https://picsum.photos/800/400?random=${post.id}`} alt="Content" className="w-full h-auto" />
                            <p className="bg-[#050b14] p-3 text-xs text-center text-gray-500">Render: Cycles X, 4096 Samples</p>
                        </div>
                        <p>
                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const BlogPage = () => {
    const { blogPosts, language } = useStore();
    const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
    const [activeFilter, setActiveFilter] = useState('Barchasi');

    // Mock Data Expansion if store is empty (for visuals)
    const displayPosts = blogPosts.length > 0 ? blogPosts : [];
    
    // Filtering
    const filteredPosts = activeFilter === 'Barchasi' 
        ? displayPosts 
        : displayPosts.filter(post => post.category === activeFilter);

    const featuredPost = filteredPosts[0];
    const gridPosts = filteredPosts.slice(1);

    const categories = ['Barchasi', 'Darslik', 'Texnologiya', 'Yangiliklar', 'Hamjamiyat'];

    return (
        <div className="min-h-screen bg-[#050b14] pt-8 pb-20">
            <div className="container mx-auto px-6">
                
                {/* Modern Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 pb-6 border-b border-white/5">
                    <div>
                        <div className="flex items-center gap-2 text-cyber-cyan font-bold mb-2 animate-fade-in">
                            <BookOpen size={20} />
                            <span className="uppercase tracking-widest text-xs">UzBlender Blog</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-display font-bold text-white animate-fade-in-up">
                            Raqamli <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyber-cyan">Kelajak</span>
                        </h1>
                    </div>
                    
                    {/* Futuristic Filters */}
                    <div className="flex gap-2 mt-6 md:mt-0 overflow-x-auto pb-2 md:pb-0 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
                        {categories.map(cat => (
                            <button 
                                key={cat} 
                                onClick={() => setActiveFilter(cat)}
                                className={`px-5 py-2 rounded-lg border text-xs font-bold uppercase tracking-wide transition-all whitespace-nowrap ${
                                    activeFilter === cat 
                                    ? 'bg-cyber-cyan text-black border-cyber-cyan shadow-[0_0_15px_rgba(0,240,255,0.4)]' 
                                    : 'bg-white/5 text-gray-400 border-white/10 hover:border-white/30 hover:text-white'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Main Content Area */}
                {filteredPosts.length > 0 ? (
                    <div className="space-y-8">
                        
                        {/* HERO ARTICLE (Featured) */}
                        {featuredPost && (
                            <div 
                                onClick={() => setSelectedPost(featuredPost)}
                                className="group relative w-full h-[500px] rounded-3xl overflow-hidden cursor-pointer border border-white/10 hover:border-cyber-cyan/50 transition-all duration-500 shadow-2xl animate-fade-in-up"
                            >
                                <img 
                                    src={featuredPost.image} 
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                                    alt={featuredPost.title} 
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#050b14] via-[#050b14]/60 to-transparent"></div>
                                
                                <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full md:w-2/3">
                                    <div className="flex items-center gap-3 mb-4">
                                        <span className="bg-cyber-cyan text-black px-3 py-1 rounded text-xs font-bold uppercase">{featuredPost.category}</span>
                                        <span className="text-gray-300 text-xs flex items-center gap-1 bg-black/50 px-2 py-1 rounded backdrop-blur-sm"><Calendar size={12}/> {featuredPost.date}</span>
                                    </div>
                                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight group-hover:text-cyber-cyan transition-colors">
                                        {featuredPost.title}
                                    </h2>
                                    <p className="text-gray-300 mb-6 text-lg line-clamp-2 border-l-2 border-cyber-cyan pl-4">
                                        {featuredPost.desc}
                                    </p>
                                    <div className="flex items-center gap-4 text-sm text-gray-400">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-full bg-gray-700 overflow-hidden border border-white/20">
                                                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${featuredPost.author}`} alt="author" />
                                            </div>
                                            <span className="text-white font-bold">{featuredPost.author}</span>
                                        </div>
                                        <span className="w-1 h-1 rounded-full bg-gray-500"></span>
                                        <span className="flex items-center gap-1"><Clock size={14} /> {featuredPost.readTime}</span>
                                        <div className="flex items-center gap-1 text-cyber-cyan ml-4 font-bold group-hover:translate-x-2 transition-transform">
                                            O'qish <ArrowRight size={16} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* BENTO GRID for other articles */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
                            {gridPosts.map((post, idx) => (
                                <div 
                                    key={post.id} 
                                    onClick={() => setSelectedPost(post)}
                                    className="group bg-[#0a1220] border border-white/10 rounded-2xl overflow-hidden hover:border-cyber-cyan/50 hover:shadow-neon-cyan/20 transition-all duration-300 cursor-pointer flex flex-col h-full"
                                >
                                    <div className="aspect-video relative overflow-hidden">
                                        <img 
                                            src={post.image} 
                                            alt={post.title} 
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                                        />
                                        <div className="absolute top-3 left-3">
                                            <span className="bg-black/60 backdrop-blur text-white text-[10px] font-bold px-2 py-1 rounded border border-white/10 uppercase">
                                                {post.category}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-6 flex-1 flex flex-col">
                                        <div className="text-gray-500 text-xs mb-2 flex items-center justify-between">
                                            <span>{post.date}</span>
                                            <span className="flex items-center gap-1"><Clock size={10} /> {post.readTime}</span>
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-3 leading-snug group-hover:text-cyber-cyan transition-colors line-clamp-2">
                                            {post.title}
                                        </h3>
                                        <p className="text-gray-400 text-sm line-clamp-3 mb-4 flex-1">
                                            {post.desc}
                                        </p>
                                        <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-auto">
                                            <span className="text-xs font-bold text-gray-300 flex items-center gap-2">
                                                <User size={12} /> {post.author}
                                            </span>
                                            <span className="bg-white/5 p-2 rounded-full text-gray-400 group-hover:bg-cyber-cyan group-hover:text-black transition-colors">
                                                <ChevronRight size={16} />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* If filtered list is empty */}
                        {gridPosts.length === 0 && !featuredPost && (
                            <div className="text-center py-20 text-gray-500">
                                <p>Ushbu kategoriyada maqolalar topilmadi.</p>
                            </div>
                        )}

                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-32 border border-dashed border-white/10 rounded-3xl bg-[#0a1220]">
                        <BookOpen size={48} className="text-gray-700 mb-4" />
                        <h3 className="text-xl font-bold text-white">Maqolalar yuklanmoqda...</h3>
                    </div>
                )}

                {/* Newsletter Section */}
                <div className="mt-20 relative rounded-3xl overflow-hidden p-10 md:p-16 text-center border border-white/10">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-900/40 to-purple-900/40"></div>
                    <div className="relative z-10 max-w-2xl mx-auto">
                        <h3 className="text-3xl font-bold text-white mb-4">Yangiliklarni O'tkazib Yubormang</h3>
                        <p className="text-gray-300 mb-8">
                            Eng so'nggi 3D darsliklar, sanoat yangiliklari va bepul resurslar haqida haftalik xabarnoma oling.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <input 
                                type="email" 
                                placeholder="Email manzilingiz" 
                                className="flex-1 bg-[#050b14] border border-white/20 rounded-xl px-6 py-4 text-white focus:border-cyber-cyan focus:outline-none focus:shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all"
                            />
                            <button className="bg-white text-black font-bold px-8 py-4 rounded-xl hover:bg-cyber-cyan transition-all shadow-lg">
                                Obuna Bo'lish
                            </button>
                        </div>
                        <p className="text-gray-500 text-xs mt-4">Spam yo'q. Istalgan vaqtda obunani bekor qilishingiz mumkin.</p>
                    </div>
                </div>

            </div>

            {/* Read Modal */}
            {selectedPost && (
                <ArticleModal post={selectedPost} onClose={() => setSelectedPost(null)} />
            )}
        </div>
    );
};
