import React, { useEffect, useRef, useState } from "react";
import styles from "./styles";
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { Pressable, View, Button, Text, TextInput, ScrollView } from "react-native";
import { Dialog } from "react-native-simple-dialogs";
import Checkbox from 'expo-checkbox';
import SelectDropdown from "react-native-select-dropdown";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform } from "react-native";
import Moment from 'moment';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { getDataPrice } from "../../services/requests";
import { addNotification, onDisplayNotification, randomIntFromInterval } from "../../utils/commonUtils";
import { FIREBASE_AUTH, FIREBASE_DBR } from "../../../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { get, onValue, ref, set } from "firebase/database";
import { useTranslation } from "react-i18next";


const dataStatus = [
  {
    name: 'Active'
  },
  {
    name: 'Expired'
  }
]

const dataAction = [
  {
    name: 'Buy'
  },
  {
    name: 'Buy limit'
  },
  {
    name: 'Buy stop'
  },
  {
    name: 'Sell'
  },
  {
    name: 'Sell limit'
  },
  {
    name: 'Sell stop'
  }
]

const DialogUpdate = (props) => {

  const db = FIREBASE_DBR;
  const auth = FIREBASE_AUTH

  const { t } = useTranslation();

  const [reload, setReload] = useState(null)

  useEffect(() => {
    const startCountRef = ref(db, "reload");
    onValue(startCountRef, (snapshot) => {
      const data = snapshot.val();
      setReload(data)
    })
  }, [])

  const updateReload = () => {
    set(ref(db, "reload"), {
      reload: Number(reload.reload) + 1
    });
  }

  const { id, action, take_profit_1, take_profit_2, take_profit_3, name_forex, stop_loss, comment_en, comment_vn } = props
  const [error, setError] = useState(null)
  const [valueAction, setValueAction] = useState(action === "3" ? "Buy stop" : action === "2" ? "Buy limit" : action === "1" ? "Buy" : action === "0" ? "Sell" : action === "-1" ? "Sell limit" : action === "-2" ? "Sell stop" : null)
  const [valueTP1, setValueTP1] = useState(null)
  const [valueTP2, setValueTP2] = useState(null)
  const [valueTP3, setValueTP3] = useState(null)
  const [valueSL, setValueSL] = useState(null)
  const [valueCommentEN, setValueCommentEN] = useState(null)
  const [valueCommentVN, setValueCommentVN] = useState(null)
  const [openDialog, setOpenDialog] = useState(false)


  const navigation = useNavigation();

  const onChangeTP1 = (val) => {
    setValueTP1(val)
  }

  const onChangeTP2 = (val) => {
    setValueTP2(val)
  }
  const onChangeTP3 = (val) => {
    setValueTP3(val)
  }

  const onChangeSL = (val) => {
    setValueSL(val)
  }

  const onChangeCommentEN = (val) => {
    setValueCommentEN(val)
  }

  const onChangeCommentVN = (val) => {
    setValueCommentVN(val)
  }

  const [getValue, setGetValue] = useState([])
  const [nameHome, setNameHome] = useState("Signal free")

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

  const fetchValue = async () => {
    setValueAction(action === "3" ? "Buy stop" : action === "2" ? "Buy limit" : action === "1" ? "Buy" : action === "0" ? "Sell" : action === "-1" ? "Sell limit" : action === "-2" ? "Sell stop" : null)
    setValueTP1(take_profit_1);
    setValueTP2(take_profit_2);
    setValueTP3(take_profit_3);
    setValueSL(stop_loss);
    setValueCommentEN(comment_en);
    setValueCommentVN(comment_vn);
  };

  const clearValue = () => {
    setValueAction(null);
    setValueTP1(null);
    setValueTP2(null);
    setValueTP3(null);
    setValueSL(null);
    setValueCommentEN(null);
    setValueCommentVN(null);
  }

  const updateItem = async () => {

    const action1 = valueAction === "Buy stop" ? "3" : valueAction === "Buy limit" ? "2" : valueAction === "Buy" ? "1" : valueAction === "Sell" ? "0" : valueAction === "Sell limit" ? "-1" : valueAction === "Sell stop" ? "-2" : null

    const formData = new FormData();
    formData.append("id", id);
    formData.append("action", valueAction === null ? action : action1);
    formData.append("take_profit_1", valueTP1 === null ? take_profit_1 : valueTP1);
    formData.append("take_profit_2", valueTP2 === null ? take_profit_2 : valueTP2);
    formData.append("take_profit_3", valueTP3 === null ? take_profit_3 : valueTP3);
    formData.append("stop_loss", valueSL === null ? take_profit_3 : valueTP3);
    formData.append("last_update_time", Moment(new Date()).format("YYYY-MM-DD HH:mm:ss"));
    formData.append("comment_en", valueCommentEN === null ? comment_en : valueCommentEN);
    formData.append("comment_vn", valueCommentVN === null ? comment_vn : valueCommentVN);

    fetch("https://musicappandroid1200.000webhostapp.com/login/updateForex.php", {
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
          (alert(json.message), setOpenDialog(false), updateReload(), navigation.navigate(nameHome), onDisplayNotification({
            title: `${t("en") === "English" ? (getValue?.user_name === 'admin' ? 'XDtrader Notification' : "Person Notification") : (getValue?.user_name === 'admin' ? 'XDtrader thông báo' : "Người dùng thông báo")} `,
            body: `${t("en") === "English" ? `${name_forex} new signal available` : `${name_forex} tín hiệu mới có sẵn`}`
          }), addNotification(`Notification`, `${name_forex} new signal available`, `${name_forex} tín hiệu mới có sẵn`, getValue?.user_name === 'admin' ? 'all/' : "vip/"))
          : setError("Check form and try again!")
      })
      .catch(error => {
        setError(error.message)
      });

  };

  const deleteItem = async () => {
    const formData = new FormData();
    formData.append("id", id);

    fetch("https://musicappandroid1200.000webhostapp.com/login/deleteForex.php", {
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
          (navigation.navigate(nameHome), setOpenDialog(false), alert(json.message))
          : setError("Delete item failed !")
      })
      .catch(error => {
        setError(error.message)
      });

  };

  return (
    <>
      <View style={styles.viewBtn}>
        <Pressable style={styles.btn} onPress={() => (fetchValue(), setOpenDialog(true))}>
          <AntDesign name="edit" size={20} color="#fff" />
        </Pressable>
      </View>

      <Dialog
        title={t('update item')}
        animationType="fade"
        onTouchOutside={() => setOpenDialog(false)}
        visible={openDialog}
      >
        <ScrollView >
          <View style={styles.containerScroll}>
            <View style={styles.contanerCheck}>
              <View style={[styles.contanerCheck, { flexDirection: "row" }]}>
                <View style={[styles.containerInput, { width: "49%" }]}>
                  <Text style={styles.txtInput}>
                    {t('Stop loss')}
                  </Text>
                  <TextInput
                    keyboardType='cc-number'
                    placeholder={'0.00'}
                    onChangeText={value => onChangeSL(value)}
                    value={valueSL}
                    style={styles.input}
                    placeholderTextColor={'rgba(191,191,191,0.5)'}
                  />
                </View>
                <View style={[styles.contanerSelect, { width: "49%", height: 58 }]}>
                  <Text style={[styles.txtInput, { marginBottom: 2 }]}>
                    Action
                  </Text>
                  <SelectDropdown
                    data={dataAction}
                    onSelect={(selectedItem, index) => {
                      setValueAction(selectedItem.name);
                    }}
                    defaultButtonText={valueAction === "" ? 'Select status' : valueAction}
                    buttonTextAfterSelection={(selectedItem, index) => {
                      return selectedItem.name;
                    }}
                    rowTextForSelection={(item, index) => {
                      return item.name;
                    }}
                    buttonStyle={styles.dropdown1BtnStyle}
                    buttonTextStyle={styles.dropdown1BtnTxtStyle}
                    renderDropdownIcon={isOpened => {
                      return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
                    }}
                    dropdownIconPosition={'right'}
                    dropdownStyle={styles.dropdown1DropdownStyle}
                    rowStyle={styles.dropdown1RowStyle}
                    rowTextStyle={styles.dropdown1RowTxtStyle}
                  />
                </View>
              </View>


              <View style={[styles.containerInput]}>
                <Text style={styles.txtInput}>
                  {t('Take profit')} 1
                </Text>
                <TextInput
                  keyboardType='cc-number'
                  placeholder={'0.00'}
                  onChangeText={value => onChangeTP1(value)}
                  value={valueTP1}
                  style={styles.input}
                  placeholderTextColor={'rgba(191,191,191,0.5)'}
                />
              </View>
              <View style={[styles.containerInput]}>
                <Text style={styles.txtInput}>
                  {t('Take profit')} 2
                </Text>
                <TextInput
                  keyboardType='cc-number'
                  placeholder={'0.00'}
                  onChangeText={value => onChangeTP2(value)}
                  value={valueTP2}
                  style={styles.input}
                  placeholderTextColor={'rgba(191,191,191,0.5)'}
                />
              </View>
              <View style={[styles.containerInput]}>
                <Text style={styles.txtInput}>
                  {t('Take profit')} 3
                </Text>
                <TextInput
                  keyboardType='cc-number'
                  placeholder={'0.00'}
                  onChangeText={value => onChangeTP3(value)}
                  value={valueTP3}
                  style={styles.input}
                  placeholderTextColor={'rgba(191,191,191,0.5)'}
                />
              </View>
            </View>

            <View style={styles.contanerCheck}>

              <View style={styles.containerInput}>
                <Text style={styles.txtInput}>
                  {t('commentEN')}
                </Text>
                <TextInput
                  multiline={true}
                  numberOfLines={3}
                  style={styles.input}
                  placeholder="Enter comments ..."
                  onChangeText={value => onChangeCommentEN(value)}
                  value={valueCommentEN}
                />
              </View>
              <View style={styles.containerInput}>
                <Text style={styles.txtInput}>
                  {t('commentVN')}
                </Text>
                <TextInput
                  multiline={true}
                  numberOfLines={3}
                  style={styles.input}
                  placeholder="Enter comments ..."
                  onChangeText={value => onChangeCommentVN(value)}
                  value={valueCommentVN}
                />
              </View>
            </View>

            {error && <Text style={{ width: '100%', fontSize: 14, color: '#ea3943', fontWeight: "500", textAlign: 'left' }}>{error}</Text>}

            <View style={[styles.contanerCheck, { marginTop: 10, justifyContent: "center", gap: 36, flexDirection: 'row', }]}>
              <Pressable
                onPress={() => (clearValue(), setOpenDialog(false), setError(null))}>
                <View style={[styles.btnDialog, { backgroundColor: '#c5c5c5' }]}>
                  <Text style={styles.txtBtn}>{t('close')}</Text>
                </View>
              </Pressable>
              <Pressable
                onPress={deleteItem}>
                <View style={[styles.btnDialog, { backgroundColor: '#ea3943' }]}>
                  <Text style={styles.txtBtn}>{t('delete')}</Text>
                </View>
              </Pressable>
              <Pressable
                onPress={updateItem}>
                <View style={[styles.btnDialog, { backgroundColor: '#16c784' }]}>
                  <Text style={styles.txtBtn}>{t('update')}</Text>
                </View>
              </Pressable>
            </View>

          </View>
        </ScrollView>
      </Dialog>
    </>
  );
};

export default DialogUpdate;
