import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import {useCameraPermission} from 'react-native-vision-camera';

const CameraScreen = () => {
  const {hasPermission, requestPermission} = useCameraPermission();

  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission]);

  console.log('has permissions:', hasCameraPermission);

  return <View style={{flex: 1}}></View>;
};

export default CameraScreen;
