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

const DialogAddNoti = () => {

  const { t } = useTranslation();

  const [error, setError] = useState(null)
  const [valueCommentEN, setValueCommentEN] = useState("")
  const [valueCommentVN, setValueCommentVN] = useState("")

  const [openDialog, setOpenDialog] = useState(false)
  const [isChecked, setChecked] = useState(false);

  const db = FIREBASE_DBR;

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

  const resetForm = () => {
    setError(null);
    setValueCommentEN("");
    setValueCommentVN("");
  }

  const createNoti = () => {
    onDisplayNotification({
      title: `XDtrader Notification`,
      body: `${t("en") === "English" ? valueCommentEN : valueCommentVN}`
    }),
      addNotification(`Notification`, `${valueCommentEN}`, `${valueCommentVN}`, 'all/'), setOpenDialog(false)
  }

  return (
    <>
      <View style={styles.viewBtn}>
        <Pressable style={styles.btn} onPress={() => (resetForm(), setOpenDialog(true))}>
          <Ionicons name="add" size={24} color="#fff" />
        </Pressable>
      </View>

      <Dialog
        title={t('Add noti')}
        animationType="fade"
        onTouchOutside={() => setOpenDialog(false)}
        visible={openDialog}
      >
        <ScrollView >
          <View style={styles.containerScroll}>
            <View style={styles.contanerCheck}>

              <View style={[styles.containerInput]}>
                <Text style={styles.txtInput}>
                  {t('Notification EN')}
                </Text>
                <TextInput
                  multiline={true}
                  numberOfLines={3}
                  style={styles.input}
                  placeholder={t('Enter notification ...')}
                  onChangeText={value => onChangeCommentEN(value)}
                />
              </View>


            </View>
            <View style={[styles.containerInput]}>
              <Text style={styles.txtInput}>
                {t('Notification VN')}
              </Text>
              <TextInput
                multiline={true}
                numberOfLines={3}
                style={styles.input}
                placeholder={t('Enter notification ...')}
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
                onPress={createNoti}>
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

export default DialogAddNoti;
