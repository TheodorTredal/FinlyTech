import { ScriptableLineSegmentContext } from "chart.js";

export interface AssetInterface {
    symbol: string;
    name: string;
    asset_type: "stock" | "etf" | "index";
    exchange: string;
    currency: string;
    sector: string;
    industry: string;
}

export interface HoldingInterface {
    asset: AssetInterface;
    quantity: number; // DecimalField -> string
    avg_price: number; // DecimalField -> string
    currency: string;
}

export interface PortfolioInterface {
    id: number;
    title: string;
    base_currency: string;
    created_at: string;
    holdings: HoldingInterface[]
}


// Input-DTO (kun frontend → backend)
export interface CreateHoldingPayload {
  symbol: string;
  avg_price: number;
  quantity: number;
  note?: string;
}