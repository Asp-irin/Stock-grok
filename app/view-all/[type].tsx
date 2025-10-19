import { useStockStore } from '@/store/useStockStore';
import { useWatchlistStore } from '@/store/useWacthlistStore';
import { Stock } from '@/util';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import React, { useEffect, useState, useLayoutEffect } from 'react';
import { FlatList, Text, View, TouchableOpacity } from 'react-native';
import { StockCard } from '@/components/StockCard';
import { Ionicons } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import { SafeAreaView } from 'react-native-safe-area-context';
import PaginationTab from '@/components/PaginationTab';
import ConfirmModal from '@/components/ConfirmModal';
import AlertModal from '@/components/AlertModal';
import { useStyles } from '../../hooks/useStyle';

const ITEMS_PER_PAGE = 10;

export default function ViewAllScreen() {
  const navigation = useNavigation();
  const type = String(useLocalSearchParams().type);
  const { topMovers, topLosers, getStock } = useStockStore();
  const { getStocksFromWatchlist, watchlists, removeStockFromWatchlist } = useWatchlistStore();
  const { styles, theme } = useStyles();

  const [page, setPage] = useState(1);
  const [allData, setAllData] = useState<Stock[]>([]);
  const [currentPageData, setCurrentPageData] = useState<Stock[]>([]);
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [tickerToDelete, setTickerToDelete] = useState('');
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const toggleEditModal = () => setEditModalVisible(!isEditModalVisible);

  const handleRemoveStock = (symbol: string) => {
    removeStockFromWatchlist(type, symbol);
    const updated = allData.filter((stock) => stock.ticker !== symbol);
    setAllData(updated);
  };

  const showAlert = (message: string, timeout = 2000) => {
    setAlertMessage(message);
    setAlertVisible(true);
    setTimeout(() => {
      setAlertVisible(false);
      setAlertMessage('');
    }, timeout);
  };

  useEffect(() => {
    navigation.setOptions({ headerTitle: `${type}` });

    let tickers: string[] = [];
    if (type === 'Top Movers') tickers = topMovers;
    else if (type === 'Top Losers') tickers = topLosers;
    else tickers = getStocksFromWatchlist(type);

    const fullData = tickers
      .map((ticker) => getStock(ticker))
      .filter((s): s is Stock => !!s);

    setAllData(fullData);
    setPage(1);
  }, [type, watchlists, topMovers, topLosers]);

  useEffect(() => {
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    setCurrentPageData(allData.slice(startIndex, endIndex));
  }, [page, allData]);

  useLayoutEffect(() => {
    const isDefaultList = type === 'Top Movers' || type === 'Top Losers';
    navigation.setOptions({
      headerRight: () =>
        !isDefaultList ? (
          <TouchableOpacity onPress={toggleEditModal}>
            <Ionicons name="pencil-outline" size={22} color={theme.text} />
          </TouchableOpacity>
        ) : null,
    });
  }, [navigation, type]);

  const totalPages = Math.ceil(allData.length / ITEMS_PER_PAGE);

  return (
    <View style={styles.container}>
      <FlatList
        data={currentPageData}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        keyExtractor={(item) => item.ticker}
        renderItem={({ item }) => (
          <StockCard
            ticker={item.ticker}
            price={item.price}
            changePrice={item.changePrice}
            changePercent={item.changePercent}
          />
        )}
      />

      {totalPages > 1 && (
        <PaginationTab page={page} totalPages={totalPages} setPage={setPage} />
      )}

{type !== 'Top Movers' && type !== 'Top Losers' && (
  <Modal
    isVisible={isEditModalVisible}
    onBackdropPress={toggleEditModal}
    onBackButtonPress={toggleEditModal}
    animationIn="slideInRight"
    animationOut="slideOutRight"
    backdropOpacity={0.3}
    style={{ margin: 0, justifyContent: 'flex-start' }}
  >
    <SafeAreaView
      edges={['top']}
      style={[styles.modalContainer, { backgroundColor: theme.background }]}
    >
      {/* Header */}
      <View style={styles.modalHeader}>
        <TouchableOpacity onPress={toggleEditModal} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={theme.text} />
        </TouchableOpacity>
        <Text style={styles.modalTitle}>Edit Watchlist: {type}</Text>
      </View>

      {/* Body */}
      {allData.length === 0 ? (
        <Text style={styles.textMuted}>No stocks to show</Text>
      ) : (
        <View style={{ flex: 1 }}>
          {allData.map((stock) => (
            <View key={stock.ticker} style={styles.editStockRow}>
              <Text style={styles.editStockText}>{stock.ticker}</Text>
              <TouchableOpacity
                onPress={() => {
                  setTickerToDelete(stock.ticker);
                  setShowConfirm(true);
                }}
              >
                <Ionicons name="close-circle-outline" size={24} color={theme.danger} />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}
    </SafeAreaView>
  </Modal>
)}


      <ConfirmModal
        isVisible={showConfirm}
        onCancel={() => setShowConfirm(false)}
        onConfirm={() => {
          handleRemoveStock(tickerToDelete);
          setShowConfirm(false);
          showAlert(`${tickerToDelete} removed from the Watchlist`);
        }}
        title="Remove Stock"
        message={`Are you sure you want to remove ${tickerToDelete} from ${type}?`}
      />

      <AlertModal
        visible={alertVisible}
        message={alertMessage}
        onClose={() => setAlertVisible(false)}
      />
    </View>
  );
}
