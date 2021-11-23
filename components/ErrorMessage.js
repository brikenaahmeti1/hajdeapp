import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ErrorMessage = ({ errorValue }) => (
  <View style={styles.container}>
    <Text style={styles.errorText}>{errorValue}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginTop: -10,
    marginBottom: 5,
  },
  errorText: {
    color: "#800000",
    textAlign: "center",
  },
});

export default ErrorMessage;
