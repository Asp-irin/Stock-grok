import { getCompanyOverview } from '@/api/stock';
import CustomSlider from '@/components/customSlider';
import StockChart from '@/components/StockChart';
import { useStockDetailStore } from '@/store/useStockDetailStore';
import { useStockStore } from '@/store/useStockStore';
import { useWatchlistStore } from '@/store/useWacthlistStore';
import { Stock, StockDetail } from '@/util';
import { transformStockDetail } from '@/util/util';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';

export default function StockDetailScreen({ticker, price , changePrice, changePercent}: Stock) {
  const { symbol } = useLocalSearchParams<{ symbol: string }>();
  const router = useRouter();
  const [isModalVisible, setModalVisible] = useState(false);
  const [isCreateModalVisible, setCreateModalVisible] = useState(false);
  // const [newWatchlistName, setNewWatchlistName] = useState('');
  // const [error, setError] = useState('');
  const [localStockDetail, setlocalStockDetail] = useState<StockDetail>();
  const { getStockDetail,isDetailStale,setStockDetail } = useStockDetailStore();
  const { getStock } = useStockStore();
  const { watchlists, addWatchlist, addStockToWatchlist, removeStockFromWatchlist,getStockWatchlistStatus } = useWatchlistStore();
  const { isInWatchlist } = getStockWatchlistStatus(symbol);

const [selectedStockSymbol, setSelectedStockSymbol] = useState<string | null>(null);
const [checkState, setCheckState] = useState<{ [name: string]: boolean }>({});
const [newWatchlistName, setNewWatchlistName] = useState('');
const [error, setError] = useState('');
const [stockData, setStockData] = useState<Stock>();

  // setStockDetail(getStockDetail("IBM"));

  const toggleModal = () => setModalVisible(!isModalVisible);
  const toggleCreateModal = () => {
    setNewWatchlistName('');
    setError('');
    setCreateModalVisible(!isCreateModalVisible);
  };

  useEffect(()=>{
    setSelectedStockSymbol(symbol);
    const fetchStockDetailstockDetail = async () => {
      try{
        if(!isDetailStale){
          console.log("using cached data");
          setlocalStockDetail(getStockDetail(symbol))
          return
        }
        else{
          const rawStockDetail = await getCompanyOverview(symbol as string);
          rawStockDetail.ticker = symbol;
          const stockMetaData = getStock(symbol);
          if (!stockMetaData) {
            throw new Error(`Stock metadata not found for symbol: ${symbol}`);
          }
          // clean the stockDetail as well
          const cleanedStockDetail: StockDetail = transformStockDetail(rawStockDetail);
          cleanedStockDetail.ticker = symbol;
          cleanedStockDetail.price = stockMetaData.price;
          cleanedStockDetail.changePrice = stockMetaData.changePrice;
          cleanedStockDetail.changePercent = stockMetaData.changePercent;
          setlocalStockDetail(cleanedStockDetail);
          setStockDetail(symbol,cleanedStockDetail);

          console.log('Transformed Stock Detail stockDetail:', cleanedStockDetail);
        }
      } catch (error) {
        console.error('Error fetching stock detail stockDetail:', error);
      }
    };
    fetchStockDetailstockDetail();
  }, [symbol]);

  useEffect(() => {
  if (isModalVisible && selectedStockSymbol) {
    const initial = watchlists.reduce((acc, wl) => {
      acc[wl.name] = wl.stocks.includes(selectedStockSymbol);
      return acc;
    }, {} as { [name: string]: boolean });
    setCheckState(initial);
  }
}, [isModalVisible, selectedStockSymbol, watchlists]);

const toggleCheck = (watchlistName: string) => {
  setCheckState(prev => ({
    ...prev,
    [watchlistName]: !prev[watchlistName],
  }));
};

const validateWatchlist = (name: string) => {
  const trimmedName = name.trim();

  if (!trimmedName) return setError("Name can't be empty");

  if (watchlists.some(wl => wl.name === trimmedName)) {
    return setError("Watchlist already exists");
  }

  if (trimmedName.length < 1 || trimmedName.length > 18) {
    return setError("Name must be between 1 and 18 characters");
  }

  if (!/^[a-zA-Z0-9 ]+$/.test(trimmedName)) {
    return setError("Only letters and numbers are allowed");
  }
  setError('');
};

const handleCreateWatchlist = () => {
  if (error || !newWatchlistName.trim()) return;
  addWatchlist(newWatchlistName.trim());
  setCheckState(prev => ({ ...prev, [newWatchlistName.trim()]: true })); // auto-select new one
  setNewWatchlistName('');
  toggleCreateModal();
};
const formatMetric = (value: any) =>
  typeof value === 'number' && Number.isFinite(value) ? value : 'N/A';


const handleSave = () => {
  if (!selectedStockSymbol) return;
  Object.entries(checkState).forEach(([name, isChecked]) => {
    if (isChecked) {
      console.log("checked")
      addStockToWatchlist(name, selectedStockSymbol);
    } else {
      console.log("not checked")

      removeStockFromWatchlist(name, selectedStockSymbol);
    }
  });
  toggleModal();
};





//   useEffect(() => {
//   const detail = getStockDetail("IBM");
//   setStockDetail(detail);
// }, [symbol]);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: 'white', paddingTop: 50 }}>
      {/* Header */}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 22, marginBottom: 20 }}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons
            name="bookmark"
            size={24}
            color={isInWatchlist ? 'green' : 'black'}
            onPress={toggleModal}
          />
        </TouchableOpacity>
      </View>
      {/* Company Info */}
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 22}}>
        <Image style={{ width: 48, height: 48, marginRight: 12, borderWidth: 2 }} />
        <View style={{ flex: 1 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{localStockDetail?.name}</Text>
          <Text style={{ color: '#666' }}>{localStockDetail?.ticker}</Text>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{localStockDetail?.price}</Text>
          <Text>{localStockDetail?.changePercent}</Text>
          <Text>{localStockDetail?.changePrice}</Text>
        </View>
      </View>

      {/* Graph Placeholder */}
      {/* <View style={{ height: 200, backgroundColor: '#f0f0f0', marginHorizontal: 22, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginBottom: 24 }}> */}
{/* <View style={{ flex: 1, justifyContent: 'center' }}>
      <LineChart
        style={{ height: 200 }}
        stockDetail={stockDetail1}
        contentInset={{ top: 20, bottom: 20 }}
        curve={shape.curveNatural}
        svg={{ stroke: '#007AFF', strokeWidth: 4 }}
      >
        <Grid />
      </LineChart>
      </View> */}
      <StockChart />
      {/* </View> */}

      {/* Info Box */}
      <View style={{ borderWidth: 1, borderColor: '#e0e0e0', borderRadius: 12, marginHorizontal: 8, padding: 16, backgroundColor: 'white' }}>
        <Text style={{ fontWeight: '600', marginBottom: 8 }}>About {localStockDetail?.name}</Text>
        <Text style={{ color: '#444', marginBottom: 16, fontSize: 11 }}>{localStockDetail?.description}</Text>

        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
          <Text style={{ backgroundColor: '#f0c9c9', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 18, fontSize: 10 }}>Industry: {localStockDetail?.industry}</Text>
          <Text style={{ backgroundColor: '#fcd6b5', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 18, fontSize: 10 }}>Sector: {localStockDetail?.sector}</Text>
        </View>

        <CustomSlider high={localStockDetail?.['52WeekHigh']} low={localStockDetail?.['52WeekLow']} current={localStockDetail?.price} />

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap', rowGap: 1 }}>
          <View style={{ flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <Text style={styles.statTitle}>Market Cap</Text>
            <Text style={styles.statValue}>{localStockDetail?.marketCap }</Text>
          </View>
          <View style={{ flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <Text>P/E Ratio</Text>
            <Text>{localStockDetail?.peRatio}</Text>
          </View>
          <View style={{ flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <Text>Beta</Text>
            <Text>{localStockDetail?.beta}</Text>
          </View>
          <View style={{ flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <Text>Dividend Yield</Text>
            <Text>{localStockDetail?.dividendYield}</Text>
          </View>
          <View style={{ flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <Text>Profit Margin</Text>
            <Text>{localStockDetail?.profitMargin}</Text>
          </View>
        </View>
      </View>

      {/* Watchlist Modal */}
      {/* <Modal isVisible={isModalVisible} onBackdropPress={toggleModal} style={{ justifyContent: 'flex-end', margin: 0 }}>
        <View style={{ backgroundColor: 'white', borderTopLeftRadius: 20, borderTopRightRadius: 20, maxHeight: '90%', paddingHorizontal: 20, paddingTop: 20, paddingBottom: 10 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 16 }}>Add Stock to</Text>

          <View style={{ maxHeight: 250, marginBottom: 16 }}>
            <ScrollView>
              {watchlists.map(item => (
                <View key={item.id} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                  <TouchableOpacity onPress={() => toggleCheck(item.id)}>
                    <Ionicons name={item.checked ? 'checkbox' : 'square-outline'} size={24} color={item.checked ? '#007AFF' : '#666'} />
                  </TouchableOpacity>
                  <Text style={{ marginLeft: 12, fontSize: 16 }}>{item.name}</Text>
                </View>
              ))}
            </ScrollView>
          </View>

          <TouchableOpacity onPress={toggleCreateModal}>
            <Text style={{ color: '#007AFF', fontWeight: '600', fontSize: 16, marginBottom: 16 }}>+ Create a new watchlist</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={toggleModal} style={{ backgroundColor: '#007AFF', paddingVertical: 14, borderRadius: 8, alignItems: 'center', marginBottom: 10 }}>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Save</Text>
          </TouchableOpacity>
        </View>
      </Modal> */}

      {/* Create New Watchlist Modal */}
      {/* <Modal isVisible={isCreateModalVisible} onBackdropPress={toggleCreateModal} style={{ justifyContent: 'flex-end', margin: 0 }}>
        <View style={{ backgroundColor: 'white', padding: 20, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 16 }}>Create New Watchlist</Text>

          <TextInput
            value={newWatchlistName}
            onChangeText={(text) => {
              setNewWatchlistName(text);
              validateWatchlist(text);
            }}
            placeholder="Enter watchlist name"
            style={{
              borderWidth: 1,
              borderColor: error ? 'red' : '#ccc',
              borderRadius: 8,
              paddingHorizontal: 12,
              height: 44,
              marginBottom: 6,
            }}
          />

          {!!error ? (
  <View>
    <Text style={{ color: 'red', fontSize: 12, marginBottom: 12 }}>{error}</Text>
    <TouchableOpacity
      disabled
      style={{
        backgroundColor: '#121212',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
      }}>
      <Text style={{ color: 'white', fontWeight: 'bold' }}>Create</Text>
    </TouchableOpacity>
  </View>
) : (
  <TouchableOpacity
    onPress={handleCreateWatchlist}
    style={{
      backgroundColor: '#007AFF',
      paddingVertical: 12,
      borderRadius: 8,
      alignItems: 'center',
    }}>
    <Text style={{ color: 'white', fontWeight: 'bold' }}>Create</Text>
  </TouchableOpacity>
)}

          
          
        </View>
      </Modal> */}


<Modal
  isVisible={isModalVisible}
  onBackdropPress={toggleModal}
  style={{ justifyContent: 'flex-end', margin: 0 }}
>
  <View style={{
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '95%',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10
  }}>
    <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 16 }}>
      Add Stock to
    </Text>

    <ScrollView style={{ flexGrow: 1, marginBottom: 16 }}>
      {watchlists.map((item) => (
        <View key={item.name} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
          <TouchableOpacity onPress={() => toggleCheck(item.name)}>
            <Ionicons
              name={checkState[item.name] ? 'checkbox' : 'square-outline'}
              size={24}
              color={checkState[item.name] ? '#007AFF' : '#666'}
            />
          </TouchableOpacity>
          <Text style={{ marginLeft: 12, fontSize: 32 }}>{item.name}</Text>
        </View>
      ))}
    </ScrollView>

    <TouchableOpacity onPress={toggleCreateModal}>
      <Text style={{ color: '#007AFF', fontWeight: '600', fontSize: 16, marginBottom: 16 }}>
        + Create a new watchlist
      </Text>
    </TouchableOpacity>

    <TouchableOpacity
      onPress={handleSave}
      style={{
        backgroundColor: '#007AFF',
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 10
      }}
    >
      <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>
        Save
      </Text>
    </TouchableOpacity>
  </View>
</Modal>
<Modal
  isVisible={isCreateModalVisible}
  onBackdropPress={toggleCreateModal}
  style={{ justifyContent: 'flex-end', margin: 0 }}
>
  <View style={{
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  }}>
    <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 16 }}>
      Create New Watchlist
    </Text>

    <TextInput
      value={newWatchlistName}
      onChangeText={(text) => {
        setNewWatchlistName(text);
        validateWatchlist(text);
      }}
      placeholder="Enter watchlist name"
      style={{
        borderWidth: 1,
        borderColor: error ? 'red' : '#ccc',
        borderRadius: 8,
        paddingHorizontal: 12,
        height: 44,
        marginBottom: 6,
      }}
    />

{!!error && (
  <Text style={{ color: 'red', fontSize: 12, marginBottom: 4 }}>{error}</Text>
)}

<TouchableOpacity
  onPress={handleCreateWatchlist}
  disabled={!!error || !newWatchlistName.trim()}
  style={{
    backgroundColor: !!error || !newWatchlistName.trim() ? '#121212' : '#007AFF',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  }}>
  <Text style={{ color: 'white', fontWeight: 'bold' }}>Create</Text>
</TouchableOpacity>

  </View>
</Modal>


    </ScrollView>
  );
}

const styles = {
  statTitle: { fontSize: 12, color: '#666' },
  statValue: { fontSize: 14, color: '#000' },
};
