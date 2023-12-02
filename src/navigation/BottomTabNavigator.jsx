import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import PortfolioScreen from "../screens/PortfolioScreen";
import { Entypo, Ionicons, MaterialIcons, Feather, MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";
import ListScreen from "../screens/ListScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { onValue, ref, set } from "firebase/database";
import { FIREBASE_DBR } from "../../firebaseConfig";
import { useTranslation } from "react-i18next";
import { randomIntFromInterval } from "../utils/commonUtils";
import CoinDetailedScreen from "../screens/CoinDetailedScreen";
import TechnicalAnalysisScreen from "../screens/TechnicalAnalysisScreen";
import i18n from "../../i18n";
import Modal from 'react-native-modal';
import { View } from "react-native";
import { Image } from "react-native";
import { Text } from "react-native";
import { Pressable } from "react-native";
import styles from "./styles";
import Language from "../components/Language";
import Accordion from 'react-native-collapsible/Accordion';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const navigation = useNavigation();

  const { t } = useTranslation();

  const dataFilter = [
    {
      id: 7,
      title: 'All',
    },
    {
      id: 1,
      title: '1d',
    },
    {
      id: 2,
      title: '7d',
    },
    {
      id: 3,
      title: '1m',
    },
    {
      id: 4,
      title: '2m',
    },
    {
      id: 5,
      title: '3m',
    },
    {
      id: 6,
      title: '1y',
    }
  ]

  const dataFilterNoti = [
    {
      title: 'None',
    },
    {
      title: 'All',
    },
    {
      title: 'Person',
    },
    {
      title: 'Favorite',
    }
  ]

  const db = FIREBASE_DBR;

  const [getValue, setGetValue] = useState(null)
  const [nameHome, setNameHome] = useState("Signal free")
  const [btnNoti, setBtnNoti] = useState(1);

  const getValueFunction = (key) => {
    AsyncStorage.getItem(key).then(
      (value) =>
        (setGetValue(JSON.parse(value)))
    );
  };

  const [reload, setReload] = useState(0)

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

  useEffect(() => {
    getValueFunction('data'),
      setNameHome(getValue?.vip === undefined ? "Signal free" : getValue?.vip === "1" ? "Signal admin" : getValue?.vip === "2" ? "Signal vip" : "Signal free"),
      changeLanguage(getValue?.language)
  }, [getValue?.vip]);

  useEffect(() => {
    const interval = setInterval(() => {
      getValueFunction('data'),
        setNameHome(getValue?.vip === undefined ? "Signal free" : getValue?.vip === "1" ? "Signal admin" : getValue?.vip === "2" ? "Signal vip" : "Signal free")
    }
      , 3000);
    return () => {
      clearInterval(interval);
    };
  }, [getValue?.vip]);

  const changeLanguage = value => {
    i18n
      .changeLanguage(value)
      .then(() => null)
      .catch(err => console.log(err));
  };

  const updateCount = () => {
    set(ref(db, "count"), {
      count: randomIntFromInterval(0, 6)
    });
  }

  const [modalVisible, setModalVisible] = useState(false)
  const [activeSections, setActiveSections] = useState([]);
  const [btn, setBtn] = useState(3);

  const changeModal = async (data) => {
    setModalVisible(data)
  };

  const sections = [
    {
      title: t('Analysic time frame'),
      content:
        <View style={styles.containerFilter}>
          {dataFilter.map((item, index) =>
            <Pressable
              onPress={() => (setBtn(item.id), updateReload(), setModalVisible(false), navigation.navigate(t(nameHome), { timeFrame: item.id }))}
            >
              <Text style={[styles.txt, {
                backgroundColor: item.id === btn ? '#2962ff' : 'rgba(58,58,71,0)',
                fontSize: 14,
                borderRadius: 4,
                fontWeight: '600',
                paddingHorizontal: item.id === btn ? 2 : 0
              }]}>{item.title}</Text>
            </Pressable>

          )}
        </View>
    }
  ];

  function renderHeader(section, _, isActive) {
    return (
      <View style={styles.accordHeader}>
        <Text style={styles.txt}>{t('Analysic time frame')}</Text>
        <FontAwesome name={isActive ? 'chevron-up' : 'chevron-down'}
          size={16} color="#fff" />
      </View>

    );
  };

  function renderContent(section, _, isActive) {
    return (
      <View style={{ paddingHorizontal: 6 }}>
        {section.content}
      </View>
    );
  }

  const [activeSectionNoti, setActiveSectionNoti] = useState([]);
  const sectionsNoti = [
    {
      title: t('Notice signal'),
      content: <View style={styles.containerFilter}>
        {dataFilterNoti.map((item, index) =>
          <Pressable
            onPress={() => (setBtnNoti(index), setModalVisible(false),
              AsyncStorage.setItem('data', JSON.stringify({ "full_name": `${getValue?.full_name}`, "nation": `${getValue?.nation}`, "province": `${getValue?.province}`, "email": `${getValue?.email}`, "phone": `${getValue?.phone}`, "id": `${getValue?.id}`, "language": `${getValue?.language}`, "noti": `${index}`, "user_name": `${getValue?.user_name}`, "vip": `${getValue?.vip}`, "status": `${getValue?.status}`, "update_time": `${getValue?.update_time}` }
              )))}
          >
            <Text style={[styles.txt, {
              backgroundColor: index === Number(btnNoti) ? '#2962ff' : 'rgba(58,58,71,0)',
              fontSize: 14,
              borderRadius: 4,
              fontWeight: '600',
              paddingHorizontal: index === Number(btnNoti) ? 6 : 0
            }]}>{item.title}</Text>
          </Pressable>

        )}
      </View>

    }
  ];

  function renderHeaderNoti(section, _, isActive) {
    return (
      <View style={styles.accordHeader}>
        <Text style={styles.txt}>{t('Notice signal')}</Text>
        <FontAwesome name={isActive ? 'chevron-up' : 'chevron-down'}
          size={16} color="#fff" />
      </View>

    );
  };

  function renderContentNoti(section, _, isActive) {
    return (
      <View style={{ paddingHorizontal: 6 }}>
        {section.content}
      </View>
    );
  }

  return (
    <>
      <Tab.Navigator
        initialRouteName={t(nameHome)}
        screenOptions={{
          tabBarActiveTintColor: '#fff',
          tabBarInactiveTintColor: '#787878',
          tabBarStyle: {
            height: 68,
            paddingHorizontal: 37,
            paddingTop: 12,
            paddingLeft: 20,
            paddingRight: 20,
            paddingBottom: 20,
            backgroundColor: 'rgba(58,58,71,1)',
            borderTopWidth: 0,
          },
        }}
      >
        <Tab.Screen
          name={t(nameHome)}
          initialParams={{ timeFrame: btn }}
          component={HomeScreen}
          options={{
            tabBarActiveTintColor: modalVisible ? '#787878' : '#fff',
            headerShown: false,
            tabBarIcon: ({ focused, color }) => (
              <Entypo name="home" size={20} color={modalVisible ? '#787878' : focused ? '#fff' : '#787878'} />
            ),
            tabBarButton: props => (
              <TouchableOpacity {...props} style={{ width: 80 }} onPress={() => (navigation.navigate(t(nameHome), { timeFrame: btn }), updateCount())} />
            ),
          }}
        />
        <Tab.Screen
          name={t('Price quote')}
          component={PortfolioScreen}
          options={{
            tabBarActiveTintColor: modalVisible ? '#787878' : '#fff',
            headerShown: false,
            tabBarIcon: ({ focused, color }) => (
              <Ionicons name="swap-vertical" size={24} color={modalVisible ? '#787878' : focused ? '#fff' : '#787878'} />
            ),
            tabBarButton: props => (
              <TouchableOpacity {...props} onPress={() => (getValue === null ? navigation.navigate("LoginScreen") : navigation.navigate(t('Price quote'), { vip: getValue?.vip, id: getValue?.id }), updateCount())} />
            ),
          }}
        />
        <Tab.Screen
          name={t('Chart')}
          component={CoinDetailedScreen}
          options={{
            tabBarActiveTintColor: modalVisible ? '#787878' : '#fff',
            headerShown: false,
            tabBarIcon: ({ focused, color }) => (
              <MaterialCommunityIcons name="chart-timeline-variant" size={25} color={modalVisible ? '#787878' : focused ? '#fff' : '#787878'} />
            ),
            tabBarButton: props => (
              <TouchableOpacity {...props} onPress={() => (getValue === null ? navigation.navigate("LoginScreen") : navigation.navigate(t('Chart'), { coinId: "USDJPY", vip: getValue?.vip }), updateCount())} />
            ),
          }}
        />
        <Tab.Screen
          name={t('Analystic')}
          component={TechnicalAnalysisScreen}
          options={{
            tabBarActiveTintColor: modalVisible ? '#787878' : '#fff',
            headerShown: false,
            tabBarIcon: ({ focused, color }) => (
              <Ionicons name="stopwatch-outline" size={24} color={modalVisible ? '#787878' : focused ? '#fff' : '#787878'} />
            ),
            tabBarButton: props => (
              <TouchableOpacity {...props} onPress={() => (getValue === null ? navigation.navigate("LoginScreen") : navigation.navigate(t('Analystic'), { coinId: "USDJPY", vip: getValue?.vip }), updateCount())} />
            ),
          }}
        />
        <Tab.Screen
          name={t('New')}
          component={ListScreen}
          options={{
            tabBarActiveTintColor: modalVisible ? '#787878' : '#fff',
            headerShown: false,
            tabBarIcon: ({ focused, color }) => (
              <MaterialIcons name="local-fire-department" size={25} color={modalVisible ? '#787878' : focused ? '#fff' : '#787878'} />
            ),
            tabBarButton: props => (
              <TouchableOpacity {...props} onPress={() => (getValue === null ? navigation.navigate("LoginScreen") : navigation.navigate(t('New')), updateCount())} />
            ),
          }}
        />
        <Tab.Screen
          name={t('Setting')}
          component={ProfileScreen}
          options={{
            tabBarInactiveTintColor: modalVisible ? '#fff' : '#787878',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => <Feather name="settings" color={modalVisible ? '#fff' : '#787878'} size={20} />,
            tabBarButton: props => (
              <TouchableOpacity {...props} onPress={() => getValue === null ? navigation.navigate("LoginScreen") : setModalVisible(true)} />
            ),
            tabBarLabel: () => (
              <Text style={{ color: modalVisible ? '#fff' : '#787878', fontSize: 10 }}>{t('Setting')}</Text>
            ),
          }}
        />
      </Tab.Navigator>

      <Modal
        isVisible={modalVisible}
        animationType="fade"
        animationIn="slideInLeft"
        animationOut="slideOutLeft"
        backdropColor="rgba(255,255,255, 0)"
      >
        <View style={{ width: "120%", height: "110%", left: -20, display: 'flex', flexDirection: 'row' }}>
          <View style={{ width: "50%", height: "100%" }}>
            <View style={{ width: "100%", height: "88.5%", backgroundColor: "#0F0F0F", gap: 30 }}>
              <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingTop: 13.4, alignItems: 'center', borderBottomWidth: 0.5, borderBottomColor: '#c5c5c5' }}>
                <Image source={require('../../assets/icon.png')} style={{ width: 45, height: 45, borderRadius: 100, borderColor: '#c5c5c5', borderWidth: 0.5 }} />
                <Text style={styles.title} numberOfLines={2}>XDtrader signal</Text>
              </View>
              <View style={{ width: "100%", paddingLeft: 10, backgroundColor: "#0F0F0F", gap: 35 }}>
                <Language setModalVisible={changeModal} />
                <Pressable onPress={() => (navigation.navigate("Profile"), setModalVisible(false))} >
                  <Text style={styles.txt}>{t('Profile')}</Text>
                </Pressable>
                <Pressable onPress={() => (navigation.navigate("Regedit"), setModalVisible(false))} >
                  <Text style={styles.txt}>{t('Regedit')}</Text>
                </Pressable>
                {getValue?.vip > 0 &&

                  <Accordion
                    align="bottom"
                    sections={sectionsNoti}
                    activeSections={activeSectionNoti}
                    renderHeader={renderHeaderNoti}
                    renderContent={renderContentNoti}
                    onChange={(sections) => setActiveSectionNoti(sections)}
                    sectionContainerStyle={styles.accordContainer}
                  />
                }
                <Pressable onPress={() => (navigation.navigate(t('Price quote'), { vip: getValue?.vip, id: getValue?.id }), setModalVisible(false))} >
                  <Text style={styles.txt}>{t('Favorite signal')}</Text>
                </Pressable>
                {getValue?.vip > 0 &&
                  <Accordion
                    align="bottom"
                    sections={sections}
                    activeSections={activeSections}
                    renderHeader={renderHeader}
                    renderContent={renderContent}
                    onChange={(sections) => setActiveSections(sections)}
                    sectionContainerStyle={styles.accordContainer}
                  />
                }
                <Pressable onPress={() => (navigation.navigate("About"), setModalVisible(false))} >
                  <Text style={styles.txt}>{t('About')}</Text>
                </Pressable>
              </View>
            </View>
            <Pressable style={{ width: "100%", height: "12%" }} onPress={() => setModalVisible(false)} />
          </View>
          <Pressable style={{ width: "70%", height: "110%" }} onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
    </>
  );
};

export default BottomTabNavigator;
