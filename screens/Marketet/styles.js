import { StyleSheet } from "react-native";
import {
  aquaSecondary,
  buttonColor,
  header,
} from "../../styles/global";
export default StyleSheet.create({
  pickerIconsContainer: {
    width: "95%",
    alignSelf: "center",
    flexDirection: "row",
    backgroundColor: buttonColor,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 30,
    alignItems: "center",
    marginBottom: 15,
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: "5%",
    width: "100%",
    borderTopColor: buttonColor,
    borderTopWidth: 1,
  },
  containerCard: {
    width: "95%",
    borderRadius: 6,
    backgroundColor: "#f6f6f6",
  },

  nameContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 80,
  },
  cardImg: {
    height:"100%",
    width: "100%",
    borderTopRightRadius:6,
  borderTopLeftRadius:6  },
  bottomCard: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: aquaSecondary,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderBottomRightRadius: 6,
    borderBottomLeftRadius: 6,
  },
  bottomCardItems: {
    display: "flex",
    flexDirection: "row",
  },
  text: {
    color: header,
    fontFamily: "Avenire-Bold",
  },
  icon: {
    paddingRight: 5,
  },
});
