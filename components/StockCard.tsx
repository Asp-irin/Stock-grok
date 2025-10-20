import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useStyles } from '../hooks/useStyle';
import { Stock } from '@/util';
import { Ionicons } from '@expo/vector-icons';

export function StockCard({ ticker, price, changePrice, changePercent }: Stock) {
  const { styles, theme } = useStyles();
  const router = useRouter();
  const isPositive = changePercent >= 0;

  return (
    <TouchableOpacity
      style={styles.stockCard}
      onPress={() => router.push(`/stockDetail/${encodeURIComponent(ticker)}`)}
    >
      <View style={styles.logoCircle}>
        <Text style={styles.logoText}>
          {ticker?.[0]?.toUpperCase() ?? ''}
        </Text>
      </View>

      <Text style={styles.stockCardTicker}>{ticker}</Text>
      <Text style={styles.stockCardPrice}>${price}</Text>

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
        <Text style={isPositive ? styles.changePositive : styles.changeNegative}>
          {changePercent.toFixed(4)}%
        </Text>
        {isPositive ? (
          <Ionicons name="caret-up" size={14} color={theme.success} />
        ) : (
          <Ionicons name="caret-down" size={14} color={theme.danger} />
        )}
      </View>
    </TouchableOpacity>
  );
}
