import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { getTopMoversAndLosers } from '../../api/stock';
import { StockSection } from '../../components/StockSection';
import { useStockStore } from '../../store/useStockStore'; // ✅ import Zustand store
import { Stock } from '../../util/index';
import { transformStock } from '../../util/util';

export default function HomeScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const { topMovers, topLosers, setTopMovers, setTopLosers, isDataStale,setStock } = useStockStore();

  useEffect(() => {
    const fetchData = async () => {
      // Check if data is stale
      if (!isDataStale()) {
         setLoading(false);
        console.log('Using cached data');
        return; // Data is fresh, no need to fetch
      }
      else{
      const data = await getTopMoversAndLosers();
      if (data) {
  const topGainers:Stock[] = data.top_gainers.map(transformStock); // full Stock[]
  const topLosers:Stock[] = data.top_losers.map(transformStock);   // full Stock[]

  const topGainerTickers = topGainers.map(stock => stock.ticker);
  const topLoserTickers = topLosers.map(stock => stock.ticker);

  console.log("fetched due to call two");
  console.log('Top Gainers:', topGainers);
  console.log('Top Losers:', topLosers);
  console.log('Top Gainer Tickers:', topGainerTickers);
  console.log('Top Loser Tickers:', topLoserTickers);

  // ✅ Save only tickers for quick access
  setTopMovers(topGainerTickers);
  setTopLosers(topLoserTickers);

  // ✅ Save full stock details in global store
  topGainers.forEach(setStock);
  topLosers.forEach(setStock);
}
 else {
        console.error('Failed to fetch top movers and losers');
      }
    }
     setLoading(false);
    };
      fetchData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Stock Grok</Text>
      </View>

      {/* Body */}
      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
        <StockSection
          title="Top Movers"
          stocks={topMovers}
          onPressViewAll={() => router.navigate(`/view-all/${encodeURIComponent('Top Movers')}`)}
        />

        <StockSection
          title="Top Losers"
          stocks={topLosers}
          onPressViewAll={() => router.navigate(`/view-all/${encodeURIComponent('Top Losers')}`)}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingTop: 32,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
    paddingVertical: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginRight: 8,
  },
  searchBar: {
    flex: 1,
    height: 40,
    backgroundColor: '#e5e5e5',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  body: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
  },
});
