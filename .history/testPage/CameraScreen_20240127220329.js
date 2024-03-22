import React, {useEffect, useState, useRef} from 'react';
import {View, Text, StyleSheet, Dimensions, ScrollView} from 'react-native';
import CameraRoll from '@react-native-camera-roll/camera-roll';

import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useCameraFormat,
} from 'react-native-vision-camera';

import {BoxShadow} from 'react-native-shadow';
import {LinearProgress, Overlay, Button, Icon} from '@rneui/themed';
import LinearGradient from 'react-native-linear-gradient';

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

  const cameraRef = useRef(null);

  const [progress, setProgress] = useState(0);

  const [visible, setVisible] = useState(true);

  const [isTesting, setIsTesting] = useState(false);

  const [countdown, setCountdown] = useState(3);

  const [startCountdown, setStartCountdown] = useState(false);

  useEffect(() => {
    let timer;
    if (startCountdown && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    } else if (countdown === 0) {
      startTesting();
    }
    return () => clearTimeout(timer);
  }, [countdown, startCountdown]);

  const {hasPermission, requestPermission} = useCameraPermission();

  const device = useCameraDevice('front');

  const format = useCameraFormat(device, [
    {videoResolution: {width: 3048, height: 2160}},
    {fps: 60},
  ]);

  const startTesting = () => {
    setIsTesting(true);
    setProgress(0);
  };

  const toggleOverlay = () => {
    setVisible(false);
    setStartCountdown(true);
  };

  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission, requestPermission]);

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
            }, 2000);
            return 1;
          }
        });
      }, 60000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isTesting, props.navigation]);

  return (
    <>
      <ScrollView>
        <Text
          style={[
            styles.statusText,
            {color: progress < 1 ? 'gray' : '#1abe30'},
          ]}>
          {startCountdown &&
            (countdown > 0
              ? `检测开始倒计时：${countdown}`
              : isTesting
              ? progress < 1
                ? '检测进行中'
                : '检测完成'
              : '')}
        </Text>
        {isTesting ? (
          progress < 1 ? (
            <Icon name="center-focus-weak" type="material" color="gray" />
          ) : (
            <Icon name="check-circle-outline" type="material" color="#1abe30" />
          )
        ) : countdown > 0 ? (
          <Icon name="center-focus-weak" type="material" color="gray" />
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
                video={true}
                audio={true}
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
            height: 70,
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
    marginBottom: 10,
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
