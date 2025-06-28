import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

type PaginationProps = {
  page: number;
  totalPages: number;
  setPage: (newPage: number) => void;
};

function Pagination({ page, totalPages, setPage }: PaginationProps) {
    if (totalPages <= 0) return null;

    return (
        <View style={styles.paginationContainer}>
            <Button
                title="Previous"
                onPress={() => setPage(Math.max(page - 1, 1))}
                disabled={page === 1}
            />
            <Text style={styles.pageText}>
                Page {page} of {totalPages}
            </Text>
            <Button
                title="Next"
                onPress={() => setPage(Math.min(page + 1, totalPages))}
                disabled={page === totalPages}
            />
        </View>
    );
}

const styles = StyleSheet.create({
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 0,
  },
  pageText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default Pagination;
