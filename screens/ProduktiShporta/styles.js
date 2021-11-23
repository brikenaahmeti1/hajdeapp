import { StyleSheet } from "react-native";
import { backgroundColor, black, textColor } from "../../styles/global";
export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: backgroundColor,
  },
  productContainer: {
    height: 180,
    justifyContent: "flex-end",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  backButton: {
    position: "absolute",
    top: 35,
    left: 10,
  },
  nameContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    height: 80,
    width: 80,
    borderRadius: 80,
    backgroundColor: "#D8D8D8",
    resizeMode: "cover",
  },
  name: {
    color: textColor,
    fontFamily: "Avenire-Regular",
    paddingTop: 5,
  },

  descriptionContainer: {
    justifyContent: "flex-start",
  },
  desContainer: {
    paddingTop: 40,
    paddingHorizontal: 20,
    justifyContent: "flex-start",
  },
  unitContainer: {
    paddingHorizontal: 20,
    justifyContent: "flex-start",
  },
  desTitle: {
    fontSize: 16,
    fontFamily: "Avenire-Regular",
    color: textColor,
    paddingTop: 8,
  },
  des: {
    fontFamily: "Avenire-Regular",
    color: black,
  },
  bottomContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  itemContainer: {
    display: "flex",
    flexDirection: "row",
    paddingTop: 30,
    paddingBottom: 20,
  },
  number: {
    paddingHorizontal: 15,
    fontSize: 18,
    fontFamily: "Avenire-Regular",
  },
});
