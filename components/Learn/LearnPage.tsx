
import React, { useState } from 'react';
import { PlayCircle, Clock, Star, Tag, BookOpen, Filter, X, Youtube, ExternalLink, GraduationCap, Code2, Layers, CheckCircle2, Download, FileText, ChevronRight } from 'lucide-react';
import { useStore } from '../../store';
import { Course, LearningPath } from '../../types';

// Helper Icon for Software
const SoftwareIcon = ({ sw }: { sw: string }) => {
    if(sw.includes('Blender')) return <div className="w-6 h-6 rounded bg-orange-500 text-white flex items-center justify-center font-bold text-[10px]">Bl</div>
    if(sw.includes('Unreal')) return <div className="w-6 h-6 rounded bg-black text-white flex items-center justify-center font-bold text-[10px]">UE</div>
    if(sw.includes('Maya')) return <div className="w-6 h-6 rounded bg-teal-600 text-white flex items-center justify-center font-bold text-[10px]">Ma</div>
    if(sw.includes('ZBrush')) return <div className="w-6 h-6 rounded bg-gray-700 text-white flex items-center justify-center font-bold text-[10px]">ZB</div>
    if(sw.includes('Substance')) return <div className="w-6 h-6 rounded bg-red-600 text-white flex items-center justify-center font-bold text-[10px]">SP</div>
    if(sw.includes('Houdini')) return <div className="w-6 h-6 rounded bg-orange-600 text-white flex items-center justify-center font-bold text-[10px]">Hou</div>
    return <Code2 size={24} className="text-gray-400" />
};

// Robust YouTube ID extraction
const getYouTubeId = (url: string | undefined) => {
    if (!url) return null;
    const str = url.trim();
    
    // Check for standard 11-char ID (alphanumeric, - and _)
    // This catches cases where just the ID is stored in DB
    if (/^[a-zA-Z0-9_-]{11}$/.test(str)) {
        return str;
    }

    // Handle various URL formats
    try {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = str.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    } catch (e) {
        return null;
    }
};

const LearningPathCard: React.FC<{ path: LearningPath }> = ({ path }) => (
    <div className="flex-shrink-0 w-80 bg-[#0a1220] rounded-2xl overflow-hidden border border-white/10 hover:border-cyber-cyan/50 transition-all cursor-pointer group relative">
        <div className="h-40 relative">
            <img src={path.image} alt={path.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a1220] to-transparent"></div>
            <div className="absolute bottom-4 left-4">
                <span className="bg-white/10 backdrop-blur border border-white/20 text-white text-[10px] font-bold px-2 py-1 rounded mb-2 inline-block">{path.software}</span>
                <h3 className="text-lg font-bold text-white leading-tight">{path.title}</h3>
            </div>
        </div>
        <div className="p-4">
            <p className="text-xs text-gray-400 mb-4 line-clamp-2">{path.description}</p>
            <div className="flex items-center justify-between text-xs font-bold text-gray-300">
                <span className="flex items-center gap-1"><Clock size={14} /> {path.totalHours}</span>
                <span className="flex items-center gap-1"><Layers size={14} /> {path.courseIds.length} Kurslar</span>
            </div>
            <div className="mt-4 w-full bg-cyber-cyan/10 h-1 rounded-full overflow-hidden">
                <div className="w-1/3 h-full bg-cyber-cyan"></div>
            </div>
        </div>
    </div>
);

