//External dependencies
import React, { useState } from "react";
import {
  Text,
  View,
  ScrollView,
  TextInput,
  Alert,
  StyleSheet,
} from "react-native";
import { Header } from "react-native-elements";
import RNPickerSelect from "react-native-picker-select";
import { Ionicons } from "@expo/vector-icons";
// Internal dependencies
import global, {
  buttonColor,
  primary,
  header,
  black,
} from "../../styles/global";
import styles from "./styles";
import { LargeButton, BackButton } from "../../components/Button/Button";
import axiosApiInstance from "../../authentification/request/request";
import Item from "./Item";

const pickerStyle = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 8,
    height: 40,
    color: "black",
    paddingRight: 30,
    flexDirection: "row",
    alignItems: "center", // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 8,
    height: 40,
    color: "black",
    paddingRight: 30,
    flexDirection: "row",
    alignItems: "center", // to ensure the text is never behind the icon
  },
});
export default function Adresat({ navigation, route }) {
  const [data, setData] = useState([]);
  const [showMap, setShowMap] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const [street, setStreet] = useState("");
  const [cities, setCities] = useState([]);
  const [country, setCountry] = useState("");
  const [error, setError] = useState();
  const [filter, setFilter] = useState("");

  const getAddresses = async () => {
    try {
      const addresses = await axiosApiInstance.get(
        "/client/profile/get-addresses"
      );
      const { data } = addresses;
      if (data.addresses.length === 0)
        setError("Lista e adresave është e zbrazët për momentin");
      setData(data.addresses);
    } catch (e) {
      console.log("e", e);
    }
  };
  const getCities = async () => {
    try {
      const response = await axiosApiInstance.get(`/locations/get-cities`);
      let cities = response.data.cities.map((item) => ({
        label: item.city,
        value: item.city,
      }));
      setCities(cities);
      setCountry(response.data.country);
      setFilter(response.data.defaultCity);
    } catch (e) {
      Alert.alert("Mesazhi", e.response.data.message);
    }
  };
  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      getAddresses();
      getCities();
    });
    return unsubscribe;
  }, [navigation]);

  const saveAdress = async () => {
    try {
      if (street != "") {
        const response = await axiosApiInstance.post(
          "client/profile/add-address",
          {
            street: street,
            city: filter,
            country: country,
            latitude: "",
            longitude: "",
          }
        );
        const { data } = response;
        Alert.alert("Mesazhi", data.message, [{ text: "Në rregull" }]);
        getAddresses();
        setShowMap(false);
        setError(false);
        setShowButton(true);
        setStreet("");
        setKomuna("");
      } else {
        Alert.alert("Mesazhi", "Ju lutem shkruaje rrugën", [
          { text: "Në rregull" },
        ]);
      }
    } catch (e) {
      const { data } = e.response;
      Alert.alert("Mesazhi", data.message, [{ text: "Në rregull" }]);
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
        leftComponent={<BackButton onPress={() => navigation.goBack()} />}
        centerComponent={{
          text: "Adresat",
          style: {
            color: header,
            fontSize: 20,
            fontFamily: "Avenire-Regular",
          },
        }}
      />
      <View style={global.container}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={[
            styles.scrollView,
            { justifyContent: error ? "center" : null },
          ]}
        >
          <Text
            style={[
              styles.title,
              { textAlign: "center", paddingTop: 10, paddingBottom: 5 },
            ]}
          >
            {error ? error : "Adresat e ruajtura deri më tani"}
          </Text>
          <View style={{ padding: 10, width: "100%" }}>
            {data.map((address) => (
              <Item
                callback={getAddresses}
                id={address._id}
                key={address._id}
                coordinates={address.coordinates}
                street={address.street}
                komuna={address.city}
                title={address.street}
                active={address.isDefault}
                index={1}
                onAction={() => {}}
              />
            ))}
          </View>
          {showButton && (
            <LargeButton
              title="Shto një lokacion të ri"
              onPress={() => {
                setShowMap(true), setShowButton(false);
              }}
            />
          )}
          {showMap && (
            <>
              <Text style={[styles.title]}>Zgjedh lokacionin</Text>
              <View style={{ width: "95%", marginTop: 5 }}>
                <Text style={global.note}>Zgjedh qytetin</Text>
                <View style={global.picker}>
                  <RNPickerSelect
                    items={cities}
                    useNativeAndroidPickerStyle={false}
                    onValueChange={(value) => {
                      setFilter(value);
                    }}
                    value={filter}
                    placeholder={{}}
                    InputAccessoryView={() => null}
                    style={pickerStyle}
                    Icon={() => {
                      return (
                        <View
                          style={{
                            ...Platform.select({
                              ios: {
                                paddingRight: 5,
                                paddingTop: 10,
                              },
                              android: {
                                paddingRight: 5,
                                paddingTop: 10,
                              },
                            }),
                          }}
                        >
                          <Ionicons
                            name="ios-arrow-down"
                            size={20}
                            color={black}
                          />
                        </View>
                      );
                    }}
                    activeItemTextStyle={{ fontSize: 10, fontWeight: "bold" }}
                  />
                </View>
                <Text
                  style={[global.note, { marginTop: 20, marginBottom: 10 }]}
                >
                  Shkruaje rrugën
                </Text>
                <TextInput
                  style={[global.manualisht, { height: 40, marginBottom: 10 }]}
                  onChangeText={(text) => setStreet(text)}
                  value={street}
                />
                <View style={styles.footer}>
                  <LargeButton title="Konfirmo" onPress={saveAdress} />
                </View>
              </View>
            </>
          )}
        </ScrollView>
      </View>
    </View>
  );
}
