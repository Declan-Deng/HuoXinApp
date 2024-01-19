import React, {useEffect} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';

// 获取屏幕尺寸
const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

// 假设我们想要小窗口宽度是屏幕宽度的一半，高度也是宽度的一半
const smallWindowWidth = screenWidth * 0.5;
const smallWindowHeight = smallWindowWidth * 0.5;

const CameraScreen = () => {
  const {hasPermission, requestPermission} = useCameraPermission();

  const device = useCameraDevice('front');

  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission, requestPermission]);

  if (!hasPermission) {
    return <ActivityIndicator />;
  }

  if (!device) {
    return <Text>No device</Text>;
  }

  console.log('has permissions:', hasPermission);

  return (
    <Camera device={device} isActive={true} style={styles.smallCameraView} />
  );
};

const styles = StyleSheet.create({
  smallCameraView: {
    width: 100, // 小窗口的宽度
    height: 100, // 小窗口的高度
    position: 'absolute', // 使用绝对定位
    right: 10, // 距离右边界10单位
    bottom: 10, // 距离底部边界10单位
  },
});

export default CameraScreen;
