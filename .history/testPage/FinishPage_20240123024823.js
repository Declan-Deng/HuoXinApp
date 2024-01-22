import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';

export default function FinishPage(props) {
  const [countdown, setCountdown] = useState(20);

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

  const doLogout = props => {
    props.navigation.navigate('登录');
  };

  return (
    <ScrollView>
      <View>
        <Text style={[styles.h1]}>检测成功</Text>
        <TouchableOpacity
          style={styles.circleButton}
          onPress={() => doLogout(props)}>
          <Text style={styles.buttonText}>
            退出系统 {countdown > 0 ? `(${countdown}s)` : ''}
          </Text>
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
  },
});
