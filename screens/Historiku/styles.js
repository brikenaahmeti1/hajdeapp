import { StyleSheet } from "react-native";
import { grayColor, header } from "../../styles/global";
export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 15,
  },
  containerCard: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  cardList: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
    borderTopColor: grayColor,
    borderTopWidth: 0.5,
    borderBottomColor: grayColor,
    borderBottomWidth: 0.5,
  },
  containerInfo: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingVertical: 10,
  },

  cardImg: {
    height: 40,
    width: 40,
  },
  nameContainer: {
    paddingLeft: 15,
  },
  day: {
    fontSize: 12,
    fontFamily: "Roboto-Regular",
    color: "#000",
  },
  des: {
    fontSize: 10,
    color: "#A7A7A7",
    fontFamily: "Roboto-Regular",
  },
  buttonContainer: {
    width: "100%",
    borderBottomColor: grayColor,
    borderBottomWidth: 0.5,
    width: "100%",
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
  picker: {
    width: "100%",
    alignSelf: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius:30
  },
});
