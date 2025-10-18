import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Stock } from '../util'; // adjust path as needed
import { StockCard } from './StockCard';

type StockSectionProps = {
  title: string;
  onPressViewAll?: () => void;
  stocks: Stock[];
};

export const StockSection = ({ title, onPressViewAll, stocks = [] }: StockSectionProps) => {
  return (
    <View style={styles.section}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        {onPressViewAll && (
          <TouchableOpacity onPress={onPressViewAll}>
            <Text style={styles.viewAll}>View All</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* 2-column Grid of StockCards */}
      <FlatList
        data={stocks.slice(0, 4)} // show only top 4
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
        scrollEnabled={false} // since it's inside a scrollable parent
      />
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  viewAll: {
    fontSize: 14,
    color: '#007AFF',
  },
});
