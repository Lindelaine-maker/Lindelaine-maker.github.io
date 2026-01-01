
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { ProductData, GeneratedContent } from "../types";

const API_KEY = process.env.API_KEY || "";

export const generateMarketingContent = async (product: ProductData): Promise<GeneratedContent> => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  const customContext = product.customInstructions 
    ? `\nInstruções Adicionais de Estilo/Foco: ${product.customInstructions}` 
    : "";

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Crie um kit de marketing para este produto da Shopee:
      Nome: ${product.name}
      Descrição: ${product.description}
      Preço: ${product.price}
      Link: ${product.affiliateLink}
      ${customContext}
      
      Gere uma legenda persuasiva para Instagram, um roteiro curto para TikTok/Reels, títulos e descrições para Google Ads e uma lista de hashtags relevantes.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          instagramCaption: { type: Type.STRING },
          tiktokScript: { type: Type.STRING },
          googleAds: {
            type: Type.OBJECT,
            properties: {
              headlines: { type: Type.ARRAY, items: { type: Type.STRING } },
              descriptions: { type: Type.ARRAY, items: { type: Type.STRING } },
            },
            required: ["headlines", "descriptions"],
          },
          hashtags: { type: Type.STRING },
        },
        required: ["instagramCaption", "tiktokScript", "googleAds", "hashtags"],
      },
    },
  });

  return JSON.parse(response.text);
};

export const generateProductImage = async (prompt: string): Promise<string | null> => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [{ text: `High quality studio product photography for Shopee advertising. Clean background, professional lighting. Prompt: ${prompt}` }],
    },
    config: {
      imageConfig: {
        aspectRatio: "1:1"
      }
    }
  });

  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  return null;
};

export const generateProductVideo = async (productName: string): Promise<string | null> => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  try {
    let operation = await ai.models.generateVideos({
      model: 'veo-3.1-fast-generate-preview',
      prompt: `A professional cinematic product advertisement video for ${productName}. Dynamic camera movements, high-quality lighting, showcasing the product in a lifestyle and studio setting. 4k aesthetic.`,
      config: {
        numberOfVideos: 1,
        resolution: '720p',
        aspectRatio: '9:16'
      }
    });

    while (!operation.done) {
      await new Promise(resolve => setTimeout(resolve, 10000));
      operation = await ai.operations.getVideosOperation({ operation: operation });
    }

    const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
    if (downloadLink) {
      // The video download link requires the API key
      return `${downloadLink}&key=${API_KEY}`;
    }
  } catch (error) {
    console.error("Video generation failed:", error);
  }
  return null;
};
