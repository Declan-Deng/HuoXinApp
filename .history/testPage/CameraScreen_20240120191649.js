import React, {useEffect} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';

import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useCameraFormat,
} from 'react-native-vision-camera';

import {BoxShadow} from 'react-native-shadow';

// 获取屏幕尺寸
const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

const smallWidth = screenWidth * 0.1;

const CameraScreen = () => {
  const shadowOpt = {
    width: 160,
    height: 170,
    color: '#000',
    border: 2,
    radius: 3,
    opacity: 0.2,
    x: 0,
    y: 3,
    style: {marginVertical: 5},
  };

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
      {/* <BoxShadow setting={shadowOpt}> */}
      <View style={styles.container}>
        <Camera device={device} isActive={true} style={styles.camera} />
      </View>
      {/* </BoxShadow> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  camera: {
    height: smallWidth * 4,
    width: smallWidth * 3,
    transform: [{rotate: '90deg'}],
    borderRadius: 20,
  },

  container: {
    height: smallWidth * 3, // 保证容器尺寸与 Camera 组件尺寸一致
    width: smallWidth * 4,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 20,
    overflow: 'hidden',
  },
});

export default CameraScreen;
