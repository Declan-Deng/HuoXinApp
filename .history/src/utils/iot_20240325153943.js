import {deviceConfig} from '../store/deviceConfig';
const iot = require('./alibabacloud-iot-device-sdk');
import {dynamicRegister} from '../store/deviceConfig';

const connectToService = async (overrideConfig = {}, onConnected) => {
  // 从MMKV获取配置信息
  const cache = await deviceConfig.getMultipleItems(
    ['productKey', 'deviceName', 'deviceSecret', 'regionId', 'brokerUrl'],
    'string',
  );
  let cacheConfig = Object.fromEntries(cache);

  // 传入config信息覆盖缓存信息，如果有的话
  let finalConfig = {...cacheConfig, ...overrideConfig};

  // 检查是否有deviceSecret，如果没有则可能需要重新注册
  if (!finalConfig.deviceSecret) {
    console.log('DeviceSecret missing, attempting dynamic registration.');

    // 尝试从deviceConfig.js导入动态注册相关的函数
    const deviceName =
      finalConfig.deviceName || deviceConfig.getString('deviceName');
    if (!deviceName) {
      console.error('Device name not available for dynamic registration.');
      return;
    }

    try {
      const deviceSecret = await dynamicRegister(deviceName);
      if (deviceSecret) {
        await deviceConfig.setString('deviceSecret', deviceSecret);
        finalConfig.deviceSecret = deviceSecret;
        console.log('DeviceSecret obtained and saved successfully.');
      } else {
        console.error(
          'Failed to obtain DeviceSecret through dynamic registration.',
        );
        return;
      }
    } catch (error) {
      console.error('Dynamic registration failed:', error);
      return;
    }
  }

  console.log('Final configuration for connection:', finalConfig);

  // 检查是否有deviceSecret，如果没有则可能需要重新注册
  if (!finalConfig.deviceSecret) {
    console.error('Missing deviceSecret, cannot connect to service');
    return;
  }

  // 使用finalConfig创建IoT设备实例并连接
  let device = iot.device(finalConfig);
  device.on('connect', () => {
    console.log('Connected successfully!');
    onConnected(true); // 调用成功回调
  });

  return device;
};

export default connectToService;
