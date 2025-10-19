export interface Stock {
  ticker: string;           // "AAPL"
  price: number;            // 150.25
  changePrice: number;     // 2.50
  changePercent: number;   // 1.69
  volume?: number;           // 50000000
}

export interface PricePoint {
  date: string;    // "2024-01-15"
  price: number;   // 150.25
}

export interface TimeframeData {
  data: PricePoint[];
  lastUpdated: string;
}

export interface Weekly {
  data: PricePoint[];
  lastUpdated: string;
}

export interface Monthly {
  data: PricePoint[];
  lastUpdated: string;
}

export interface StockDetail extends Stock {
  name: string;             // "Apple Inc."
  description: string;      // Company description
  sector: string;           // "Technology"
  industry: string;         // "Consumer Electronics"
  "52WeekHigh": number;
  "52WeekLow": number;     // 199.62
  marketCap: number;       // 2400000000000
  peRatio: number;         // 28.5
  beta: number;             // 1.2
  dividendYield: number;         // 0.96
  profitMargin: number;    // 0.25
  // Chart data
  // daily: Daily;
  // weekly: Weekly;
  // monthly: Monthly;
}

export interface Watchlist {
  name: string;            // "My Tech Stocks"
  stocks: string[];        // ["AAPL", "MSFT", "GOOGL"]
  created_at: string;      // "2024-01-15T10:30:00Z"
  updated_at: string;      // "2024-01-15T10:30:00Z"
}

// we will use the functions from stockDetail
export interface StockWithWatchlistStatus {
  isInWatchlist: boolean;
  watchlistNames: string[];
}

export type RawStockApiItem = {
  ticker: string;             // e.g. "OST"
  price: string;              // e.g. "0.55"
  change_amount: string;      // e.g. "-8.47"
  change_percentage: string;  // e.g. "-93.9024%"
  volume: string;             // e.g. "36912485"
};

export interface RawStockDetailApiItem {
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
  MarketCapitalization: string;
  EBITDA: string;
  PERatio: string;
  PEGRatio: string;
  BookValue: string;
  DividendPerShare: string;
  DividendYield: string;
  EPS: string;
  RevenuePerShareTTM: string;
  ProfitMargin: string;
  OperatingMarginTTM: string;
  ReturnOnAssetsTTM: string;
  ReturnOnEquityTTM: string;
  RevenueTTM: string;
  GrossProfitTTM: string;
  DilutedEPSTTM: string;
  QuarterlyEarningsGrowthYOY: string;
  QuarterlyRevenueGrowthYOY: string;
  AnalystTargetPrice: string;
  AnalystRatingStrongBuy: string;
  AnalystRatingBuy: string;
  AnalystRatingHold: string;
  AnalystRatingSell: string;
  AnalystRatingStrongSell: string;
  TrailingPE: string;
  ForwardPE: string;
  PriceToSalesRatioTTM: string;
  PriceToBookRatio: string;
  EVToRevenue: string;
  EVToEBITDA: string;
  Beta: string;
  "52WeekHigh": string;
  "52WeekLow": string;
  "50DayMovingAverage": string;
  "200DayMovingAverage": string;
  SharesOutstanding: string;
  DividendDate: string;
  ExDividendDate: string;
}
