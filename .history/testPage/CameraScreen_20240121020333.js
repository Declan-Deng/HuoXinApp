import React, {useEffect, useState, useCallback} from 'react';
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
import {LinearProgress} from '@rneui/themed';

// 获取屏幕尺寸
const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

const smallWidth = screenWidth * 0.1;

const CameraScreen = () => {
  const shadowOpt = {
    width: smallWidth * 4,
    height: smallWidth * 3,
    color: '#000',
    border: 8,
    radius: 20,
    opacity: 0.2,
    x: 2,
    y: 2,
    style: {marginVertical: 5},
  };

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(currentProgress => {
        if (currentProgress < 1) {
          return currentProgress + 0.01;
        } else {
          clearInterval(timer);
          return currentProgress;
        }
      });
    }, 600); // 每1秒钟增加10%

    return () => clearInterval(timer); // 组件卸载时清除定时器
  }, []);

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
    <>
      <View style={styles.progress}>
        <LinearProgress
          style={{
            marginVertical: 10,
            height: 20,
            borderRadius: 20,
            width: '90%',
          }}
          variant="determinate"
          value={progress}
        />
      </View>

      <View style={styles.mainContainer}>
        <BoxShadow setting={shadowOpt}>
          <View style={styles.container}>
            <Camera
              device={device}
              isActive={true}
              style={styles.camera}
              orientation="landscape-left"
            />
          </View>
        </BoxShadow>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  camera: {
    height: smallWidth * 4,
    width: smallWidth * 3,
    transform: [{rotate: '90deg'}],
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderRadius: 20,
    overflow: 'hidden',
    borderColor: 'white',
  },

  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  progress: {
    marginHorizontal: 50,

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  progressBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
});

export default CameraScreen;
