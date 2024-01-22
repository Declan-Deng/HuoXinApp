import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React from 'react';

export default function FinishPage() {
  return (
    <ScrollView>
      <View>
        <Text style={[styles.h1]}>检测成功</Text>
        <TouchableOpacity
          style={styles.circleButton}
          onPress={() => doLogin(props)}>
          <Text style={styles.buttonText}>确认登录</Text>
        </TouchableOpacity>
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
