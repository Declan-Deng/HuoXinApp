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

  if (!hasPermission) {
    return (
      <View>
        <Text>没有权限</Text>
      </View>
    );
  }

  console.log('has permissions:', hasPermission);

  return (
    <View>
      <Text>CameraScreen</Text>
    </View>
  );
};

export default CameraScreen;
