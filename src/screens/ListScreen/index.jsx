import React from "react";
import { StyleSheet, View } from "react-native";
import SiderBar from "../../components/Sidebar";
import SelectGlobal from "../../components/SelectGlobal";
import NewStory from "../../components/NewStory";


const ListScreen = () => {
  return (
    <View style={styles.bg}>
      <SiderBar title={'New story'} />
      <NewStory/>
    </View>
  );
};

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    flexDirection: "column",
  },
  titleContainer: {
    flexDirection: 'row',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
  },
  title: {
    fontSize: 14,
    color: '#fff',
    fontFamily: 'DroidSans'
  },

});

export default ListScreen;
