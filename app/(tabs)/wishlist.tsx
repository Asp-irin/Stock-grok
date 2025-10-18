import { useWatchlistStore } from '@/store/useWacthlistStore';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// const dummyWishlists = [
//   { id: '1', name: 'Tech Stocks' },
//   { id: '2', name: 'ETFs to Watch' },
//   { id: '3', name: 'Dividend Kings' },
// ];

export default function TabTwoScreen() {
    const router = useRouter();
  const { watchlists } = useWatchlistStore();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <Text style={styles.headerText}>Wishlist</Text>

      {/* Wishlist Items */}
      <FlatList
        data={watchlists}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.listItem} onPress={() => router.push(`/view-all/${item.name}`)}>
            <Text style={styles.listText}>{item.name}</Text>
            <Text style={styles.arrow}>{'>'}</Text>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 32,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  listItem: {
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listText: {
    fontSize: 18,
  },
  arrow: {
    fontSize: 18,
    color: '#888',
  },
  separator: {
    height: 1,
    backgroundColor: '#e5e5e5',
  },
});
