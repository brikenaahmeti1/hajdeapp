import React from "react";
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  ImageBackground,
} from "react-native";
import styles from "./styles";
export default function Card({ onPress, title, img, hour, minutes, currency,transporti }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <ImageBackground
        style={styles.containerCard}
        imageStyle={{ borderRadius: 8 }}
        source={img}
      >
        <View style={styles.categorieContainer}>
          <Text style={styles.categorieName}>{title}</Text>
        </View>
      </ImageBackground>
      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <View>
            <Image source={require("../../assets/images/ora.png")} />
          </View>
          <View style={styles.leftInfo}>
            <Text style={styles.infoText}>Porosit për në orën</Text>
            <Text style={styles.clockInfo}>{hour + ":" + minutes}</Text>
          </View>
        </View>
        <View style={styles.infoRow}>
          <View>
            <Image source={require("../../assets/images/motorri.png")} />
          </View>
          <View style={{ paddingLeft: 5 }}>
            <Text style={styles.infoText}>{transporti} {currency}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
