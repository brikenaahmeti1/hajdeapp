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
  containerSearch: {
    backgroundColor: backgroundColor,
    borderBottomColor: "transparent",
    borderTopColor: "transparent",
    marginVertical: 10,
  },
  input: {
    backgroundColor: "#e8f8f7",
    borderRadius: 30,
  },
  containerCard: {
    width: "45%",
    marginBottom: 15,
    backgroundColor: "#e8f8f7",
    borderRadius: 5,
    alignSelf: "flex-start",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical:5,
    marginRight: 15,
  },
  categorieName: {
    fontSize: 16,
    fontFamily: "Avenire-Regular",
    color: "#37393b",
    width:"80%"
  },
  img: { height: 30, width: 30 },
});
