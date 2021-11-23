import "react-native-gesture-handler";
import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, Platform } from "react-native";
// import * as Font from "expo-font";

import { buttonColor, primary } from "../styles/global";
import Adresat from "../screens/Profili/Adresat";
import ChooseDefaultMArket from "../screens/Marketet/ChooseDefaultMarket";
import CheckOut from "../screens/CheckOut/CheckOut";
import Home from "../screens/Home/Home";
import Login from "../screens/Login/Login";
import Register from "../screens/Register/Register";
import Marketet from "../screens/Marketet/Marketet";
import Profili from "../screens/Profili/Profili";
import Porosia from "../screens/Porosia/Porosia";
import ShoppingDetails from "../screens/ShoppingDetails/ShoppingDetails";
import Saved from "../screens/Saved/Saved";
import Homepage from "../screens/Homepage/Homepage";
import Porosite from "../screens/Porosite/Porosite";
import Produkti from "../screens/Produkti/Produkti";
import Historiku from "../screens/Historiku/Historiku";
import Recetat from "../screens/Recetat/Recetat";
import ShtoProdukt from "../screens/Porosia/ShtoProdukt";
import ProduktiShporta from "../screens/ProduktiShporta/ProduktiShporta";
import { MarketContext, RestoranContext } from "../MarketContext";
import SavedMarketet from "../screens/SavedMarketet/SavedMarketet";
import SavedProduktet from "../screens/SavedProduktet/SavedProduktet";
import CheckoutDuplicate from "../screens/CheckoutDuplicate/CheckoutDuplicate";
import PorosiaDuplicate from "../screens/PorosiaDuplicate/PorosiaDuplicate";
import Kategorite from "../screens/Kategorite/Kategorite";
import Nenkategorite from "../screens/Nenkategorite/Nenkategorite";
import FreeType from "../components/FreeType/FreeType";
import SetMarket from "../screens/Marketet/SetMarket";
import KategoriteListaIme from "../screens/Kategorite/KategoriteListaIme";
import NenkategoriteListaIme from "../screens/Nenkategorite/NenkategoriteListaIme";
import ChangePassword from "../screens/ChangePassword/ChangePassword";
import CodeVerification from "../screens/CodeVerification/CodeVerification";
import NewPassword from "../screens/NewPassword/NewPassword";
import CodeVerificationRegister from "../screens/CodeVerificationRegister/CodeVerificationRegister";
import Version from "../screens/Version/Version";
import Restauranet from "../screens/Restauranet/Restauranet";
import RestauranetProduktet from "../screens/RestauranetProduktet/RestauranetProduktet";
import TeGjitha from "../screens/TeGjitha/TeGjitha";
import ZgjedhOpsionin from "../screens/ZgjedhOpsionin/ZgjedhOpsionin";
import RestoranInfo from "../screens/RestoranInfo/RestoranInfo";
import SetRestoran from "../screens/Restauranet/setRestoran";
import RestoranKategoriaIme from "../screens/RestauranetProduktet/RestoranKategoriaIme";
import Notifications from "../screens/Notifications/Notifications";
import SplashScreenComp from "../screens/SplashScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const SplashStack = createStackNavigator()


