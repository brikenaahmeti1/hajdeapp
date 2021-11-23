import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import apiURL from "../../authentification/apiConstant";

const refreshAccessToken = async () => {
  console.log(apiURL,'apiUrl')
  try {
    const token = await AsyncStorage.getItem("@REFRESH_TOKEN");
    const headers = {
      "x-refresh-token": token,
    };

    const result = await axios.post(
      `${apiURL}/client/auth/refresh-token`,
      null,
      { headers }
    );
    console.log(result,"result")
    return result.data.token;
  } catch (err) {
    console.log("ERROR: ", err.message);
  }
};

export default refreshAccessToken;