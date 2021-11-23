//External dependencies
import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Badge } from "react-native-elements";
// Internal dependencies
import styles from "./styles";
import { Circle } from "../../components/Button/Button";
import axiosApiInstance from "../../authentification/request/request";
import HomepageSearch from "./HomepageSearch";
import Messaging from "../Messaging";
import { buttonColor } from "../../styles/global";

export default function Homepage({ navigation }) {
  const [notifications, setNotifications] = useState();

  const getNotifications = async () => {
    try{
      const response = await axiosApiInstance.get(`/notifications/unread-count`);
    setNotifications(response.data);
    }
    catch(err){
      navigation.navigate("Login")
    }
   
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getNotifications();
    });
    return unsubscribe;
  }, [navigation]);
  
  const hasNotifications = async () => {
    // try {
    //   const hasNotificationsPermissions =
    //     await Messaging.requestUserPermission();
    //   if (hasNotificationsPermissions) {
    //     fcmMessaging = await Messaging.saveFcmTokenToDb();
    //     fcmRefresh = await Messaging.onRefreshToken();
    //   }
    // } catch (err) {
    //   console.log(err, "error:::::");
    // }
  };
  useEffect(() => {
    hasNotifications();
  }, []);

  
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <StatusBar backgroundColor={buttonColor} />
        {notifications?.count === 0 ? (
          <TouchableOpacity
            onPress={() => navigation.navigate("Notifications")}
            style={{ position: "absolute", right: 40, top: 60 }}
          >
            <MaterialIcons name="notifications" size={30} color="white" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => navigation.navigate("Notifications")}
            style={{ position: "absolute", right: 40, top: 60 }}
          >
            <View style={{ position: "absolute", bottom: 25, left: 20 }}>
              <Badge status="error" value={notifications?.count} />
            </View>
            <MaterialIcons name="notifications" size={30} color="white" />
          </TouchableOpacity>
        )}
        <View style={styles.logo}>
          <Image source={require("../../assets/Logo_Homepage.png")} />
        </View>
        <View style={styles.searchContainer}>
          <HomepageSearch />
        </View>
        <View style={styles.buttonsContainer}>
          <Circle
            img={require("../../assets/images/marketet.png")}
            title="Marketet"
            onPress={() => navigation.navigate("Marketet")}
          />

          <View style={styles.buttonButtos}>
            <View style={styles.shopping}>
              <Circle
                style={styles.image}
                img={require("../../assets/images/Shopping_List_Homepage.png")}
                title="Shporta"
                onPress={() => navigation.navigate("Shporta")}
              />
            </View>
            <View style={styles.recepies}>
              <Circle
                img={require("../../assets/images/restoran.png")}
                title="Restorantet"
                onPress={() => navigation.navigate("Restauranet")}
              />
            </View>
          </View>
          <View style={styles.recepies}>
            <Circle
              img={require("../../assets/images/Recipes_Homepage.png")}
              title="Recetat"
              onPress={() => navigation.navigate("Recetat")}
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
