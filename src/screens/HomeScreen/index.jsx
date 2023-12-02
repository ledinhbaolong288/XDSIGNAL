import React, { useEffect, useState } from "react";
import { StyleSheet, ImageBackground, Button, Pressable, Text, View } from "react-native";
import SiderBar from "../../components/Sidebar";
import SelectGlobal from "../../components/SelectGlobal";
import DialogAdd from "../../components/DialogAdd";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from 'react-i18next';
import '../../../i18n';
import { Ionicons } from '@expo/vector-icons';
import { sendNotification } from "../../services/requests";
import i18n from "../../../i18n";
import { useRoute } from "@react-navigation/native";

const HomeScreen = () => {
  const route = useRoute();
  const {
    params: { timeFrame },
  } = route;
  const [getValue, setGetValue] = useState(null)

  const getValueFunction = (key) => {
    AsyncStorage.getItem(key).then(
      (value) =>
        setGetValue(JSON.parse(value))
    );
  };

  useEffect(() => {
    getValueFunction('data')
  }, [getValue?.vip]);

  return (
    <View style={styles.bg}>
      <SiderBar title={'Home'} />
      <SelectGlobal vip={getValue?.vip} getValue={getValue} timeFrame={timeFrame}/>
      {getValue?.vip > 0 && <DialogAdd />}

    </View>
  );
};

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    flexDirection: "column",
  }

});

export default HomeScreen;
