import React, { useState, useEffect, useMemo } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import PaginationTab from '@/components/PaginationTab';

import { useWatchlistStore } from '@/store/useWacthlistStore';
import { useStyles } from '@/hooks/useStyle';
import AlertModal from '@/components/AlertModal';
import { EmptyState } from '@/components/EmptyState';

export default function TabTwoScreen() {
  const router = useRouter();
  const { styles, theme } = useStyles();
  const { watchlists, removeWatchlist } = useWatchlistStore();
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
    const screenHeight = Dimensions.get('window').height;
  
  const ITEM_HEIGHT = 100;
const verticalPadding = 0;

const ITEMS_PER_PAGE = Math.floor((screenHeight - verticalPadding) / ITEM_HEIGHT);

  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [isConfirmVisible, setConfirmVisible] = useState(false);
  const [watchlistToDelete, setWatchlistToDelete] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [currentItems, setCurrentItems] = useState<string[]>([]);

  const totalPages = Math.ceil(watchlists.length / ITEMS_PER_PAGE);

  useEffect(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    setCurrentItems(watchlists.slice(start, end).map((item) => item.name));
  }, [watchlists, page, ITEMS_PER_PAGE]);

  const toggleEditModal = () => setEditModalVisible(!isEditModalVisible);

  const confirmDeleteWatchlist = (name: string) => {
    setWatchlistToDelete(name);
    setConfirmVisible(true);
  };

  const handleConfirmDelete = () => {
    if (watchlistToDelete) {
      removeWatchlist(watchlistToDelete);
      setWatchlistToDelete(null);
      setConfirmVisible(false);
      showAlert(`Watchlist "${watchlistToDelete}" deleted successfully.`);
    }
  };

  const handleCancelDelete = () => {
    setWatchlistToDelete(null);
    setConfirmVisible(false);
  };

const showAlert = (message: string, timeout = 1500) => {
    setAlertMessage(message);
    setAlertVisible(true);
    setTimeout(() => {
      setAlertVisible(false);
      setAlertMessage('');
    }, timeout);
  };

  return (
    <SafeAreaView style={styles.watchlistContainer}>
      {/* Header */}
      <View style={styles.watchlistHeaderRow}>
  <Text style={styles.watchlistHeaderText}>Watchlists</Text>
  {watchlists.length > 0 && (
    <TouchableOpacity onPress={toggleEditModal} style={styles.iconButton}>
      <Ionicons name="pencil-outline" size={20} color={theme.text} />
    </TouchableOpacity>
  )}
</View>


      {/* Watchlist Items */}
      {currentItems.length === 0 ? (
        <EmptyState
          title="No Watchlists"
          subtitle="Create your first watchlist to get started."
          iconName="cube-outline"
        />
      ) :
      <View style={styles.watchlistFlatList}>
        {currentItems.map((item) => (
          <TouchableOpacity
            key={item}
            style={styles.watchlistItem}
            onPress={() => router.push(`/view-all/${item}`)}
          >
            <Text style={styles.watchlistText}>{item}</Text>
            <Text style={styles.watchlistArrow}>{'>'}</Text>
          </TouchableOpacity>
        ))}
      </View>
}
      {totalPages > 1 && (
        <PaginationTab page={page} totalPages={totalPages} setPage={setPage} />
      )}
      

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
          style={[styles.container, { backgroundColor: theme.background }]}
        >
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={toggleEditModal} style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} style={styles.icon} />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Edit Watchlists</Text>
          </View>

          {watchlists.length === 0 ? (
            // <Text style={styles.textMuted}>No watchlists available.</Text>
            <EmptyState title='No Watchlists' subtitle='Create your first watchlist to get started.' iconName='cube-outline' />
          ) : (
            <View style={styles.watchlistFlatList}>
              {watchlists.map((watchlist) => (
                <View key={watchlist.name} style={styles.editWatchlistRow}>
                  <Text style={styles.editWatchlistText}>{watchlist.name}</Text>
                  <TouchableOpacity onPress={() => confirmDeleteWatchlist(watchlist.name)}>
                    <Ionicons name="close-circle-outline" size={24} color={theme.danger} />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
        </SafeAreaView>
      </Modal>

      {/* Confirm Modal */}
      <Modal
        isVisible={isConfirmVisible}
        onBackdropPress={handleCancelDelete}
        backdropOpacity={0.4}
      >
        <View style={styles.editWacthlistModalContainer}>
          <Text style={styles.confirmTitle}>Are you sure?</Text>
          <Text style={styles.confirmMessage}>
            Do you really want to delete "{watchlistToDelete}"? This action cannot be undone.
          </Text>
          <View style={styles.confirmActions}>
            <TouchableOpacity onPress={handleCancelDelete}>
              <Text style={[styles.confirmButtonText, { color: theme.secondaryText }]}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleConfirmDelete}>
              <Text style={[styles.confirmButtonText, { color: theme.danger }]}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Alert */}
      <AlertModal
              visible={alertVisible}
              message={alertMessage}
              onClose={() => setAlertVisible(false)}
            />
    </SafeAreaView>
  );
}
