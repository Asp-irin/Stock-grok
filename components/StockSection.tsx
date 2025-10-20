import { useStockStore } from '@/store/useStockStore';
import React, { useEffect, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { Stock } from '../util';
import { StockCard } from './StockCard';
import { useStyles } from '../hooks/useStyle';

type StockSectionProps = {
  title: string;
  onPressViewAll?: () => void;
  stocks: string[];
};

export const StockSection = ({ title, onPressViewAll, stocks = [] }: StockSectionProps) => {
  const { getStock } = useStockStore();
  const [stockData, setStockData] = useState<Stock[]>([]);
  const { styles, theme } = useStyles();

  useEffect(() => {
    const resolved = stocks
      .map((ticker) => {
        const stock = getStock(ticker);
        if (!stock) console.warn(`No stock data found for ticker: ${ticker}`);
        return stock;
      })
      .filter((s): s is Stock => !!s);

    setStockData(resolved);
  }, [stocks, getStock]);

  return (
    <View style={{ marginBottom: 24 }}>
      <View style={styles.rowSpaceBetween}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>{title}</Text>
        {onPressViewAll && (
          <TouchableOpacity onPress={onPressViewAll}>
            <Text style={[styles.viewAll, { color: theme.secondaryText }]}>View All {'>'}</Text>
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={stockData.slice(0, 4)}
        keyExtractor={(item) => item.ticker}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        renderItem={({ item }) => (
          <StockCard
            ticker={item.ticker}
            price={item.price}
            changePrice={item.changePrice}
            changePercent={item.changePercent}
          />
        )}
        scrollEnabled={false}
      />
    </View>
  );
};
