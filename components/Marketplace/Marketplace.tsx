
import React, { useState, useMemo, useEffect } from 'react';
import { Search, Filter, Star, Download, Box, Zap, Truck, Ghost, User, Eye, ChevronDown, ChevronUp, Check, LayoutGrid, List, ArrowRight, Sparkles } from 'lucide-react';
import { useStore } from '../../store';
import { Tooltip } from '../Tooltip';
import { translations } from '../../translations';

const COLLECTIONS = [
    { id: 1, title: 'Cyberpunk Essentials', filter: 'Character', items: 12, image: 'https://picsum.photos/400/200?random=201', color: 'from-pink-500 to-purple-600' },
    { id: 2, title: 'Medieval Kingdom', filter: 'Environment', items: 45, image: 'https://picsum.photos/400/200?random=202', color: 'from-amber-500 to-orange-600' },
    { id: 3, title: 'Industrial Zone', filter: 'Vehicle', items: 28, image: 'https://picsum.photos/400/200?random=203', color: 'from-blue-500 to-cyan-600' },
];

interface FilterSectionProps {
    title: string;
    isOpen: boolean;
    onToggle: () => void;
    children: React.ReactNode;
}

const FilterSection: React.FC<FilterSectionProps> = ({ title, isOpen, onToggle, children }) => (
    <div className="border-b border-white/10 pb-4 mb-4 last:border-0 overflow-hidden">
        <button 
            onClick={onToggle}
            className="flex justify-between items-center w-full text-gray-200 font-bold text-sm mb-3 hover:text-cyber-cyan transition-colors group"
        >
            <span className="group-hover:translate-x-1 transition-transform">{title}</span>
            <div className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
                 {isOpen ? <ChevronUp size={14} className="text-cyber-cyan" /> : <ChevronDown size={14} />}
            </div>
        </button>
        <div className={`space-y-2 transition-all duration-300 ease-in-out origin-top ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
            {children}
        </div>
    </div>
);

interface CheckboxProps {
    label: string;
    count?: number;
    checked?: boolean;
    onChange?: () => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, count, checked, onChange }) => (
    <label className="flex items-center gap-3 cursor-pointer group select-none py-1">
        <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all duration-200 shadow-sm ${checked ? 'bg-cyber-cyan border-cyber-cyan scale-110' : 'bg-transparent border-gray-600 group-hover:border-cyber-cyan'}`}>
            {checked && <Check size={10} className="text-black animate-scale-in" />}
        </div>
        <input type="checkbox" className="hidden" checked={checked} onChange={onChange} />
        <span className={`text-sm transition-colors ${checked ? 'text-white font-bold' : 'text-gray-400 group-hover:text-white'}`}>{label}</span>
        {count && <span className="ml-auto text-xs text-gray-500 bg-white/5 px-1.5 py-0.5 rounded-full">{count}</span>}
    </label>
);

