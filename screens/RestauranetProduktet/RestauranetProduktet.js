//External dependencies
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from "react-native";
// Internal dependencies
import styles from "./styles";
import global, { buttonColor } from "../../styles/global";
import Card from "./Card";
import {
  BackButtonRestaurant,
  DecrementButton,
  QuickButton,
  ProduktetButton,
} from "../../components/Button/Button";
import axiosApiInstance from "../../authentification/request/request";
import { StatusBar } from "expo-status-bar";

export default function RestauranetProduktet({ navigation, route }) {
  const restoranId = route?.params?.restoranId;
  const [data, setData] = useState([]);
  const [delivery, setDelivery] = useState([]);
  const [address, setAddress] = useState([]);
  const [menus, setMenus] = useState([]);
  const [page, setPage] = useState(1);
  
  const [subCategories, setSubCategories] = useState([]);
  const [subCategoriesId, setSubCategoriesId] = useState(null);
  const [fetchMore, setFetchMore] = useState(true);
  const [hasMoreItems, setHasMoreItems] = useState(true);
  const [loading, setLoading] = useState(true);
  const [offer, setOffers] = useState({});
  let [total, setTotal] = useState({});

  useEffect(() => {
    (async () => {
      const response = await axiosApiInstance.get(
        `/product-categories/list-restaurant-subcategories/${restoranId}`
      );
      setSubCategories(response.data);
    })();
  }, []);

  useEffect(() => {
    if (page === 1) {
      setLoading(true);
    }
    (async () => {
      const response = await axiosApiInstance.get(
        `/menus/list?name=&page=${page}&restaurantId=${restoranId}&categoryId=${subCategoriesId}`
      );
      
      
      if (response.data.menus.length ===0) {
        setHasMoreItems(false);
      } else {
        setHasMoreItems(true);
        setMenus([...menus,...response.data.menus]);
        
      }
      setFetchMore(false);
      setLoading(false);
    })();
  }, [subCategoriesId,page,hasMoreItems]);

  const loadMore = () => {
    if (hasMoreItems) {
      setPage(page + 1);
    }
  };

  const _renderFooter = () => {
    if (hasMoreItems && fetchMore) {
      return <ActivityIndicator animating size="large" color={buttonColor} />;
    }
    return null;
  };
  const getTotal = async () => {
    const response = await axiosApiInstance.get(`/basket/get-basket-total-shopping`);
    setTotal(response?.data);
  };
  useEffect(() => {
    (async () => {
      const response = await axiosApiInstance.get(`/restaurants/${restoranId}`);
      setData(response.data);
      setDelivery(response.data.restaurant)
      setAddress(response.data.restaurant.address);
      setOffers(response.data.offers)
    })();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getTotal();
    });
    return unsubscribe;
  }, [ navigation]);
  
  const Menu = ({ item, index }) => (
    <View style={styles.containerCard}>
      <Card
        title={item.name}
        price={item.price}
        currency={data?.currency}
        img={{ uri: item.imageURL }}
        onPress={() => navigation.navigate("RestoranInfo", { item })}
        index={index}
      />
      <View style={styles.quantityContainer}>
        <QuickButton title="Add" onPress={() => incNum(item._id, index)} />
        <Text style={styles.number}>{item.quantity ? item.quantity : 0}</Text>
        <DecrementButton onPress={() => decNum(item._id, index)} />
      </View>
    </View>
  );
  const onSubmit = async (id, quantity) => {
    try {
      const response = await axiosApiInstance.post(`/basket/add-to-basket`, {
        productId: id,
        quantity: quantity,
        orderType: "restaurant",
      });
      getTotal()
    } catch (err) {
      Alert.alert("Mesazhi", err?.response?.data?.message, [
        { text: "Në rregull" },
      ]);
    }
  };
  const incNum = (id, index) => {
    const newdata = [...menus];
    if (newdata[index].quantity) {
      newdata[index].quantity++;
    } else {
      newdata[index].quantity = 1;
    }
    setMenus(newdata);
    onSubmit(id, newdata[index].quantity);
  };

  const decNum = (id, index) => {
    const newdata = [...menus];
    if (newdata[index].quantity < 1) {
      return;
    }
    newdata[index].quantity--;
    setMenus(newdata);
    onSubmit(id, newdata[index].quantity);
  };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="transparent" />
      <ImageBackground style={styles.img} source={{ uri: data.imageURL }}>
        <View style={styles.backButton}>
          <BackButtonRestaurant onPress={() => navigation.goBack()} />
        </View>
      </ImageBackground>
      <View style={styles.infoContainer}>
          <View style={styles.restoranTitleContainer}>
            <View style={{width:"85%",alignSelf:"center",paddingLeft:5}}><Text style={styles.restoranTitle}>{delivery?.name}</Text></View>
          </View>
          <View style={styles.infoInnerContainer}>
          <View style={{display:"flex",flexDirection:"row"}}>
            <View>
            {address?.map((item) => (
            <View style={styles.informations}>
              <Image source={require("../../assets/images/lokacioni.png")} />
              <Text style={styles.subTitle}>{item.street},</Text>
              <Text style={styles.subTitle}>{item.city},</Text>
              <Text style={styles.subTitle}>{item.country}</Text>
            </View>
          ))}
          <View style={styles.timeContainer}>
            <Image source={require("../../assets/images/ora.png")} />
            <Text style={styles.time}>Porosit për në orën</Text>
            <Text style={styles.date}>
              {delivery?.availability?.hour}:{delivery?.availability?.minutes}
            </Text>
          </View>
          <View style={styles.currency}>
            <Image source={require("../../assets/images/motorri.png")} />
            <Text style={styles.currency}>{data?.transportPrice} {data?.currency}</Text>
          </View>
            </View>
            {offer===null?(null):(
              <View style={styles.bannerContainer}>
              <ImageBackground source={require("../../assets/images/oferta.png")} style={styles.ofertaImage} resizeMode="stretch">
                <View style={{justifyContent:"center",alignItems:"center"}}>
                  <Text style={styles.bannerTitleBottomTitle}>Ofertë</Text>
                  <Text style={styles.ofertPrice}>{offer?.offerPrice}</Text>
                  <Text style={styles.bannerTitleBottomTitle}>{offer?.currency}</Text>
                </View>
              </ImageBackground></View>
            )}
          </View>
          <View style={styles.categoriesContainer}>
            <FlatList
              data={subCategories}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              style={{ flex: 1, marginTop: 5 }}
              keyExtractor={(item, i) => i.toString()}
              renderItem={({ item }) => {
                return (
                  <View
                    style={{
                      marginRight: 0,
                    }}
                  >
                    <ProduktetButton
                      title={item.name}
                      onPress={() => {
                        setMenus([]);
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
          {loading ? (
            <View style={global.activityIndicator}>
              <ActivityIndicator size="large" color={buttonColor} />
            </View>
          ) : menus?.length === 0 ? (
            <View style={global.activityIndicator}>
              <Text style={global.emptyText}>Për momentin nuk ka menu</Text>
            </View>
          ) : (
            <FlatList
              nestedScrollEnabled
              style={{ height: 150 }}
              data={menus}
              keyExtractor={(item, i) => i.toString()}
              renderItem={Menu}
              onEndReached={loadMore}
              ListFooterComponent={_renderFooter}
              onEndReachedThreshold={1}
            />
          )}
        </View>
        <TouchableOpacity   onPress={() =>
              navigation.navigate("Homepage", { screen: "Shporta" })
            } style={styles.bottomContainer}>
        <Image source={require("../../assets/images/shkoShporta.png")} style={styles.shportaImg} />
        <Text style={{color:"white",fontSize:20,fontWeight:"bold"}}>Shko tek Shporta</Text>
        <Text style={{color:"white",fontSize:18}}>{total?.total} {total?.currency}</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
}
