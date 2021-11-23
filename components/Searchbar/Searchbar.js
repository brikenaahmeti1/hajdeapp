import React, { useState } from "react";
import { SearchBar } from "react-native-elements";
import styles from "./styles";
export default function Searchbar(props) {
  const [value, onChangeText] = useState("");

  return (
    <SearchBar
      placeholder="Kërko"
      lightTheme
      round
      containerStyle={styles.container}
      inputContainerStyle={styles.input}
      onChangeText={text => {
        props.onSubmitEditing(text)
        onChangeText(text)
      }}
      value={value}
      onSubmitEditing={() => props.onSubmitEditing(value)}
    />
  );
}
