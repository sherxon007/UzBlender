import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Grid as DreiGrid, MeshDistortMaterial, Sparkles } from '@react-three/drei';
import { Download, ShoppingCart, Shield, Cpu, Box, Layers, MessageSquare, Star, Share2, Heart, ChevronRight, Eye, Grid, CheckCircle2, BadgePercent, X, Flag } from 'lucide-react';
import { useStore } from '../../store';
import { Tooltip } from '../Tooltip';
import { translations } from '../../translations';
import * as THREE from 'three';

// Scanner Component
const Scanner = () => {
    const ref = useRef<THREE.Mesh>(null);
    useFrame(({ clock }) => {
        if (ref.current) {
            ref.current.position.y = Math.sin(clock.elapsedTime * 1.5) * 1.2;
        }
    });
    return (
        <group>
            <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[4, 4]} />
                <meshBasicMaterial 
                    color="#00f0ff" 
                    transparent 
                    opacity={0.1} 
                    side={THREE.DoubleSide} 
                    blending={THREE.AdditiveBlending}
                    depthWrite={false}
                />
                <mesh position={[0, 0, 0]}>
                     <planeGeometry args={[4, 0.05]} />
                     <meshBasicMaterial color="#00f0ff" transparent opacity={0.8} />
                </mesh>
            </mesh>
        </group>
    );
};

// Interactive Model
const InteractiveModel = ({ wireframe, texture }: { wireframe: boolean, texture: boolean }) => {
  const mesh = useRef<any>(null);
  
  return (
    <group>
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <mesh ref={mesh} scale={1.2}>
                <torusKnotGeometry args={[0.6, 0.2, 128, 32]} />
                <MeshDistortMaterial 
                    color={texture ? "#00f0ff" : "#334155"} 
                    emissive={texture ? "#00f0ff" : "#000000"}
                    emissiveIntensity={texture ? 0.8 : 0}
                    roughness={0.1}
                    metalness={0.9}
                    wireframe={wireframe}
                    distort={texture ? 0.3 : 0}
                    speed={2}
                />
            </mesh>
        </Float>
        <Sparkles count={40} scale={2} size={2} speed={0.4} opacity={0.5} color="#00f0ff" />
    </group>
  );
};

