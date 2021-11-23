import React from "react";
import { Text, View, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";
import moment from "moment";
import { buttonColor } from "../../styles/global";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Card({ onPress, day, img, total, date, currency }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.cardList}>
      <View style={styles.containerInfo}>
        <Image source={img} style={styles.cardImg} />
        <View style={styles.nameContainer}>
          <Text style={styles.day}>Porosia #{day}</Text>
          <Text style={styles.des}>
            {moment(new Date(date)).format("DD-MM-YYYY")}
          </Text>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.des}>{total} </Text>
            <Text style={styles.des}>{currency}</Text>
          </View>
        </View>
      </View>
      <Ionicons name="ios-arrow-forward" size={24} color={buttonColor} />
    </TouchableOpacity>
  );
}
