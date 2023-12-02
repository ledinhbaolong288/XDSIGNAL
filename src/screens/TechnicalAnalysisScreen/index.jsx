import { useRoute } from "@react-navigation/native";
import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import WebView from "react-native-webview";
import SiderBar from "../../components/Sidebar";
import { ImageBackground, ScrollView, StyleSheet, TextInput, View } from "react-native";
import Banner from "../../components/Banner";
import { t } from "i18next";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, { BottomSheetFlatList, BottomSheetView } from "@gorhom/bottom-sheet"
import { Ionicons } from '@expo/vector-icons';
import SearchBar from "../../components/Search/SearchBar";
import { Pressable } from "react-native";
import { Text } from "react-native";

const TechnicalAnalysisScreen = () => {
  const route = useRoute();
  const {
    params: { coinId, vip },
  } = route;

  const sheetRef = useRef(null)
  const [value, setValue] = useState(coinId);
  const [valueSymbol, setValueSymbol] = useState(coinId);

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
        "https://musicappandroid1200.000webhostapp.com/login/Analystic.php"
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
      }]} onPress={() => (Number(item.id) === (index + 1) && (setValue(item.symbol), setValueSymbol(item.name)), handleSnapPress(0), setSearchPhrase(''))}>
        <Text style={[styles.txtSearch]}>{item.name}</Text>
      </Pressable>;
    }
    // // filter of the name
    if (item.symbol.toUpperCase().includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))) {
      return <Pressable style={[styles.sheetHeader, {
        backgroundColor: "#12121C", borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: "#282828"
      }]} onPress={() => (Number(item.id) === (index + 1) && (setValue(item.symbol), setValueSymbol(item.name)), handleSnapPress(0), setSearchPhrase(''))}>
        <Text style={[styles.txtSearch]}>{item.name}</Text>
      </Pressable>;
    }
  };

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
          height: 110%;
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
      <div id="tv_chart_container">
      
      <script type="text/javascript" src="https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js" async>
  {
  "symbol": "${value === "" ? coinId : value}",
  "interval": "1m",
  "width": "100%",
  "isTransparent": true,
  "height": "100%",
  "showIntervalTabs": true,
  "displayMode": "multiple",
  "locale": "${t('en') === "English" ? "en" : "vi_VN"}",
  "colorTheme": "dark"
}
  </script>
      </div>
    </body>
  </html> `;

  return (
    <>
      <SiderBar />
      <GestureHandlerRootView style={{ flex: 2, backgroundColor: "rgba(255,255,255,0.1)" }} keyboardVerticalOffset={80} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ padding: vip === "0" ? 10 : 0 }}>
          {vip === "0" && <Banner />}
          <View style={{ width: "100%", paddingHorizontal: 6, height: 30, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
            <Pressable style={[styles.input, { paddingHorizontal: 0, paddingVertical: 0 }]} onPress={() => handleSnapPress(1)}>
              <TextInput
                placeholder={'VNINDEX'}
                // maxLength={10}
                // onChangeText={val => onChangeName(val)}
                value={valueSymbol}
                style={[styles.input, { color: "#fff" }]}
                editable={false}
                placeholderTextColor={'rgba(191,191,191,1)'}
              />
            </Pressable>

          </View>
          <WebView source={{ html: htmlContent }} style={[styles.container, { height: vip === "0" ? 450 : "120%", backgroundColor: "#0F0F0F" }]} />
        </ScrollView>
        <BottomSheet
          ref={sheetRef}
          backgroundStyle={{ backgroundColor: '#12121C' }}
          snapPoints={snapPoints}
          enablePanDownToClose={true}
          handleIndicatorStyle={{ display: 'none' }}
          onClose={() => (handleSnapPress(0), setSearchPhrase(''))}>
          <BottomSheetView>
            <View style={styles.containerSheet}>
              <Pressable style={styles.sheetHeader} onPress={() => (handleSnapPress(0), setSearchPhrase(''))}>
                <Ionicons name="ios-close-circle-outline" size={24} color="#fff" />
              </Pressable>
            </View>
            <SearchBar
              searchPhrase={searchPhrase}
              setSearchPhrase={setSearchPhrase}
              clicked={clicked}
              setClicked={setClicked}
            />
          </BottomSheetView>

          <BottomSheetFlatList
            data={fakeData}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={[styles.contentContainer, { paddingVertical: searchPhrase && 10 }]}
          />

        </BottomSheet>
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

export default TechnicalAnalysisScreen;


