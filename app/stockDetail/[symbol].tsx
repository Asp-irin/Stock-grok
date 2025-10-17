import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';

export default function StockDetailScreen() {
  const router = useRouter();
    const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const { symbol } = useLocalSearchParams();

const data = {
  name: 'International Business Machines',
  symbol: 'IBM, Common Stock',
  exchange: 'NYSE',
  logo: 'https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg', // optional, or use a local asset
  price: '$177.15', // if coming from a separate API
  change: '+0.41%',
  changeColor: 'green',
  low: '$165.47',
  high: '$296.16',
  marketCap: '$273.05B',
  peRatio: '50.22',
  beta: '0.652',
  dividend: '2.29%',
  margin: '8.71%',
  industry: 'Computer & Office Equipment',
  sector: 'Technology',
  description: `International Business Machines Corporation (IBM) is an American multinational technology company headquartered in Armonk, New York, with operations in over 170 countries. The company began in 1911, founded in Endicott, New York, as the Computing-Tabulating-Recording Company (CTR) and was renamed IBM in 1924...`,
};


  return (
    <ScrollView style={{ flex: 1, backgroundColor: 'white', paddingTop: 50 }}>
      {/* Header */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 22,
          marginBottom: 20,
        }}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="bookmark-outline" size={24} color="black" onPress={toggleModal}/>
        </TouchableOpacity>
      </View>

      {/* Company Info */}
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 22,
        marginBottom: 16,
      }}>
        <Image source={{ uri: data.logo }} style={{ width: 48, height: 48, marginRight: 12 }} />
        <View style={{ flex: 1 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{data.name}</Text>
          <Text style={{ color: '#666' }}>{data.symbol}</Text>
          <Text style={{ color: '#666' }}>{data.exchange}</Text>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{data.price}</Text>
          <Text style={{ color: data.changeColor }}>{data.change}</Text>
        </View>
      </View>

      {/* Graph Box Placeholder */}
      <View style={{
        height: 200,
        backgroundColor: '#f0f0f0',
        marginHorizontal: 22,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
      }}>
        <Text style={{ color: '#888' }}>[Graph Placeholder]</Text>
      </View>

      {/* Info Box */}
      <View style={{
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 12,
        marginHorizontal: 8,
        padding: 16,
        backgroundColor: 'white',
      }}>
        {/* About Section */}
        <Text style={{ fontWeight: '600', marginBottom: 8 }}>About {data.name}</Text>
        <Text style={{ color: '#444', fontSize: 14, marginBottom: 16 }}>{data.description}</Text>

        {/* Tags */}
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
          <Text style={{ backgroundColor: '#f0c9c9', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6 }}>
            Industry: {data.industry}
          </Text>
          <Text style={{ backgroundColor: '#fcd6b5', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6 }}>
            Sector: {data.sector}
          </Text>
        </View>

        {/* Stats */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
          {/* <View style={{ flexDirection: 'column', alignItems: 'center', gap: 4 }}>
          <Text style={styles.statTitle}>Market Cap</Text>
          <Text style={styles.statValue}>{data.marketCap}</Text>
          </View> */}
          {/* <View style={{ flexDirection: 'column', alignItems: 'center', gap: 4 }}>
          <Text style={styles.statTitle}>Market Cap</Text>
          <Text style={styles.statValue}>{data.marketCap}</Text>
          </View> */}
          <Text>52-Week Low: {data.low}</Text>
          <Text>52-Week High: {data.high}</Text>
        </View>
        {/* optimise this with an array and loop over it through a map */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap', rowGap: 1 }}>
          <View style={{ flexDirection: 'column', alignItems: 'center', gap: 4 }}>
          <Text style={styles.statTitle}>Market Cap</Text>
          <Text style={styles.statValue}>{data.marketCap}</Text>
          </View>
          <View style={{ flexDirection: 'column', alignItems: 'center', gap: 4 }}>
          <Text>P/E Ratio</Text>
          <Text>{data.peRatio}</Text>
          </View>
          <View style={{ flexDirection: 'column', alignItems: 'center', gap: 4 }}>
          <Text>Beta</Text>
          <Text>{data.beta}</Text>
          </View>
          <View style={{ flexDirection: 'column', alignItems: 'center', gap: 4 }}>
          <Text>Dividend Yield</Text>
          <Text>{data.dividend}</Text>
          </View>
          <View style={{ flexDirection: 'column', alignItems: 'center', gap: 4 }}>
          <Text>Profit Margin</Text>
          <Text>{data.margin}</Text>
          </View>

        </View>
      </View>
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={toggleModal}
        style={{
          justifyContent: 'flex-end',
          margin: 0,
        }}
        animationIn="slideInUp"
        animationOut="slideOutDown"
      >
        <View style={{
          backgroundColor: 'white',
          padding: 20,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}>
          <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 10 }}>
            Save this stock?
          </Text>
          <Text style={{ color: '#666', marginBottom: 20 }}>
            Add this stock to your watchlist to track performance.
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: '#1976d2',
              paddingVertical: 12,
              borderRadius: 8,
              alignItems: 'center',
            }}
            onPress={() => {
              // Save logic
              toggleModal();
            }}
          >
            <Text style={{ color: 'white', fontWeight: '600' }}>Add to Watchlist</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </ScrollView>
  );
}


const styles = {
  statTitle: {
    fontSize: 12,
    color: '#666',
  },
  statValue: {
    fontSize: 14,
    // fontWeight: 'bold',
    color: '#000',
  },
}