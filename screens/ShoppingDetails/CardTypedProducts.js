import React from "react";
import { Text, View } from "react-native";
import styles from "./styles";
export default function Card({ items, currency }) {
  return (
    <View style={styles.listContainer}>
      {items.map((item, i) => (
        <View key={i} style={styles.list}>
          <View style={[styles.listProductContainer],{paddingVertical:5}}>
            <Text style={styles.listProduct}>{item.name}</Text>
          </View>
          <Text style={styles.listProduct}>{item.quantity}</Text>
        </View>
      ))}
    </View>
  );
}
