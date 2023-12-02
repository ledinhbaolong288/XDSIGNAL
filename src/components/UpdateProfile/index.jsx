import React, { useEffect, useRef, useState } from "react";
import styles from "./styles";
import { AntDesign, Ionicons } from '@expo/vector-icons';
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


const UpdateProfile = (props) => {
  const { getValue, update_time } = props

  const { t } = useTranslation();

  const [error, setError] = useState(null)
  const [valueEmail, setValueEmail] = useState(null)
  const [valuePhone, setValuePhone] = useState(null)
  const [valueProvince, setValueProvince] = useState(null)
  const [valueNation, setValueNation] = useState(null)
  const [valueFullname, setValueFullname] = useState(null)
  const [openDialog, setOpenDialog] = useState(false)

  const navigation = useNavigation();

  const onChangeEmail = (val) => {
    setValueEmail(val)
  }

  const onChangePhone = (val) => {
    setValuePhone(val)
  }
  const onChangeProvince = (val) => {
    setValueProvince(val)
  }

  const onChangeNation = (val) => {
    setValueNation(val)
  }

  const onChangeFullname = (val) => {
    setValueFullname(val)
  }

  const updateItem = async () => {
    const formData = new FormData();
    formData.append("id", getValue.id);
    formData.append("email", valueEmail === null ? getValue.email : valueEmail);
    formData.append("phone", valuePhone === null ? getValue.phone : valuePhone);
    formData.append("province", valueProvince === null ? getValue.province : valueProvince);
    formData.append("nation", valueNation === null ? getValue.nation : valueNation);
    formData.append("full_name", valueFullname === null ? getValue.full_name : valueFullname );
    formData.append("password", getValue.password);
    formData.append("expired", getValue.expired);
    formData.append("status", getValue.status);
    formData.append("vip", getValue.vip);

    const data = { "full_name": `${valueFullname}`, "nation": `${valueNation}`, "province": `${valueProvince}`, "email": `${valueEmail}`, "phone": `${valuePhone}`, "id": `${getValue.id}`, "language": `${getValue.language}`, "noti": `${getValue.noti}`, "user_name": `${getValue.user_name}`, "vip": `${getValue.vip}`, "status": `${getValue.status}`, "update_time": `${update_time}` }

    fetch("https://musicappandroid1200.000webhostapp.com/login/updateProfile.php", {
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
          (AsyncStorage.setItem('data', JSON.stringify(data)), alert(json.message), setOpenDialog(false))
          : setError("Update item failed !")
      })
      .catch(error => {
        setError(error.message)
      });

  };

  return (
    <>
      <Pressable
        style={{
          backgroundColor: '#16c784',
          marginTop: 20,
          paddingHorizontal: 20,
          paddingVertical: 10,
          borderRadius: 6
        }}
        onPress={() => setOpenDialog(true)}>
        <Text style={[styles.txt, { color: "#fff" }]}>{t('Edit information')}</Text>
      </Pressable>

      <Dialog
        title={t('update profile')}
        animationType="fade"
        onTouchOutside={() => setOpenDialog(false)}
        visible={openDialog}
      >
        <ScrollView >
          <View style={styles.containerScroll}>
            <View style={styles.contanerCheck}>
              <View style={styles.contanerCheck}>

                <View style={styles.containerInput}>
                  <Text style={styles.txtInput}>
                    {t('fullName')}
                  </Text>
                  <TextInput
                    placeholder={'John Lee'}
                    onChangeText={value => onChangeFullname(value)}
                    style={styles.input}
                    placeholderTextColor={'rgba(191,191,191,0.5)'}
                  />
                </View>
              </View>

              <View style={[styles.containerInput]}>
                <Text style={styles.txtInput}>
                  {t('email')}
                </Text>
                <TextInput
                  placeholder={'abc@gmail.com'}
                  onChangeText={value => onChangeEmail(value)}
                  style={styles.input}
                  placeholderTextColor={'rgba(191,191,191,0.5)'}
                />
              </View>
              <View style={[styles.containerInput]}>
                <Text style={styles.txtInput}>
                  {t('phone')}
                </Text>
                <TextInput
                  keyboardType='cc-number'
                  maxLength={10}
                  placeholder={'0xxxxxxx68'}
                  onChangeText={value => onChangePhone(value)}
                  style={styles.input}
                  placeholderTextColor={'rgba(191,191,191,0.5)'}
                />
              </View>
              <View style={[styles.containerInput]}>
                <Text style={styles.txtInput}>
                  {t('province')}
                </Text>
                <TextInput
                  placeholder={'Ha Noi'}
                  onChangeText={value => onChangeProvince(value)}
                  style={styles.input}
                  placeholderTextColor={'rgba(191,191,191,0.5)'}
                />
              </View>
            </View>

            <View style={styles.contanerCheck}>

              <View style={styles.containerInput}>
                <Text style={styles.txtInput}>
                  {t('nation')}
                </Text>
                <TextInput
                  placeholder={'Viet Nam'}
                  onChangeText={value => onChangeNation(value)}
                  style={styles.input}
                  placeholderTextColor={'rgba(191,191,191,0.5)'}
                />
              </View>
            </View>

            {error && <Text style={{ width: '100%', fontSize: 14, color: '#ea3943', fontWeight: "500", textAlign: 'left' }}>{error}</Text>}

            <View style={[styles.contanerCheck, { marginTop: 10, justifyContent: "center", gap: 36, flexDirection: 'row', }]}>
              <Pressable
                onPress={() => setOpenDialog(false)}>
                <View style={[styles.btnDialog, { backgroundColor: '#c5c5c5' }]}>
                  <Text style={styles.txtBtn}>{t('close')}</Text>
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

export default UpdateProfile;
