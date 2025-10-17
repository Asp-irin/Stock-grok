import axios from 'axios';
const ALPHA_VANTAGE_API_KEY = '3LMISWFK4Z4V4LR0'; // replace with your real key
const BASE_URL = 'https://www.alphavantage.co/query';

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

    return res.data;
  } catch (err) {
    console.error('Failed to fetch top movers/losers:', err);
    throw err;
  }
}


// 1. Fetch Top Movers
export async function getTopMovers() {
  const res = await axios.get(`${BASE_URL}/stocks/movers`);
  // console.log(res.data);
  return res.data;
}

// 2. Fetch Top Losers
export async function getTopLosers() {
  const res = await axios.get(`${BASE_URL}/stocks/losers`);
  return res.data;
}

// 3. Fetch Individual Stock Data
export async function getStockBySymbol(symbol: string) {
  const res = await axios.get(`${BASE_URL}/stocks/${symbol}`);
  return res.data;
}
