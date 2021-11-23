//External dependencies
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Header } from "react-native-elements";
import { AppEventsLogger } from "react-native-fbsdk-next";
// Internal dependencies
import ErrorMessage from "../../components/ErrorMessage";
import styles from "./styles";
import global, { black } from "../../styles/global";
import { LargeButton, BackButton } from "../../components/Button/Button";
import axios from "axios";
import apiURL from "../../authentification/apiConstant";
import RNPickerSelect from "react-native-picker-select";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const validationSchema = Yup.object().shape({
  phone: Yup.string()
    .label("Phone")
    .required("Ju lutem shkruani numrin e telefonit")
    .matches(phoneRegExp, "Numri i telefonit nuk është valid")
    .nullable(true)
    .max(15, "Numri duhet të jetë maksimum 15 karaktere")
    .min(8, "Numri duhet të jetë minimum 8 karaktere"),

  name: Yup.string()
    .label("Name")
    .required("Ju lutem shkruani emrin")
    .max(30, "Emri duhet të jetë maksimum 30 karaktere")
    .matches(/[a-zA-Z]/, {
      message: "Emri duhet të jetë vetëm shkronja dhe pa hapësirë",
    })
    .nullable(true),
  surname: Yup.string()
    .label("Surname")
    .required("Ju lutem shkruani mbiemrin")
    .max(30, "Mbiemri duhet të jetë maksimum 30 karaktere")
    .matches(/[a-zA-Z]/, {
      message: "Mbiemri duhet të jetë vetëm shkronja dhe pa hapësirë",
    }),
  password: Yup.string()
    .label("Password")
    .required("Ju lutem shkruani fjalëkalimin")
    .min(6, "Fjalëkalimi duhet të jetë minimum 6 karaktere")
    .max(20, "Fjalëkalimi duhet të jetë maksimum 20 karaktere")
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
export default function Register({ navigation }) {
  const [show, setShow] = React.useState(false);
  const [visible, setVisible] = React.useState(true);
  let [prefix, setPrefix] = React.useState("+355");

  const RegisterForm = async (value) => {
    try {
      const response = await axios.post(`${apiURL}/client/auth/register`, {
        firstName: value.name,
        lastName: value.surname,
        phone: prefix + value.phone,
        password: value.password,
      });
      Alert.alert("Mesazhi", "Llogaria u regjistrua me sukses", [
        {
          text: "Në rregull",
          onPress: await sendSMS(value),
        },
      ]);
      AppEventsLogger.logEvent("user_registered", { registerdate: "test 123" });
    } catch (err) {
      Alert.alert("Mesazhi", err.response.data.message, [
        { text: "Në rregull" },
      ]);
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
      Alert.alert("Mesazhi", err.response.data.message, [
        { text: "Në rregull" },
      ]);
    }
  };
  return (
    <SafeAreaView style={global.container}>
      <StatusBar backgroundColor="transparent" />
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
          name: "",
          surname: "",
          password: "",
        }}
        onSubmit={(values) => {
          RegisterForm(values);
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
          <ScrollView>
            <View style={styles.container}>
              <Text style={global.titleText}>Regjistrohu</Text>
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
                  onChangeText={handleChange("phone")}
                  onBlur={handleBlur("phone")}
                  style={global.textInput1}
                  keyboardType="numeric"
                  maxLength={15}
                />
              </View>
              <ErrorMessage errorValue={touched.phone && errors.phone} />
              <Text style={global.inputTitle}>Emri</Text>
              <TextInput
                name="Name"
                label="Name"
                value={values.name}
                onChangeText={handleChange("name")}
                onBlur={handleBlur("name")}
                style={global.textInput}
                maxLength={30}
                autoCapitalize="words"
              />
              <ErrorMessage errorValue={touched.name && errors.name} />
              <Text style={global.inputTitle}>Mbiemri</Text>
              <TextInput
                name="Surname"
                label="Surname"
                value={values.surname}
                onChangeText={handleChange("surname")}
                onBlur={handleBlur("surname")}
                style={global.textInput}
                maxLength={30}
                autoCapitalize="words"
              />
              <ErrorMessage errorValue={touched.surname && errors.surname} />
              <Text style={global.inputTitle}>Fjalëkalimi</Text>
              <View style={global.inputContainer}>
                <TextInput
                  name="Password"
                  label="Password"
                  value={values.password}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  style={global.textInput}
                  maxLength={20}
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
              <View style={styles.buttonContainer}>
                <LargeButton
                  title="Regjistrohu"
                  onPress={handleSubmit}
                  disabled={!isValid || isSubmitting}
                  loading={isSubmitting}
                />
              </View>
            </View>
          </ScrollView>
        )}
      </Formik>
    </SafeAreaView>
  );
}
