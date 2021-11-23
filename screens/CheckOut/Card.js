import React from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import styles from "./styles";
export default function Card({ onPress, title, img, price, currency }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.containerInfo}>
        <Image source={img} style={styles.cardImg} />
        <View style={styles.nameContainer}>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.name}>
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
