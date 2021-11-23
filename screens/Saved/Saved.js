//External dependencies
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  Alert,
  FlatList,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
  Image,
} from "react-native";
import { Header } from "react-native-elements";
// Internal dependencies
import styles from "./styles";
import global, { buttonColor, header, primary } from "../../styles/global";
import { LinkButton } from "../../components/Button/Button";
import axiosApiInstance from "../../authentification/request/request";
import { ActivityIndicator } from "react-native";
// import { StatusBar } from "expo-status-bar";

export default function Saved({ navigation }) {
  const [products, setProducts] = useState([]);
  const [markets, setMarkets] = useState([]);
  const [loading, setLoading] = useState(true);

  const getFavorites = async () => {
    const response = await axiosApiInstance.get(`/favorites/get-favorites`);
    setProducts(response.data.products);
    setMarkets(response.data.markets);
    setLoading(false);
  };
  const onProductRemove = async (preferenceId) => {
    try {
      const response = await axiosApiInstance.put(
        `/favorites/remove-product/${preferenceId}`
      );

      if (response.data.message) {
        setProducts(
          products.filter((item) => item.preferenceId !== preferenceId)
        );
      }
    } catch (err) {
      Alert.alert("Mesazhi", err?.response?.data?.message, [
        { text: "Në rregull" },
      ]);
    }
  };
  const onMarketRemove = async (preferenceId, city) => {
    try {
      const response = await axiosApiInstance.put(
        `/favorites/remove-market?id=${preferenceId}&city=${city}`
      );

      if (response.data.message) {
        setMarkets(
          markets.filter((item) => item.preferenceId !== preferenceId)
        );
      }
    } catch (err) {
      Alert.alert("Mesazhi", err.response?.data?.message, [
        { text: "Në rregull" },
      ]);
    }
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getFavorites()
        .then((data) => {})
        .catch((err) => {
          Alert.alert("Mesazhi", err.response?.data?.message, [
            { text: "Në rregull" },
          ]);
        });
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={global.container}>
      <StatusBar backgroundColor="transparent" translucent/>
      <Header
        containerStyle={{
          backgroundColor: primary,
          borderBottomWidth: 1,
        }}
        placement="center"
        centerComponent={{
          text: "Të ruajtura",
          style: {
            color: header,
            fontSize: 20,
            fontFamily: "Avenire-Regular",
          },
        }}
      />
      {loading ? (
        <View style={global.activityIndicator}>
          <ActivityIndicator size="large" color={buttonColor} />
        </View>
      ) : products.length === 0 && markets.length === 0 ? (
        <View style={global.activityIndicator}>
          <Text style={styles.titleEmpty}>
            Nuk keni asnjë market dhe produkt të zgjedhur
          </Text>
          <Image
            source={require("../../assets/images/Empty_Saved.png")}
            style={global.emptyImage}
          />
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
            // alignItems:"center"
          }}
        >
          <View style={styles.container}>
            {products?.length != 0 && (
              <View style={{ flex: 1 }}>
                <Text style={styles.title}>Produktet</Text>
                <FlatList
                  data={products}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  style={{ flexGrow: 1, paddingLeft: 10 }}
                  keyExtractor={(item, i) => i.toString()}
                  renderItem={({ item, index }) => {
                    return (
                      <View style={styles.containerCard}>
                        <ImageBackground
                          source={{ uri: item.imageURL }}
                          resizeMode="contain"
                          style={styles.cardContiner}
                        >
                          <TouchableOpacity
                            onPress={() => onProductRemove(item.preferenceId)}
                            style={styles.cardImg}
                          >
                            <Image
                              source={require("../../assets/images/Favorites_Full.png")}
                            />
                          </TouchableOpacity>
                        </ImageBackground>
                        <TouchableOpacity
                          style={styles.nameContainer}
                          onPress={() =>
                            navigation.navigate("Produkti", { item })
                          }
                        >
                          <Text
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            style={styles.name}
                          >
                            {item.name}
                          </Text>
                          <View style={styles.list}>
                            <Image
                              source={require("../../assets/images/Money.png")}
                            />
                            <Text style={styles.subName}>
                              {item.price} {item.currency}
                            </Text>
                          </View>
                          <View style={styles.list}>
                            <Image
                              source={require("../../assets/images/Market.png")}
                            />
                            <Text style={styles.subName}>{item.company}</Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    );
                  }}
                />
                {products?.length >= 5 &&
                  (products.length >= 5 && markets.length != 0 ? (
                    <View
                      style={{
                        alignSelf: "center",
                        paddingTop: 15,
                      }}
                    >
                      <LinkButton
                        title="Shiko më shumë"
                        onPress={() => navigation.navigate("SavedProduktet")}
                      />
                    </View>
                  ) : (
                    <View
                      style={{
                        alignSelf: "center",

                        paddingBottom: "80%",
                      }}
                    >
                      <LinkButton
                        title="Shiko më shumë"
                        onPress={() => navigation.navigate("SavedProduktet")}
                      />
                    </View>
                  ))}
              </View>
            )}

            {markets?.length != 0 && (
              <View
                style={{
                  flex: 1,
                  // alignSelf: "center",
                  // justifyContent: "center",
                  // alignItems: "center",
                  // paddingVertical: 60,
                }}
              >
                <Text style={styles.title}>Marketet</Text>
                <FlatList
                  data={markets}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  style={{ flexGrow: 1, paddingLeft: 10 }}
                  keyExtractor={(item, i) => i.toString()}
                  renderItem={({ item, index }) => {
                    const saved = item.preferenceId;
                    return (
                      <View style={styles.containerCardMarket}>
                        <ImageBackground
                          source={{ uri: item.imageURL }}
                          resizeMode="center"
                          style={styles.cardContiner}
                        >
                          <TouchableOpacity
                            onPress={() =>
                              onMarketRemove(item.preferenceId, item.city)
                            }
                            style={styles.cardImg}
                          >
                            <Image
                              source={require("../../assets/images/Favorites_Full.png")}
                            />
                          </TouchableOpacity>
                        </ImageBackground>
                        <TouchableOpacity
                          onPress={() =>
                            navigation.navigate("Kategorite", { item, saved })
                          }
                          style={styles.nameContainer}
                        >
                          <Text style={styles.name}>{item.name}</Text>
                          <View style={styles.list}>
                            <Image
                              source={require("../../assets/images/Time_Recipes.png")}
                            />
                            <Text style={styles.subName}>
                              {item.deliveryTime}
                            </Text>
                          </View>
                          <View style={styles.list}>
                            <Image
                              source={require("../../assets/images/Location.png")}
                            />
                            <Text style={styles.subName}>{item.city}</Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    );
                  }}
                />
                {markets?.length >= 5 &&
                  (markets.length >= 5 && products.length != 0 ? (
                    <View
                      style={{
                        alignSelf: "center",
                      }}
                    >
                      <LinkButton
                        title="Shiko më shumë"
                        onPress={() => navigation.navigate("SavedMarketet")}
                      />
                    </View>
                  ) : (
                    <View
                      style={{
                        alignSelf: "center",
                        paddingTop: 15,
                        paddingBottom: "80%",
                      }}
                    >
                      <LinkButton
                        title="Shiko më shumë"
                        onPress={() => navigation.navigate("SavedMarketet")}
                      />
                    </View>
                  ))}
              </View>
            )}
          </View>
        </ScrollView>
      )}
    </View>
  );
}
