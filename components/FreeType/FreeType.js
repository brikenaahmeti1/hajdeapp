//External dependencies
import React, { useState, useEffect } from "react";
import { View, Alert } from "react-native";
// Internal dependencies
import AddProduct from "./AddProduct";
import Product from "./Product";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function FreeType({ navigation }) {
  const [todos, setTodos] = useState([]);

 

  const pressHandler = (key) => {
    const _todos = todos.filter((todo) => todo.key !== key);
    setTodos(_todos);
   // AsyncStorage.setItem("@TODOS", JSON.stringify(_todos));
  };

  const submitHandler = (text) => {
    if (text.length > 2) {
      // setText("");
      const _todo = [...todos, { text, key: Math.random().toString(), num: 1 }];
      setTodos(_todo);
      //AsyncStorage.setItem("@TODOS", JSON.stringify(_todo));
    } else {
      Alert.alert("Mesazhi", "Produkti duhet të ketë më shumë se 2 karaktere", [
        { text: "Në rregull", onPress: () => {} },
      ]);
    }
  };
  const onAction = (num, index) => {
    todos[index].num = num;
    setTodos(todos);
    //AsyncStorage.setItem("@TODOS", JSON.stringify(todos));
  };
  // const items = todos.map((item, i) => ( 
  //   <Product
  //     key={i}
  //     index={i}
  //     item={item}
  //     pressHandler={pressHandler}
  //     onAction={onAction}
  //   />
  // ));
  return (
    <View>
      {/* {items} */}
      <AddProduct submitHandler={submitHandler} />
      {/* <View style={styles.buttonContainer}>
        <LargeButton
          title="Blej"
          onPress={() => (setTodos([]), navigation.navigate("Furnitoret"))}
        />
      </View> */}
    </View>
  );
}
 
