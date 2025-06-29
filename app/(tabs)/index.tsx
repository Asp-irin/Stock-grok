import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { getTopMoversAndLosers } from '../../api/stock';
import { StockSection } from '../../components/StockSection';
import { useStockStore } from '../../store/useStockStore';
import { Stock } from '../../util';
import { transformStock } from '../../util/util';
import { useStyles } from '../../hooks/useStyle';
import { useThemeStore } from '@/store/useThemeStore';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const {
    topMovers,
    topLosers,
    setTopMovers,
    setTopLosers,
    isDataStale,
    setStock,
  } = useStockStore();
  const { styles } = useStyles();
  const { theme } = useThemeStore();
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  const fetchData = async () => {
    try {
      setError(false);

      if (!isDataStale()) {
        setLoading(false);
        return;
      }

      const data = await getTopMoversAndLosers();

      if (!data || data.Information || Object.keys(data).length === 0) {
        throw new Error('API Limit Reached or No Data Available');
      }

      const topGainers: Stock[] = data.top_gainers.map(transformStock);
      const topLosersList: Stock[] = data.top_losers.map(transformStock);

      setTopMovers(topGainers.map((s) => s.ticker));
      setTopLosers(topLosersList.map((s) => s.ticker));

      topGainers.forEach(setStock);
      topLosersList.forEach(setStock);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <SafeAreaView style={[styles.container, { paddingTop: 32 }]}>
      <View style={styles.header}>
        <Text style={styles.title}>Stock Grok</Text>
        <TouchableOpacity
          onPress={toggleTheme}
          activeOpacity={0.7}
          style={{
            padding: 10,
            borderRadius: 8,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Ionicons
            name={theme === 'dark' ? 'sunny-outline' : 'moon-outline'}
            size={24}
            color={theme === 'dark' ? 'white' : 'black'}
          />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
        {loading && (
          <View style={{ alignItems: 'center', marginTop: 100 }}>
            <ActivityIndicator size="large" color="#5367ff" />
            <Text style={{ marginTop: 16, fontSize: 16,color: '#5367ff' }}>
              Fetching latest data...
            </Text>
          </View>
        )}

        {error && !loading && (
          <View style={{ alignItems: 'center', marginTop: 100 }}>
            <ActivityIndicator size="large" color="#FF3B30" />
            <Text
              style={{
                marginTop: 16,
                fontSize: 16,
                color: '007AFF',
                textAlign: 'center',
                paddingHorizontal: 20,
              }}
            >
              API limit reached or data unavailable. Please check back tomorrow.
            </Text>
          </View>
        )}

        {!loading && !error && (
          <>
            <StockSection
              title="Top Movers"
              stocks={topMovers}
              onPressViewAll={() =>
                router.navigate(`/view-all/${encodeURIComponent('Top Movers')}`)
              }
            />
            <StockSection
              title="Top Losers"
              stocks={topLosers}
              onPressViewAll={() =>
                router.navigate(`/view-all/${encodeURIComponent('Top Losers')}`)
              }
            />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
