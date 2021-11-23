import React from "react";
import { View, Image, Text, Platform, StatusBar, Linking } from "react-native";
import { LargeButton } from "../../components/Button/Button";
import styles from "./styles";
// import * as Linking from "expo-linking";
// import { StatusBar } from "expo-status-bar";

export default function Version(props) {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="transparent" translucent/>
      <Image
        source={require("../../assets/images/Version.png")}
        style={styles.image}
      />
      <Text style={styles.title}>Versioni i ri i Hajde është gati</Text>
      <Text style={styles.subTitle}>
        Klikoni butonin "Përditëso" në mënyrë që të shkarkoni versionin e fundit
      </Text>
      <View style={styles.button}>
        <LargeButton title="Përditëso" onPress={() => onAppUpdate()} />
      </View>
    </View>
  );
}
const onAppUpdate = () => {
  const appUrl = Platform.OS
    ? "https://apps.apple.com/us/app/hajde-app/id1553487255"
    : "https://play.google.com/store/apps/details?id=com.hajde.client";
  Linking.openURL(appUrl).catch((err) =>
    console.error("Couldn't load page", err)
  );
};
