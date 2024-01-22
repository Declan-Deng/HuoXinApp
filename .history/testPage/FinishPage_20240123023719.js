import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';

export default function FinishPage() {
  const doLogout = props => {
    // alert(`用户名: ${username}, 密码: ${password}`);

    props.navigation.navigate('登录');
  };

  return (
    <ScrollView>
      <View>
        <Text style={[styles.h1]}>检测成功</Text>
        <TouchableOpacity
          style={styles.circleButton}
          onPress={() => doLogout(props)}>
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
  circleButton: {
    width: 90, // 宽度
    height: 50, // 高度
    borderRadius: 5, // 圆角半径
    backgroundColor: 'blue', // 背景颜色
    justifyContent: 'center', // 垂直居中
    alignItems: 'center', // 水平居中
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});
