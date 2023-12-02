import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import styles from "./styles";
import { Ionicons } from '@expo/vector-icons';
import { ActivityIndicator, Pressable, StyleSheet, View } from "react-native";
import { useTranslation } from "react-i18next";
import { Text } from "react-native";
import BottomSheet, { BottomSheetFlatList, BottomSheetView } from "@gorhom/bottom-sheet"
import SearchBar from "../Search/SearchBar";
import { addNotification, onDisplayNotification } from "../../utils/commonUtils";

const AddQuote = (props) => {

  const { id_user, add, setCount } = props

  const { t } = useTranslation();

  const [openSheet, setOpenSheet] = useState(false)
  const [loading, setLoading] = useState(false)
  const sheetRef = useRef()

  const closeSnap = () => {
    sheetRef.current?.close();
  }

  const snapPoints = useMemo(() => ["99%"], []);

  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  const [fakeData, setFakeData] = useState();

  const handleSnapPress = useCallback((index) => {
    sheetRef.current?.snapToIndex(index);
  }, []);

  const getData = async () => {
    const apiResponse = await fetch(
      "https://musicappandroid1200.000webhostapp.com/login/dataSearchForex.php"
    );
    const data = await apiResponse.json();
    setFakeData(data);
  };

  // get data from the fake api
  useEffect(() => {
    getData();
  }, []);

  const createQuote = async (symbol, open, low, high, close, time, open_h1_last, low_h1_last, high_h1_last, close_h1_last, time_h1, open_h4_last, low_h4_last, high_h4_last, close_h4_last, time_h4) => {
    setLoading(true);
    if (symbol) {
      try {
        const formData = new FormData();
        formData.append("symbol", symbol);
        formData.append("id_user", id_user);
        formData.append("open", open);
        formData.append("low", low);
        formData.append("high", high);
        formData.append("close", close);
        formData.append("time", time);
        formData.append("open_h1_last", open_h1_last);
        formData.append("low_h1_last", low_h1_last);
        formData.append("high_h1_last", high_h1_last);
        formData.append("close_h1_last", close_h1_last);
        formData.append("time_h1", time_h1);
        formData.append("open_h4_last", open_h4_last);
        formData.append("low_h4_last", low_h4_last);
        formData.append("high_h4_last", high_h4_last);
        formData.append("close_h4_last", close_h4_last);
        formData.append("time_h4", time_h4);

        await fetch("https://musicappandroid1200.000webhostapp.com/login/insertQuote.php", {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
          body: formData,
        })
          .then(res => res.json())
          .then(json => {
            json.status === true &&
              (setCount(3000), setLoading(false), setOpenSheet(false), closeSnap(), alert(json.message), onDisplayNotification({
                title: `${t("en") === "English" ? (id_user === 9 ? 'XDtrader Notification' : "Person Notification") : (id_user === 9 ? 'XDtrader Thông báo' : "Người dùng thông báo")}`,
                body: `${t("en") === "English" ? `${symbol} new price quote available` : `${symbol} báo giá mới có sẵn`}`
              }), addNotification(`Notification`, `${symbol} new price quote available`, `${symbol} báo giá mới có sẵn`, 'favorite/'))
          })
      } catch (e) {
        alert("Please try again !");
        setLoading(false);
      }
    }
  };

  // render
  const renderItem = ({ item, index }) => {
    // when no input, show all
    if (searchPhrase === "") {
      return <Pressable style={[styles.sheetHeader, {
        backgroundColor: "#12121C", borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: "#282828"
      }]} onPress={() => (Number(item.id) === (index + 1) && (createQuote(item.symbol, item.open, item.low, item.high, item.close, item.time, item.open_h1_last, item.low_h1_last, item.high_h1_last, item.close_h1_last, item.time_h1, item.open_h4_last, item.low_h4_last, item.high_h4_last, item.close_h4_last, item.time_h4), add(item.id)), setSearchPhrase(''))}>
        <Text style={[styles.txtSearch]}>{item.symbol}</Text>
      </Pressable>;
    }
    // // filter of the name
    if (item.symbol.toUpperCase().includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))) {
      return <Pressable style={[styles.sheetHeader, {
        backgroundColor: "#12121C", borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: "#282828"
      }]} onPress={() => (Number(item.id) === (index + 1) && createQuote(item.symbol, item.open, item.low, item.high, item.close, item.time, item.open_h1_last, item.low_h1_last, item.high_h1_last, item.close_h1_last, item.time_h1, item.open_h4_last, item.low_h4_last, item.high_h4_last, item.close_h4_last, item.time_h4), add(item.id), setSearchPhrase(''))}>
        <Text style={[styles.txtSearch]}>{item.symbol}</Text>
      </Pressable>;
    }
  };

  return (
    <>
      {/* {loading && <ActivityIndicator size={'large'} />} */}
      <View style={styles.viewBtn}>
        <Pressable style={styles.btn} onPress={() => (setOpenSheet(true),getData(), handleSnapPress(0), setCount(10000000))}>
          <Ionicons name="add" size={24} color="#fff" />
        </Pressable>
      </View>
      {openSheet &&
        <BottomSheet
          ref={sheetRef}
          backgroundStyle={{ backgroundColor: '#12121C' }}
          snapPoints={snapPoints}
          // enablePanDownToClose={true}
          handleIndicatorStyle={{ display: 'none' }}
          onClose={() => (setCount(3000), closeSnap(), setOpenSheet(false), setSearchPhrase(''))}>
          <BottomSheetView>
            <View style={styles.containerSheet}>
              <Pressable style={styles.sheetHeader} onPress={() => (setCount(3000), closeSnap(), setOpenSheet(false), setSearchPhrase(''))}>
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
      }
    </>
  );
};

export default AddQuote;
