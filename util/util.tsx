import {  RawStockApiItem, RawStockDetailApiItem, Stock, StockDetail, Weekly } from '.';

export const transformStock = (raw: RawStockApiItem): Stock => ({
  ticker: raw.ticker,
  price: parseFloat(raw.price),
  changePrice: parseFloat(raw.change_amount),
  changePercent: parseFloat(raw.change_percentage.replace('%', '')),
  volume: parseInt(raw.volume)
});

export const transformStockDetail = (raw: RawStockDetailApiItem): StockDetail => ({
  ticker: raw.Symbol,
  price: 0,
  changePrice: 0,
  changePercent: 0,
  volume: 0,
  // Overview data
  name: raw.Name,
  description: raw.Description,
  sector: raw.Sector,
  industry: raw.Industry,
  "52WeekHigh": parseFloat(raw["52WeekHigh"]),
  "52WeekLow": parseFloat(raw["52WeekLow"]),
  marketCap: parseFloat(raw.MarketCapitalization),
  peRatio: parseFloat(raw.PERatio),
  beta: parseFloat(raw.Beta),
  profitMargin: parseFloat(raw.ProfitMargin),
  dividendYield: parseFloat(raw.DividendYield),
  // daily: null as unknown as Daily,     // will set later
  // weekly: null as unknown as Weekly,   // will set later
  // monthly: null as unknown as Monthly, // will set later
});