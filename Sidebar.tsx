
import React from 'react';
import { Tab } from '../types';

interface SidebarProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: Tab.Dashboard, label: 'Dashboard', icon: 'fa-chart-line' },
    { id: Tab.Automation, label: 'Automação Copy', icon: 'fa-robot' },
    { id: Tab.Visuals, label: 'Gerador de Imagem', icon: 'fa-image' },
    { id: Tab.Tracking, label: 'Logística & Vendas', icon: 'fa-boxes-packing' },
    { id: Tab.Integrations, label: 'Minhas Contas', icon: 'fa-link' },
  ];

  return (
    <aside className="w-64 bg-white border-r h-full flex flex-col fixed md:relative z-40 transition-transform duration-300">
      <div className="p-6 border-b flex items-center gap-2">
        <div className="w-8 h-8 bg-[#EE4D2D] rounded flex items-center justify-center">
          <i className="fa-solid fa-cart-shopping text-white text-sm"></i>
        </div>
        <h1 className="font-bold text-xl tracking-tight text-gray-800">Shopee<span className="text-[#EE4D2D]">Auto</span></h1>
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
              activeTab === item.id 
                ? 'bg-[#EE4D2D]/10 text-[#EE4D2D]' 
                : 'text-gray-500 hover:bg-gray-100'
            }`}
          >
            <i className={`fa-solid ${item.icon} w-5`}></i>
            {item.label}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t">
        <div className="bg-green-50 rounded-xl p-4 border border-green-100">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs font-bold text-green-600 uppercase">Plano Grátis</p>
            <i className="fa-solid fa-infinity text-green-500 text-[10px]"></i>
          </div>
          <p className="text-[11px] text-gray-600 mb-3">Uso Ilimitado Liberado</p>
          <div className="w-full py-2 bg-green-600 text-white text-[10px] font-bold rounded-lg text-center shadow-sm">
            ACESSO TOTAL ATIVO
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
