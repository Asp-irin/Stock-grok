import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Stock } from '../util';

type StockStore = {
  topMovers: string[];
  topLosers: string[];
  stocks: Stock[];
  setStock: (Stock: Stock) => void;
  getStock: (ticker: string) => Stock | undefined;
  lastFetched: number | null;
  setTopMovers: (ticker: string[]) => void;
  setTopLosers: (ticker: string[]) => void;
  isDataStale: (maxAge?: number) => boolean;
};

// Returns next 9 AM US Eastern Time in ms
const getNextUSEasternMorning9AM = () => {
  const now = new Date();
  const ny = new Date(
    Intl.DateTimeFormat('en-US', {
      timeZone: 'America/New_York',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(now)
      .replace(/(\d+)\/(\d+)\/(\d+)/, '$3-$1-$2') + 'T09:00:00'
  );
  let next = ny;
  if (now >= ny) {
    next = new Date(ny.getTime() + 24 * 60 * 60 * 1000);
  }
  return next.getTime();
};

const msUntilNextUSEasternMorning9AM = () => getNextUSEasternMorning9AM() - Date.now();
const DEFAULT_MAX_AGE = msUntilNextUSEasternMorning9AM();

export const useStockStore = create<StockStore>()(
  persist(
    (set, get) => ({
      topMovers: [],
      topLosers: [],
      lastFetched: null,
      stocks: [],

      setTopMovers: (stocks) =>
        set({ topMovers: stocks, lastFetched: Date.now() }),

      setTopLosers: (stocks) =>
        set({ topLosers: stocks, lastFetched: Date.now() }),

      setStock: (stock) =>
        set((state) => {
          const existingIndex = state.stocks.findIndex((s) => s.ticker === stock.ticker);
          const updatedStocks = [...state.stocks];
          if (existingIndex !== -1) {
            updatedStocks[existingIndex] = stock;
          } else {
            updatedStocks.push(stock);
            console.log(`[StockStore] Added new stock: ${stock.ticker}`);
          }
          return { stocks: updatedStocks };
        }),

      getStock: (ticker) => {
        const { stocks } = get();
        return stocks.find((s) => s.ticker === ticker);
      },

      isDataStale: (maxAge = DEFAULT_MAX_AGE) => {
        const { lastFetched } = get();
        if (!lastFetched) return true;
        return Date.now() - lastFetched > maxAge;
      },
    }),
    {
      name: 'stock-cache-store',
      storage: {
        getItem: async (name) => {
          const value = await AsyncStorage.getItem(name);
          return value ? JSON.parse(value) : null;
        },
        setItem: async (name, value) => {
          await AsyncStorage.setItem(name, JSON.stringify(value));
          console.log(`[AsyncStorage] SET "${name}":`, value);
        },
        removeItem: async (name) => {
          await AsyncStorage.removeItem(name);
        },
      },
    }
  )
);
