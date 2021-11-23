import { StyleSheet } from "react-native";

// Global colors
export const primary = "#fff";
export const textColor = "#004E48";
export const backgroundColor = primary;
export const grayColor = "#dcdcdc";
export const buttonColor = "#00CCBB";
export const aqua = "#E7FDFB";
export const aquaPrimary = "#A8F9F2";
export const aquaSecondary = "#93F2EA";
export const header = "#004E48";
export const black = "#2d2d2d";

//Global style
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backgroundColor,
  },
  titleText: {
    paddingVertical: "10%",
    fontSize: 23,
    color: buttonColor,
    fontFamily: "Avenire-Regular",
  },
  textInput: {
    width: "100%",
    height: 40,
    borderColor: "#000",
    borderBottomWidth: 1.5,
    marginBottom: 15,
    fontSize: 16,
    textAlign: "auto",
  },
  textInput1: {
    width: "70%",
    height: 40,
    borderColor: "#000",
    borderBottomWidth: 1.5,
    marginBottom: 15,
    fontSize: 16,
    textAlign: "auto",
  },
  inputContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "100%",
  },
  prefixContainer: {
    borderBottomWidth: 1.5,
    height: 40,
    width: "25%",
    borderColor: "#000",
    marginRight: "5%",
    justifyContent: "center",
    alignItems: "center",
  },
  prefixText: {
    fontSize: 18,
  },
  inputTitle: {
    fontSize: 16,
    fontFamily: "Avenire-Regular",
  },
  eyeIcon: {
    position: "absolute",
    right: 20,
  },
  activityIndicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    textAlign: "center",
    color: header,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
  },
  emptyImage: {
    resizeMode: "contain",
  },
  message: {
    fontSize: 15,
    fontFamily: "Avenire-Regular",
    color: "#800000",
    textAlign: "center",
  },
  linkButton: {
    paddingVertical: 10,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: "Avenire-Regular",
    textDecorationLine: "underline",
  },
  manualisht: {
    width: "100%",
    height: 50,
    backgroundColor: primary,
    borderRadius: 10,
    fontSize: 16,
    textAlignVertical: "top",
    paddingLeft: 10,
    paddingTop: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
  note: {
    fontSize: 16,
    color: textColor,
    paddingVertical: 3,
  },
  picker: {
    marginTop: 10,
    marginBottom:10,
    paddingLeft: 5,
    paddingRight: 5,
    width: "100%",
    backgroundColor: primary,
    borderRadius: 10,
    fontSize: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
});
