import { useLocalSearchParams, useNavigation } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import { StockCard } from '../../components/StockCard'; // adjust path if needed

const allDummyData = [
  {
    name: 'Apple Inc.',
    symbol: 'AAPL',
    price: '189.25',
    changePercent: '1.53',
    logoUrl: 'https://logo.clearbit.com/apple.com',
  },
  {
    name: 'Tesla Inc.',
    symbol: 'TSLA',
    price: '723.55',
    changePercent: '2.43',
    logoUrl: 'https://logo.clearbit.com/tesla.com',
  },
  {
    name: 'Nvidia',
    symbol: 'NVDA',
    price: '924.12',
    changePercent: '3.22',
    logoUrl: 'https://logo.clearbit.com/nvidia.com',
  },
  {
    name: 'Microsoft',
    symbol: 'MSFT',
    price: '324.62',
    changePercent: '1.27',
    logoUrl: 'https://logo.clearbit.com/microsoft.com',
  },
  {
    name: 'Meta Platforms',
    symbol: 'META',
    price: '188.30',
    changePercent: '-2.81',
    logoUrl: 'https://logo.clearbit.com/meta.com',
  },
  {
    name: 'Netflix',
    symbol: 'NFLX',
    price: '359.12',
    changePercent: '-1.76',
    logoUrl: 'https://logo.clearbit.com/netflix.com',
  },
  {
    name: 'Adobe',
    symbol: 'ADBE',
    price: '552.15',
    changePercent: '-3.04',
    logoUrl: 'https://logo.clearbit.com/adobe.com',
  },
  {
    name: 'Intel',
    symbol: 'INTC',
    price: '33.25',
    changePercent: '0.85',
    logoUrl: 'https://logo.clearbit.com/intel.com',
  },
  {
    name: 'Amazon',
    symbol: 'AMZN',
    price: '130.55',
    changePercent: '1.75',
    logoUrl: 'https://logo.clearbit.com/amazon.com',
  },
  {
    name: 'Google',
    symbol: 'GOOGL',
    price: '132.41',
    changePercent: '-0.45',
    logoUrl: 'https://logo.clearbit.com/google.com',
  },
  {
    name: 'IBM',
    symbol: 'IBM',
    price: '141.05',
    changePercent: '-1.12',
    logoUrl: 'https://logo.clearbit.com/ibm.com',
  },
  {
    name: 'Oracle',
    symbol: 'ORCL',
    price: '116.52',
    changePercent: '0.96',
    logoUrl: 'https://logo.clearbit.com/oracle.com',
  },
  {
    name: 'Salesforce',
    symbol: 'CRM',
    price: '222.08',
    changePercent: '1.88',
    logoUrl: 'https://logo.clearbit.com/salesforce.com',
  },
  {
    name: 'Spotify',
    symbol: 'SPOT',
    price: '278.03',
    changePercent: '-2.45',
    logoUrl: 'https://logo.clearbit.com/spotify.com',
  },
  {
    name: 'Shopify',
    symbol: 'SHOP',
    price: '68.15',
    changePercent: '3.99',
    logoUrl: 'https://logo.clearbit.com/shopify.com',
  },
  {
    name: 'Snapchat',
    symbol: 'SNAP',
    price: '10.45',
    changePercent: '-1.25',
    logoUrl: 'https://logo.clearbit.com/snapchat.com',
  },
  {
    name: 'Uber',
    symbol: 'UBER',
    price: '56.45',
    changePercent: '1.33',
    logoUrl: 'https://logo.clearbit.com/uber.com',
  },
  {
    name: 'Twitter',
    symbol: 'TWTR',
    price: '52.10',
    changePercent: '0.75',
    logoUrl: 'https://logo.clearbit.com/twitter.com',
  },
  {
    name: 'Zoom',
    symbol: 'ZM',
    price: '69.88',
    changePercent: '-1.91',
    logoUrl: 'https://logo.clearbit.com/zoom.us',
  },
  {
    name: 'PayPal',
    symbol: 'PYPL',
    price: '71.35',
    changePercent: '2.14',
    logoUrl: 'https://logo.clearbit.com/paypal.com',
  }
];

const ITEMS_PER_PAGE = 8;

export default function ViewAllScreen() {
  const { type } = useLocalSearchParams();
  const navigation = useNavigation();

  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(allDummyData.length / ITEMS_PER_PAGE);

  const currentData = allDummyData.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  useEffect(() => {
    navigation.setOptions({
      title: decodeURIComponent(type as string),
    });
  }, [type]);

  return (
    <View style={styles.container}>
      <FlatList
        data={currentData}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        keyExtractor={(item) => item.symbol}
        renderItem={({ item }) => (
          <StockCard
            name={item.name}
            symbol={item.symbol}
            price={item.price}
            changePercent={item.changePercent}
            logoUrl={item.logoUrl}
          />
        )}
      />

      <View style={styles.paginationContainer}>
        <Button
          title="Previous"
          onPress={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        />
        <Text style={styles.pageText}>
          Page {page} of {totalPages}
        </Text>
        <Button
          title="Next"
          onPress={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 0,
  },
  pageText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});
