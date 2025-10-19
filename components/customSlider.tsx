import React from 'react';
import { Text, View } from 'react-native';

export default function CustomSlider({low,high,current}: {low?: number, high?: number, current?: number}) {
const isInvalid = (val: any) => val === undefined || isNaN(val);

if (isInvalid(low) || isInvalid(high) || isInvalid(current)) {
  return null;
}

const safeLow = low as number;
const safeHigh = high as number;
const safeCurrent = current as number;

console.log('CustomSlider', { low: safeLow, high: safeHigh, current: safeCurrent });

const directionX = ((safeCurrent - safeLow) / (safeHigh - safeLow)) * 100;

  return (
    <View
      style={{
        // paddingHorizontal: 20,
        alignItems: 'center',
        // borderWidth: 1,
        // borderColor: '#ccc',
        borderRadius: 10,
        marginVertical: 10,
        backgroundColor: 'white',
      }}
    >
      {/* <Text style={{ marginBottom: 16, fontWeight: '600' }}>Custom Slider Component</Text> */}

      {/* Graph Line + Arrow */}
      <View style={{ width: '100%', alignItems: 'center', position: 'relative' }}>
        {/* Slider line */}
        <View
          style={{
            width: '100%',
            height: 4,
            backgroundColor: '#ccc',
            borderRadius: 2,
          }}
        />

        {/* Arrow indicating current */}
        <View
          style={{
            position: 'absolute',
            left: `${directionX}%`,
            transform: [{ translateX: -7 }],
            top: -14,
          }}
        >
          <Text style={{ color: '#007AFF', fontWeight: 'bold' }}>▼</Text>
        </View>
      </View>

      {/* Value numbers */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
          marginTop: 8,
        }}
      >
        <Text style={{ fontSize: 12 }}>$ {low}</Text>
        {/* <Text style={{ fontSize: 12, color: '#007AFF', fontWeight: 'bold' }}>₹{current}</Text> */}
        <Text style={{ fontSize: 12 }}>$ {high}</Text>
      </View>

      {/* Labels */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
          marginTop: 2,
        }}
      >
        <Text style={{ fontSize: 10, color: '#555' }}>52-Week Low</Text>
        {/* <Text style={{ fontSize: 10, color: '#555' }}>Current</Text> */}
        <Text style={{ fontSize: 10, color: '#555' }}>52-Week High</Text>
      </View>
    </View>
  );
}
