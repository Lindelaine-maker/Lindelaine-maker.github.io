
import React, { useState, useEffect } from 'react';
import { AccountIntegration } from '../types';

const Integrations: React.FC = () => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [accounts, setAccounts] = useState<AccountIntegration[]>([
    { platform: 'Shopee Affiliate', icon: 'fa-cart-shopping', connected: false, color: 'bg-orange-500' },
    { platform: 'Instagram Business', icon: 'fa-brands fa-instagram', connected: false, color: 'bg-pink-500' },
    { platform: 'TikTok for Business', icon: 'fa-brands fa-tiktok', connected: false, color: 'bg-black' },
    { platform: 'Google Ads', icon: 'fa-brands fa-google', connected: false, color: 'bg-blue-600' },
    { platform: 'Facebook Ads', icon: 'fa-brands fa-facebook', connected: false, color: 'bg-blue-800' },
  ]);

  const toggleConnection = (index: number) => {
    const updated = [...accounts];
    updated[index].connected = !updated[index].connected;
    if (updated[index].connected) {
      updated[index].username = 'user_shopee_afiliado';
    } else {
      updated[index].username = undefined;
    }
    setAccounts(updated);
  };

  const handleOperaDirectLogin = () => {
    setIsSyncing(true);
    // Simulate browser session detection
    setTimeout(() => {
      setIsSyncing(false);
      const updated = [...accounts];
      const shopeeIdx = updated.findIndex(a => a.platform === 'Shopee Affiliate');
      if (shopeeIdx !== -1) {
        updated[shopeeIdx].connected = true;
        updated[shopeeIdx].username = 'afiliado_opera_user';
        setAccounts(updated);
        alert('Conta Shopee detectada no Opera e vinculada com sucesso!');
      }
    }, 2000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fadeIn">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Conexões Estratégicas</h2>
          <p className="text-gray-500">Vincule suas redes sociais e contas de anúncio para automação total.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handleOperaDirectLogin}
            disabled={isSyncing}
            className="flex items-center gap-2 px-4 py-2 bg-[#ff1b2d] text-white text-sm font-bold rounded-xl hover:bg-[#cc1624] transition-all shadow-lg shadow-red-100 disabled:opacity-50"
          >
            {isSyncing ? (
              <i className="fa-solid fa-spinner fa-spin"></i>
            ) : (
              <i className="fa-brands fa-opera"></i>
            )}
            Login Direto (Opera)
          </button>
          <div className="bg-green-50 text-green-700 px-4 py-2 rounded-xl border border-green-100 flex items-center gap-2 text-sm font-medium">
            <i className="fa-solid fa-unlock"></i>
            Acesso Gratuito
          </div>
        </div>
      </div>

      {isSyncing && (
        <div className="bg-orange-50 border border-orange-200 p-6 rounded-2xl flex items-center justify-center gap-4 animate-pulse">
          <i className="fa-brands fa-opera text-3xl text-[#ff1b2d]"></i>
          <p className="font-medium text-orange-800 text-sm">Detectando sessão ativa no navegador Opera...</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {accounts.map((acc, idx) => (
          <div key={acc.platform} className={`bg-white p-6 rounded-2xl border ${acc.connected ? 'border-[#EE4D2D]/30 shadow-orange-50' : 'border-gray-100'} shadow-sm hover:shadow-md transition-all`}>
            <div className="flex justify-between items-start mb-6">
              <div className={`w-12 h-12 ${acc.color} rounded-2xl flex items-center justify-center text-white shadow-lg`}>
                <i className={`${acc.icon} text-xl`}></i>
              </div>
              <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${acc.connected ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${acc.connected ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></span>
                {acc.connected ? 'Conectado' : 'Desconectado'}
              </div>
            </div>
            
            <h3 className="font-bold text-gray-800 text-lg">{acc.platform}</h3>
            <p className="text-sm text-gray-500 mb-6">
              {acc.connected ? `Logado como @${acc.username}` : `Vincule sua conta para testar automações.`}
            </p>

            <button
              onClick={() => toggleConnection(idx)}
              className={`w-full py-2.5 rounded-xl font-bold text-sm transition-all ${
                acc.connected 
                  ? 'bg-gray-50 text-gray-400 hover:bg-red-50 hover:text-red-500' 
                  : 'bg-[#EE4D2D] text-white hover:bg-[#D73211] shadow-lg shadow-orange-100'
              }`}
            >
              {acc.connected ? 'Desconectar' : 'Conectar Agora'}
            </button>
          </div>
        ))}
      </div>

      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-2">
            <div>
              <h3 className="font-bold text-gray-800">Configurações de Integração</h3>
              <p className="text-xs text-gray-400">Gerencie chaves de API e Webhooks para automação avançada.</p>
            </div>
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-[10px] font-bold uppercase">Uso Ilimitado</span>
        </div>
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
             <div className="flex-1">
                <label className="block text-xs font-bold text-gray-400 mb-2 uppercase">Shopee API Key</label>
                <div className="flex gap-2">
                  <input type="password" value="••••••••••••••••" readOnly className="flex-1 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-500" />
                  <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"><i className="fa-solid fa-eye"></i></button>
                </div>
             </div>
             <div className="flex-1">
                <label className="block text-xs font-bold text-gray-400 mb-2 uppercase">App ID</label>
                <input type="text" value="OPERA-SYNC-9921" readOnly className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-500" />
             </div>
          </div>
          <p className="text-xs text-gray-400 italic">O login via Opera utiliza cookies de sessão para sincronizar automaticamente seus dados de afiliado.</p>
        </div>
      </div>
    </div>
  );
};

export default Integrations;
