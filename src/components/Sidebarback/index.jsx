import React, { useEffect, useState } from "react";
import { Text, View, Image, Pressable, Linking } from "react-native";
import { Ionicons, FontAwesome5, AntDesign, Feather } from "@expo/vector-icons";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import { SvgUri } from "react-native-svg";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SiderBarBack = (props) => {
  const {
    vip, hideNoti
  } = props;
  const navigation = useNavigation();

  const [getValue, setGetValue] = useState(null)

  const getValueFunction = (key) => {
    AsyncStorage.getItem(key).then(
      (value) =>
        setGetValue(JSON.parse(value))
    );
  };

  useEffect(() => {
    getValueFunction('data')
  }, []);

  return (
    <View style={styles.container}>
      <AntDesign name="left" color={'#fff'} size={24} onPress={() => navigation.goBack()} />
      <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <Image source={require('../../../assets/icon.png')} style={{ width: 40, height: 40, borderRadius: 100, borderColor: '#c5c5c5', borderWidth: 0.5 }} />
      </View>
      <Text style={[styles.title, { textTransform: 'uppercase' }]}>XDtrader signal</Text>
      <View style={styles.iconRight}>
        <FontAwesome5 name="telegram-plane" color={'#fff'} size={24} onPress={() => Linking.openURL('https://t.me/XDtrader_free_signal')} />
        {hideNoti != 1 && <Ionicons name="notifications-outline" color={'#fff'} size={24} onPress={() => getValue?.vip > 0 ? navigation.navigate("Notification", { notiSetup: Number(getValue?.noti), vip: Number(getValue?.vip) }) : navigation.navigate("LoginScreen")} />}
        <Feather name="user" color={'#fff'} size={24} onPress={() => vip >= 0 ? navigation.navigate("Profile") : navigation.navigate("LoginScreen")} />
      </View>
    </View>
  );
};

export default SiderBarBack;
