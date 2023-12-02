import React, { useState, useRef } from "react";
import { View, Text, TextInput, Pressable, Platform, Image } from "react-native";
import styles from "./styles";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet"
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FIREBASE_AUTH } from "../../../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";

const RegisterScreen = () => {

  const auth = FIREBASE_AUTH;

  const navigation = useNavigation();
  const sheetRef = useRef(null)
  const [error, setError] = useState(null);
  const [valueUserName, setValueUserName] = useState(null);
  const [valueFullName, setValueFullName] = useState(null);
  const [valuePassword, setValuePassword] = useState(null);
  const snapPoint = ["90%"]

  const onChangeTextFullName = (val) => {
    setValueFullName(val)
  }

  const onChangeText = (val) => {
    setValueUserName(val)
  }

  const onChangeTextP = (val) => {
    setValuePassword(val)
  }

  const register = async () => {

    const email = valueUserName === null ? null : valueUserName + "@gmail.com";
    if (valueFullName && email && valuePassword) {
      try {

        await createUserWithEmailAndPassword(auth, email, valuePassword);

        const formData = new FormData();
        formData.append("full_name", valueFullName);
        formData.append("user_name", valueUserName);
        formData.append("password", valuePassword);

        await fetch("https://musicappandroid1200.000webhostapp.com/login/register.php", {
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
              (alert(json.message), navigation.navigate("LoginScreen"))
              : setError(json.message)
          })
      } catch (e) {
        setError("Please check your form and try again")
      }
    }
  };


  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: "rgba(255,255,255,0.1)" }} keyboardVerticalOffset={80} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <BottomSheet
        ref={sheetRef}
        backgroundStyle={{ backgroundColor: '#12121C' }}
        snapPoints={snapPoint}
        enablePanDownToClose={true}
        handleIndicatorStyle={{ display: 'none' }}
        onClose={() => navigation.goBack()}>
        <BottomSheetView>
          <View style={styles.containerSheet}>
            <Pressable style={styles.sheetHeader} onPress={() => navigation.goBack()}>
              <Ionicons name="ios-close-circle-outline" size={24} color="#fff" />
            </Pressable>
          </View>
          <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start', paddingHorizontal: 16 }}>
            <Text style={styles.title}>Register</Text>
            <Text style={styles.txtInput}>
              Full Name
            </Text>
            <TextInput
              placeholder={'John Lee'}
              onChangeText={val => onChangeTextFullName(val)}
              style={styles.input}
              placeholderTextColor={'rgba(191,191,191,0.5)'}
            />
            <Text style={styles.txtInput}>
              User Name
            </Text>
            <TextInput
              placeholder={'xdtrader'}
              onChangeText={val => onChangeText(val)}
              style={styles.input}
              placeholderTextColor={'rgba(191,191,191,0.5)'}
            />
            <Text style={[styles.txtInput, { marginVertical: 6 }]}>
              Password
            </Text>
            <TextInput
              placeholder={'******'}
              onChangeText={val => onChangeTextP(val)}
              style={styles.input}
              placeholderTextColor={'rgba(191,191,191,0.5)'}
              secureTextEntry
            />
            {error != null ?
              <Text style={[styles.txtInput, { color: 'red' }]}>
                {error}
              </Text>
              : null}
            <Pressable style={styles.button}
              onPress={register}>
              <Text style={styles.text}>Continue</Text>
            </Pressable>
            <View style={styles.or}>
              <View style={{ backgroundColor: '#3A3A47', width: '45%', height: 1 }}></View>
              <Text style={[styles.text, { color: '#3A3A47' }]}>OR</Text>
              <View style={{ backgroundColor: '#3A3A47', width: '45%', height: 1 }}></View>
            </View>

            <Pressable style={[styles.button, { backgroundColor: 'rgba(255,255,255,0.1)', marginVertical: 0, marginBottom: 10 }]}
              onPress={() => navigation.navigate("LoginScreen")}>
              <Text style={styles.text}>Login</Text>
            </Pressable>
          </View>
        </BottomSheetView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

export default RegisterScreen;
