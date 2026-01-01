
import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { AutomatedTask } from '../types';

const data = [
  { name: 'Seg', sales: 400, clicks: 2400 },
  { name: 'Ter', sales: 300, clicks: 1398 },
  { name: 'Qua', sales: 900, clicks: 9800 },
  { name: 'Qui', sales: 1480, clicks: 3908 },
  { name: 'Sex', sales: 1890, clicks: 4800 },
  { name: 'Sab', sales: 2390, clicks: 3800 },
  { name: 'Dom', sales: 3490, clicks: 4300 },
];

const StatCard = ({ title, value, icon, color, trend }: any) => (
  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
    <div className="flex justify-between items-start mb-4">
      <div className={`w-12 h-12 ${color} rounded-2xl flex items-center justify-center text-white shadow-lg`}>
        <i className={`fa-solid ${icon} text-lg`}></i>
      </div>
      <span className={`text-xs font-bold px-2 py-1 rounded-full ${trend >= 0 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
        {trend >= 0 ? '+' : ''}{trend}%
      </span>
    </div>
    <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
    <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
  </div>
);

const Dashboard: React.FC = () => {
  const [isAutoPilot, setIsAutoPilot] = useState(false);
  const [tasks, setTasks] = useState<AutomatedTask[]>([
    { id: '1', productName: 'Fone Bluetooth XY', platform: 'Google Ads', status: 'success', timestamp: '10:30' },
    { id: '2', productName: 'Smartwatch U8', platform: 'Instagram', status: 'success', timestamp: '09:15' },
  ]);

  useEffect(() => {
    let interval: any;
    if (isAutoPilot) {
      interval = setInterval(() => {
        const products = ['Mini Projetor 4K', 'Teclado Mecânico', 'Câmera Wi-Fi', 'Air Fryer Digital'];
        const platforms = ['Google Ads', 'TikTok', 'Instagram', 'Facebook Ads'];
        const randomProd = products[Math.floor(Math.random() * products.length)];
        const randomPlat = platforms[Math.floor(Math.random() * platforms.length)];
        
        const newTask: AutomatedTask = {
          id: Date.now().toString(),
          productName: randomProd,
          platform: randomPlat,
          status: 'searching',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setTasks(prev => [newTask, ...prev].slice(0, 5));

        // Simulate progress
        setTimeout(() => {
          setTasks(current => current.map(t => t.id === newTask.id ? { ...t, status: 'generating' } : t));
        }, 3000);
        setTimeout(() => {
          setTasks(current => current.map(t => t.id === newTask.id ? { ...t, status: 'publishing' } : t));
        }, 6000);
        setTimeout(() => {
          setTasks(current => current.map(t => t.id === newTask.id ? { ...t, status: 'success' } : t));
        }, 9000);

      }, 15000);
    }
    return () => clearInterval(interval);
  }, [isAutoPilot]);

  return (
    <div className="space-y-8 animate-fadeIn pb-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Centro de Comando 🤖</h2>
          <p className="text-gray-500">O robô está pronto para caçar tendências.</p>
        </div>
        
        <div className="flex items-center gap-4 bg-gray-50 p-2 rounded-2xl border border-gray-200">
          <div className="px-4">
            <p className="text-[10px] font-bold text-gray-400 uppercase">Modo Piloto Automático</p>
            <p className={`text-sm font-bold ${isAutoPilot ? 'text-green-600' : 'text-gray-400'}`}>
              {isAutoPilot ? 'ATIVADO E VENDENDO' : 'DESATIVADO'}
            </p>
          </div>
          <button 
            onClick={() => setIsAutoPilot(!isAutoPilot)}
            className={`w-14 h-8 rounded-full transition-all relative flex items-center px-1 ${isAutoPilot ? 'bg-green-500' : 'bg-gray-300'}`}
          >
            <div className={`w-6 h-6 bg-white rounded-full shadow-md transition-transform ${isAutoPilot ? 'translate-x-6' : 'translate-x-0'}`}></div>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <StatCard title="Vendas Hoje" value="142" icon="fa-bag-shopping" color="bg-[#EE4D2D]" trend={32} />
            <StatCard title="Lucro Estimado" value="R$ 1.840,20" icon="fa-wallet" color="bg-green-500" trend={15} />
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-gray-800">Volume de Vendas Automáticas</h3>
              <div className="text-xs text-gray-400 font-medium">Sincronizado via Opera</div>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#EE4D2D" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#EE4D2D" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f1f1" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#999'}} />
                  <YAxis hide />
                  <Tooltip />
                  <Area type="monotone" dataKey="sales" stroke="#EE4D2D" strokeWidth={3} fill="url(#colorSales)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gray-900 text-white p-6 rounded-3xl shadow-xl h-full flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-sm uppercase tracking-widest text-orange-400">Log do Robô</h3>
              <div className={`w-2 h-2 rounded-full ${isAutoPilot ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
            </div>
            
            <div className="flex-1 space-y-4 overflow-y-auto max-h-[400px] pr-2 custom-scrollbar">
              {tasks.length === 0 && (
                <p className="text-gray-500 text-xs italic text-center py-10">Ative o piloto automático para ver o log de vendas.</p>
              )}
              {tasks.map(task => (
                <div key={task.id} className="border-l-2 border-gray-700 pl-4 py-1 animate-fadeIn">
                  <div className="flex justify-between items-start mb-1">
                    <p className="text-xs font-bold text-gray-300">{task.productName}</p>
                    <span className="text-[10px] text-gray-500">{task.timestamp}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {task.status === 'success' ? (
                      <i className="fa-solid fa-check-circle text-green-500 text-[10px]"></i>
                    ) : (
                      <i className="fa-solid fa-circle-notch fa-spin text-orange-400 text-[10px]"></i>
                    )}
                    <p className="text-[10px] text-gray-400 uppercase tracking-tighter">
                      {task.status === 'searching' && 'Buscando na Shopee...'}
                      {task.status === 'generating' && 'IA Criando Campanha...'}
                      {task.status === 'publishing' && `Subindo para ${task.platform}...`}
                      {task.status === 'success' && `Vendido via ${task.platform}`}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-gray-800">
               <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-gray-400">Eficiência da IA</span>
                  <span className="text-xs text-orange-400 font-bold">98.2%</span>
               </div>
               <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-orange-400 w-[98%]"></div>
               </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #333; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default Dashboard;
