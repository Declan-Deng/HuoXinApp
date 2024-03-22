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
      // 保持4:3比例
      let cameraWidth, cameraHeight;
      if (width > height) {
        // 横屏：宽度更大，因此基于高度设置宽度
        cameraWidth = height * (4 / 3);
        cameraHeight = height;
      } else {
        // 竖屏：高度更大，因此基于宽度设置高度
        cameraWidth = width;
        cameraHeight = width * (3 / 4);
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
        style={[styles.cameraView, cameraStyle]}
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
  cameraView: {
    // 其他样式（如果有的话）
  },
});

export default CameraScreen;
