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
import Orientation from 'react-native-orientation';

// 获取屏幕尺寸
const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

const smallWidth = screenWidth * 0.05;

const CameraScreen = () => {

  componentDidMount() {
    Orientation.lockToPortrait(); // or Orientation.lockToLandscape();
  }

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
    height: smallWidth * 5,
    width: smallWidth * 3,
  },
});

export default CameraScreen;
