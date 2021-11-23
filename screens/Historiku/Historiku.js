//External dependencies
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Platform,
  StatusBar
} from "react-native";
import { Header } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import axiosApiInstance from "../../authentification/request/request";
import RNPickerSelect from "react-native-picker-select";
import { LinkButton } from "../../components/Button/Button";
// Internal dependencies
import styles from "./styles";
import global, { primary, header, buttonColor } from "../../styles/global";
import Card from "./Card"

const items = [
  { label: "Në pritje", value: "PENDING" },
  { label: "Në progres", value: "IN_PROGRESS" },
  { label: "E kompletuar", value: "COMPLETED" },
  { label: "Problem", value: "ISSUE" },
  { label: "Anuluar", value: "CANCELLED" },
];
const pickerStyle = {
  inputIOS: {
    width: "100%",
    color: primary,
    backgroundColor: buttonColor,
    borderRadius: 20,
    paddingHorizontal: 10,
    fontSize: 16,
    paddingVertical: 10,
  },
  inputAndroid: {
    width: "100%",
    color: primary,
    backgroundColor: buttonColor,
    borderRadius: 30,
    paddingHorizontal: 10,
    fontSize: 14,
  },
};
const Historiku = ({ navigation }) => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("PENDING");
  const [fetchMore, setFetchMore] = useState(true);
  const [hasMoreItems, setHasMoreItems] = useState(true);
  const [loading, setLoading] = useState(true);

  const OrdersWithAxios = async () => {
    const response = await axiosApiInstance.get(
      `client/orders/get-orders/${page}/${filter}`
    );
    if (page === 1) {
      setData([...response.data]);
    } else {
      setData([...data, ...response.data]);
    }
    setHasMoreItems(response.data.length !== 0);
    setFetchMore(false);
    setPage(page + 1);
    setLoading(false);
  };

  const callApi = () => {
    if (!fetchMore) return null;
    OrdersWithAxios()
      .then((data) => {})
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setFilter("PENDING");
      callApi();
      setData([]);
    });
    return () => {
      unsubscribe();
    };
  }, [navigation]);

  useEffect(() => {
    callApi();
  }, [fetchMore, filter]);

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

  return (
    <View style={global.container}>
      <StatusBar backgroundColor="transparent" />
      <Header
        containerStyle={{
          backgroundColor: primary,
          borderBottomWidth: 1,
        }}
        placement="center"
        centerComponent={{
          text: "Historiku",
          style: {
            color: header,
            fontSize: 20,
            fontFamily: "Avenire-Regular",
          },
        }}
      />
      <View style={styles.picker}>
        <RNPickerSelect
          items={items}
          useNativeAndroidPickerStyle={false}
          onValueChange={(value) => {
            setPage(1);
            setData([]);
            setFetchMore(true);
            setHasMoreItems(true);
            setFilter(value);
          }}
          placeholder={{}}
          InputAccessoryView={() => null}
          value={filter}
          style={pickerStyle}
          Icon={() => {
            return (
              <View
                style={{
                  ...Platform.select({
                    ios: {
                      paddingRight: 15,
                      paddingTop: 10,
                    },
                    android: {
                      paddingRight: 15,
                      paddingTop: 13,
                    },
                  }),
                }}
              >
                <Ionicons name="ios-arrow-down" size={20} color={primary} />
              </View>
            );
          }}
          activeItemTextStyle={{ fontSize: 10, fontWeight: "bold" }}
        />
      </View>
      {loading ? (
        <View style={global.activityIndicator}>
          <ActivityIndicator size="large" color={buttonColor} />
        </View>
      ) : data?.length === 0 ? (
        <View style={global.activityIndicator}>
          <Text style={global.emptyText}>Për momentin nuk ka porosi</Text>
        </View>
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          style={{ width: "100%" }}
          data={data}
          keyExtractor={(item, i) => i.toString()}
          renderItem={({ item }) => {
            return (
              <View style={styles.containerCard}>
                <Card
                  img={require("../../assets/images/Shopping_List_Homepage.png")}
                  day={item.orderNumber}
                  date={item.orderDate}
                  total={item.total}
                  currency={item.currency}
                  onPress={() =>
                    navigation.navigate("ShoppingDetails", {
                      item,
                    })
                  }
                />
                {filter === "COMPLETED" ? (
                  <View style={styles.buttonContainer}>
                    <LinkButton
                      title="Hajde prapë"
                      onPress={() =>
                        navigation.navigate("PorosiaDuplicate", { item })
                      }
                    />
                  </View>
                ) : null}
              </View>
            );
          }}
          onEndReached={loadMore}
          ListFooterComponent={_renderFooter}
          onEndReachedThreshold={1}
        />
      )}
    </View>
  );
};

export default Historiku;
