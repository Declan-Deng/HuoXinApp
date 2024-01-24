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
import {LinearProgress, Overlay, Button, Icon} from '@rneui/themed';
import LinearGradient from 'react-native-linear-gradient';

// 获取屏幕尺寸
const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

const smallWidth = screenWidth * 0.1;

const CameraScreen = props => {
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

  const [countdown, setCountdown] = useState(3);

  const [startCountdown, setStartCountdown] = useState(false);

  useEffect(() => {
    let timer;
    if (startCountdown && countdown > 0) {
      // 如果开始倒计时且倒计时大于0
      timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    } else if (countdown === 0) {
      startTesting();
    }
    return () => clearTimeout(timer);
  }, [countdown, startCountdown]);

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
            return 1;
          }
        });
      }, 60);
    }

    return () => {
      if (timer) {
        clearInterval(timer); // 组件卸载时清除定时器
      }
    };
  }, [isTesting]);

  const {hasPermission, requestPermission} = useCameraPermission();

  const device = useCameraDevice('front');

  const format = useCameraFormat(device, [
    {videoResolution: {width: 3048, height: 2160}},
    {fps: 60},
  ]);

  const startTesting = () => {
    setIsTesting(true); // 开始检测
    setProgress(0); // 重置进度
  };

  const toggleOverlay = () => {
    // setVisible(!visible);
    // setIsTesting(true);
    setVisible(false);
    setStartCountdown(true);
  };

  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission]);

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
            setTimeout(() => {
              props.navigation.navigate('完成界面');
            }, 2000); // 测试完成后延迟3秒跳转
            return 1; // 直接返回1确保进度能达到100%
          }
        });
      }, 600);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isTesting, props.navigation]);

  if (!hasPermission) {
    return <ActivityIndicator />;
  }

  if (!device) {
    return <Text>No device</Text>;
  }

  return (
    <>
      <ScrollView>
        {countdown > 0 ? (
          <Text style={styles.statusText}>{countdown}</Text> // 显示倒计时
        ) : isTesting ? (
          <Text style={styles.statusText}>
            {progress < 1 ? '检测中' : '检测完成'}
          </Text>
        ) : null}
        {isTesting && (progress < 1 || countdown > 0) ? (
          // 当测试正在进行中或倒计时正在进行中时，显示测试中的图标
          <Icon name="center-focus-weak" type="material" color="gray" />
        ) : isTesting && progress === 1 ? (
          // 当测试完成时，显示测试完成的图标
          <Icon name="check-circle-outline" type="material" color="#1abe30" />
        ) : null}
        <View style={styles.progress}>
          <LinearProgress
            style={{
              marginVertical: 30,
              height: 25,
              borderRadius: 8,
              width: '70%',
              elevation: 3,
            }}
            variant="determinate"
            value={progress}
            color={progress < 1 ? '#42b3fe' : '#1abe30'}
            trackColor="#E0E0E0"
            animation={{duration: 500}}
          />
        </View>

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
      </ScrollView>
      <Overlay
        isVisible={visible}
        onBackdropPress={visible}
        overlayStyle={styles.overlayStyle}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 20,
          }}>
          <Text style={styles.textPrimary}>注意事项</Text>
          <Icon
            name="error-outline"
            type="material"
            color="#d03b30"
            size={30}
          />
        </View>
        <Text style={styles.textSecondary}>
          你将紧盯摄像头一分钟，请保持观看
        </Text>

        <Button
          ViewComponent={LinearGradient}
          onPress={toggleOverlay}
          linearGradientProps={{
            colors: ['#f3900e', '#d03b30'],
            start: {x: 0, y: 0.5},
            end: {x: 1, y: 0.5},
          }}
          buttonStyle={{
            borderRadius: 9,
            padding: 10,
            width: 150,
          }}
          titleStyle={{fontWeight: 'bold', fontSize: 23}}>
          开始检测
        </Button>
      </Overlay>
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
    borderRadius: 15,
    overflow: 'hidden',
    borderColor: 'white',
  },

  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#979797',
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
    marginTop: 20,
  },
  textPrimary: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    color: '#181818',
    marginRight: 10,
  },
  textSecondary: {
    marginBottom: 50,
    textAlign: 'center',
    fontSize: 27,
    fontWeight: 'bold',
    color: '#181818',
  },
  overlayStyle: {
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 100,
  },
});

export default CameraScreen;
