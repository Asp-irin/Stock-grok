import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Stock } from '../util'; // Adjust path as needed

type StockStore = {
  topMovers: String[];
  topLosers: Stock[];
  lastFetched: number | null;
  setTopMovers: (stocks: Stock[]) => void;
  setTopLosers: (stocks: Stock[]) => void;
  isDataStale: (maxAge?: number) => boolean;
};

const DEFAULT_MAX_AGE = 50 * 60 * 1000; // 50 minutes

// const topMoversRaw = [
//   {
//     ticker: "CYN",
//     price: "13.6",
//     change_amount: "8.59",
//     change_percentage: "171.4571%",
//     volume: "137178577",
//   },
//   {
//     ticker: "ASTI",
//     price: "2.84",
//     change_amount: "1.675",
//     change_percentage: "143.7768%",
//     volume: "110799996",
//   },
//   {
//     ticker: "ADIL",
//     price: "0.4698",
//     change_amount: "0.2238",
//     change_percentage: "90.9756%",
//     volume: "272354215",
//   },
//   {
//     ticker: "LIVE",
//     price: "15.7",
//     change_amount: "7.25",
//     change_percentage: "85.7988%",
//     volume: "2582524",
//   },
//   {
//     ticker: "BIAFW",
//     price: "0.2251",
//     change_amount: "0.0951",
//     change_percentage: "73.1538%",
//     volume: "17062",
//   },
// ];

// const topLosersRaw = [
//   {
//     ticker: "OST",
//     price: "0.55",
//     change_amount: "-8.47",
//     change_percentage: "-93.9024%",
//     volume: "36912485",
//   },
//   {
//     ticker: "GVH",
//     price: "0.1785",
//     change_amount: "-0.5186",
//     change_percentage: "-74.3939%",
//     volume: "62072362",
//   },
//   {
//     ticker: "NXLIW",
//     price: "0.0301",
//     change_amount: "-0.0467",
//     change_percentage: "-60.8073%",
//     volume: "35",
//   },
//   {
//     ticker: "ALT",
//     price: "3.61",
//     change_amount: "-4.1",
//     change_percentage: "-53.1777%",
//     volume: "85007668",
//   },
//   {
//     ticker: "RVPH",
//     price: "0.358",
//     change_amount: "-0.4057",
//     change_percentage: "-53.123%",
//     volume: "21155042",
//   },
// ];

export const useStockStore = create<StockStore>()(
  persist(
    (set, get) => ({
      topMovers: [],
      topLosers: [],
      lastFetched: null,

      setTopMovers: (stocks) =>
        set({ topMovers: stocks.map((item)=> item.ticker), lastFetched: Date.now() }),

      setTopLosers: (stocks) =>
        set({ topLosers: stocks, lastFetched: Date.now() }),

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

// need to add async storage here!
