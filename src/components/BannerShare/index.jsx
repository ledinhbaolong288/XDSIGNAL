import React, { useState } from "react";
import { ImageBackground, View } from "react-native"
import styles from "./styles";
import { A } from "@expo/html-elements";
import { useTranslation } from "react-i18next";

const banner =
{
  img: "https://musicappandroid1200.000webhostapp.com/img/XDtrader_QC_share.jpg",
  url: "https://t.me/XDtrader_free_signal"
}

const BannerShare = () => {

  const { t } = useTranslation();
  const [count, setCount] = useState(0);

  return (
    <View style={styles.containerBanner}>
      <View style={styles.container}>
        <ImageBackground resizeMode="stretch" source={{ uri: banner.img }} imageStyle={{ borderRadius: 6 }} style={styles.banner}>
        </ImageBackground>
        <A href={banner.url} style={{ width: "100%", height: 120, position: 'absolute' }}>
        </A>
      </View>
    </View>

  );
};

export default BannerShare;
