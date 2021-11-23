//External dependencies
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  Alert,
  StyleSheet,
  StatusBar
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { Header } from "react-native-elements";
// Internal dependencies
import ErrorMessage from "../../components/ErrorMessage";
import styles from "./styles";
import global, { black } from "../../styles/global";
import { BackButton, LargeButton } from "../../components/Button/Button";
import axios from "axios";
import apiURL from "../../authentification/apiConstant";
import RNPickerSelect from "react-native-picker-select";
import { Ionicons } from "@expo/vector-icons";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const validationSchema = Yup.object().shape({
  phone: Yup.string()
    .label("Phone")
    .required("Ju lutem shkruani numrin e telefonit")
    .matches(phoneRegExp, "Numri i telefonit nuk është valid")
    .nullable(true)
    .min(6, "Numri duhet të ketë minimum 6 karaktere")
    .max(15, "Numri duhet të ketë maksimum 15 karaktere"),
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
export default function ChangePassword({ navigation, route }) {
  let [prefix, setPrefix] = React.useState("+355");
  const LoginAuthorization = async (value) => {
    try {
      const response = await axios.post(`${apiURL}/recovery/send-reset-phone`, {
        phone: `${prefix}${value.phone}`,
        client: "HajdeApp",
      });

      navigation.navigate("CodeVerification", { value, prefix });
    } catch (err) {
      Alert.alert("Mesazhi", err.response.data.message, [
        { text: "Në rregull" },
      ]);
    }
  };

  return (
    <SafeAreaView style={global.container}>
      <StatusBar color="transparent" />
      <Header
        containerStyle={{
          backgroundColor: "transparent",
          borderBottomColor: "transparent",
          height: "15%",
          alignItems: "flex-end",
        }}
        placement="center"
        leftComponent={
          <BackButton onPress={() => navigation.navigate("Login")} />
        }
      />
      <Formik
        initialValues={{
          phone: "",
          // prefix: "+355",
        }}
        onSubmit={(values) => {
          LoginAuthorization(values);
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
            <Text style={global.titleText}>Shkruani numrin e telefonit</Text>
            <Text style={global.inputTitle}>Telefoni</Text>
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
            <View style={styles.buttonsContainer}>
              <LargeButton
                title="Vazhdoni"
                onPress={handleSubmit}
                disabled={!isValid || isSubmitting}
                loading={isSubmitting}
              />
            </View>
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
}
