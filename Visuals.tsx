
import React, { useState } from 'react';
import { generateProductImage } from '../services/geminiService';

const Visuals: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt) return;
    setLoading(true);
    try {
      const url = await generateProductImage(prompt);
      setImage(url);
    } catch (error) {
      console.error(error);
      alert('Falha ao gerar imagem.');
    } finally {
      setLoading(false);
    }
  };

  const downloadImage = () => {
    if (!image) return;
    const link = document.createElement('a');
    link.href = image;
    link.download = 'shopee-promo.png';
    link.click();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-gray-800">Criativo de Alta Conversão</h2>
        <p className="text-gray-500">Nossa IA cria imagens profissionais para seus anúncios em segundos.</p>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl overflow-hidden relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Descreva a imagem ideal</label>
              <textarea
                value={prompt}
                onChange={e => setPrompt(e.target.value)}
                placeholder="Ex: Um fone de ouvido branco minimalista sobre uma mesa de madeira com plantas ao fundo e luz natural suave."
                className="w-full h-40 p-4 bg-gray-50 border border-gray-200 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-[#EE4D2D]/20 focus:border-[#EE4D2D]"
              />
            </div>
            <button
              onClick={handleGenerate}
              disabled={loading}
              className="w-full py-4 bg-[#EE4D2D] text-white font-bold rounded-2xl shadow-lg shadow-orange-200 hover:scale-[1.02] transition-transform active:scale-95 disabled:opacity-50"
            >
              {loading ? <i className="fa-solid fa-spinner fa-spin mr-2"></i> : <i className="fa-solid fa-wand-sparkles mr-2"></i>}
              Gerar Imagem do Produto
            </button>
          </div>

          <div className="aspect-square bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden group relative">
            {loading ? (
              <div className="flex flex-col items-center gap-3">
                 <div className="w-16 h-16 border-4 border-[#EE4D2D] border-t-transparent rounded-full animate-spin"></div>
                 <p className="text-sm font-medium text-gray-400">Renderizando imagem...</p>
              </div>
            ) : image ? (
              <>
                <img src={image} alt="Generated" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                  <button onClick={downloadImage} className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-gray-800 hover:text-[#EE4D2D] transition-colors">
                    <i className="fa-solid fa-download"></i>
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center text-gray-300">
                <i className="fa-solid fa-image text-6xl mb-4"></i>
                <p className="text-sm">Sua obra de arte aparecerá aqui</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 bg-orange-100 text-[#EE4D2D] rounded-xl flex items-center justify-center">
            <i className="fa-solid fa-bolt"></i>
          </div>
          <div>
            <h4 className="font-bold text-gray-800 text-sm">Rápido</h4>
            <p className="text-xs text-gray-500">Imagens prontas em &lt; 10s</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center">
            <i className="fa-solid fa-star"></i>
          </div>
          <div>
            <h4 className="font-bold text-gray-800 text-sm">Qualidade Studio</h4>
            <p className="text-xs text-gray-500">IA treinada em fotografia</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
            <i className="fa-solid fa-infinity"></i>
          </div>
          <div>
            <h4 className="font-bold text-gray-800 text-sm">Ilimitado</h4>
            <p className="text-xs text-gray-500">Crie quantas precisar</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Visuals;
