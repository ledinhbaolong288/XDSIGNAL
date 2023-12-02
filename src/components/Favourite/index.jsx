import React from "react";
import { Text, View, Image, Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";

const Favourite = ({ marketCoin }) => {
  const {
    id,
    name,
    current_price,
    market_cap_rank,
    price_change_percentage_24h,
    symbol,
    market_cap,
    image,
  } = marketCoin;

  const navigation = useNavigation();

  const percentageColor =
    price_change_percentage_24h < 0 ? "#ea3943" : "#16c784" || 'white';

  const normalizeMarketCap = (marketCap) => {
    if (marketCap > 1e12) {
      return `${(marketCap / 1e12).toFixed(3)} T`;
    }
    if (marketCap > 1e9) {
      return `${(marketCap / 1e9).toFixed(3)} B`;
    }
    if (marketCap > 1e6) {
      return `${(marketCap / 1e6).toFixed(3)} M`;
    }
    if (marketCap > 1e3) {
      return `${(marketCap / 1e3).toFixed(3)} K`;
    }
    return marketCap;
  };

  return (

    <Pressable
      key={id}
      style={styles.containerItem}
      onPress={() => navigation.navigate("CoinDetailedScreen", { coinId: id })}
    >
      <View style={{ gap: 8 }}>
        <View style={[styles.boxName]}>
          <Text style={[styles.title, { fontSize: 12 }]}>{name}</Text>
        </View>
        <Text style={[styles.title, { fontSize: 10, fontWeight: "100", color: '#BFBFBF' }]}>{symbol.toUpperCase()}</Text>
      </View>
      <View style={{ gap: 8 }}>
        <Text style={[styles.title, { fontSize: 16, fontWeight: "bold", color: '#F2F2F2' }]}>{current_price}</Text>
        <View style={{ flexDirection: 'row' }}>
          <AntDesign
            name={price_change_percentage_24h < 0 ? "caretdown" : "caretup"}
            size={12}
            color={percentageColor}
            style={{ alignSelf: "center", marginRight: 5 }}
          />
          <Text style={{ color: percentageColor }}>
            {price_change_percentage_24h?.toFixed(2)}%
          </Text>
        </View>
      </View>
    </Pressable>

  );
};

export default Favourite;
