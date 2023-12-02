import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import SiderBar from "../../components/Sidebar";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n from "../../../i18n";
import { useTranslation } from "react-i18next";


const Language = (props) => {

  const { setModalVisible } = props

  const navigation = useNavigation();
  const [isOpen, setIsOpen] = useState(true)

  const [getValue, setGetValue] = useState([])
  const [nameHome, setNameHome] = useState("Signal free")

  const { t, i18n } = useTranslation();

  const getValueFunction = (key) => {
    AsyncStorage.getItem(key).then(
      (value) =>
        setGetValue(JSON.parse(value))
    );
  };

  const functionRun = () => {
    getValueFunction('data');
    setNameHome(getValue?.vip === "1" ? "Signal admin" : getValue?.vip === "2" ? "Signal vip" : "Signal free");
  }

  useEffect(() => {
    const interval = setInterval(() => {
      functionRun()
    }
      , 1000);
    return () => {
      clearInterval(interval);
    };
  }, [getValue?.vip]);

  const removeItemValue = async (key) => {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    }
    catch (exception) {
      return false;
    }
  }

  const [currentLanguage, setLanguage] = useState(t('userName') === "Tên tài khoản :" ? 'vn' : 'en');

  const changeLanguage = value => {
    i18n
      .changeLanguage(value)
      .then(() => setLanguage(value))
      .catch(err => console.log(err));
  };

  const updateLanguage = async (language) => {
    functionRun()

    try {
      const formData = new FormData();
      formData.append("id", getValue.id);
      formData.append("language", language);

      const data = { "full_name": `${getValue?.full_name}`, "nation": `${getValue?.nation}`, "province": `${getValue?.province}`, "email": `${getValue?.email}`, "phone": `${getValue?.phone}`, "id": `${getValue?.id}`, "language": `${language}`, "noti": `${getValue?.noti}`, "user_name": `${getValue?.user_name}`, "vip": `${getValue?.vip}`, "status": `${getValue?.status}`, "update_time": `${getValue?.update_time}` }

      await fetch("https://musicappandroid1200.000webhostapp.com/login/updateLanguage.php", {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      })
        .then(res => res.json())
        .then(json => {
          json.status === true ?
            AsyncStorage.setItem('data', JSON.stringify(data))
            : console.log(json.message)
        })
    }
    catch (exception) {
      return false;
    }
  };

  return (
    <View style={styles.containerLanguage}>
      <Text style={styles.txt}>{t('language')}</Text>
      <View style={styles.languageLogo}>
        <Pressable
          onPress={() => {
            updateLanguage('en'),
              changeLanguage('en'),
              setModalVisible(false)
          }}
          style={{
            padding: 2,
            display: 'flex',
            alignItems: 'center'
          }}>
          <Image source={require("../../../assets/language/america.png")} style={{ width: 40, height: 40 }} />
          <Text style={{ fontSize: 10, fontWeight: "700", color: currentLanguage === 'en' ? '#33A850' : '#c5c5c5', }}>{t('en')}</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            updateLanguage('vn'),
              changeLanguage('vn'),
              setModalVisible(false)
          }}
          style={{
            padding: 2,
            display: 'flex',
            alignItems: 'center'
          }}>
          <Image source={require("../../../assets/language/vietnam.png")} style={{ width: 40, height: 40 }} />
          <Text style={{ fontSize: 10, fontWeight: "700", color: currentLanguage === 'vn' ? '#33A850' : '#c5c5c5', }}>{t('vn')}</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerLanguage: {
    width: "100%",
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  languageLogo: {
    flexDirection: 'row',
    gap: 4
  },
  txt: {
    fontSize: 18,
    fontWeight: '400',
    color: '#fff',
    fontFamily: 'DroidSans'
  }

});

export default Language;
