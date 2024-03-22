import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Icon} from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function FinishPage(props) {
  const [countdown, setCountdown] = useState(2000);

  useEffect(() => {
    // 设置倒计时
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);

      return () => clearTimeout(timer);
    } else {
      // 倒计时结束，执行退出操作
      doLogout(props);
    }
  }, [countdown, props]);

  const doLogout = async props => {
    try {
      // 从本地存储中读取最后访问的屏幕名称
      const lastScreen = await AsyncStorage.getItem('currentScreen');

      // 如果有保存的屏幕名称，则导航到该屏幕，否则默认导航到'登录'
      if (lastScreen) {
        props.navigation.navigate(lastScreen);
      } else {
        props.navigation.navigate('社会登录');
      }
    } catch (error) {
      // 如果读取出错，则默认导航到'登录'
      props.navigation.navigate('社会登录');
    }
  };

  return (
    <View style={[styles.center]}>
      <Icon name="cloud-done" type="material" color="green" size={50} raised />
      <Text style={[styles.h1]}>检测成功，请等待检测报告返回到微信</Text>
      <TouchableOpacity
        style={styles.circleButton}
        onPress={() => doLogout(props)}>
        <Text style={styles.buttonText}>
          退出检测 {countdown > 0 ? `(${countdown}s)` : ''}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  h1: {
    fontSize: 50,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 30,
    color: 'black',
  },
  circleButton: {
    borderRadius: 5,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: 20,
    marginTop: 40,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
