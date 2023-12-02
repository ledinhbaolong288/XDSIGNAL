import React, { useEffect, useState } from "react";
import { Text, View, Image, Pressable } from "react-native";
import { Foundation } from "@expo/vector-icons";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import { getLogoData } from "../../services/requests";
import { AntDesign } from "@expo/vector-icons";

const CoinTrending = ({ marketCoin }) => {
  const {
    name,
    changesPercentage,
    symbol,
    price,
  } = marketCoin;

  const navigation = useNavigation();

  // const normalizeMarketCap = (marketCap) => {
  //   if (marketCap < 10) {
  //     return `${(marketCap).toFixed(5)} USD`;
  //   }
  //   return marketCap;
  // };


  const [logos, setLogos] = useState([]);

  const fetchLogo = async () => {
    if (symbol) {
      const logoData = await getLogoData(symbol);
      setLogos(logoData);
    }
  };

  useEffect(() => {
    fetchLogo();
  }, []);


  return (
    <Pressable
      style={styles.coinContainer}
      onPress={() => navigation.navigate("CoinDetailedScreen", { coinId: symbol, name: symbol })}
    >

      {/* <Image
        source={{ uri: logos.url }}
        style={{
          height: 30,
          width: 30,
          marginRight: 10,
          alignSelf: "center",
        }}
      /> */}
      <View>
        <Text style={styles.title}>{symbol}</Text>
        <Text style={styles.text}>{name?.toUpperCase()}</Text>
      </View>
      <View style={{ marginLeft: "auto", alignItems: "flex-end" }}>
        <Text style={styles.title}>{price} USD</Text>
        <View style={[styles.rankContainer, { backgroundColor: changesPercentage < 0 ? "#ea3943" : "#16c784" || "white" }]}>
          <Text style={styles.rank}>{changesPercentage != null ? changesPercentage?.toFixed(2) : 0}%</Text>
        </View>
      </View>
    </Pressable>

  );
};

export default CoinTrending;
