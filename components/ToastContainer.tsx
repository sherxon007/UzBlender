import React from 'react';
import { useStore } from '../store';
import { CheckCircle, Info, XCircle, X } from 'lucide-react';

export const ToastContainer = () => {
  const { toasts, removeToast } = useStore();

  return (
    <div className="fixed bottom-6 right-6 z-[200] flex flex-col gap-3 pointer-events-none">
      {toasts.map((toast) => (
        <div 
            key={toast.id}
            className="pointer-events-auto flex items-center gap-3 bg-[#0a1220]/90 backdrop-blur-md border border-white/10 p-4 rounded-lg shadow-2xl min-w-[300px] animate-slide-in-right relative overflow-hidden group"
        >
            {/* Status Line */}
            <div className={`absolute left-0 top-0 bottom-0 w-1 ${
                toast.type === 'success' ? 'bg-cyber-green' : 
                toast.type === 'error' ? 'bg-red-500' : 'bg-cyber-cyan'
            }`} />

            {/* Icon */}
            <div className={`${
                toast.type === 'success' ? 'text-cyber-green' : 
                toast.type === 'error' ? 'text-red-500' : 'text-cyber-cyan'
            }`}>
                {toast.type === 'success' && <CheckCircle size={20} />}
                {toast.type === 'info' && <Info size={20} />}
                {toast.type === 'error' && <XCircle size={20} />}
            </div>

            {/* Content */}
            <p className="text-white text-sm font-medium flex-1">{toast.message}</p>

            {/* Close */}
            <button 
                onClick={() => removeToast(toast.id)}
                className="text-gray-500 hover:text-white transition-colors"
            >
                <X size={16} />
            </button>
        </div>
      ))}
    </div>
  );
};