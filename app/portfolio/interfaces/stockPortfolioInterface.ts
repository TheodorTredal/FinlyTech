
export interface stockPortfolioInterface {
    ticker: string; 
    price: number;
    volum: number; 
    prosentØkning: string; 
    currentPrice: number;
    setShowOptions: any;
}

export interface portfolioEntryInterface {
    ticker: string; 
    price: number | null;
    volum: number | null; 
}