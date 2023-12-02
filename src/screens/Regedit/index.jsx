import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import SiderBar from "../../components/Sidebar";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n from "../../../i18n";
import { useTranslation } from "react-i18next";
import SiderBarBack from "../../components/Sidebarback";
import moment from "moment";
import { MaterialIcons, Entypo } from '@expo/vector-icons'; 
import UpdateProfile from "../../components/UpdateProfile";

const RegeditScreen = () => {

  const navigation = useNavigation();

  const [getValue, setGetValue] = useState([])
  const [nameHome, setNameHome] = useState("Signal free")

  const { t } = useTranslation();

  const getValueFunction = (key) => {
    AsyncStorage.getItem(key).then(
      (value) =>
        setGetValue(JSON.parse(value))
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      getValueFunction('data');
      setNameHome(getValue?.vip === "1" ? t("Signal admin") : getValue?.vip === "2" ? t("Signal vip") : t("Signal free"));
    }
      , 3000);
    return () => {
      clearInterval(interval);
    };
  }, [getValue?.vip]);

  useEffect(() => {
    getValueFunction('data');
    setNameHome(getValue?.vip === "1" ? t("Signal admin") : getValue?.vip === "2" ? t("Signal vip") : t("Signal free"));
  }, []);

  const removeItemValue = async (key) => {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    }
    catch (exception) {
      return false;
    }
  }

  const changeLanguage = value => {
    i18n
      .changeLanguage(value)
      .then(() => null)
      .catch(err => console.log(err));
  };

  return (
    <View style={styles.bg}>
      <SiderBarBack title={'Profile'} vip={getValue?.vip}/>
      <View style={styles.container}>
        <View style={styles.containerProfile}>
          <View style={styles.containerTxt}>
            <Text style={styles.txt}>{t('userName')}</Text>
            <Text style={styles.txt}>{getValue?.user_name}</Text>
          </View>
          <View style={styles.containerTxt}>
            <Text style={styles.txt}>{t('group')}</Text>
            <Text style={styles.txt}>{getValue?.vip >= 1 ? "VIP" : "FREE"}</Text>
          </View>
          <View style={styles.containerTxt}>
            <Text style={styles.txt}>{t('expired')}</Text>
            <Text style={styles.txt}>{getValue?.vip === "1" ? <Entypo name="infinity" size={24} color="#45FFCA" /> : getValue?.vip === "2" ? moment(getValue?.expired).format("DD MMM YYYY") : '-:-'}</Text>
          </View>
          <View style={styles.containerTxt}>
            <Text style={styles.txt}>{t('value')}</Text>
            <Text style={styles.txt}>177777 VND/{t('month')}</Text>
          </View>
        </View>

        <Pressable
          style={{
            backgroundColor: 'red',
            marginTop: 20,
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 6
          }}
          onPress={() => {}}>
          <Text style={[styles.txt, { color: "#fff" }]}>{getValue?.vip >= 1 ? t('buy more now') : t('upgrade')}</Text>
        </Pressable>
      </View>
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

  },
  container: {
    width: "100%",
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    padding: 10,
    marginTop: 20
  },
  containerProfile: {
    width: "100%",
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'column',
    borderRadius: 6,
    paddingHorizontal: 14,
    gap: 20,
  },
  containerTxt: {
    width: "100%",
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  txt: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    fontFamily: 'DroidSans'

  }

});

export default RegeditScreen;
