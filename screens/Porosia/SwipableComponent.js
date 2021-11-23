//External dependencies
import React,{useRef} from "react";
import { View, Text, Animated, } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { MaterialIcons } from "@expo/vector-icons";
import { RectButton } from "react-native-gesture-handler";

// Internal dependencies
import styles from "./styles";
import { DecrementButton, QuickButton } from "../../components/Button/Button";

export default function SwipableComponent({
  id,
  name,
  price,
  quantity,
  navigation,
  currency,
  removeProduct,
  incNum,
  decNum,
  index,
  manual,
  customId
}) {
  const swipableRef = useRef(null);
  const rightSwipe = (progress, dragX, Id) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0],
    });
    return (
      <View style={{ minHeight: 30, justifyContent: "center" }}>
        <RectButton
          onPress={async () =>{ 
            swipableRef.current.close();
            const removedItem = await removeProduct(customId ? id.split('_')[0] : name);
          }}
          
          activeOpacity={10}
          style={{ marginVertical: 10 }}
        >
          <View style={[styles.deleteBox]}>
            <Animated.Text style={{ transform: [{ scale: scale }] }}>
              <MaterialIcons name="delete-forever" size={30} color="black" />
            </Animated.Text>
          </View>
        </RectButton>
      </View>
    );
  };

  return (
    <View style={{ minHeight: 30 }}>
      <Swipeable
      ref={swipableRef}
       key={id}
        renderRightActions={(progress, dragX) =>
          rightSwipe(progress, dragX, manual ? name : id)
        }
        renderLeftActions={false}
        id={id}
      >
        <View style={styles.itemsContainer}>

          {
            (price !== null && price !== undefined) ?
              <View style={styles.nameContainer}>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={styles.itemName}>
                  {name}</Text>

                <Text style={styles.item}>
                  {price} {currency}
                </Text>
              </View>
              :
            <View style={styles.nameContainer}>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={styles.itemManual}>
                {name}</Text>
            </View>
          }

          <View style={styles.itemContainer}>
            {manual ? (
              <>
                <QuickButton onPress={() => incNum(index, name, true)} />
                <Text style={styles.number}>{quantity}</Text>
                <DecrementButton onPress={() => decNum(index, name, true)} />
              </>
            ) : (
              <>
                <QuickButton onPress={() => incNum(index, id, false)} />
                <Text style={styles.number}>{quantity}</Text>
                <DecrementButton onPress={() => decNum(index, id, false)} />
              </>
            )}
          </View>
        </View>
      </Swipeable>
    </View>
  );
}
