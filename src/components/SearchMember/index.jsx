import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import styles from "./styles";
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, TextInput, View } from "react-native";
import { useTranslation } from "react-i18next";
import { Text } from "react-native";
import BottomSheet, { BottomSheetFlatList, BottomSheetView } from "@gorhom/bottom-sheet"
import SearchBar from "../Search/SearchBar";
import { Dialog } from "react-native-simple-dialogs";
import { getDataMemberId } from "../../services/requests";
import Checkbox from "expo-checkbox";

const SearchMember = (props) => {

  const { id_user, add } = props

  const { t } = useTranslation();

  const [openSheet, setOpenSheet] = useState(false)
  const [loading, setLoading] = useState(false)
  const [openDialog, setOpenDialog] = useState(false)
  const [error, setError] = useState(null)
  const [member, setMember] = useState(null)
  const [valueEmail, setValueEmail] = useState(null)
  const [valuePhone, setValuePhone] = useState(null)
  const [valueProvince, setValueProvince] = useState(null)
  const [valueNation, setValueNation] = useState(null)
  const [valueFullname, setValueFullname] = useState(null)
  const [valuePassword, setValuePassword] = useState(null)
  const [valueExpired, setValueExpired] = useState(null)
  const [isChecked, setChecked] = useState(null);
  const [isCheckedVip, setCheckedVip] = useState(null);

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

  const onChangePassword = (val) => {
    setValuePassword(val)
  }

  const onChangeExpired = (val) => {
    setValueExpired(val)
  }
  const sheetRef = useRef()

  const closeSnap = () => {
    sheetRef.current?.close();
  }

  const snapPoints = useMemo(() => ["99%"], []);

  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  const [fakeData, setFakeData] = useState();

  const handleSnapPress = useCallback((index) => {
    sheetRef.current?.snapToIndex(index);
  }, []);


  // get data from the fake api
  useEffect(() => {
    const getData = async () => {
      const apiResponse = await fetch(
        "https://musicappandroid1200.000webhostapp.com/login/listMember.php"
      );
      const data = await apiResponse.json();
      setFakeData(data);
    };
    getData();
  }, []);


  const fetchMember = async (id) => {
    const coinsData = await getDataMemberId(id);
    setMember(coinsData);
    setValueFullname(coinsData[0].user_name);
    setValueEmail(coinsData[0].email);
    setValuePassword(coinsData[0].password);
    setValuePhone(coinsData[0].phone);
    setValueProvince(coinsData[0].province);
    setValueNation(coinsData[0].nation);
    setValueExpired(coinsData[0].expired);
    setChecked(coinsData[0].status === "1" ? true : false);
    setCheckedVip(coinsData[0].vip === "0" ? false : true);
  };

  const clearValue = () => {
    setValueFullname(null);
    setValueEmail(null);
    setValuePassword(null);
    setValuePhone(null);
    setValueProvince(null);
    setValueNation(null);
    setValueExpired(null);
    setChecked(null);
    setChecked(null);
  }


  const updateItem = async () => {
    const formData = new FormData();
    formData.append("id", member[0].id);
    formData.append("email", valueEmail === null ? member[0].email : valueEmail);
    formData.append("phone", valuePhone === null ? member[0].phone : valuePhone);
    formData.append("province", valueProvince === null ? member[0].province : valueProvince);
    formData.append("nation", valueNation === null ? member[0].nation : valueNation);
    formData.append("full_name", valueFullname === null ? member[0].full_name : valueFullname );
    formData.append("password", valuePassword === null ? member[0].password : valuePassword);
    formData.append("expired", valueExpired === null ? member[0].expired : valueExpired);
    formData.append("status", isChecked === null ? member[0].status : (isChecked === true ? "1" : "0" ));
    formData.append("vip", isCheckedVip === null ? member[0].vip : (isCheckedVip === true ? "2" : "0"));

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
          (alert(json.message), setOpenDialog(false), closeSnap(), setOpenSheet(false), setSearchPhrase(''))
          : setError("Update item failed !")
      })
      .catch(error => {
        setError(error.message)
      });

  };

  // render
  const renderItem = ({ item, index }) => {
    // when no input, show all
    if (searchPhrase === "") {
      return <Pressable style={[styles.sheetHeader, {
        backgroundColor: "#12121C", borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: "#282828"
      }]} onPress={() => (fetchMember(item.id),setOpenDialog(true))}>
        <Text style={[styles.txtSearch]}>{item.user_name}</Text>
        <MaterialCommunityIcons name="account-edit-outline" size={24} color="#FFC436" />
      </Pressable>;
    }
    // // filter of the name
    if (item.user_name.toUpperCase().includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))) {
      return <Pressable style={[styles.sheetHeader, {
        backgroundColor: "#12121C", borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: "#282828"
      }]} onPress={() => (fetchMember(item.id),setOpenDialog(true))}>
        <Text style={[styles.txtSearch]}>{item.user_name}</Text>
      </Pressable>;
    }
  };

  return (
    <>
      <Pressable style={{
        backgroundColor: '#7071E8',
        marginTop: 20,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 6
      }} onPress={() => (setOpenSheet(true), handleSnapPress(0))}>
        <Text style={[styles.txt, { color: "#fff" }]}>{t('Search member')}</Text>
      </Pressable>
      {openSheet &&
        <BottomSheet
          ref={sheetRef}
          backgroundStyle={{ backgroundColor: '#12121C' }}
          snapPoints={snapPoints}
          // enablePanDownToClose={true}
          handleIndicatorStyle={{ display: 'none' }}
          onClose={() => (closeSnap(), setOpenSheet(false), setSearchPhrase(''))}>
          <BottomSheetView>
            <View style={styles.containerSheet}>
              <Pressable style={styles.sheetHeader} onPress={() => (closeSnap(), setOpenSheet(false), setSearchPhrase(''))}>
                <Ionicons name="ios-close-circle-outline" size={24} color="#fff" />
              </Pressable>
            </View>
            <SearchBar
              searchPhrase={searchPhrase}
              setSearchPhrase={setSearchPhrase}
              clicked={clicked}
              setClicked={setClicked}
            />
          </BottomSheetView>

          <BottomSheetFlatList
            data={fakeData}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={[styles.contentContainer, { paddingVertical: searchPhrase && 10 }]}
          />

        </BottomSheet>
      }

      <Dialog
        title={t('update profile')}
        animationType="fade"
        onTouchOutside={() => setOpenDialog(false)}
        visible={openDialog}
      >
        <ScrollView >
          <View style={styles.containerScroll}>
            <View style={styles.contanerCheck}>
              <View style={[styles.contanerCheck, { flexDirection: 'row' }]}>

                <View style={[styles.containerInput, { width: '70%', alignItems: 'flex-start' }]}>
                  <Text style={styles.txtInput}>
                    {t('fullName')}
                  </Text>
                  <TextInput
                    placeholder={'John Lee'}
                    onChangeText={value => onChangeFullname(value)}
                    value={valueFullname}
                    style={styles.input}
                    placeholderTextColor={'rgba(191,191,191,0.5)'}
                  />
                </View>
                <View style={[styles.containerInput, { width: "15%", alignItems: 'center' }]}>
                  <Text style={styles.txtInput}>
                    {t('status')}
                  </Text>
                  <Checkbox
                    style={styles.checkbox}
                    value={isChecked}
                    onValueChange={setChecked}
                    color={isChecked ? '#4630EB' : undefined}
                  />
                </View>

                <View style={[styles.containerInput, { width: "15%", alignItems: 'center' }]}>
                  <Text style={styles.txtInput}>
                  Vip:
                  </Text>
                  <Checkbox
                    style={styles.checkbox}
                    value={isCheckedVip}
                    onValueChange={setCheckedVip}
                    color={isCheckedVip ? '#4630EB' : undefined}
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
                  value={valueEmail}
                  style={styles.input}
                  placeholderTextColor={'rgba(191,191,191,0.5)'}
                />
              </View>
              <View style={[styles.containerInput]}>
                <Text style={styles.txtInput}>
                  {t('password')}
                </Text>
                <TextInput
                  placeholder={'*****'}
                  onChangeText={value => onChangePassword(value)}
                  value={valuePassword}
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
                  value={valuePhone}
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
                  value={valueProvince}
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
                  value={valueNation}
                  style={styles.input}
                  placeholderTextColor={'rgba(191,191,191,0.5)'}
                />
              </View>
            </View>

            <View style={styles.contanerCheck}>

              <View style={styles.containerInput}>
                <Text style={styles.txtInput}>
                  {t('expired')}
                </Text>
                <TextInput
                  placeholder={'2023-01-01'}
                  onChangeText={value => onChangeExpired(value)}
                  value={valueExpired}
                  style={styles.input}
                  placeholderTextColor={'rgba(191,191,191,0.5)'}
                />
              </View>
            </View>

            {error && <Text style={{ width: '100%', fontSize: 14, color: '#ea3943', fontWeight: "500", textAlign: 'left' }}>{error}</Text>}

            <View style={[styles.contanerCheck, { marginTop: 10, justifyContent: "center", gap: 36, flexDirection: 'row', }]}>
              <Pressable
                onPress={() => (clearValue(), setError(null), setOpenDialog(false))}>
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

export default SearchMember;
