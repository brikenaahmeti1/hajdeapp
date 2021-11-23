//External dependencies
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Platform,
  StyleSheet,
  SafeAreaView,
  StatusBar
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Formik } from "formik";
import * as Yup from "yup";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Header } from "react-native-elements";
// Internal dependencies
import ErrorMessage from "../../components/ErrorMessage";
import styles from "./styles";
import global, { primary, buttonColor, black } from "../../styles/global";
import { BackButton, LargeButton } from "../../components/Button/Button";
import axios from "axios";
import apiURL from "../../authentification/apiConstant";
import RNPickerSelect from "react-native-picker-select";
import { Ionicons } from "@expo/vector-icons";
import Messaging from "../Messaging";
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const validationSchema = Yup.object().shape({
  password: Yup.string()
    .label("Password")
    .required("Ju lutem shkruani fjalëkalimin")
    .min(6, "Fjalëkalimi duhet të jetë minimum 6 karaktere")
    .max(20, "Fjalëkalimi duhet të jetë maksimum 20 karaktere"),

  phone: Yup.string()
    .label("Phone")
    .required("Ju lutem shkruani numrin e telefonit")
    .matches(phoneRegExp, "Numri i telefonit nuk është valid")
    .min(8, "Numri i telefonit duhet të jetë minimum 8 karaktere")
    .max(15, "Numri duhet të jetë maksimum 15 karaktere")
    .nullable(true),
});
const items = [
  { label: "+355", value: "+355" },
  { label: "+383", value: "+383" },
];
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
export default function Login({ navigation }) {
  const [show, setShow] = React.useState(false);
  const [visible, setVisible] = React.useState(true);
  let [prefix, setPrefix] = React.useState("+355");
  let [fcmMessaging, setFcmMessaging] = useState(null);
  let [fcmRefresh, setFcmRefresh] = useState(null);

  const LoginAuthorization = async (value) => {
    try {
      const response = await axios.post(`${apiURL}/client/auth/login`, {
        phone: prefix + value.phone,
        password: value.password,
      });
      // console.log(
      //   {
      //     phone: prefix + value.phone,
      //     password: value.password,
      //   },
      //   "Login response:"
      // );
      const { refreshToken, token } = response.data;
      await AsyncStorage.setItem("@TOKEN", token);
      await AsyncStorage.setItem("@REFRESH_TOKEN", refreshToken);
      navigation.navigate("Homepage");
    } catch (err) {
      if (err.response.status === 403) {
        await sendSMS(value);
      } else {
        Alert.alert("Mesazhi", err.response.data.message, [
          { text: "Në rregull" },
        ]);
      }
      console.log(
        {
          phone: prefix + value.phone,
          password: value.password,
        },
        "Login response:"
      );
    }
  };
  const sendSMS = async (value) => {
    try {
      const response = await axios.post(
        `${apiURL}/verification/send-verification-phone-code`,
        {
          phone: prefix + value.phone,
        }
      );
      navigation.navigate("CodeVerificationRegister", { value });
    } catch (err) {
      // Alert.alert("Mesazhi", err.response.data.message, [
      //   { text: "Në rregull" },
      // ]);
    }
  };
  const hasNotifications = async () => {
    // try {
    //   const hasNotificationsPermissions =
    //     await Messaging.requestUserPermission();
    //   if (hasNotificationsPermissions) {
    //     fcmMessaging = await Messaging.saveFcmTokenToDb();
    //     fcmRefresh = await Messaging.onRefreshToken();
    //   }
    // } catch (err) {}
  };
  useEffect(() => {
    hasNotifications();
  }, []);
  return (
    <SafeAreaView style={global.container}>
      <StatusBar translucent backgroundColor="white" barStyle="dark-content" />
      <Header
        containerStyle={{
          backgroundColor: "transparent",
          borderBottomColor: "transparent",
          height: "15%",
          alignItems: "flex-end",
        }}
        placement="center"
        leftComponent={
          <BackButton onPress={() => navigation.navigate("Home")} />
        }
      />
      <Formik
        initialValues={{
          phone: "",
          password: "",
        }}
        onSubmit={(values) => {
          LoginAuthorization(values);
          // sendSMS(values);
        }}
        validationSchema={validationSchema}
      >
        {({
          handleChange,
          values,
          handleSubmit,
          errors,
          isValid,
          isSubmitting,
          touched,
          handleBlur,
        }) => (
          <View style={styles.container}>
            <Text style={global.titleText}>Kyçu</Text>
            <Text style={global.inputTitle}>Numri i telefonit</Text>
            <View style={global.inputContainer}>
              <View style={global.prefixContainer}>
                <RNPickerSelect
                  items={items}
                  useNativeAndroidPickerStyle={false}
                  onValueChange={(value) => setPrefix(value)}
                  // value={value}
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
              <TextInput
                name="Phone"
                label="Phone"
                value={values.phone}
                editable
                onChangeText={handleChange("phone")}
                onBlur={handleBlur("phone")}
                style={global.textInput1}
                keyboardType="numeric"
                maxLength={15}
              />
            </View>
            <ErrorMessage errorValue={touched.phone && errors.phone} />
            <Text style={global.inputTitle}>Fjalëkalimi</Text>
            <View style={global.inputContainer}>
              <TextInput
                name="password"
                label="password"
                value={values.password}
                editable
                onChangeText={handleChange("password")}
                maxLength={30}
                style={global.textInput}
                secureTextEntry={visible}
                autoCapitalize="none"
              />
              <TouchableOpacity
                style={global.eyeIcon}
                onPress={() => {
                  setVisible(!visible);
                  setShow(!show);
                }}
              >
                <MaterialCommunityIcons
                  name={show === false ? "eye-outline" : "eye-off-outline"}
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
            </View>
            <ErrorMessage errorValue={touched.password && errors.password} />
            <View style={styles.buttonsContainer}>
              <LargeButton
                title="Kyçuni"
                onPress={handleSubmit}
                disabled={!isValid}
                loading={isSubmitting}
              />
              <TouchableOpacity
                style={styles.linkButton}
                onPress={() => navigation.navigate("ChangePassword")}
              >
                <Text style={styles.buttonText}>
                  Keni harruar fjalëkalimin?
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
}
