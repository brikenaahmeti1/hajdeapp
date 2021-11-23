//External dependencies
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Alert,
  FlatList,
  ActivityIndicator,
  TextInput,
  StatusBar,
  StyleSheet,
} from "react-native";
import { Header } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
  AccordionList,
} from "accordion-collapse-react-native";
import RNPickerSelect from "react-native-picker-select";
// Internal dependencies
import styles from "./styles";
import global, {
  primary,
  header,
  buttonColor,
  black,
} from "../../styles/global";
import { LargeButton } from "../../components/Button/Button";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import axiosApiInstance from "../../authentification/request/request";
import { BackButton } from "../../components/Button/Button";
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

export default function CheckoutDuplicate({ navigation, route }) {
  const comment = route?.params?.comment;
  const id = route?.params?.id; //Id e porosise qe e bartim nga Historiku screen, pastaj tek PorosiaDuplicate deri tek CheckoutDuplicate

  const [collapse, setCollapse] = useState(false);
  const [collapse1, setCollapse1] = useState(false);
  const [data, setData] = useState([]);
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [total, setTotal] = useState({});
  const [addressId, setAddressId] = useState();
  const [loading, setLoading] = useState(true);
  const [foundAddress, setFoundAddress] = useState();
  const [sender, setSender] = useState(1);
  const [butonActive, setButtonActive] = useState(false);
  const [active, setActive] = useState(true);
  const [mapActive, setMapActive] = useState(false);
  const [cities, setCities] = useState([]);
  const [manualCountry, setManualCountry] = useState("");
  const [filter, setFilter] = useState();
  const [manualStreet, setManualStreet] = useState("");
  let transporti = total.total - total.transport;
  const getAddress = async () => {
    const response = await axiosApiInstance.get(
      `/client/profile/get-addresses`
    );
    if (response?.data?.addresses) {
      const foundAddress = response.data.addresses.find(
        (element) => element.isDefault
      );
      setStreet(foundAddress.street);
      setCity(foundAddress.city);
      setCountry(foundAddress.country);
      setAddressId(foundAddress._id);
      setData(response.data.addresses);
      setFoundAddress(foundAddress);
    } else {
    }
  };

  const getTotal = async () => {
    const response = await axiosApiInstance.get(
      `/client/reorder/get-reorder-total/${id}`
    );
    setTotal(response?.data);
    setLoading(false);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getAddress();
      getTotal()
        .then((data) => {})
        .catch((err) => {
          Alert.alert("Mesazhi", err?.response?.data?.message);
          console.log(err);
        });
    });
    return unsubscribe;
  }, [navigation]);

  const onSubmit = async () => {
    try {
      const response = await axiosApiInstance.post(
        `/client/reorder/make-reorder/${id}`,

        {
          addressId: addressId,
          clientComment: comment,
        }
      );
      Alert.alert("Mesazhi", response.data.message, [
        {
          text: "Në rregull",
          onPress: () => navigation.navigate("Historiku"),
        },
      ]);
    } catch (e) {
      Alert.alert("Mesazhi", e.response.data.message, [{ text: "Në rregull" }]);
    }
  };

  const saveAdress = async () => {
    try {
      if (manualStreet != "") {
        const response = await axiosApiInstance.post(
          "/client/orders/make-order",
          {
            address: {
              street: manualStreet,
              city: filter,
              country: manualCountry,
              coordinates: {
                latitude: "0",
                longitude: "0",
              },
            },
            clientComment: comment,
            receiver: {
              firstName: profileName,
              lastName: profileLastName,
              phone: profilePhone,
            },
          }
        );
        const { data } = response;
        Alert.alert("Mesazhi", data.message, [
          {
            text: "Në rregull",
            onPress: () => navigation.navigate("Historiku"),
          },
        ]);
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
  const hideButton = () => {
    setMapActive(true);
    setButtonActive(false);
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
        leftComponent={
          <BackButton onPress={() => navigation.navigate("PorosiaDuplicate")} />
        }
        centerComponent={{
          text: "Bëj pagesën",
          style: {
            color: header,
            fontSize: 20,
            fontFamily: "Avenire-Regular",
          },
        }}
      />
      <ScrollView>
        <View style={styles.container}>
          {loading ? (
            <View style={global.activityIndicator}>
              <ActivityIndicator size="large" color={buttonColor} />
            </View>
          ) : total?.total === 0 ? (
            <View style={styles.amountContainer}>
              <Text style={global.message}>{total?.warningMessage}</Text>
            </View>
          ) : (
            <View style={{ width: "100%" }}>
              <View style={styles.amountContainer}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={styles.title}>Çmimi i produkteve</Text>
                  <Text style={styles.subTitle}>
                    {transporti} {total?.currency}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingTop: 10,
                  }}
                >
                  <Text style={styles.title}>Transporti</Text>
                  <Text style={styles.subTitle}>
                    {total?.transport} {total?.currency}
                  </Text>
                </View>
              </View>
              <View style={{ marginTop: 20 }}>
                <View style={styles.amountContainer}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={styles.title}>Totali</Text>
                    <Text style={styles.subTitle}>
                      {total?.total} {total?.currency}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          )}
          <View style={styles.locationContainer}>
            {active ? (
              <View>
                <Collapse
                  isCollapsed={collapse}
                  onToggle={(isCollapsed) => setCollapse(isCollapsed)}
                >
                  <CollapseHeader>
                    <View onPress={() => setCollapse(!collapse)}>
                      <Text style={styles.title}>Zgjedh lokacionin</Text>
                      <View style={styles.friendsContainer}>
                        <View style={styles.itemsContainerLocation}>
                          {foundAddress === undefined ? (
                            <Text style={styles.subTitle}></Text>
                          ) : (
                            <Text style={styles.subTitle}>
                              {street}, {city}, {country}
                            </Text>
                          )}
                        </View>
                        {collapse ? (
                          <Ionicons
                            name="ios-arrow-up"
                            size={24}
                            color="black"
                          />
                        ) : (
                          <Ionicons
                            name="ios-arrow-down"
                            size={20}
                            color="black"
                          />
                        )}
                      </View>
                    </View>
                  </CollapseHeader>
                  <CollapseBody>
                    <FlatList
                      data={data}
                      keyExtractor={(item, i) => i.toString()}
                      renderItem={({ item }) => {
                        return (
                          <View style={styles.adressesContainer}>
                            <TouchableOpacity
                              onPress={() => setStreet(item?.street)}
                            >
                              <Text style={styles.adressesName}>
                                {item.street}, {item.city}, {item.country}
                              </Text>
                            </TouchableOpacity>
                          </View>
                        );
                      }}
                    />
                  </CollapseBody>
                </Collapse>
                <View>
                  {foundAddress === undefined ? (
                    <TouchableOpacity
                      style={global.linkButton}
                      onPress={() =>
                        navigation.navigate("Adresat", { paramKey: sender })
                      }
                    >
                      <Text style={global.buttonText}>Shtoni një adresë</Text>
                    </TouchableOpacity>
                  ) : null}
                </View>
              </View>
            ) : (
              <TouchableOpacity
                style={global.linkButton}
                onPress={() => {
                  hideButton();
                  setMapActive(false);
                  setActive(true);
                }}
              >
                <Text style={global.buttonText}>Zgjedh lokacionin</Text>
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.paymentContainer}>
              {mapActive ? (
               <Collapse
               isCollapsed={collapse1}
               onToggle={(isCollapsed) => setCollapse1(isCollapsed)}
             >
               <CollapseHeader>
                 <View onPress={() => setCollapse(!collapse1)}>
                   <View style={{display:"flex",flexDirection:"row",
                   justifyContent:"space-between",alignItems:"center",paddingRight:20}}>
                   <Text style={styles.title}>Zgjedh lokacionin manualisht</Text>
                   {collapse1 ? (
                          <Ionicons
                            name="ios-arrow-up"
                            size={24}
                            color="black"
                          />
                        ) : (
                          <Ionicons
                            name="ios-arrow-down"
                            size={20}
                            color="black"
                          />
                        )}
                   </View>
                   <View style={styles.friendsContainer}>
                   </View>
                 </View>
               </CollapseHeader>
               <CollapseBody>
               <View
               style={{ width: "95%", marginTop: 10, alignSelf: "center" }}
             >
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
                 style={[
                   global.manualisht,
                   { height: 40, marginBottom: 10 },
                 ]}
                 onChangeText={(text) => setManualStreet(text)}
                 value={manualStreet}
               />
             </View>
               </CollapseBody>
             </Collapse>
              ) : <TouchableOpacity
              style={global.linkButton}
              onPress={() => {
                hideButton();
                setMapActive(true);
                setActive(false);
              }}
            >
              <Text style={global.buttonText}>Zgjedh lokacionin</Text>
            </TouchableOpacity>}
          </View>
          <View style={styles.paymentContainer}>
            <Text style={styles.title}>Mënyra e pagesës</Text>
            <View style={styles.itemsContainer}>
              <Text style={styles.subTitle}>Para në dorë</Text>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <LargeButton
              title="Porosit"
              onPress={active === true ? onSubmit : saveAdress}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
