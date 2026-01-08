
import React, { useState, useRef } from 'react';
import { X, Upload, Box, DollarSign, FileText, CheckCircle, AlertCircle, Image as ImageIcon, Cpu } from 'lucide-react';
import { useStore } from '../../store';

interface UploadAssetModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const UploadAssetModal = ({ isOpen, onClose }: UploadAssetModalProps) => {
    const { addToast, uploadAsset, user } = useStore();
    const [step, setStep] = useState(1);
    const [isDragging, setIsDragging] = useState(false);
    
    // Form States
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('Character');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [files, setFiles] = useState<File[]>([]);

    if (!isOpen) return null;

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        // Mock file handling
        const droppedFiles = Array.from(e.dataTransfer.files);
        setFiles([...files, ...droppedFiles]);
        addToast(`${droppedFiles.length} fayl qabul qilindi.`, 'info');
    };

    const handleNext = () => {
        if (step === 1 && !title) return addToast('Iltimos, sarlavha kiriting', 'error');
        if (step === 2 && files.length === 0) return addToast('Iltimos, kamida bitta fayl yuklang', 'error');
        setStep(step + 1);
    };

    const handleSubmit = async () => {
        if (!user) return;
        
        await uploadAsset({
            title,
            category: category as any,
            price: parseFloat(price) || 0,
            description,
            formats: files.map(f => `.${f.name.split('.').pop() || 'unknown'}`),
        });

        addToast('Asset ko\'rib chiqishga yuborildi!', 'success');
        onClose();
        // Reset
        setStep(1);
        setTitle('');
        setFiles([]);
        setPrice('');
        setDescription('');
    };

    return (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={onClose} />
            
            <div className="relative w-full max-w-2xl bg-[#0a1220] border border-white/10 rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-fade-in-up">
                
                {/* Header */}
                <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
                    <div>
                        <h2 className="text-xl font-display font-bold text-white">Yangi Asset Yuklash</h2>
                        <p className="text-xs text-gray-400 font-mono">QADAM {step} / 3</p>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-white"><X /></button>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-1 bg-[#050b14]">
                    <div 
                        className="h-full bg-cyber-green transition-all duration-300" 
                        style={{ width: `${(step / 3) * 100}%` }}
                    />
                </div>

                {/* Content */}
                <div className="p-8 overflow-y-auto custom-scrollbar">
                    {step === 1 && (
                        <div className="space-y-6 animate-fade-in">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-300">Asset Sarlavhasi</label>
                                <input 
                                    type="text" 
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Masalan: Sci-Fi Mecha Warrior V2" 
                                    className="w-full bg-[#050b14] border border-white/10 rounded-lg p-3 text-white focus:border-cyber-cyan focus:outline-none"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-300">Kategoriya</label>
                                    <select 
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        className="w-full bg-[#050b14] border border-white/10 rounded-lg p-3 text-white focus:border-cyber-cyan focus:outline-none appearance-none"
                                    >
                                        <option>Character</option>
                                        <option>Vehicle</option>
                                        <option>Environment</option>
                                        <option>Weapon</option>
                                        <option>Prop</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-300">Dastur</label>
                                    <select className="w-full bg-[#050b14] border border-white/10 rounded-lg p-3 text-white focus:border-cyber-cyan focus:outline-none appearance-none">
                                        <option>Blender</option>
                                        <option>Maya</option>
                                        <option>3ds Max</option>
                                        <option>ZBrush</option>
                                    </select>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-300">Tavsif</label>
                                <textarea 
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    rows={4}
                                    placeholder="Asset haqida, poligonlar soni, teksturalar..." 
                                    className="w-full bg-[#050b14] border border-white/10 rounded-lg p-3 text-white focus:border-cyber-cyan focus:outline-none resize-none"
                                />
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-6 animate-fade-in">
                            <div 
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                                className={`border-2 border-dashed rounded-xl p-10 text-center transition-all ${
                                    isDragging ? 'border-cyber-cyan bg-cyber-cyan/10' : 'border-white/10 hover:border-white/30 bg-[#050b14]'
                                }`}
                            >
                                <Upload className={`w-12 h-12 mx-auto mb-4 ${isDragging ? 'text-cyber-cyan' : 'text-gray-500'}`} />
                                <h3 className="text-white font-bold mb-2">Fayllarni shu yerga tashlang</h3>
                                <p className="text-sm text-gray-500 mb-6">Qo'llab-quvvatlanadi: .blend, .fbx, .obj, .zip (Max 2GB)</p>
                                <button className="bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-lg text-sm font-bold transition-colors">
                                    Fayllarni Tanlash
                                </button>
                            </div>

                            {files.length > 0 && (
                                <div className="bg-[#050b14] rounded-lg border border-white/10 p-4">
                                    <h4 className="text-xs text-gray-500 uppercase font-bold mb-3">Yuklangan Fayllar</h4>
                                    <div className="space-y-2">
                                        {files.map((f, i) => (
                                            <div key={i} className="flex items-center justify-between bg-white/5 p-2 rounded border border-white/5">
                                                <div className="flex items-center gap-2">
                                                    <FileText size={16} className="text-cyber-cyan" />
                                                    <span className="text-sm text-white truncate max-w-[200px]">{f.name}</span>
                                                </div>
                                                <button onClick={() => setFiles(files.filter((_, idx) => idx !== i))} className="text-gray-500 hover:text-red-500">
                                                    <X size={16} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {step === 3 && (
                        <div className="space-y-6 animate-fade-in">
                            <div className="bg-cyber-green/10 border border-cyber-green/30 p-4 rounded-xl flex items-start gap-3">
                                <DollarSign className="text-cyber-green shrink-0 mt-1" />
                                <div>
                                    <h3 className="text-white font-bold">Narx Siyosati</h3>
                                    <p className="text-sm text-gray-400 mt-1">UzBlender har bir savdodan 30% komissiya oladi. Siz 70% daromad olasiz.</p>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-300">Narxni Belgilang (UZC)</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-3 text-gray-500 font-bold">$</span>
                                    <input 
                                        type="number" 
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                        placeholder="0.00" 
                                        className="w-full bg-[#050b14] border border-white/10 rounded-lg p-3 pl-8 text-white focus:border-cyber-green focus:outline-none font-mono text-lg"
                                    />
                                </div>
                                <div className="flex gap-4 mt-2">
                                    <label className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer">
                                        <input type="checkbox" className="rounded bg-gray-800 border-gray-600" />
                                        Bepul qilish
                                    </label>
                                    <label className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer">
                                        <input type="checkbox" className="rounded bg-gray-800 border-gray-600" />
                                        Chegirma qo'shish
                                    </label>
                                </div>
                            </div>

                            <div className="bg-[#050b14] p-4 rounded-lg border border-white/10">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-gray-400 text-sm">Sotuv Narxi</span>
                                    <span className="text-white font-mono">${price || '0'}</span>
                                </div>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-gray-400 text-sm">Platforma Komissiyasi (30%)</span>
                                    <span className="text-red-400 font-mono">-${((Number(price) || 0) * 0.3).toFixed(2)}</span>
                                </div>
                                <div className="border-t border-white/10 pt-2 flex justify-between items-center">
                                    <span className="text-white font-bold text-sm">Taxminiy Daromad</span>
                                    <span className="text-cyber-green font-bold font-mono text-lg">${((Number(price) || 0) * 0.7).toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer Actions */}
                <div className="p-6 border-t border-white/10 bg-[#020408] flex justify-between items-center">
                    {step > 1 ? (
                         <button 
                            onClick={() => setStep(step - 1)}
                            className="text-gray-400 hover:text-white font-bold text-sm"
                        >
                            Orqaga
                        </button>
                    ) : (
                        <div></div>
                    )}
                   
                    <button 
                        onClick={step === 3 ? handleSubmit : handleNext}
                        className="bg-gradient-to-r from-cyber-cyan to-blue-600 text-black font-bold px-8 py-3 rounded-lg hover:shadow-neon-cyan transition-all"
                    >
                        {step === 3 ? 'Chop Etish' : 'Keyingi'}
                    </button>
                </div>

            </div>
        </div>
    );
};
