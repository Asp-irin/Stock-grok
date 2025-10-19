// // import { useStockStore } from '@/store/useStockStore';
// // import { useWatchlistStore } from '@/store/useWacthlistStore';
// // import { Stock } from '@/util';
// // import { useLocalSearchParams, useNavigation } from 'expo-router';
// // import React, { useEffect, useState } from 'react';
// // import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
// // import { StockCard } from '../../components/StockCard'; // adjust path if needed
// // import Pagination from '@/components/PaginationTab';


// // const ITEMS_PER_PAGE = 10;

// // export default function ViewAllScreen() {
// //   const navigation = useNavigation();
// //   const type = String(useLocalSearchParams().type);
// //   const { topMovers, topLosers } = useStockStore();
// //   const { getStocksFromWatchlist,watchlists } = useWatchlistStore();
// //   const { getStock } = useStockStore();

// //   const [page, setPage] = useState(1);
// //   const [allData, setAllData] = useState<Stock[]>([]);
// //   const [currentPageData, setCurrentPageData] = useState<Stock[]>([]);


// // useEffect(() => {
// //   navigation.setOptions({ headerTitle: `${type}` });

// //   const tickers =
// //     type === 'Top Movers'
// //       ? topMovers
// //       : type === 'Top Losers'
// //       ? topLosers
// //       : getStocksFromWatchlist(type);

// //   const fullData = tickers
// //     .map((ticker) => {
// //       const stock = getStock(ticker);
// //       if (!stock) console.warn(`No stock data found for ticker: ${ticker}`);
// //       return stock;
// //     })
// //     .filter((s): s is Stock => !!s);

// //   setAllData(fullData);
// //   setPage(1); // Reset page to 1 when `type` changes
// // }, [type,watchlists,topMovers,topLosers]);


// // useEffect(() => {
// //   const startIndex = (page - 1) * ITEMS_PER_PAGE;
// //   const endIndex = startIndex + ITEMS_PER_PAGE;
// //   setCurrentPageData(allData.slice(startIndex, endIndex));
// // }, [page, allData]);

// // const totalPages = Math.ceil((allData ? allData.length : 0) / ITEMS_PER_PAGE);


// //   return (
// //     <View style={styles.container}>
// //       <FlatList
// //         data={currentPageData}
// //         numColumns={2}
// //         columnWrapperStyle={{ justifyContent: 'space-between' }}
// //         keyExtractor={(item) => item.ticker}
// //         renderItem={({ item }) => (
// //           <StockCard
// //                       ticker={item.ticker}
// //                       price={item.price}
// //                       changePrice={item.changePrice}
// //                       changePercent={item.changePercent}
// //                     />
// //         )}
// //       />
// //   {/* // if pages are 0 remove pagination */}
// //   {totalPages > 0 && (
// //     <Pagination page={page} totalPages={totalPages} setPage={setPage} />
// //   )
// //   }
      
// //     </View>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: '#fff',
// //     padding: 16,
// //   },
// //   paginationContainer: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-between',
// //     alignItems: 'center',
// //     marginTop: 0,
// //   },
// //   pageText: {
// //     fontSize: 14,
// //     fontWeight: 'bold',
// //   },
// // });

// import { useStockStore } from '@/store/useStockStore';
// import { useWatchlistStore } from '@/store/useWacthlistStore';
// import { Stock } from '@/util';
// import { useLocalSearchParams, useNavigation } from 'expo-router';
// import React, { useEffect, useState } from 'react';
// import { Button, FlatList, StyleSheet, Text, View,TouchableOpacity } from 'react-native';
// import { StockCard } from '../../components/StockCard'; // adjust path if needed
// import { useLayoutEffect } from 'react';
// import { Ionicons } from '@expo/vector-icons';
// // import { Modal } from 'react-native';
// import Modal from 'react-native-modal';
// import { SafeAreaView } from 'react-native-safe-area-context';

// const ITEMS_PER_PAGE = 10;

// export default function ViewAllScreen() {
//   const navigation = useNavigation();
//   const type = String(useLocalSearchParams().type);
//   const { topMovers, topLosers } = useStockStore();
//   const { getStocksFromWatchlist,watchlists,removeStockFromWatchlist } = useWatchlistStore();
//   const { getStock } = useStockStore();

