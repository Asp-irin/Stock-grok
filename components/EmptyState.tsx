import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  iconName?: keyof typeof Ionicons.glyphMap;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No Data',
  subtitle = 'Nothing to show here.',
  iconName = 'cube-outline',
}) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 40,
        paddingHorizontal: 20,
      }}
    >
      <Ionicons name={iconName} size={64} color="#555" style={{ marginBottom: 16 }} />
      <Text
        style={{
          fontSize: 18,
          color: '#ccc',
          fontWeight: '600',
          marginBottom: 4,
        }}
      >
        {title}
      </Text>
      <Text
        style={{
          fontSize: 14,
          color: '#777',
          textAlign: 'center',
          lineHeight: 20,
        }}
      >
        {subtitle}
      </Text>
    </View>
  );
};
