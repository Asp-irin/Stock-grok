import { useLocalSearchParams, useNavigation } from 'expo-router';
import React, { useEffect } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { StockCard } from '../../components/StockCard'; // Adjust the import path as needed

const dummyData = [
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
    }
];

export default function ViewAllScreen() {
  var { type } = useLocalSearchParams();
  type = decodeURIComponent(type as string);
  const navigation = useNavigation();

  const stocks = dummyData;

  useEffect(() => {
    navigation.setOptions({
      // title: type === 'movers' ? 'Top Movers' : type === 'losers' ? 'Top Losers' : 'Stocks',
      title: type
    });
  }, [type]);

  return (
    <View style={styles.container}>
      <FlatList
        data={stocks}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
});
