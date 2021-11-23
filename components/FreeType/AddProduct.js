//External dependencies
import React, { useState } from "react";
import { View, TextInput, Alert } from "react-native";
// Internal dependencies
import { QuickButton } from "../Button/Button";
import styles from "./styles";
import axiosApiInstance from "../../authentification/request/request";

export default function AddProduct({ callback, manualdata }) {
  const [text, setText] = useState("");
  const [num, setNum] = useState(1);
  const [disabled, setDisabled] = useState(false);

  const changeHandler = (val) => {
    if (disabled) {
      setDisabled(false);
    }
    setText(val);
  };

  const onSubmit = async () => {
    const alreadyExist = manualdata?.find((item) => {
      if (item.name === text) {
        
        Alert.alert("Mesazhi", "Ky produkt tashmë është shtuar në shportë", [
          { text: "Në rregull" },
        ]);
        setDisabled(true);
        return true;
      }
    });

    if(alreadyExist) return;

    if (text.length > 2) {
      try {
        const response = await axiosApiInstance.post(
          `/basket/add-text-product`,
          {
            name: text,
            quantity: num,
          }
        );

      } catch (e) {
        Alert.alert("Mesazhi", e.response.data.message, [
          { text: "Në rregull" },
        ]);
      }
      setText("");
    } else {
      Alert.alert("Mesazhi", "Produkti duhet të ketë më shumë se 2 karaktere", [
        { text: "Në rregull", onPress: () => {} },
      ]);
    }
    callback();
  };

  return (
    <View style={styles.addItemContainer}>
      <TextInput
        style={styles.input}
        placeholder="Shto produktin"
        onChangeText={changeHandler}
        value={text}
        multiline
        numberOfLines={200}
      />

      <QuickButton
        disabled={disabled}
        onPress={() => {
          onSubmit();
        }}
        title="Shto"
      />
    </View>
  );
}
