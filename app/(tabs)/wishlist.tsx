import { useWatchlistStore } from '@/store/useWacthlistStore';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Modal from 'react-native-modal';

export default function TabTwoScreen() {
  const router = useRouter();
  const { watchlists, removeWatchlist } = useWatchlistStore();
  const [isEditModalVisible, setEditModalVisible] = useState(false);

  const toggleEditModal = () => setEditModalVisible(!isEditModalVisible);
  const [isConfirmVisible, setConfirmVisible] = useState(false);
  const [watchlistToDelete, setWatchlistToDelete] = useState<string | null>(null);

  const confirmDeleteWatchlist = (name: string) => {
  setWatchlistToDelete(name);
  setConfirmVisible(true);
};

  const handleConfirmDelete = () => {
  if (watchlistToDelete) {
    removeWatchlist(watchlistToDelete);
    setWatchlistToDelete(null);
    setConfirmVisible(false);
  }
};

const handleCancelDelete = () => {
  setWatchlistToDelete(null);
  setConfirmVisible(false);
};



  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <Text style={styles.headerText}>Wishlists</Text>
        <TouchableOpacity onPress={toggleEditModal}>
          <Ionicons name="pencil-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Wishlist Items */}
      <FlatList
        data={watchlists}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.listItem}
            onPress={() => router.push(`/view-all/${item.name}`)}
          >
            <Text style={styles.listText}>{item.name}</Text>
            <Text style={styles.arrow}>{'>'}</Text>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />

      {/* Edit Modal */}
      <Modal
        isVisible={isEditModalVisible}
        onBackdropPress={toggleEditModal}
        animationIn="slideInRight"
        animationOut="slideOutRight"
        backdropOpacity={0.3}
        style={{ margin: 0, justifyContent: 'flex-start' }}
      >
        <SafeAreaView
          edges={['top']}
          style={{ flex: 1, backgroundColor: 'white', paddingHorizontal: 20, paddingTop: 16 }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
            <TouchableOpacity onPress={toggleEditModal} style={{ marginRight: 8 }}>
              <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Edit Watchlists</Text>
          </View>

          {watchlists.length === 0 ? (
            <Text>No watchlists available.</Text>
          ) : (
            <View style={{ flex: 1 }}>
              {watchlists.map((watchlist) => (
                <View
                  key={watchlist.name}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingVertical: 12,
                    borderBottomWidth: 1,
                    borderColor: '#e0e0e0',
                  }}
                >
                  <Text style={{ fontSize: 16 }}>{watchlist.name}</Text>
                  <TouchableOpacity onPress={() => confirmDeleteWatchlist(watchlist.name)}>
                    <Ionicons name="close-circle-outline" size={24} color="red" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
        </SafeAreaView>
      </Modal>

      <Modal
  isVisible={isConfirmVisible}
  onBackdropPress={handleCancelDelete}
  backdropOpacity={0.4}
>
  <View style={{ backgroundColor: 'white', padding: 24, borderRadius: 12 }}>
    <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 12 }}>
      Are you sure?
    </Text>
    <Text style={{ fontSize: 15, color: '#444', marginBottom: 24 }}>
      Do you really want to delete "{watchlistToDelete}" watchlist? This action cannot be undone.
    </Text>

    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 12 }}>
      <TouchableOpacity onPress={handleCancelDelete}>
        <Text style={{ color: '#007AFF', fontWeight: '600' }}>Cancel</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleConfirmDelete}>
        <Text style={{ color: 'red', fontWeight: '600' }}>Delete</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 32,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  listItem: {
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listText: {
    fontSize: 18,
  },
  arrow: {
    fontSize: 18,
    color: '#888',
  },
  separator: {
    height: 1,
    backgroundColor: '#e5e5e5',
  },
});
