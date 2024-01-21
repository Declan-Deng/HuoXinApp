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
import {LinearProgress, Overlay, Button} from '@rneui/themed';

// 获取屏幕尺寸
const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

const smallWidth = screenWidth * 0.1;

const CameraScreen = () => {
  const shadowOpt = {
    width: 800,
    height: 600,
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
    }, 600);

    return () => clearInterval(timer); // 组件卸载时清除定时器
  }, []);

  const {hasPermission, requestPermission} = useCameraPermission();

  const device = useCameraDevice('back');

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
      {/* <ScrollView> */}
      <View style={styles.progress}>
        <LinearProgress
          style={{
            marginVertical: 30,
            height: 25,
            borderRadius: 20,
            width: '70%',
          }}
          variant="determinate"
          value={progress}
        />
      </View>

      <Text
        style={[
          styles.statusText,
          {color: progress < 1 ? 'black' : '#1abe30'},
        ]}>
        {progress < 1 ? '正在测试' : '测试完成 ✅'}
      </Text>

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

      <Overlay isVisible={true} onBackdropPress={visible}>
        <Text style={styles.textPrimary}>Hello!</Text>
        <Text style={styles.textSecondary}>
          Welcome to React Native Elements
        </Text>
        <Button
          icon={
            <Icon
              name="wrench"
              type="font-awesome"
              color="white"
              size={25}
              iconStyle={{marginRight: 10}}
            />
          }
          title="Start Building"
          onPress={toggleOverlay}
        />
      </Overlay>
      {/* </ScrollView> */}
    </>
  );
};

const styles = StyleSheet.create({
  camera: {
    height: 800,
    width: 600,
    transform: [{rotate: '90deg'}, {scaleX: 1.3}],
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

    justifyContent: 'center',
    alignItems: 'center',
  },

  statusText: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default CameraScreen;
