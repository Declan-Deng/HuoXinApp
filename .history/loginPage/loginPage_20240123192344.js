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
import {Icon} from '@rneui/themed';

function LoginPage(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const doLogin = props => {
    // alert(`用户名: ${username}, 密码: ${password}`);

    props.navigation.navigate('用户协议');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView>
        <View>
          <TouchableOpacity
            style={styles.switchButton}
            onPress={() => doLogin(props)}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.buttonText}>切换模式</Text>
              <Icon name="sync-alt" type="material" color="white" />
            </View>
          </TouchableOpacity>

          <Text style={[styles.h2]}>火星智慧心理AI检测</Text>

          <Text style={[styles.h4]}>学生端</Text>
          <Icon name="contact-emergency" type="material" color="#946450" />
          <View style={[styles.container]}>
            <Text style={[styles.h3]}>登录</Text>
            <View style={styles.inputContainer}>
              <Icon name="face" type="material" color="#517fa4" />
              <Text style={styles.label}>学号</Text>
              <TextInput
                style={[styles.itemBase]}
                placeholder=" 请输入学号"
                value={username}
                onChangeText={setUsername}
              />
            </View>

            <View style={styles.inputContainer}>
              <Icon
                name="password"
                type="material"
                color="#517fa4" // 可以自定义颜色
              />

              <Text style={styles.label}>密码</Text>

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
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.buttonText}>确认登录</Text>
              <Icon name="login" type="material" color="white" />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 50,
    // marginHorizontal: 'auto',
    paddingVertical: 50,
    borderRadius: 12,
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
    color: '#F44336',
    fontSize: 53,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 90,
  },

  h4: {color: '#946450', fontSize: 20, textAlign: 'center', marginTop: 10},

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
    borderRadius: 5, // 圆角半径
    backgroundColor: 'blue', // 背景颜色
    justifyContent: 'center', // 垂直居中
    alignItems: 'center', // 水平居中
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: 20,
  },
  switchButton: {
    borderRadius: 5,
    padding: 10,
    justifyContent: 'center',
    backgroundColor: 'gray',
  },
  buttonText: {
    color: 'white', // 文本颜色
    fontSize: 20, // 字体大小
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
    width: 20,
    height: 20,
    marginRight: 10,
  },
});

export default LoginPage;