function MainTabNavigator() {
    return (
        <Tab.Navigator
            tabBarOptions={{
                labelStyle: {
                    color: "black",
                    fontSize: 10,
                    paddingBottom: 5,
                    textAlign: "center",
                },
                style: {
                    backgroundColor: primary,
                    height: 60,
                    paddingBottom: 3,
                    borderTopColor: buttonColor,
                    borderTopWidth: 1,
                    justifyContent: "center",
                    alignItems: "center",
                },
            }}
            initialRouteName="Homepage"
        >
            <Tab.Screen
                name="Historiku"
                component={Historiku}
                options={{
                    tabBarIcon: () => (
                        <Image source={require("../assets/images/History_Menu.png")} />
                    ),
                }}
            />

            <Tab.Screen
                name="Të ruajtura"
                component={Saved}
                options={{

                    tabBarIcon: () => (
                        <Image source={require("../assets/images/Favorites_Menu.png")} />
                    ),
                }}
            />

            <Tab.Screen
                name="Homepage"
                component={Homepage}
                options={{
                    tabBarLabel: () => null,
                    activeTintColor: buttonColor,
                    tabBarIcon: () => (
                        <Image
                            source={require("../assets/images/Logo_Menu.png")}
                            style={{ width: 47, height: "100%", resizeMode: "contain" }}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Shporta"
                component={Porosia}
                options={{
                    tabBarIcon: () => (
                        <Image source={require("../assets/images/Cart_Menu.png")} />
                    ),
                }}
            />
            <Tab.Screen
                name="Profili"
                component={Profili}
                options={{
                    activeTintColor: buttonColor,
                    tabBarIcon: () => (
                        <Image source={require("../assets/images/Profile_Menu.png")} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

function SplashStackScreen() {
    return (
        <SplashStack.Navigator screenOptions={{ headerTintColor: '#000', headerShown: false }}>
            <SplashStack.Screen name="Splash" component={SplashScreenComp} options={{ title: 'Splash', headerShown: false }} />
        </SplashStack.Navigator>
    )
}

function NavigationStack(props) {
    let [defaultMarket, setDefaultMarket] = useState("");
    let [defaultRestoran, setDefaultRestoran] = useState("");

    return props.data === false ? (
        <Version />
    ) : (<>
        {props.showSplash ?
            <NavigationContainer>
                <SplashStackScreen />
            </NavigationContainer>
            : <NavigationContainer>
                <MarketContext.Provider value={{ defaultMarket, setDefaultMarket }}>
                    <RestoranContext.Provider
                        value={{ defaultRestoran, setDefaultRestoran }}
                    >
                        <Stack.Navigator>
                            <Stack.Screen
                                name="Home"
                                component={Home}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="Login"
                                component={Login}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="Porosite"
                                component={Porosite}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="Homepage"
                                component={MainTabNavigator}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="Register"
                                component={Register}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="Marketet"
                                component={Marketet}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="ZgjedhOpsionin"
                                component={ZgjedhOpsionin}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="Shporta"
                                component={Porosia}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="PorosiaDuplicate"
                                component={PorosiaDuplicate}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="ShtoProdukt"
                                component={ShtoProdukt}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="FreeType"
                                component={FreeType}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="ShoppingDetails"
                                component={ShoppingDetails}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="CheckOut"
                                component={CheckOut}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="CheckoutDuplicate"
                                component={CheckoutDuplicate}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="Produkti"
                                component={Produkti}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="RestoranInfo"
                                component={RestoranInfo}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="ProduktiShporta"
                                component={ProduktiShporta}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="Recetat"
                                component={Recetat}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="RestauranetProduktet"
                                component={RestauranetProduktet}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="Restauranet"
                                component={Restauranet}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="TeGjitha"
                                component={TeGjitha}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="ChooseDefaultMarket"
                                component={ChooseDefaultMArket}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="SetMarket"
                                component={SetMarket}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="SetRestoran"
                                component={SetRestoran}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="Adresat"
                                component={Adresat}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="SavedMarketet"
                                component={SavedMarketet}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="SavedProduktet"
                                component={SavedProduktet}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="Kategorite"
                                component={Kategorite}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="Nenkategorite"
                                component={Nenkategorite}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="KategoriteListaIme"
                                component={KategoriteListaIme}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="NenkategoriteListaIme"
                                component={NenkategoriteListaIme}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="ChangePassword"
                                component={ChangePassword}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="CodeVerification"
                                component={CodeVerification}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="NewPassword"
                                component={NewPassword}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="CodeVerificationRegister"
                                component={CodeVerificationRegister}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="Version"
                                component={Version}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="RestoranKategoriaIme"
                                component={RestoranKategoriaIme}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="Notifications"
                                component={Notifications}
                                options={{ headerShown: false }}
                            />
                        </Stack.Navigator>
                    </RestoranContext.Provider>
                </MarketContext.Provider>
            </NavigationContainer>
        }
    </>
    );
}

export default NavigationStack