//   const [page, setPage] = useState(1);
//   const [allData, setAllData] = useState<Stock[]>([]);
//   const [currentPageData, setCurrentPageData] = useState<Stock[]>([]);
//   const [isEditModalVisible, setEditModalVisible] = useState(false);

// const toggleEditModal = () => {
//   setEditModalVisible(!isEditModalVisible);
// };


//   const handleRemoveStock = (symbol: string) => {
//   removeStockFromWatchlist(type, symbol);

//   // Update current data after removal
//   const updated = allData.filter((stock) => stock.ticker !== symbol);
//   setAllData(updated);
// };


// useEffect(() => {
//   navigation.setOptions({ headerTitle: `${type}` });
//   const tickers = getStocksFromWatchlist(type);

//   const fullData = tickers
//     .map((ticker) => {
//       const stock = getStock(ticker);
//       if (!stock) console.warn(`No stock data found for ticker: ${ticker}`);
//       return stock;
//     })
//     .filter((s): s is Stock => !!s);

//   setAllData(fullData);
//   setPage(1); // Reset page to 1 when `type` changes
// }, [type,watchlists]);


// useEffect(() => {
//   const startIndex = (page - 1) * ITEMS_PER_PAGE;
//   const endIndex = startIndex + ITEMS_PER_PAGE;
//   setCurrentPageData(allData.slice(startIndex, endIndex));
// }, [page, allData]);

// const totalPages = Math.ceil((allData ? allData.length : 0) / ITEMS_PER_PAGE);

// const handleEditPress = () => {
//   toggleEditModal();
// };


// useLayoutEffect(() => {
//     navigation.setOptions({
//       headerRight: () => (
//         <TouchableOpacity onPress={handleEditPress} style={{ marginRight: 40}}>
//           <Ionicons name="pencil-outline" size={24} color="black" />
//         </TouchableOpacity>
//       ),
//     });
//   }, [navigation]);

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={currentPageData}
//         numColumns={2}
//         columnWrapperStyle={{ justifyContent: 'space-between' }}
//         keyExtractor={(item) => item.ticker}
//         renderItem={({ item }) => (
//           <StockCard
//                       ticker={item.ticker}
//                       price={item.price}
//                       changePrice={item.changePrice}
//                       changePercent={item.changePercent}
//                     />
//         )}
//       />
//   {/* // if pages are 0 remove pagination */}
//   {totalPages > 0 && (
//     <View style={styles.paginationContainer}>
//         <Button
//           title="Previous"
//           onPress={() => setPage((prev) => Math.max(prev - 1, 1))}
//           disabled={page === 1}
//         />
//         <Text style={styles.pageText}>
//           Page {page} of {totalPages}
//         </Text>
//         <Button
//           title="Next"
//           onPress={() => setPage((prev) => Math.min(prev + 1, totalPages))}
//           disabled={page === totalPages}
//         />
//       </View>
//   )
//   }
// <Modal
//   isVisible={isEditModalVisible}
//   onBackdropPress={toggleEditModal}
//   onBackButtonPress={toggleEditModal}
//   animationIn="slideInRight"
//   animationOut="slideOutRight"
//   backdropOpacity={0.3}
//   style={{ margin: 0, justifyContent: 'flex-start' }}
// >
//   <SafeAreaView
//     edges={['top']}
//     style={{
//       flex: 1,
//       backgroundColor: 'white',
//       paddingHorizontal: 20,
//       paddingTop: 16,
//       // borderTopLeftRadius: 20,
//       // borderTopRightRadius: 20,
//     }}
//   >
//     {/* Back button */}
//     <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
//       <TouchableOpacity onPress={toggleEditModal} style={{ marginRight: 8 }}>
//         <Ionicons name="arrow-back" size={24} color="black" />
//       </TouchableOpacity>
//       <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
//         Edit Watchlist: {type}
//       </Text>
//     </View>

