import React, { useState, useEffect } from "react";
import { Text, View, TextInput, FlatList, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import global, { black } from "../../styles/global";
import axiosApiInstance from "../../authentification/request/request";
import { TouchableOpacity } from "react-native";

export default function HomepageSearch() {
  const navigation = useNavigation();
  let [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const SearchComponent = async (search) => {
    setSearch(search);
    const response = await axiosApiInstance.get(
      `/basket/search?name=${search}`
    );
    if (search.length === 0) {
      setData([]);
    } else {
      setData(response.data.result);
    }
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener(
      "focus",
      () => {
        // setData([]);
        setSearch("");
      },
      []
    );
    return unsubscribe;
  }, [navigation]);
  return (
    <View
      style={{
        flex: 1,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          width: "85%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
          borderRadius: 30,
          paddingHorizontal: 20,
          backgroundColor: "white",
        }}
      >
       <View style={{width:"95%"}}> 
       <TextInput
          placeholder="Çfarë ju duhet?"
          label="city name"
          value={search}
          onChangeText={(search) => SearchComponent(search)}
        /></View>
        <AntDesign name="search1" size={20} color={black} />
      </View>
      {search?.length === 0 ? null : (
        <FlatList
          keyExtractor={(item, i) => i.toString()}
          style={{
            flexGrown: 1,
            position: "absolute",
            top: "80%",
            // left:20,
            // right:20,
            backgroundColor: "white",
            width: "85%",
            borderRadius: 20,
            // elevation: 3,
            zIndex: 10,
            height: 300,
          }}
          data={data}
          ListEmptyComponent={() => (
            <View style={{ height: 200 }}>
              <Text style={[global.emptyText, { paddingTop: "40%" }]}>
                Nuk ka të dhëna
              </Text>
            </View>
          )}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                key={item?._id}
                onPress={() =>
                  item?.type === "product"
                    ? navigation.navigate("Produkti", { item })
                    : item?.type === "market"
                    ? navigation.navigate("Kategorite", {
                        marketID: item?._id,
                        item,
                        isSaved: item?.saved,
                        city:item?.city
                      })
                    : item?.type === "restaurant"
                    ? navigation.navigate("RestauranetProduktet", {
                        restoranId: item?._id,
                      })
                    : navigation.navigate("Restauranet")
                }
                style={{
                  display: "flex",
                  flexDirection: "row",
                  padding: 5,
                  margin: 8,
                  alignItems: "center",
                }}
              >
                <View>
                  <Image
                    source={{ uri: item?.imageURL }}
                    style={{ height: 50, width: 50, resizeMode: "contain" }}
                  />
                </View>
                <View style={{ display: "flex", flexDirection: "column" }}>
                  <Text
                    style={{
                      paddingLeft: 10,
                      fontSize: 16,
                    }}
                  >
                    {item?.name}
                  </Text>
                  <Text
                    style={{
                      paddingLeft: 10,
                      fontSize: 16,
                      fontWeight: "bold",
                    }}
                  >
                    {item?.description}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      )}
    </View>
  );
}
