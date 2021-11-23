import React from "react";
import { Text, View } from "react-native";
import styles from "./styles";
import global, { grayColor } from "../../styles/global";

export default function UserCard({
  name,
  phone,
  lastName,
  street,
  city,
  country,
}) {
  return (
    <View style={styles.ordersContainer}>
      <Text style={styles.ordersTitle}>Pranuesi i porosisë</Text>
      <View
        style={[
          styles.userList,
          {
            borderBottomColor: grayColor,
            borderBottomWidth: 1,
            paddingVertical: 5,
          },
        ]}
      >
        <Text style={styles.description}>Emri dhe mbiemri</Text>
        <Text style={styles.descriptionName}>
          {name} {lastName}
        </Text>
      </View>
      <View
        style={[
          styles.userList,
          {
            borderBottomColor: grayColor,
            borderBottomWidth: 1,
            marginVertical: 5,
          },
        ]}
      >
        <Text style={styles.description}>Numri i telefonit</Text>
        <Text style={styles.descriptionName}>{phone}</Text>
      </View>
      <View
        style={[
          styles.userList,
          {
            borderBottomColor: grayColor,
            borderBottomWidth: 1,
            marginVertical: 5,
          },
        ]}
      >
        <Text style={styles.description}>Adresa</Text>
        <Text style={styles.descriptionName}>
          {street}, {city}, {country}
        </Text>
      </View>
    </View>
  );
}
