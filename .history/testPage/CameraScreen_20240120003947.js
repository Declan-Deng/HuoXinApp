import React, {useEffect} from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';

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
  // ... 可以定义其他样式
});

export default CameraScreen;
