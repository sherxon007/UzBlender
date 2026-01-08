
import React from 'react';
import { ArrowLeft, Shield, FileText, HelpCircle, Scale, MessageCircle } from 'lucide-react';
import { useStore } from '../store';

export const SupportPage = () => {
  const { activeAssetId, setView, startChat, user, openAuth } = useStore(); // activeAssetId serves as the page slug here

  const handleLiveChat = () => {
      if (!user) {
          openAuth('login');
      } else {
          startChat('Support Agent', 'https://api.dicebear.com/7.x/bottts/svg?seed=Support', 'Hello! How can we help you today?');
      }
  };

  const renderContent = () => {
    switch (activeAssetId) {
      case 'terms':
        return (
          <>
            <div className="flex items-center gap-3 mb-6">
                <Scale className="text-cyber-cyan w-8 h-8" />
                <h1 className="text-3xl font-display font-bold text-white">Terms of Service</h1>
            </div>
            <div className="space-y-4 text-gray-400 leading-relaxed">
                <p><strong>Last Updated: October 2024</strong></p>
                <p>Welcome to UzBlender 3D. By accessing or using our marketplace, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service.</p>
                <h3 className="text-white font-bold text-lg mt-6">1. Asset Usage</h3>
                <p>Assets purchased on UzBlender 3D are Royalty-Free for use in personal and commercial projects (games, films, rendering). However, you may NOT resell, redistribute, or repackage the assets themselves as standalone products.</p>
                <h3 className="text-white font-bold text-lg mt-6">2. Refunds</h3>
                <p>Due to the digital nature of the assets, refunds are only issued if the file is technically defective and our support team cannot resolve the issue within 48 hours.</p>
                <h3 className="text-white font-bold text-lg mt-6">3. User Conduct</h3>
                <p>You agree not to use the Service to upload malicious code, infringe on intellectual property, or harass other users. We reserve the right to ban any account violating these rules.</p>
            </div>
          </>
        );
      case 'privacy':
        return (
          <>
             <div className="flex items-center gap-3 mb-6">
                <Shield className="text-cyber-green w-8 h-8" />
                <h1 className="text-3xl font-display font-bold text-white">Privacy Policy</h1>
            </div>
            <div className="space-y-4 text-gray-400 leading-relaxed">
                <p>Your privacy is critically important to us. At UzBlender 3D, we have a few fundamental principles:</p>
                <ul className="list-disc pl-5 space-y-2">
                    <li>We don't ask you for personal information unless we truly need it.</li>
                    <li>We don't share your personal information with anyone except to comply with the law, develop our products, or protect our rights.</li>
                    <li>We don't store personal information on our servers unless required for the on-going operation of one of our services.</li>
                </ul>
                <h3 className="text-white font-bold text-lg mt-6">Data Collection</h3>
                <p>We collect basic information such as email address and usage data to improve our marketplace recommendations.</p>
            </div>
          </>
        );
      case 'licensing':
        return (
           <>
             <div className="flex items-center gap-3 mb-6">
                <FileText className="text-purple-500 w-8 h-8" />
                <h1 className="text-3xl font-display font-bold text-white">Licensing Agreement</h1>
            </div>
            <div className="space-y-4 text-gray-400 leading-relaxed">
                <p>All assets on UzBlender 3D are covered by our Standard Royalty-Free License unless stated otherwise.</p>
                <div className="bg-white/5 p-6 rounded-lg border border-white/10 mt-4">
                    <h4 className="text-white font-bold mb-2">You Can:</h4>
                    <ul className="list-disc pl-5 space-y-1 mb-4">
                        <li>Use the asset in commercial games, movies, and renders.</li>
                        <li>Modify the asset to fit your project needs.</li>
                        <li>Use the asset in unlimited projects.</li>
                    </ul>
                    <h4 className="text-white font-bold mb-2">You Cannot:</h4>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>Resell the asset file itself.</li>
                        <li>Share the asset file on P2P networks or free asset sites.</li>
                        <li>Include the asset in an asset pack for sale.</li>
                    </ul>
                </div>
            </div>
          </>
        );
      case 'help':
        return (
           <>
             <div className="flex items-center gap-3 mb-6">
                <HelpCircle className="text-blue-400 w-8 h-8" />
                <h1 className="text-3xl font-display font-bold text-white">Help Center</h1>
            </div>
            <div className="space-y-6 text-gray-400 leading-relaxed">
                <div>
                    <h3 className="text-white font-bold text-lg mb-2">How do I download my assets?</h3>
                    <p>After purchase, go to your Dashboard > My Library. You will see a "Download" button next to each item.</p>
                </div>
                <div>
                    <h3 className="text-white font-bold text-lg mb-2">What formats are provided?</h3>
                    <p>Most assets come in .blend, .fbx, and .obj formats. Check the product details page for specific information on each asset.</p>
                </div>
                <div>
                    <h3 className="text-white font-bold text-lg mb-2">How do I become a seller?</h3>
                    <p>Navigate to the Marketplace homepage and click "Become a Seller" at the bottom. You'll need to submit a portfolio for review.</p>
                </div>
                
                <div className="mt-8 pt-8 border-t border-white/10">
                    <p>Still need help? Contact our support via Telegram: <a href="https://t.me/muhammadziyo_dev" className="text-cyber-cyan hover:underline">@muhammadziyo_dev</a></p>
                </div>
            </div>
          </>
        );
      default:
        return <div>Page not found</div>;
    }
  };

  return (
    <div className="min-h-screen bg-[#050b14] pt-8 pb-20 relative">
        <div className="container mx-auto px-6 max-w-4xl">
            <button 
                onClick={() => setView('marketplace')}
                className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
            >
                <ArrowLeft size={20} />
                <span>Back to Marketplace</span>
            </button>
            
            <div className="bg-[#0a1220] p-8 md:p-12 rounded-2xl border border-white/5 shadow-2xl animate-fade-in relative z-10">
                {renderContent()}
            </div>
        </div>

        {/* Live Chat Widget */}
        <div className="fixed bottom-8 right-8 z-50 animate-bounce">
            <button 
                onClick={handleLiveChat}
                className="bg-cyber-cyan hover:bg-white text-black p-4 rounded-full shadow-[0_0_20px_rgba(0,240,255,0.5)] transition-all transform hover:scale-110 flex items-center justify-center"
            >
                <MessageCircle size={32} />
            </button>
            <div className="absolute -top-12 right-0 bg-[#0a1220] text-white text-xs px-3 py-1.5 rounded-lg border border-cyber-cyan/50 whitespace-nowrap shadow-lg">
                Need Help? Chat Live!
            </div>
        </div>
    </div>
  );
};
