import React, { useCallback, useEffect, useState } from "react";
import { Text, View, Pressable } from "react-native";
import { Entypo, AntDesign, Feather } from "@expo/vector-icons";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import { SvgUri } from 'react-native-svg';
import Modal from 'react-native-modal'
import { Image } from "react-native";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { addNotification, onDisplayNotification } from "../../utils/commonUtils";

const CoinItem = ({ marketCoin, vipUpdate, getValue }) => {
  const {
    id,
    name_forex,
    vip,
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
    done_tp1,
    done_tp2,
    done_tp3
  } = marketCoin;

  const navigation = useNavigation();

  const { t } = useTranslation();

  const percentageColor =
    action >= "1" && action <= "2" ? "#16c784" : action >= "-1" && action <= "0" ? "#ea3943" : "#C5C5C5";


  const percentageTech =
    action === "3" ? t("Buy stop") : action === "2" ? t("Buy limit") : action === "1" ? t("buy") : action === "0" ? t("sell") : action === "-1" ? t("Sell limit") : action === "-2" ? t("Sell stop") : null

  const percentageIcon =
    action >= "1" && action <= "2" ? <Entypo name="chevron-small-up" size={24} color="#16c784" /> : action >= "-1" && action <= "0" ? <Entypo name="chevron-small-down" size={24} color="#ea3943" /> : <Entypo name="minus" size={24} color="#C5C5C5" />;


  const percentageMarket =
    status === "1" ? "#C5C5C5" : "#16c784";

  const percentageStatus =
    status === "1" ? t('expired') : t("active");

  const percentageStatusColor =
    trade_result === "Stop loss" ? "#ea3943" : "#16c784" || "#C5C5C5";

  return (
    <>
      {
        vipUpdate > "0" ? <Pressable
          style={styles.coinContainer}
          onPress={() => navigation.navigate('CoinDetail', {
            id: id,
            name_forex: name_forex,
            status: status,
            action: action,
            open_time: open_time,
            open_price: open_price,
            take_profit_1: take_profit_1,
            take_profit_2: take_profit_2,
            take_profit_3: take_profit_3,
            stop_loss: stop_loss,
            profit_and_loss: profit_and_loss,
            trade_result: trade_result,
            last_update_time: last_update_time,
            comment_en: comment_en,
            comment_vn: comment_vn,
            done_tp1: done_tp1,
            done_tp2: done_tp2,
            done_tp3: done_tp3,
            vipUpdate: vipUpdate
          })}
        >
          <View style={{ display: 'flex', flexDirection: 'column', width: "28%", alignItems: 'flex-start', }}>
            <Text style={[styles.title, { fontSize: 20, color: '#2962ff' }]}>{name_forex}</Text>
            <Text style={[styles.title, { fontSize: 10, color: '#fff' }]}>{open_time}</Text>
          </View>

          <View style={{ width: "12%", alignItems: 'center', }}>
            <Text style={[styles.title, { fontSize: 14, color: "#fff" }]}>{vip === "1" ? "VIP" : vip === "2" ? "Person" : ""}</Text>
          </View>

          <View style={{ width: "30%", alignItems: 'center' }}>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <Text style={[styles.title, { fontSize: 18, color: percentageMarket }]}>{percentageStatus}</Text>
              {status === "0" ? <Image style={styles.action} source={require('../../../assets/gif/loading.gif')} /> : null}
            </View>
            <Text style={[styles.title, { fontSize: 16, color: percentageStatusColor }]}>{t(trade_result)}</Text>
          </View>

          <View style={{ width: "30%", alignItems: 'flex-end', justifyContent: 'flex-end', flexDirection: 'row', display: 'flex' }}>
            {percentageIcon}
            <Text style={[styles.title, { fontSize: 18, color: percentageColor, marginLeft: 2 }]}>
              {percentageTech}
            </Text>
          </View>
        </Pressable> : (vip === "0" && <Pressable
          style={styles.coinContainer}
          onPress={() => navigation.navigate('CoinDetail', {
            id: id,
            name_forex: name_forex,
            status: status,
            action: action,
            open_time: open_time,
            open_price: open_price,
            take_profit_1: take_profit_1,
            take_profit_2: take_profit_2,
            take_profit_3: take_profit_3,
            stop_loss: stop_loss,
            profit_and_loss: profit_and_loss,
            trade_result: trade_result,
            last_update_time: last_update_time,
            comment_en: comment_en,
            comment_vn: comment_vn,
            done_tp1: done_tp1,
            done_tp2: done_tp2,
            done_tp3: done_tp3,
            vipUpdate: vipUpdate
          })}
        >
          <View style={{ display: 'flex', flexDirection: 'column', width: "28%", alignItems: 'flex-start', }}>
            <Text style={[styles.title, { fontSize: 20, color: '#2962ff' }]}>{name_forex}</Text>
            <Text style={[styles.title, { fontSize: 10, color: '#fff' }]}>{open_time}</Text>
          </View>

          <View style={{ width: "12%", alignItems: 'center', }}>
            <Text style={[styles.title, { fontSize: 14, color: "#fff" }]}>{vip === "1" ? "VIP" : vip === "2" ? "Person" : ""}</Text>
          </View>

          <View style={{ width: "30%", alignItems: 'center' }}>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <Text style={[styles.title, { fontSize: 18, color: percentageMarket }]}>{percentageStatus}</Text>
              {status === "0" ? <Image style={styles.action} source={require('../../../assets/gif/loading.gif')} /> : null}
            </View>
            <Text style={[styles.title, { fontSize: 16, color: percentageStatusColor }]}>{t(trade_result)}</Text>
          </View>

          <View style={{ width: "30%", alignItems: 'flex-end', justifyContent: 'flex-end', flexDirection: 'row', display: 'flex' }}>
            {percentageIcon}
            <Text style={[styles.title, { fontSize: 18, color: percentageColor, marginLeft: 2 }]}>
              {percentageTech}
            </Text>
          </View>
        </Pressable>)
      }
    </>


  );
};

export default CoinItem;
