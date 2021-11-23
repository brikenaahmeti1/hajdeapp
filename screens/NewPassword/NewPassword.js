//External dependencies
import React from "react";
import {
  View,
  Text,
  TextInput,
  StatusBar,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Header } from "react-native-elements";
// Internal dependencies
import ErrorMessage from "../../components/ErrorMessage";
import styles from "./styles";
import global from "../../styles/global";
import { BackButton, LargeButton } from "../../components/Button/Button";
import axios from "axios";
import apiURL from "../../authentification/apiConstant";

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .label("Password")
    .required("Ju lutem shkruani fjalëkalimin")
    .min(6, "Fjalëkalimi duhet të jetë minimum 6 karaktere")
    .max(20, "Fjalëkalimi duhet të jetë maksimum 20 karaktere"),
  changepassword: Yup.string()
    .when("password", {
      is: (val) => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf(
        [Yup.ref("password")],
        "Fjalëkalimet duhet të jenë të njejta"
      ),
    })
    .required("Ju lutem shkruani fjalëkalimin"),
});

export default function NewPassword({ navigation, route }) {
  const phone = route?.params?.phone;
  const resetToken = route?.params?.response.data;
  const [show, setShow] = React.useState(false);
  const [visible, setVisible] = React.useState(true);

  const LoginAuthorization = async (value) => {
    try {
      const response = await axios.put(`${apiURL}/recovery/change-password`, {
        phone: "+383" + phone,
        client: "HajdeApp",
        resetToken: resetToken.resetToken,
        password: value.changepassword,
      });
      Alert.alert("Mesazhi", response.data.message, [
        { text: "Në rregull", onPress: () => navigation.navigate("Login") },
      ]);
    } catch (err) {
      Alert.alert("Mesazhi", err.response.data.message, [
        { text: "Në rregull" },
      ]);
    }
  };

  return (
    <View style={global.container}>
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
          <BackButton onPress={() => navigation.navigate("CodeVerification")} />
        }
      />
      <Formik
        initialValues={{
          password: "",
          changepassword: "",
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
            <Text style={global.titleText}>Shkruani fjalëkalimin e ri </Text>
            <Text style={global.inputTitle}>Fjalëkalimi i ri</Text>
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
            <Text style={global.inputTitle}>Konfirmo fjalëkalimin e ri</Text>
            <View style={global.inputContainer}>
              <TextInput
                name="changepassword"
                label="changepassword"
                value={values.changepassword}
                editable
                onChangeText={handleChange("changepassword")}
                maxLength={30}
                style={global.textInput}
                secureTextEntry={visible}
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

            <ErrorMessage
              errorValue={touched.changepassword && errors.changepassword}
            />
            <View style={styles.buttonsContainer}>
              <LargeButton
                title="Ndrysho"
                onPress={handleSubmit}
                disabled={!isValid || isSubmitting}
                loading={isSubmitting}
              />
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
}
