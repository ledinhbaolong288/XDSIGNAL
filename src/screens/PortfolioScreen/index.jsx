import React, { useState, useEffect } from "react";
import SiderBar from "../../components/Sidebar";
import { View, Pressable, Text } from "react-native";
import { StyleSheet } from "react-native";
import PriceQuote from "../../components/PriceQuote";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AddQuote from "../../components/AddQuote";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { getPriceQuoteUser } from "../../services/requests";
import { useRoute } from "@react-navigation/native";
import DeleteQuote from "../../components/DeleteQuote";
import axios from "axios";


const PortfolioScreen = () => {
  const route = useRoute();
  const {
    params: { vip, id },
  } = route;

  const [getValue, setGetValue] = useState(null)
  const [coinsUser, setCoinsUser] = useState(null);
  const [coinsUserDele, setCoinsUserDele] = useState(null);
  const [dataUser, setDataUser] = useState(null);
  const [add, setAdd] = useState(0);
  const [dele, setDelete] = useState(0);
  const [count, setCount] = useState(3000);
  const [countData, setCountData] = useState(0);

  const changeDelete = async (data) => {
    setDelete(data)
  };
  const changeAdd = async (data) => {
    setAdd(data)
  };

  useEffect(() => {
    setCountData(countData + 1);
    const fetchCoinsUser = async (id_user, id_default) => {
      const apiResponse = await fetch(
        `https://musicappandroid1200.000webhostapp.com/login/listQuoteUser.php?id_user=${id_user}&id_default=${id_default}`
      );
      const data = await apiResponse.json();
      setCoinsUser(data);
      const dataUser = await data.map(item => item.symbol)
      setDataUser([...dataUser])
    };
    fetchCoinsUser(id, 0);

    const fetchCoinsUserDele = async (id_user, id_default) => {
      const apiResponse = await fetch(
        `https://musicappandroid1200.000webhostapp.com/login/listQuoteUser.php?id_user=${id_user}&id_default=${id_default}`
      );
      const data = await apiResponse.json();
      setCoinsUserDele(data);
    };
    fetchCoinsUserDele(id, '');
  }, [add, dele]);

  return (
    <View style={styles.bg}>
      <SiderBar title={'Calendar'} />
      <GestureHandlerRootView style={{ flex: 2 }} keyboardVerticalOffset={80} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <PriceQuote data={dataUser} coinsUser={coinsUser} count={count} countData={countData} />
        {vip > 0 && <AddQuote id_user={id} add={changeAdd} setCount={setCount} />}
        {vip > 0 && <DeleteQuote id_user={id} data={coinsUserDele} dele={changeDelete} setCount={setCount} />}
      </GestureHandlerRootView>
    </View>

  );
};

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    width: '100%',
    height: '100%',
    flexDirection: "column",
  },
  container: {
    width: "100%",
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    paddingHorizontal: 10
  },
  containerBtn: {
    width: "100%",
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    height: 50,
    marginTop: 4,
    borderWidth: 1,
    borderColor: "#C5C5C5",
    borderRadius: 4
  }

});

export default PortfolioScreen;


