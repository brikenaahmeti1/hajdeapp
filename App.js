import React, { useEffect, useState } from 'react';
import SplashScreen from 'react-native-splash-screen'
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  Image,
  Platform,
  View,
} from 'react-native';

import { MarketContext, RestoranContext } from "./MarketContext";
import { NavigationContainer } from "@react-navigation/native";
import SplashScreenComp from './screens/SplashScreen';
import { createStackNavigator, createNativeStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import messaging from "@react-native-firebase/messaging";
import PushNotification from "react-native-push-notification";
import { Settings } from "react-native-fbsdk-next";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import axios from "axios";
import apiURL from './authentification/apiConstant'
import NavigationStack from './navigation/Navgation';

const SplashStack = createStackNavigator()

const fetchFont = () => {
  return Font.loadAsync({
    "Avenire-Regular": require("./assets/fonts/Avenir-Roman.ttf"),
    "Avenire-Bold": require("./assets/fonts/FontsFree-Net-AvenirLTStd-Heavy.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Montserrat-Regular": require("./assets/fonts/Montserrat-Regular.ttf"),
    "Montserrat-SemiBold": require("./assets/fonts/Montserrat-SemiBold.ttf"),
  });
};



export default function App(navigation) {
  const [showSplash, setShowSplash] = useState(true)
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [hideSplashScreen, setHideSplashScreen] = useState(false)
  const [data, setData] = useState("");
  const [version, setVersion] = useState("");
  Settings.initializeSDK();

  useEffect(async () => {
    setVersion(Platform.OS === "ios" ? "3.1.7" : "3.1.11");
    try {
      const response = await axios.post(`${apiURL}/versioning/updated`, {
        os: Platform.OS,
        version: version,
        platform: "hajdeapp",
      });
      setData(response.data.isUpToDate);
      console.log(response.data, "data nga usestate")
     
    } catch (err) {

    }
    SplashScreen.hide();
    setHideSplashScreen(true)

  }, [])

  useEffect(() => {
    if (hideSplashScreen) {
      console.log('here')
      setTimeout(
        () => setShowSplash(false),
        3100
      );
    }
  }, [hideSplashScreen])

  if (!fontsLoaded) {
    return (
      <AppLoading
        startAsync={fetchFont}
        onError={() => console.log("Error")}
        onFinish={() => {
          setFontsLoaded(true);
        }}
      />
    );
  }

  const onMessageReceived = (notification) => {
    PushNotification.localNotification({
      message: notification?.notification?.body,
      title: notification?.notification?.title,
    });
  };
  messaging().onMessage(onMessageReceived);

  onOpenNofitication = async (notification) => {
    if (notification?.data?.target === "MARKET_SCREEN") {
      navigation.navigate("Marketet");
    }
  };

  return (

    <NavigationStack
      data={data}
      showSplash={showSplash}
    />
    //  <NavigationContainer>
    //   <MarketContext.Provider value={{ defaultMarket, setDefaultMarket }}>
    //     <RestoranContext.Provider
    //       value={{ defaultRestoran, setDefaultRestoran }}
    //     >
    //       <Stack.Navigator>
    //         <Stack.Screen
    //           name="Splash"
    //           component={Splash}
    //           options={{ headerShown: false }}
    //         />
    //         <Stack.Screen
    //           name="Home"
    //           component={Home}
    //           options={{ headerShown: false }}
    //         />
    //         <Stack.Screen
    //           name="Login"
    //           component={Login}
    //           options={{ headerShown: false }}
    //         />
    //         <Stack.Screen
    //           name="Porosite"
    //           component={Porosite}
    //           options={{ headerShown: false }}
    //         />
    //         <Stack.Screen
    //           name="Homepage"
    //           component={MainTabNavigator}
    //           options={{ headerShown: false }}
    //         />
    //         <Stack.Screen
    //           name="Register"
    //           component={Register}
    //           options={{ headerShown: false }}
    //         />
    //         <Stack.Screen
    //           name="Marketet"
    //           component={Marketet}
    //           options={{ headerShown: false }}
    //         />
    //         <Stack.Screen
    //           name="ZgjedhOpsionin"
    //           component={ZgjedhOpsionin}
    //           options={{ headerShown: false }}
    //         />
    //         <Stack.Screen
    //           name="Shporta"
    //           component={Porosia}
    //           options={{ headerShown: false }}
    //         />
    //         <Stack.Screen
    //           name="PorosiaDuplicate"
    //           component={PorosiaDuplicate}
    //           options={{ headerShown: false }}
    //         />
    //         <Stack.Screen
    //           name="ShtoProdukt"
    //           component={ShtoProdukt}
    //           options={{ headerShown: false }}
    //         />
    //         <Stack.Screen
    //           name="FreeType"
    //           component={FreeType}
    //           options={{ headerShown: false }}
    //         />
    //         <Stack.Screen
    //           name="ShoppingDetails"
    //           component={ShoppingDetails}
    //           options={{ headerShown: false }}
    //         />
    //         <Stack.Screen
    //           name="CheckOut"
    //           component={CheckOut}
    //           options={{ headerShown: false }}
    //         />
    //         <Stack.Screen
    //           name="CheckoutDuplicate"
    //           component={CheckoutDuplicate}
    //           options={{ headerShown: false }}
    //         />
    //         <Stack.Screen
    //           name="Produkti"
    //           component={Produkti}
    //           options={{ headerShown: false }}
    //         />
    //         <Stack.Screen
    //           name="RestoranInfo"
    //           component={RestoranInfo}
    //           options={{ headerShown: false }}
    //         />
    //         <Stack.Screen
    //           name="ProduktiShporta"
    //           component={ProduktiShporta}
    //           options={{ headerShown: false }}
    //         />
    //         <Stack.Screen
    //           name="Recetat"
    //           component={Recetat}
    //           options={{ headerShown: false }}
    //         />
    //         <Stack.Screen
    //           name="RestauranetProduktet"
    //           component={RestauranetProduktet}
    //           options={{ headerShown: false }}
    //         />
    //         <Stack.Screen
    //           name="Restauranet"
    //           component={Restauranet}
    //           options={{ headerShown: false }}
    //         />
    //         <Stack.Screen
    //           name="TeGjitha"
    //           component={TeGjitha}
    //           options={{ headerShown: false }}
    //         />
    //         <Stack.Screen
    //           name="ChooseDefaultMarket"
    //           component={ChooseDefaultMArket}
    //           options={{ headerShown: false }}
    //         />
    //         <Stack.Screen
    //           name="SetMarket"
    //           component={SetMarket}
    //           options={{ headerShown: false }}
    //         />
    //         <Stack.Screen
    //           name="SetRestoran"
    //           component={SetRestoran}
    //           options={{ headerShown: false }}
    //         />
    //         <Stack.Screen
    //           name="Adresat"
    //           component={Adresat}
    //           options={{ headerShown: false }}
    //         />
    //         <Stack.Screen
    //           name="SavedMarketet"
    //           component={SavedMarketet}
    //           options={{ headerShown: false }}
    //         />
    //         <Stack.Screen
    //           name="SavedProduktet"
    //           component={SavedProduktet}
    //           options={{ headerShown: false }}
    //         />
    //         <Stack.Screen
    //           name="Kategorite"
    //           component={Kategorite}
    //           options={{ headerShown: false }}
    //         />
    //         <Stack.Screen
    //           name="Nenkategorite"
    //           component={Nenkategorite}
    //           options={{ headerShown: false }}
    //         />
    //         <Stack.Screen
    //           name="KategoriteListaIme"
    //           component={KategoriteListaIme}
    //           options={{ headerShown: false }}
    //         />
    //         <Stack.Screen
    //           name="NenkategoriteListaIme"
    //           component={NenkategoriteListaIme}
    //           options={{ headerShown: false }}
    //         />
    //         <Stack.Screen
    //           name="ChangePassword"
    //           component={ChangePassword}
    //           options={{ headerShown: false }}
    //         />
    //         <Stack.Screen
    //           name="CodeVerification"
    //           component={CodeVerification}
    //           options={{ headerShown: false }}
    //         />
    //         <Stack.Screen
    //           name="NewPassword"
    //           component={NewPassword}
    //           options={{ headerShown: false }}
    //         />
    //         <Stack.Screen
    //           name="CodeVerificationRegister"
    //           component={CodeVerificationRegister}
    //           options={{ headerShown: false }}
    //         />
    //         <Stack.Screen
    //           name="Version"
    //           component={Version}
    //           options={{ headerShown: false }}
    //         />
    //         <Stack.Screen
    //           name="RestoranKategoriaIme"
    //           component={RestoranKategoriaIme}
    //           options={{ headerShown: false }}
    //         />
    //         <Stack.Screen
    //           name="Notifications"
    //           component={Notifications}
    //           options={{ headerShown: false }}
    //         />
    //       </Stack.Navigator>
    //     </RestoranContext.Provider>
    //   </MarketContext.Provider>
    // </NavigationContainer>

  );
};


