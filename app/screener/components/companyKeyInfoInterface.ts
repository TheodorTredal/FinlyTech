export interface CompanyKeyInfoInterface {
    Symbol: string;
    AssetType: string;
    Name: string;
    Description: string;
    CIK: string;
    Exchange: string;
    Currency: string;
    Country: string;
    Sector: string;
    Industry: string;
    Address: string;
    OfficialSite: string;
    FiscalYearEnd: string;
    LatestQuarter: string;
    MarketCapitalization: string;  // Kan være veldig stort, så string er ok
    EBITDA: string;                // Ofte store tall, string for sikkerhet
    PERatio: string | null;       // Kan være null hvis ikke tilgjengelig
    PEGRatio: string | null;
    BookValue: string | null;
    DividendPerShare: string | null;
    DividendYield: string | null;
    EPS: string | null;
    RevenuePerShareTTM: string | null;
    ProfitMargin: string | null;
    OperatingMarginTTM: string | null;
    ReturnOnAssetsTTM: string | null;
    ReturnOnEquityTTM: string | null;
    RevenueTTM: string;
    GrossProfitTTM: string;
    DilutedEPSTTM: string | null;
    QuarterlyEarningsGrowthYOY: string | null;
    QuarterlyRevenueGrowthYOY: string | null;
    AnalystTargetPrice: string | null;
    AnalystRatingStrongBuy: string | null;
    AnalystRatingBuy: string | null;
    AnalystRatingHold: string | null;
    AnalystRatingSell: string | null;
    AnalystRatingStrongSell: string | null;
    TrailingPE: string | null;
    ForwardPE: string | null;
    PriceToSalesRatioTTM: string | null;
    PriceToBookRatio: string | null;
    EVToRevenue: string | null;
    EVToEBITDA: string | null;
    Beta: string | null;
    "52WeekHigh": string | null;
    "52WeekLow": string | null;
    "50DayMovingAverage": string | null;
    "200DayMovingAverage": string | null;
    SharesOutstanding: string;
    SharesFloat: string | null;
    PercentInsiders: string | null;
    PercentInstitutions: string | null;
    DividendDate: string | null;       // ISO-dato string, eller null
    ExDividendDate: string | null;
  }
  