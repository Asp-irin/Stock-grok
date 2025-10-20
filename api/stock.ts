import axios from 'axios';

const ALPHA_VANTAGE_API_KEY = 'C25LBRELCW6XVWM9'; // Replace with your real key
const BASE_URL = 'https://www.alphavantage.co/query';

function handleAlphaVantageErrors(data: any, functionName: string) {
  if (!data || Object.keys(data).length === 0) {
    throw new Error(`${functionName} returned empty data`);
  }

  if (data.Note) {
    throw new Error(`Rate limit hit for ${functionName}: ${data.Note}`);
  }

  if (data.Information) {
    throw new Error(`Alpha Vantage error in ${functionName}: ${data.Information}`);
  }

  return data;
}

// API -1: Get Top Movers and Losers
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

    console.log('Fetched top movers and losers:', res.data);
    return handleAlphaVantageErrors(res.data, 'TOP_GAINERS_LOSERS');
  } catch (err) {
    console.error('Failed to fetch top movers/losers:', err);
    throw err;
  }
}

// API -2: Get Company Overview
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

    console.log('Company overview for', symbol, ':', res.data);
    return handleAlphaVantageErrors(res.data, 'OVERVIEW');
  } catch (err) {
    console.error(`Failed to fetch company overview for ${symbol}:`, err);
    throw err;
  }
}

// API -3: Get Stock Data Daily
export async function getStockDataDaily(symbol: string) {
  try {
    const res = await axios.get(BASE_URL, {
      params: {
        function: 'TIME_SERIES_DAILY',
        symbol,
        apikey: ALPHA_VANTAGE_API_KEY,
      },
      headers: {
        'User-Agent': 'axios-client',
      },
    });

    console.log(`Fetched daily stock data for ${symbol}:`, res.data);
    return handleAlphaVantageErrors(res.data, 'TIME_SERIES_DAILY');
  } catch (err) {
    console.error(`Failed to fetch daily stock data for ${symbol}:`, err);
    throw err;
  }
}

// API -4: Get Stock Data Weekly
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
    return handleAlphaVantageErrors(res.data, 'TIME_SERIES_WEEKLY_ADJUSTED');
  } catch (err) {
    console.error(`Failed to fetch weekly stock data for ${symbol}:`, err);
    throw err;
  }
}

// API -5: Get Stock Data Monthly
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
    return handleAlphaVantageErrors(res.data, 'TIME_SERIES_MONTHLY_ADJUSTED');
  } catch (err) {
    console.error(`Failed to fetch monthly stock data for ${symbol}:`, err);
    throw err;
  }
}
