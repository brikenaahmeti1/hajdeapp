//External dependencies
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  StatusBar
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { Header } from "react-native-elements";
// Internal dependencies
import ErrorMessage from "../../components/ErrorMessage";
import styles from "./styles";
import global from "../../styles/global";
import { BackButton, LargeButton } from "../../components/Button/Button";
import axios from "axios";
import apiURL from "../../authentification/apiConstant";

const validationSchema = Yup.object().shape({
  code: Yup.string()
    .label("Code")
    .required("Ju lutem shkruani kodin")
    .length(5, "Kodi duhet të ketë 5 karaktere"),
});

export default function CodeVerificationRegister({ navigation, route }) {
  const prefix = route?.params?.prefix;
  const phone = route?.params?.value.phone;
  const [count, setCount] = useState(0);
  const LoginAuthorization = async (value) => {
    try {
      const response = await axios.put(
        `${apiURL}/verification/verify-account`,
        {
          phone: prefix + phone,
          code: value.code,
          client: "HajdeApp",
        }
      );
      Alert.alert("Mesazhi", response.data.message, [{ text: "Në rregull" }]);
      navigation.navigate("Login");
    } catch (err) {
      Alert.alert("Mesazhi", err.response.data.message, [
        { text: "Në rregull" },
      ]);
    }
  };
  const sendCode = async () => {
    try {
      const response = await axios.post(
        `${apiURL}/verification/send-verification-phone-code`,
        {
          phone: prefix + phone,
        }
      );
      Alert.alert("Mesazhi", response.data.message, [{ text: "Në rregull" }]);
    } catch (err) {
      Alert.alert("Mesazhi", err.response.data.message, [
        { text: "Në rregull" },
      ]);
    }
  };
  const onClick = () => {
    setCount(count + 1);
  };
  return (
    <SafeAreaView style={global.container}>
      <StatusBar backgroundColor="transparent"/>
      <Header
        containerStyle={{
          backgroundColor: "transparent",
          borderBottomColor: "transparent",
          height: "15%",
          alignItems: "flex-end",
        }}
        placement="center"
        leftComponent={<BackButton onPress={() => navigation.goBack()} />}
      />
      <Formik
        initialValues={{
          code: "",
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
            <Text style={global.titleText}>Verifikoni llogarinë tuaj</Text>
            <Text style={global.inputTitle}>Kodi</Text>
            <View style={global.inputContainer}>
              <TextInput
                name="Code"
                label="Code"
                value={values.code}
                editable
                onChangeText={handleChange("code")}
                keyboardType="numeric"
                onBlur={handleBlur("code")}
                maxLength={15}
                style={global.textInput}
              />
            </View>
            <ErrorMessage errorValue={touched.code && errors.code} />
            <View style={styles.buttonsContainer}>
              <LargeButton
                title="Vazhdoni"
                onPress={handleSubmit}
                disabled={!isValid || isSubmitting}
                loading={isSubmitting}
              />
              {count >= 3 ? (
                <TouchableOpacity
                  style={styles.linkButton}
                  disabled={true}
                  onPress={() => {
                    sendCode();
                    onClick();
                  }}
                >
                  <Text style={styles.buttonText}>Ridërgoni kodin</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.linkButton}
                  onPress={() => {
                    sendCode();
                    onClick();
                  }}
                >
                  <Text style={styles.buttonText}>Ridërgoni kodin</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
}
