//External dependencies
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from "react-native";
import { Header } from "react-native-elements";
// Internal dependencies
import styles from "./styles";
import global, { buttonColor, primary, header } from "../../styles/global";
import Card from "./Card";
import { BackButton, IconButton } from "../../components/Button/Button";
import axiosApiInstance from "../../authentification/request/request";
import DisabledCard from "./DisabledCard";
import Searchbar from "../../components/Searchbar/Searchbar";
import CarouselCards from "../../components/Carousel/CarouselCards";

export default function Restauranet({ navigation, route }) {
  const allCategorieId = route?.params?.allCategorieId;
  const subcategorieId = route?.params?.subcategorieId;
  const [subCategories, setSubCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [subCategoriesId, setSubCategoriesId] = useState(null);
  const [fetchMore, setFetchMore] = useState(true);
  const [hasMoreItems, setHasMoreItems] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);
  const [banner, setBanner] = useState([]);
  const [transporti, setTransporti] = useState();

  useEffect(() => {
    (async () => {
      const response = await axiosApiInstance.get(
        `/product-categories/list-restaurant-categories/null/${page}`
      );
      setSubCategories(response.data);
    })();
  }, []);

  useEffect(() => {}, [subCategoriesId]);

  useEffect(() => {
    if (page === 1) {
      setLoading(true);
    }
    (async () => {
      if (subCategoriesId === null) {
        const url = `/restaurants/list-restaurants?name=${searchText}&categoryId=${subCategoriesId}&page=${page}`;
        const response = await axiosApiInstance.get(url);
        setBanner(response.data.offers);

        if (response.data.data.restaurants.length === 0) {
          setHasMoreItems(false);
        } else {
          setHasMoreItems(true);
        }
        if (searchText) {
          setData([...response.data.data.restaurants]);
        } else {
          setData([...data, ...response.data.data.restaurants]);
          setTransporti(response.data)
        }
        setFetchMore(false);
        setLoading(false);
      } else {
        const url = `/restaurants/list-restaurants?name=${searchText}&categoryId=${
          subCategoriesId === null ? "" : subCategoriesId
        }&page=${page}`;
        const response = await axiosApiInstance.get(url);

        if (response.data.data.restaurants.length === 0) {
          setHasMoreItems(false);
        } else {
          setHasMoreItems(true);
        }
        if (searchText) {
          setData([...response.data.data.restaurants]);
        } else {
          setData([...data, ...response.data.data.restaurants]);
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

    if (subCategoriesId == null || subcategorieId === null) {
      const response = await axiosApiInstance.get(
        `/restaurants/list-restaurants?name=${text}&categoryId=${subCategoriesId}&page=${page}`
      );
      setData(response.data.data.restaurants);
    } else {
      const response = await axiosApiInstance.get(
        `/restaurants/list-restaurants?name=${text}&categoryId=${
          subCategoriesId === null || subcategorieId === null
            ? ""
            : subCategoriesId || subcategorieId
        }&page=${page}
        }`
      );
      setData(response.data.data.restaurants);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Header
        containerStyle={{
          backgroundColor: primary,
          borderBottomWidth: 1,
        }}
        placement="center"
        centerComponent={{
          text: "Restorantet",
          style: {
            color: header,
            fontSize: 20,
            fontFamily: "Avenire-Regular",
          },
        }}
        leftComponent={
          <BackButton onPress={() => navigation.navigate("Homepage")} />
        }
      />
      <View style={styles.container}>
        <View style={{ width: "95%", alignSelf: "center" }}>
          <Searchbar
            containerStyle={styles.searchBarcontainer}
            inputContainerStyle={styles.input}
            onSubmitEditing={(text) => {
              onSubmitSearched(text);
            }}
          />
        </View>

        <View style={styles.allContainer}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("TeGjitha", {
                callback: (itemId) => {
                  setData([]);
                  setPage(1);
                  setSubCategoriesId(itemId);
                  navigation.pop();
                },
              })
            }
            style={styles.allButton}
          >
            <Text style={styles.allButtonTitle}>Më shumë</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.categoriesContainer}>
          <FlatList
            data={subCategories}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{ flexGrow: 1, marginLeft: 15 }}
            keyExtractor={(item, i) => i.toString()}
            renderItem={({ item }) => {
              return (
                <View style={styles.categorieButton}>
                  <IconButton
                    title={item?.name}
                    img={{ uri: item?.imageURL }}
                    onPress={() => {
                      setData([]);
                      setSubCategoriesId(item?._id);
                      setPage(1);
                    }}
                    isSelected={subCategoriesId === item?._id}
                  />
                </View>
              );
            }}
          />
        </View>

        {loading ? (
          <View style={global.activityIndicator}>
            <ActivityIndicator size="large" color={buttonColor} />
          </View>
        ) : banner?.length === 0 || data?.length === 0 ? null : (
          <CarouselCards data={banner} />
        )}
        {loading ? (
          <View style={global.activityIndicator}>
            <ActivityIndicator size="large" color={buttonColor} />
          </View>
        ) : data.length === 0 ? (
          <View style={global.activityIndicator}>
            <Text style={global.emptyText}>Për momentin nuk ka restorante</Text>
          </View>
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            style={{ width: "90%", alignSelf: "center" }}
            data={data}
            keyExtractor={(item, i) => i.toString()}
            renderItem={({ item, index }) => {
              const restoranId = item?._id;
              return item.isOpen === true ? (
                <Card
                  title={item?.name}
                  transporti={transporti?.transportPrice}
                  hour={item?.availability?.hour}
                  minutes={item?.availability?.minutes}
                  currency={item?.currency}
                  onPress={() =>
                    navigation.navigate("RestauranetProduktet", { restoranId })
                  }
                  img={{ uri: item?.imageURL }}
                />
              ) : (
                <DisabledCard
                  opensAt={item?.opensAt}
                  name={item?.name}
                  img={{ uri: item?.imageURL }}
                  currency={item?.currency}
                  transporti={transporti?.transportPrice}
                />
              );
            }}
            onEndReached={loadMore}
            ListFooterComponent={_renderFooter}
            onEndReachedThreshold={1}
          />
        )}
      </View>
    </View>
  );
}
