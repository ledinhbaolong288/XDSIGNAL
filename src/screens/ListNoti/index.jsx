import React, { useState, useRef, useEffect, useCallback } from "react";
import { View, Text, TextInput, Pressable, Platform, Image, ScrollView } from "react-native";
import styles from "./styles";
import BottomSheet, { BottomSheetFlatList, BottomSheetView } from "@gorhom/bottom-sheet"
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FIREBASE_AUTH, FIREBASE_DBR } from "../../../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";
import SearchBar from "../../components/Search/SearchBar";


const ListNoti = () => {

  const navigation = useNavigation();
  const sheetRef = useRef(null)
  const snapPoint = ["90%"]

  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  const [fakeData, setFakeData] = useState();

  // get data from the fake api
  useEffect(() => {
    const getData = async () => {
      const apiResponse = await fetch(
        "https://my-json-server.typicode.com/kevintomas1995/logRocket_searchBar/languages"
      );
      const data = await apiResponse.json();
      setFakeData(data);
    };
    getData();
  }, []);

  // render
  const renderItem = ({ item }) => {
    // when no input, show all
    if (searchPhrase === "") {
      return <Text style={{ color: "#fff" }}>{item.name}</Text>;
    }
    // filter of the name
    if (item.name.toUpperCase().includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))) {
      return <Text style={{ color: "#fff" }}>{item.name}</Text>;
    }
  };

  return (
    <></>
  );
};

export default ListNoti;
