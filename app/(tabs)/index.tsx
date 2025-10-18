import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { getTopMoversAndLosers } from '../../api/stock';
import { StockSection } from '../../components/StockSection';
import { useStockStore } from '../../store/useStockStore'; // ✅ import Zustand store
import { transformStock } from '../../util/util';

export default function HomeScreen() {
  const router = useRouter();
  const { topMovers, topLosers, setTopMovers, setTopLosers, isDataStale } = useStockStore();
  // console.log('Top Movers:', topMovers);

  useEffect(() => {
    const fetchData = async () => {
      // Check if data is stale
      if (!isDataStale()) {
        console.log('Using cached data');
        return; // Data is fresh, no need to fetch
      }
      else{
      const data = await getTopMoversAndLosers();
      if (data) {
        const movers = data.top_gainers.map(transformStock);
        const losers = data.top_losers.map(transformStock);
        console.log("fetched due to call one")
        setTopMovers(movers);
        setTopLosers(losers);
      } else {
        console.error('Failed to fetch top movers and losers');
      }
    }
    };
      fetchData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Stock Grok</Text>
        <TextInput
          placeholder="Search"
          placeholderTextColor="#888"
          style={styles.searchBar}
        />
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
