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
    // flexDirection: "column",
    backgroundColor: backgroundColor,
    // justifyContent: "flex-start",
    // alignItems: "center",
    paddingBottom: 10,
  },
  allContainer: {
    width: "90%",
    display: "flex",
    alignItems: "flex-end",
    paddingBottom: 10,
    marginBottom: 5,
  },
  allButton: {
    backgroundColor: backgroundColor,
    borderWidth: 1,
    borderColor: buttonColor,
    paddingHorizontal: 5,
    paddingVertical: 3,
    borderRadius: 15,
    alignItems: "center",
    width: 100,
  },
  allButtonTitle: {
    fontSize: 15,
    fontFamily: "Avenire-Regular",
    color: black,
    textAlign: "center",
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
  categoriesContainer: {
    width: "95%",
    paddingBottom: 15,
    flexDirection: "row",
    paddingLeft:10
  },
  categorieButton: {
    paddingRight: 10,
  },
  containerCard: {
    width: "100%",
    height: 100,
    borderRadius: 8,
    alignSelf: "center",
  },
  img: {
    width: "100%",
    height: 100,
    borderRadius: 10,
    borderRadius: 10,
  },
  categorieContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  categorieName: {
    fontSize: 30,
    fontFamily: "Montserrat-SemiBold",
    color: "white",
    textTransform: "uppercase",
  },
  infoContainer: {
    width: "100%",
    alignSelf: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop:3,
    paddingBottom:10
  },
  infoRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  leftInfo: {
    paddingLeft: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  infoText: {
    fontSize: 16,
    fontFamily: "Avenire-Regular",
    paddingRight: 5,
  },
  clockInfo: {
    fontSize: 16,
    fontFamily: "Avenire-Regular",
    fontWeight: "bold",
    marginLeft: 0,
  },
  categorieContainerDisabled: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  categorieNameDisabled: {
    fontSize: 20,
    fontFamily: "Montserrat-Regular",
    color: "white",
  },
  leftInfoDisabled: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    // alignItems:"center"
  },
  infoContainerDisabled: {
    width: "100%",
    alignSelf: "center",
    display: "flex",
    flexDirection: "column",
    // alignItems: "flex-start",
    marginBottom: 20,
  },

  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  marketContainer: {
    height: 140,
    width: "100%",
    backgroundColor: "#D8D8D8",
    justifyContent: "center",
    alignItems: "center",
  },
  imgMarket: {
    height: 100,
    width: 150,
    backgroundColor: "#D8D8D8",
    resizeMode: "contain",
  },
});
