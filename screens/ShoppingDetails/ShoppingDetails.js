//External dependencies
import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Header } from "react-native-elements";
import StepIndicator from "react-native-step-indicator";
// Internal dependencies
import global, {
  primary,
  textColor,
  header,
  buttonColor,
} from "../../styles/global";
import styles from "./styles";
import { BackButton, TrackButton } from "../../components/Button/Button";
import axiosApiInstance from "../../authentification/request/request";
import CardProduct from "./CardProduct";
import CardTypedProducts from "./CardTypedProducts";
import UserCard from "./UserCard";
import OrderCard from "./OrderCard";
import { StatusBar } from "expo-status-bar";

const getStatusId = (status) => {
  switch (status) {
    case "PENDING":
      return 0;
    case "IN_PROGRESS":
      return 1;
    case "ISSUE":
      return 2;
    case "COMPLETED":
      return 2;
    default:
      return 0;
  }
};
const labels = [
  "Porosia e dërguar",
  "Shpërndarësi pranoi porosinë",
  "Porosia u pranua",
];
const customStyles = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize: 30,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: textColor,
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: textColor,
  stepStrokeUnFinishedColor: textColor,
  separatorFinishedColor: textColor,
  separatorUnFinishedColor: textColor,
  stepIndicatorFinishedColor: textColor,
  stepIndicatorUnFinishedColor: primary,
  stepIndicatorCurrentColor: textColor,
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: textColor,
  stepIndicatorLabelFinishedColor: textColor,
  stepIndicatorLabelUnFinishedColor: primary,
  // stepStrokeUnFinishedColor:'orange',
  labelColor: textColor,
  labelSize: 15,
  currentStepLabelColor: textColor,
  labelAlign: "flex-start",
};
export default function ShoppingDetails({ navigation, route }) {
  const item = route?.params?.item;
  const [currentPosition, setCurrentPosition] = useState(
    getStatusId(item?.status)
  );
  const [data, setData] = useState([]);
  const [products, setProducts] = useState([]);
  const [manualData, setManualData] = useState([]);
  const [address, setAddress] = useState([]);
  const [supplier, setSupplier] = useState([]);
  const [allData, setAllData] = useState([]);
  const [courier, setCourier] = useState([]);
  const [currency, setCurrency] = useState([]);
  const [loading, setLoading] = useState(true);

  const OrdersWithAxios = async () => {
    if (item) {
      const response = await axiosApiInstance.get(
        `/client/orders/get-order-details/${item._id}`
      );
      setData(response.data.receiver);
      setCurrency(response.data.currency);
      setAllData(response.data);
      setProducts(response.data.products);
      setManualData(response.data.typedProducts);
      setAddress(response.data.address);
      setSupplier(response.data.supplier);
      setCourier(response.data.courier);
      setLoading(false);
    }
  };

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      OrdersWithAxios();
    });
    return unsubscribe;
  }, [navigation]);

  const anuloPorosin = async () => {
    try {
      const response = await axiosApiInstance.put(
        `/client/orders/cancel-order/${item._id}`
      );
      navigation.navigate("Historiku");
    } catch (err) {
      Alert.alert("Mesazhi", err.response.data.message, [
        { text: "Në rregull" },
      ]);
    }
  };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="transparent" />
      <Header
        containerStyle={{
          backgroundColor: primary,
          borderBottomWidth: 1,
        }}
        placement="center"
        leftComponent={<BackButton onPress={() => navigation.goBack()} />}
        centerComponent={{
          text: "Porosia",
          style: {
            color: header,
            fontSize: 20,
            fontFamily: "Avenire-Regular",
          },
        }}
      />
      <ScrollView style={styles.scrollView}>
        <View style={styles.indicatorContainer}>
          <View style={styles.topContainer}>
            <Image
              source={require("../../assets/images/Profile.png")}
              style={styles.image}
            />
            <Text style={styles.text}>Detajet e porosisë</Text>
          </View>

          {item?.status === "REJECTED" || item?.status === "CANCELLED" ? (
            <View style={{ alignSelf: "center" }}>
              <Text style={styles.porosia}>
                {item.status === "CANCELLED"
                  ? "Ju keni anuluar këtë porosi"
                  : "Kjo porosi është anuluar nga shpërndarësi"}
              </Text>
            </View>
          ) : (
            <View style={styles.indicator}>
              <StepIndicator
                customStyles={customStyles}
                currentPosition={currentPosition}
                labels={labels}
                direction="vertical"
                style={{ textAlign: "flex-start" }}
                stepCount={labels.length}
                renderLabel={({ label }) => (
                  <Text style={{ paddingLeft: 20 }}>{label}</Text>
                )}
              />
            </View>
          )}
          {loading ? (
            <View style={global.activityIndicator}>
              <ActivityIndicator size="large" color={buttonColor} />
            </View>
          ) : manualData?.length != 0 && allData?.warningMessage != 0 ? (
            <View style={styles.ordersContainer}>
              <Text style={global.message}>{allData.warningMessage}</Text>
            </View>
          ) : null}

          <View style={styles.ordersContainer}>
            {products?.length != 0 ? (
              <CardProduct items={products} currency={currency} />
            ) : null}

            {manualData?.length != 0 && products?.length === 0 ? (
              <CardProduct items={manualData} />
            ) : (
              <CardTypedProducts items={manualData} />
            )}
          </View>
          <View style={styles.ordersContainer}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text
                style={{
                  fontSize: 15,
                  color: "#800000",
                  fontFamily: "Avenire-Regular",
                }}
              >
                Transporti
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  color: "#800000",
                  fontFamily: "Avenire-Regular",
                }}
              >
                100 {currency}
              </Text>
            </View>
          </View>
          <OrderCard
            supplier={supplier.name}
            clientComment={data.clientComment}
            curierName={courier.name}
            courierPhone={courier.phone}
            status={allData.status}
            total={allData.total}
            currency={allData.currency}
            orderDate={allData.orderDate}
            estimatedArrival={allData.estimatedArrival}
            courierComment={allData.courierComment}
            issue={allData.issue}
          />
          <UserCard
            name={data.firstName}
            lastName={data.lastName}
            phone={data.phone}
            street={address.street}
            city={address.city}
            country={address.country}
          />
        </View>
        <View style={styles.anulo}>
          <TrackButton
            disabled={
              item?.status === "COMPLETED" ||
              item?.status === "ISSUE" ||
              item?.status === "REJECTED" ||
              item?.status === "IN_PROGRESS" ||
              item?.status === "CANCELLED"
            }
            title="Anulo"
            onPress={() =>
              Alert.alert(
                "Mesazhi",
                "A jeni të sigurt që dëshironi të anuloni këtë porosi?",
                [
                  {
                    text: "Po",
                    onPress: () => anuloPorosin(),
                  },
                  {
                    text: "Jo",
                    onPress: () => {},
                    style: "cancel",
                  },
                ],
                { cancelable: false }
              )
            }
          />
        </View>
      </ScrollView>
    </View>
  );
}
