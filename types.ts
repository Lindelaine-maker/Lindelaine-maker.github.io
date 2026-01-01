
export interface ProductData {
  name: string;
  description: string;
  price: string;
  category: string;
  affiliateLink: string;
  customInstructions?: string;
}

export interface PromptTemplate {
  id: string;
  label: string;
  category: string;
  customInstructions: string;
}

export interface GeneratedContent {
  instagramCaption: string;
  tiktokScript: string;
  googleAds: {
    headlines: string[];
    descriptions: string[];
  };
  hashtags: string;
}

export interface AutomatedTask {
  id: string;
  productName: string;
  platform: string;
  status: 'searching' | 'generating' | 'publishing' | 'success';
  timestamp: string;
}

export interface Campaign {
  id: string;
  name: string;
  status: 'active' | 'draft' | 'completed';
  clicks: number;
  sales: number;
  commission: number;
  date: string;
}

export enum Tab {
  Dashboard = 'dashboard',
  Automation = 'automation',
  Visuals = 'visuals',
  Tracking = 'tracking',
  Integrations = 'integrations'
}

export interface AccountIntegration {
  platform: string;
  icon: string;
  connected: boolean;
  username?: string;
  color: string;
}
