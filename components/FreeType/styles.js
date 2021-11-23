import { StyleSheet } from "react-native";
import {
  textColor,
  buttonColor,
  primary,
  grayColor,
} from "../../styles/global";
export default StyleSheet.create({
  container: {
    padding: 20,
  },
  itemContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: primary,
    minHeight: 40,
    paddingHorizontal: 15,
    paddingVertical: 13,
    borderBottomColor: grayColor,
    borderBottomWidth: 0.5,
  },
  item: {
    fontSize: 14,
    fontFamily: "Roboto-Regular",
    color: textColor,
  },
  buttonsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    color: textColor,
    paddingRight: 10,
  },
  number: {
    paddingHorizontal: 5,
    fontSize: 14,
    color: textColor,
  },
  addItemContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: primary,
    height: 40,
    paddingHorizontal: 15,
  },
  input: {
    textAlign: "left",
    width: "60%",
    fontSize: 16,
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  deleteBox: {
    backgroundColor: buttonColor,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 15,
    borderRadius: 10,
    fontFamily: "Avenire-Regular",
    minHeight: 40,
  },
});
