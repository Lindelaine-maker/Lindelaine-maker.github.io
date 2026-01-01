
import React from 'react';
import { Campaign } from '../types';

const mockCampaigns: Campaign[] = [
  { id: '1', name: 'Fone Bluetooth XY', status: 'active', clicks: 1240, sales: 45, commission: 280.50, date: '2023-10-25' },
  { id: '2', name: 'Smartwatch Ultra 9', status: 'active', clicks: 890, sales: 12, commission: 450.00, date: '2023-10-24' },
  { id: '3', name: 'Mini Projetor 4K', status: 'draft', clicks: 0, sales: 0, commission: 0, date: '2023-10-23' },
  { id: '4', name: 'Teclado Mecânico RGB', status: 'completed', clicks: 4500, sales: 180, commission: 1240.20, date: '2023-10-15' },
];

const Tracking: React.FC = () => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Monitoramento de Vendas</h2>
        <div className="flex gap-2">
           <button className="px-4 py-2 bg-[#EE4D2D] text-white text-sm font-bold rounded-lg hover:bg-[#D73211] transition-colors shadow-lg shadow-orange-100">
             <i className="fa-solid fa-download mr-2"></i> Exportar CSV
           </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Produto</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase text-center">Cliques</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase text-center">Vendas</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase text-right">Comissão Estimada</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {mockCampaigns.map((camp) => (
                <tr key={camp.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-gray-800">{camp.name}</div>
                    <div className="text-xs text-gray-400">Criado em {camp.date}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                      camp.status === 'active' ? 'bg-green-100 text-green-600' : 
                      camp.status === 'draft' ? 'bg-gray-100 text-gray-500' : 'bg-blue-100 text-blue-600'
                    }`}>
                      {camp.status === 'active' ? 'Rodando' : camp.status === 'draft' ? 'Rascunho' : 'Finalizado'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-gray-600">{camp.clicks.toLocaleString()}</td>
                  <td className="px-6 py-4 text-center text-sm font-bold text-gray-800">{camp.sales}</td>
                  <td className="px-6 py-4 text-right text-sm font-bold text-[#EE4D2D]">R$ {camp.commission.toFixed(2)}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                      <i className="fa-solid fa-ellipsis-vertical"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-green-50 p-6 rounded-2xl border border-green-100">
         <div className="flex gap-4 items-center">
            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white text-xl shadow-lg shadow-green-100">
               <i className="fa-solid fa-gift"></i>
            </div>
            <div className="flex-1">
               <h3 className="font-bold text-green-700">Acesso Gratuito e Ilimitado</h3>
               <p className="text-sm text-gray-600">Você tem acesso a todas as ferramentas de IA sem custos. Aproveite para escalar sua operação de afiliado!</p>
            </div>
            <button className="px-6 py-2 bg-white border border-green-600 text-green-600 font-bold rounded-lg hover:bg-green-600 hover:text-white transition-all shadow-sm">
               Saber Mais
            </button>
         </div>
      </div>
    </div>
  );
};

export default Tracking;
