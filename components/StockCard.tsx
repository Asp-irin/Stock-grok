import { useRouter } from 'expo-router'; // Adjust import based on your routing setup
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';

type StockCardProps = {
  name: string;
  symbol: string;
  price: number | string; // need to check this from the API response
  changePercent: number | string; // need to!
  logoUrl?: string;
};

export function StockCard({ name, symbol, price, changePercent, logoUrl }: StockCardProps) {
    const isPositive = parseFloat(changePercent as string) >= 0;
    const router = useRouter();

    return (
      <TouchableOpacity style={styles.card}   onPress={() => router.navigate(`/stockDetail/${encodeURIComponent(symbol)}`)}>
        {/* <View style={styles.card}> */}
            <Image
                source={{ uri: logoUrl || 'https://via.placeholder.com/50' }}
                style={styles.logo}
            />
            {/* <Text style={styles.name}>{name}</Text> */}
            <Text style={styles.symbol}>{symbol}</Text>
            <Text style={styles.price}>${price}</Text>
            <Text style={[styles.change, { color: isPositive ? '#28a745' : '#d63031' }]}>
                {isPositive ? '+' : ''}
                {changePercent}%
            </Text>
        {/* </View> */}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#f0f0f0',
    margin: 8,
    alignItems: 'center',
    minWidth: 150,
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  symbol: {
    fontSize: 14,
    color: '#555',
  },
  price: {
    fontSize: 18,
    color: '#000',
    marginTop: 8,
  },
  change: {
    fontSize: 14,
    marginTop: 4,
  },
});
