
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Automation from './components/Automation';
import Visuals from './components/Visuals';
import Tracking from './components/Tracking';
import Integrations from './components/Integrations';
import { Tab } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.Dashboard);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case Tab.Dashboard:
        return <Dashboard />;
      case Tab.Automation:
        return <Automation />;
      case Tab.Visuals:
        return <Visuals />;
      case Tab.Tracking:
        return <Tracking />;
      case Tab.Integrations:
        return <Integrations />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#F9FAFB]">
      {/* Mobile Menu Toggle */}
      <button 
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#EE4D2D] text-white rounded-full shadow-2xl flex items-center justify-center"
      >
        <i className={`fa-solid ${isMobileMenuOpen ? 'fa-xmark' : 'fa-bars'} text-xl`}></i>
      </button>

      {/* Sidebar - Desktop and Mobile */}
      <div className={`${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 fixed md:relative h-full z-40`}>
        <Sidebar activeTab={activeTab} setActiveTab={(tab) => {
          setActiveTab(tab);
          setIsMobileMenuOpen(false);
        }} />
      </div>

      {/* Main Content */}
      <main className="flex-1 h-full overflow-y-auto p-4 md:p-10">
        <header className="mb-10 flex justify-between items-center bg-white/50 backdrop-blur-sm p-4 rounded-2xl md:bg-transparent md:p-0">
          <div className="flex items-center gap-3">
            <span className="text-gray-400">Hub</span>
            <i className="fa-solid fa-chevron-right text-[10px] text-gray-300"></i>
            <span className="font-bold text-gray-800 capitalize">{activeTab.replace('_', ' ')}</span>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="relative w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors">
              <i className="fa-regular fa-bell"></i>
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center gap-3 bg-white px-3 py-1.5 rounded-full border border-gray-100 shadow-sm">
              <div className="w-7 h-7 bg-gradient-to-tr from-orange-400 to-[#EE4D2D] rounded-full overflow-hidden flex items-center justify-center text-white text-[10px] font-bold">
                AF
              </div>
              <span className="text-sm font-semibold text-gray-700 hidden sm:inline">Afiliado Master</span>
            </div>
          </div>
        </header>

        {renderContent()}

        <footer className="mt-12 pt-8 border-t border-gray-200 text-center pb-10">
          <p className="text-xs text-gray-400">
            &copy; 2024 ShopeeAuto Hub. Potencializado por Gemini AI. 
            Todas as vendas e comissões são processadas diretamente pela plataforma Shopee.
          </p>
        </footer>
      </main>

      {/* CSS Animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideIn {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
        .animate-slideIn {
          animation: slideIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default App;
