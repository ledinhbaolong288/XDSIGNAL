import React, { useEffect, useState } from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native"
import styles from "./styles";
import { FIREBASE_DBR } from "../../../firebaseConfig";
import { onValue, ref, set } from "firebase/database";
import { getCount } from "../../utils/commonUtils";
import { A } from "@expo/html-elements";
import { useTranslation } from "react-i18next";

const banner = [
  {
    language: "EN",
    list: [
      {
        img: "https://musicappandroid1200.000webhostapp.com/img/XDtrader_QC_EN_101.jpg",
        url: "https://one.exness-track.com/a/uc25kp4a/?campaign=18580"
      },
      {
        img: "https://musicappandroid1200.000webhostapp.com/img/XDtrader_QC_EN_102.jpg",
        url: "https://one.exness-track.com/a/uufkftv8/?campaign=18583"
      },
      {
        img: "https://musicappandroid1200.000webhostapp.com/img/XDtrader_QC_EN_103.jpg",
        url: "https://one.exness-track.com/a/uc25kp4a/?campaign=18580"
      },
      {
        img: "https://musicappandroid1200.000webhostapp.com/img/XDtrader_QC_EN_104.jpg",
        url: "https://one.exness-track.com/a/uc25kp4a/?campaign=18580"
      },
      {
        img: "https://musicappandroid1200.000webhostapp.com/img/XDtrader_QC_EN_105.jpg",
        url: "https://one.exness-track.com/a/uufkftv8/?campaign=18583"
      },
      {
        img: "https://musicappandroid1200.000webhostapp.com/img/XDtrader_QC_EN_106.jpg",
        url: "https://one.exness-track.com/a/uufkftv8/?campaign=18583"
      },
      {
        img: "https://musicappandroid1200.000webhostapp.com/img/XDtrader_QC_EN_107.jpg",
        url: "https://t.me/XDtrader_free_signal"
      }
    ]
  },
  {
    language: "VN",
    list: [
      {
        img: "https://musicappandroid1200.000webhostapp.com/img/XDtrader_QC_VN_001.jpg",
        url: "https://one.exness-track.com/a/uc25kp4a/?campaign=18579"
      },
      {
        img: "https://musicappandroid1200.000webhostapp.com/img/XDtrader_QC_VN_002.jpg",
        url: "https://one.exness-track.com/a/uufkftv8/?campaign=18582"
      },
      {
        img: "https://musicappandroid1200.000webhostapp.com/img/XDtrader_QC_VN_003.jpg",
        url: "https://one.exness-track.com/a/uc25kp4a/?campaign=18579"
      },
      {
        img: "https://musicappandroid1200.000webhostapp.com/img/XDtrader_QC_VN_004.jpg",
        url: "https://one.exness-track.com/a/uc25kp4a/?campaign=18579"
      },
      {
        img: "https://musicappandroid1200.000webhostapp.com/img/XDtrader_QC_VN_005.jpg",
        url: "https://one.exness-track.com/a/uufkftv8/?campaign=18582"
      },
      {
        img: "https://musicappandroid1200.000webhostapp.com/img/XDtrader_QC_VN_006.jpg",
        url: "https://one.exness-track.com/a/uufkftv8/?campaign=18582"
      },
      {
        img: "https://musicappandroid1200.000webhostapp.com/img/XDtrader_QC_VN_007.jpg",
        url: "https://t.me/XDtrader_free_signal"
      }
    ]
  }
]

const Banner = () => {

  const { t } = useTranslation();
  const [count, setCount] = useState();
  const db = FIREBASE_DBR;

  useEffect(() => {
    const startCountRef = ref(db, "count");
    onValue(startCountRef, (snapshot) => {
      const data = snapshot.val();
      setCount(data.count)
    })
  }, [])

  return (
    t('en') === "English" ?
      <View style={styles.containerBanner}>
        <View style={styles.container}>
          <ImageBackground resizeMode="stretch" source={{ uri: banner[0].list[count]?.img }} imageStyle={{ borderRadius: 6 }} style={styles.banner}>
          </ImageBackground>
          <A href={banner[0].list[count]?.url} style={{ width: "100%", height: 120, position: 'absolute' }}>
          </A>
        </View>
      </View>
      :
      <View style={styles.containerBanner}>
        <View style={styles.container}>
          <ImageBackground resizeMode="stretch" source={{ uri: banner[1].list[count]?.img }} imageStyle={{ borderRadius: 6 }} style={styles.banner}>
          </ImageBackground>
          <A href={banner[1].list[count]?.url} style={{ width: "100%", height: 120, position: 'absolute' }}>
          </A>
        </View>
      </View>

  );
};

export default Banner;
