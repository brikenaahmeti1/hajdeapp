import { StyleSheet } from "react-native";
import { backgroundColor, black, textColor, buttonColor } from "../../styles/global";

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: backgroundColor,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingBottom: 10,
  },
  marketContainer: {
    height: 140,
    width: "100%",
    backgroundColor: "#D8D8D8",
    justifyContent: "center",
    alignItems: "center",
  },
  savedImg: {
    paddingRight: 10,
  },
  img: {
    height: 100,
    width: 150,
    backgroundColor: "#D8D8D8",
    resizeMode: "contain",
  },
  marketTitile: {
    fontSize: 24,
    fontFamily: "Avenire-Regular",
    color: textColor,
    paddingTop: 5,
    textAlign: "center",
  },

  searchBarcontainer: {
    backgroundColor: backgroundColor,
    borderBottomColor: "transparent",
    borderTopColor: "transparent",
    marginVertical: 10,
    width: "98%",
  },
  input: {
    borderRadius: 30,
    backgroundColor: "#EAECEF",
  },
  subCatContainer: {
    width: "100%",
    paddingLeft: 10,
    borderBottomWidth: 1,
    borderBottomColor: buttonColor,
    paddingBottom: 15,
    flexDirection:"row"
  },
  titile: {
    fontSize: 20,
    fontFamily: "Avenire-Regular",
    color: textColor,
   
  },
  containerCard: {
    width: "90%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    alignSelf: "center",
    marginBottom: 15,
  },
  quantityContainer:{
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
    height: 60,
    width: 60,
    resizeMode: "cover",
  },
  nameContainer: {
    paddingLeft: 15,
    width: 200,
    // flexDirection:"column",
    // justifyContent:"space-between"
  },
  name: {
    fontSize: 16,
    fontFamily: "Avenire-Regular",
    color: textColor,
  },
  price: {
    fontSize: 14,
    fontFamily: "Avenire-Regular",
    color: black,
  },
  bottomContainer:{display:"flex",flexDirection:"row",alignSelf:"center",backgroundColor:"#00cbbb",width:"100%",borderTopRightRadius:30,borderTopLeftRadius:30,justifyContent:"space-around", alignItems:"center",paddingVertical:5},
  shportaImg:{
    height:30,
    width:30,
    resizeMode:"contain"
  }
});
