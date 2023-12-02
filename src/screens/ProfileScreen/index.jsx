import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View, Pressable, Image, ActivityIndicator } from "react-native";
import SiderBar from "../../components/Sidebar";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n from "../../../i18n";
import { useTranslation } from "react-i18next";
import SiderBarBack from "../../components/Sidebarback";
import moment from "moment";
import { MaterialIcons } from '@expo/vector-icons';
import UpdateProfile from "../../components/UpdateProfile";
import SearchMember from "../../components/SearchMember";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const ProfileScreen = () => {

  const navigation = useNavigation();

  const [getValue, setGetValue] = useState([])
  const [loading, setLoading] = useState(false)
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
      setLoading(true)
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
    <GestureHandlerRootView style={{ flex: 2 }} keyboardVerticalOffset={80} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.bg}>
        <SiderBarBack title={'Profile'} />
        <View style={styles.container}>
          <View style={styles.containerProfile}>
            <View style={styles.containerTxt}>
              <Text style={styles.txt}>{t('userName')}</Text>
              <Text style={styles.txt}>{getValue?.user_name}</Text>
            </View>
            <View style={styles.containerTxt}>
              <Text style={styles.txt}>{t('fullName')}</Text>
              <Text style={styles.txt}>{getValue?.full_name}</Text>
            </View>
            <View style={styles.containerTxt}>
              <Text style={styles.txt}>{t('email')}</Text>
              <Text style={styles.txt}>{getValue?.email === '' || getValue?.email === null ? <MaterialIcons name="error-outline" size={24} color="#C51605" /> : getValue?.email}</Text>
            </View>
            <View style={styles.containerTxt}>
              <Text style={styles.txt}>{t('phone')}</Text>
              <Text style={styles.txt}>{getValue?.phone === '' || getValue?.phone === null ? <MaterialIcons name="error-outline" size={24} color="#C51605" /> : getValue?.phone}</Text>
            </View>
            <View style={styles.containerTxt}>
              <Text style={styles.txt}>{t('province')}</Text>
              <Text style={styles.txt}>{getValue?.province === '' || getValue?.province === null ? <MaterialIcons name="error-outline" size={24} color="#C51605" /> : getValue?.province}</Text>
            </View >
            <View style={styles.containerTxt}>
              <Text style={styles.txt}>{t('nation')}</Text>
              <Text style={styles.txt}>{getValue?.nation === '' || getValue?.nation === null ? <MaterialIcons name="error-outline" size={24} color="#C51605" /> : getValue?.nation}</Text>
            </View>
            <View style={styles.containerTxt}>
              <Text style={styles.txt}>{t('status')}</Text>
              <Text style={styles.txt}>{getValue?.status === "1" ? "Active" : "Not active"}</Text>
            </View>
            <View style={styles.containerTxt}>
              <Text style={styles.txt}>{t('Last update time')} :</Text>
              <Text style={styles.txt}>{moment(getValue?.update_time).format("DD MMM YYYY")}</Text>
            </View>

          </View>
          <Pressable
            style={{
              backgroundColor: '#ea3943',
              marginTop: 20,
              paddingHorizontal: 20,
              paddingVertical: 10,
              borderRadius: 6
            }}
            onPress={() => loading && (removeItemValue("username"), removeItemValue("data"), changeLanguage('en'), navigation.navigate(nameHome))}>
            {loading ? <Text style={[styles.txt, { color: "#fff" }]}>{t('logout')}</Text> : <ActivityIndicator size={'large'} />}

          </Pressable>
          <UpdateProfile getValue={getValue} update_time={moment(new Date()).format("YYYY-MM-DD")} />
          <SearchMember />

        </View>

      </View>

    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  bg: {
    // flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    flexDirection: "column",

  },
  container: {
    width: "100%",
    height: "100%",
    display: 'flex',
    justifyContent: 'flex-start',
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

export default ProfileScreen;
