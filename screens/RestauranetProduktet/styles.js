import { StyleSheet } from "react-native";
import { backgroundColor, black, primary } from "../../styles/global";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  infoContainer: {
    alignItems: "flex-start",
    // paddingTop: 10,
    width: "100%",
    alignSelf: "center",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    position: "absolute",
    top: "15%",
    bottom:0,
    backgroundColor: "white",
  },
  infoInnerContainer: {
    flex:1,
    alignSelf: "center",
    width: "85%",
  },
  restoranTitleContainer:{
    backgroundColor:"#00cbbb",
    width:"100%",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50
  },
  restoranTitle: {
    fontSize: 25,
    color: "white",
    fontFamily: "Avenire-Bold",
    width: "85%",
    paddingTop:15,
    paddingBottom:5,
    fontWeight:"bold"
  },
  informations: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
    marginLeft: 5,
  },
  subTitle: {
    fontSize: 15,
    paddingLeft: 5,
  },
  timeContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
    marginLeft: 5,
  },
  time: { fontSize: 15, paddingLeft: 5 },
  date: { fontSize: 15, paddingLeft: 5, fontWeight: "bold" },
  currency: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
    marginLeft: 5,
  },
  img: {
    flex: 0.4,
    resizeMode: "center",
    width: "100%",
  },
  backButton: {
    position: "absolute",
    left: 20,
    top: 25,
  },
  categoriesContainer: {
    width: "100%",
    flexDirection: "row",
    paddingTop: 10,
    backgroundColor: "white",
    alignSelf: "center",
  },
  quantityContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 5,
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
  },
  containerCard: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    alignSelf: "center",
    marginBottom: 10,
    marginTop: 10,
    backgroundColor: primary,
    shadowColor: black,
    shadowOffset: {
      width: 4,
      height: 8,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    marginTop: 15,
    display: "flex",
    flexDirection: "row",
    padding: 10,
    borderRadius: 10,
    borderColor:"#00cbbb",
    borderWidth:1
  },
  // containerCard: {
  //   width: "100%",
  //   alignSelf: "center",
  //   marginBottom: 10,
  //   borderRadius: 10,
  //   backgroundColor: primary,
  //   shadowColor: black,
  //   shadowOffset: {
  //     width: 5,
  //     height: 8,
  //   },
  //   shadowOpacity: 0.25,
  //   shadowRadius: 8,
  //   elevation: 8,
  //   marginTop: 15,
  //   display: "flex",
  //   flexDirection: "row",
  //   padding: 10,
  // },
  number: {
    paddingHorizontal: 5,
  },
  cardImg: {
    height: 70,
    width: 90,
    resizeMode: "cover",
  },
  nameContainer: {
    paddingLeft: 3,
    width:120
  },
  name: {
    fontSize: 14,
    fontFamily: "Avenire-Regular",
    color:"#00cbbb",
    fontWeight:"bold"
  },
  bottomCardInfo: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 15,
  },
  addProductsContainer: { flexDirection: "row", alignItems: "center" },
  price: {
    fontSize: 14,
    fontFamily: "Avenire-Regular",
    color:"#00cbbb",
    paddingTop: 12,
  },
  bannerContainer:{
    paddingLeft:10
  },
  ofertaImage:{
    height:100,
    width:100,
    justifyContent:"flex-start",
    alignItems:"center",
    textAlign:"center",
    paddingBottom:10
  },
  bannerTitleBottomTitle:{
    color:"white",
    fontSize:16,
  },
  ofertPrice:{
    fontSize:18,
    fontWeight:"bold",
    color:"white"
  },
  bottomContainer:{display:"flex",flexDirection:"row",alignSelf:"center",backgroundColor:"#00cbbb",width:"100%",borderTopRightRadius:30,borderTopLeftRadius:30,justifyContent:"space-around", alignItems:"center",paddingVertical:5},
  shportaImg:{
    height:30,
    width:30,
    resizeMode:"contain"
  }
});
