import { StyleSheet } from "react-native";
import { buttonColor, backgroundColor } from "../../styles/global";
export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: backgroundColor,
  },
  image: {
    height: 200,
    width: 300,
  },
  title: {
    fontSize: 17,
    fontWeight: "600",
    fontFamily: "Avenire-Regular",
    color: buttonColor,
    paddingTop:20
  },
  subTitle: {
    fontSize: 15,
    fontFamily: "Avenire-Regular",
    textAlign: "center",
    paddingHorizontal: 25,
    paddingVertical: 25,
  },
  button: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
});
