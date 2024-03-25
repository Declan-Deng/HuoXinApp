import {
  getMacAddressSync,
  getUniqueId,
  getUniqueIdSync,
} from 'react-native-device-info';
import {MMKVLoader, create} from 'react-native-mmkv-storage';
import data from '../assert/deviceInfo.json';
import iot from '../utils/alibabacloud-iot-device-sdk';

// MMKV实例初始化
const deviceConfig = new MMKVLoader()
  .withInstanceID('deviceInfo')
  .withEncryption()
  .initialize();

// 动态注册设备并获取DeviceSecret的函数
const dynamicRegister = async deviceName => {
  const productKey = data.productKey;
  const productSecret = data.productSecret;

  return new Promise((resolve, reject) => {
    iot.register(
      {
        productKey,
        productSecret,
        deviceName,
      },
      res => {
        if (res.code == '200') {
          console.log(
            'DeviceSecret obtained from server:',
            res.data.deviceSecret,
          );
          resolve(res.data.deviceSecret);
        } else {
          console.error('Failed to obtain DeviceSecret from server:', res);
          reject(new Error('Dynamic registration failed'));
        }
      },
    );
  });
};

// 检查MMKV存储中的deviceSecret
const checkDeviceSecret = async () => {
  const deviceSecret = await deviceConfig.getStringAsync('deviceSecret');
  if (deviceSecret) {
    console.log('DeviceSecret from MMKV:', deviceSecret);
  } else {
    console.error('DeviceSecret not found in MMKV.');
  }
};

// 在适当的位置调用checkDeviceSecret来确认deviceSecret确实被保存和能够被读取
checkDeviceSecret();

// 动态注册设备并获取DeviceSecret，成功后保存到MMKV的函数
const dynamicRegisterAndSave = async deviceName => {
  try {
    const deviceSecret = await dynamicRegister(deviceName);
    if (deviceSecret) {
      await deviceConfig.setString('deviceSecret', deviceSecret);
      console.log('DeviceSecret saved to MMKV successfully');
    } else {
      console.error(
        'DeviceSecret is null or undefined after dynamic registration',
      );
    }
  } catch (error) {
    console.error(
      'Error during dynamic registration or saving DeviceSecret:',
      error,
    );
  }
};

// 首次安装初始化的函数
const initializeData = async () => {
  let isInitialized = await deviceConfig.getBoolAsync('initialized');

  if (!isInitialized) {
    for (let key in data) {
      await deviceConfig.setString(key, data[key]);
    }

    let deviceName = deviceConfig.getString('deviceName');
    if (!deviceName) {
      const uniqueId = getUniqueIdSync();
      const milliseconds = new Date().getUTCMilliseconds();
      deviceName = `${uniqueId.substring(0, 10)}${milliseconds}`;
      await deviceConfig.setString('deviceName', deviceName);
      console.log(`新设备名已创建: ${deviceName}`);
    }

    // 仅在设备尚未注册时尝试动态注册并保存DeviceSecret
    await dynamicRegisterAndSave(deviceName);

    await deviceConfig.setBool('initialized', true);
  }
};

// TODO:上线时删除此行
//deviceConfig.setString('deviceName', data.deviceName);

initializeData();

const useDeviceConfig = create(deviceConfig);

export {deviceConfig, useDeviceConfig, initializeData};
