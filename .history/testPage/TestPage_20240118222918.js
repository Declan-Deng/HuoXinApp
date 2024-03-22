import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CameraScreen from './CameraScreen';
import {RNCamera} from 'react-native-vision-camera';

export default function TestPage() {
  return (
    <View>
      <Text>TestPage</Text>
      <CameraScreen />
    </View>
  );
}

const styles = StyleSheet.create({});
