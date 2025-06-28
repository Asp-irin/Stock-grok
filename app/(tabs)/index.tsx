import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import { getTopMoversAndLosers } from '../../api/stock';
import { StockSection } from '../../components/StockSection';
import { useStockStore } from '../../store/useStockStore';
import { Stock } from '../../util';
import { transformStock } from '../../util/util';
import { useStyles } from '../../hooks/useStyle';

export default function HomeScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const { topMovers, topLosers, setTopMovers, setTopLosers, isDataStale, setStock } = useStockStore();
  const { styles } = useStyles();

  useEffect(() => {
    const fetchData = async () => {
      if (!isDataStale()) {
        setLoading(false);
        return;
      }

      const data = await getTopMoversAndLosers();
      if (data) {
        const topGainers: Stock[] = data.top_gainers.map(transformStock);
        const topLosersList: Stock[] = data.top_losers.map(transformStock);

        setTopMovers(topGainers.map((s) => s.ticker));
        setTopLosers(topLosersList.map((s) => s.ticker));

        topGainers.forEach(setStock);
        topLosersList.forEach(setStock);
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <SafeAreaView style={[styles.container, { paddingTop: 32 }]}>
      <View style={styles.header}>
        <Text style={styles.title}>Stock Grok</Text>
      </View>

      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
        <StockSection
          title="Top Movers"
          stocks={topMovers}
          onPressViewAll={() => router.navigate(`/view-all/${encodeURIComponent('Top Movers')}`)}
        />
        <StockSection
          title="Top Losers"
          stocks={topLosers}
          onPressViewAll={() => router.navigate(`/view-all/${encodeURIComponent('Top Losers')}`)}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
