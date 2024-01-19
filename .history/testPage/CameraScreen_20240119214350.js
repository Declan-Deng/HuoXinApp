import React, {useEffect} from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import {useCameraPermission} from 'react-native-vision-camera';

const CameraScreen = () => {
  const {hasPermission, requestPermission} = useCameraPermission();
  const {hasPermission, requestPermission} = useMicrophonePermission();

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
      <Text>CameraScreen</Text>
    </View>
  );
};

export default CameraScreen;
