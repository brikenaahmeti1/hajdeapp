import { StyleSheet } from "react-native";
import { backgroundColor, black, primary } from "../../styles/global";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: backgroundColor,
    paddingVertical: 10,
  },
  cardContainer: {
    width: "94%",
    alignSelf: "center",
    marginBottom: 5,
    marginTop: 5,
    backgroundColor: "#E8E8E8",
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
  },
  title: {
    fontSize: 18,
    color: "black",
    paddingTop: 5,
    fontFamily: "Roboto-Regular",
  },
  message: {
    fontSize: 18,
    fontFamily: "Roboto-Regular",
  },
  daysContainer: {
    position: "absolute",
    top: 5,
    right: 10,
  },
  days: {
    fontSize: 16,
    fontFamily: "Roboto-Regular",
  },
});
