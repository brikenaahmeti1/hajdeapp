import { StyleSheet } from "react-native";
import {
  backgroundColor,
  buttonColor,
  black,
  textColor,
  header,
} from "../../styles/global";

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: backgroundColor,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingBottom: 10,
  },
  searchBarcontainer: {
    backgroundColor: backgroundColor,
    borderBottomColor: "transparent",
    borderTopColor: "transparent",
    marginVertical: 10,
    width: "98%",
  },
  input: {
    borderRadius: 30,
    backgroundColor: "#EAECEF",
  },
  containerCard: {
    width: "90%",
    marginBottom: 15,
    backgroundColor: buttonColor,
    height: 100,
    borderRadius: 10,
    alignSelf: "center",
  },
  img: {
    width: "100%",
    height: 100,
    borderRadius: 10,
  },
  categorieContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  categorieName: {
    fontSize: 18,
    fontFamily: "Avenire-Bold",
    paddingRight: "55%",
    paddingLeft: 20,
    color: "#37393b",
    textTransform: "uppercase",
  },
  marketContainer: {
    height: 140,
    width: "100%",
    backgroundColor: "#D8D8D8",
    justifyContent: "center",
    alignItems: "center",
  },
  imgMarket: {
    height: "100%",
    width: "100%",
    backgroundColor: "#D8D8D8",
    resizeMode: "contain",
  },
});