const VideoPlayerModal = ({ course, onClose }: { course: Course, onClose: () => void }) => {
    const { addToast, markCourseComplete } = useStore();
    const [activeTab, setActiveTab] = useState<'info' | 'resources' | 'notes'>('info');

    const handleComplete = () => {
        markCourseComplete(course.id);
        addToast(`Tabriklaymiz! "${course.title}" kursini tugatdingiz! +50 XP`, 'success');
    };

    const videoId = getYouTubeId(course.videoUrl);
    
    // Handle origin for security only if not running on file protocol
    // YouTube blocks 'file://' origin, so we omit it in that case
    const originParam = window.location.protocol !== 'file:' 
        ? `&origin=${window.location.origin}` 
        : '';

    const embedUrl = videoId 
        ? `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1&enablejsapi=1${originParam}`
        : '';

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" onClick={onClose} />
            <div className="w-full max-w-6xl h-[85vh] bg-[#0a1220] rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative animate-scale-in flex flex-col md:flex-row">
                <button onClick={onClose} className="absolute top-4 right-4 z-50 bg-black/50 hover:bg-white text-white hover:text-black p-2 rounded-full transition-colors">
                    <X size={20} />
                </button>

                {/* Left: Player */}
                <div className="flex-1 bg-black flex flex-col">
                    <div className="relative aspect-video bg-black w-full group">
                        {videoId ? (
                            <iframe 
                                width="100%" 
                                height="100%" 
                                src={embedUrl}
                                title={course.title} 
                                frameBorder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                allowFullScreen
                                className="w-full h-full"
                            ></iframe>
                        ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center text-gray-500 gap-4 bg-[#050b14]">
                                <div className="p-4 rounded-full bg-red-500/10 text-red-500">
                                    <Youtube size={48} />
                                </div>
                                <div className="text-center px-6">
                                    <p className="text-white font-bold text-lg mb-1">Video mavjud emas</p>
                                    <p className="text-sm text-gray-400">Havola noto'g'ri yoki video o'chirilgan bo'lishi mumkin.</p>
                                    <p className="text-xs text-gray-600 mt-2 font-mono">{course.videoUrl}</p>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="p-6 flex justify-between items-center bg-[#0d1526]">
                        <div>
                            <h2 className="text-xl font-bold text-white mb-1 line-clamp-1">{course.title}</h2>
                            <p className="text-sm text-gray-400">{course.instructor}</p>
                        </div>
                        <button 
                            onClick={handleComplete}
                            disabled={course.isCompleted}
                            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
                                course.isCompleted 
                                ? 'bg-green-500/20 text-green-500 cursor-default' 
                                : 'bg-cyber-cyan text-black hover:bg-white'
                            }`}
                        >
                            {course.isCompleted ? <><CheckCircle2 size={18} /> Tugatildi</> : 'Tugatdim'}
                        </button>
                    </div>
                </div>

                {/* Right: Sidebar */}
                <div className="w-full md:w-96 border-l border-white/10 bg-[#0a1220] flex flex-col">
                    <div className="flex border-b border-white/10">
                        <button onClick={() => setActiveTab('info')} className={`flex-1 py-4 text-sm font-bold border-b-2 transition-colors ${activeTab === 'info' ? 'border-cyber-cyan text-white' : 'border-transparent text-gray-500 hover:text-gray-300'}`}>Info</button>
                        <button onClick={() => setActiveTab('resources')} className={`flex-1 py-4 text-sm font-bold border-b-2 transition-colors ${activeTab === 'resources' ? 'border-cyber-cyan text-white' : 'border-transparent text-gray-500 hover:text-gray-300'}`}>Resurslar</button>
                        <button onClick={() => setActiveTab('notes')} className={`flex-1 py-4 text-sm font-bold border-b-2 transition-colors ${activeTab === 'notes' ? 'border-cyber-cyan text-white' : 'border-transparent text-gray-500 hover:text-gray-300'}`}>Qaydlar</button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6">
                        {activeTab === 'info' && (
                            <div className="space-y-6">
                                <div>
                                    <h4 className="text-xs font-bold text-gray-500 uppercase mb-2">Daraja</h4>
                                    <span className="bg-white/10 text-white px-3 py-1 rounded text-xs font-bold">{course.level}</span>
                                </div>
                                <div>
                                    <h4 className="text-xs font-bold text-gray-500 uppercase mb-2">Teglar</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {course.tags.map(t => <span key={t} className="text-xs text-gray-400 bg-white/5 px-2 py-1 rounded">#{t}</span>)}
                                    </div>
                                </div>
                                <div className="bg-blue-900/20 p-4 rounded-xl border border-blue-500/20">
                                    <h4 className="text-blue-400 font-bold text-sm mb-1">Maslahat</h4>
                                    <p className="text-xs text-blue-200/80">Videoni to'xtatib, amalda qo'llab ko'rishni unutmang. Natijalarni Hamjamiyat bo'limiga yuklang!</p>
                                </div>
                            </div>
                        )}

                        {activeTab === 'resources' && (
                            <div className="space-y-3">
                                {course.resources && course.resources.length > 0 ? (
                                    course.resources.map((res, i) => (
                                        <a 
                                            key={i} 
                                            href={res.url} 
                                            target="_blank" 
                                            className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 hover:border-cyber-cyan/30 transition-all group"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="bg-[#0a1220] p-2 rounded text-cyber-cyan">
                                                    {res.type === 'file' ? <FileText size={18} /> : <ExternalLink size={18} />}
                                                </div>
                                                <span className="text-sm font-bold text-gray-300 group-hover:text-white">{res.title}</span>
                                            </div>
                                            <Download size={16} className="text-gray-500 group-hover:text-cyber-cyan" />
                                        </a>
                                    ))
                                ) : (
                                    <p className="text-gray-500 text-sm text-center py-10">Ushbu darslik uchun resurslar yo'q.</p>
                                )}
                            </div>
                        )}

                        {activeTab === 'notes' && (
                            <div className="h-full flex flex-col">
                                <textarea 
                                    className="flex-1 bg-[#050b14] border border-white/10 rounded-xl p-4 text-sm text-gray-300 focus:outline-none focus:border-cyber-cyan resize-none mb-4" 
                                    placeholder="Muhim joylarini yozib oling..."
                                ></textarea>
                                <button className="w-full bg-white/10 hover:bg-white/20 text-white font-bold py-3 rounded-xl transition-colors">Saqlash</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export const LearnPage = () => {
    const { courses, learningPaths } = useStore();
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
    const [softwareFilter, setSoftwareFilter] = useState('Barchasi');
    const [levelFilter, setLevelFilter] = useState('Barchasi');

    // Filtering Logic
    const filteredCourses = courses.filter(c => {
        const matchesSoftware = softwareFilter === 'Barchasi' || c.software === softwareFilter;
        const matchesLevel = levelFilter === 'Barchasi' || c.level === levelFilter || (levelFilter === 'Boshlang\'ich' && c.level === 'Beginner') || (levelFilter === 'O\'rta' && c.level === 'Intermediate') || (levelFilter === 'Yuqori' && c.level === 'Advanced');
        return matchesSoftware && matchesLevel;
    });

    return (
        <div className="min-h-screen bg-[#050b14] pt-8 pb-20">
            <div className="container mx-auto px-6">
                
                {/* HERO SECTION */}
                <div className="mb-16 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-wider mb-4 animate-fade-in-up">
                        <GraduationCap size={16} /> UzBlender Academy
                    </div>
                    <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
                        Cheksiz <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan to-purple-500">Bilim</span>
                    </h1>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg animate-fade-in-up" style={{animationDelay: '0.2s'}}>
                        Dunyodagi eng yaxshi bepul darsliklar, tizimlashtirilgan yo'nalishlar va amaliy mashg'ulotlar. Hammasi bir joyda.
                    </p>
                </div>

                {/* LEARNING PATHS (Horizontal Scroll) */}
                <div className="mb-16">
                    <div className="flex justify-between items-end mb-6">
                        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                            <Layers className="text-cyber-cyan" /> O'rganish Yo'llari
                        </h2>
                        <button className="text-sm text-gray-400 hover:text-white flex items-center gap-1 font-bold transition-colors">
                            Barchasi <ChevronRight size={14} />
                        </button>
                    </div>
                    <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide snap-x">
                        {learningPaths.map(path => (
                            <LearningPathCard key={path.id} path={path} />
                        ))}
                    </div>
                </div>

                {/* MAIN COURSE LIBRARY */}
                <div className="bg-[#0a1220]/50 border-t border-white/5 pt-12">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-6">
                        <h2 className="text-2xl font-bold text-white">Darsliklar Kutubxonasi</h2>
                        
                        {/* Filters */}
                        <div className="flex flex-wrap gap-4">
                            <div className="relative group">
                                <select 
                                    value={softwareFilter}
                                    onChange={(e) => setSoftwareFilter(e.target.value)}
                                    className="bg-[#050b14] text-white text-sm font-bold border border-white/10 rounded-lg px-4 py-2 pr-10 appearance-none focus:outline-none focus:border-cyber-cyan cursor-pointer"
                                >
                                    <option value="Barchasi">Barcha Dasturlar</option>
                                    <option value="Blender">Blender</option>
                                    <option value="Unreal Engine">Unreal Engine</option>
                                    <option value="Maya">Maya</option>
                                    <option value="ZBrush">ZBrush</option>
                                    <option value="Substance">Substance</option>
                                    <option value="Houdini">Houdini</option>
                                </select>
                                <Filter size={14} className="absolute right-3 top-3 text-gray-500 pointer-events-none" />
                            </div>

                            <div className="flex bg-[#050b14] rounded-lg p-1 border border-white/10">
                                {['Barchasi', 'Boshlang\'ich', 'O\'rta', 'Yuqori'].map(lvl => (
                                    <button 
                                        key={lvl}
                                        onClick={() => setLevelFilter(lvl)}
                                        className={`px-4 py-1.5 rounded text-xs font-bold transition-all ${
                                            levelFilter === lvl ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-gray-300'
                                        }`}
                                    >
                                        {lvl}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredCourses.length > 0 ? (
                            filteredCourses.map((course, idx) => (
                                <div 
                                    key={course.id} 
                                    onClick={() => setSelectedCourse(course)}
                                    className={`group bg-[#0a1220] border rounded-2xl overflow-hidden cursor-pointer transition-all hover:-translate-y-1 hover:shadow-xl relative ${
                                        course.isCompleted ? 'border-green-500/30' : 'border-white/5 hover:border-cyber-cyan/50'
                                    }`}
                                >
                                    <div className="aspect-video relative overflow-hidden">
                                        <img src={course.image} alt={course.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                                            <div className="bg-red-600 text-white rounded-full p-3 transform scale-90 group-hover:scale-100 transition-transform shadow-xl">
                                                <PlayCircle size={32} fill="white" className="text-red-600" />
                                            </div>
                                        </div>
                                        <div className="absolute top-2 left-2 flex gap-2">
                                            <SoftwareIcon sw={course.software} />
                                        </div>
                                        {course.isCompleted && (
                                            <div className="absolute bottom-2 right-2 bg-green-500 text-black text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1">
                                                <CheckCircle2 size={12} /> Tugatildi
                                            </div>
                                        )}
                                    </div>
                                    
                                    <div className="p-5 flex flex-col h-full">
                                        <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                                            <span className="flex items-center gap-1"><Clock size={12} /> {course.duration}</span>
                                            <span className="flex items-center gap-1 text-yellow-500"><Star size={12} fill="currentColor" /> {course.rating}</span>
                                        </div>
                                        <h3 className="text-white font-bold mb-1 line-clamp-2 leading-snug group-hover:text-cyber-cyan transition-colors">{course.title}</h3>
                                        <p className="text-gray-400 text-xs mb-4 flex items-center gap-1">
                                            <span className="bg-white/10 rounded-full w-4 h-4 flex items-center justify-center text-[8px] font-bold">{course.instructor[0]}</span>
                                            {course.instructor}
                                        </p>
                                        
                                        <div className="mt-auto pt-4 border-t border-white/10 flex items-center justify-between">
                                            <span className={`text-[10px] font-bold px-2 py-1 rounded border ${
                                                course.level === 'Beginner' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                                                course.level === 'Intermediate' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' :
                                                'bg-red-500/10 text-red-400 border-red-500/20'
                                            }`}>
                                                {course.level === 'Beginner' ? 'Boshlang\'ich' : course.level === 'Intermediate' ? 'O\'rta' : 'Yuqori'}
                                            </span>
                                            <div className="text-cyber-cyan text-xs font-bold hover:text-white transition-colors flex items-center gap-1">
                                                Ko'rish <ExternalLink size={12} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-20 text-gray-500">
                                <p>Tanlangan filtrlarga mos darsliklar topilmadi.</p>
                                <button onClick={() => { setLevelFilter('Barchasi'); setSoftwareFilter('Barchasi'); }} className="text-cyber-cyan font-bold hover:underline mt-2">
                                    Filtrlarni tozalash
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Call to Action */}
                <div className="mt-20 bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-3xl p-10 text-center border border-white/10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-10 opacity-10">
                        <Youtube size={200} />
                    </div>
                    <div className="relative z-10">
                        <h3 className="text-2xl font-bold text-white mb-4">Sizda ham foydali darslik bormi?</h3>
                        <p className="text-gray-300 max-w-xl mx-auto mb-8">
                            Agar siz YouTube'da sifatli darslik ko'rgan bo'lsangiz yoki o'zingiz muallif bo'lsangiz, uni hamjamiyat bilan bo'lishing.
                        </p>
                        <button className="bg-white text-black font-bold px-8 py-3 rounded-xl hover:bg-cyber-cyan transition-all">
                            Darslik Tavsiya Qilish
                        </button>
                    </div>
                </div>

            </div>

            {/* Video Modal */}
            {selectedCourse && (
                <VideoPlayerModal course={selectedCourse} onClose={() => setSelectedCourse(null)} />
            )}
        </div>
    );
};
