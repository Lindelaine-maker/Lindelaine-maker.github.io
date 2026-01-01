
import React, { useState, useEffect } from 'react';
import { generateMarketingContent, generateProductVideo } from '../services/geminiService';
import { ProductData, GeneratedContent, PromptTemplate } from '../types';

const Automation: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [videoLoading, setVideoLoading] = useState(false);
  const [videoLoadingStep, setVideoLoadingStep] = useState(0);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [publishing, setPublishing] = useState<string | null>(null);
  const [templates, setTemplates] = useState<PromptTemplate[]>([]);
  const [dailyWinners, setDailyWinners] = useState([
    { name: 'Fone de Ouvido i12 TWS', price: 'R$ 29,90', sales: '+5.000', trend: 'up' },
    { name: 'Smartwatch D20 Plus', price: 'R$ 45,00', sales: '+3.200', trend: 'up' },
    { name: 'Kit Cozinha 12 Peças', price: 'R$ 119,00', sales: '+1.500', trend: 'stable' },
  ]);
  
  const [product, setProduct] = useState<ProductData>({
    name: '',
    description: '',
    price: '',
    category: '',
    affiliateLink: '',
    customInstructions: ''
  });
  const [content, setContent] = useState<GeneratedContent | null>(null);

  const videoSteps = [
    "Analisando detalhes do produto...",
    "Criando roteiro cinematográfico...",
    "Renderizando cenas em 4K...",
    "Aplicando trilha sonora e efeitos...",
    "Finalizando vídeo de alta conversão..."
  ];

  useEffect(() => {
    const saved = localStorage.getItem('shopeeau_templates');
    if (saved) setTemplates(JSON.parse(saved));
  }, []);

  useEffect(() => {
    let interval: any;
    if (videoLoading) {
      interval = setInterval(() => {
        setVideoLoadingStep(prev => (prev + 1) % videoSteps.length);
      }, 7000);
    }
    return () => clearInterval(interval);
  }, [videoLoading]);

  const handleGenerate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    setVideoUrl(null);
    try {
      const result = await generateMarketingContent(product);
      setContent(result);
    } catch (error) {
      console.error(error);
      alert('Erro ao gerar conteúdo.');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateVideo = async () => {
    if (!product.name) return;
    setVideoLoading(true);
    setVideoLoadingStep(0);
    try {
      const url = await generateProductVideo(product.name);
      setVideoUrl(url);
    } catch (error) {
      console.error(error);
      alert('Falha na geração do vídeo. Tente novamente.');
    } finally {
      setVideoLoading(false);
    }
  };

  const importWinner = (winner: any) => {
    setProduct({
      ...product,
      name: winner.name,
      price: winner.price,
      description: `Produto campeão de vendas na Shopee com mais de ${winner.sales} unidades vendidas hoje.`,
      category: 'Top Vendas',
      affiliateLink: 'https://shope.ee/auto-generated-link'
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePublish = (platform: string) => {
    setPublishing(platform);
    setTimeout(() => {
      setPublishing(null);
      alert(`O Robô enviou sua campanha para o ${platform} com sucesso!`);
    }, 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fadeIn">
      <div className="space-y-6">
        <div className="bg-gradient-to-br from-[#EE4D2D] to-[#ff7d4d] p-6 rounded-3xl shadow-lg text-white">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="font-bold text-lg">Vencedores do Dia 🏆</h3>
              <p className="text-xs opacity-80">Produtos explodindo em vendas agora</p>
            </div>
            <div className="bg-white/20 p-2 rounded-xl backdrop-blur-md">
              <i className="fa-solid fa-fire animate-pulse"></i>
            </div>
          </div>
          
          <div className="space-y-3">
            {dailyWinners.map((winner, i) => (
              <div key={i} className="bg-white/10 hover:bg-white/20 transition-all p-3 rounded-2xl flex items-center justify-between border border-white/10 group">
                <div>
                  <p className="text-sm font-bold truncate w-40">{winner.name}</p>
                  <p className="text-[10px] opacity-70">{winner.sales} vendas hoje • {winner.price}</p>
                </div>
                <button 
                  onClick={() => importWinner(winner)}
                  className="bg-white text-[#EE4D2D] px-3 py-1.5 rounded-xl text-[10px] font-bold group-hover:scale-105 transition-transform"
                >
                  AUTOMATIZAR
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Configurar Postagem Manual</h3>
          <form onSubmit={handleGenerate} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-xs font-semibold text-gray-500 mb-1">PRODUTO</label>
                <input
                  required
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#EE4D2D]/20 focus:border-[#EE4D2D]"
                  value={product.name}
                  onChange={e => setProduct({...product, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">PREÇO</label>
                <input
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#EE4D2D]/20 focus:border-[#EE4D2D]"
                  value={product.price}
                  onChange={e => setProduct({...product, price: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">CATEGORIA</label>
                <input
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#EE4D2D]/20 focus:border-[#EE4D2D]"
                  value={product.category}
                  onChange={e => setProduct({...product, category: e.target.value})}
                />
              </div>
            </div>
            <button
              disabled={loading}
              className="w-full py-4 bg-[#EE4D2D] text-white font-bold rounded-xl shadow-lg shadow-orange-100 hover:bg-[#D73211] transition-all disabled:opacity-50"
            >
              {loading ? <i className="fa-solid fa-sync fa-spin mr-2"></i> : <i className="fa-solid fa-rocket mr-2"></i>}
              Lançar Agora
            </button>
          </form>
        </div>
      </div>

      <div className="space-y-6">
        {!content && !loading && (
          <div className="bg-white border-2 border-dashed border-gray-200 rounded-2xl h-full flex flex-col items-center justify-center p-12 text-center text-gray-400">
            <i className="fa-solid fa-robot text-5xl mb-4 text-gray-200"></i>
            <p className="font-medium">O Robô está aguardando ordens ou novos produtos vencedores.</p>
          </div>
        )}

        {loading && (
          <div className="bg-white p-12 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center justify-center gap-4 min-h-[400px]">
             <div className="w-16 h-16 border-4 border-[#EE4D2D] border-t-transparent rounded-full animate-spin"></div>
             <p className="text-gray-500 font-bold">O Robô está escrevendo as copies para você...</p>
          </div>
        )}

        {content && (
          <div className="space-y-6 animate-slideIn pb-10">
            {/* Video Preview and Generation Section */}
            <div className="bg-gray-900 p-6 rounded-2xl shadow-xl text-white">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h4 className="font-bold flex items-center gap-2">
                    <i className="fa-solid fa-clapperboard text-orange-400"></i>
                    IA Video Robot (Veo)
                  </h4>
                  <p className="text-[10px] text-gray-400 tracking-wider">Geração de vídeo de alta fidelidade</p>
                </div>
                {videoUrl && (
                  <button 
                    onClick={() => handlePublish('Video Content')}
                    className="bg-orange-500 text-white px-3 py-1 rounded-lg text-[10px] font-bold hover:bg-orange-600 transition-colors"
                  >
                    Postar Vídeo
                  </button>
                )}
              </div>

              {videoLoading ? (
                <div className="aspect-[9/16] max-h-[400px] mx-auto bg-gray-800 rounded-xl flex flex-col items-center justify-center p-8 text-center gap-6 border border-gray-700">
                  <div className="relative">
                    <div className="w-24 h-24 border-4 border-orange-500/10 rounded-full"></div>
                    <div className="w-24 h-24 border-4 border-orange-500 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
                    <i className="fa-solid fa-video text-orange-500 text-xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></i>
                  </div>
                  <div className="space-y-3">
                    <p className="text-sm font-bold text-orange-400 animate-pulse">{videoSteps[videoLoadingStep]}</p>
                    <div className="w-48 h-1 bg-gray-700 rounded-full overflow-hidden mx-auto">
                      <div className="h-full bg-orange-500 transition-all duration-7000" style={{ width: `${(videoLoadingStep + 1) * 20}%` }}></div>
                    </div>
                    <p className="text-[10px] text-gray-500">Isso pode levar até 2 minutos. Fique aqui para ver o resultado!</p>
                  </div>
                </div>
              ) : videoUrl ? (
                <div className="aspect-[9/16] max-h-[400px] mx-auto bg-black rounded-xl overflow-hidden shadow-2xl relative group">
                  <video src={videoUrl} controls autoPlay loop className="w-full h-full object-cover" />
                  <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-md px-2 py-1 rounded text-[10px] font-mono border border-white/10 uppercase">
                    Processed by Veo Robot
                  </div>
                </div>
              ) : (
                <div className="aspect-[9/16] max-h-[240px] mx-auto bg-gray-800/40 border border-dashed border-gray-700 rounded-xl flex flex-col items-center justify-center p-6 text-center">
                  <i className="fa-solid fa-wand-magic-sparkles text-3xl mb-3 text-gray-600"></i>
                  <p className="text-xs text-gray-400 mb-5 max-w-[200px]">O roteiro está pronto. Deseja criar o vídeo promocional com IA?</p>
                  <button 
                    onClick={handleGenerateVideo}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl text-xs font-bold transition-all shadow-lg shadow-orange-950/20 active:scale-95"
                  >
                    Gerar Vídeo do Produto
                  </button>
                </div>
              )}
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-bold text-gray-800 flex items-center gap-2">
                  <i className="fa-brands fa-instagram text-pink-500"></i>
                  Legenda Gerada
                </h4>
                <button 
                  onClick={() => handlePublish('Instagram')}
                  disabled={!!publishing}
                  className="bg-pink-500 text-white px-4 py-1.5 rounded-xl text-xs font-bold hover:shadow-md transition-all disabled:opacity-50"
                >
                  {publishing === 'Instagram' ? 'Postando...' : 'Postar Agora'}
                </button>
              </div>
              <p className="text-sm text-gray-600 bg-gray-50 p-4 rounded-xl leading-relaxed">{content.instagramCaption}</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-bold text-gray-800 flex items-center gap-2">
                  <i className="fa-brands fa-google text-blue-500"></i>
                  Google Ads (Pronto)
                </h4>
                <button 
                  onClick={() => handlePublish('Google Ads')}
                  disabled={!!publishing}
                  className="bg-blue-600 text-white px-4 py-1.5 rounded-xl text-xs font-bold hover:shadow-md transition-all disabled:opacity-50"
                >
                  {publishing === 'Google Ads' ? 'Subindo...' : 'Ativar Campanha'}
                </button>
              </div>
              <div className="space-y-2">
                 {content.googleAds.headlines.map((h, i) => (
                   <div key={i} className="text-sm bg-gray-50 p-2 rounded border border-gray-100">{h}</div>
                 ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Automation;
