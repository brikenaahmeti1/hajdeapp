//External dependencies
import React, { useState } from "react";
import { TouchableOpacity, Text, View, Animated } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
// Internal dependencies
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from "accordion-collapse-react-native";
import styles from "./styles";
import { buttonColor } from "../../styles/global";
import axiosApiInstance from "../../authentification/request/request";
import { ActivityIndicator } from "react-native";
import { Alert } from "react-native";

const Item = ({
  id,
  pressHandler,
  street,
  komuna,
  index,
  active,
  title,
  callback,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const removeAddress = async (id) => {
    const response = await axiosApiInstance.delete(
      `client/profile/remove-address/${id}`
    );
    const { data } = response;
    Alert.alert("Mesazhi", data.message, [{ text: "Në rregull" }]);
    callback();
  };

  const setDefaultAddress = async () => {
    const response = await axiosApiInstance.put(
      `client/profile/set-default-address/${id}`
    );
    const { data } = response;
    Alert.alert("Mesazhi", data.message, [{ text: "Në rregull" }]);
    callback();
  };

  const rightSwipe = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0],
    });

    return (
      <RectButton
        onPress={() => removeAddress(id)}
        activeOpacity={0.6}
        // style={{ marginVertical: 10 }}
      >
        <View style={[styles.deleteBox]}>
          <Animated.Text style={{ transform: [{ scale: scale }] }}>
            <MaterialIcons name="delete-forever" size={30} color="black" />
          </Animated.Text>
        </View>
      </RectButton>
    );
  };

  return (
    <View style={{ minHeight: 50 }}>
      <Swipeable renderRightActions={rightSwipe}>
        <Collapse
          onToggle={(isCollapsed) => setIsCollapsed(isCollapsed)}
          style={styles.locationContainer}
        >
          <CollapseHeader>
            <View>
              <View style={styles.friendsContainer}>
                <View style={styles.itemsContainerLocation}>
                  <Text style={styles.subTitle}>{title}</Text>
                  {active && <Text style={styles.default}>(E zgjedhur)</Text>}
                </View>
                {isCollapsed ? (
                  <Ionicons name="ios-arrow-up" size={20} color="black" />
                ) : (
                  <Ionicons name="ios-arrow-down" size={20} color="black" />
                )}
              </View>
            </View>
          </CollapseHeader>
          <CollapseBody>
            <View style={styles.adressesContainer}>
              <TouchableOpacity
                style={{ marginVertical: 10 }}
                onPress={() => setAddress("bla bla")}
              >
                <Text style={[styles.adressesName, { color: buttonColor }]}>
                  Qyteti: <Text style={styles.default}>{komuna}</Text>
                </Text>
                <Text style={[styles.adressesName, { color: buttonColor }]}>
                  Rruga: <Text style={styles.default}>{street}</Text>
                </Text>
              </TouchableOpacity>
              {!active && (
                <Text
                  style={{ color: buttonColor, marginVertical: 10 }}
                  onPress={setDefaultAddress}
                >
                  Zgjedh adresën kryesore
                </Text>
              )}
            </View>
          </CollapseBody>
        </Collapse>
      </Swipeable>
    </View>
  );
};

export default Item;
