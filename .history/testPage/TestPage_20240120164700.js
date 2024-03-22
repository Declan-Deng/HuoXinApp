import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React from 'react';
import CameraScreen from './CameraScreen';
import {FullScreen, useFullScreenHandle} from 'react-full-screen';

export default function TestPage() {
  const handle = useFullScreenHandle();

  return (
    <ScrollView>
      <View>
        <CameraScreen />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
