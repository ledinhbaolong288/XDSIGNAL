import React, { useEffect, useState } from "react";
import { Text, View, Image, Pressable } from "react-native";
import { Ionicons, FontAwesome5, Feather } from "@expo/vector-icons";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Linking } from "react-native";

const SiderBar = () => {
  const [getValue, setGetValue] = useState(null)

  const getValueFunction = (key) => {
    AsyncStorage.getItem(key).then(
      (value) =>
        setGetValue(JSON.parse(value))
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      getValueFunction('data')
    }
      , 3000);
    return () => {
      clearInterval(interval);
    };
  }, [getValue?.vip]);

  const navigation = useNavigation();

  return (
    <>
      <View style={styles.container}>
        <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Image source={require('../../../assets/icon.png')} style={{ width: 40, height: 40, borderRadius: 100, borderColor: '#c5c5c5', borderWidth: 0.5 }} />
        </View>

        <Text style={styles.title} numberOfLines={2}>XDtrader signal</Text>

        <View style={styles.iconRight}>
          <FontAwesome5 name="telegram-plane" color={'#fff'} size={24} onPress={() => Linking.openURL('https://t.me/XDtrader_free_signal')} />
          <Ionicons name="notifications-outline" color={'#fff'} size={24} onPress={() => getValue?.vip > 0 ? navigation.navigate("Notification", { notiSetup: Number(getValue?.noti), vip: Number(getValue?.vip) }) : navigation.navigate("LoginScreen")} />
          <Feather name="user" color={'#fff'} size={24} onPress={() => getValue?.vip >= 0 ? navigation.navigate("Profile") : navigation.navigate("LoginScreen")} />
        </View>
      </View>

    </>

  );
};

export default SiderBar;
