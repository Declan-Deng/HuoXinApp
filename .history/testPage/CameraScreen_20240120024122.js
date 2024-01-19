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

const smallWidth = screenWidth * 0.5;

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

  return (
    //     <View style={styles.container}>
    <View>
      <Camera device={device} isActive={true} style={styles.absoluteFill} />
      //{' '}
    </View>
  );
};

const styles = StyleSheet.create({
  //   container: {
  //     flex: 1,
  //     justifyContent: 'center', // 在主轴方向居中（垂直居中）
  //     alignItems: 'center', // 在交叉轴方向居中（水平居中）
  //   },
  //   smallCameraView: {
  //     width: smallWidth,
  //     height: smallWidth * (3 / 4),
  //   },
});

export default CameraScreen;
