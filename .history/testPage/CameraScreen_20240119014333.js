import React, {
  forwardRef,
  useRef,
  useImperativeHandle,
  useEffect,
  useState,
} from 'react';
import {View, Text, Image, ActivityIndicator} from 'react-native';
import {
  Camera,
  useCameraDevices,
  useCameraPermission,
  useMicrophonePermission,
} from 'react-native-vision-camera';

const CameraScreen = forwardRef((props, ref) => {
  // 权限状态
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

  // 摄像头设备
  const camera = useRef(null);
  const devices = useCameraDevices();
  const device = devices.back; // 默认后置摄像头

  useEffect(() => {
    (async () => {
      // 请求摄像头和麦克风权限
      if (!hasCameraPermission) {
        await requestCameraPermission();
      }
      if (!hasMicrophonePermission) {
        await requestMicrophonePermission();
      }
    })();
  }, [
    hasCameraPermission,
    hasMicrophonePermission,
    requestCameraPermission,
    requestMicrophonePermission,
  ]);

  // 摄像头设备
  const camera = useRef(null);
  const devices = useCameraDevices();
  const device = devices.back;

  // 监测设备的加载状态
  useEffect(() => {
    if (device != null) {
      setIsDeviceReady(true);
    } else {
      // 设备未就绪时，可以设置一个定时器来重试加载设备
      const timer = setTimeout(() => {
        console.log('Retrying to load camera devices...');
      }, 2000); // 每2秒重试一次
      return () => clearTimeout(timer);
    }
  }, [device]);

  // 如果设备还没就绪，显示加载指示器
  if (!isDeviceReady) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Loading Camera...</Text>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // 获取摄像头权限状态和请求权限函数
  const {
    hasPermission: hasCameraPermission,
    requestPermission: requestCameraPermission,
  } = useCameraPermission();
  // 获取麦克风权限状态和请求权限函数
  const {
    hasPermission: hasMicrophonePermission,
    requestPermission: requestMicrophonePermission,
  } = useMicrophonePermission();

  useEffect(() => {
    (async () => {
      // 如果没有摄像头权限，则请求权限
      if (!hasCameraPermission) {
        await requestCameraPermission();
      }
      // 如果没有麦克风权限，则请求权限
      if (!hasMicrophonePermission) {
        await requestMicrophonePermission();
      }
    })();
  }, [
    hasCameraPermission,
    hasMicrophonePermission,
    requestCameraPermission,
    requestMicrophonePermission,
  ]);

  useImperativeHandle(ref, () => ({
    //暴露可供父组件调用函数的hooks
    takePhoto,
    takeVideoStart,
    takeVideoStop,
  }));
  const camera = useRef(null);
  const devices = useCameraDevices();
  const device = devices.back; //默认后置摄像头
  if (device == null) return <Text>loading...</Text>;
  const zoom = device.neutralZoom; //获取 正常相机的变焦
  //开始拍照
  const takePhoto = async () => {
    return await camera.current.takePhoto(); //相机照片
  };
  //开始录像
  const takeVideoStart = () => {
    camera.current.startRecording({
      flash: 'off',
      onRecordingFinished: video => console.log(video),
      onRecordingError: error => console.error(error),
    });
  };
  //停止录像
  const takeVideoStop = async () => {
    return await camera.current.stopRecording(); // 录像视频路径， 暂时的资源，app关闭会销毁
  };
  return (
    <View style={{flex: 1}}>
      <Camera
        ref={camera} // 用于获取拍照录像函数
        style={{flex: 1}}
        zoom={zoom} //镜头广角大小，获取正常大小
        device={device} //此相机设备包含的物理设备类型列表。
        video={true} //录像功能打开关闭
        supportsVideoHDR={true}
        isActive={props.isopenCamera} //是否打开相机， 可以缓存相机，加快打开速度
        photo={true} //拍照功能是否打开
      />
      {/*Image用require不行，require是编译时执行 只能引用字符串，不可以用变量 */}
      {/* <Image source={{ uri: url }}></Image> */}
    </View>
  );
});

export default CameraScreen;
