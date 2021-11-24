//External dependencies
import React, { useContext, useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Header } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import { CommonActions } from "@react-navigation/native";
// Internal dependencies
import global, { buttonColor, grayColor } from "../../styles/global";
import styles from "./styles";
import { TrackButton } from "../../components/Button/Button";
import axiosApiInstance from "../../authentification/request/request";
import { StatusBar } from "expo-status-bar";

export default function Profili({ navigation }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sender, setSender] = useState(0);

  const OrdersWithAxios = async () => {
    const response = await axiosApiInstance.get(
      `/client/profile/get-profile-info`
    );
    setData(response.data);
    setLoading(false);
  };
  const date = new Date(data.createdAt);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      OrdersWithAxios()
        .then((data) => {})
        .catch((err) => {
          Alert.alert("Mesazhi", err.response.data.message, [
            { text: "Në rregull" },
          ]);
        });
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={global.container}>
      <StatusBar backgroundColor="transparent"/>
      <Header
        containerStyle={{
          backgroundColor: "transparent",
          borderBottomColor: "transparent",
          height: 50,
        }}
        placement="center"
      />
      {loading ? (
        <View style={global.activityIndicator}>
          <ActivityIndicator size="large" color={buttonColor} />
        </View>
      ) : (
        <ScrollView contentContainerStyle={{ paddingVertical: 20 }}>
          <View style={styles.topContainer}>
            <Image
              source={require("../../assets/images/Profile.png")}
              style={styles.image}
            />
          </View>
          <View style={styles.bottomContainer}>
            <View
              style={[
                styles.list,
                {
                  borderBottomColor: grayColor,
                  borderBottomWidth: 1,
                  paddingVertical: 5,
                },
              ]}
            >
              <Text style={styles.description}>Emri dhe Mbiemri</Text>
              <Text style={styles.descriptionName}>{data.fullName}</Text>
            </View>
            <View
              style={[
                styles.list,
                {
                  borderBottomColor: grayColor,
                  borderBottomWidth: 1,
                  marginVertical: 5,
                },
              ]}
            >
              <Text style={styles.description}>Numri i telefonit</Text>
              <Text style={styles.descriptionName}>{data.phone}</Text>
            </View>
            <View
              style={[
                styles.list,
                {
                  borderBottomColor: grayColor,
                  borderBottomWidth: 1,
                  marginVertical: 5,
                },
              ]}
            >
              <Text style={styles.description}>Data e regjistrimit</Text>
              <Text style={styles.descriptionName}>
                {date.toLocaleDateString()}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={[styles.bottomContainer, styles.marketContainer]}
            onPress={() => navigation.navigate("Adresat", { paramKey:sender })}
          >
            <Text style={styles.description}>Adresat e ruajtura</Text>

            <Ionicons name="ios-arrow-forward" size={24} color="black" />
          </TouchableOpacity>
        </ScrollView>
      )}
      <View style={styles.logout}>
        <TrackButton
          title={"Dil"}
          onPress={async () => {
            await AsyncStorage.multiRemove(["@TOKEN", "@REFRESH_TOKEN"]);
            navigation.dispatch(
              CommonActions.reset({
                index: 1,
                routes: [
                  { name: "Homepage" },
                  {
                    name: "Profili",
                  },
                ],
              })
            );
            navigation.navigate("Home");
          }}
        />
      </View>
    </View>
  );
}
