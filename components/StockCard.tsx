import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { Stock } from '../util';
import { useStyles } from '../hooks/useStyle';

export function StockCard({ ticker, price, changePrice, changePercent }: Stock) {
  const isPositive = changePercent >= 0;
  const router = useRouter();
  const { styles } = useStyles();

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.navigate(`/stockDetail/${encodeURIComponent(ticker)}`)}
    >
      <Text style={styles.symbol}>{ticker}</Text>
      <Text style={styles.price}>₹{price.toLocaleString()}</Text>

      <Text style={isPositive ? styles.changePositive : styles.changeNegative}>
        {isPositive ? '+' : ''}
        ₹{changePrice.toFixed(2)}
      </Text>

      <Text style={isPositive ? styles.changePositive : styles.changeNegative}>
        {isPositive ? '+' : ''}
        {changePercent.toFixed(2)}%
      </Text>
    </TouchableOpacity>
  );
}
