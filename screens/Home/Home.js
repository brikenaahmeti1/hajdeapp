//External dependencies
import React, { useState } from "react";
import { View, Image, BackHandler,StatusBar } from "react-native";
// Internal dependencies
import styles from "./styles";
import global from "../../styles/global";
import { LargeButton } from "../../components/Button/Button";
import { useBackHandler } from "@react-native-community/hooks";

export default function Home({ navigation }) {
  useBackHandler(() => {
    BackHandler.exitApp();
  });

  return (
    <View style={global.container}>
      <StatusBar backgroundColor="transparent" />
      <View style={styles.container}>
        <Image
          source={require("../../assets/images/Logo_Hajde.png")}
          style={styles.logo}
        />
        <LargeButton
          title="Kyçu"
          onPress={() => navigation.navigate("Login")}
        />
        <View style={styles.buttonContainer}>
          <LargeButton
            title="Regjistrohu"
            onPress={() => navigation.navigate("Register")}
          />
        </View>
      </View>
    </View>
  );
}
