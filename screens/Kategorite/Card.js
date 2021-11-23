import React from "react";
import { Text, TouchableOpacity, View, Image } from "react-native";
import styles from "./styles";
export default function Card({ onPress, title, img }) {
  return (
    <TouchableOpacity style={styles.containerCard} onPress={onPress}>
      <Image source={img} style={styles.img} />
      <View style={styles.categorieContainer}>
        <Text style={styles.categorieName}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}
