import {
  getMacAddressSync,
  getUniqueId,
  getUniqueIdSync,
} from "react-native-device-info";
import {MMKVLoader, create} from "react-native-mmkv-storage";
import data from "../assert/deviceInfo.json";
// mmkv实例
const deviceConfig = new MMKVLoader()
  .withInstanceID("deviceInfo")
  .withEncryption()
  .initialize();

// 首次安装初始化
const initializeData = async () => {
  const isInitialized = await deviceConfig.getBoolAsync("initialized");
  isInitialized = false;
  if (!isInitialized) {
    for (let key in data) {
      await deviceConfig.setString(key, data[key]);
    }
    //设备mac作为设备名称
    if (!deviceConfig.getString(deviceName)) {
      const uniqueId = getUniqueIdSync();
      const deviceName =
        uniqueId.substring(0, 10) + new Date().getUTCMilliseconds();
      deviceConfig.setString("deviceName", deviceName);
    }
    deviceConfig.setBool("initialized", true);
  }

 // 异性异码 获取密钥
};

// TODO:上线时删除
deviceConfig.setString("deviceName", data.deviceName);
initializeData();

const useDeviceConfig = create(deviceConfig);

export {deviceConfig, useDeviceConfig};
