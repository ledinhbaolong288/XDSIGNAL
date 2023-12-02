import React, { useEffect, useRef, useState } from "react";
import styles from "./styles";
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { Pressable, View, Button, Text, TextInput, ScrollView } from "react-native";
import { Dialog } from "react-native-simple-dialogs";
import Checkbox from 'expo-checkbox';
import SelectDropdown from "react-native-select-dropdown";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform } from "react-native";
import Moment from 'moment';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getDataPrice, sendNotification } from "../../services/requests";
import { addNotification, onDisplayNotification } from "../../utils/commonUtils";
import { useTranslation } from "react-i18next";
import { FIREBASE_DBR } from "../../../firebaseConfig";
import { onValue, ref, set } from "firebase/database";

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

const DialogAdd = () => {

  const { t } = useTranslation();

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [valueAction, setValueAction] = useState("")
  const [valueName, setValueName] = useState("")
  const [valuePrice, setValuePrice] = useState("")
  const [valueStoploss, setValueStoploss] = useState("")
  const [valueTP1, setValueTP1] = useState("")
  const [valueTP2, setValueTP2] = useState(null)
  const [valueTP3, setValueTP3] = useState(null)
  const [valueCommentEN, setValueCommentEN] = useState("")
  const [valueCommentVN, setValueCommentVN] = useState("")

  const [openDialog, setOpenDialog] = useState(false)
  const [isChecked, setChecked] = useState(false);

  const db = FIREBASE_DBR;

  const onChangeName = (val) => {
    setValueName(val)
  }

  const onChangePrice = (val) => {
    setValuePrice(val)
  }

  const onChangeStoploss = (val) => {
    setValueStoploss(val)
  }

  const onChangeTP1 = (val) => {
    setValueTP1(val)
  }

  const onChangeTP2 = (val) => {
    setValueTP2(val)
  }
  const onChangeTP3 = (val) => {
    setValueTP3(val)
  }

  const onChangeCommentEN = (val) => {
    setValueCommentEN(val)
  }

  const onChangeCommentVN = (val) => {
    setValueCommentVN(val)
  }

  const [reload, setReload] = useState(null)

  const [getValue, setGetValue] = useState(null)

  const getValueFunction = (key) => {
    AsyncStorage.getItem(key).then(
      (value) =>
        setGetValue(JSON.parse(value))

    );
  };

  useEffect(() => {
    const intervalCall = setInterval(() => {
      getValueFunction('data');
    }, 3000);
    return () => {
      clearInterval(intervalCall);
    };
  }, []);

  const fetchPrice = async () => {
    const symbol = valueName[0] + valueName[1] + valueName[2] + "/" + valueName[3] + valueName[4] + valueName[5]
    const coinsData = await getDataPrice(symbol);
    if (coinsData.price === undefined || coinsData.price === "") {
      //Open price
      setValuePrice("");
      //SL
      setValueStoploss("");
      //TP1
      setValueTP1("")
      //TP2
      setValueTP2("")
      //TP3
      setValueTP3("")
      // action
      setValueAction("")
    } else {
      //Open price
      const fixed = parseFloat(coinsData.price);
      setValuePrice(fixed.toFixed(0));
      //SL
      const fixedLoss = parseFloat(coinsData.price * 99 / 100);
      setValueStoploss(fixedLoss.toFixed(0));
      //TP1
      const fixedTP1 = parseFloat(coinsData.price * 101 / 100);
      setValueTP1(fixedTP1.toFixed(0))
      //TP2
      const fixedTP2 = parseFloat(coinsData.price * 102 / 100);
      setValueTP2(fixedTP2.toFixed(0))
      //TP3
      const fixedTP3 = parseFloat(coinsData.price * 103 / 100);
      setValueTP3(fixedTP3.toFixed(0))
      //Action
      setValueAction("Buy")
    }
  };

  const changeAction = async (action) => {
    const symbol = valueName[0] + valueName[1] + valueName[2] + "/" + valueName[3] + valueName[4] + valueName[5]
    const coinsData = await getDataPrice(symbol);
    if (coinsData.price === undefined || coinsData.price === "") {
      //Open price
      setValuePrice("");
      //SL
      setValueStoploss("");
      //TP1
      setValueTP1("")
      //TP2
      setValueTP2("")
      //TP3
      setValueTP3("")
      // action
      setValueAction("")
    } else {
      if (action === "Buy" || action === "Buy limit" || action === "Buy stop") {
        //Open price
        const fixed = parseFloat(coinsData.price);
        setValuePrice(fixed.toFixed(0));
        //SL
        const fixedLoss = parseFloat(coinsData.price * 99 / 100);
        setValueStoploss(fixedLoss.toFixed(0));
        //TP1
        const fixedTP1 = parseFloat(coinsData.price * 101 / 100);
        setValueTP1(fixedTP1.toFixed(0))
        //TP2
        const fixedTP2 = parseFloat(coinsData.price * 102 / 100);
        setValueTP2(fixedTP2.toFixed(0))
        //TP3
        const fixedTP3 = parseFloat(coinsData.price * 103 / 100);
        setValueTP3(fixedTP3.toFixed(0))
      } else {
        //Open price
        const fixed = parseFloat(coinsData.price);
        setValuePrice(fixed.toFixed(0));
        //SL
        const fixedLoss = parseFloat(coinsData.price * 96 / 100);
        setValueStoploss(fixedLoss.toFixed(0));
        //TP1
        const fixedTP1 = parseFloat(coinsData.price * 99 / 100);
        setValueTP1(fixedTP1.toFixed(0))
        //TP2
        const fixedTP2 = parseFloat(coinsData.price * 98 / 100);
        setValueTP2(fixedTP2.toFixed(0))
        //TP3
        const fixedTP3 = parseFloat(coinsData.price * 97 / 100);
        setValueTP3(fixedTP3.toFixed(0))
      }
    }
  }

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchPrice();
    }, 3000)

    return () => clearTimeout(delayDebounceFn)
  }, [valueName])

  const addItem = async () => {
    try {

      const action = valueAction === "Buy stop" ? "3" : valueAction === "Buy limit" ? "2" : valueAction === "Buy" ? "1" : valueAction === "Sell" ? "0" : valueAction === "Sell limit" ? "-1" : valueAction === "Sell stop" ? "-2" : null

      const formData = new FormData();
      formData.append("name_forex", valueName.toUpperCase());
      formData.append("vip", getValue?.user_name === 'admin' ? (isChecked ? "1" : "0") : "2");
      formData.append("status", "0");
      formData.append("action", action);
      formData.append("open_time", Moment(new Date()).format("YYYY-MM-DD HH:mm:ss"));
      formData.append("open_price", valuePrice);
      formData.append("take_profit_1", valueTP1);
      formData.append("take_profit_2", valueTP2 === "" ? "0" : valueTP2);
      formData.append("take_profit_3", valueTP3 === "" ? "0" : valueTP3);
      formData.append("stop_loss", valueStoploss);
      formData.append("profit_and_loss", "Waiting");
      formData.append("trade_result", "in-processing");
      formData.append("last_update_time", Moment(new Date()).format("YYYY-MM-DD HH:mm:ss"));
      formData.append("comment_en", valueCommentEN);
      formData.append("comment_vn", valueCommentVN);

      fetch("https://musicappandroid1200.000webhostapp.com/login/insertForex.php", {
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
            (alert(json.message), setOpenDialog(false), updateReload(), onDisplayNotification({
              title: `${t("en") === "English" ? (getValue?.user_name === 'admin' ? 'XDtrader Notification' : "Person Notification") : (getValue?.user_name === 'admin' ? 'XDtrader Thông báo' : "Người dùng Thông báo")}`,
              body: `${t("en") === "English" ? `${valueName} new signal available` : `${valueName} tín hiệu mới có sẵn`}`
            }), addNotification(`Notification`, `${symbol} new signal available`, `${symbol} tín hiệu mới có sẵn`, getValue?.user_name === 'admin' ? 'all/' : "vip/"))
            : setError("Add item failed !")
        })
    } catch (error) {
      setError(error.message)
    };

  };

  const resetForm = () => {
    setError(null);
    setValueName("");
    setValuePrice("");
    setValueStoploss("");
    setValueTP1("");
    setValueTP2(null);
    setValueTP3(null);
    setValueCommentEN("");
    setValueCommentVN("");
    setChecked(false);
    setValueAction("")
  }

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

  return (
    <>
      <View style={styles.viewBtn}>
        <Pressable style={styles.btn} onPress={() => (resetForm(), setOpenDialog(true))}>
          <Ionicons name="add" size={24} color="#fff" />
        </Pressable>
      </View>

      <Dialog
        title={t('Add item')}
        animationType="fade"

        onTouchOutside={() => setOpenDialog(false)}
        visible={openDialog}
      >
        <ScrollView >
          <View style={styles.containerScroll}>
            <View style={styles.contanerCheck}>
              <View style={[styles.containerInput, { width: getValue?.user_name === 'admin' ? "70%" : "100%" }]}>
                <Text style={styles.txtInput}>
                  {t('nameForex')}
                </Text>
                <TextInput
                  placeholder={'USDJYP'}
                  maxLength={6}
                  onChangeText={val => onChangeName(val)}
                  style={styles.input}
                  placeholderTextColor={'rgba(191,191,191,0.5)'}
                />
              </View>
              {getValue?.user_name === 'admin' &&
                <View style={[styles.containerInput, { width: "30%", alignItems: 'flex-end' }]}>
                  <Text style={styles.txtInput}>
                    {t('userVip')}
                  </Text>
                  <Checkbox
                    style={styles.checkbox}
                    value={isChecked}
                    onValueChange={setChecked}
                    color={isChecked ? '#4630EB' : undefined}
                  />
                </View>
              }
            </View>

            <View style={styles.contanerCheck}>
              <View style={[styles.contanerSelect, { width: "100%", height: 58 }]}>
                <Text style={[styles.txtInput, { marginBottom: 2 }]}>
                  Action
                </Text>
                <SelectDropdown
                  data={dataAction}
                  onSelect={(selectedItem, index) => {
                    setValueAction(selectedItem.name), changeAction(selectedItem.name)
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
            {/* <View style={styles.contanerCheck}>
              {showPicker && (
                <DateTimePicker
                  mode="datetime"
                  value={date}
                  onChange={onChangeOpenTime}
                />
              )}
              <View style={[styles.containerInput, { width: "48.5%" }]}>
                <Text style={styles.txtInput}>
                  Open time
                </Text>
                {!showPicker && (
                  <Pressable
                    style={{ width: "100%" }}
                    onPress={() => setShowPicker(true)}>
                    <TextInput
                      placeholder={"Sat Aug 21 2004"}
                      style={styles.input}
                      placeholderTextColor={'rgba(191,191,191,0.5)'}
                      editable={false}
                      value={openTime > Moment(new Date()).format('YYYY-MM-DD HH:mm:ss') ? null : openTime}
                    />
                  </Pressable>
                )}
              </View>
              <View style={styles.divider} />
              {showPickerEnd && (
                <DateTimePicker
                  mode="datetime"
                  value={dateEnd}
                  onChange={onChangeEndTime}
                />
              )}
              <View style={[styles.containerInput, { width: "48.5%" }]}>
                <Text style={styles.txtInput}>
                  End time
                </Text>
                {!showPickerEnd && (
                  <Pressable
                    style={{ width: "100%" }}
                    onPress={() => setShowPickerEnd(true)}>
                    <TextInput
                      placeholder={"Sat Aug 21 2004"}
                      style={styles.input}
                      placeholderTextColor={'rgba(191,191,191,0.5)'}
                      editable={false}
                      value={endTime}
                    />
                  </Pressable>
                )}
              </View>
            </View>
            {openTime > Moment(new Date()).format('DD-MM-YYYY') &&
              <Text style={{ width: '100%', fontSize: 10, color: '#ea3943', fontWeight: "500", textAlign: 'left' }}>Open time cannot be greater than the current date</Text>
            } */}
            <View style={styles.contanerCheck}>
              <View style={[styles.containerInput, { width: "48.5%" }]}>
                <Text style={styles.txtInput}>
                  {t('openPrice')}
                </Text>
                <TextInput
                  keyboardType='cc-number'
                  placeholder={'0.00'}
                  onChangeText={value => onChangePrice(value)}
                  value={valuePrice}
                  style={styles.input}
                  placeholderTextColor={'rgba(191,191,191,0.5)'}
                />
              </View>
              <View style={styles.divider} />
              <View style={[styles.containerInput, { width: "48.5%" }]}>
                <Text style={styles.txtInput}>
                  {t('Stop loss')}
                </Text>
                <TextInput
                  keyboardType='cc-number'
                  placeholder={'0.00'}
                  onChangeText={value => onChangeStoploss(value)}
                  value={valueStoploss}
                  style={styles.input}
                  placeholderTextColor={'rgba(191,191,191,0.5)'}
                />
              </View>
            </View>

            <View style={styles.contanerCheck}>
              <View style={[styles.containerInput, { width: 98 / 3 + "%" }]}>
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
              <View style={[styles.containerInput, { width: 98 / 3 + "%" }]}>
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
              <View style={[styles.containerInput, { width: 98 / 3 + "%" }]}>
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

              <View style={[styles.containerInput]}>
                <Text style={styles.txtInput}>
                  {t('commentEN')}
                </Text>
                <TextInput
                  multiline={true}
                  numberOfLines={3}
                  style={styles.input}
                  placeholder={t('Enter comments')}
                  onChangeText={value => onChangeCommentEN(value)}
                />
              </View>


            </View>
            <View style={[styles.containerInput]}>
              <Text style={styles.txtInput}>
                {t('commentVN')}
              </Text>
              <TextInput
                multiline={true}
                numberOfLines={3}
                style={styles.input}
                placeholder={t('Enter comments')}
                onChangeText={value => onChangeCommentVN(value)}
              />
            </View>

            {error && <Text style={{ width: '100%', fontSize: 14, color: '#ea3943', fontWeight: "500", textAlign: 'left' }}>{error}</Text>}

            <View style={[styles.contanerCheck, { marginTop: 10, justifyContent: "center", gap: 60 }]}>
              <Pressable
                onPress={() => setOpenDialog(false)}>
                <View style={[styles.btnDialog, { backgroundColor: '#ea3943' }]}>
                  <Text style={styles.txtBtn}>{t('close')}</Text>
                </View>
              </Pressable>
              <Pressable
                onPress={addItem}>
                <View style={[styles.btnDialog, { backgroundColor: '#16c784' }]}>
                  <Text style={styles.txtBtn}>{t('add')}</Text>
                </View>
              </Pressable>
            </View>

          </View>
        </ScrollView>
      </Dialog>
    </>
  );
};

export default DialogAdd;
