
import React from 'react';
import { Mail } from 'lucide-react';
import { Tooltip } from './Tooltip';
import { useStore } from '../store';

export const Footer = () => {
  const { setView, addToast } = useStore();

  const handleMarketplaceLink = (type: string) => {
    setView('marketplace');
    // Simulate filtering/sorting feedback
    switch(type) {
        case 'latest':
            addToast('Saralash: Eng so\'nggi', 'info');
            break;
        case 'top':
            addToast('Saralash: Eng yuqori reyting', 'info');
            break;
        case 'discount':
            addToast('Filtr: Chegirmalar', 'info');
            break;
        case 'free':
            addToast('Filtr: Bepul', 'info');
            break;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSupportLink = (page: string) => {
      setView('support', page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#020408] border-t border-white/5 pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <h2 className="text-2xl font-display font-bold text-white mb-4">
              UzBlender <span className="text-cyber-cyan">3D</span>
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              Futuristik va kiberpank uslubidagi 3D assetlar uchun O'zbekistondagi birinchi raqamli bozor. Metaolamni birgalikda quramiz.
            </p>
            <div className="flex items-center gap-2 text-xs text-gray-600 font-mono border border-gray-800 rounded p-2 inline-block">
                <span>HOLAT:</span>
                <span className="text-cyber-green animate-pulse">TIZIM ISHLAMOQDA</span>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-bold mb-6 tracking-wide text-sm">MARKET</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                  <button onClick={() => handleMarketplaceLink('latest')} className="hover:text-cyber-cyan transition-colors text-left">
                    Yangi Assetlar
                  </button>
              </li>
              <li>
                  <button onClick={() => handleMarketplaceLink('top')} className="hover:text-cyber-cyan transition-colors text-left">
                    Top Reyting
                  </button>
              </li>
              <li>
                  <button onClick={() => handleMarketplaceLink('discount')} className="hover:text-cyber-cyan transition-colors text-left">
                    Chegirmalar
                  </button>
              </li>
              <li>
                  <button onClick={() => handleMarketplaceLink('free')} className="hover:text-cyber-cyan transition-colors text-left">
                    Bepul Assetlar
                  </button>
              </li>
            </ul>
          </div>

          <div>
             <h3 className="text-white font-bold mb-6 tracking-wide text-sm">YORDAM</h3>
             <ul className="space-y-3 text-sm text-gray-400">
              <li>
                  <button onClick={() => handleSupportLink('help')} className="hover:text-cyber-cyan transition-colors text-left">
                    Yordam Markazi
                  </button>
              </li>
              <li>
                  <button onClick={() => handleSupportLink('licensing')} className="hover:text-cyber-cyan transition-colors text-left">
                    Litsenziya
                  </button>
              </li>
              <li>
                  <button onClick={() => handleSupportLink('terms')} className="hover:text-cyber-cyan transition-colors text-left">
                    Foydalanish Shartlari
                  </button>
              </li>
              <li>
                  <button onClick={() => handleSupportLink('privacy')} className="hover:text-cyber-cyan transition-colors text-left">
                    Maxfiylik Siyosati
                  </button>
              </li>
            </ul>
          </div>

          {/* Developer Contact - KEY SECTION */}
          <div>
            <h3 className="text-cyber-cyan font-bold mb-6 tracking-wide text-sm border-b border-cyber-cyan/30 pb-2 inline-block">
                DASTURCHIGA ALOQA
            </h3>
            <div className="flex flex-col gap-4">
                {/* Telegram */}
                <Tooltip content="Telegram orqali bog'lanish" position="top" className="w-full">
                    <a 
                        href="https://t.me/muhammadziyo_dev" 
                        target="_blank" 
                        rel="noreferrer"
                        className="w-full group flex items-center gap-3 bg-white/5 hover:bg-[#0088cc]/20 p-3 rounded-lg border border-white/10 hover:border-[#0088cc] transition-all"
                    >
                        <svg className="w-5 h-5 text-gray-400 group-hover:text-[#0088cc] fill-current flex-shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 11.944 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                        </svg>
                        <span className="text-sm text-gray-300 font-bold">Telegram</span>
                    </a>
                </Tooltip>

                {/* Instagram */}
                <Tooltip content="Instagram sahifasi" position="top" className="w-full">
                    <a 
                        href="https://instagram.com/muhammadziyo.life" 
                        target="_blank" 
                        rel="noreferrer"
                        className="w-full group flex items-center gap-3 bg-white/5 hover:bg-[#E1306C]/20 p-3 rounded-lg border border-white/10 hover:border-[#E1306C] transition-all"
                    >
                        <svg className="w-5 h-5 text-gray-400 group-hover:text-[#E1306C] fill-current flex-shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                        <span className="text-sm text-gray-300 font-bold">Instagram</span>
                    </a>
                </Tooltip>

                {/* Discord */}
                <Tooltip content="Discord serverga qo'shiling" position="top" className="w-full">
                    <a 
                        href="https://discord.com/users/muhammadziyo_dev" 
                        target="_blank" 
                        rel="noreferrer"
                        className="w-full group flex items-center gap-3 bg-white/5 hover:bg-[#5865F2]/20 p-3 rounded-lg border border-white/10 hover:border-[#5865F2] transition-all"
                    >
                        <svg className="w-5 h-5 text-gray-400 group-hover:text-[#5865F2] fill-current flex-shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                        </svg>
                        <span className="text-sm text-gray-300 font-bold">Discord</span>
                    </a>
                </Tooltip>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600">
            <p>&copy; 2024 UzBlender 3D. Barcha huquqlar himoyalangan.</p>
            <p>Dizayn va Dasturlash: Muhammadziyo</p>
        </div>
      </div>
    </footer>
  );
};
