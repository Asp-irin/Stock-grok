import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { StockDetail } from "../util"; // Adjust path as needed

type StockDetailMap = Record<string, StockDetail>;

type StockDetailStore = {
  stockDetails: StockDetailMap;
  lastFetched: Record<string, number>; // Keeps track per symbol
  setStockDetail: (symbol: string, detail: StockDetail) => void;
  getStockDetail: (symbol: string) => StockDetail | undefined;
  isDetailStale: (symbol: string, maxAge?: number) => boolean;
};


const getNextMondayUSEasternMorning9AM = () => {
  const now = new Date();
  // Get current date in America/New_York timezone
  const nyDateStr = Intl.DateTimeFormat('en-US', {
    timeZone: 'America/New_York',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(now);
  // Parse to yyyy-mm-dd
  const [month, day, year] = nyDateStr.split('/');
  const nyDate = new Date(`${year}-${month}-${day}T09:00:00-04:00`); // -04:00 is EDT, -05:00 is EST

  // Find next Monday
  const dayOfWeek = nyDate.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  let daysUntilMonday = (8 - dayOfWeek) % 7;
  if (daysUntilMonday === 0 && now >= nyDate) {
    daysUntilMonday = 7;
  }
  const nextMonday = new Date(nyDate);
  nextMonday.setDate(nyDate.getDate() + daysUntilMonday);

  // Set time to 9:00 AM America/New_York
  const nextMondayStr = Intl.DateTimeFormat('en-US', {
    timeZone: 'America/New_York',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(nextMonday);
  const [m, d, y] = nextMondayStr.split('/');
  const nextMonday9am = new Date(`${y}-${m}-${d}T09:00:00-04:00`);
  return nextMonday9am.getTime();
};

const msUntilNextMondayUSEasternMorning9AM = () => getNextMondayUSEasternMorning9AM() - Date.now();

// Use this as your max age for staleness
const DEFAULT_MAX_AGE = msUntilNextMondayUSEasternMorning9AM();

export const useStockDetailStore = create<StockDetailStore>()(
  persist(
    (set, get) => ({
      stockDetails: {},
      lastFetched: {},

      setStockDetail: (symbol, detail) =>
        set((state) => ({
          stockDetails: { ...state.stockDetails, [symbol]: detail },
          lastFetched: { ...state.lastFetched, [symbol]: Date.now() },
        })),

      getStockDetail: (symbol) => get().stockDetails[symbol],

      isDetailStale: (symbol, maxAge = DEFAULT_MAX_AGE) => {
        const last = get().lastFetched[symbol];
        if (!last) return true;
        return Date.now() - last > maxAge;
      },
    }),
    {
      name: "stock-detail-store",
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
