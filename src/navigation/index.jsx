import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CoinDetailedScreen from "../screens/CoinDetailedScreen";
import BottomTabNavigator from "./BottomTabNavigator";
import LoginScreen from "../screens/LoginScreen";
import TechnicalAnalysisScreen from "../screens/TechnicalAnalysisScreen";
import CoinDetail from "../components/CoinDetail";
import RegisterScreen from "../screens/RegisterScreen";
import Notification from "../components/Notification";
import DialogShow from "../components/DialogShow";
import ProfileScreen from "../screens/ProfileScreen";
import RegeditScreen from "../screens/Regedit";
import AboutScreen from "../screens/AboutScreen";
import ListNoti from "../screens/ListNoti";

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <Stack.Navigator initialRouteName="Root">
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DialogShow"
        component={DialogShow}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CoinDetail"
        component={CoinDetail}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Notification"
        component={Notification}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Regedit"
        component={RegeditScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="About"
        component={AboutScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ListNoti"
        component={ListNoti}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default Navigation;
