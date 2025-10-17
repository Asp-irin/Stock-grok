import * as scale from 'd3-scale';
import * as shape from 'd3-shape';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Grid, LineChart, XAxis, YAxis } from 'react-native-svg-charts';

type SeriesProps = {
  date: Date;
  value: number;  
}

// 📦 Your data here (dummy samples)
const dailyData = {
  "2025-06-25": "291.06",
  "2025-06-24": "293.79",
  "2025-06-23": "289.18",
  "2025-06-21": "283.21",
  "2025-06-20": "280.97",
};

const weeklyData = {
  "2025-06-25": "291.06",
  "2025-06-20": "280.97",
  "2025-06-13": "277.22",
  "2025-06-06": "268.87",
};

const monthlyData = {
  "2025-06-25": "291.06",
  "2025-05-30": "259.06",
  "2025-04-30": "241.82",
  "2025-03-31": "248.66",
  "2025-02-28": "252.44",
};

// 🔧 Common formatter
const parseChartData = (series: Record<string, string>) =>
  Object.entries(series)
    .map(([date, value]) => ({
      date: new Date(date),
      value: parseFloat(value),
    }))
    .sort((a, b) => a.date.getTime() - b.date.getTime());


export default function StockChart() {
  const [range, setRange] = useState<'1D' | '1W' | '1M' | '1Y'>('1D');

  const dataMap = {
    '1D': dailyData,
    '1W': weeklyData,
    '1M': monthlyData,
    '1Y': monthlyData, // Reuse monthlyData if yearly is similar
  };

  const chartData = parseChartData(dataMap[range]);
  const yValues = chartData.map(d => d.value);
  const minY = Math.min(...yValues) - 5;
  const maxY = Math.max(...yValues) + 5;

  return (
    <View style={{ paddingHorizontal: 16  }}>
      {/* Toggle Buttons */}

      {/* Chart */}
      <View style={{ height: 220, flexDirection: 'row' }}>
        <YAxis
          data={chartData}
          yAccessor={({ item }) => item.value}
          contentInset={{ top: 20, bottom: 20 }}
          svg={{ fontSize: 10, fill: '#666' }}
          min={minY}
          max={maxY}
          numberOfTicks={5}
        />
        <LineChart
          style={{ flex: 1, marginLeft: 10 }}
          data={chartData}
          yAccessor={({ item }) => item.value}
          xAccessor={({ item }) => item.date.getTime()}
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
        xAccessor={({ item }) => item.date.getTime()}
        scale={scale.scaleTime}
        numberOfTicks={chartData.length}
        formatLabel={(value) =>
          new Date(value).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })
        }
        svg={{ fontSize: 10, fill: '#666' }}
        contentInset={{ left: 16, right: 16 }}
      />

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 12, marginHorizontal:114, borderWidth: 1, borderColor: '#ccc', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 20 }}>
        {['1D', '1W', '1M', '1Y'].map((opt) => (
          <TouchableOpacity
            key={opt}
            onPress={() => setRange(opt as any)}
            style={{
              paddingHorizontal: 6,
              paddingVertical: 6,
              backgroundColor: range === opt ? '#007AFF' : '#f0f0f0',
              borderRadius: 20,
            }}
          >
            <Text style={{ color: range === opt ? 'white' : '#333', fontSize: 6 }}>{opt}</Text>
          </TouchableOpacity>
        ))}
      </View>

    </View>
    
  );
}
