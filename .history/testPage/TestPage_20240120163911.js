import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React from 'react';
import CameraScreen from './CameraScreen';
import FullScreen from 'react-native-full-screen';

// To enable full-screen mode
FullScreen.onFullScreen();

export default function TestPage() {
  return (
    <ScrollView>
      <View>
        <CameraScreen />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
