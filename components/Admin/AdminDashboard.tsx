
import React, { useState, useRef } from 'react';
import { useStore } from '../../store';
import { translations } from '../../translations';
import { Layers, Edit3, Trash2, Plus, Calendar, Upload, TrendingUp, X, Box, Briefcase, BookOpen, Users, GraduationCap, Shield, Check, Image as ImageIcon, MessageCircle, MoreVertical } from 'lucide-react';
import { Contest, Asset, Job, BlogPost, Course, User } from '../../types';

// Helper Modal
const AdminModal = ({ title, children, onClose }: { title: string, children?: React.ReactNode, onClose: () => void }) => (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
        <div className="bg-white rounded-2xl w-full max-w-3xl relative z-10 p-6 shadow-2xl animate-fade-in-up max-h-[90vh] overflow-y-auto custom-scrollbar">
            <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
                <h3 className="text-xl font-bold text-slate-800">{title}</h3>
                <button onClick={onClose} className="text-slate-400 hover:text-slate-600"><X size={24} /></button>
            </div>
            {children}
        </div>
    </div>
);

// --- MODULES ---

// 1. ASSETS MODULE
const AssetsModule = () => {
    const { assets, approveAsset, rejectAsset, deleteAsset, addToast } = useStore();
    const [filter, setFilter] = useState('pending');

    const filteredAssets = assets.filter(a => filter === 'all' || a.status === filter);

    return (
        <div>
            <div className="flex gap-2 mb-6">
                {['pending', 'active', 'all'].map(f => (
                    <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-lg text-sm font-bold uppercase ${filter === f ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
                        {f === 'pending' ? 'Kutilayotgan' : f === 'active' ? 'Faol' : 'Barchasi'}
                    </button>
                ))}
            </div>
            <div className="grid grid-cols-1 gap-4">
                {filteredAssets.length === 0 ? <p className="text-center text-slate-400 py-10">Assetlar topilmadi.</p> : filteredAssets.map(asset => (
                    <div key={asset.id} className="bg-white p-4 rounded-xl border border-slate-200 flex items-center gap-4 shadow-sm">
                        <img src={asset.image} className="w-16 h-16 rounded object-cover bg-slate-100" />
                        <div className="flex-1">
                            <h4 className="font-bold text-slate-800">{asset.title}</h4>
                            <p className="text-xs text-slate-500">{asset.category} • {asset.author} • ${asset.price}</p>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${asset.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : asset.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{asset.status.toUpperCase()}</span>
                        </div>
                        <div className="flex gap-2">
                            {asset.status === 'pending' && (
                                <>
                                    <button onClick={() => { approveAsset(asset.id); addToast('Asset tasdiqlandi', 'success') }} className="p-2 text-green-600 hover:bg-green-50 rounded"><Check size={18} /></button>
                                    <button onClick={() => { rejectAsset(asset.id, 'Talablarga mos emas'); addToast('Asset rad etildi', 'info') }} className="p-2 text-red-600 hover:bg-red-50 rounded"><X size={18} /></button>
                                </>
                            )}
                            <button onClick={() => { deleteAsset(asset.id); addToast('Asset o\'chirildi', 'success') }} className="p-2 text-slate-400 hover:text-red-500"><Trash2 size={18} /></button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// 2. JOBS MODULE
const JobsModule = () => {
    const { jobs, deleteJob, createJob, addToast } = useStore();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form, setForm] = useState<Partial<Job>>({ title: '', company: '', budget: '', type: 'Full-time', status: 'active' });

    const handleSubmit = () => {
        createJob({ ...form, id: `job-${Date.now()}`, postedDate: 'Bugun', skills: [] } as Job);
        setIsModalOpen(false);
        addToast('Ish e\'loni qo\'shildi', 'success');
    };

    return (
        <div>
            <button onClick={() => setIsModalOpen(true)} className="mb-6 bg-blue-600 text-white px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2"><Plus size={16} /> E'lon Qo'shish</button>
            <div className="space-y-4">
                {jobs.map(job => (
                    <div key={job.id} className="bg-white p-4 rounded-xl border border-slate-200 flex justify-between items-center shadow-sm">
                        <div>
                            <h4 className="font-bold text-slate-800">{job.title}</h4>
                            <p className="text-xs text-slate-500">{job.company} • {job.type} • {job.budget}</p>
                        </div>
                        <button onClick={() => { deleteJob(job.id); addToast('E\'lon o\'chirildi', 'info') }} className="text-red-500 hover:bg-red-50 p-2 rounded"><Trash2 size={18} /></button>
                    </div>
                ))}
            </div>
            {isModalOpen && (
                <AdminModal title="Yangi Ish E'loni" onClose={() => setIsModalOpen(false)}>
                    <div className="space-y-4">
                        <input type="text" placeholder="Lavozim" className="w-full border p-2 rounded" value={form.title} onChange={e => setForm({...form, title: e.target.value})} />
                        <input type="text" placeholder="Kompaniya" className="w-full border p-2 rounded" value={form.company} onChange={e => setForm({...form, company: e.target.value})} />
                        <input type="text" placeholder="Byudjet" className="w-full border p-2 rounded" value={form.budget} onChange={e => setForm({...form, budget: e.target.value})} />
                        <select className="w-full border p-2 rounded" value={form.type} onChange={e => setForm({...form, type: e.target.value as any})}><option>Full-time</option><option>Contract</option></select>
                        <button onClick={handleSubmit} className="w-full bg-blue-600 text-white py-2 rounded font-bold">Saqlash</button>
                    </div>
                </AdminModal>
            )}
        </div>
    );
};

// 3. BLOG MODULE
const BlogModule = () => {
    const { blogPosts, createBlogPost, deleteBlogPost, addToast } = useStore();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form, setForm] = useState<Partial<BlogPost>>({ title: '', category: 'Yangiliklar', author: 'Admin' });

    const handleSubmit = () => {
        createBlogPost({ ...form, id: `post-${Date.now()}`, date: new Date().toLocaleDateString(), readTime: '5 min', image: `https://picsum.photos/800/400?random=${Date.now()}` } as BlogPost);
        setIsModalOpen(false);
        addToast('Maqola chop etildi', 'success');
    };

    return (
        <div>
            <button onClick={() => setIsModalOpen(true)} className="mb-6 bg-blue-600 text-white px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2"><Plus size={16} /> Maqola Yozish</button>
            <div className="space-y-4">
                {blogPosts.map(post => (
                    <div key={post.id} className="bg-white p-4 rounded-xl border border-slate-200 flex justify-between items-center shadow-sm">
                        <div className="flex items-center gap-3">
                            <img src={post.image} className="w-12 h-12 rounded object-cover" />
                            <div>
                                <h4 className="font-bold text-slate-800 line-clamp-1">{post.title}</h4>
                                <p className="text-xs text-slate-500">{post.category} • {post.date}</p>
                            </div>
                        </div>
                        <button onClick={() => { deleteBlogPost(post.id); addToast('Maqola o\'chirildi', 'info') }} className="text-red-500 hover:bg-red-50 p-2 rounded"><Trash2 size={18} /></button>
                    </div>
                ))}
            </div>
            {isModalOpen && (
                <AdminModal title="Yangi Maqola" onClose={() => setIsModalOpen(false)}>
                    <div className="space-y-4">
                        <input type="text" placeholder="Sarlavha" className="w-full border p-2 rounded" value={form.title} onChange={e => setForm({...form, title: e.target.value})} />
                        <select className="w-full border p-2 rounded" value={form.category} onChange={e => setForm({...form, category: e.target.value})}><option>Yangiliklar</option><option>Darslik</option><option>Texnologiya</option></select>
                        <textarea rows={4} placeholder="Qisqacha mazmuni..." className="w-full border p-2 rounded" value={form.desc} onChange={e => setForm({...form, desc: e.target.value})} />
                        <button onClick={handleSubmit} className="w-full bg-blue-600 text-white py-2 rounded font-bold">Chop Etish</button>
                    </div>
                </AdminModal>
            )}
        </div>
    );
};

// 4. COURSES MODULE
const CoursesModule = () => {
    const { courses, createCourse, deleteCourse, addToast } = useStore();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form, setForm] = useState<Partial<Course>>({ title: '', instructor: '', level: 'Beginner', software: 'Blender' });

    const handleSubmit = () => {
        createCourse({ 
            ...form, 
            id: `course-${Date.now()}`, 
            duration: '1 Soat', 
            rating: 5.0, 
            image: `https://picsum.photos/400/300?random=${Date.now()}`,
            videoUrl: 'nIoXOplUvAw', // Mock
            tags: []
        } as Course);
        setIsModalOpen(false);
        addToast('Kurs qo\'shildi', 'success');
    };

    return (
        <div>
            <button onClick={() => setIsModalOpen(true)} className="mb-6 bg-blue-600 text-white px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2"><Plus size={16} /> Kurs Qo'shish</button>
            <div className="space-y-4">
                {courses.map(course => (
                    <div key={course.id} className="bg-white p-4 rounded-xl border border-slate-200 flex justify-between items-center shadow-sm">
                        <div className="flex items-center gap-3">
                            <img src={course.image} className="w-12 h-12 rounded object-cover" />
                            <div>
                                <h4 className="font-bold text-slate-800">{course.title}</h4>
                                <p className="text-xs text-slate-500">{course.software} • {course.level}</p>
                            </div>
                        </div>
                        <button onClick={() => { deleteCourse(course.id); addToast('Kurs o\'chirildi', 'info') }} className="text-red-500 hover:bg-red-50 p-2 rounded"><Trash2 size={18} /></button>
                    </div>
                ))}
            </div>
            {isModalOpen && (
                <AdminModal title="Yangi Kurs" onClose={() => setIsModalOpen(false)}>
                    <div className="space-y-4">
                        <input type="text" placeholder="Kurs Nomi" className="w-full border p-2 rounded" value={form.title} onChange={e => setForm({...form, title: e.target.value})} />
                        <input type="text" placeholder="Muallif" className="w-full border p-2 rounded" value={form.instructor} onChange={e => setForm({...form, instructor: e.target.value})} />
                        <div className="grid grid-cols-2 gap-4">
                            <select className="w-full border p-2 rounded" value={form.software} onChange={e => setForm({...form, software: e.target.value as any})}><option>Blender</option><option>Maya</option><option>ZBrush</option></select>
                            <select className="w-full border p-2 rounded" value={form.level} onChange={e => setForm({...form, level: e.target.value as any})}><option>Beginner</option><option>Intermediate</option><option>Advanced</option></select>
                        </div>
                        <button onClick={handleSubmit} className="w-full bg-blue-600 text-white py-2 rounded font-bold">Saqlash</button>
                    </div>
                </AdminModal>
            )}
        </div>
    );
};

// 5. COMMUNITY MODULE (Artworks)
const CommunityModule = () => {
    const { artworks, deleteArtwork, addToast } = useStore();
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {artworks.map(art => (
                <div key={art.id} className="relative group rounded-xl overflow-hidden aspect-square">
                    <img src={art.image} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4 text-center">
                        <p className="text-white font-bold text-xs mb-2 line-clamp-1">{art.title}</p>
                        <button onClick={() => { deleteArtwork(art.id); addToast('Ish o\'chirildi', 'info') }} className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700"><Trash2 size={16} /></button>
                    </div>
                </div>
            ))}
        </div>
    );
};

// 6. USERS MODULE
const UsersModule = () => {
    const { users, toggleUserBan, updateUserRole, addToast } = useStore();
    
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
                <thead className="bg-slate-50 text-slate-500 font-bold">
                    <tr>
                        <th className="p-3">Foydalanuvchi</th>
                        <th className="p-3">Rol</th>
                        <th className="p-3">Holat</th>
                        <th className="p-3">Amallar</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {users.map(user => (
                        <tr key={user.id}>
                            <td className="p-3 flex items-center gap-3">
                                <img src={user.avatar} className="w-8 h-8 rounded-full" />
                                <div>
                                    <div className="font-bold text-slate-800">{user.name}</div>
                                    <div className="text-xs text-slate-500">{user.email}</div>
                                </div>
                            </td>
                            <td className="p-3">
                                <span className={`px-2 py-1 rounded text-xs font-bold ${user.isAdmin ? 'bg-purple-100 text-purple-700' : 'bg-slate-100 text-slate-600'}`}>
                                    {user.isAdmin ? 'Admin' : 'User'}
                                </span>
                            </td>
                            <td className="p-3">
                                {user.isBanned ? <span className="text-red-500 font-bold">Ban</span> : <span className="text-green-500 font-bold">Faol</span>}
                            </td>
                            <td className="p-3 flex gap-2">
                                <button 
                                    onClick={() => { toggleUserBan(user.id, !user.isBanned); addToast(user.isBanned ? 'Foydalanuvchi tiklandi' : 'Foydalanuvchi bloklandi', 'info') }}
                                    className={`p-1.5 rounded ${user.isBanned ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}
                                >
                                    <Shield size={16} />
                                </button>
                                <button 
                                    onClick={() => { updateUserRole(user.id, 'moderator', !user.isAdmin); addToast('Rol o\'zgartirildi', 'success') }}
                                    className="p-1.5 rounded bg-blue-100 text-blue-600"
                                >
                                    <Edit3 size={16} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

// 7. CONTESTS MODULE (Existing refactored)
const ContestsModule = () => {
    const { contests, createContest, deleteContest, addToast } = useStore();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form, setForm] = useState({ title: '', prizePool: '', description: '', image: '', deadline: '' });

    const handleSubmit = () => {
        createContest({ ...form, id: `c-${Date.now()}`, participants: 0, status: 'active', image: form.image || `https://picsum.photos/400/200?random=${Date.now()}` } as Contest);
        setIsModalOpen(false);
        addToast('Tanlov boshlandi', 'success');
    };

    return (
        <div>
            <button onClick={() => setIsModalOpen(true)} className="mb-6 bg-blue-600 text-white px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2"><Plus size={16} /> Tanlov Boshlash</button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {contests.map(c => (
                    <div key={c.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden">
                        <h4 className="font-bold text-slate-800">{c.title}</h4>
                        <p className="text-sm text-slate-500 mb-2">{c.prizePool}</p>
                        <button onClick={() => deleteContest(c.id)} className="text-red-500 text-xs font-bold hover:underline">Yakunlash</button>
                    </div>
                ))}
            </div>
            {isModalOpen && (
                <AdminModal title="Yangi Tanlov" onClose={() => setIsModalOpen(false)}>
                    <div className="space-y-4">
                        <input type="text" placeholder="Nomi" className="w-full border p-2 rounded" value={form.title} onChange={e => setForm({...form, title: e.target.value})} />
                        <input type="text" placeholder="Mukofot" className="w-full border p-2 rounded" value={form.prizePool} onChange={e => setForm({...form, prizePool: e.target.value})} />
                        <button onClick={handleSubmit} className="w-full bg-blue-600 text-white py-2 rounded font-bold">Boshlash</button>
                    </div>
                </AdminModal>
            )}
        </div>
    );
};

export const AdminDashboard = () => {
    const { setView } = useStore();
    const [activeTab, setActiveTab] = useState<'assets' | 'jobs' | 'blog' | 'courses' | 'community' | 'users' | 'contests'>('assets');
    
    return (
        <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900">
            {/* Sidebar */}
            <div className="w-64 bg-white border-r border-slate-200 p-6 flex flex-col shadow-sm fixed h-full z-20">
                <div className="flex items-center gap-2 mb-8">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">A</div>
                    <span className="font-bold text-lg text-slate-800">Admin Panel</span>
                </div>
                
                <nav className="flex-1 space-y-1">
                    {[
                        { id: 'assets', label: 'Market (Assetlar)', icon: Box },
                        { id: 'jobs', label: 'Ishlar', icon: Briefcase },
                        { id: 'blog', label: 'Blog', icon: BookOpen },
                        { id: 'courses', label: 'Ta\'lim', icon: GraduationCap },
                        { id: 'community', label: 'Hamjamiyat', icon: ImageIcon },
                        { id: 'contests', label: 'Tanlovlar', icon: Layers },
                        { id: 'users', label: 'Foydalanuvchilar', icon: Users },
                    ].map(item => (
                        <button 
                            key={item.id}
                            onClick={() => setActiveTab(item.id as any)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === item.id ? 'bg-blue-50 text-blue-600' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'}`}
                        >
                            <item.icon size={18} /> {item.label}
                        </button>
                    ))}
                </nav>

                <button 
                    onClick={() => setView('marketplace')}
                    className="mt-auto w-full border border-slate-200 text-slate-600 py-3 rounded-xl font-bold hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
                >
                    <X size={16} /> Chiqish
                </button>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-8 ml-64">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-900 capitalize">{activeTab === 'community' ? 'Hamjamiyat Galereyasi' : activeTab} Boshqaruvi</h1>
                    <p className="text-slate-500 text-sm">Tizim holati: <span className="text-green-500 font-bold">Barqaror</span></p>
                </header>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm min-h-[500px]">
                    {activeTab === 'assets' && <AssetsModule />}
                    {activeTab === 'jobs' && <JobsModule />}
                    {activeTab === 'blog' && <BlogModule />}
                    {activeTab === 'courses' && <CoursesModule />}
                    {activeTab === 'community' && <CommunityModule />}
                    {activeTab === 'users' && <UsersModule />}
                    {activeTab === 'contests' && <ContestsModule />}
                </div>
            </div>
        </div>
    );
};
