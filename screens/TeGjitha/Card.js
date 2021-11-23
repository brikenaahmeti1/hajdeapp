import React from "react";
import { Text, TouchableOpacity, View, Image } from "react-native";
import styles from "./styles";
export default function Card({ onPress, title, img }) {
  return (
    <TouchableOpacity style={styles.containerCard} onPress={onPress}>
      <Text style={styles.categorieName} numberOfLines={1} ellipsizeMode="tail">{title}</Text>
      <Image source={img} style={styles.img} />
    </TouchableOpacity>
  );
}
