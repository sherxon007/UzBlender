
import React, { useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Marketplace } from './components/Marketplace/Marketplace';
import { ProductDetails } from './components/Marketplace/ProductDetails';
import { SellerProfile } from './components/Marketplace/SellerProfile';
import { Dashboard } from './components/User/Dashboard';
import { UserSettings } from './components/User/UserSettings';
import { ChatSystem } from './components/Messages/ChatSystem';
import { SupportPage } from './components/SupportPage';
import { AdminDashboard } from './components/Admin/AdminDashboard';
import { CommunityHub } from './components/Community/CommunityHub'; 
import { Footer } from './components/Footer';
import { AuthModal } from './components/Auth/AuthModal';
import { WalletModal } from './components/Wallet/WalletModal';
import { CartDrawer } from './components/CartDrawer';
import { ToastContainer } from './components/ToastContainer';
import { JobsBoard } from './components/Jobs/JobsBoard';
import { BlogPage } from './components/Blog/BlogPage';
import { ContestsPage } from './components/Community/ContestsPage';
import { LearnPage } from './components/Learn/LearnPage';
import { ThreeBackground } from './components/ThreeBackground'; 
import { useStore } from './store';
import { Hammer, AlertTriangle } from 'lucide-react';

const MaintenanceScreen = () => (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center text-center p-6 relative z-50">
        <div className="max-w-md animate-fade-in-up">
            <div className="w-20 h-20 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-yellow-500/20">
                <Hammer size={40} className="text-yellow-500" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-3">System Maintenance</h1>
            <p className="text-slate-400 mb-8 leading-relaxed">
                UzBlender 3D is currently undergoing scheduled maintenance to improve system stability and performance. We will be back online shortly.
            </p>
            <div className="inline-block px-4 py-2 bg-slate-800 rounded-lg text-xs font-mono text-slate-500 border border-slate-700">
                STATUS: DEPLOYING PATCH
            </div>
        </div>
    </div>
);

function App() {
  const { currentView, initApp, isLoading, systemSettings, user, addToast } = useStore();

  useEffect(() => {
      initApp(); 
      
      // Check if running on file protocol and warn user
      if (window.location.protocol === 'file:') {
          setTimeout(() => {
              addToast('Ogohlantirish: Videolar va 3D effektlar ishlashi uchun Local Serverdan foydalaning (Live Server)!', 'error');
          }, 2000);
      }
  }, []);

  if (isLoading) {
      return (
          <div className="min-h-screen bg-[#0f172a] flex items-center justify-center">
              <div className="flex flex-col items-center gap-4">
                  <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                  <h1 className="text-white font-display font-bold text-xl animate-pulse">INITIALIZING SYSTEM...</h1>
              </div>
          </div>
      );
  }

  // --- STRICT ADMIN ENVIRONMENT ---
  // If user is admin, they are forced into the Enterprise Admin Dashboard.
  // They cannot access the public marketplace view while logged in as admin.
  if (user?.isAdmin) {
      return (
        <div className="bg-slate-50 min-h-screen font-sans text-slate-900 overflow-hidden relative selection:bg-blue-600 selection:text-white">
            <AdminDashboard />
            <ToastContainer />
        </div>
      );
  }

  // System Lockout Check (For normal users)
  if (systemSettings.maintenanceMode && (!user || !user.isAdmin)) {
      return <MaintenanceScreen />;
  }

  // --- STANDARD USER ENVIRONMENT (Cyberpunk Theme) ---
  return (
    <div className="min-h-screen flex flex-col bg-[#0f172a] text-slate-100 overflow-x-hidden selection:bg-blue-500/30 selection:text-white relative">
      
      {/* Global Admin Banner */}
      {systemSettings.globalBanner && (
          <div className="bg-blue-600 text-white px-4 py-2 text-center text-sm font-bold shadow-lg z-[60] relative flex items-center justify-center gap-2">
              <AlertTriangle size={16} /> {systemSettings.globalBanner}
          </div>
      )}

      {/* GLOBAL 3D BACKGROUND (Only for user views) */}
      <ThreeBackground />

      {/* Main App Layer */}
      <div className="relative z-10 flex flex-col min-h-screen">
          <Navbar />

          <main className="flex-grow flex flex-col">
            {currentView === 'marketplace' && <Marketplace />}
            {currentView === 'product' && <ProductDetails />}
            {currentView === 'seller' && <SellerProfile />}
            {currentView === 'dashboard' && <Dashboard />}
            {currentView === 'settings' && <UserSettings />}
            {currentView === 'messages' && <ChatSystem />}
            {currentView === 'support' && <SupportPage />}
            
            {/* 'admin' view is captured by the Strict Admin Environment block above */}
            
            {currentView === 'community' && <CommunityHub />}
            {currentView === 'jobs' && <JobsBoard />}
            {currentView === 'blog' && <BlogPage />}
            {currentView === 'contests' && <ContestsPage />}
            {currentView === 'learn' && <LearnPage />}
          </main>

          {currentView !== 'messages' && <Footer />}
      </div>

      <AuthModal />
      <WalletModal />
      <CartDrawer />
      <ToastContainer />
    </div>
  );
}

export default App;
