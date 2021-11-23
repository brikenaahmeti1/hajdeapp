//External dependencies
import React, { useContext, useEffect, useState } from "react";
import { View, Alert, FlatList, ActivityIndicator, Text } from "react-native";
import { Header } from "react-native-elements";
// Internal dependencies
import global, { primary, header, buttonColor } from "../../styles/global";
import Searchbar from "../../components/Searchbar/Searchbar";
import Card from "./Card";
import { BackButton } from "../../components/Button/Button";
import axiosApiInstance from "../../authentification/request/request";
import { MarketContext } from "../../MarketContext";

export default function ChooseDefaultMArket({ navigation }) {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [fetchMore, setFetchMore] = useState(true);
  const [hasMoreItems, setHasMoreItems] = useState(true);
  const [searchText, setSearchText] = useState("");
  const { defaultMarket, setDefaultMarket } = useContext(MarketContext)

  useEffect(() => {
    (async () => {
      try {
        if (!fetchMore || searchText) return null;
        const response = await axiosApiInstance.get(`/companies/list/${page}`);
        if (response.data.length !== 0) setData(response.data);
        setHasMoreItems(response.data.length !== 0 ? true : false);
        setFetchMore(false);
        setPage(page + 1);
      } catch (err) {
        Alert.alert("Mesazhi", err?.response?.data?.message);
      }
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
      return <ActivityIndicator animating size="large" color={buttonColor} />
    }
    return null;
  };

  const onSubmitSearched = async (text) => {
    setSearchText(text);
    if (text) {
      const response = await axiosApiInstance.get(
        `/companies/search?name=${text}`
      );
      setData(response.data);
      setFetchMore(true);
    } else {
      setData([]);
      setPage(1);
      setFetchMore(true);
    }
  };

  const chooseDefaultMarket = async (id, name) => {
    try {
      const response = await axiosApiInstance.put(`client/profile/set-default-market/${id}`)
      const { data } = response
      setDefaultMarket(name)
      Alert.alert("Mesazhi", data.message)
    } catch (e) {
      const { data } = e.response
      Alert.alert("Mesazhi", data.message)
    }
    callback()
  }

  return (
    <View style={global.container}>
      <Header
        containerStyle={{
          backgroundColor: primary,
        }}
        placement="center"
        leftComponent={
          <BackButton onPress={() => navigation.navigate("Shporta")} />
        }
        centerComponent={{
          text: "Marketet",
          style: {
            color: header,
            fontSize: 20,
            fontFamily: "Avenire-Bold",
          },
        }}
      />
      <Searchbar
        onSubmitEditing={(text) => {
          onSubmitSearched(text);
        }}
      />

      <FlatList
        keyExtractor={(item, i) => i.toString()}
        data={data}
        renderItem={({ item, i }) => {
          if (item.company === defaultMarket) {
            return (<Card
              img={{ uri: item.imageURL }}
              title={item.company}
              id={item._id}
              opacity={0.5}
            />)
          } else {
            return (
              <Card
                img={{ uri: item.imageURL }}
                title={item.company}
                defaultMarket={defaultMarket}
                id={item._id}
                opacity={1}
                onPress={() => {
                  chooseDefaultMarket(item._id, item.company),
                    navigation.navigate("Profili")
                }
                }
              />
            );
          }
        }}
        onEndReached={loadMore}
        ListFooterComponent={_renderFooter}
        onEndReachedThreshold={1}
      />
    </View>
  );
}
