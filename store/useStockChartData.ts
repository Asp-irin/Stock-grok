import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ChartRange = '1W' | '1M' | '1Y';

type CachedData = {
  data: any;
  timestamp: number;
};

type ChartStore = {
  chartData: {
    [symbol: string]: {
      [range in ChartRange]?: CachedData;
    };
  };
  setChartData: (symbol: string, range: ChartRange, data: any) => void;
  getChartData: (symbol: string, range: ChartRange) => any;
  hasChartData: (symbol: string, range: ChartRange) => boolean;
  isChartDataStale: (symbol: string, range: ChartRange) => boolean;
  clearChartData: () => void;
};

// Get timestamp for next 9 AM US Eastern Time
const getNextUSEasternMorning9AM = () => {
  const now = new Date();
  const nyDateParts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/New_York',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
    .formatToParts(now)
    .reduce((acc, part) => {
      if (part.type !== 'literal') acc[part.type] = part.value;
      return acc;
    }, {} as Record<string, string>);
  const ny9amString = `${nyDateParts.year}-${nyDateParts.month}-${nyDateParts.day}T09:00:00`;
  const ny9am = new Date(
    new Date(ny9amString + '-05:00').toLocaleString('en-US', { timeZone: 'America/New_York' })
  );
  if (now >= ny9am) {
    ny9am.setDate(ny9am.getDate() + 1);
  }
  return ny9am.getTime();
};

const msUntilNextUSEasternMorning9AM = () => getNextUSEasternMorning9AM() - Date.now();

// Get timestamp for next day start (midnight)
const getNextDayStart = () => {
  const now = new Date();
  const nextDay = new Date(now);
  nextDay.setHours(0, 0, 0, 0);
  nextDay.setDate(nextDay.getDate() + 1);
  return nextDay.getTime();
};

// Get timestamp for next month start (midnight)
const getNextMonthStart = () => {
  const now = new Date();
  const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  nextMonth.setHours(0, 0, 0, 0);
  return nextMonth.getTime();
};

const msUntilNextDayStart = () => getNextDayStart() - Date.now();
const msUntilNextMonthStart = () => getNextMonthStart() - Date.now();

const CACHE_DURATIONS: Record<ChartRange, number> = {
  '1W': msUntilNextUSEasternMorning9AM(),
  '1M': msUntilNextDayStart(),
  '1Y': msUntilNextMonthStart(),
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
              [range]: {
                data,
                timestamp: Date.now(),
              },
            },
          },
        }));
      },

      getChartData: (symbol, range) => {
        const cached = get().chartData[symbol]?.[range];
        return cached ? cached.data : undefined;
      },

      hasChartData: (symbol, range) => {
        return !!get().chartData[symbol]?.[range];
      },

      isChartDataStale: (symbol, range) => {
        const cached = get().chartData[symbol]?.[range];
        if (!cached) return true;
        const now = Date.now();
        const cacheDuration = CACHE_DURATIONS[range];
        return now - cached.timestamp > cacheDuration;
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
