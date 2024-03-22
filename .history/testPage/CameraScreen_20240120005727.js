import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {
  Camera,
  useCameraDevices,
  useCameraPermission,
} from 'react-native-vision-camera';

const CameraScreen = () => {
  const [screenSize, setScreenSize] = useState(Dimensions.get('window'));
  const {hasPermission, requestPermission} = useCameraPermission();
  const devices = useCameraDevices();
  const device = devices.front; // 使用前置摄像头

  // 监听屏幕尺寸变化
  useEffect(() => {
    const onChange = () => {
      setScreenSize(Dimensions.get('window'));
    };

    Dimensions.addEventListener('change', onChange);
    return () => {
      Dimensions.removeEventListener('change', onChange);
    };
  }, []);

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

  // 计算小窗口尺寸
  const smallWindowWidth = screenSize.width * 0.5;
  const smallWindowHeight = smallWindowWidth * 0.5;

  return (
    <View style={styles.container}>
      <Camera
        device={device}
        isActive={true}
        style={[
          styles.smallCameraView,
          {width: smallWindowWidth, height: smallWindowHeight},
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // 在主轴方向居中（垂直居中）
    alignItems: 'center', // 在交叉轴方向居中（水平居中）
    backgroundColor: 'black', // 背景色设为黑色
  },
  smallCameraView: {
    position: 'absolute',
  },
});

export default CameraScreen;
