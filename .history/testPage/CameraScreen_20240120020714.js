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
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';

const CameraScreen = () => {
  const {hasPermission, requestPermission} = useCameraPermission();
  const device = useCameraDevice('back');
  const [cameraStyle, setCameraStyle] = useState({width: 0, height: 0});

  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }

    const updateLayout = () => {
      const {width, height} = Dimensions.get('window');
      let cameraWidth, cameraHeight;

      if (width > height) {
        // 横屏
        cameraHeight = Math.min(width * (3 / 4), height); // 确保高度不超过屏幕高度
        cameraWidth = cameraHeight * (4 / 3);
      } else {
        // 竖屏
        cameraWidth = Math.min(height * (3 / 4), width); // 确保宽度不超过屏幕宽度
        cameraHeight = cameraWidth * (4 / 3);
      }

      setCameraStyle({
        width: cameraWidth,
        height: cameraHeight,
      });
    };

    Dimensions.addEventListener('change', updateLayout);
    updateLayout(); // 初始化时调用

    return () => {
      Dimensions.removeEventListener('change', updateLayout);
    };
  }, [hasPermission, requestPermission]);

  if (!hasPermission) {
    return <ActivityIndicator />;
  }

  if (!device) {
    return <Text>No device</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera
        device={device}
        isActive={true}
        style={[styles.smallCameraView, cameraStyle]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  smallCameraView: {
    // 基础样式可以放在这里
  },
});

export default CameraScreen;
