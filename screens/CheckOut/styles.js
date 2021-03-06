import { StyleSheet } from "react-native";
import {
  primary,
  black,
  buttonColor,
  backgroundColor,
  grayColor,
  textColor,
} from "../../styles/global";
export default StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingTop: 30,
    backgroundColor: backgroundColor,
  },
  title: {
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    color: black,
  },
  subTitle: {
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    color: buttonColor,
  },
  amountContainer: {
    display: "flex",
    flexDirection: "column",
    // alignItems: "center",
    // justifyContent: "space-between",
    backgroundColor: primary,
    padding: 15,
    borderRadius: 17,
    width: "100%",
    shadowColor: black,
    shadowOffset: {
      width: 5,
      height: 8,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  locationContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: primary,
    borderRadius: 17,
    width: "100%",
    shadowColor: black,
    shadowOffset: {
      width: 5,
      height: 8,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  paymentContainer: {
    marginTop: 20,
    backgroundColor: primary,
    padding: 15,
    borderRadius: 17,
    width: "100%",
    shadowColor: black,
    shadowOffset: {
      width: 5,
      height: 8,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  friendsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomColor: grayColor,
    borderBottomWidth: 0.5,
    paddingRight: 20,
  },
  itemsContainerLocation: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  itemsContainer: {
    display: "flex",
    flexDirection: "row",
    paddingTop: 10,
    alignItems: "center",
  },
  adressesContainer: {
    paddingVertical: 5,
    borderBottomColor: grayColor,
    borderBottomWidth: 0.5,
  },
  adressesName: {
    fontSize: 15,
    color: black,
    fontFamily: "Roboto-Regular",
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingTop: "10%",
    paddingBottom: 20,
  },
  containerCard: {
    width: "90%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
    alignSelf: "center",
    marginBottom: 15,
    backgroundColor: primary,
    shadowColor: black,
    padding:10,
    borderRadius: 15,
    shadowOffset: {
      width: 5,
      height: 8,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  quantityContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems:"center",
    paddingBottom:8
  },
  number: {
    paddingHorizontal: 5,
  },
  containerInfo: {
    display: "flex",
    flexDirection: "row",
  },
  cardImg: {
    height: 50,
    width: 50,
    resizeMode: "cover",
  },
  nameContainer: {
    paddingLeft: 15,
    width: 200,
  },
  name: {
    fontSize: 16,
    fontFamily: "Avenire-Bold",
    color: black,
    paddingBottom:10
  },
  price: {
    fontSize: 16,
    fontFamily: "Avenire-Regular",
    color: black,
    // paddingTop:20
  },
 
});
