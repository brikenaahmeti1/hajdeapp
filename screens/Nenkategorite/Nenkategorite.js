//External dependencies
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  StatusBar,
  Image
} from "react-native";
import Searchbar from "../../components/Searchbar/Searchbar";
import { Header } from "react-native-elements";
// Internal dependencies
import styles from "./styles";
import global, {
  buttonColor,
  primary,
  header,
} from "../../styles/global";
import Card from "./Card";
import {
  BackButton,
  DecrementButton,
  QuickButton,
  SolidButton,
} from "../../components/Button/Button";
import axiosApiInstance from "../../authentification/request/request";

export default function Nenkategorite({ navigation, route }) {
  const item = route?.params?.item;
  const id = item?._id;
  let marketID = route?.params.marketID;

  const [subCategories, setSubCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [subCategoriesId, setSubCategoriesId] = useState(null);
  const [fetchMore, setFetchMore] = useState(true);
  const [hasMoreItems, setHasMoreItems] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [currency, setCurrency] = useState();
  const [loading, setLoading] = useState(true);
  const [banner, setBanner] = useState([]);
  let [total, setTotal] = useState({});

  useEffect(() => {
    (async () => {
      const response = await axiosApiInstance.get(
        `/product-categories/list-subcategories/${id}`
      );
      setSubCategories(response.data);
    })();
  }, []);

  useEffect(() => {
    if (page === 1) {
      setLoading(true);
    }

    (async () => {
      if (subCategoriesId === null) {
        const response = await axiosApiInstance.get(
          `/products/list?name=${searchText}&page=${page}&companyId=${marketID}&categoryId=${id}`
        );
        if (response.data.products.length === 0) {
          setHasMoreItems(false);
        } else {
          setHasMoreItems(true);
          setBanner(response.data.offers);
        }
        if (searchText) {
          setData([...response.data.products]);
        } else {
          setData([...data, ...response.data.products]);
        }
        setCurrency(response.data.currency);
        setFetchMore(false);
        setLoading(false);
      } else {
        const response = await axiosApiInstance.get(
          `/products/list?name=${searchText}&page=${page}&companyId=${marketID}&subcategoryId=${
            subCategoriesId === null ? "" : subCategoriesId
          }`
        );
        if (response.data.products.length === 0) {
          setHasMoreItems(false);
        } else {
          setHasMoreItems(true);
        }
        if (searchText) {
          setData([...response.data.products]);
        } else {
          setData([...data, ...response.data.products]);
        }
        setFetchMore(false);
        setLoading(false);
      }
    })();
  }, [subCategoriesId, page]);

  const loadMore = () => {
    if (hasMoreItems && !searchText) {
      setPage(page + 1);
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
    setPage(1);
    setSearchText(text);
    if (subCategoriesId == null) {
      const response = await axiosApiInstance.get(
        `/products/list?name=${text}&page=${page}&companyId=${marketID}&categoryId=${id}`
      );
      setData(response.data.products);
    } else {
      const response = await axiosApiInstance.get(
        `/products/list?name=${text}&page=${page}&companyId=${marketID}&subcategoryId=${
          subCategoriesId === null ? "" : subCategoriesId
        }`
      );
      setData(response.data.products);
    }
  };
  const onSubmit = async (id, quantity) => {
    try {
      const response = await axiosApiInstance.post(`/basket/add-to-basket`, {
        productId: id,
        quantity: quantity,
        orderType: "market",
      });
      getTotal()
    } catch (err) {
      Alert.alert("Mesazhi", err?.response?.data?.message, [
        { text: "Në rregull" },
      ]);
    }
  };
  const incNum = (id, index) => {
    const newdata = [...data];
    if (newdata[index].quantity) {
      newdata[index].quantity++;
    } else {
      newdata[index].quantity = 1;
    }
    setData(newdata);
    onSubmit(id, newdata[index].quantity);
  };

  const decNum = (id, index) => {
    const newdata = [...data];
    if (newdata[index].quantity < 1) {
      return;
    }

    newdata[index].quantity--;
    setData(newdata);
    onSubmit(id, newdata[index].quantity);
  };
  const getTotal = async () => {
    const response = await axiosApiInstance.get(`/basket/get-basket-total-shopping`);
    setTotal(response?.data);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getTotal();
    });
    return unsubscribe;
  }, [navigation]);
  return (
    <View style={{ flex: 1 }}>
      <StatusBar backgroundColor="transparent" />
      <Header
        containerStyle={{
          backgroundColor: primary,
          borderBottomWidth: 1,
        }}
        placement="center"
        centerComponent={{
          text: "Nënkategoritë",
          style: {
            color: header,
            fontSize: 20,
            fontFamily: "Avenire-Regular",
          },
        }}
        leftComponent={
          <BackButton onPress={() => navigation.navigate("Kategorite")} />
        }
      />
      <View style={styles.container}>
        <View style={{ width: "100%" }}>
          <Searchbar
            containerStyle={styles.searchBarcontainer}
            inputContainerStyle={styles.input}
            onSubmitEditing={(text) => {
              onSubmitSearched(text);
            }}
          />
        </View>
        <View style={styles.subCatContainer}>
          <FlatList
            data={subCategories}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{ flexGrow: 1 }}
            keyExtractor={(item, i) => i.toString()}
            renderItem={({ item }) => {
              return (
                <View
                  style={{
                    paddingRight: 10,
                  }}
                >
                  <SolidButton
                    title={item.name}
                    onPress={() => {
                      setData([]);
                      setSubCategoriesId(item._id);
                      setPage(1);
                    }}
                    isSelected={subCategoriesId === item._id}
                  />
                </View>
              );
            }}
          />
        </View>
        {/* {loading ? (
          <View style={global.activityIndicator}>
            <ActivityIndicator size="large" color={buttonColor} />
          </View>
        ) : banner?.length === 0 || data?.length === 0 ? null : (
          <CarouselCards data={banner} />
        )} */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingBottom: 25,
            paddingTop: 15,
            width: "90%",
            justifyContent: "space-between",
          }}
        >
          <Text style={styles.titile}>Produktet</Text>
        </View>
        {loading ? (
          <View style={global.activityIndicator}>
            <ActivityIndicator size="large" color={buttonColor} />
          </View>
        ) : data?.length === 0 ? (
          <View style={global.activityIndicator}>
            <Text style={global.emptyText}>Për momentin nuk ka produkte</Text>
          </View>
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            style={{ width: "100%" }}
            data={data}
            keyExtractor={(item, i) => i.toString()}
            renderItem={({ item, index }) => {
              const id = item._id;
              return (
                <View style={styles.containerCard}>
                  <Card
                    title={item.name}
                    price={item.price}
                    currency={currency}
                    img={{ uri: item.imageURL }}
                    onPress={() => navigation.navigate("Produkti", { item })}
                    index={index}
                  />
                  <View style={styles.quantityContainer}>
                    <QuickButton
                      title="Add"
                      onPress={() => incNum(id, index)}
                    />
                    <Text style={styles.number}>
                      {item.quantity ? item.quantity : 0}
                    </Text>
                    <DecrementButton onPress={() => decNum(id, index)} />
                  </View>
                </View>
              );
            }}
            onEndReached={loadMore}
            ListFooterComponent={_renderFooter}
            onEndReachedThreshold={1}
          />
        )}
      </View>
      <TouchableOpacity
            onPress={() =>
              navigation.navigate("Homepage", { screen: "Shporta" })
            }
            style={styles.bottomContainer}
            >
        <Image source={require("../../assets/images/shkoShporta.png")} style={styles.shportaImg} />
        <Text style={{color:"white",fontSize:20,fontWeight:"bold"}}>Shko tek Shporta</Text>
        <Text style={{color:"white",fontSize:18}}>{total?.total} {total?.currency}</Text>
        </TouchableOpacity>
    </View>
  );
}
