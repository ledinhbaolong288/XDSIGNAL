import React, { useEffect, useState } from "react";
import { Text, View, Pressable, ScrollView } from "react-native";
import { Entypo, AntDesign, Feather } from "@expo/vector-icons";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import { SvgUri } from 'react-native-svg';
import Modal from 'react-native-modal'
import { Image } from "react-native";
import moment from "moment";

const QuoteItem = ({ itemQuote, time, open, low, high }) => {
  const {
    base_currency,
    quote_currency,
    ask,
    bid
  } = itemQuote;

  const normalizeMarketCap = (marketCap) => {
    if (marketCap > 1e12) {
      return `${(marketCap / 1e12)?.toFixed(3)}T`;
    }
    if (marketCap > 1e9) {
      return `${(marketCap / 1e9)?.toFixed(3)}B`;
    }
    if (marketCap > 1e6) {
      return `${(marketCap / 1e6)?.toFixed(3)}M`;
    }
    if (marketCap > 1e3) {
      return `${(marketCap / 1e3)?.toFixed(3)}K`;
    }
    if (marketCap > 1e2) {
      return `${(marketCap / 1e0)?.toFixed(3)}`;
    }
    if (marketCap > 1e1) {
      return `${(marketCap / 1e0)?.toFixed(4)}`;
    }
    if (marketCap > 1e0) {
      return `${(marketCap / 1e0)?.toFixed(5)}`;
    }
    return marketCap;
  };

  return (
    <ScrollView>
      <Pressable
        style={styles.coinContainer}
      >
        <View style={{ display: 'flex', width: "25%", flexDirection: 'column', alignItems: 'flex-start' }}>
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: 4 }}>
            <Text style={{ fontSize: 12, color: "#C5C5C5" }}>{open - ask > 0 && "+"}{(open - ask)?.toFixed(4)}</Text>
            <Text style={{ fontSize: 12, color: ((open - ask) / open *100) > 0 ? "#00A9FF" : ((open - ask) / open *100) === 0 ? "#C5C5C5" : "#D83F31" }}>{((open - ask) / open *100)?.toFixed(2)}%</Text>
          </View>
          <Text style={[styles.title, { fontSize: 20, color: '#2962ff' }]}>{base_currency}{quote_currency}</Text>
          <Text style={[styles.title, { fontSize: 12, fontWeight: "300", color: '#c5c5c5' }]}>{time}</Text>
        </View>
        <View style={{ display: 'flex', width: "70%", flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start' }}>
            <Text style={{ fontSize: 20, width: 80, color: "#16c784", fontWeight: "700" }}>{normalizeMarketCap(ask)}</Text>
            <Text style={{ fontSize: 20,  width: 80, textAlign: "right", color: "#D83F31", fontWeight: "700" }}>{normalizeMarketCap(bid)}</Text>
          </View>
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: 10 }}>
            <Text style={{ fontSize: 14, color: "#C5C5C5", fontWeight: "400" }}>L: {normalizeMarketCap(low)}</Text>
            <Text style={{ fontSize: 14, color: "#C5C5C5", fontWeight: "400" }}>H: {normalizeMarketCap(high)}</Text>
          </View>
        </View>
      </Pressable>
    </ScrollView>


  );
};

export default QuoteItem;
