import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View, ActivityIndicator, LogBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Navigation from "./src/navigation";
import { RecoilRoot } from 'recoil'
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';

LogBox.ignoreAllLogs()

export default function App() {
  let [fontsLoaded] = useFonts({
    Inter_900Black,
    DroidSans: require('./assets/fonts/DroidSans.ttf')
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size={'large'} />
  }

  return (
    <NavigationContainer
      theme={{
        colors: {
          background: "#0F0F0F",
        },
      }}
    >
      <RecoilRoot>
          <View style={styles.container}>
            <Navigation />
            <StatusBar style="light" />
          </View>
      </RecoilRoot>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F0F0F",
  },
});
