import React, {
  forwardRef,
  useRef,
  useImperativeHandle,
  useEffect,
  useState,
} from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import {
  Camera,
  useCameraDevices,
  useCameraPermission,
  useMicrophonePermission,
} from 'react-native-vision-camera';

const CameraScreen = forwardRef((props, ref) => {
  // 获取摄像头和麦克风权限状态及请求权限的函数
  const {
    hasPermission: hasCameraPermission,
    requestPermission: requestCameraPermission,
  } = useCameraPermission();
  const {
    hasPermission: hasMicrophonePermission,
    requestPermission: requestMicrophonePermission,
  } = useMicrophonePermission();

  // 设备加载状态
  const [isDeviceReady, setIsDeviceReady] = useState(false);

  // 摄像头设备引用
  const camera = useRef(null);
  const devices = useCameraDevices();
  const device = devices.back;

  useEffect(() => {
    (async () => {
      // 请求摄像头和麦克风权限
      if (!hasCameraPermission) {
        await requestCameraPermission();
      }
      if (!hasMicrophonePermission) {
        await requestMicrophonePermission();
      }
      // 检查设备是否准备好
      if (device != null) {
        setIsDeviceReady(true);
      }
    })();
  }, [
    hasCameraPermission,
    hasMicrophonePermission,
    requestCameraPermission,
    requestMicrophonePermission,
    device,
  ]);

  // 如果设备还没就绪，显示加载指示器
  if (!isDeviceReady) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Loading Camera...</Text>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  useImperativeHandle(ref, () => ({
    takePhoto,
    takeVideoStart,
    takeVideoStop,
  }));

  const zoom = device.neutralZoom; //获取正常相机的变焦

  // 开始拍照
  const takePhoto = async () => {
    return await camera.current.takePhoto();
  };

  // 开始录像
  const takeVideoStart = () => {
    camera.current.startRecording({
      flash: 'off',
      onRecordingFinished: video => console.log(video),
      onRecordingError: error => console.error(error),
    });
  };

  // 停止录像
  const takeVideoStop = async () => {
    return await camera.current.stopRecording();
  };

  return (
    <View style={{flex: 1}}>
      <Camera
        ref={camera}
        style={{flex: 1}}
        zoom={zoom}
        device={device}
        video={true}
        supportsVideoHDR={true}
        isActive={props.isopenCamera}
        photo={true}
      />
    </View>
  );
});

export default CameraScreen;
