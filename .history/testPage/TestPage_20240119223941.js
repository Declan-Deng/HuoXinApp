import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CameraScreen from './CameraScreen';

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
