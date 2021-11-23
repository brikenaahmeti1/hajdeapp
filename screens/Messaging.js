import messaging from "@react-native-firebase/messaging";
import { getUniqueId } from "react-native-device-info";
import axiosApiInstance from "../authentification/request/request";

const setUserFCMToken = async ({ deviceId, fcmToken }) => {
  const response = await axiosApiInstance.patch(`/fcm-token/update-token`, {
    deviceId,
    token: fcmToken,
  });
};
class Messaging {
  static async getDeviceToken() {
    return await messaging().getToken();
  }
  static async checkPushNotificationsPermissions() {
    const { status } = await checkNotifications();
    return status === RESULTS.GRANTED;
  }
  static async requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    return (
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL
    );
  }
  static async saveFcmTokenToDb(fcmToken = null) {
    try {
      const deviceId = await getUniqueId();
      if (!fcmToken) {
        fcmToken = await this.getDeviceToken();
      }
      await setUserFCMToken({ deviceId, fcmToken });
    } catch (err) {}
  }

  static onRefreshToken() {
    try {
      return messaging().onTokenRefresh(async (fcmToken) => {
        await this.saveFcmTokenToDb(fcmToken);
      });
    } catch (e) {}
  }
}

export default Messaging;
