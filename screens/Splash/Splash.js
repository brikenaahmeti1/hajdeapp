import React, { useEffect } from "react";
import { View, Image, StatusBar } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./styles";
// import { StatusBar } from "expo-status-bar";

export default function Splash(props) {
  useEffect(() => {
    (setTimeout(async () => {
      let token = await AsyncStorage.getItem("@TOKEN");
      console.log(token)
      if (token) {
        props.navigation.replace("Homepage");
      } else props.navigation.navigate("Home");
    }, 2000))
  });

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="transparent" translucent/>
      <Image
        source={require("../../assets/images/Buffering_Hajde.gif")}
        style={styles.image}
      />
    </View>
  );
}
