import React, {Component, useState} from 'react';
import {
  KeyboardAvoidingView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Platform,
  ScrollView,
} from 'react-native';

function LoginPage(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const doLogin = props => {
    alert(`用户名: ${username}, 密码: ${password}`);
    props.navigation.navigate('用户协议');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView>
        <View>
          <Text style={[styles.h2]}>火星智慧心理AI检测</Text>
          <View style={[styles.container]}>
            <Text style={[styles.h3]}>登录</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>学号:</Text>
              <TextInput
                style={[styles.itemBase]}
                placeholder=" 请输入用户名"
                value={username}
                onChangeText={setUsername}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>密码:</Text>
              <TextInput
                style={styles.itemBase}
                placeholder=" 请输入密码"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
              />
            </View>
          </View>
          <TouchableOpacity
            style={styles.circleButton}
            onPress={() => doLogin(props)}>
            <Text style={styles.buttonText}>确认登录</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 50,
    marginHorizontal: 200,
    paddingVertical: 50,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 30,
    fontSize: 30,
    fontWeight: 'bold',
  },
  h3: {
    color: 'black',
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 20,
  },

  h2: {
    color: 'black',
    fontSize: 53,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 90,
  },

  itemBase: {
    borderRadius: 12,
    height: 50,
    fontSize: 20,
    borderWidth: 1,
    backgroundColor: 'white',
    margin: 20,
    marginRight: 50,
    flex: 1,
    padding: 10,
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
  buttonText: {
    color: 'white', // 文本颜色
    fontSize: 16, // 字体大小
  },
  label: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
    marginLeft: 10, // 根据需要调整
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 20,
    marginHorizontal: 100,
  },
  icon: {
    width: 20, // 根据图标的实际大小调整
    height: 20, // 根据图标的实际大小调整
    marginRight: 10, // 根据需要调整图标与输入框之间的间距
  },
});

export default LoginPage;
