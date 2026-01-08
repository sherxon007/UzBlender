
import React, { useState } from 'react';
import { X, Trash2, CreditCard, ShoppingBag, Loader2, Wallet, ArrowRight, ShieldCheck, Lock } from 'lucide-react';
import { useStore } from '../store';
import { Tooltip } from './Tooltip';

export const CartDrawer = () => {
  const { isCartOpen, toggleCart, toggleWallet, cart, removeFromCart, purchaseItems, addToast, user, openAuth } = useStore();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const total = cart.reduce((sum, item) => sum + (item.discountPrice || item.price), 0);

  const handleCheckout = () => {
    if (!user) {
        toggleCart(false);
        addToast('Sotib olish uchun tizimga kiring.', 'info');
        openAuth('login');
        return;
    }

    // Check Wallet Connection
    if (!user.isTelegramLinked) {
        toggleCart(false);
        toggleWallet(true);
        addToast('To\'lov qilish uchun hamyonni ulang.', 'info');
        return;
    }

    setIsCheckingOut(true);
    
    // Simulate Processing time then trigger store action
    setTimeout(() => {
        purchaseItems(); 
        
        // Slight delay to check if cart was cleared (success)
        if (useStore.getState().cart.length === 0) {
             toggleCart(false);
        }
        setIsCheckingOut(false);
    }, 1500);
  };

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={() => !isCheckingOut && toggleCart(false)}
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-md h-full bg-[#0a1220] shadow-[-10px_0_30px_rgba(0,0,0,0.5)] border-l border-white/10 flex flex-col transform transition-transform duration-300 animate-slide-in-right">
        
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-[#0a1220] sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="bg-blue-500/20 p-2 rounded-lg text-blue-400">
                <ShoppingBag size={20} />
            </div>
            <h2 className="text-xl font-display font-bold text-white">Savat <span className="text-gray-500 text-sm ml-2 font-normal">({cart.length} ta)</span></h2>
          </div>
          <button 
            onClick={() => toggleCart(false)} 
            className="text-gray-400 hover:text-white transition-colors disabled:opacity-50 hover:bg-white/5 p-2 rounded-full"
            disabled={isCheckingOut}
          >
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#050b14]">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-500 space-y-4">
              <ShoppingBag size={48} className="opacity-20" />
              <p>Savatingiz bo'sh.</p>
              <button 
                onClick={() => toggleCart(false)}
                className="text-cyber-cyan hover:underline font-bold"
              >
                Marketga O'tish
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex gap-4 p-3 rounded-xl bg-[#0a1220] border border-white/10 shadow-sm hover:border-cyber-cyan/50 transition-all group">
                <div className="w-20 h-20 bg-black rounded-lg overflow-hidden shrink-0 border border-white/5">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-white text-sm line-clamp-1">{item.title}</h4>
                    <p className="text-xs text-gray-400">{item.category}</p>
                  </div>
                  <div className="flex justify-between items-end">
                    <span className="text-cyber-green font-mono font-bold">
                        {item.discountPrice || item.price} UZC
                    </span>
                    <Tooltip content="O'chirish" position="left">
                        <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-gray-500 hover:text-red-500 transition-colors disabled:opacity-50 p-1 hover:bg-white/5 rounded"
                            disabled={isCheckingOut}
                        >
                            <Trash2 size={16} />
                        </button>
                    </Tooltip>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
            <div className="p-6 border-t border-white/10 bg-[#0a1220] shadow-[0_-5px_20px_rgba(0,0,0,0.2)]">
                {/* ESCROW BADGE - TRUST BUILDER */}
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3 mb-4 flex items-start gap-3">
                    <div className="bg-yellow-500/20 p-1 rounded-full text-yellow-500 mt-0.5">
                        <Lock size={12} />
                    </div>
                    <div>
                        <h4 className="text-xs font-bold text-yellow-500 uppercase">UzBlender Kafolati (Escrow)</h4>
                        <p className="text-[10px] text-gray-400 leading-tight mt-1">
                            Sizning mablag'ingiz faylni yuklab olguningizcha xavfsiz saqlanadi.
                        </p>
                    </div>
                </div>

                <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-400 uppercase tracking-wider text-xs font-bold">Jami Qiymat</span>
                    <span className="text-2xl font-bold text-white font-display">{total.toFixed(2)} UZC</span>
                </div>
                
                {/* Wallet Status Preview */}
                {user && (
                    <div className="mb-4 flex justify-between items-center text-xs px-1">
                        <span className="text-gray-500">Mavjud Balans:</span>
                        <span className={`font-mono font-bold ${user.balance >= total ? 'text-green-400' : 'text-red-500'}`}>
                            {user.balance.toFixed(2)} UZC
                        </span>
                    </div>
                )}

                <button 
                    onClick={handleCheckout}
                    disabled={isCheckingOut}
                    className={`w-full font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg ${
                        user && user.balance < total 
                        ? 'bg-red-500/10 text-red-500 border border-red-500/30 hover:bg-red-500/20' 
                        : 'bg-gradient-to-r from-blue-600 to-cyber-cyan text-white shadow-neon-cyan hover:shadow-[0_0_25px_rgba(37,99,235,0.6)]'
                    } disabled:opacity-70 disabled:cursor-not-allowed`}
                >
                    {isCheckingOut ? (
                        <>
                            <Loader2 size={20} className="animate-spin" />
                            Mablag' Yechilmoqda...
                        </>
                    ) : (
                        user && user.balance < total ? (
                            <>
                                Mablag' Yetarli Emas (To'ldirish)
                            </>
                        ) : (
                            <>
                                <Wallet size={20} />
                                Xavfsiz To'lov
                            </>
                        )
                    )}
                </button>
                <p className="text-center text-[10px] text-gray-500 mt-3 flex items-center justify-center gap-1">
                    <ShieldCheck size={10} /> UzWallet orqali 100% Himoyalangan
                </p>
            </div>
        )}
      </div>
    </div>
  );
};