export const Marketplace = () => {
  const { assets, addToCart, searchQuery, setSearchQuery, setView, language, addToast } = useStore();
  const [showFilters, setShowFilters] = useState(true); 
  const t = translations[language].market;
  
  // Interactive States
  const [sortOption, setSortOption] = useState('relevance');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; 
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  
  // Price Slider State
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100);

  // Filter UI Toggles
  const [openSections, setOpenSections] = useState({
      category: true,
      price: true,
      format: true,
      poly: false
  });

  const toggleSection = (key: keyof typeof openSections) => {
      setOpenSections(prev => ({...prev, [key]: !prev[key]}));
  };

  const handleFilterChange = (filter: string) => {
      setActiveFilters(prev => 
          prev.includes(filter) ? prev.filter(f => f !== filter) : [...prev, filter]
      );
      setCurrentPage(1); 
  };

  const handleCollectionClick = (category: string) => {
      setActiveFilters([category]);
      addToast(`To'plam bo'yicha filtrlandi: ${category}`, 'info');
      // Scroll to grid
      window.scrollTo({ top: 600, behavior: 'smooth' });
  };

  // Processing Data (Filter -> Search -> Sort -> Paginate)
  const processedAssets = useMemo(() => {
      // 1. Only show ACTIVE assets
      let result = assets.filter(a => a.status === 'active');

      if (searchQuery) {
          result = result.filter(asset => 
            asset.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
            asset.author.toLowerCase().includes(searchQuery.toLowerCase())
          );
      }

      if (activeFilters.length > 0) {
          result = result.filter(asset => activeFilters.includes(asset.category));
      }

      // Price Filter
      result = result.filter(asset => {
          const p = asset.discountPrice || asset.price;
          return p >= minPrice && p <= maxPrice;
      });

      switch(sortOption) {
          case 'priceLow':
              result.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price));
              break;
          case 'rating':
              result.sort((a, b) => b.rating - a.rating);
              break;
          case 'newest':
              result.sort((a, b) => new Date(b.uploadDate || '').getTime() - new Date(a.uploadDate || '').getTime());
              break;
          default:
              break;
      }

      return result;
  }, [assets, searchQuery, activeFilters, sortOption, minPrice, maxPrice]);

  const totalPages = Math.ceil(processedAssets.length / itemsPerPage);
  const paginatedAssets = processedAssets.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
  );

  const handlePageChange = (newPage: number) => {
      if (newPage >= 1 && newPage <= totalPages) {
          setCurrentPage(newPage);
          window.scrollTo({ top: 400, behavior: 'smooth' });
      }
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-[#050b14]">
      {/* Dynamic Hero Section */}
      <section className="relative h-[350px] flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-[#0f172a]">
             <div className="absolute inset-0 opacity-30 bg-gradient-to-br from-blue-600 via-indigo-900 to-purple-800 animate-pulse-slow"></div>
             <div className="absolute inset-0" style={{backgroundImage: 'radial-gradient(rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '40px 40px'}}></div>
             {/* Glowing Orbs */}
             <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-float"></div>
             <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-float" style={{animationDelay: '1s'}}></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-md mb-6 animate-fade-in-up">
              <Sparkles size={14} className="text-yellow-400" />
              <span className="text-xs font-bold text-white tracking-wider uppercase">Keyingi Avlod Assetlari</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 leading-tight drop-shadow-2xl animate-fade-in-up" style={{animationDelay: '0.1s'}}>
            {t.heroTitle}
          </h1>
          
          <div className="relative max-w-2xl mx-auto group animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative flex items-center bg-[#0a1220]/80 backdrop-blur-md rounded-xl p-2 shadow-2xl border border-white/10">
                <Search className="w-6 h-6 text-gray-400 ml-3 group-focus-within:text-cyber-cyan transition-colors" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t.searchPlaceholder}
                  className="w-full bg-transparent border-none focus:ring-0 text-white px-4 py-3 focus:outline-none text-lg placeholder-gray-500 font-medium"
                />
                <button className="bg-cyber-cyan text-black px-6 py-2 rounded-lg font-bold hover:bg-white transition-colors">
                    Qidirish
                </button>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Collections */}
      <section className="bg-[#050b14] py-12 border-b border-white/5 relative z-20 -mt-8 rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
          <div className="container mx-auto px-6">
              <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-display font-bold text-white flex items-center gap-2">
                      <LayoutGrid size={24} className="text-cyber-cyan" /> {t.collections}
                  </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {COLLECTIONS.map((col, idx) => (
                      <div 
                        key={col.id} 
                        onClick={() => handleCollectionClick(col.filter)} 
                        className="group relative h-48 rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-white/5"
                        style={{animationDelay: `${idx * 100}ms`}}
                      >
                          <img 
                            src={col.image} 
                            alt={col.title} 
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" 
                          />
                          <div className={`absolute inset-0 bg-gradient-to-t ${col.color} opacity-60 mix-blend-multiply transition-opacity`}></div>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6">
                              <h3 className="text-xl font-bold text-white mb-1 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">{col.title}</h3>
                              <p className="text-sm text-gray-300 font-bold flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 delay-75">
                                  {col.items} premium assetlar <ArrowRight size={14} />
                              </p>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      </section>

      {/* Main Content */}
      <section className="flex-1 bg-[#050b14] py-12">
        <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row gap-8">
                
                {/* ADVANCED SIDEBAR FILTERS */}
                <aside className={`w-full lg:w-72 flex-shrink-0 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                    <div className="bg-[#0a1220] border border-white/10 rounded-2xl p-6 sticky top-24 shadow-2xl backdrop-blur-xl">
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="text-white font-display font-bold text-xl flex items-center gap-2">
                                <Filter size={20} className="text-gray-400" /> {t.filters}
                            </h3>
                            <button 
                                onClick={() => { setActiveFilters([]); setSearchQuery(''); setMinPrice(0); setMaxPrice(100); }}
                                className="text-xs font-bold text-cyber-cyan hover:text-white transition-colors uppercase tracking-wider"
                            >
                                {t.reset}
                            </button>
                        </div>

                        <FilterSection title={t.category} isOpen={openSections.category} onToggle={() => toggleSection('category')}>
                            {['Character', 'Vehicle', 'Environment', 'Weapon', 'Prop'].map(c => (
                                <Checkbox 
                                    key={c} 
                                    label={c} 
                                    count={assets.filter(a => a.category === c && a.status === 'active').length}
                                    checked={activeFilters.includes(c)}
                                    onChange={() => handleFilterChange(c)}
                                />
                            ))}
                        </FilterSection>

                        <FilterSection title={t.priceRange} isOpen={openSections.price} onToggle={() => toggleSection('price')}>
                             <div className="px-2 mb-6 mt-2">
                                 {/* Custom Range Slider Logic */}
                                 <div className="relative h-12">
                                     <input 
                                        type="range" 
                                        min="0" max="200" 
                                        value={minPrice} 
                                        onChange={(e) => {
                                            const val = Math.min(Number(e.target.value), maxPrice - 10);
                                            setMinPrice(val);
                                        }}
                                        className="absolute w-full z-20 opacity-0 cursor-pointer h-2 bg-transparent"
                                     />
                                     <input 
                                        type="range" 
                                        min="0" max="200" 
                                        value={maxPrice} 
                                        onChange={(e) => {
                                            const val = Math.max(Number(e.target.value), minPrice + 10);
                                            setMaxPrice(val);
                                        }}
                                        className="absolute w-full z-20 opacity-0 cursor-pointer h-2 bg-transparent"
                                     />
                                     
                                     {/* Visual Track */}
                                     <div className="relative w-full h-1.5 bg-gray-700 rounded-full mt-1">
                                         <div 
                                            className="absolute h-full bg-cyber-cyan rounded-full"
                                            style={{ left: `${(minPrice/200)*100}%`, right: `${100 - (maxPrice/200)*100}%` }}
                                         ></div>
                                         <div className="absolute w-4 h-4 bg-[#0a1220] border-2 border-cyber-cyan rounded-full -top-1.5 shadow-[0_0_10px_rgba(0,240,255,0.5)]" style={{ left: `${(minPrice/200)*100}%`, transform: 'translateX(-50%)' }}></div>
                                         <div className="absolute w-4 h-4 bg-[#0a1220] border-2 border-cyber-cyan rounded-full -top-1.5 shadow-[0_0_10px_rgba(0,240,255,0.5)]" style={{ left: `${(maxPrice/200)*100}%`, transform: 'translateX(-50%)' }}></div>
                                     </div>
                                 </div>

                                 <div className="flex justify-between text-xs text-gray-300 mt-2 font-mono font-bold">
                                     <span>${minPrice}</span>
                                     <span>${maxPrice}+</span>
                                 </div>
                             </div>
                             <div className="space-y-1">
                                <Checkbox label="Bepul Assetlar" count={assets.filter(a => a.price === 0).length} checked={maxPrice === 0} onChange={() => { setMinPrice(0); setMaxPrice(0); }} />
                             </div>
                        </FilterSection>

                        <FilterSection title={t.fileFormats} isOpen={openSections.format} onToggle={() => toggleSection('format')}>
                             {['.blend', '.fbx', '.obj', '.uasset', '.unitypackage'].map(f => (
                                <Checkbox key={f} label={f} />
                            ))}
                        </FilterSection>
                    </div>
                </aside>

                {/* PRODUCT GRID */}
                <div className="flex-1">
                    {/* Toolbar */}
                    <div className="flex flex-wrap justify-between items-center mb-8 bg-[#0a1220] p-4 rounded-2xl border border-white/10 shadow-lg">
                        <p className="text-gray-400 text-sm font-medium pl-2">
                            <span className="text-white font-bold text-lg">{processedAssets.length}</span> {t.resultsFound}
                        </p>
                        
                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-3">
                                <span className="text-xs text-gray-500 uppercase font-bold tracking-wider">{t.sortBy}</span>
                                <div className="relative group">
                                    <select 
                                        value={sortOption}
                                        onChange={(e) => setSortOption(e.target.value)}
                                        className="bg-[#050b14] border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-cyber-cyan cursor-pointer font-bold appearance-none pr-8 hover:bg-white/5 transition-colors"
                                    >
                                        <option value="relevance">{t.sort.relevance}</option>
                                        <option value="newest">{t.sort.newest}</option>
                                        <option value="rating">{t.sort.rating}</option>
                                        <option value="priceLow">{t.sort.priceLow}</option>
                                    </select>
                                    <ChevronDown className="absolute right-2 top-2.5 text-gray-400 pointer-events-none w-4 h-4 group-hover:text-cyber-cyan transition-colors" />
                                </div>
                            </div>
                            <div className="flex bg-[#050b14] rounded-lg p-1 border border-white/10">
                                <button className="p-2 text-cyber-cyan bg-white/10 rounded-md shadow-sm transition-all"><LayoutGrid size={18} /></button>
                                <button className="p-2 text-gray-500 hover:text-gray-300 transition-all"><List size={18} /></button>
                            </div>
                        </div>
                    </div>

                    {/* Grid */}
                    {paginatedAssets.length === 0 ? (
                        <div className="text-center py-32 bg-[#0a1220] rounded-3xl border border-dashed border-white/10 animate-fade-in">
                            <div className="bg-white/5 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Ghost className="w-10 h-10 text-gray-500" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">{t.noResults}</h3>
                            <p className="text-gray-500 mb-6">Filtrlarni o'zgartirib qayta urinib ko'ring.</p>
                            <button onClick={() => { setActiveFilters([]); setSearchQuery(''); setMinPrice(0); setMaxPrice(200); }} className="text-cyber-cyan font-bold hover:underline">Filtrlarni Tozalash</button>
                        </div>
                    ) : (
                        <div key={currentPage} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 perspective-1000 min-h-[600px]">
                            {paginatedAssets.map((asset, index) => (
                                <div 
                                    key={asset.id} 
                                    className="group relative bg-[#0a1220] rounded-2xl overflow-hidden border border-white/10 hover:border-cyber-cyan/50 shadow-lg hover:shadow-[0_0_30px_-10px_rgba(37,99,235,0.3)] transition-all duration-500 hover:-translate-y-2 cursor-pointer flex flex-col animate-fade-in-up backface-hidden"
                                    style={{ animationDelay: `${index * 100}ms` }}
                                    onClick={() => setView('product', asset.id)}
                                >
                                    {/* Image Container */}
                                    <div className="aspect-[4/3] overflow-hidden relative bg-[#050b14]">
                                        <img 
                                            src={asset.image} 
                                            alt={asset.title} 
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        
                                        {/* Overlay Gradient */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                        {/* Badges */}
                                        <div className="absolute top-3 left-3 flex gap-2">
                                            <Tooltip content={asset.category} position="right">
                                            <div className="bg-[#0a1220]/90 backdrop-blur-md p-2 rounded-lg border border-white/10 text-gray-300 shadow-sm">
                                                {asset.category === 'Character' && <UserIcon size={16} />}
                                                {asset.category === 'Vehicle' && <Truck size={16} />}
                                                {asset.category === 'Environment' && <Box size={16} />}
                                                {asset.category === 'Weapon' && <Zap size={16} />}
                                            </div>
                                            </Tooltip>
                                            {asset.discountPrice && (
                                                <div className="bg-red-500 text-white text-[10px] font-bold px-2 py-1.5 rounded-lg shadow-sm flex items-center">
                                                    SALE
                                                </div>
                                            )}
                                        </div>

                                        {/* Quick Actions (Slide Up Animation) */}
                                        <div className="absolute bottom-4 left-4 right-4 flex gap-3 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out delay-75">
                                            <button 
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    addToCart(asset);
                                                }}
                                                className="flex-1 bg-cyber-cyan text-black py-3 rounded-xl font-bold text-sm shadow-[0_0_15px_rgba(0,240,255,0.4)] hover:bg-white transition-colors flex items-center justify-center gap-2"
                                            >
                                                <Download size={16} /> {t.addToCart}
                                            </button>
                                            <button 
                                                className="bg-[#0a1220] text-white p-3 rounded-xl hover:bg-white/10 transition-colors border border-white/20"
                                                title={t.quickLook}
                                            >
                                                <Eye size={18} />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Details */}
                                    <div className="p-5 flex-1 flex flex-col relative">
                                        {/* Cyber Corner Decoration */}
                                        <div className="absolute top-0 right-0 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                            <div className="absolute top-2 right-2 w-2 h-2 border-t-2 border-r-2 border-cyber-cyan"></div>
                                        </div>

                                        <div className="mb-3">
                                            <h3 className="text-lg font-bold text-white truncate group-hover:text-cyber-cyan transition-colors mb-1 font-display">
                                                {asset.title}
                                            </h3>
                                            <p 
                                                className="text-xs text-gray-400 hover:text-white cursor-pointer transition-colors flex items-center gap-1"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setView('seller', asset.author);
                                                }}
                                            >
                                                by <span className="font-bold text-gray-300 underline decoration-gray-600 underline-offset-2 hover:decoration-white">{asset.author}</span>
                                            </p>
                                        </div>

                                        {/* Tech Specs Line */}
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            <span className="text-[10px] font-mono bg-white/5 text-gray-400 px-2 py-1 rounded border border-white/10 font-bold">
                                                FBX / OBJ
                                            </span>
                                            {asset.polygons && (
                                                <span className="text-[10px] font-mono bg-white/5 text-gray-400 px-2 py-1 rounded border border-white/10">
                                                    {asset.polygons} Poly
                                                </span>
                                            )}
                                        </div>

                                        <div className="mt-auto flex justify-between items-center pt-4 border-t border-white/10 group-hover:border-white/20 transition-colors">
                                             <div className="flex items-center gap-1 text-cyber-green text-xs font-bold bg-yellow-500/10 px-2 py-1 rounded-full border border-yellow-500/20">
                                                <Star size={12} fill="currentColor" />
                                                <span>{asset.rating}</span>
                                                <span className="text-gray-500 font-normal ml-1">(12)</span>
                                            </div>
                                            <div className="flex flex-col items-end">
                                                {asset.discountPrice ? (
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-xs text-gray-500 line-through">${asset.price}</span>
                                                        <span className="text-xl font-display font-bold text-green-500">${asset.discountPrice}</span>
                                                    </div>
                                                ) : (
                                                    <span className="text-xl font-display font-bold text-white">${asset.price}</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    
                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="mt-16 flex justify-center items-center gap-2 animate-fade-in">
                            <button 
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="px-5 py-2.5 rounded-lg bg-[#0a1220] text-gray-400 hover:text-white border border-white/10 hover:border-white/30 transition-all text-sm font-bold shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                <ArrowRight className="rotate-180" size={14} /> {t.prev}
                            </button>
                            
                            {[...Array(totalPages)].map((_, i) => (
                                <button 
                                    key={i}
                                    onClick={() => handlePageChange(i + 1)}
                                    className={`w-10 h-10 rounded-lg font-bold text-sm transition-all transform hover:scale-105 ${
                                        currentPage === i + 1 
                                        ? 'bg-cyber-cyan text-black shadow-[0_0_10px_rgba(0,240,255,0.4)]' 
                                        : 'bg-[#0a1220] text-gray-400 hover:text-white hover:bg-white/5 border border-white/10'
                                    }`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                            
                            <button 
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="px-5 py-2.5 rounded-lg bg-[#0a1220] text-gray-400 hover:text-white border border-white/10 hover:border-white/30 transition-all text-sm font-bold shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                {t.next} <ArrowRight size={14} />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
      </section>
    </div>
  );
};

// Helper icon
const UserIcon = ({ size }: { size: number }) => <User size={size} />;
