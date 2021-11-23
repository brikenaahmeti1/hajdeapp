//External dependencies
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Platform,
  StatusBar
} from "react-native";
import { Header } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import axiosApiInstance from "../../authentification/request/request";
// Internal dependencies
import styles from "./styles";
import global, {
  primary,
  header,
  buttonColor,
  textColor,
} from "../../styles/global";
import { TrackButton, BackButton } from "../../components/Button/Button";
import RNPickerSelect from "react-native-picker-select";

const items = [
  { label: "Në pritje", value: "PENDING" },
  { label: "Në progres", value: "IN_PROGRESS" },
  { label: "E kompletuar", value: "COMPLETED" },
  { label: "E refuzuar", value: "REJECTED" },
  { label: "Problem", value: "ISSUE" },
  { label: "E anuluar", value: "CANCELLED" },
];
const pickerStyle = {
  inputIOS: {
    width: "100%",
    color: primary,
    backgroundColor: buttonColor,
    borderRadius: 20,
    paddingHorizontal: 10,
    fontSize: 14,
    paddingVertical: 10,
  },
  inputAndroid: {
    width: "100%",
    color: primary,
    backgroundColor: buttonColor,
    borderRadius: 14,
    paddingHorizontal: 10,
    fontSize: 14,
  },
};
const Porosite = ({ navigation }) => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("PENDING");
  const [fetchMore, setFetchMore] = useState(true);
  const [hasMoreItems, setHasMoreItems] = useState(true);
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
      setData([]);
      callApi();
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
      return <ActivityIndicator animating size="large" color={buttonColor} />;
    }
    return null;
  };

  const itemRender = ({ item }) => (
    <View style={{ paddingTop: 10 }}>
      <View style={styles.cardContainer}>
        <View style={styles.content}>
          <View>
            <View style={styles.cardText}>
              <Text style={styles.name}>Data e porosisë</Text>
              <Text style={styles.date}>{item.orderDate}</Text>
            </View>
            <View style={styles.cardText}>
              <View style={{ paddingTop: 10 }}>
                <Text style={styles.name}>Emri i furnitorit</Text>
                <Text style={styles.date}>{item.supplier.name}</Text>
              </View>
            </View>
            <View style={styles.cardText}>
              <View style={{ paddingTop: 10 }}>
                <Text style={styles.name}>Numri i porosisë</Text>
                <Text style={styles.date}>{item.orderNumber}</Text>
              </View>
            </View>
          </View>
        </View>
        <TrackButton
          title="Shiko"
          onPress={() =>
            navigation.navigate("ShoppingDetails", {
              item,
            })
          }
        />
      </View>
    </View>
  );

  return (
    <View style={global.container}>
      <StatusBar backgroundColor="transparent" />
      <View style={styles.container}>
        <Header
          containerStyle={{
            backgroundColor: primary,
            borderBottomWidth: 1,
          }}
          placement="center"
          leftComponent={
            <BackButton onPress={() => navigation.navigate("Shporta")} />
          }
          centerComponent={{
            text: "Porositë",
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
                        paddingTop: 5,
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
        <FlatList
          data={data}
          keyExtractor={(item, i) => i.toString()}
          renderItem={itemRender}
          onEndReached={loadMore}
          ListFooterComponent={_renderFooter}
          onEndReachedThreshold={1}
        />
      </View>
    </View>
  );
};

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30,
  },
  inputAndroid: {
    width: 170,
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "purple",
    borderRadius: 8,
    color: textColor,
    paddingRight: 30,
  },
});
export default Porosite;
