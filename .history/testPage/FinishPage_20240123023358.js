import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React from 'react';

export default function FinishPage() {
  return (
    <ScrollView>
      <View>
        <Text style={[styles.h1]}>检测成功</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  h1: {
    fontSize: 50,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 30,
    color: 'black',
  },
});
