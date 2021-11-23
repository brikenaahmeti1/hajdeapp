//External dependencies
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Modal,
  StatusBar
} from "react-native";
import moment from "moment";
import { Header } from "react-native-elements";
// Internal dependencies
import styles from "./styles";
import global, {
  buttonColor,
  primary,
  header,
  black,
} from "../../styles/global";
import { BackButton } from "../../components/Button/Button";
import axiosApiInstance from "../../authentification/request/request";

export default function Notifications({ navigation }) {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [fetchMore, setFetchMore] = useState(true);
  const [hasMoreItems, setHasMoreItems] = useState(true);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  const getNotifications = async () => {
    if (!fetchMore) return null;
    const response = await axiosApiInstance.get(
      `/notifications/get-notifications/${page}`
    );
    setData([...data, ...response.data]);
    setHasMoreItems(response.data.length !== 0);
    setFetchMore(true);
    setPage(page + 1);
    setLoading(false);
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getNotifications();
    });
    return unsubscribe;
  }, [page, fetchMore, navigation]);

  const loadMore = () => {
    if (hasMoreItems) {
      setFetchMore(true);
      getNotifications();
    } else {
      setFetchMore(false);
    }
  };

  const _renderFooter = () => {
    if (hasMoreItems && fetchMore) {
      return <ActivityIndicator animating size="large" color={buttonColor} />;
    }
    return null;
  };
  const seenNotification = async ({ id }) => {
    const response = await axiosApiInstance.patch(
      `/notifications/mark-as-read/${id}`
    );
    if (response.status === 201 || response.status === 200) {
      const seenNotifications = data?.map((notification, index) => {
        if (notification._id === id) {
          return {
            ...notification,
            isSeen: true,
          };
        } else {
          return {
            ...notification,
          };
        }
      });
      setData(seenNotifications);
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <StatusBar backgroundColor="transparent" />
      <Header
        containerStyle={{
          backgroundColor: primary,
          borderBottomWidth: 1,
        }}
        placement="center"
        leftComponent={
          <BackButton onPress={() => navigation.navigate("Homepage")} />
        }
        centerComponent={{
          text: "Njoftimet",
          style: {
            color: header,
            fontSize: 20,
            fontFamily: "Avenire-Regular",
          },
        }}
      />
      <View style={styles.container}>
        {loading ? (
          <View style={global.activityIndicator}>
            <ActivityIndicator size="large" color={buttonColor} />
          </View>
        ) : data.length === 0 ? (
          <View style={global.activityIndicator}>
            <Text style={global.emptyText}>Për momentin nuk ka njoftime</Text>
          </View>
        ) : (
          <FlatList
            style={{ width: "100%", alignSelf: "center", paddingBottom: 20 }}
            keyExtractor={(item, i) => i.toString()}
            data={data}
            renderItem={({ item, i }) => {
              return item?.isSeen === true ? (
                <View
                  style={[styles.cardContainer, { backgroundColor: "white" }]}
                >
                  <Text style={[styles.title, { color: "gray" }]}>
                    {item.title}
                  </Text>
                  <Text style={styles.message}>{item.message}</Text>
                  <View style={styles.daysContainer}>
                    <Text style={styles.days}>
                      {moment(item?.createdAt).fromNow()}
                    </Text>
                  </View>
                </View>
              ) : (
                <View>
                  <Pressable
                    onPress={() => {
                      setModalVisible(true);
                      seenNotification({ id: item?._id });
                    }}
                  >
                    <View style={styles.cardContainer}>
                      <Text style={styles.title}>{item.title}</Text>
                      <Text style={styles.message}>{item.message}</Text>
                      <View style={styles.daysContainer}>
                        <Text style={styles.days}>
                          {moment(item?.createdAt).fromNow()}
                        </Text>
                      </View>
                    </View>
                  </Pressable>
                  <Modal
                    style={{ backgroundColor: "pink" }}
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                      setModalVisible(!modalVisible);
                    }}
                  >
                    <View style={styles1.centeredView}>
                      <View style={styles1.modalView}>
                        <Text style={styles1.title}>{item?.title}</Text>
                        <Text style={styles1.message}>{item?.message}</Text>
                        <Pressable
                          onPress={() => {
                            setModalVisible(!modalVisible);
                          }}
                        >
                          <Text style={styles1.button}>Mbyll</Text>
                        </Pressable>
                      </View>
                    </View>
                  </Modal>
                </View>
              );
            }}
            onEndReached={loadMore}
            ListFooterComponent={_renderFooter}
            onEndReachedThreshold={0.3}
          />
        )}
      </View>
    </View>
  );
}

const styles1 = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.1)",
  },
  modalView: {
    backgroundColor: "white",
    width: "80%",
    height: "35%",
    backgroundColor: primary,
    shadowColor: black,
    shadowOffset: {
      width: 4,
      height: 8,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    padding: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontFamily: "Avenire-Regular",
    paddingVertical: 15,
  },
  message: {
    fontSize: 18,
    fontFamily: "Avenire-Regular",
    paddingVertical: 15,
    color: black,
  },
  button: {
    fontSize: 22,
    fontFamily: "Avenire-Regular",
    paddingVertical: 15,
  },
});
