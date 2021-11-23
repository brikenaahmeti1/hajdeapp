//External dependencies
import React, { useState, useEffect } from "react";
import { TouchableOpacity, Text, View, Animated } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { MaterialIcons } from "@expo/vector-icons";
import { RectButton } from "react-native-gesture-handler";
// Internal dependencies
import styles from "./styles";
import { DecrementButton, QuickButton } from "../Button/Button";

const Product = ({ pressHandler, item, onAction, index }) => {
  const [num, setNum] = useState(1);

  const rightSwipe = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0],
    });
    return (
      <View style={{ minHeight: 40, justifyContent: "center" }}>
        <RectButton
         onPress={() => pressHandler(item.key)}
          activeOpacity={10}
          style={{ marginVertical: 10 }}
        >
          <View style={styles.deleteBox}>
            <Animated.Text style={{ transform: [{ scale: scale }] }}>
              <MaterialIcons name="delete-forever" size={30} color="black" />
            </Animated.Text>
          </View>
        </RectButton>
      </View>
    );
  };

  const incNum = () => {
    setNum(num + 1);
  };
  const decNum = () => {
    if (num > 1) {
      setNum(num - 1);
    } else {
      setNum(1);
    }
  };

  useEffect(() => {
    onAction(num, index);
  }, [num]);

  return (
    <View style={{ minHeight: 40, justifyContent: "center" }}>
      <Swipeable renderRightActions={rightSwipe} renderLeftActions={false}>
        <View style={styles.itemContainer}>
          <Text style={styles.item}>{item.text}</Text>
          <View style={styles.buttonsContainer}>
            <DecrementButton onPress={decNum} />
            <Text style={styles.number}>{num}</Text>
            <QuickButton onPress={incNum} />
          </View>
        </View>
      </Swipeable>
    </View>
  );
};

export default Product;
