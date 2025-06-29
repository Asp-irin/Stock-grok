import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useStyles } from '../hooks/useStyle';

type PaginationProps = {
  page: number;
  totalPages: number;
  setPage: (newPage: number) => void;
};

export default function Pagination({ page, totalPages, setPage }: PaginationProps) {
  const { styles, theme } = useStyles();

  if (totalPages <= 1) return null;

  return (
    <View style={styles.paginationContainer}>
      <TouchableOpacity
        style={[styles.arrowButton, page === 1 && styles.disabledButton]}
        onPress={() => setPage(Math.max(page - 1, 1))}
        disabled={page === 1}
      >
        <Ionicons
          name="chevron-back"
          size={20}
          color={page === 1 ? theme.secondaryText : theme.text}
        />
      </TouchableOpacity>

      <View style={styles.pageBox}>
        <Text style={styles.pageNumber}>{page}</Text>
        <Text style={styles.divider}> / </Text>
        <Text style={styles.pageTotal}>{totalPages}</Text>
      </View>

      <TouchableOpacity
        style={[styles.arrowButton, page === totalPages && styles.disabledButton]}
        onPress={() => setPage(Math.min(page + 1, totalPages))}
        disabled={page === totalPages}
      >
        <Ionicons
          name="chevron-forward"
          size={20}
          color={page === totalPages ? theme.secondaryText : theme.text}
        />
      </TouchableOpacity>
    </View>
  );
}
