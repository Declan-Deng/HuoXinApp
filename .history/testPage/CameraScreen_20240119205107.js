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

const CameraScreen = () => {
  const [hasCameraPermission, requestPermission] = useCameraPermission();

  console.log('has permissions:', hasCameraPermission);

  return <View style={{flex: 1}}></View>;
};

export default CameraScreen;
