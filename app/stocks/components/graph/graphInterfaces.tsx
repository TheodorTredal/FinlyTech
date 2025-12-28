export interface StockDataItem {
    close: number;
    date?: string;
    [key: string]: any
}

export interface ChartDataPoint {
    close: number;
    index: number;
    date?: string;
    [key: string]: any; // Allow for other properties
  }
  

export type SelectedPoint = {
  index: number;
  close: number;
};


export interface ChartDataWithTrend extends ChartDataPoint {
    trendValue: number | null;
  }


export type StockChartResponse = {
    chart: ChartDataPoint[];
    growth_percentage: string
}

export type TimeInterval = "1mo" | "6mo" | "1y" | "ytd" | "3y" | "5y" | "10y" | "all"

export interface SelectTimeIntervalProps {
    currentTimeInterval: TimeInterval;
    setCurrentTimeInterval: (interval: TimeInterval) => void;
    growthPercentage: string;
    trendLinePercentage: number | null;
    price: number | null;
}

export type IndicatorKey = "sma30" | "sma90" | "sma180";



