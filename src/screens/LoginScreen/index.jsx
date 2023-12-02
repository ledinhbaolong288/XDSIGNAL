import React, { useState, useRef, useEffect } from "react";
import { View, Text, TextInput, Pressable, Platform, Image } from "react-native";
import styles from "./styles";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet"
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FIREBASE_AUTH, FIREBASE_DBR } from "../../../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";


const LoginScreen = () => {

  const navigation = useNavigation();
  const sheetRef = useRef(null)
  const [error, setError] = useState(null);
  const [valueUserName, setValueUserName] = useState(null);
  const [valuePassword, setValuePassword] = useState(null);
  const snapPoint = ["90%"]

  const auth = FIREBASE_AUTH;


  const onChangeText = (val) => {
    setValueUserName(val)
  }

  const onChangeTextP = (val) => {
    setValuePassword(val)
  }

  const login = async () => {

    const email = valueUserName === null ? null : valueUserName + "@gmail.com";
    if (email && valuePassword) {
      try {

        await signInWithEmailAndPassword(auth, email, valuePassword);

        const formData = new FormData();
        formData.append("user_name", valueUserName);
        formData.append("password", valuePassword);

        fetch("https://musicappandroid1200.000webhostapp.com/login/login.php", {
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
              (AsyncStorage.setItem('data', JSON.stringify(json.data)), AsyncStorage.setItem('notiSetup', "1"), alert(json.message), navigation.navigate("Signal free"))
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
            <Text style={styles.title}>Login</Text>
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
              onPress={() => (
                login()
              )}>
              <Text style={styles.text}>Continue</Text>
            </Pressable>
            <View style={styles.or}>
              <View style={{ backgroundColor: '#3A3A47', width: '45%', height: 1 }}></View>
              <Text style={[styles.text, { color: '#3A3A47' }]}>OR</Text>
              <View style={{ backgroundColor: '#3A3A47', width: '45%', height: 1 }}></View>
            </View>

            <Pressable style={[styles.button, { backgroundColor: 'rgba(255,255,255,0.1)', marginVertical: 0, marginBottom: 10 }]}
              onPress={() => navigation.navigate("RegisterScreen")}>
              <Text style={styles.text}>Register</Text>
            </Pressable>

            <View style={[styles.input, { justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', marginBottom: 10 }]}>
              <Image source={require('../../../assets/gg.png')} style={{ width: 30, height: 30 }} />
              <View style={{ width: '90%', alignItems: 'center' }}>
                <Text style={styles.text}>Continue with Google</Text>
              </View>
            </View>

            <View style={[styles.input, { justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row' }]}>
              <Image source={require('../../../assets/fb.png')} style={{ width: 30, height: 30 }} />
              <View style={{ width: '90%', alignItems: 'center' }}>
                <Text style={styles.text}>Continue with Facebook</Text>
              </View>
            </View>
          </View>
        </BottomSheetView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

export default LoginScreen;
