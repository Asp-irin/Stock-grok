import axios from 'axios';
const ALPHA_VANTAGE_API_KEY = '7QAJBHSRN9KDZQ1R'; // replace with your real key
const BASE_URL = 'https://www.alphavantage.co/query';


// API -1
export async function getTopMoversAndLosers() {
  try {
    const res = await axios.get(BASE_URL, {
      params: {
        function: 'TOP_GAINERS_LOSERS',
        apikey: ALPHA_VANTAGE_API_KEY,
      },
      headers: {
        'User-Agent': 'axios-client',
      },
    });
    // console.log('Fetched top movers and losers:', res.data);
    return res.data;
  } catch (err) {
    console.error('Failed to fetch top movers/losers:', err);
    throw err;
  }
}

// API -2 Get Company Overview
export async function getCompanyOverview(symbol: string) {
  try {
    const res = await axios.get(BASE_URL, {
      params: {
        function: 'OVERVIEW',
        symbol,
        apikey: ALPHA_VANTAGE_API_KEY,
      },
      headers: {
        'User-Agent': 'axios-client',
      },
    });
    // console.log("company overview for", symbol, ":", res.data);
    return res.data;
  } catch (err) {
    console.error(`Failed to fetch company overview for ${symbol}:`, err);
    throw err;
  }
}

// API -3 Get Stock Data Daily
export async function getStockDataDaily(symbol: string) {
  try {
    const res = await axios.get(BASE_URL, {
      params: {
        function: 'TIME_SERIES_DAILY_ADJUSTED',
        symbol,
        apikey: ALPHA_VANTAGE_API_KEY,
      },
      headers: {
        'User-Agent': 'axios-client',
      },
    });
    console.log(`Fetched daily stock data for ${symbol}:`, res.data);
    return res.data;
  } catch (err) {
    console.error(`Failed to fetch daily stock data for ${symbol}:`, err);
    throw err;
  }
}

// API -4 Get Stock Data Weekly
export async function getStockDataWeekly(symbol: string) {
  try {
    const res = await axios.get(BASE_URL, {
      params: {
        function: 'TIME_SERIES_WEEKLY_ADJUSTED',
        symbol,
        apikey: ALPHA_VANTAGE_API_KEY,
      },
      headers: {
        'User-Agent': 'axios-client',
      },
    });
    console.log(`Fetched weekly stock data for ${symbol}:`, res.data);
    return res.data;
  } catch (err) {
    console.error(`Failed to fetch weekly stock data for ${symbol}:`, err);
    throw err;
  }
}

// API -5 Get Stock Data Monthly
export async function getStockDataMonthly(symbol: string) {
  try {
    const res = await axios.get(BASE_URL, {
      params: {
        function: 'TIME_SERIES_MONTHLY_ADJUSTED',
        symbol,
        apikey: ALPHA_VANTAGE_API_KEY,
      },
      headers: {
        'User-Agent': 'axios-client',
      },
    });
    console.log(`Fetched monthly stock data for ${symbol}:`, res.data);
    return res.data;
  } catch (err) {
    console.error(`Failed to fetch monthly stock data for ${symbol}:`, err);
    throw err;
  }
}

