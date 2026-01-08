
import React, { useState } from 'react';
import { Trophy, Calendar, Users, ArrowRight, Zap, Target, Award, X, Upload, Info, CheckCircle, Heart, Star, Share2 } from 'lucide-react';
import { useStore } from '../../store';

const ContestSubmissionModal = ({ contestTitle, contestId, onClose }: { contestTitle: string, contestId: string, onClose: () => void }) => {
    const { addToast, submitContestEntry } = useStore();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({ title: '', description: '', imageUrl: '' });
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const result = reader.result as string;
                setImagePreview(result);
                setFormData(prev => ({ ...prev, imageUrl: result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = () => {
        if (!formData.title || !formData.imageUrl) return addToast('Iltimos, sarlavha va rasm qo\'shing', 'error');
        submitContestEntry(contestId, formData);
        addToast('Ishingiz qabul qilindi! Omad tilaymiz.', 'success');
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-sm" onClick={onClose} />
            <div className="bg-[#0a1220] border border-white/10 rounded-2xl w-full max-w-2xl relative z-10 p-8 shadow-2xl animate-scale-in flex flex-col max-h-[90vh]">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white"><X size={20} /></button>
                
                {/* Header */}
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-white"><span className="text-cyber-cyan">{contestTitle}</span> da Qatnashing</h2>
                    <div className="flex items-center gap-2 text-sm text-gray-400 mt-1">
                        <span className={`px-2 py-0.5 rounded ${step >= 1 ? 'bg-cyber-cyan text-black font-bold' : 'bg-white/10'}`}>1. Qoidalar</span>
                        <ArrowRight size={14} />
                        <span className={`px-2 py-0.5 rounded ${step >= 2 ? 'bg-cyber-cyan text-black font-bold' : 'bg-white/10'}`}>2. Yuklash</span>
                        <ArrowRight size={14} />
                        <span className={`px-2 py-0.5 rounded ${step >= 3 ? 'bg-cyber-cyan text-black font-bold' : 'bg-white/10'}`}>3. G'alaba</span>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
                    {step === 1 && (
                        <div className="space-y-6">
                            <div className="bg-blue-900/20 border border-blue-500/30 p-4 rounded-xl">
                                <h3 className="text-blue-400 font-bold flex items-center gap-2 mb-2"><Info size={18} /> G'olib bo'lish siri</h3>
                                <ul className="list-disc pl-5 text-sm text-gray-300 space-y-2">
                                    <li><strong>Sifat:</strong> Kompozitsiya, yoritish va hikoya.</li>
                                    <li><strong>Mavzu:</strong> "Kiber Kuz" mavzusiga qat'iy amal qilish kerak.</li>
                                    <li><strong>Dastur:</strong> Blender/Maya/Max. AI orqali yaratilgan rasmlar taqiqlanadi.</li>
                                    <li><strong>Ovoz berish:</strong> Top 10 lik hamjamiyat ovozi bilan, G'olib esa Hakamlar tomonidan aniqlanadi.</li>
                                </ul>
                            </div>
                            
                            <div className="bg-white/5 p-4 rounded-xl">
                                <h3 className="text-white font-bold mb-2">Talablar</h3>
                                <ul className="text-sm text-gray-400 space-y-2">
                                    <li className="flex items-center gap-2"><CheckCircle size={14} className="text-green-500"/> Final render o'lchami: 1920x1080 minimum</li>
                                    <li className="flex items-center gap-2"><CheckCircle size={14} className="text-green-500"/> 1 ta wireframe (setka) ko'rinishi bo'lishi shart</li>
                                    <li className="flex items-center gap-2"><CheckCircle size={14} className="text-green-500"/> Muddat: 15-Noyabr, 23:59</li>
                                </ul>
                            </div>

                            <button onClick={() => setStep(2)} className="w-full bg-cyber-cyan text-black font-bold py-3 rounded-xl hover:bg-white transition-colors">
                                Qoidalarni Qabul Qilaman
                            </button>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-5">
                            <div>
                                <label className="text-xs font-bold text-gray-400 uppercase mb-1 block">Ish Sarlavhasi</label>
                                <input 
                                    type="text" 
                                    value={formData.title} 
                                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                                    className="w-full bg-[#050b14] border border-white/10 rounded-lg p-3 text-white focus:border-cyber-cyan focus:outline-none" 
                                    placeholder="Masalan: Neon Barglar"
                                />
                            </div>
                            
                            <div>
                                <label className="text-xs font-bold text-gray-400 uppercase mb-1 block">Tavsif</label>
                                <textarea 
                                    rows={3}
                                    value={formData.description}
                                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                                    className="w-full bg-[#050b14] border border-white/10 rounded-lg p-3 text-white focus:border-cyber-cyan focus:outline-none resize-none" 
                                    placeholder="Ishlatilgan dasturlar, g'oya haqida..."
                                />
                            </div>

                            <div>
                                <label className="text-xs font-bold text-gray-400 uppercase mb-1 block">Render Yuklash</label>
                                <div className="border-2 border-dashed border-white/10 rounded-xl p-6 text-center bg-white/5 hover:bg-white/10 transition-colors relative cursor-pointer group">
                                    <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleImageUpload} accept="image/*" />
                                    {imagePreview ? (
                                        <img src={imagePreview} className="max-h-48 mx-auto rounded shadow-lg" alt="Preview" />
                                    ) : (
                                        <>
                                            <Upload size={32} className="text-gray-500 mx-auto mb-2 group-hover:text-cyber-cyan" />
                                            <p className="text-sm text-gray-300">Rasm tanlash uchun bosing yoki tashlang</p>
                                        </>
                                    )}
                                </div>
                            </div>

                            <button onClick={handleSubmit} className="w-full bg-green-500 text-black font-bold py-3 rounded-xl hover:bg-green-400 transition-colors shadow-lg shadow-green-500/20">
                                Yuborish
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export const ContestsPage = () => {
    const { addToast, user, openAuth, contests, voteForEntry } = useStore();
    const [selectedContest, setSelectedContest] = useState<{id: string, title: string} | null>(null);

    const activeContest = contests.find(c => c.status === 'active');

    const handleJoin = (title: string, id: string) => {
        if (!user) {
            addToast('Tanlovga qo\'shilish uchun tizimga kiring', 'info');
            openAuth('login');
        } else {
            setSelectedContest({ id, title });
        }
    };

    const handleVote = (contestId: string, entryId: string) => {
        if (!user) {
            addToast('Ovoz berish uchun tizimga kiring', 'info');
            openAuth('login');
            return;
        }
        voteForEntry(contestId, entryId);
    };

    return (
        <div className="min-h-screen bg-[#050b14] pt-8 pb-20">
            <div className="container mx-auto px-6">
                
                {/* Hero */}
                {activeContest && (
                    <div className="relative rounded-3xl overflow-hidden h-[400px] mb-12 flex items-center justify-center border border-white/10 shadow-2xl">
                        <div className="absolute inset-0 bg-[url('https://picsum.photos/1200/600?blur=5')] bg-cover bg-center opacity-40"></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-[#050b14] via-[#050b14]/50 to-transparent"></div>
                        
                        <div className="relative z-10 text-center max-w-3xl px-4 animate-fade-in-up">
                            <div className="inline-flex items-center gap-2 bg-yellow-500/20 border border-yellow-500/50 text-yellow-400 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6 animate-pulse">
                                <Zap size={14} /> Faol Chellenj
                            </div>
                            <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 leading-tight">
                                {activeContest.title}
                            </h1>
                            <p className="text-gray-300 text-lg mb-8">
                                {activeContest.description}
                            </p>
                            
                            <div className="flex flex-col md:flex-row gap-4 justify-center">
                                <button 
                                    onClick={() => handleJoin(activeContest.title, activeContest.id)}
                                    className="bg-yellow-500 text-black font-bold px-8 py-4 rounded-xl hover:bg-white transition-all shadow-[0_0_20px_rgba(234,179,8,0.4)] flex items-center justify-center gap-2"
                                >
                                    Qatnashish <ArrowRight size={18} />
                                </button>
                                <button className="bg-white/10 backdrop-blur border border-white/20 text-white font-bold px-8 py-4 rounded-xl hover:bg-white/20 transition-all">
                                    Qoidalar
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Stats Row */}
                {activeContest && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
                        <div className="bg-[#0a1220] p-6 rounded-2xl border border-white/5 text-center">
                            <Trophy size={32} className="text-yellow-500 mx-auto mb-2" />
                            <h3 className="text-2xl font-bold text-white">{activeContest.prizePool}</h3>
                            <p className="text-xs text-gray-500 uppercase tracking-widest">Mukofot</p>
                        </div>
                        <div className="bg-[#0a1220] p-6 rounded-2xl border border-white/5 text-center">
                            <Calendar size={32} className="text-blue-500 mx-auto mb-2" />
                            <h3 className="text-2xl font-bold text-white">{activeContest.deadline}</h3>
                            <p className="text-xs text-gray-500 uppercase tracking-widest">Muddat</p>
                        </div>
                        <div className="bg-[#0a1220] p-6 rounded-2xl border border-white/5 text-center">
                            <Users size={32} className="text-purple-500 mx-auto mb-2" />
                            <h3 className="text-2xl font-bold text-white">{activeContest.participants || 0}</h3>
                            <p className="text-xs text-gray-500 uppercase tracking-widest">Qatnashchilar</p>
                        </div>
                        <div className="bg-[#0a1220] p-6 rounded-2xl border border-white/5 text-center">
                            <Target size={32} className="text-green-500 mx-auto mb-2" />
                            <h3 className="text-2xl font-bold text-white">Ovoz Berish</h3>
                            <p className="text-xs text-gray-500 uppercase tracking-widest">Hamjamiyat Tanlovi</p>
                        </div>
                    </div>
                )}

                {/* COMMUNITY VOTING GALLERY */}
                <div className="mb-20">
                    <div className="flex justify-between items-end mb-8">
                        <div>
                            <h2 className="text-3xl font-display font-bold text-white mb-2 flex items-center gap-3">
                                <Users className="text-cyber-cyan" /> Ishtirokchilar Galereyasi
                            </h2>
                            <p className="text-gray-400 text-sm">O'zingizga yoqqan ishlarga ovoz bering. Eng ko'p ovoz to'plaganlar mukofotlanadi!</p>
                        </div>
                        <div className="hidden md:flex gap-2">
                            <button className="px-4 py-2 rounded-full border border-white/10 text-xs font-bold text-white bg-white/5">Ommabop</button>
                            <button className="px-4 py-2 rounded-full border border-white/10 text-xs font-bold text-gray-400 hover:text-white">Yangilar</button>
                        </div>
                    </div>

                    {activeContest?.entries && activeContest.entries.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {activeContest.entries.map((entry) => {
                                const hasVoted = entry.votedUserIds?.includes(user?.id || '');
                                return (
                                    <div key={entry.id} className="group bg-[#0a1220] rounded-xl overflow-hidden border border-white/10 hover:border-cyber-cyan/50 transition-all shadow-lg hover:shadow-neon-cyan/20">
                                        <div className="aspect-video relative overflow-hidden">
                                            <img src={entry.imageUrl} alt={entry.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                                                <div className="flex justify-between items-center">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-[10px] font-bold text-white">
                                                            {entry.userName[0]}
                                                        </div>
                                                        <span className="text-xs text-white font-bold">{entry.userName}</span>
                                                    </div>
                                                    <button onClick={() => addToast('Havola nusxalandi', 'success')} className="text-white hover:text-cyber-cyan"><Share2 size={16} /></button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-4">
                                            <h3 className="font-bold text-white mb-1 truncate">{entry.title}</h3>
                                            <p className="text-xs text-gray-500 mb-4 line-clamp-2">{entry.description}</p>
                                            
                                            <button 
                                                onClick={() => handleVote(activeContest.id, entry.id)}
                                                className={`w-full py-2 border rounded-lg transition-all flex items-center justify-center gap-2 text-sm font-bold group/btn ${
                                                    hasVoted 
                                                    ? 'bg-red-500/10 border-red-500 text-red-500 hover:bg-red-500 hover:text-white' 
                                                    : 'bg-white/5 border-white/10 hover:bg-cyber-cyan hover:text-black text-gray-300'
                                                }`}
                                            >
                                                <Heart size={16} className={hasVoted ? 'fill-current' : 'group-hover/btn:fill-black transition-colors'} />
                                                {hasVoted ? `Ovozni Qaytarish (${entry.votes})` : `Ovoz Berish (${entry.votes})`}
                                            </button>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-[#0a1220] rounded-2xl border border-white/10 border-dashed">
                            <Trophy className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-white mb-2">Birinchi bo'ling!</h3>
                            <p className="text-gray-500 mb-6">Hozircha ishtirokchilar yo'q. O'z ishingizni yuklang va musobaqani boshlang.</p>
                            <button onClick={() => activeContest && handleJoin(activeContest.title, activeContest.id)} className="text-cyber-cyan font-bold hover:underline">Ish Yuklash</button>
                        </div>
                    )}
                </div>

                {/* Previous Winners */}
                <div className="mb-12 border-t border-white/10 pt-12">
                    <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                        <Award className="text-cyber-cyan" /> Shon-sharaf Zali
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="group relative rounded-xl overflow-hidden bg-[#0a1220] border border-white/10">
                                <div className="aspect-video relative">
                                    <img src={`https://picsum.photos/600/400?random=${i+300}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                    <div className="absolute top-2 right-2 bg-black/60 backdrop-blur px-3 py-1 rounded-lg border border-yellow-500/30 text-yellow-400 font-bold text-xs flex items-center gap-1">
                                        <Trophy size={12} /> #{i} O'rin
                                    </div>
                                </div>
                                <div className="p-4">
                                    <h3 className="text-white font-bold mb-1">Neon Drift Challenge</h3>
                                    <p className="text-sm text-gray-400 mb-3">G'olib: <span className="text-cyber-cyan font-bold">CyberArtist_{i}</span></p>
                                    <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                                        <div className="h-full bg-yellow-500 w-full"></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {selectedContest && (
                    <ContestSubmissionModal 
                        contestTitle={selectedContest.title}
                        contestId={selectedContest.id}
                        onClose={() => setSelectedContest(null)}
                    />
                )}

            </div>
        </div>
    );
};
