import React, {useEffect} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useCameraFormat,
} from 'react-native-vision-camera';

// 获取屏幕尺寸
const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

const smallWidth = screenWidth * 0.05;

const CameraScreen = () => {
  const {hasPermission, requestPermission} = useCameraPermission();

  const device = useCameraDevice('front');

  const format = useCameraFormat(device, [
    {videoResolution: {width: 3048, height: 2160}},
    {fps: 60},
  ]);

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
    <ScrollView>
      <View style={{flex: 1}}>
        <Text>Camera</Text>
        <Camera device={device} isActive={true} style={styles.camera} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  camera: {
    height: smallWidth * 16,
    width: smallWidth * 9,
    transform: [{rotate: '90deg'}],
  },
});

export default CameraScreen;
