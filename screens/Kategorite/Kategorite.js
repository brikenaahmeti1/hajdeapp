//External dependencies
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  StatusBar,
  ImageBackground
} from "react-native";
import Searchbar from "../../components/Searchbar/Searchbar";
import { Header } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";
// Internal dependencies
import styles from "./styles";
import global, { buttonColor } from "../../styles/global";
import Card from "./Card";
import { BackButton } from "../../components/Button/Button";
import axiosApiInstance from "../../authentification/request/request";

export default function Kategorite({ navigation, route }) {
  const item = route?.params?.item;
  let marketID = route?.params?.marketID;
  const isSaved = route?.params?.saved;
  const city = route?.params?.city;

  const [saved, setSaved] = useState(isSaved);
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [fetchMore, setFetchMore] = useState(true);
  const [hasMoreItems, setHasMoreItems] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      if (!fetchMore || searchText) return null;
      const response = await axiosApiInstance.get(
        `/product-categories/list-company-categories?name=${searchText}&page=${page}&marketId=${marketID}`
      );
      setData([...data, ...response.data]);
      setHasMoreItems(response.data.length !== 0);
      setFetchMore(false);
      setPage(page + 1);
      setLoading(false);
    })();
  }, [page, fetchMore]);

  const loadMore = () => {
    if (hasMoreItems && !searchText) {
      setFetchMore(true);
    }
  };

  const _renderFooter = () => {
    if (searchText) return null;
    if (hasMoreItems && fetchMore) {
      return <ActivityIndicator animating size="large" color={buttonColor} />;
    }
    return null;
  };
  const onSubmitSearched = async (text) => {
    if (text) {
      const response = await axiosApiInstance.get(
        `/product-categories/list-company-categories?name=${text}&marketId=${marketID}`
      );
      setData([...response.data]);
      setFetchMore(true);
    } else {
      setData([]);
      setPage(1);
      setFetchMore(true);
    }
  };
  useEffect(() => {
    onSubmitSearched(searchText);
  }, [searchText]);

  const Kategorite = ({ item }) => (
    <Card
      title={item.name}
      img={{ uri: item.imageURL }}
      onPress={() => navigation.navigate("Nenkategorite", { item, marketID })} ///e kom hek marketID
    />
  );
  const onSave = async () => {
    try {
      const response = await axiosApiInstance.post(
        `/favorites/save-market?id=${item._id}&city=${city}`
      );
      if (response.data.message === "Preferenca u ruajt me sukses") {
        setSaved(true);
      }

      Alert.alert("Mesazhi", response?.data?.message, [
        {
          text: "Në rregull",
        },
      ]);
    } catch (err) {
      Alert.alert("Mesazhi", err?.response?.data?.message, [
        { text: "Në rregull" },
      ]);
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <StatusBar backgroundColor="transparent" />
      <Header
        containerStyle={{
          backgroundColor: "#D8D8D8",
          borderBottomColor: "transparent",
        }}
        placement="center"
        leftComponent={<BackButton onPress={() => navigation.goBack()} />}
        rightComponent={
          <View>
            {saved ? (
              <TouchableOpacity disabled={true}>
                <AntDesign
                  name="star"
                  size={26}
                  color={buttonColor}
                  style={{ paddingRight: 10 }}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => onSave()}>
                <AntDesign
                  name="staro"
                  size={26}
                  color={buttonColor}
                  style={{ paddingRight: 10 }}
                />
              </TouchableOpacity>
            )}
          </View>
        }
      />
      <View style={styles.marketContainer}>
        <ImageBackground style={styles.imgMarket} source={{ uri: item?.imageURL }} />
      </View>
      <View style={styles.container}>
        <View
          style={{
            width: "100%",
            borderBottomWidth: 1,
            borderBottomColor: buttonColor,
            marginBottom: 15,
          }}
        >
          <Searchbar
            containerStyle={styles.searchBarcontainer}
            inputContainerStyle={styles.input}
            onSubmitEditing={(text) => setSearchText(text)}
          />
        </View>
        {loading ? (
          <View style={global.activityIndicator}>
            <ActivityIndicator size="large" color={buttonColor} />
          </View>
        ) : data.length === 0 ? (
          <View style={global.activityIndicator}>
            <Text style={global.emptyText}>Për momentin nuk ka kategori</Text>
          </View>
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            style={{ width: "100%" }}
            data={data}
            keyExtractor={(item, i) => i.toString()}
            renderItem={Kategorite}
            onEndReached={loadMore}
            ListFooterComponent={_renderFooter}
            onEndReachedThreshold={1}
          />
        )}
      </View>
    </View>
  );
}
