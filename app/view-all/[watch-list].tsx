import { useStockStore } from '@/store/useStockStore';
import { useWatchlistStore } from '@/store/useWacthlistStore';
import { Stock } from '@/util';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import { StockCard } from '../../components/StockCard'; // adjust path if needed


const ITEMS_PER_PAGE = 10;

export default function ViewAllScreen() {
  const navigation = useNavigation();
  const type = String(useLocalSearchParams().type);
  const { topMovers, topLosers } = useStockStore();
  const { getStocksFromWatchlist,watchlists } = useWatchlistStore();
  const { getStock } = useStockStore();

  const [page, setPage] = useState(1);
  const [allData, setAllData] = useState<Stock[]>([]);
  const [currentPageData, setCurrentPageData] = useState<Stock[]>([]);


useEffect(() => {
  navigation.setOptions({ headerTitle: `${type}` });

  const tickers = getStocksFromWatchlist(type);

  const fullData = tickers
    .map((ticker) => {
      const stock = getStock(ticker);
      if (!stock) console.warn(`No stock data found for ticker: ${ticker}`);
      return stock;
    })
    .filter((s): s is Stock => !!s);

  setAllData(fullData);
  setPage(1); // Reset page to 1 when `type` changes
}, [type,watchlists,topMovers,topLosers]);


useEffect(() => {
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  setCurrentPageData(allData.slice(startIndex, endIndex));
}, [page, allData]);

const totalPages = Math.ceil((allData ? allData.length : 0) / ITEMS_PER_PAGE);


  return (
    <View style={styles.container}>
      <FlatList
        data={currentPageData}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        keyExtractor={(item) => item.ticker}
        renderItem={({ item }) => (
          <StockCard
                      ticker={item.ticker}
                      price={item.price}
                      changePrice={item.changePrice}
                      changePercent={item.changePercent}
                    />
        )}
      />
  {/* // if pages are 0 remove pagination */}
  {totalPages > 0 && (
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
  )
  }
      
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
