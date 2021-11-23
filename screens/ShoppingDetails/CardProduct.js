import React from "react";
import { Text, View } from "react-native";
import styles from "./styles";
export default function Card({ items, currency }) {
  return (
    <View>
      <Text style={styles.ordersTitle}>Lista e produkteve</Text>
      <View style={styles.titleContainer}>
        <Text style={styles.listTitle}>Produktet</Text>
        <Text style={styles.listTitle}>Sasia</Text>
      </View>
      <View style={styles.listContainer}>
        {items.map((item, i) => (
          <View key={i} style={styles.list}>
            <View style={styles.listProductContainer}>
              <Text style={styles.listProduct}>{item.name}</Text>
              <Text style={styles.price}>
                {item.price} {currency}
              </Text>
            </View>
            <Text style={styles.listProduct}>{item.quantity}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}
