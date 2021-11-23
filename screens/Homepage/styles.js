import { StyleSheet, Platform } from "react-native";
import { buttonColor } from "../../styles/global";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: buttonColor,
    // display: "flex",
    // flexDirection: "column",
  },
  logo: {
    height: "20%",
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 30,
  },
  searchContainer: {
    height: "20%",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  notificationIcon:
  {
    ...Platform.select({
      ios: {
        position: "absolute",zIndex:2, right: 20, top: 50
      },
      android: {
        position: "absolute",right: 20, top: 40
      },
    }),
  },
  searchTxtInput:{
    ...Platform.select({
      ios: {
        width: "85%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: 30,
        paddingHorizontal: 50,
        paddingVertical:10,
        backgroundColor: "white",
      },
      android: {
        width: "85%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: 30,
        paddingHorizontal: 50,
        backgroundColor: "white",
      },
    }),
  },
  buttonsContainer: {
    height: "50%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    zIndex:2
  },
  buttonButtos: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  containerModal: {
    alignItems: "center",
    backgroundColor: "#ede3f2",
    padding: 100,
  },
  modal: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f7021a",
    padding: 100,
  },
  text: {
    color: "#3f2949",
    marginTop: 10,
  },
});
