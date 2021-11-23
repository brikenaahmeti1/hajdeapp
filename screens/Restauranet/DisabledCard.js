import React from "react";
import {
  Text,
  View,
  Image,
  ImageBackground,
} from "react-native";
import styles from "./styles";
export default function DisabledCard({opensAt, name, img, currency,transporti }) {
  return (
    <View >
      <ImageBackground
        style={styles.containerCard}
        source={img}
        imageStyle={{ opacity: 0.5,backgroundColor: 'rgba(0,0,0,.9)',borderRadius: 10, }}
      >
        <View style={styles.categorieContainerDisabled}>
          <Text style={styles.categorieNameDisabled}>Hapet në orën {opensAt}</Text>
        </View>
      </ImageBackground>
      <View style={styles.infoContainerDisabled}>
        <View style={styles.row}>
          <Text style={styles.clockInfo}>{name}</Text>
          <View style={styles.infoRow}>
            <View>
              <Image source={require("../../assets/images/motorri.png")} />
            </View>
            <View style={{ paddingLeft: 5 }}>
              <Text style={styles.infoText}>{transporti} {currency}</Text>
            </View>
          </View>
        </View>
        {/* <Text style={styles.infoText}>
          Sushi {"\u2022"} Seafood {"\u2022"} Spaghetti
        </Text> */}
      </View>
    </View>
  );
}
