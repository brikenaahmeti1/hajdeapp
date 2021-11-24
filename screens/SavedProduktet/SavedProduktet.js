//External dependencies
import React, { useState, useEffect } from "react";
import {
  View,
  ActivityIndicator,
  FlatList,
  Text,
  Alert,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";
import { Header } from "react-native-elements";
// Internal dependencies
import global, { header, primary, buttonColor } from "../../styles/global";
import styles from "../Saved/styles";
import { BackButton } from "../../components/Button/Button";
import axiosApiInstance from "../../authentification/request/request";
import { StatusBar } from "expo-status-bar";

export default function SavedMarketet({ navigation,route }) {
  // const currency = route?.params?.item.currency;
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [fetchMore, setFetchMore] = useState(true);
  const [hasMoreItems, setHasMoreItems] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      if (!fetchMore) return null;
      const response = await axiosApiInstance.get(
        `favorites/get-favorite-products/${page}`
      );

      setData([...data, ...response.data]);
      setHasMoreItems(response.data.length !== 0);
      setFetchMore(false);
      setPage(page + 1);
      setLoading(false);
    })();
  }, [page, fetchMore]);

  const loadMore = () => {
    if (hasMoreItems) {
      setFetchMore(true);
    }
  };
  const _renderFooter = () => {
    if (hasMoreItems && fetchMore) {
      // return <ActivityIndicator animating size="large" color={buttonColor} />;
    }
    return null;
  };
  const onProductRemove = async (preferenceId) => {
    try {
      const response = await axiosApiInstance.put(
        `/favorites/remove-product/${preferenceId}`
      );
      if (response.data.message) {
        setData(data.filter((item) => item.preferenceId !== preferenceId));
      }
    } catch (err) {
      Alert.alert("Mesazhi", err?.response?.data?.message, [
        { text: "Në rregull" },
      ]);
    }
  };
  return (
    <View style={global.container}>
      <StatusBar backgroundColor="transparent" />
      <Header
        containerStyle={{
          backgroundColor: primary,
          borderBottomWidth: 1,
        }}
        placement="center"
        leftComponent={<BackButton onPress={() => navigation.goBack()} />}
        centerComponent={{
          text: "Produktet",
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
      ) : data.length === 0 ? (
        <View style={global.activityIndicator}>
          <Text style={global.emptyText}>
            Nuk keni asnjë produkt të parapëlqyer
          </Text>
        </View>
      ) : (
        <View style={styles.container2}>
          <FlatList
            data={data}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, i) => i.toString()}
            renderItem={({ item }) => {
              return (
                <View style={styles.containerCardProducts}>
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
                    onPress={() => navigation.navigate("Produkti", { item })}
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
                      <Text style={styles.subName}>{item.price} {item.currency}</Text>
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
            onEndReached={loadMore}
            ListFooterComponent={_renderFooter}
            onEndReachedThreshold={1}
          />
        </View>
      )}
    </View>
  );
}
