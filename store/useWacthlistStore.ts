import { StockWithWatchlistStatus, Watchlist } from '@/util';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';


type WatchlistStore = {
  watchlists: Watchlist[];

  // Derived status
  getStockWatchlistStatus: (symbol: string) => StockWithWatchlistStatus;
  getStocksFromWatchlist: (watchlistName: string) => string[];
  // CRUD
  addWatchlist: (name: string) => void;
  removeWatchlist: (name: string) => void;

  addStockToWatchlist: (watchlistName: string, symbol: string) => void;
  removeStockFromWatchlist: (watchlistName: string, symbol: string) => void;
  toggleStockInWatchlist: (watchlistName: string, symbol: string) => void;
};

export const useWatchlistStore = create<WatchlistStore>()(
  persist(
    (set, get) => ({
      watchlists: [],

      getStockWatchlistStatus: (symbol) => {
        const lists = get().watchlists.filter(wl => wl.stocks.includes(symbol));
        // Provide default values for the required fields
        return {
          isInWatchlist: lists.length > 0,
          watchlistNames: lists.map(wl => wl.name),
        };
      },

      getStocksFromWatchlist: (watchlistName) => {
    const list = get().watchlists.find(wl => wl.name === watchlistName);
    return list ? list.stocks : [];
  },

      addWatchlist: (name) => {
        const now = new Date().toISOString();
        const exists = get().watchlists.some(wl => wl.name === name);
        if (exists) return;
        const newWatchlist: Watchlist = {
          name,
          stocks: [],
          created_at: now,
          updated_at: now,
        };
        set(state => ({
          watchlists: [...state.watchlists, newWatchlist],
        }));
      },

      removeWatchlist: (name) => {
        set(state => ({
          watchlists: state.watchlists.filter(wl => wl.name !== name),
        }));
      },

      addStockToWatchlist: (watchlistName, symbol) => {
        const now = new Date().toISOString();
        set(state => ({
          watchlists: state.watchlists.map(wl =>
            wl.name === watchlistName && !wl.stocks.includes(symbol)
              ? { ...wl, stocks: [...wl.stocks, symbol], updated_at: now }
              : wl
          ),
        }));
      },

      removeStockFromWatchlist: (watchlistName, symbol) => {
        const now = new Date().toISOString();
        set(state => ({
          watchlists: state.watchlists.map(wl =>
            wl.name === watchlistName
              ? { ...wl, stocks: wl.stocks.filter(s => s !== symbol), updated_at: now }
              : wl
          ),
        }));
      },

      toggleStockInWatchlist: (watchlistName, symbol) => {
        const store = get();
        const target = store.watchlists.find(wl => wl.name === watchlistName);
        if (!target) return;
        if (target.stocks.includes(symbol)) {
          store.removeStockFromWatchlist(watchlistName, symbol);
        } else {
          store.addStockToWatchlist(watchlistName, symbol);
        }
      },
    }),
    {
      name: 'watchlist-store',
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
