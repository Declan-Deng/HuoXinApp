import React, {useState, useEffect} from 'react';
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
  const device = useCameraDevice('back');
  const [screenDimensions, setScreenDimensions] = useState(
    Dimensions.get('window'),
  );

  useEffect(() => {
    const onChange = ({window}) => {
      setScreenDimensions(window);
    };

    Dimensions.addEventListener('change', onChange);
    return () => Dimensions.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission, requestPermission]);

  if (!hasPermission) {
    return <ActivityIndicator />;
  }

  if (!device) {
    return <Text>No device</Text>;
  }

  // 重新计算相机视图的尺寸
  const smallWidth = screenDimensions.width * 0.5;
  const cameraStyle = {
    width: smallWidth,
    height: smallWidth * (3 / 4),
  };

  return (
    <View style={styles.container}>
      <Camera device={device} isActive={true} style={cameraStyle} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CameraScreen;
