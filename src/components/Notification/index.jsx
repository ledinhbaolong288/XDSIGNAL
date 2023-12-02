import React, { useEffect, useState } from "react";
import { Text, View, Pressable, ScrollView, FlatList } from "react-native";
import styles from "./styles";
import { useNavigation, useRoute } from "@react-navigation/native";
import SiderBarBack from "../Sidebarback";
import { FIREBASE_DBR } from "../../../firebaseConfig";
import { onValue, ref, remove } from "firebase/database";
import moment from "moment";
import { timeAgo } from "../../utils/commonUtils";
import { MaterialIcons, AntDesign, Entypo } from '@expo/vector-icons';
import { t } from "i18next";
import DialogAddNoti from "../DialogAddNoti";

const Notification = () => {
  const route = useRoute();
  const {
    params: {
      notiSetup, vip
    },
  } = route;
  const navigation = useNavigation();
  const db = FIREBASE_DBR;
  const [openDele, setOpenDele] = useState(false)

  const [noti, setNoti] = useState()

  const fetchData = () => {
    const startCountRef = notiSetup != 0 && ref(db, "noti/");
    notiSetup != 0 && onValue(startCountRef, (snapshot) => {
      const data = snapshot.val();
      const newPost = Object.keys(notiSetup === 1 ? data.all : notiSetup === 2 ? data.vip : notiSetup === 3 ? data.favorite : data.all).map(key => ({
        id: key,
        ...notiSetup === 1 ? data.all[key] : notiSetup === 2 ? data.vip[key] : notiSetup === 3 ? data.favorite[key] : data.all[key]
      }));
      setNoti(newPost.reverse())
    })
  }

  useEffect(() => {
    fetchData();
  }, [])

  const deleteAd = (id) => {
    remove(ref(db, "noti/" + "all/" + id));
    alert("Removed!")
  }

  return (
    <>
      <SiderBarBack hideNoti={1} />
      <ScrollView>
        <View
          style={styles.coinContainer}
        >
          {noti &&
            <FlatList
              key={noti?.id}
              data={noti}
              nestedScrollEnabled={true}
              renderItem={({ item }) => (
                item.body === "all" || item.body === "fav" || item.body === "person" ? null :
                  <View style={styles.containerNotiDelete}>
                    <View style={styles.containerNoti}>
                      <Text style={styles.txtTime}>{timeAgo(item.time)}</Text>
                      <Text style={styles.txtDescription} >{t("en") === "English" ? item.body : item.body2}</Text>
                    </View>
                    {openDele &&
                      <Pressable style={{ right: 20 }} onPress={() => deleteAd(item.id)}>
                        <AntDesign name="delete" size={24} color="#D83F31" />
                      </Pressable>
                    }
                  </View>
              )
              }
              onEndReached={() => fetchData(noti?.length / 50 + 1)}
            />
          }
          {(notiSetup === 0 || noti?.length < 2) &&
            <View style={{ width: "100%", display: 'flex', alignItems: "center", justifyContent: "center" }}>
              <MaterialIcons name="error-outline" size={30} color="#F3B664" />
              <Text style={[styles.txtDescription, { fontSize: 16, marginTop: 10, color: "#F3B664" }]}>{t('not noti')}</Text>
            </View>
          }
        </View>
      </ScrollView>
      {vip === 1 && <DialogAddNoti />}
      <View style={styles.viewBtn}>
        <Pressable style={styles.btn} onPress={() => setOpenDele(true)}>
          <Entypo name="minus" size={24} color="#fff" />
        </Pressable>
      </View>
    </>


  );
};

export default Notification;
