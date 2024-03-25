import {deviceConfig} from '../store/deviceConfig';
const iot = require('./alibabacloud-iot-device-sdk');

// const connectToService = config => {
//   // 从缓存中获取配置信息
//   const cache = deviceConfig.getMultipleItems(
//     ['productKey', 'deviceName', 'deviceSecret', 'regionId', 'brokerUrl'],
//     'string',
//   );
//   let cacheConfig = Object.fromEntries(cache);
//   // 传入config信息覆盖缓存信息
//   let finalConfig = {...cacheConfig, ...config};
//   console.log(finalConfig);
//   let device = iot.device(finalConfig);
//   device.on('connect', () => {
//     console.log('connect succssfully!');
//   });
//   return device;
//   // 数据放在MMKV 不需要配置文件
// };

// export default connectToService;
