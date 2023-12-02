import React, { useEffect, useState } from "react";
import { FlatList, View, Text, RefreshControl, StyleSheet, ImageBackground } from "react-native";
import { getGainersData, getTrendingData } from "../../services/requests";
import CoinTrending from "../../components/CoinTrending";


const StockTrend = () => {
  const [coins, setCoins] = useState([]);
  const [gainers, setGainers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCoins = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    const coinsData = await getTrendingData();
    setCoins(coinsData);
    setLoading(false);
  };

  useEffect(() => {
    fetchCoins();
  }, []);

  const getHeader = () => {
    return (
      coins != null ?
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Trending</Text>
          <View style={styles.btnTime}>
            <Text style={[styles.title, { fontSize: 12 }]}>24 hour</Text>
          </View>
        </View>
        : null
    );
  };

  return (
    <FlatList
        style={{ flexGrow: 1 }}
        data={coins}
        renderItem={({ item }) =>
          <CoinTrending marketCoin={item} />
        }
        ListHeaderComponent={getHeader}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            tintColor="white"
            onRefresh={fetchCoins}
          />
        }
      />
  );
};

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    flexDirection: "column"
  },
  titleContainer: {
    flexDirection: 'row',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15
  },
  title: {
    fontSize: 14,
    color: '#fff',
    fontFamily: 'DroidSans'
  },
  btnTime: {
    padding: 2,
    paddingLeft: 6,
    paddingRight: 6,
    borderRadius: 8,
    borderColor: '#BFBFBF',
    borderWidth: 1
  }

});

export default StockTrend;
