import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ChartRange = '1W' | '1M' | '1Y';

type ChartStore = {
  chartData: {
    [symbol: string]: {
      [range in ChartRange]?: any;
    };
  };
  setChartData: (symbol: string, range: ChartRange, data: any) => void;
  getChartData: (symbol: string, range: ChartRange) => any;
  hasChartData: (symbol: string, range: ChartRange) => boolean;
  clearChartData: () => void;
};

export const useChartStore = create<ChartStore>()(
  persist(
    (set, get) => ({
      chartData: {},

      setChartData: (symbol, range, data) => {
        set((state) => ({
          chartData: {
            ...state.chartData,
            [symbol]: {
              ...state.chartData[symbol],
              [range]: data,
            },
          },
        }));
      },

      getChartData: (symbol, range) => {
        return get().chartData[symbol]?.[range];
      },

      hasChartData: (symbol, range) => {
        return !!get().chartData[symbol]?.[range];
      },

      clearChartData: () => {
        set({ chartData: {} });
      },
    }),
    {
      name: 'chart-store',
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