// Viewer3D Component
const Viewer3D = () => {
    const { language } = useStore();
    const t = translations[language].product;
    const [showGrid, setShowGrid] = useState(true);
    const [showWireframe, setShowWireframe] = useState(false);
    const [showTexture, setShowTexture] = useState(true);

    return (
        <div className="w-full h-full bg-[#020408] relative rounded-xl overflow-hidden border border-white/10 group cursor-move shadow-inner">
            <div className="absolute inset-0 z-0 opacity-20" 
                 style={{backgroundImage: 'linear-gradient(#1e293b 1px, transparent 1px), linear-gradient(90deg, #1e293b 1px, transparent 1px)', backgroundSize: '40px 40px'}}>
            </div>
            
            <Canvas className="z-10" camera={{ position: [0, 0, 5] }}>
                <ambientLight intensity={0.3} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#00f0ff" />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#2563eb" />
                
                <InteractiveModel wireframe={showWireframe} texture={showTexture} />
                <Scanner />
                
                {showGrid && <DreiGrid args={[10, 10]} cellColor="#1e293b" sectionColor="#334155" fadeDistance={20} position={[0, -2, 0]} />}
                
                <OrbitControls autoRotate autoRotateSpeed={1} enableZoom={true} />
            </Canvas>
            
            {/* Inspector Controls */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[#0a1220]/90 backdrop-blur-md p-1.5 rounded-lg border border-white/10 flex gap-2 transition-opacity opacity-0 group-hover:opacity-100 z-20 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                <Tooltip content={t.wireframe}>
                    <button 
                        onClick={() => setShowWireframe(!showWireframe)}
                        className={`p-2 rounded transition-colors ${showWireframe ? 'text-cyber-cyan bg-cyber-cyan/10 border border-cyber-cyan/30' : 'text-gray-400 hover:bg-white/10'}`}
                    >
                        <Grid size={16} />
                    </button>
                </Tooltip>
                <Tooltip content={t.texture}>
                    <button 
                        onClick={() => setShowTexture(!showTexture)}
                        className={`p-2 rounded transition-colors ${showTexture ? 'text-cyber-cyan bg-cyber-cyan/10 border border-cyber-cyan/30' : 'text-gray-400 hover:bg-white/10'}`}
                    >
                        <Layers size={16} />
                    </button>
                </Tooltip>
                <Tooltip content={t.grid}>
                    <button 
                        onClick={() => setShowGrid(!showGrid)}
                        className={`p-2 rounded transition-colors ${showGrid ? 'text-cyber-cyan bg-cyber-cyan/10 border border-cyber-cyan/30' : 'text-gray-400 hover:bg-white/10'}`}
                    >
                        <Box size={16} />
                    </button>
                </Tooltip>
            </div>

            <div className="absolute top-4 right-4 bg-[#0a1220]/80 backdrop-blur-md px-3 py-1 rounded text-[10px] font-mono text-gray-400 border border-white/10 pointer-events-none flex items-center gap-2 shadow-sm">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                WEBGL RENDERER
            </div>
        </div>
    );
};

// Main ProductDetails Component
export const ProductDetails = () => {
    const { activeAssetId, assets, cart, user, addToCart, setView, toggleWishlist, addToast, startChat, submitReview, language, openAuth } = useStore();
    const [activeTab, setActiveTab] = useState<'desc' | 'reviews' | 'qa'>('desc');
    const [licenseType, setLicenseType] = useState<'standard' | 'extended'>('standard');
    const [showOfferModal, setShowOfferModal] = useState(false);
    const [offerPrice, setOfferPrice] = useState('');
    const [reviewText, setReviewText] = useState('');
    const [reviewRating, setReviewRating] = useState(5);
    
    const t = translations[language].product;
    const asset = assets.find(a => a.id === activeAssetId);

    if (!asset) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#050b14] text-gray-500">
                Asset topilmadi yoki yuklanmoqda...
            </div>
        );
    }

    // --- CRITICAL FIX: Safe access to user properties ---
    // If user is null, these default to false instead of crashing
    const isOwned = user?.purchasedAssets ? user.purchasedAssets.includes(asset.id) : false;
    const isLiked = user?.wishlist ? user.wishlist.includes(asset.id) : false;
    // ----------------------------------------------------

    const isInCart = cart.some(item => item.id === asset.id);
    const basePrice = asset.discountPrice || asset.price;
    const finalPrice = licenseType === 'extended' ? basePrice * 3 : basePrice;

    const handleSubmitOffer = (e: React.FormEvent) => {
        e.preventDefault();
        setShowOfferModal(false);
        addToast(`${asset.author}ga ${offerPrice} UZC taklif yuborildi!`, 'success');
        startChat(asset.author, asset.authorAvatar, `Men sizning "${asset.title}" assetingiz uchun ${offerPrice} UZC taklif qilaman.`);
    };

    const handleAskQuestion = () => {
        if (!user) {
            addToast('Sotuvchiga yozish uchun tizimga kiring', 'info');
            openAuth('login');
        } else {
            startChat(asset.author, asset.authorAvatar, `Salom, men "${asset.title}" haqida so'ramoqchi edim.`);
        }
    };

    const handleReviewSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!reviewText.trim()) return;
        submitReview(asset.id, reviewRating, reviewText);
        setReviewText('');
    };

    return (
        <div className="min-h-screen bg-[#050b14] pt-8 pb-20">
            <div className="container mx-auto px-6">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-6 font-mono">
                    <span className="hover:text-cyber-cyan cursor-pointer" onClick={() => setView('marketplace')}>Market</span>
                    <ChevronRight size={14} />
                    <span className="hover:text-cyber-cyan cursor-pointer">{asset.category}s</span>
                    <ChevronRight size={14} />
                    <span className="text-white font-bold truncate max-w-[200px]">{asset.title}</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    <div className="lg:col-span-2 space-y-8">
                        <div className="h-[400px] md:h-[500px] rounded-2xl p-1 bg-[#0a1220] shadow-[0_0_40px_rgba(0,0,0,0.3)] border border-white/10">
                            <Viewer3D />
                        </div>

                        {/* Gallery Thumbs */}
                        <div className="grid grid-cols-5 gap-3">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className={`aspect-video bg-[#0a1220] rounded-lg border overflow-hidden cursor-pointer transition-all ${i===1 ? 'border-cyber-cyan ring-1 ring-cyber-cyan/50' : 'border-white/10 hover:border-white/30'}`}>
                                    <img src={`https://picsum.photos/200/150?random=${i+20}`} alt="preview" className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity" />
                                </div>
                            ))}
                        </div>

                        {/* Tabs */}
                        <div>
                            <div className="flex border-b border-white/10 mb-6 overflow-x-auto">
                                {['desc', 'reviews', 'qa'].map(tab => (
                                    <button 
                                        key={tab}
                                        onClick={() => setActiveTab(tab as any)}
                                        className={`px-6 py-4 text-sm font-bold border-b-2 transition-all whitespace-nowrap capitalize ${activeTab === tab ? 'border-cyber-cyan text-white' : 'border-transparent text-gray-500 hover:text-gray-300'}`}
                                    >
                                        {tab === 'desc' ? 'Tavsif' : tab === 'reviews' ? `Sharhlar (${asset.reviews?.length || 0})` : 'Savol-Javob'}
                                    </button>
                                ))}
                            </div>

                            <div className="min-h-[200px] text-gray-400 leading-relaxed">
                                {activeTab === 'desc' && (
                                    <div className="animate-fade-in">
                                        <h3 className="text-xl font-bold text-white mb-4">Asset Haqida</h3>
                                        <p className="mb-6">{asset.description || 'Muallif tomonidan tavsif berilmagan.'}</p>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-[#0a1220] p-6 rounded-xl border border-white/10">
                                            <div>
                                                <p className="text-xs text-gray-500 uppercase font-bold mb-1">Geometriya</p>
                                                <p className="text-white font-bold">{asset.polygons || 'N/A'} Tris</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500 uppercase font-bold mb-1">Vertikslar</p>
                                                <p className="text-white font-bold">{asset.vertices || 'N/A'}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500 uppercase font-bold mb-1">Tekstura</p>
                                                <p className="text-white font-bold">4K PBR</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500 uppercase font-bold mb-1">Rigging</p>
                                                <div className="flex items-center gap-1 text-green-500 font-bold">
                                                    <CheckCircle2 size={14} /> Mavjud
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {activeTab === 'reviews' && (
                                    <div className="space-y-6 animate-fade-in">
                                        {isOwned && (
                                            <form onSubmit={handleReviewSubmit} className="bg-[#0a1220] p-6 rounded-xl border border-white/10 mb-6">
                                                <h4 className="text-sm font-bold text-white mb-4">Sharh Qoldirish</h4>
                                                <div className="flex gap-2 mb-4">
                                                    {[1,2,3,4,5].map(star => (
                                                        <button key={star} type="button" onClick={() => setReviewRating(star)} className={`transition-colors ${star <= reviewRating ? 'text-yellow-400' : 'text-gray-700 hover:text-yellow-400/50'}`}>
                                                            <Star size={24} fill="currentColor" />
                                                        </button>
                                                    ))}
                                                </div>
                                                <textarea className="w-full bg-[#050b14] border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-cyber-cyan" rows={3} placeholder="Asset haqida fikringizni yozing..." value={reviewText} onChange={(e) => setReviewText(e.target.value)} />
                                                <div className="flex justify-end mt-3">
                                                    <button type="submit" className="bg-cyber-cyan text-black px-4 py-2 rounded-lg font-bold text-sm hover:bg-white transition-colors">Yuborish</button>
                                                </div>
                                            </form>
                                        )}
                                        <div className="space-y-4">
                                            {(!asset.reviews || asset.reviews.length === 0) && <p className="text-gray-500 italic">Hozircha sharhlar yo'q.</p>}
                                            {asset.reviews && asset.reviews.map((rev) => (
                                                <div key={rev.id} className="bg-[#0a1220] p-4 rounded-xl border border-white/5">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <div className="font-bold text-white">{rev.userName}</div>
                                                        <div className="flex text-yellow-400">
                                                            {[...Array(5)].map((_, i) => <Star key={i} size={12} fill={i < rev.rating ? "currentColor" : "none"} />)}
                                                        </div>
                                                    </div>
                                                    <p className="text-gray-400 text-sm">{rev.text}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                {activeTab === 'qa' && (
                                    <div className="space-y-4 animate-fade-in">
                                        <div className="bg-blue-900/10 border border-blue-500/20 p-4 rounded-xl flex items-start gap-3">
                                            <div className="bg-blue-500/20 p-2 rounded-full text-blue-400 mt-1"><MessageSquare size={16} /></div>
                                            <div>
                                                <h4 className="font-bold text-blue-100 text-sm">Texnik savolingiz bormi?</h4>
                                                <p className="text-xs text-blue-300/80 mb-3">Muallif bilan to'g'ridan-to'g'ri bog'lanib, asset haqida so'rang.</p>
                                                <button onClick={handleAskQuestion} className="text-xs bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded font-bold transition-colors">Muallifga Yozish</button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-1">
                        <div className="sticky top-24 space-y-6">
                            <div className="bg-[#0a1220] rounded-2xl p-6 border border-white/10 shadow-2xl relative overflow-hidden">
                                {asset.discountPrice && <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">CHEGIRMA {Math.round(((asset.price - asset.discountPrice) / asset.price) * 100)}%</div>}
                                <div className="mb-6">
                                    <h2 className="text-3xl font-display font-bold text-white flex items-center gap-2">
                                        ${finalPrice.toFixed(2)}
                                        {licenseType === 'extended' && <span className="text-sm font-sans font-normal text-gray-500 line-through">${asset.price * 3}</span>}
                                    </h2>
                                    <p className="text-xs text-gray-500 font-mono mt-1">QQS VA KOMISSIYA BILAN</p>
                                </div>
                                <div className="space-y-3 mb-6">
                                    <div className={`p-3 rounded-xl border-2 cursor-pointer transition-all ${licenseType === 'standard' ? 'border-cyber-cyan bg-cyber-cyan/10' : 'border-white/5 hover:border-white/20 bg-[#050b14]'}`} onClick={() => setLicenseType('standard')}>
                                        <div className="flex justify-between items-center mb-1"><span className="font-bold text-sm text-white">Standart Litsenziya</span>{licenseType === 'standard' && <div className="w-4 h-4 rounded-full bg-cyber-cyan shadow-[0_0_10px_#00f0ff]"></div>}</div>
                                        <p className="text-xs text-gray-400">Shaxsiy foydalanish va 1 tijoriy loyiha uchun.</p>
                                    </div>
                                    <div className={`p-3 rounded-xl border-2 cursor-pointer transition-all ${licenseType === 'extended' ? 'border-cyber-cyan bg-cyber-cyan/10' : 'border-white/5 hover:border-white/20 bg-[#050b14]'}`} onClick={() => setLicenseType('extended')}>
                                        <div className="flex justify-between items-center mb-1"><span className="font-bold text-sm text-white">Kengaytirilgan Litsenziya</span>{licenseType === 'extended' && <div className="w-4 h-4 rounded-full bg-cyber-cyan shadow-[0_0_10px_#00f0ff]"></div>}</div>
                                        <p className="text-xs text-gray-400">Cheksiz tijoriy loyihalar va manba fayllar.</p>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    {isOwned ? (
                                        <button className="w-full bg-green-500 hover:bg-green-400 text-black font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(34,197,94,0.4)]"><Download size={20} /> Qayta Yuklash</button>
                                    ) : (
                                        <>
                                            <button onClick={() => addToCart(asset)} disabled={isInCart} className={`w-full font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg ${isInCart ? 'bg-white/10 text-gray-400 cursor-not-allowed' : 'bg-cyber-cyan hover:bg-white text-black shadow-[0_0_20px_rgba(0,240,255,0.4)]'}`}>
                                                {isInCart ? <><CheckCircle2 size={20} /> Savatda</> : <><ShoppingCart size={20} /> Savatga Qo'shish</>}
                                            </button>
                                            <button onClick={() => { if(!user) { addToast('Taklif berish uchun tizimga kiring', 'info'); openAuth('login'); } else { setShowOfferModal(true); } }} className="w-full bg-transparent text-white border border-white/20 font-bold py-3 rounded-xl hover:border-white/50 hover:bg-white/5 transition-all flex items-center justify-center gap-2"><BadgePercent size={18} /> Narx Taklif Qilish</button>
                                        </>
                                    )}
                                </div>
                                <div className="mt-6 flex items-center justify-between text-gray-500">
                                    <button onClick={() => toggleWishlist(asset.id)} className={`flex items-center gap-2 text-xs font-bold transition-colors ${isLiked ? 'text-pink-500' : 'hover:text-pink-500'}`}><Heart size={16} fill={isLiked ? "currentColor" : "none"} /> {isLiked ? 'Saqlandi' : 'Saqlash'}</button>
                                    <button onClick={() => addToast('Havola nusxalandi!', 'info')} className="flex items-center gap-2 text-xs font-bold hover:text-white transition-colors"><Share2 size={16} /> Ulashish</button>
                                    <button onClick={() => addToast('Shikoyat yuborildi.', 'info')} className="flex items-center gap-2 text-xs font-bold hover:text-red-500 transition-colors"><Flag size={16} /> Shikoyat</button>
                                </div>
                            </div>
                            <div className="bg-[#0a1220] rounded-2xl p-5 border border-white/10 shadow-sm flex items-center gap-4 cursor-pointer hover:border-cyber-cyan transition-all" onClick={() => setView('seller', asset.author)}>
                                <div className="relative">
                                    <img src={asset.authorAvatar} alt={asset.author} className="w-12 h-12 rounded-full object-cover border border-white/10" />
                                    <div className="absolute -bottom-1 -right-1 bg-green-500 w-3 h-3 rounded-full border-2 border-[#0a1220]"></div>
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-white text-sm">{asset.author}</h3>
                                    <p className="text-xs text-gray-400">Ishonchli Sotuvchi • 98% Reyting</p>
                                </div>
                                <ChevronRight size={16} className="text-gray-500" />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="bg-[#0a1220] p-3 rounded-lg border border-white/10 flex items-center gap-2 text-xs font-bold text-gray-400"><Shield size={16} className="text-green-500" /> Virusdan Xoli</div>
                                <div className="bg-[#0a1220] p-3 rounded-lg border border-white/10 flex items-center gap-2 text-xs font-bold text-gray-400"><Cpu size={16} className="text-blue-500" /> Renderga Tayyor</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {showOfferModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowOfferModal(false)} />
                    <div className="bg-[#0a1220] border border-white/10 rounded-2xl p-8 max-w-md w-full relative z-10 shadow-2xl animate-scale-in">
                        <button onClick={() => setShowOfferModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white"><X size={20} /></button>
                        <h3 className="text-xl font-bold text-white mb-2">{t.offerTitle}</h3>
                        <p className="text-sm text-gray-400 mb-6">{t.offerDesc}</p>
                        <form onSubmit={handleSubmitOffer}>
                            <div className="mb-4">
                                <label className="text-xs font-bold text-gray-400 uppercase mb-1 block">{t.yourOffer}</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-3 text-gray-500">$</span>
                                    <input type="number" value={offerPrice} onChange={(e) => setOfferPrice(e.target.value)} className="w-full bg-[#050b14] border border-white/10 rounded-xl p-3 pl-8 font-bold text-white focus:outline-none focus:border-cyber-cyan" placeholder={String(asset.price)} />
                                </div>
                            </div>
                            <button type="submit" className="w-full bg-cyber-cyan text-black font-bold py-3 rounded-xl hover:bg-white transition-colors">{t.submitOffer}</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};