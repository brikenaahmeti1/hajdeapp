import React from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import styles from "./styles";
export default function Card({ onPress, title, img, price, currency }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.containerInfo}>
        <View style={{borderRightWidth:2,borderColor:"#00cbbb",paddingRight:5,justifyContent:"center",alignItems:"center"}}>
        <Image source={img} style={{ height: 60, width: 60,resizeMode:"contain"}} />
        </View>
        <View style={styles.nameContainer}>
          <Text numberOfLines={2}  style={styles.name}>
            {title}
          </Text>
          <Text style={styles.price}>
            {price} {currency}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
