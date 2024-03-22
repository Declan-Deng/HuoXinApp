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

  const [visible, setVisible] = useState(true);

  const [isTesting, setIsTesting] = useState(false);

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setProgress(currentProgress => {
  //       if (currentProgress < 1) {
  //         return currentProgress + 0.01;
  //       } else {
  //         clearInterval(timer);
  //         return currentProgress;
  //       }
  //     });
  //   }, 600);

  //   return () => clearInterval(timer); // 组件卸载时清除定时器
  // }, []);

  useEffect(() => {
    let timer;
    if (isTesting) {
      // 如果开始测试，启动计时器
      timer = setInterval(() => {
        setProgress(currentProgress => {
          const nextProgress = currentProgress + 0.01;
          if (nextProgress < 1) {
            return nextProgress;
          } else {
            clearInterval(timer);
            return 1; // 直接返回1确保进度能达到100%
          }
        });
      }, 600);
    }

    return () => {
      if (timer) {
        clearInterval(timer); // 组件卸载时清除定时器
      }
    };
  }, [isTesting]);

  const {hasPermission, requestPermission} = useCameraPermission();

  const device = useCameraDevice('back');

  const format = useCameraFormat(device, [
    {videoResolution: {width: 3048, height: 2160}},
    {fps: 60},
  ]);

  // const toggleOverlay = () => {
  //   setVisible(!visible);
  // };

  const toggleOverlay = () => {
    setVisible(!visible);
    setIsTesting(true); // 用户点击开始后设置为true开始测试
  };

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

  return (
    <>
    <View style={{backgroundColor: "black"}}>
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
          color="#42b3fe"
          trackColor="#E0E0E0"
          animation={{duration: 500}}
        />
      </View>

      <Text
        style={[styles.statusText, {color: progress < 1 ? 'gray' : '#1abe30'}]}>
        {isTesting ? (progress < 1 ? '测试中' : '测试完成 ✅') : ''}
      </Text>

      <View style={styles.mainContainer}>
        <BoxShadow setting={shadowOpt}>
          <View
            style={[
              styles.container,
              progress >= 0.99 && {borderColor: '#4ead4e'},
            ]}>
            <Camera
              device={device}
              isActive={true}
              style={styles.camera}
              orientation="landscape-left"
            />
          </View>
        </BoxShadow>
      </View>

      <Overlay
        isVisible={visible}
        onBackdropPress={visible}
        overlayStyle={styles.overlayStyle}>
        <Text style={styles.textPrimary}>注意事项</Text>
        <Text style={styles.textSecondary}>你将紧盯屏幕一分钟，请保持观看</Text>
        <Button title="开始" onPress={toggleOverlay} />
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
  textPrimary: {
    marginVertical: 20,
    textAlign: 'center',
    fontSize: 20,
  },
  textSecondary: {
    marginBottom: 50,
    textAlign: 'center',
    fontSize: 17,
  },
  overlayStyle: {
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 100,
  },
});

export default CameraScreen;
