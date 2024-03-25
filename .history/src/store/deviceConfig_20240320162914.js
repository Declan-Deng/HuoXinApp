import {
  getMacAddressSync,
  getUniqueId,
  getUniqueIdSync,
} from 'react-native-device-info';
import {MMKVLoader, create} from 'react-native-mmkv-storage';
import data from '../assert/deviceInfo.json';

// 引入阿里云IoT设备SDK
const iot = require('../utils/alibabacloud-iot-device-sdk');

// mmkv实例
const deviceConfig = new MMKVLoader()
  .withInstanceID('deviceInfo')
  .withEncryption()
  .initialize();

// 动态注册设备并获取DeviceSecret
const dynamicRegister = async deviceName => {
  const productKey = data.productKey; // 假设您已经在deviceInfo.json中定义了productKey
  const productSecret = data.productSecret; // 假设您已经在deviceInfo.json中定义了productSecret

  return new Promise((resolve, reject) => {
    iot.register(
      {
        productKey: productKey,
        productSecret: productSecret,
        deviceName: deviceName,
      },
      res => {
        if (res.code == '200') {
          console.log('DeviceSecret obtained:', res.data.deviceSecret);
          resolve(res.data.deviceSecret);
        } else {
          console.error('Dynamic registration failed:', res);
          reject(new Error('Dynamic registration failed'));
        }
      },
    );
  });
};

// 首次安装初始化
const initializeData = async () => {
  let isInitialized = await deviceConfig.getBoolAsync('initialized');
  // 不需要再设置 isInitialized 为 false，应保留上面的获取结果

  if (!isInitialized) {
    for (let key in data) {
      await deviceConfig.setString(key, data[key]);
    }
    //设备mac作为设备名称
    // 这里应该确保使用的键是字符串 'deviceName'
    if (!deviceConfig.getString('deviceName')) {
      const uniqueId = getUniqueIdSync();
      // 获取当前时间毫秒
      const milliseconds = new Date().getUTCMilliseconds();
      // 创建设备名
      const deviceName = `${uniqueId.substring(0, 10)}${milliseconds}`;
      // 存储设备名
      await deviceConfig.setString('deviceName', deviceName);

      // 输出新创建的设备名
      console.log(`新设备名已创建: ${deviceName}`);
    }
    // 标记为已初始化
    await deviceConfig.setBool('initialized', true);
  }

  // TODO: 如果有后续的异步操作获取密钥，应放置在这里
  // 例如：await fetchSecretKey();
};

// TODO:上线时删除
//deviceConfig.setString('deviceName', data.deviceName);
initializeData();

const useDeviceConfig = create(deviceConfig);

export {deviceConfig, useDeviceConfig};

//自动生成名字
//用名字和其他的去获取secret key
