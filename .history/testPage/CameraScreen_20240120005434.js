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
  useCameraDevices,
  useCameraPermission,
} from 'react-native-vision-camera';

const CameraScreen = () => {
  const [screenSize, setScreenSize] = useState(Dimensions.get('window'));
  const {hasPermission, requestPermission} = useCameraPermission();

  const device = useCameraDevices('front')?.back;

  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }

    const onChange = ({window}) => {
      setScreenSize(window);
    };

    Dimensions.addEventListener('change', onChange);
    return () => Dimensions.removeEventListener('change', onChange);
  }, [hasPermission, requestPermission]);

  if (!hasPermission) {
    return <ActivityIndicator />;
  }

  if (!device) {
    return <Text>No device</Text>;
  }

  // 计算摄像头视图的尺寸
  const smallWindowWidth = screenSize.width * 0.5;
  const smallWindowHeight = smallWindowWidth * 0.5;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    smallCameraView: {
      width: smallWindowWidth,
      height: smallWindowHeight,
      position: 'absolute',
    },
  });

  return (
    <View style={styles.container}>
      <Camera device={device} isActive={true} style={styles.smallCameraView} />
    </View>
  );
};

export default CameraScreen;
