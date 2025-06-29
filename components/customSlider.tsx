import React from 'react';
import { Text, View } from 'react-native';
import { useStyles } from '../hooks/useStyle';

export default function CustomSlider({
  low,
  high,
  current,
}: {
  low?: number;
  high?: number;
  current?: number;
}) {
  const { styles, theme } = useStyles();

  const isInvalid = (val: any) => val === undefined || isNaN(val);

  if (isInvalid(low) || isInvalid(high) || isInvalid(current)) {
    return null;
  }

  const safeLow = low as number;
  const safeHigh = high as number;
  const safeCurrent = current as number;

  const directionX = ((safeCurrent - safeLow) / (safeHigh - safeLow)) * 100;

  return (
    <View style={styles.stockDetailSliderContainer}>
      {/* Line + Arrow */}
      <View style={styles.stockDetailSliderTrackWrapper}>
        <View style={styles.stockDetailSliderTrack} />
        <View
          style={[
            styles.stockDetailSliderArrow,
            { left: `${directionX}%`, transform: [{ translateX: -7 }] },
          ]}
        >
          <Text style={{ color: theme.primary, fontWeight: 'bold',fontSize:20 }}>▼</Text>
        </View>
      </View>

      {/* Values */}
      <View style={styles.stockDetailSliderRangeRow}>
        <Text style={styles.stockDetailSliderRangeText}>$ {low}</Text>
        <Text style={styles.stockDetailSliderRangeText}>$ {high}</Text>
      </View>

      {/* Labels */}
      <View style={styles.stockDetailSliderLabelRow}>
        <Text style={styles.stockDetailSliderLabelText}>52-Week Low</Text>
        <Text style={styles.stockDetailSliderLabelText}>52-Week High</Text>
      </View>
    </View>
  );
}
