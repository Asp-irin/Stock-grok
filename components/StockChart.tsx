import * as scale from 'd3-scale';
import * as shape from 'd3-shape';
import React from 'react';
import { Text, View } from 'react-native';
import { Grid, LineChart, XAxis, YAxis } from 'react-native-svg-charts';
import { useChartStore } from '@/store/useStockChartData';

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
  const rawData = getChartData(symbol, range);

  if (loading) {
    return (
      <View style={{ height: 220, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!rawData || rawData.length === 0) {
    return (
      <View style={{ height: 220, justifyContent: 'center', alignItems: 'center' }}>
        <Text>No chart data available</Text>
      </View>
    );
  }

  const chartData = rawData.map((d: { date: string | number | Date; price: any; }) => ({
    date: new Date(d.date),
    value: d.price,
  }));

  const yValues = chartData.map((d: { value: any; }) => d.value);
  const minY = Math.min(...yValues) - 5;
  const maxY = Math.max(...yValues) + 5;

  return (
    <View style={{ paddingHorizontal: 16 }}>
      {/* Chart */}
      <View style={{ height: 220, flexDirection: 'row' }}>
        <YAxis
          data={chartData}
          yAccessor={({ item }: { item: { value: number } }) => item.value}
          contentInset={{ top: 20, bottom: 20 }}
          svg={{ fontSize: 10, fill: '#666' }}
          min={minY}
          max={maxY}
          numberOfTicks={5}
        />
        <LineChart
          style={{ flex: 1, marginLeft: 10 }}
          data={chartData}
          yAccessor={({ item }: { item: { date: Date; value: number } }) => item.value}
          xAccessor={({ item }: { item: { date: Date; value: number } }) => item.date.getTime()}
          xScale={scale.scaleTime}
          svg={{ stroke: '#007AFF', strokeWidth: 3 }}
          contentInset={{ top: 20, bottom: 20 }}
          curve={shape.curveMonotoneX}
        >
          <Grid />
        </LineChart>
      </View>

      {/* X-Axis */}
      <XAxis
        style={{ marginTop: 10, marginHorizontal: 30 }}
        data={chartData}
        xAccessor={({ item }: { item: { date: Date; value: number } }) => item.date.getTime()}
        scale={scale.scaleTime}
        numberOfTicks={chartData.length}
        formatLabel={(value) =>
          new Date(value).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })
        }
        svg={{ fontSize: 8, fill: '#666' }}
        contentInset={{ left: 16, right: 10 }}
      />
    </View>
  );
}
