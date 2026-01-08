
import React, { useState } from 'react';
import { Briefcase, DollarSign, Clock, MapPin, Search, Filter, ArrowRight, ShieldCheck, Star, X, Upload, CheckCircle2, FileText, Plus, ChevronDown, Check, Globe, Zap, Building, Users } from 'lucide-react';
import { useStore } from '../../store';
import { translations } from '../../translations';

// --- SUB-COMPONENTS ---

// 1. Post Job Modal (Employer Flow)
const PostJobModal = ({ onClose }: { onClose: () => void }) => {
    const { addToast, createJob, language } = useStore();
    const [jobData, setJobData] = useState({
        title: '',
        company: '',
        budget: '',
        description: '',
        skills: '',
        type: 'Contract',
        experienceLevel: 'Middle'
    });

    const handleSubmit = () => {
        if (!jobData.title || !jobData.company) return addToast('Please fill required fields', 'error');
        
        createJob({
            ...jobData,
            skills: jobData.skills.split(',').map(s => s.trim()),
            postedDate: 'Hozirgina'
        } as any); // Cast for strict typing of experienceLevel
        
        addToast('Job submitted for review!', 'success');
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm" onClick={onClose} />
            <div className="bg-[#0a1220] border border-white/10 rounded-2xl w-full max-w-lg relative z-10 p-8 shadow-2xl animate-scale-in">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white"><X size={20} /></button>
                
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-white mb-1">Yangi E'lon</h2>
                    <p className="text-gray-400 text-sm">Mutaxassislarni topish uchun formani to'ldiring.</p>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="text-xs font-bold text-gray-400 uppercase mb-1 block">Loyiha Nomi</label>
                        <input 
                            type="text" 
                            className="w-full bg-[#050b14] border border-white/10 rounded-lg p-3 text-white focus:border-cyber-green focus:outline-none transition-colors"
                            placeholder="Masalan: 3D Personaj Modellashtirish"
                            value={jobData.title}
                            onChange={(e) => setJobData({...jobData, title: e.target.value})}
                        />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs font-bold text-gray-400 uppercase mb-1 block">Kompaniya</label>
                            <input 
                                type="text" 
                                className="w-full bg-[#050b14] border border-white/10 rounded-lg p-3 text-white focus:border-cyber-green focus:outline-none transition-colors"
                                placeholder="Studio nomi"
                                value={jobData.company}
                                onChange={(e) => setJobData({...jobData, company: e.target.value})}
                            />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-gray-400 uppercase mb-1 block">Ish Turi</label>
                            <select 
                                className="w-full bg-[#050b14] border border-white/10 rounded-lg p-3 text-white focus:border-cyber-green focus:outline-none transition-colors"
                                value={jobData.type}
                                onChange={(e) => setJobData({...jobData, type: e.target.value})}
                            >
                                <option value="Contract">Contract</option>
                                <option value="Full-time">Full-time</option>
                                <option value="Part-time">Part-time</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs font-bold text-gray-400 uppercase mb-1 block">Byudjet ($)</label>
                            <input 
                                type="text" 
                                className="w-full bg-[#050b14] border border-white/10 rounded-lg p-3 text-white focus:border-cyber-green focus:outline-none transition-colors"
                                placeholder="e.g. $500 - $1000"
                                value={jobData.budget}
                                onChange={(e) => setJobData({...jobData, budget: e.target.value})}
                            />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-gray-400 uppercase mb-1 block">Tajriba</label>
                            <select 
                                className="w-full bg-[#050b14] border border-white/10 rounded-lg p-3 text-white focus:border-cyber-green focus:outline-none transition-colors"
                                value={jobData.experienceLevel}
                                onChange={(e) => setJobData({...jobData, experienceLevel: e.target.value})}
                            >
                                <option value="Junior">Junior</option>
                                <option value="Middle">Middle</option>
                                <option value="Senior">Senior</option>
                                <option value="Lead">Lead</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="text-xs font-bold text-gray-400 uppercase mb-1 block">Kerakli Ko'nikmalar (Vergul bilan)</label>
                        <input 
                            type="text" 
                            className="w-full bg-[#050b14] border border-white/10 rounded-lg p-3 text-white focus:border-cyber-green focus:outline-none transition-colors"
                            placeholder="Blender, ZBrush, Substance Painter"
                            value={jobData.skills}
                            onChange={(e) => setJobData({...jobData, skills: e.target.value})}
                        />
                    </div>

                    <button 
                        onClick={handleSubmit}
                        className="w-full bg-cyber-green text-black font-bold py-3.5 rounded-xl hover:bg-white transition-all shadow-lg mt-4 flex items-center justify-center gap-2"
                    >
                        <Plus size={18} /> E'lonni Joylash
                    </button>
                </div>
            </div>
        </div>
    );
};

