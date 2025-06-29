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
import { Alert, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import { KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { getStockDataMonthly,getStockDataDaily,getStockDataWeekly } from '@/api/stock';
import { useChartStore } from '@/store/useStockChartData';
import AlertModal from '@/components/AlertModal';
import { useStyles } from '@/hooks/useStyle';

export default function StockDetailScreen({ticker, price , changePrice, changePercent}: Stock) {
  const { symbol } = useLocalSearchParams<{ symbol: string }>();
  const router = useRouter();
  const {styles, theme} = useStyles();
  const [isModalVisible, setModalVisible] = useState(false);
  const [isCreateModalVisible, setCreateModalVisible] = useState(false);
  // const [newWatchlistName, setNewWatchlistName] = useState('');
  // const [error, setError] = useState('');
  const [localStockDetail, setlocalStockDetail] = useState<StockDetail>();
  const { getStockDetail,isDetailStale,setStockDetail } = useStockDetailStore();
  const { getStock } = useStockStore();
  const { getChartData, setChartData, hasChartData } = useChartStore();
  const [selectedRange, setSelectedRange] = useState<'1W' | '1M' | '1Y'>('1W');
  const [loadingChart, setLoadingChart] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
const [alertMessage, setAlertMessage] = useState('');

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

  const showAlert = (message: string, timeout = 1500) => {
  setAlertMessage(message);
  setAlertVisible(true);
  setTimeout(() => {
    setAlertVisible(false);
    setAlertMessage('');
  }, timeout);
};


useEffect(() => {
  if (symbol) {
    handleRangeChange('1W');
  }
}, [symbol]);

const handleRangeChange = async (range: '1W' | '1M' | '1Y') => {
  if (!symbol) return;

  setSelectedRange(range);
  setLoadingChart(true);

  const cached = getChartData(symbol, range);
  if (cached && cached.length > 0) {
    console.log(`[CACHE HIT] ${symbol} ${range}`);
    setLoadingChart(false);
    return;
  }

  try {
    console.log(`[API FETCH] ${symbol} ${range}`);
    let fetchedData;

    if (range === '1W') {
      fetchedData = await getStockDataDaily(symbol);
    } else if (range === '1M') {
      fetchedData = await getStockDataWeekly(symbol);
    } else if (range === '1Y') {
      fetchedData = await getStockDataMonthly(symbol);
    }

    if (
      !fetchedData ||
      Object.keys(fetchedData).length === 0 ||
      fetchedData.Information
    ) {
      console.error('Failed to fetch stock data:', fetchedData?.Information || fetchedData);
      Alert.alert('API Limit Reached', 'Please try again later.');
      setLoadingChart(false);
      return;
    }

    const rawTimeSeries =
      fetchedData['Time Series (Daily)'] ||
      fetchedData['Weekly Adjusted Time Series'] ||
      fetchedData['Monthly Adjusted Time Series'];

    if (!rawTimeSeries) {
      console.error('Invalid chart data format');
      setLoadingChart(false);
      return;
    }

    const transformed = Object.entries(rawTimeSeries)
      .map(([date, entry]: [string, any]) => ({
        date,
        price: parseFloat(entry['5. adjusted close'] || entry['4. close']),
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    // ⏳ Take last N entries based on range
    let finalData: { date: string; price: number }[] = [];
    if (range === '1W') {
      finalData = transformed.slice(-7);
    } else if (range === '1M') {
      finalData = transformed.slice(-4);
    } else if (range === '1Y') {
      finalData = transformed.slice(-12);
    }

    setChartData(symbol, range, finalData);
  } catch (err) {
    console.error(`[FETCH ERROR] Chart ${range}`, err);
    Alert.alert('Error', 'Something went wrong while fetching chart data.');
  }

  setLoadingChart(false);
};


useEffect(() => {
  setSelectedStockSymbol(symbol);

  const fetchStockDetail = async () => {
    try {
      if (!isDetailStale(symbol)) {
        console.log("Using cached data");
        setlocalStockDetail(getStockDetail(symbol));
        return;
      }

      const rawStockDetail = await getCompanyOverview(symbol as string);

      if (
        !rawStockDetail ||
        Object.keys(rawStockDetail).length === 0 ||
        rawStockDetail.Information
      ) {
        Alert.alert('API Limit Reached', 'Please try again later.');
        console.error('API limit or empty response:', rawStockDetail?.Information || rawStockDetail);
        return;
      }

      rawStockDetail.ticker = symbol;

      const stockMetaData = getStock(symbol);
      if (!stockMetaData) {
        throw new Error(`Stock metadata not found for symbol: ${symbol}`);
      }

      const cleanedStockDetail: StockDetail = transformStockDetail(rawStockDetail);
      cleanedStockDetail.ticker = symbol;
      cleanedStockDetail.price = stockMetaData.price;
      cleanedStockDetail.changePrice = stockMetaData.changePrice;
      cleanedStockDetail.changePercent = stockMetaData.changePercent;

      setlocalStockDetail(cleanedStockDetail);
      setStockDetail(symbol, cleanedStockDetail);

      console.log('Transformed Stock Detail:', cleanedStockDetail);
    } catch (error) {
      console.error('Error fetching stock detail:', error);
      Alert.alert('Error', 'Something went wrong while fetching stock details.');
    }
  };

  fetchStockDetail();
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
  setCheckState(prev => ({ ...prev, [newWatchlistName.trim()]: true }));
  setNewWatchlistName('');
  toggleCreateModal();
  showAlert('Watchlist created!');
};


const displayStat = (value: any) =>
  value === undefined || value === null || isNaN(value) ? '-' : value;



const handleSave = () => {
  if (!selectedStockSymbol) return;
  Object.entries(checkState).forEach(([name, isChecked]) => {
    if (isChecked) {
      addStockToWatchlist(name, selectedStockSymbol);
    } else {
      removeStockFromWatchlist(name, selectedStockSymbol);
    }
  });
  toggleModal();
  showAlert('Changes saved to watchlist!');
};



  return (
<ScrollView style={[{paddingTop: 50, backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={styles.stockDetailHeader}>
  <TouchableOpacity onPress={() => router.back()}>
    <Ionicons name="arrow-back" size={24} color={theme.text} />
  </TouchableOpacity>
  <TouchableOpacity onPress={toggleModal}>
    <Ionicons
      name={isInWatchlist ? "bookmark" : "bookmark-outline"}
      size={24}
      color={isInWatchlist ? theme.success : theme.text}
    />
  </TouchableOpacity>
</View>

{/* Company Info */}
<View style={styles.stockDetailCompanyInfo}>
<View style={styles.logoCircle}>
  <Text style={styles.logoText}>
    {localStockDetail?.ticker?.[0]?.toUpperCase() ?? ''}
  </Text>
</View>
  <View style={styles.stockDetailCompanyText}>
    <Text style={styles.stockDetailCompanyName}>{localStockDetail?.name}</Text>
    <Text style={styles.stockDetailCompanyTicker}>{localStockDetail?.ticker}</Text>
  </View>
<View style={styles.stockDetailPriceContainer}>
  <Text style={styles.stockDetailPrice}>₹ {localStockDetail?.price.toFixed(2)}</Text>

  <View style={styles.priceChangeRow}>
    <Text
      style={
        (localStockDetail?.changePrice ?? 0) >= 0
          ? styles.changePositive
          : styles.changeNegative
      }
    >
      {(localStockDetail?.changePrice ?? 0) >= 0 ? '▲' : '▼'} ₹{Math.abs(localStockDetail?.changePrice ?? 0).toFixed(2)}
    </Text>

    <Text
      style={
        (localStockDetail?.changePrice ?? 0) >= 0
          ? styles.changePositivePercent
          : styles.changeNegativePercent
      }
    >
      ({Math.abs(localStockDetail?.changePercent ?? 0).toFixed(2)}%)
    </Text>
  </View>
</View>

</View>

<StockChart symbol={symbol} range={selectedRange} loading={loadingChart} />

{/* Chart Range Selector */}
<View style={styles.stockDetailRangeContainer}>
  {['1W', '1M', '1Y'].map((range) => (
    <TouchableOpacity
      key={range}
      onPress={() => handleRangeChange(range as '1W' | '1M' | '1Y')}
      style={[
        styles.stockDetailRangeButton,
        selectedRange === range && styles.stockDetailRangeButtonActive,
      ]}
    >
      <Text
        style={[
          styles.stockDetailRangeButtonText,
          selectedRange === range && styles.stockDetailRangeButtonTextActive,
        ]}
      >
        {range}
      </Text>
    </TouchableOpacity>
  ))}
</View>

{/* Info Box */}
<View style={styles.stockDetailInfoBox}>
  <Text style={styles.stockDetailInfoTitle}>About {localStockDetail?.name}</Text>
  <Text style={styles.stockDetailInfoDescription}>
    {localStockDetail?.description}
  </Text>

  {/* Tags */}
  <View style={styles.stockDetailTagsContainer}>
    <Text style={styles.stockDetailTagIndustry}>
      Industry: {localStockDetail?.industry}
    </Text>
    <Text style={styles.stockDetailTagSector}>
      Sector: {localStockDetail?.sector}
    </Text>
  </View>

  <CustomSlider
    high={localStockDetail?.['52WeekHigh']}
    low={localStockDetail?.['52WeekLow']}
    current={localStockDetail?.price}
  />

  {/* Stats */}
  <View style={styles.stockDetailStatsGrid}>
    <View style={styles.stockDetailStatItem}>
      <Text style={styles.stockDetailStatTitle}>Market Cap</Text>
      <Text style={styles.stockDetailStatValue}>{displayStat(localStockDetail?.marketCap)}</Text>
    </View>
    <View style={styles.stockDetailStatItem}>
      <Text style={styles.stockDetailStatTitle}>P/E Ratio</Text>
      <Text style={styles.stockDetailStatValue}>{displayStat(localStockDetail?.peRatio)}</Text>
    </View>
    <View style={styles.stockDetailStatItem}>
      <Text style={styles.stockDetailStatTitle}>Beta</Text>
      <Text style={styles.stockDetailStatValue}>{displayStat(localStockDetail?.beta)}</Text>
    </View>
    <View style={styles.stockDetailStatItem}>
      <Text style={styles.stockDetailStatTitle}>Dividend Yield</Text>
      <Text style={styles.stockDetailStatValue}>{displayStat(localStockDetail?.dividendYield)}</Text>
    </View>
    <View style={styles.stockDetailStatItem}>
      <Text style={styles.stockDetailStatTitle}>Profit Margin</Text>
      <Text style={styles.stockDetailStatValue}>{displayStat(localStockDetail?.profitMargin)}</Text>
    </View>
  </View>
</View>

<Modal
  isVisible={isModalVisible}
  onBackdropPress={toggleModal}
  style={{ justifyContent: 'flex-end', margin: 0 }}
>
  <View style={styles.popUpContainer}>
    <Text style={styles.popUpHeaderText}>Add Stock to</Text>

    <ScrollView style={styles.popUpScrollArea}>
      {watchlists.map((item) => (
        <View key={item.name} style={styles.popUpListItem}>
          <TouchableOpacity onPress={() => toggleCheck(item.name)}>
            <Ionicons
              name={checkState[item.name] ? 'checkbox' : 'square-outline'}
              size={24}
              color={checkState[item.name] ? theme.primary : theme.secondaryText}
            />
          </TouchableOpacity>
          <Text style={styles.popUpListItemText}>{item.name}</Text>
        </View>
      ))}
    </ScrollView>

    <TouchableOpacity onPress={toggleCreateModal}>
      <Text style={styles.popUpCreateTextLink}>+ Create a new watchlist</Text>
    </TouchableOpacity>

    <TouchableOpacity onPress={handleSave} style={styles.popUpSaveButton}>
      <Text style={styles.popUpSaveButtonText}>Save</Text>
    </TouchableOpacity>
  </View>
</Modal>

<Modal
  isVisible={isCreateModalVisible}
  onBackdropPress={toggleCreateModal}
  style={{ justifyContent: 'flex-end', margin: 0 }}
>
  <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
  >
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.popUpCreateModalContainer}>
        <Text style={styles.popUpHeaderText}>Create New Watchlist</Text>

        <TextInput
          value={newWatchlistName}
          onChangeText={(text) => {
            setNewWatchlistName(text);
            validateWatchlist(text);
          }}
          placeholder="Enter watchlist name"
          placeholderTextColor={theme.secondaryText}
          style={[
            styles.popUpInput,
            error ? styles.popUpInputError : styles.popUpInputDefault,
          ]}
        />

        {!!error && (
          <Text style={styles.popUpErrorText}>{error}</Text>
        )}

        <TouchableOpacity
          onPress={handleCreateWatchlist}
          disabled={!!error || !newWatchlistName.trim()}
          style={[
            styles.popUpCreateButton,
            (!!error || !newWatchlistName.trim()) && styles.popUpCreateButtonDisabled,
          ]}
        >
          <Text style={styles.popUpCreateButtonText}>Create</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  </KeyboardAvoidingView>
</Modal>


<AlertModal
  visible={alertVisible}
  message={alertMessage}
  onClose={() => setAlertVisible(false)}
/>



    </ScrollView>
  );
}