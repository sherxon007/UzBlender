
import React, { useState } from 'react';
import { useStore } from '../../store';
import { X, Smartphone, RefreshCw, Copy, CheckCircle, Wallet, ArrowRight, Lock, ShieldCheck, CreditCard, Plus, ArrowDownLeft, ArrowUpRight, Clock } from 'lucide-react';
import { Tooltip } from '../Tooltip';

export const WalletModal = () => {
    const { isWalletOpen, toggleWallet, user, connectTelegramWallet, refreshWalletBalance, addToast, topUpWallet } = useStore();
    const [isConnecting, setIsConnecting] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [activeTab, setActiveTab] = useState<'balance' | 'topup'>('balance');

    if (!isWalletOpen || !user) return null;

    const handleConnect = () => {
        setIsConnecting(true);
        connectTelegramWallet();
        setTimeout(() => setIsConnecting(false), 2000);
    };

    const handleRefresh = () => {
        setIsRefreshing(true);
        refreshWalletBalance();
        setTimeout(() => setIsRefreshing(false), 1500);
    };

    const handleTopUp = (provider: string, amount: number) => {
        addToast(`${provider} orqali to'lovga yo'naltirilmoqda...`, 'info');
        // Simulate processing
        setTimeout(() => {
            topUpWallet(amount, provider);
            addToast(`Muvaffaqiyatli! ${amount} UZC ${provider} orqali qo'shildi.`, 'success');
            setActiveTab('balance');
        }, 2000);
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div 
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                onClick={() => toggleWallet(false)}
            />

            <div className="relative w-full max-w-md bg-white rounded-2xl overflow-hidden shadow-2xl animate-fade-in-up flex flex-col max-h-[85vh]">
                {/* Header */}
                <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/30">
                            <Wallet className="w-5 h-5" />
                        </div>
                        <div>
                            <h2 className="text-xl font-display font-bold text-slate-900">UzWallet</h2>
                            <div className="flex items-center gap-1">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                <p className="text-[10px] text-slate-500 font-mono tracking-wider uppercase">Xavfsiz To'lovlar</p>
                            </div>
                        </div>
                    </div>
                    <button onClick={() => toggleWallet(false)} className="text-slate-400 hover:text-slate-900 transition-colors bg-slate-50 p-2 rounded-full hover:bg-slate-100">
                        <X size={20} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto bg-slate-50">
                    {!user.isTelegramLinked ? (
                        // NOT CONNECTED STATE
                        <div className="p-8 text-center">
                            <div className="w-32 h-32 mx-auto bg-white p-2 rounded-xl mb-6 shadow-sm border border-slate-200">
                                {/* Mock QR Code */}
                                <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://t.me/UzBlenderBot?start=link_12345" alt="Connect Telegram" className="w-full h-full opacity-80" />
                            </div>
                            
                            <h3 className="text-lg font-bold text-slate-900 mb-2">Identifikatsiya</h3>
                            <p className="text-sm text-slate-500 mb-6 px-4 leading-relaxed">
                                **UzWallet** hamyoningizni yaratish uchun Telegramingizni ulang. Bu firibgarlikni oldini olish uchun zarur.
                            </p>

                            <button 
                                onClick={handleConnect}
                                disabled={isConnecting}
                                className="w-full bg-[#229ED9] hover:bg-[#1a85b8] text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-400/20"
                            >
                                {isConnecting ? (
                                    <>
                                        <RefreshCw className="animate-spin" size={20} /> Ulanmoqda...
                                    </>
                                ) : (
                                    <>
                                        <Smartphone size={20} /> Telegram orqali kirish
                                    </>
                                )}
                            </button>
                        </div>
                    ) : (
                        // CONNECTED STATE
                        <div className="p-6">
                            {/* Available Balance Card */}
                            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 text-center mb-6 relative overflow-hidden shadow-xl shadow-blue-500/20 text-white">
                                <div className="absolute top-0 right-0 p-4 opacity-10">
                                    <Wallet size={100} />
                                </div>
                                <div className="relative z-10">
                                    <p className="text-blue-100 text-xs font-mono mb-2 uppercase tracking-widest opacity-80">Jami Balans</p>
                                    <h1 className="text-4xl font-display font-bold mb-4">
                                        {user.balance.toFixed(2)} <span className="text-lg opacity-80 font-sans">UZC</span>
                                    </h1>
                                    
                                    <div className="flex gap-3 justify-center">
                                        <button 
                                            onClick={() => setActiveTab('topup')}
                                            className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-xs font-bold transition-all backdrop-blur-sm"
                                        >
                                            <Plus size={14} /> To'ldirish
                                        </button>
                                        <button 
                                            onClick={handleRefresh}
                                            className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-xs font-bold transition-all backdrop-blur-sm"
                                        >
                                            <RefreshCw size={14} className={isRefreshing ? 'animate-spin' : ''} /> Yangilash
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {activeTab === 'balance' && (
                                <div className="space-y-6 animate-fade-in">
                                    {/* Escrow Status */}
                                    {user.balanceLocked > 0 && (
                                        <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-4 flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="bg-yellow-100 p-2 rounded-full text-yellow-600">
                                                    <Lock size={18} />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-yellow-700 font-bold uppercase">Muzlatilgan (Escrow)</p>
                                                    <p className="text-[10px] text-yellow-600">Mahsulot qabul qilingach yechiladi</p>
                                                </div>
                                            </div>
                                            <span className="font-mono text-slate-800 font-bold">{user.balanceLocked.toFixed(2)} UZC</span>
                                        </div>
                                    )}

                                    {/* History */}
                                    <div>
                                        <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                                            Tranzaksiyalar Tarixi
                                        </h3>
                                        <div className="space-y-3 max-h-48 overflow-y-auto">
                                            {(user.transactions && user.transactions.length > 0) ? (
                                                user.transactions.map((txn) => (
                                                    <div key={txn.id} className="flex items-center justify-between p-3 bg-white border border-slate-100 rounded-xl hover:shadow-md transition-all">
                                                        <div className="flex items-center gap-3">
                                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${txn.type === 'deposit' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                                                                {txn.type === 'deposit' ? <ArrowDownLeft size={16} /> : <ArrowUpRight size={16} />}
                                                            </div>
                                                            <div>
                                                                <p className="text-xs font-bold text-slate-800">{txn.description}</p>
                                                                <p className="text-[10px] text-slate-400">{new Date(txn.date).toLocaleDateString()} • {new Date(txn.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                                                            </div>
                                                        </div>
                                                        <span className={`font-bold text-sm ${txn.type === 'deposit' ? 'text-green-600' : 'text-slate-800'}`}>
                                                            {txn.type === 'deposit' ? '+' : '-'}{txn.amount.toFixed(2)}
                                                        </span>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="text-center py-6 text-slate-400 text-xs">
                                                    <Clock size={24} className="mx-auto mb-2 opacity-50" />
                                                    Tranzaksiyalar topilmadi.
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Wallet ID */}
                                    <div className="bg-slate-100 rounded-lg p-3 flex items-center justify-between border border-slate-200 mt-4">
                                        <div className="text-left overflow-hidden">
                                            <p className="text-[10px] text-slate-500 uppercase font-bold">Hamyon ID</p>
                                            <p className="text-xs text-slate-700 font-mono truncate">{user.walletAddress || 'YANGILANMOQDA...'}</p>
                                        </div>
                                        <Tooltip content="Nusxalash">
                                            <button className="text-slate-400 hover:text-slate-900 transition-colors" onClick={() => navigator.clipboard.writeText(user.walletAddress || '')}>
                                                <Copy size={16} />
                                            </button>
                                        </Tooltip>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'topup' && (
                                <div className="space-y-4 animate-fade-in">
                                    <button 
                                        onClick={() => setActiveTab('balance')}
                                        className="text-xs text-slate-500 hover:text-blue-600 flex items-center gap-1 mb-2"
                                    >
                                        <ArrowRight size={12} className="rotate-180" /> Balansga qaytish
                                    </button>
                                    
                                    <h3 className="text-sm font-bold text-slate-900 mb-2">To'lov Usulini Tanlang</h3>
                                    <p className="text-xs text-slate-500 mb-4">Mablag' darhol hamyoningizga tushadi.</p>

                                    <button 
                                        onClick={() => handleTopUp('Payme', 100)}
                                        className="w-full bg-[#00CCCC]/10 hover:bg-[#00CCCC]/20 border border-[#00CCCC]/30 p-4 rounded-xl flex items-center justify-between group transition-all"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-[#00CCCC] rounded-lg flex items-center justify-center text-white font-bold text-xs shadow-md">
                                                payme
                                            </div>
                                            <div className="text-left">
                                                <p className="text-sm font-bold text-slate-800">Payme (+100 UZC)</p>
                                                <p className="text-[10px] text-slate-500">Tez va Xavfsiz</p>
                                            </div>
                                        </div>
                                        <ArrowRight size={16} className="text-[#00CCCC] opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1" />
                                    </button>

                                    <button 
                                        onClick={() => handleTopUp('Click', 50)}
                                        className="w-full bg-gradient-to-r from-blue-500/10 to-blue-600/10 hover:from-blue-500/20 hover:to-blue-600/20 border border-blue-200 p-4 rounded-xl flex items-center justify-between group transition-all"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-gradient-to-tr from-[#2376F6] to-[#0037a5] rounded-lg flex items-center justify-center text-white font-bold text-xs italic shadow-md">
                                                click
                                            </div>
                                            <div className="text-left">
                                                <p className="text-sm font-bold text-slate-800">Click (+50 UZC)</p>
                                                <p className="text-[10px] text-slate-500">Milliy To'lov Tizimi</p>
                                            </div>
                                        </div>
                                        <ArrowRight size={16} className="text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1" />
                                    </button>

                                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 mt-4 text-center">
                                        <p className="text-[10px] text-slate-500 flex items-center justify-center gap-1">
                                            <ShieldCheck size={12} /> To'lovlar UzCard/Humo orqali himoyalangan
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
