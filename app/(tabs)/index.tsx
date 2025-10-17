import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { getTopMoversAndLosers } from '../../api/stock'; // adjust path as needed
import { StockSection } from '../../components/StockSection'; // adjust path as needed

export default function HomeScreen() {
  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      const data = await getTopMoversAndLosers();
      // console.log('Top Movers and Losers:', data);
    };

    fetchData();
  }, []);
  const dummyStocks = [
    {
      name: 'Apple Inc.',
      logo: 'AAPL',
      price: '189.25',
      changePercent: '1.53',
      logoUrl: 'https://logo.clearbit.com/apple.com',
    },
    {
      name: 'Tesla Inc.',
      logo: 'TSLA',
      price: '723.55',
      changePercent: '-2.43',
      logoUrl: 'https://logo.clearbit.com/tesla.com',
    },
    {
      name: 'Amazon',
      logo: 'AMZN',
      price: '132.75',
      changePercent: '0.75',
      logoUrl: 'https://logo.clearbit.com/amazon.com',
    },
    {
      name: 'Google',
      logo: 'GOOGL',
      price: '2753.15',
      changePercent: '-0.68',
      logoUrl: 'https://logo.clearbit.com/google.com',
    },
  ];

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
          stocks={dummyStocks}
          onPressViewAll={() => router.navigate(`/view-all/${encodeURIComponent('Top Movers')}`)}
        />

        <StockSection
          title="Top Losers"
          stocks={dummyStocks}
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
    gap: 8, // If not supported, use marginLeft on searchBar
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
