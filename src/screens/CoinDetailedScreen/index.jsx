import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
import WebView from "react-native-webview";
import SiderBar from "../../components/Sidebar";
import { ScrollView, StyleSheet, TextInput } from "react-native";
import { View } from "react-native";
import { Text } from "react-native";
import Banner from "../../components/Banner";
import { t } from "i18next";
import SearchBar from "../../components/Search/SearchBar";
import { Pressable } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, { BottomSheetFlatList, BottomSheetView } from "@gorhom/bottom-sheet"
import { Ionicons } from '@expo/vector-icons';

const CoinDetailedScreen = () => {
  const route = useRoute();
  const {
    params: { coinId, vip },
  } = route;

  const sheetRef = useRef(null)
  const [value, setValue] = useState(coinId)

  const snapPoints = useMemo(() => ["1%", "90%"], []);

  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  const [fakeData, setFakeData] = useState();

  const handleSnapPress = useCallback((index) => {
    sheetRef.current?.snapToIndex(index);
  }, []);

  // get data from the fake api
  useEffect(() => {
    const getData = async () => {
      const apiResponse = await fetch(
        "https://musicappandroid1200.000webhostapp.com/login/dataSearchForex.php"
      );
      const data = await apiResponse.json();
      setFakeData(data);
    };
    getData();
  }, []);

  // render
  const renderItem = ({ item, index }) => {
    // when no input, show all
    if (searchPhrase === "") {
      return <Pressable style={[styles.sheetHeader, {
        backgroundColor: "#12121C", borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: "#282828"
      }]} onPress={() => (Number(item.id) === (index + 1) && setValue(item.symbol), handleSnapPress(0), setSearchPhrase(''))}>
        <Text style={[styles.txtSearch]}>{item.name}</Text>
      </Pressable>;
    }
    // // filter of the name
    if (item.symbol.includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))) {
      return <Pressable style={[styles.sheetHeader, {
        backgroundColor: "#12121C", borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: "#282828"
      }]} onPress={() => (Number(item.id) === (index + 1) && setValue(item.symbol), handleSnapPress(0), setSearchPhrase(''))}>
        <Text style={[styles.txtSearch]}>{item.name}</Text>
      </Pressable>;
    }
  };

  const runFirst = `
      setTimeout(function() {document.getElementById('overlap-manager-root').style.visibility='hidden';}, 5*60000);
    `;

  const htmlContent = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width">
      <title>TradingView Chart</title>
      <script src="https://s3.tradingview.com/tv.js"></script>
      <style>
      .tv-header__title {
          font-size: 120px !important;
      }
      #tv_chart_container {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          font-size: 45px !important;
        }
      .tv-header__top-line {
          height: 250px !important;
      }
    </style>
    </head>
    <body>
      <div id="tv_chart_container"></div>
      <script>
        const tvChart = new TradingView.widget({
          symbol: '${value === "" ? coinId : value}',
          interval: 'D',
          "timezone": "Etc/UTC",
          theme: 'dark',
          width: '100%',
          backgroundColor: "#0F0F0F",
          isTransparent: true,
          height: '100%',
          save_image: false,
          locale: "${t('en') === "English" ? "en" : "vi_VN"}",
          toolbar_color: "#0F0F0F",
          container_id: 'tv_chart_container'
        });
        tvChart.onChartReady(function() {
          tvChart.addCustomCSSFile('./tradingView.css')
        })
        document.querySelector('.tv-header__link').remove();
      </script>
    </body>
  </html> `;


  return (
    <>
      <SiderBar />
      <GestureHandlerRootView style={{ flex: 2, backgroundColor: "rgba(255,255,255,0.1)" }} keyboardVerticalOffset={80} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          {vip === "0" && <Banner />}
          <WebView source={{ uri: 'https://www.tradingview.com/chart/?symbol=HOSE%3AVNINDEX&theme=dark' }} injectedJavaScript={runFirst} style={[styles.container, { height: vip === "0" ? 488 : "100%", paddingBottom: vip === "0" ? 0 : 30, backgroundColor: "#000" }]} />
        </ScrollView>
      </GestureHandlerRootView>
    </>

  );
};

const styles = StyleSheet.create({
  txt: {
    fontSize: 14,
    fontWeight: "500",
    fontFamily: 'DroidSans',
    width: "18%",
    paddingVertical: 2,
    textAlign: 'center',
    color: '#fff',
    backgroundColor: "#39A7FF",
    borderRadius: 4
  },
  input: {
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: '#0F0F0F',
    borderRadius: 6,
    marginVertical: 2,
    color: '#000',
  },
  container: {
    width: "100%"
  },
  containerSheet: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    flexDirection: 'column',
    paddingRight: 6
  },
  sheetHeader: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 4,
    backgroundColor: 'rgba(58,58,71,0.3)',
    borderRadius: 10,
  },
  contentContainer: {
    paddingHorizontal: 40,
    paddingVertical: 20
  },
  txtSearch: {
    fontSize: 20,
    fontWeight: "500",
    fontFamily: 'DroidSans',
    color: "#fff",
    marginBottom: 20
  }
});

export default CoinDetailedScreen;


