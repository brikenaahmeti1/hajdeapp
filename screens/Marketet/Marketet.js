//External dependencies
import React, { useEffect, useState } from "react";
import {
  View,
  Alert,
  FlatList,
  Platform,
  ActivityIndicator,
  Text,
  StatusBar,
  Image
} from "react-native";
import { Header } from "react-native-elements";
import RNPickerSelect from "react-native-picker-select";
import { Ionicons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
// Internal dependencies
import styles from "./styles";
import global, { primary, header, buttonColor } from "../../styles/global";
import Searchbar from "../../components/Searchbar/Searchbar";
import Card from "./Card";
import { BackButton } from "../../components/Button/Button";
import axiosApiInstance from "../../authentification/request/request";
import CarouselCards from "../../components/Carousel/CarouselCards";

const pickerStyle = {
  inputIOS: {
    color: "white",
    paddingTop: 13,
    paddingHorizontal: 10,
    paddingBottom: 12,
    borderRadius: 20,
  },
  inputAndroid: {
    width: "95%",
    color: primary,
    backgroundColor: buttonColor,
    borderRadius: 40,
    paddingHorizontal: 20,
    fontSize: 16,
  },
};
export default function Marketet({ navigation }) {
  const [data, setData] = useState([]);
  const [location, setLocation] = useState([]);
  const [cities, setCities] = useState([]);
  const [filter, setFilter] = useState("");
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);
  const [banner, setBanner] = useState([]);

  const getCities = async () => {
    try {
      const response = await axiosApiInstance.get(`/locations/get-cities`);
      let cities = response.data.cities.map((item) => ({
        label: item.city,
        value: item.city,
      }));
      setLocation(response.data.cities);
      setCities(cities);

      if (filter === "") {
        setData([]);
        response.data.defaultCity && setFilter(response.data.defaultCity);
      } else {
        setData([]);
        getCompanies();
      }
    } catch (e) {
      Alert.alert("Mesazhi", e.response.data.message);
    }
  };

  const getCompanies = async () => {
    try {
      setLoading(true);
      let response;
      if (searchText !== "") {
        response = await axiosApiInstance.get(
          `companies/search?name=${searchText}&city=${filter}`
        );
      } else {
        response = await axiosApiInstance.get(
          `/companies/list?page=1&city=${filter}`
        );
      }
      setBanner(response.data.offers);
      setData([...data, ...response.data.result]);
      setLoading(false);
    } catch (e) {
      Alert.alert("Mesazhi", e.response.data.message, [{ text: "Në rregull" }]);
    }
  };

  useEffect(() => {
    getCompanies();
  }, [filter]);

  useEffect(() => {
    const looseFocus = navigation.addListener("blur", () => {
      setData([]);
      setFilter(null);
    });
    const unsubscribe = navigation.addListener("focus", () => {
      getCities();
    });
    return unsubscribe, looseFocus;
  }, []);

  const onSubmitSearched = async (text) => {
    if (text) {
      const response = await axiosApiInstance.get(
        `companies/search?name=${text}&city=${filter}`
      );
      setData([...response.data.result]);
    } else {
      getCompanies();
    }
  };

  useEffect(() => {
    onSubmitSearched(searchText);
  }, [searchText]);

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
          <BackButton onPress={() => navigation.navigate("Homepage")} />
        }
        centerComponent={{
          text: "Marketet",
          style: {
            color: header,
            fontSize: 20,
            fontFamily: "Avenire-Regular",
          },
        }}
      />

      <Searchbar onSubmitEditing={(text) => setSearchText(text)} />
      <View style={styles.pickerIconsContainer}>
        <Fontisto name="map-marker-alt" size={16} color={primary} />
        <View style={{ width: "100%" }}>
          {cities.length > 0 && (
            <RNPickerSelect
              items={cities}
              useNativeAndroidPickerStyle={false}
              onValueChange={(value) => {
                setData([]);
                setFilter(value);
              }}
              placeholder={{}}
              InputAccessoryView={() => null}
              activeItemTextStyle={{ fontSize: 10, fontWeight: "bold" }}
              value={filter}
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
              style={pickerStyle}
            />
          )}
        </View>
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
          <Text style={global.emptyText}>Për momentin nuk ka markete</Text>
        </View>
      ) : (
        <FlatList
          keyExtractor={(item, i) => i.toString()}
          data={data}
          renderItem={({ item, i }) => {
            const saved = item.isSaved;
            const city = item.city;
            const marketID = item._id;
            return (
              <Card
                title={item.company}
                img={{ uri: item.imageURL }}
                deliveryTime={item.deliveryTime}
                onPress={() =>
                  navigation.navigate("Kategorite", {
                    item,
                    saved,
                    city,
                    marketID,
                  })
                }
              />
            );
          }}
        />
      )}
       
    </View>
  );
}
