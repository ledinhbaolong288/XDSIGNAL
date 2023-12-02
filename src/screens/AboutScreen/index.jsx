import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import SiderBar from "../../components/Sidebar";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n from "../../../i18n";
import { useTranslation } from "react-i18next";
import SiderBarBack from "../../components/Sidebarback";
import moment from "moment";
import { MaterialIcons } from '@expo/vector-icons';
import UpdateProfile from "../../components/UpdateProfile";
import { ScrollView } from "react-native";

const AboutScreen = () => {

  const { t } = useTranslation();

  return (
    <View style={styles.bg}>
      <SiderBarBack title={'Profile'} />
      <ScrollView>
        <View style={styles.container}>
          <Text style={[styles.txt, { fontStyle: 'italic' }]}>
            {t('title')}
          </Text>
          <Text style={styles.txt}>
            {t('Version')} 04.11.2023
          </Text>

          <View style={styles.containerContact}>
            <Text style={styles.txt}>
              {t('Contact')}
            </Text>
            <Text style={styles.txt}>
              Email : <Text style={[styles.txt, { fontSize: 19, fontStyle: 'italic' }]}>atradeperfect@gmail.com</Text>
            </Text>
            <Text style={styles.txt}>
              Tele : <Text style={[styles.txt, { fontSize: 19, fontStyle: 'italic' }]}>https://t.me/XDtrader_free_signal</Text>
            </Text>
          </View>

          <View style={styles.containerContact}>
            <Text style={styles.txt}>
              {t('Warning')}
            </Text>
            <Text style={[styles.txt, { fontStyle: 'italic' }]}>
              {t('Warning1')}
            </Text>
            <Text style={[styles.txt, { fontStyle: 'italic' }]}>
              {t('Warning2')}
            </Text>
          </View>

          <View style={styles.containerContact}>
            <Text style={styles.txt}>
              {t('Thank you')}
            </Text>
            <Text style={styles.txt}>
              {t('XDtrader team')}
            </Text>
          </View>
        </View>
      </ScrollView>

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
    paddingHorizontal: 20,
    marginTop: 20,
    gap: 20
  },
  txt: {
    fontSize: 18,
    fontWeight: '300',
    color: '#fff',
    fontFamily: 'DroidSans',
    textAlign: "center"
  },
  containerContact: {
    width: "100%",
    display: 'flex',
    gap: 4
  }
});

export default AboutScreen;
