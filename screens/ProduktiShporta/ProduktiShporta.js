//External dependencies
import React, { useState, useEffect } from "react";
import { View, Text, Image, Alert } from "react-native";
// Internal dependencies
import styles from "./styles";
import {
  BackButton,
  DecrementButton,
  LargeButton,
  QuickButton,
  StatusBar
} from "../../components/Button/Button";
import axiosApiInstance from "../../authentification/request/request";

export default function ProduktiShporta({ navigation, route }) {
  const item = route?.params?.item;
  const id = item?._id;
  const [num, setNum] = useState(0);

  const [data, setData] = useState({});
  const OrdersWithAxios = async () => {
    const response = await axiosApiInstance.get(
      `/products/get-product-info/${item._id}`
    );
    setData(response.data);
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      OrdersWithAxios()
        .then((data) => {})
        .catch((err) => {
          Alert.alert("Mesazhi", err?.response?.data?.message);
          console.log(err);
        });
    });
    return unsubscribe;
  }, [navigation]);

  const incNum = () => {
    setNum(num + 1);
  };

  const decNum = () => {
    if (num > 0) {
      setNum(num - 1);
    } else {
      setNum(0);
    }
  };

  const onSubmit = async () => {
    try {
      if (num === 0) {
        Alert.alert("Mesazhi", "Ju lutem zgjedhni sasinë", [
          { text: "Në rregull" },
        ]);
      } else {
        const response = await axiosApiInstance.post(`/basket/add-to-basket`, {
          productId: id,
          quantity: num,
        });
        Alert.alert("Mesazhi", response?.data?.message, [
          {
            text: "Në rregull",
          },
        ]);
      }
    } catch (err) {
      Alert.alert("Mesazhi", err.response?.data?.message, [
        { text: "Në rregull" },
      ]);
    }
  };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="transparent" />
      <View style={styles.productContainer}>
        <View style={styles.backButton}>
          <BackButton onPress={() => navigation.navigate("ShtoProdukt")} />
        </View>
        <View style={styles.nameContainer}>
          <Image style={styles.img} source={{ uri: item.imageURL }} />
          <Text style={styles.name}>{data.name}</Text>
        </View>
      </View>
      <View style={styles.descriptionContainer}>
        <View style={styles.desContainer}>
          <Text style={styles.desTitle}>Përshkrimi</Text>
          <Text style={styles.des}>{data.description}</Text>
        </View>
        <View style={styles.unitContainer}>
          <Text style={styles.desTitle}>Njësia</Text>
          <Text style={styles.des}>{data.unit}</Text>
        </View>
        <View style={styles.unitContainer}>
          <Text style={styles.desTitle}>Çmimi</Text>
          <Text style={styles.des}>{data.price}</Text>
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.itemContainer}>
          <QuickButton onPress={incNum} />
          <Text style={styles.number}>{num}</Text>
          <DecrementButton onPress={decNum} />
        </View>
        <LargeButton title="Shto në shportë" onPress={onSubmit} />
      </View>
    </View>
  );
}
