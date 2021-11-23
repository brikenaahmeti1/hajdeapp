import React from "react";
import { Text, TouchableOpacity, View, Image } from "react-native";
import styles from "./styles";
export default function Card({
  onPress,
  title,
  img,
  defaultMarket,
  id,
  deliveryTime,
}) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.containerCard}>
        <View style={styles.nameContainer}>
          <Image  source={img} style={styles.cardImg} />
        </View>
        <View style={styles.bottomCard}>
          <View>
            <Text style={styles.text}>{title}</Text>
          </View>
          <View>
            <Text style={styles.text}>{deliveryTime}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
