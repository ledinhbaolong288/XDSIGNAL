import React, { useRef } from "react";
import { View, Pressable, Platform, Text } from "react-native";
import styles from "./styles";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet"
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';
import { GestureHandlerRootView } from "react-native-gesture-handler";


const DialogShow = () => {

  const navigation = useNavigation();
  const sheetRef = useRef(null)
  const snapPoint = ["90%"]

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
          <View style={styles.containerItem}>
            <View style={[styles.containerItem, { width: "48%" }]}>
              <View style={styles.txt}>
                <Text style={styles.txtItem}>aa</Text>
              </View>
            </View>
          </View>
        </BottomSheetView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

export default DialogShow;
