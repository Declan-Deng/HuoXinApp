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

  // 获取屏幕尺寸
  const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

  const smallWindowWidth = screenWidth * 0.5;

  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission]);

  if (!hasPermission) {
    return <ActivityIndicator />;
  }

  if (!device) {
    return <Text>No device</Text>;
  }

  console.log('has permissions:', hasPermission);

  return (
    <View style={{flex: 1}}>
      <Text>Camera</Text>
      <Camera device={device} isActive={true} style={styles.camera} />
    </View>
  );
};

const styles = StyleSheet.create({
  camera: {
    height: 400,
    width: 300, // 居中对齐
    // 其他可能的样式
  },
});

export default CameraScreen;
