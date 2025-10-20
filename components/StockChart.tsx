import React from 'react';
import { View, Text, Dimensions, ActivityIndicator } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { useChartStore } from '@/store/useStockChartData';
import { useStyles } from '@/hooks/useStyle';

export default function StockChart({
  symbol,
  range,
  loading,
}: {
  symbol: string;
  range: '1W' | '1M' | '1Y';
  loading: boolean;
}) {
  const { getChartData } = useChartStore();
  const { theme, styles } = useStyles(); // ✅ Hook at top

  let rawData = getChartData(symbol, range);

  if (rawData && rawData.length > 8) {
    rawData = rawData.slice(0, 8);
  }

  if (loading) {
    return (
      <View style={{ height: 220, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  if (!rawData || rawData.length === 0) {
    return (
      <View style={{ height: 220, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: theme.text }}>No chart data available</Text>
      </View>
    );
  }

  const maxLabels = 8;
  const chartValues = rawData.map((d: any) => d.price);
  const allLabels = rawData.map((d: any) =>
    new Date(d.date).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
    })
  );

  const interval = Math.max(1, Math.floor(allLabels.length / maxLabels));
  const chartLabels = allLabels.map((label: string, i: number) =>
    i % interval === 0 ? label : ''
  );

  return (
    <View>
      <LineChart
        data={{
          labels: chartLabels,
          datasets: [
            {
              data: chartValues,
            },
          ],
        }}
        width={Dimensions.get('window').width - 1}
        height={220}
        yAxisLabel=""
        yLabelsOffset={10}
        chartConfig={{
          backgroundColor: theme.background,
          backgroundGradientFrom: theme.background,
          backgroundGradientTo: theme.background,
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(100, 100, 100, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForLabels: {
            fontSize: 10,
          },
          propsForDots: {
            r: '2',
            strokeWidth: '1',
            stroke: '#007AFF',
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          marginTop: 16,
          borderRadius: 16,
          marginLeft: -4,
        }}
        verticalLabelRotation={0}
      />
    </View>
  );
}
