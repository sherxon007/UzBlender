
import React, { useState, useEffect } from 'react';
import { X, Mail, Lock, User, ArrowRight, Github, Chrome, Check, Briefcase, ShoppingBag, Loader2, ShieldAlert } from 'lucide-react';
import { useStore } from '../../store';
import { translations } from '../../translations';

// --- PREMIUM COMPONENTS ---

const SocialButton = ({ icon: Icon, label, onClick }: { icon: any, label: string, onClick: () => void }) => (
    <button 
        onClick={onClick}
        className="flex items-center justify-center gap-3 w-full py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 text-white transition-all duration-300 group relative overflow-hidden"
    >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
        <Icon size={18} className="text-gray-400 group-hover:text-white transition-colors" />
        <span className="text-sm font-medium">{label}</span>
    </button>
);

const PremiumInput = ({ label, type, value, onChange, placeholder, icon: Icon }: any) => {
    const [focused, setFocused] = useState(false);
    return (
        <div className="space-y-1.5 group/input">
            <label className={`text-xs font-bold tracking-wide transition-colors duration-300 ${focused ? 'text-cyber-cyan' : 'text-gray-500 group-hover/input:text-gray-400'}`}>
                {label}
            </label>
            <div className={`relative flex items-center bg-[#0d121c] border transition-all duration-300 rounded-xl overflow-hidden ${
                focused 
                ? 'border-cyber-cyan shadow-[0_0_20px_-5px_rgba(37,99,235,0.5)]' 
                : 'border-white/10 hover:border-white/20 hover:bg-white/[0.02]'
            }`}>
                <div className={`pl-4 transition-colors duration-300 ${focused ? 'text-cyber-cyan' : 'text-gray-500'}`}>
                    <Icon size={18} />
                </div>
                <input 
                    type={type}
                    value={value}
                    onChange={onChange}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    placeholder={placeholder}
                    className="w-full bg-transparent border-none text-white px-4 py-3.5 focus:ring-0 placeholder-gray-700 text-sm font-medium transition-all"
                />
                
                {/* Glow Effect Background */}
                <div className={`absolute inset-0 bg-cyber-cyan/5 pointer-events-none transition-opacity duration-500 ${focused ? 'opacity-100' : 'opacity-0'}`} />

                {/* Active Indicator Line - Expanding from center */}
                <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-gradient-to-r from-transparent via-cyber-cyan to-transparent transition-all duration-500 ease-out ${focused ? 'w-full opacity-100' : 'w-0 opacity-0'}`}></div>
            </div>
        </div>
    );
};

const RoleCard = ({ active, onClick, icon: Icon, title, desc }: any) => (
    <button 
        onClick={onClick}
        type="button"
        className={`relative flex flex-col items-start p-4 rounded-xl border transition-all duration-300 w-full text-left overflow-hidden group/card ${
            active 
            ? 'bg-cyber-cyan/10 border-cyber-cyan shadow-[0_0_20px_-5px_rgba(37,99,235,0.3)] scale-[1.02]' 
            : 'bg-white/5 border-white/10 hover:border-white/30 hover:bg-white/[0.07] hover:scale-[1.01]'
        }`}
    >
        {/* Selection Glow */}
        {active && <div className="absolute inset-0 bg-cyber-cyan/5 animate-pulse-slow pointer-events-none" />}
        
        <div className={`p-2.5 rounded-lg mb-3 transition-colors duration-300 ${active ? 'bg-cyber-cyan text-white shadow-neon-cyan' : 'bg-white/10 text-gray-400 group-hover/card:text-white group-hover/card:bg-white/20'}`}>
            <Icon size={20} />
        </div>
        <h3 className={`font-bold text-sm mb-1 transition-colors ${active ? 'text-white' : 'text-gray-300 group-hover/card:text-white'}`}>{title}</h3>
        <p className={`text-xs leading-relaxed transition-colors ${active ? 'text-cyber-cyan/90' : 'text-gray-500 group-hover/card:text-gray-400'}`}>{desc}</p>
        
        {active && (
            <div className="absolute top-3 right-3 text-cyber-cyan animate-scale-in drop-shadow-[0_0_8px_rgba(37,99,235,0.8)]">
                <Check size={16} strokeWidth={3} />
            </div>
        )}
    </button>
);

export const AuthModal = () => {
  const { isAuthOpen, authMode, closeAuth, login, openAuth, addToast, language } = useStore();
  const t = translations[language].auth;
  
  // State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [accountType, setAccountType] = useState<'buyer' | 'seller'>('buyer');
  const [isLoading, setIsLoading] = useState(false);
  
  // Visual State
  const [bgPosition, setBgPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
        const x = (e.clientX / window.innerWidth) * 20;
        const y = (e.clientY / window.innerHeight) * 20;
        setBgPosition({ x, y });
    };
    if (isAuthOpen) window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isAuthOpen]);

  if (!isAuthOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
        setIsLoading(false);
        const isAdmin = email.includes('admin');
        
        login({
            id: 'user-' + Date.now(),
            name: name || (isAdmin ? 'Admin User' : 'User'),
            email: email,
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name || email}`,
            isCreator: accountType === 'seller',
            isAdmin: isAdmin,
            joinedDate: new Date().toLocaleDateString(),
            purchasedAssets: [],
            isTelegramLinked: false,
            balance: 0,
            balanceLocked: 0,
            wishlist: []
        });
        addToast(authMode === 'login' ? 'Tizimga muvaffaqiyatli kirildi' : 'Hisob muvaffaqiyatli yaratildi', 'success');
    }, 1500);
  };

  const handleAdminFill = () => {
      setEmail('admin@uzblender.com');
      setPassword('admin123');
      addToast('Admin ma\'lumotlari to\'ldirildi. Kirish tugmasini bosing.', 'info');
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* 1. CINEMATIC BACKDROP */}
      <div className="absolute inset-0 bg-[#020408]" onClick={closeAuth}>
          {/* Animated Aurora Gradients */}
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-600/20 rounded-full blur-[120px] animate-pulse-slow"></div>
          <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-600/20 rounded-full blur-[120px] animate-pulse-slow" style={{animationDelay: '2s'}}></div>
          
          {/* Subtle Noise Texture */}
          <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`}}></div>
          
          {/* Grid Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      </div>

      {/* 2. THE FLOATING PORTAL (Main Modal) */}
      <div 
        className="relative w-full max-w-[1000px] h-auto min-h-[600px] bg-[#0a1220]/60 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-[0_0_80px_-20px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col md:flex-row animate-scale-in"
        style={{
            transform: `perspective(1000px) rotateX(${bgPosition.y * 0.05}deg) rotateY(${bgPosition.x * 0.05}deg)`
        }}
      >
        {/* Glow Effects on Modal Borders */}
        <div className="absolute top-0 left-1/4 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
        <div className="absolute bottom-0 right-1/4 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-cyber-cyan/50 to-transparent"></div>

        {/* --- LEFT SIDE: THE VISION (Visuals) --- */}
        <div className="hidden md:flex w-[45%] relative flex-col justify-between p-10 overflow-hidden bg-[#050911]">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0">
                 <img src="https://images.unsplash.com/photo-1614726365723-49faaa56475e?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover opacity-40 mix-blend-luminosity" alt="Art" />
                 <div className="absolute inset-0 bg-gradient-to-t from-[#050911] via-[#050911]/60 to-transparent"></div>
            </div>

            {/* Logo */}
            <div className="relative z-10 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center">
                    <div className="w-4 h-4 bg-cyber-cyan rounded-full shadow-[0_0_10px_#00f0ff]"></div>
                </div>
                <span className="font-display font-bold text-xl text-white tracking-wide">UzBlender</span>
            </div>

            {/* Testimonial / Inspiration */}
            <div className="relative z-10 mt-auto">
                <div className="mb-6 space-y-1">
                    <h2 className="text-3xl font-display font-bold text-white leading-tight">
                        Cheksizlikni <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan to-white">Yarating.</span>
                    </h2>
                    <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                        15,000+ ijodkorlarga qo'shiling va kelajakni birgalikda quring.
                    </p>
                </div>

                {/* Live Activity Mock */}
                <div className="flex items-center gap-3 bg-white/5 backdrop-blur-md p-3 rounded-xl border border-white/10 w-fit">
                    <div className="flex -space-x-2">
                        {[1,2,3].map(i => (
                            <img key={i} src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`} className="w-6 h-6 rounded-full border border-[#050911] bg-gray-700" />
                        ))}
                    </div>
                    <div className="text-[10px] text-gray-300">
                        <span className="font-bold text-white">NeoArtist</span> hozirgina sotuv qildi
                    </div>
                </div>
            </div>
        </div>

        {/* --- RIGHT SIDE: THE INTERFACE (Form) --- */}
        <div className="flex-1 p-8 md:p-12 bg-[#0a1220] relative flex flex-col overflow-y-auto custom-scrollbar">
            
            {/* Close */}
            <button onClick={closeAuth} className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/5 text-gray-400 hover:text-white transition-colors">
                <X size={20} />
            </button>

            {/* Header */}
            <div className="mb-8 mt-2">
                <h2 className="text-2xl font-bold text-white mb-2">
                    {authMode === 'login' ? 'Qayta ko\'rishganimizdan xursandmiz' : 'Yangi hisob yaratish'}
                </h2>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                    <span>{authMode === 'login' ? "UzBlenderda yangimisiz?" : "Hisobingiz bormi?"}</span>
                    <button 
                        onClick={() => openAuth(authMode === 'login' ? 'signup' : 'login')}
                        className="text-cyber-cyan hover:text-white transition-colors font-medium"
                    >
                        {authMode === 'login' ? 'Ro\'yxatdan o\'tish' : 'Kirish'}
                    </button>
                </div>
            </div>

            {/* Admin Shortcut (Dev Feature) */}
            {authMode === 'login' && (
                <button
                    onClick={handleAdminFill}
                    className="mb-6 w-full flex items-center justify-center gap-2 py-2 text-xs font-bold text-green-400 border border-green-500/20 bg-green-500/5 rounded-lg hover:bg-green-500/10 transition-colors"
                >
                    <ShieldAlert size={14} /> {t.adminDemo || '[DEV] Admin Kirish'}
                </button>
            )}

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-4 mb-8">
                <SocialButton icon={Github} label="Github" onClick={() => addToast('Github auth simulated', 'info')} />
                <SocialButton icon={Chrome} label="Google" onClick={() => addToast('Google auth simulated', 'info')} />
            </div>

            <div className="relative mb-8">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10"></div></div>
                <div className="relative flex justify-center text-xs uppercase"><span className="bg-[#0a1220] px-2 text-gray-500 font-medium">Yoki email orqali</span></div>
            </div>

            {/* Main Form */}
            <form onSubmit={handleSubmit} className="space-y-5 flex-1">
                
                {authMode === 'signup' && (
                    <div className="grid grid-cols-2 gap-4 animate-fade-in-up">
                        <RoleCard 
                            active={accountType === 'buyer'} 
                            onClick={() => setAccountType('buyer')}
                            icon={ShoppingBag}
                            title="Xaridor"
                            desc="Assetlarni yuklab olmoqchiman"
                        />
                        <RoleCard 
                            active={accountType === 'seller'} 
                            onClick={() => setAccountType('seller')}
                            icon={Briefcase}
                            title="Ijodkor"
                            desc="Ishlarimni sotmoqchiman"
                        />
                    </div>
                )}

                <div className="space-y-5 animate-fade-in-up" style={{animationDelay: '100ms'}}>
                    {authMode === 'signup' && (
                        <PremiumInput icon={User} type="text" label="Foydalanuvchi Nomi" placeholder="masalan: creative_mind" value={name} onChange={(e: any) => setName(e.target.value)} />
                    )}
                    <PremiumInput icon={Mail} type="email" label="Email Manzil" placeholder="siz@example.com" value={email} onChange={(e: any) => setEmail(e.target.value)} />
                    <div className="relative">
                        <PremiumInput icon={Lock} type="password" label="Parol" placeholder="••••••••" value={password} onChange={(e: any) => setPassword(e.target.value)} />
                        {authMode === 'login' && (
                            <button type="button" className="absolute top-0 right-0 text-xs text-gray-500 hover:text-white transition-colors">
                                Parolni unutdingizmi?
                            </button>
                        )}
                    </div>
                </div>

                <div className="pt-4 animate-fade-in-up" style={{animationDelay: '200ms'}}>
                    <button 
                        type="submit" 
                        disabled={isLoading}
                        className="w-full py-4 bg-white text-black rounded-xl font-bold text-sm tracking-wide hover:bg-cyber-cyan transition-all duration-300 shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_-5px_rgba(0,240,255,0.5)] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed group"
                    >
                        {isLoading ? (
                            <Loader2 className="animate-spin" size={20} />
                        ) : (
                            <>
                                {authMode === 'login' ? 'Kirish' : 'Hisob Yaratish'}
                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </button>
                    <p className="text-[10px] text-center text-gray-600 mt-4">
                        Davom etish orqali siz <span className="underline hover:text-gray-400 cursor-pointer">Foydalanish Shartlari</span> va <span className="underline hover:text-gray-400 cursor-pointer">Maxfiylik Siyosati</span>ga rozilik berasiz.
                    </p>
                </div>
            </form>
        </div>
      </div>
    </div>
  );
};
