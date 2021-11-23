import jwtDecode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function checkTokenExpiration() {
  const tokenStorage = await AsyncStorage.getItem("@TOKEN");
  const decodedToken = jwtDecode(tokenStorage);
  const tokenExpiration = new Date(decodedToken.exp * 1000);
  const now = new Date(Date.now() + 300000); // add 5 mins ahead for checking.
  if (tokenExpiration && tokenExpiration.getTime() < now.getTime()) return true;
  return true;
}
