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

const smallWidth = screenWidth * 0.1;

const CameraScreen = () => {
  const {hasPermission, requestPermission} = useCameraPermission();

  const device = useCameraDevice('front');

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
    height: smallWidth * 4,
    width: smallWidth * 3,
  },
});

export default CameraScreen;