// 2. Application Modal
const JobApplicationModal = ({ jobTitle, onClose, onSubmit, t }: { jobTitle: string, onClose: () => void, onSubmit: () => void, t: any }) => {
    const [step, setStep] = useState(1);
    const [file, setFile] = useState<File | null>(null);

    return (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={onClose} />
            <div className="bg-[#0a1220] border border-white/10 rounded-2xl w-full max-w-lg relative z-10 p-6 shadow-2xl animate-scale-in">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white"><X size={20} /></button>
                
                {step === 1 ? (
                    <>
                        <h2 className="text-xl font-bold text-white mb-1">{t.modalTitle} <span className="text-cyber-green">{jobTitle}</span></h2>
                        <p className="text-gray-400 text-sm mb-6">{t.modalDesc}</p>
                        
                        <div className="space-y-4 mb-6">
                            <div>
                                <label className="text-xs font-bold text-gray-400 uppercase mb-1 block">To'liq Ismingiz</label>
                                <input type="text" className="w-full bg-[#050b14] border border-white/10 rounded-lg p-3 text-white focus:border-cyber-green focus:outline-none transition-colors" placeholder="Ism Familiya" />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-gray-400 uppercase mb-1 block">Qo'shimcha Xat (Cover Letter)</label>
                                <textarea rows={4} className="w-full bg-[#050b14] border border-white/10 rounded-lg p-3 text-white focus:border-cyber-green focus:outline-none resize-none transition-colors" placeholder="Nega aynan siz?" />
                            </div>
                            
                            <div className="border-2 border-dashed border-white/10 rounded-xl p-6 text-center bg-white/5 hover:bg-white/10 transition-colors cursor-pointer relative group">
                                <input 
                                    type="file" 
                                    className="absolute inset-0 opacity-0 cursor-pointer" 
                                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                                />
                                {file ? (
                                    <div className="flex items-center justify-center gap-2 text-cyber-green font-bold">
                                        <FileText size={20} /> {file.name}
                                    </div>
                                ) : (
                                    <>
                                        <Upload size={32} className="text-gray-500 mx-auto mb-2 group-hover:text-cyber-green transition-colors" />
                                        <p className="text-sm text-gray-300 font-bold">{t.uploadResume}</p>
                                        <p className="text-[10px] text-gray-500">PDF, DOCX (Max 5MB)</p>
                                    </>
                                )}
                            </div>
                        </div>

                        <button 
                            onClick={() => {
                                if (file) {
                                    setStep(2);
                                    setTimeout(onSubmit, 2000); 
                                } else {
                                    alert("Iltimos, rezyume yuklang"); 
                                }
                            }}
                            className="w-full bg-cyber-green text-black font-bold py-3 rounded-xl hover:bg-white transition-colors shadow-lg"
                        >
                            {t.submit}
                        </button>
                    </>
                ) : (
                    <div className="text-center py-10 animate-fade-in">
                        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-500/50">
                            <CheckCircle2 size={32} className="text-green-500" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Ariza Yuborildi!</h3>
                        <p className="text-gray-400 text-sm">Tez orada siz bilan bog'lanishadi.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

// --- MAIN COMPONENT ---

export const JobsBoard = () => {
    const { addToast, user, openAuth, jobs, language } = useStore();
    const [search, setSearch] = useState('');
    const [selectedJob, setSelectedJob] = useState<string | null>(null);
    const [isPostJobOpen, setIsPostJobOpen] = useState(false);
    const [filterType, setFilterType] = useState('All');

    const t = translations[language].jobs;

    const handleApplyClick = (jobTitle: string) => {
        if (!user) {
            addToast('Please login to apply for jobs', 'info');
            openAuth('login');
        } else {
            setSelectedJob(jobTitle);
        }
    };

    const handlePostJobClick = () => {
        if (!user) {
            addToast('Please login to post a job', 'info');
            openAuth('login');
        } else {
            setIsPostJobOpen(true);
        }
    };

    // Filter active jobs + search
    const filteredJobs = jobs.filter(job => {
        if (job.status !== 'active') return false; // Only show active jobs publicly
        
        const matchesSearch = job.title.toLowerCase().includes(search.toLowerCase()) ||
                              job.company.toLowerCase().includes(search.toLowerCase()) ||
                              job.skills.some(skill => skill.toLowerCase().includes(search.toLowerCase()));
        const matchesType = filterType === 'All' || job.type === filterType;
        return matchesSearch && matchesType;
    });

    return (
        <div className="min-h-screen bg-[#050b14] pt-8 pb-20">
            {/* HERO SECTION */}
            <div className="container mx-auto px-6 mb-12">
                <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-blue-900/40 to-purple-900/40 border border-white/10 p-10 md:p-16 text-center shadow-2xl">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-[#050b14]/80"></div>
                    
                    <div className="relative z-10 max-w-3xl mx-auto">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyber-green/10 border border-cyber-green/20 text-cyber-green text-xs font-bold uppercase tracking-wider mb-6 animate-fade-in-up">
                            <Briefcase size={14} /> {t.heroTitle}
                        </div>
                        <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6 leading-tight animate-fade-in-up" style={{animationDelay: '0.1s'}}>
                            {t.heroTitle} <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-green to-emerald-400">{t.heroHighlight}</span>
                        </h1>
                        <p className="text-gray-300 text-lg mb-8 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
                            {t.heroDesc}
                        </p>
                        
                        <div className="flex flex-wrap justify-center gap-4 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
                            <div className="bg-[#0a1220]/80 backdrop-blur-md rounded-xl p-4 border border-white/10 flex items-center gap-4 shadow-lg">
                                <div className="text-left">
                                    <p className="text-xs text-gray-400 uppercase font-bold">{t.activeJobs}</p>
                                    <p className="text-2xl font-bold text-white">{jobs.filter(j => j.status === 'active').length}</p>
                                </div>
                                <div className="h-8 w-px bg-white/10"></div>
                                <div className="text-left">
                                    <p className="text-xs text-gray-400 uppercase font-bold">{t.avgRate}</p>
                                    <p className="text-2xl font-bold text-cyber-green">$45/hr</p>
                                </div>
                            </div>
                            
                            <button 
                                onClick={handlePostJobClick}
                                className="bg-white text-black font-bold px-8 py-4 rounded-xl hover:bg-cyber-green transition-all shadow-lg flex items-center gap-2 h-full"
                            >
                                <Plus size={20} /> {t.postJob}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* MAIN CONTENT GRID */}
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row gap-8">
                    
                    {/* LEFT SIDEBAR: FILTERS */}
                    <div className="lg:w-72 shrink-0 space-y-6">
                        <div className="bg-[#0a1220] rounded-2xl p-6 border border-white/10 shadow-lg sticky top-24">
                            <h3 className="text-white font-bold mb-6 flex items-center gap-2">
                                <Filter size={18} className="text-cyber-green" /> {t.filters}
                            </h3>

                            {/* Search */}
                            <div className="mb-6">
                                <div className="relative">
                                    <Search className="absolute left-3 top-3 text-gray-500 w-4 h-4" />
                                    <input 
                                        type="text" 
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        placeholder={t.searchPlaceholder}
                                        className="w-full bg-[#050b14] border border-white/10 rounded-xl py-2.5 pl-10 text-white text-sm focus:border-cyber-green focus:outline-none transition-colors"
                                    />
                                </div>
                            </div>

                            {/* Job Type Filter */}
                            <div className="mb-6">
                                <label className="text-xs font-bold text-gray-500 uppercase mb-3 block">{t.jobType}</label>
                                <div className="space-y-2">
                                    {['All', 'Contract', 'Full-time', 'Freelance'].map(type => (
                                        <button
                                            key={type}
                                            onClick={() => setFilterType(type)}
                                            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex justify-between items-center ${
                                                filterType === type 
                                                ? 'bg-cyber-green/10 text-cyber-green font-bold' 
                                                : 'text-gray-400 hover:text-white hover:bg-white/5'
                                            }`}
                                        >
                                            {type === 'All' ? 'Barchasi' : (t as any)[type.toLowerCase()] || type}
                                            {filterType === type && <Check size={14} />}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Budget Range Mock */}
                            <div>
                                <label className="text-xs font-bold text-gray-500 uppercase mb-3 block">{t.budgetRange}</label>
                                <div className="flex gap-2">
                                    <input type="text" placeholder="Min" className="w-full bg-[#050b14] border border-white/10 rounded-lg p-2 text-sm text-white text-center" />
                                    <span className="text-gray-500 self-center">-</span>
                                    <input type="text" placeholder="Max" className="w-full bg-[#050b14] border border-white/10 rounded-lg p-2 text-sm text-white text-center" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: JOB LIST */}
                    <div className="flex-1 space-y-4">
                        {filteredJobs.length === 0 ? (
                            <div className="text-center py-20 bg-[#0a1220] rounded-2xl border border-white/10 border-dashed">
                                <Briefcase className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                                <h3 className="text-xl font-bold text-white mb-2">Ishlar topilmadi</h3>
                                <p className="text-gray-500">Filtrlarni o'zgartirib ko'ring yoki keyinroq tekshiring.</p>
                            </div>
                        ) : (
                            filteredJobs.map((job, idx) => (
                                <div 
                                    key={job.id} 
                                    className={`bg-[#0a1220] rounded-2xl p-6 border transition-all hover:border-cyber-green/50 hover:shadow-[0_0_30px_-10px_rgba(0,255,0,0.1)] hover:-translate-y-1 animate-fade-in-up group relative overflow-hidden ${job.featured ? 'border-cyber-green/30 bg-gradient-to-br from-[#0a1220] to-green-900/10' : 'border-white/5'}`}
                                    style={{animationDelay: `${idx * 100}ms`}}
                                >
                                    {/* Featured Badge */}
                                    {job.featured && (
                                        <div className="absolute top-0 right-0 bg-cyber-green text-black text-[10px] font-bold px-3 py-1 rounded-bl-xl flex items-center gap-1 shadow-lg z-10">
                                            <Star size={10} fill="black" /> {t.featured}
                                        </div>
                                    )}
                                    
                                    <div className="flex flex-col md:flex-row gap-6">
                                        {/* Logo Placeholder */}
                                        <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-gray-400 font-bold text-2xl border border-white/10 shrink-0 group-hover:scale-105 transition-transform shadow-inner">
                                            {job.company[0]}
                                        </div>
                                        
                                        <div className="flex-1 min-w-0">
                                            <div className="flex flex-wrap items-center gap-2 mb-1">
                                                <h3 className="text-xl font-bold text-white truncate group-hover:text-cyber-green transition-colors">{job.title}</h3>
                                                {/* Experience Level Badge */}
                                                <span className={`text-[10px] px-2 py-0.5 rounded font-bold border ${
                                                    job.experienceLevel === 'Senior' ? 'text-purple-400 border-purple-500/30 bg-purple-500/10' :
                                                    job.experienceLevel === 'Middle' ? 'text-blue-400 border-blue-500/30 bg-blue-500/10' :
                                                    'text-green-400 border-green-500/30 bg-green-500/10'
                                                }`}>
                                                    {job.experienceLevel}
                                                </span>
                                            </div>
                                            
                                            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-4">
                                                <span className="flex items-center gap-1.5"><Building size={14} className="text-gray-500" /> {job.company}</span>
                                                <span className="flex items-center gap-1.5"><Clock size={14} className="text-gray-500" /> {(t as any)[job.type.toLowerCase()] || job.type}</span>
                                                <span className="flex items-center gap-1.5"><Globe size={14} className="text-gray-500" /> {t.remote}</span>
                                                <span className="flex items-center gap-1.5"><Users size={14} className="text-gray-500" /> {job.applicationsCount || 0} applicants</span>
                                            </div>

                                            <div className="flex flex-wrap gap-2">
                                                {job.skills.map(skill => (
                                                    <span key={skill} className="text-xs bg-white/5 text-gray-300 px-3 py-1 rounded-full border border-white/5 group-hover:border-white/20 transition-colors">
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="flex flex-col items-end justify-between gap-4 w-full md:w-auto mt-4 md:mt-0 pl-4 md:border-l border-white/5">
                                            <div className="text-right">
                                                <div className="text-xl font-mono font-bold text-white flex items-center justify-end gap-1">
                                                    {job.budget}
                                                </div>
                                                <div className="text-[10px] text-green-400 flex items-center justify-end gap-1 font-bold bg-green-900/20 px-2 py-0.5 rounded mt-1">
                                                    <CheckCircle2 size={10} /> {t.verified}
                                                </div>
                                            </div>
                                            <button 
                                                onClick={() => handleApplyClick(job.title)}
                                                className="bg-white/10 hover:bg-cyber-green hover:text-black text-white px-6 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 w-full md:w-auto justify-center group-hover:shadow-lg"
                                            >
                                                {t.apply} <ArrowRight size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}

                        <div className="text-center pt-8">
                            <button className="text-gray-400 hover:text-white font-bold text-sm border-b border-gray-600 hover:border-white transition-colors pb-1">
                                Ko'proq yuklash
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {selectedJob && (
                <JobApplicationModal 
                    jobTitle={selectedJob} 
                    onClose={() => setSelectedJob(null)} 
                    onSubmit={() => {
                        addToast(`Application successfully sent to ${selectedJob}`, 'success');
                        setSelectedJob(null);
                    }} 
                    t={t}
                />
            )}

            {isPostJobOpen && (
                <PostJobModal onClose={() => setIsPostJobOpen(false)} />
            )}
        </div>
    );
};
