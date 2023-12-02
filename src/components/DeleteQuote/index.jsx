import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import styles from "./styles";
import { Entypo, Ionicons, AntDesign } from '@expo/vector-icons';
import { Pressable, StyleSheet, View } from "react-native";
import { useTranslation } from "react-i18next";
import { Text } from "react-native";
import BottomSheet, { BottomSheetFlatList, BottomSheetView } from "@gorhom/bottom-sheet"
import SearchBar from "../Search/SearchBar";

const DeleteQuote = (props) => {

  const { id_user, dele, data, setCount } = props

  const { t } = useTranslation();

  const [openSheet, setOpenSheet] = useState(false)

  const sheetRef = useRef()

  const closeSnap = () => {
    sheetRef.current?.close();
  }

  const snapPoints = useMemo(() => ["99%"], []);

  const [searchPhrase, setSearchPhrase] = useState("");
  const [loading, setLoading] = useState(false)

  const handleSnapPress = useCallback((index) => {
    sheetRef.current?.snapToIndex(index);
  }, []);

  const deleteItem = async (id) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("id", id);
      await fetch("https://musicappandroid1200.000webhostapp.com/login/DeleteUserQuote.php", {
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
            (setCount(3000), alert(json.message), setLoading(false), setOpenSheet(false), closeSnap())
        })
    } catch (e) {
      alert("Please try again !");
      setLoading(false);
    }
  }
  // render
  const renderItem = ({ item, index }) => {
    // when no input, show all
    if (searchPhrase === "") {
      return <Pressable style={[styles.sheetHeader, {
        backgroundColor: "#12121C", borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: "#282828"
      }]} onPress={() => (deleteItem(item.id), dele(item.id), setSearchPhrase(''))}>
        <Text style={[styles.txtSearch]}>{item.symbol}</Text>
        <AntDesign name="delete" size={20} color="#D83F31" />
      </Pressable>;
    }
  };

  return (
    <>
      <View style={styles.viewBtn}>
        <Pressable style={styles.btn} onPress={() => (setOpenSheet(true), handleSnapPress(0), setCount(10000000))}>
          <Entypo name="minus" size={24} color="#fff" />
        </Pressable>
      </View>
      {openSheet &&
        <BottomSheet
          ref={sheetRef}
          backgroundStyle={{ backgroundColor: '#12121C' }}
          snapPoints={snapPoints}
          enablePanDownToClose={true}
          handleIndicatorStyle={{ display: 'none' }}
          onClose={() => (setCount(3000), closeSnap(), setOpenSheet(false), setSearchPhrase(''))}>
          <BottomSheetView>
            <View style={styles.containerSheet}>
              <Pressable style={styles.sheetHeader} onPress={() => (setCount(3000), closeSnap(), setOpenSheet(false), setSearchPhrase(''))}>
                <Ionicons name="ios-close-circle-outline" size={24} color="#fff" />
              </Pressable>
            </View>
          </BottomSheetView>

          <BottomSheetFlatList
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={[styles.contentContainer, { paddingVertical: searchPhrase && 10 }]}
          />

        </BottomSheet>
      }
    </>
  );
};

export default DeleteQuote;
