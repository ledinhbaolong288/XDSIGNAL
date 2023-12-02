import React from "react";
import { Text, View } from "react-native"
import { MaterialCommunityIcons, FontAwesome5, Feather } from "@expo/vector-icons";
import styles from "./styles";

const Service = () => {
  return (
    <View style={styles.container}>
      <View style={styles.containerService}>
        <View style={styles.circle}>
          <Feather name="users" color={'#18D68F'} size={20}/>
        </View>
        <Text style={styles.txt}>
          Introduce
        </Text>
      </View>

      <View style={styles.containerService}>
        <View style={styles.circle}>
          <MaterialCommunityIcons name="wallet-plus" color={'#18D68F'} size={20} />
        </View>
        <Text style={styles.txt}>
          Deposit
        </Text>
      </View>

      <View style={styles.containerService}>
        <View style={styles.circle}>
          <FontAwesome5 name="money-check-alt" color={'#18D68F'} size={15} />
        </View>
        <Text style={styles.txt}>
          Withdraw
        </Text>
      </View>

      <View style={styles.containerService}>
        <View style={styles.circle}>
          <Feather name="search" color={'#18D68F'} size={20} />
        </View>
        <Text style={styles.txt}>
          Search
        </Text>
      </View>

      <View style={styles.containerService}>
        <View style={styles.circle}>
          <FontAwesome5 name="boxes" color={'#18D68F'} size={20} />
        </View>
        <Text style={styles.txt}>
          More
        </Text>
      </View>

    </View>
  );
};

export default Service;
