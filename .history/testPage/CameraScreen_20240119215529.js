import React, {useEffect} from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import {Camera, useCameraDevice, useCameraPermission} from 'react-native-vision-camera';

const CameraScreen = () => {
  const {hasPermission, requestPermission} = useCameraPermission();
  const {hasPermission, requestPermission} = useMicrophonePermission();

  const device = useCameraDevice('front');

  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission]);

  if (!hasPermission) {
    return <ActivityIndicator />;
  }

  console.log('has permissions:', hasPermission);

  return (
    <View>
      <Camera
    </View>
  );
};

export default CameraScreen;
