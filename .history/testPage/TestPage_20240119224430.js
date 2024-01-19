import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React from 'react';
import CameraScreen from './CameraScreen';

export default function TestPage() {
  return (
    <ScrollView>
      <View>
        <Text>TestPage</Text>
        <CameraScreen />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
