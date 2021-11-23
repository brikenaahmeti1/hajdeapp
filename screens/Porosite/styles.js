import { StyleSheet } from "react-native";
import { buttonColor, primary, textColor } from "../../styles/global";
export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
  },
  text: {
    fontSize: 16,
    fontFamily: "Avenire-Regular",
    color: textColor,
    paddingLeft: 10,
    paddingBottom: 3,
  },
  cardContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: primary,
    borderRadius: 10,
    width: "95%",
    alignSelf: "center",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
  content: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },

  cardText: {
    paddingLeft: 8,
  },
  name: {
    fontSize: 15,
    fontFamily: "Avenire-Regular",
    color: textColor,
  },
  date: {
    color: buttonColor,
    paddingTop: 5,
    fontSize: 14,
  },
  picker: {
    width: "100%",
    alignSelf: "center",
    paddingHorizontal: 15,
    paddingTop: 10,
  },
});