//     {allData.length === 0 ? (
//       <Text>No stocks to show</Text>
//     ) : (
//       <View style={{ flex: 1 }}>
//         {allData.map((stock) => (
//           <View
//             key={stock.ticker}
//             style={{
//               flexDirection: 'row',
//               justifyContent: 'space-between',
//               alignItems: 'center',
//               paddingVertical: 12,
//               borderBottomWidth: 1,
//               borderColor: '#e0e0e0',
//             }}
//           >
//             <Text style={{ fontSize: 16 }}>{stock.ticker}</Text>
//             <TouchableOpacity onPress={() => handleRemoveStock(stock.ticker)}>
//               <Ionicons name="close-circle-outline" size={24} color="red" />
//             </TouchableOpacity>
//           </View>
//         ))}
//       </View>
//     )}
//   </SafeAreaView>
// </Modal>

      
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     padding: 16,
//   },
//   paginationContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginTop: 0,
//   },
//   pageText: {
//     fontSize: 14,
//     fontWeight: 'bold',
//   },
// });

// ViewAllScreen.tsx
import { useStockStore } from '@/store/useStockStore';
import { useWatchlistStore } from '@/store/useWacthlistStore';
import { Stock } from '@/util';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import React, { useEffect, useState, useLayoutEffect } from 'react';
import { FlatList, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { StockCard } from '../../components/StockCard';
import { Ionicons } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import { SafeAreaView } from 'react-native-safe-area-context';
import PaginationTab from '@/components/PaginationTab';

const ITEMS_PER_PAGE = 10;

export default function ViewAllScreen() {
  const navigation = useNavigation();
  const type = String(useLocalSearchParams().type);
  const { topMovers, topLosers } = useStockStore();
  const { getStocksFromWatchlist, watchlists, removeStockFromWatchlist } = useWatchlistStore();
  const { getStock } = useStockStore();

  const [page, setPage] = useState(1);
  const [allData, setAllData] = useState<Stock[]>([]);
  const [currentPageData, setCurrentPageData] = useState<Stock[]>([]);
  const [isEditModalVisible, setEditModalVisible] = useState(false);

  const toggleEditModal = () => setEditModalVisible(!isEditModalVisible);

  const handleRemoveStock = (symbol: string) => {
    removeStockFromWatchlist(type, symbol);
    const updated = allData.filter((stock) => stock.ticker !== symbol);
    setAllData(updated);
  };

  useEffect(() => {
    navigation.setOptions({ headerTitle: `${type}` });

    let tickers: string[] = [];
    if (type === 'Top Movers') tickers = topMovers;
    else if (type === 'Top Losers') tickers = topLosers;
    else tickers = getStocksFromWatchlist(type);

    const fullData = tickers
      .map((ticker) => {
        const stock = getStock(ticker);
        if (!stock) console.warn(`No stock data found for ticker: ${ticker}`);
        return stock;
      })
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
    if (type !== 'Top Movers' && type !== 'Top Losers') {
      navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity onPress={toggleEditModal} style={{ marginRight: 0 }}>
            <Ionicons name="pencil-outline" size={24} color="black" />
          </TouchableOpacity>
        ),
      });
    } else {
      navigation.setOptions({ headerRight: () => null });
    }
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

      {totalPages > 0 && (
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
            style={{ flex: 1, backgroundColor: 'white', paddingHorizontal: 20, paddingTop: 16 }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
              <TouchableOpacity onPress={toggleEditModal} style={{ marginRight: 8 }}>
                <Ionicons name="arrow-back" size={24} color="black" />
              </TouchableOpacity>
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Edit Watchlist: {type}</Text>
            </View>

            {allData.length === 0 ? (
              <Text>No stocks to show</Text>
            ) : (
              <View style={{ flex: 1 }}>
                {allData.map((stock) => (
                  <View
                    key={stock.ticker}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      paddingVertical: 12,
                      borderBottomWidth: 1,
                      borderColor: '#e0e0e0',
                    }}
                  >
                    <Text style={{ fontSize: 16 }}>{stock.ticker}</Text>
                    <TouchableOpacity onPress={() => handleRemoveStock(stock.ticker)}>
                      <Ionicons name="close-circle-outline" size={24} color="red" />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}
          </SafeAreaView>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
});
