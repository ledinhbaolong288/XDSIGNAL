import React, { useEffect, useRef, useState } from "react";
import { Text, View, Pressable } from "react-native";
import { FontAwesome, MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import styles from "./styles";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SvgUri } from 'react-native-svg';
import Modal from 'react-native-modal'
import { Image } from "react-native";
import SiderBarBack from "../Sidebarback";
import moment from "moment";
import DialogUpdate from "../DialogUpdate";
import { useTranslation } from "react-i18next";
import ViewShot from "react-native-view-shot";
import Share from "react-native-share"
import BannerShare from "../BannerShare";
import { ScrollView } from "react-native";

const CoinDetail = () => {
  const route = useRoute();
  const {
    params: {
      id,
      name_forex,
      status,
      action,
      open_time,
      open_price,
      take_profit_1,
      take_profit_2,
      take_profit_3,
      stop_loss,
      profit_and_loss,
      trade_result,
      last_update_time,
      comment_en,
      comment_vn,
      priceAction,
      index,
      done_tp1,
      done_tp2,
      done_tp3,
      vipUpdate },
  } = route;
  const navigation = useNavigation();

  const { t } = useTranslation();

  const percentageColor =
    action >= "1" && action <= "2" ? "#16c784" : action >= "-1" && action <= "0" ? "red" : "#C5C5C5";


  const percentageTech =
    action === "3" ? "Buy stop" : action === "2" ? "Buy limit" : action === "1" ? t("buy") : action === "0" ? t("sell") : action === "-1" ? "Sell limit" : action === "-2" ? "Sell stop" : null


  const percentageStatus =
    status === "1" ? t("expired") : t("active");

  const coinId = name_forex.replace(' ', '')

  const ref = useRef();

  const [imageUri, setImageUri] = useState('')

  return (
    <>
      <SiderBarBack vip={vipUpdate} />
      <ScrollView>
        <View
          style={styles.coinContainer}
        >
          <ViewShot ref={ref} style={styles.containerBody}>
            <View style={styles.containerBody}>
              <View style={[styles.containerTop, {
                backgroundColor: percentageColor
              }]}>
                <Text style={styles.title}>{name_forex}</Text>
              </View>
              <View style={styles.containerHeader}>
                <View style={styles.description}>
                  <Text style={styles.txt}>{t('Action')}</Text>
                  <Text style={styles.txt}>{percentageTech}</Text>
                </View>
                <View style={styles.description}>
                  <Text style={styles.txt}>{t('Status')}</Text>
                  <Text style={styles.txt}>{percentageStatus}</Text>
                </View>
                <View style={styles.description}>
                  <Text style={styles.txt}>{t('Opening Time')}</Text>
                  <Text style={styles.txt}>{open_time}</Text>
                </View>
              </View>
              <View style={styles.containerHeader}>
                <View style={styles.description}>
                  <Text style={styles.txt}>{t('Open Price')}</Text>
                  <Text style={styles.txt}>{open_price}</Text>
                </View>
                <View style={styles.description}>
                  <Text style={styles.txt}>{t('Take profit')} 1</Text>
                  <Text style={styles.txt}>{done_tp1 === "1" && `${t('Done')}~`}{take_profit_1}</Text>
                </View>
                <View style={styles.description}>
                  <Text style={styles.txt}>{t('Take profit')} 2</Text>
                  <Text style={styles.txt}>{done_tp2 === "1" && `${t('Done')}~`}{take_profit_2}</Text>
                </View>
                <View style={styles.description}>
                  <Text style={styles.txt}>{t('Take profit')} 3</Text>
                  <Text style={styles.txt}>{done_tp3 === "1" && `${t('Done')}~`}{take_profit_3}</Text>
                </View>
              </View>
              <View style={styles.containerHeader}>
                <View style={styles.description}>
                  <Text style={styles.txt}>{t('Stop loss')}</Text>
                  <Text style={styles.txt}>{stop_loss}</Text>
                </View>
                <View style={styles.description}>
                  <Text style={styles.txt}>{t('Profit/Loss')}</Text>
                  <Text style={styles.txt}>{profit_and_loss > 0 ? '+' + profit_and_loss : profit_and_loss}{profit_and_loss != "Waiting" && " Pips"}</Text>
                </View>
                <View style={styles.description}>
                  <Text style={styles.txt}>{t('Trade result')}</Text>
                  <Text style={styles.txt}>{t(trade_result)}</Text>
                </View>
              </View>
              <View style={styles.containerHeader}>
                <View style={styles.description}>
                  <Text style={styles.txt}>{t('Last update time')}</Text>
                  <Text style={styles.txt}>{last_update_time}</Text>
                </View>
                <View style={styles.description}>
                  <Text style={styles.txt}>{t('comment')}</Text>
                  <Text style={[styles.txt, { width: "50%", textAlign: 'right' }]} numberOfLines={2}>{t('comment') === 'Comment' ? (comment_en === '' ? '-' : comment_en) : (comment_vn === '' ? '-' : comment_vn)}</Text>
                </View>
              </View>

              <BannerShare />
            </View>
          </ViewShot>
        </View>
      </ScrollView>
      {vipUpdate &&
        <>
          <View style={styles.viewBtn}>
            <Pressable style={styles.btn} onPress={() => {
              ref.current.capture().then(uri => {
                setImageUri(uri)
              }),
                Share.open({ url: imageUri })
            }}>
              <FontAwesome name="share" size={20} color="#fff" />
            </Pressable>
          </View>
          <View style={styles.viewBtnChart}>
            <Pressable style={[styles.btn, { backgroundColor: "#787878" }]} onPress={() => {
              navigation.navigate(t('Chart'), { coinId: coinId })
            }}>
              <MaterialCommunityIcons name="chart-timeline-variant" size={26} color="#fff" />
            </Pressable>
          </View>
          <View style={styles.viewBtnAnalysis}>
            <Pressable style={[styles.btn, { backgroundColor: "#787878" }]} onPress={() => {
              navigation.navigate(t('Analystic'), { coinId: coinId })
            }}>
              <Ionicons name="stopwatch-outline" size={26} color="#fff" />
            </Pressable>
          </View>
          {vipUpdate == 1 && <DialogUpdate id={id} take_profit_1={take_profit_1} action={action}
            take_profit_2={take_profit_2} take_profit_3={take_profit_3} name_forex={name_forex} stop_loss={stop_loss} comment_en={comment_en}
            comment_vn={comment_vn}/>}
        </>
      }
    </>


  );
};

export default CoinDetail;
