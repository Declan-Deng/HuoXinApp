import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';

const CameraScreen = () => {
  const {hasPermission, requestPermission} = useCameraPermission();
  const device = useCameraDevice('front');
  const [screenSize, setScreenSize] = useState(Dimensions.get('window'));

  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission, requestPermission]);

  useEffect(() => {
    const onChange = () => {
      setScreenSize(Dimensions.get('window'));
    };

    Dimensions.addEventListener('change', onChange);
    return () => {
      Dimensions.removeEventListener('change', onChange);
    };
  }, []);

  if (!hasPermission) {
    return <ActivityIndicator />;
  }

  if (!device) {
    return <Text>No device</Text>;
  }

  // 根据屏幕宽度计算出4:3比例的高度
  const cameraHeight = screenSize.width * (4 / 3);

  return (
    <View style={styles.container}>
      <Camera
        device={device}
        isActive={true}
        style={{
          width: screenSize.width,
          height: cameraHeight,
          position: 'absolute',
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
});

export default CameraScreen;
