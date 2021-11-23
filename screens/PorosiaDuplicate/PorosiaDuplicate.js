//External dependencies
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Alert,
  FlatList,
  ActivityIndicator,
  StatusBar
} from "react-native";
import { Header } from "react-native-elements";
// Internal dependencies
import global, {
  primary,
  header,
  black,
  buttonColor,
} from "../../styles/global";
import styles from "./styles";
import axiosApiInstance from "../../authentification/request/request";
import { BackButton, LargeButton } from "../../components/Button/Button";

export default function PorosiaDuplicate({ navigation, route }) {
  const item = route?.params?.item;
  const id = item?._id; //Id e porosise qe e marrim nga Historiku screen

  const [comment, setComment] = useState("");
  const [data, setData] = useState([]);
  const [products, setProducts] = useState([]);
  const [currency, setCurrency] = useState([]);
  const [market, setMarket] = useState([]);
  const [loading, setLoading] = useState(true);

  const getProducts = async () => {
    const response = await axiosApiInstance.get(
      `/client/reorder/get-reorder-data/${id}`
    );
    setData(response.data);
    setProducts(response.data.products);
    setMarket(response.data);
    setCurrency(response.data.currency);
    setLoading(false);
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getProducts()
        .then((data) => {})
        .catch((err) => {
          Alert.alert("Mesazhi", err.response.data.message, [
            { text: "Në rregull" },
          ]);
          console.log(err);
        });
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={global.container}>
      <StatusBar backgroundColor="transparent" />
      <Header
        containerStyle={{
          backgroundColor: primary,
          borderBottomWidth: 1,
        }}
        placement="center"
        leftComponent={
          <BackButton onPress={() => navigation.navigate("Historiku")} />
        }
        centerComponent={{
          text: "Porosia",
          style: {
            color: header,
            fontSize: 20,
            fontFamily: "Avenire-Regular",
          },
        }}
      />
      {loading?(<View style={global.activityIndicator}>
      <ActivityIndicator size="large" color={buttonColor} />
    </View>):(<ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>Marketi</Text>
          <View style={styles.market}>
            <Text style={styles.marketName}>{market.market}</Text>
          </View>
          <Text style={styles.title}>Produktet</Text>
          <View style={styles.productsList}>
            <FlatList
              data={products}
              keyExtractor={(item, i) => i.toString()}
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }) => {
                return (
                  <View>
                    <View style={styles.itemsContainer}>
                      <View>
                        <Text style={styles.itemName}>{item.name}</Text>
                        <Text style={styles.item}>
                          {item.price} {currency}
                        </Text>
                      </View>
                      <View style={styles.itemContainer}>
                      <View>
                        <Text style={styles.itemName}>Sasia</Text>
                        <Text style={styles.number}>
                        {item.quantity}
                        </Text>
                      </View>
                      </View>
                    </View>
                  </View>
                );
              }}
            />
            <View style={styles.itemsContainer} />
          </View>
          <View style={styles.noteContainer}>
            <Text style={styles.title}>Shto koment</Text>
            <TextInput
              name="comment"
              label="comment"
              style={styles.textInput}
              placeholder="Shtoni koment për postierin"
              placeholderTextColor={black}
              numberOfLines={10}
              multiline
              value={comment}
              onChangeText={(txt) => setComment(txt)}
            />
          </View>
          <View style={styles.konfirmoContainer}>
            <LargeButton
              title="Vazhdo"
              onPress={() =>
                navigation.navigate("CheckoutDuplicate", { comment, id })
              }
            />
          </View>
        </View>
      </ScrollView>)}
      
    </View>
  );
}
