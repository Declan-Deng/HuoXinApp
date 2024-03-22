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
import {Icon, Overlay} from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';

function LoginPage(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [managerPassword, setManagerPassword] = useState('');

  const [visible, setVisible] = useState(false);

  const doLogin = () => {
    // alert(`用户名: ${username}, 密码: ${password}`);

    props.navigation.navigate('用户确认');
    setUsername('');
    setPassword('');
  };

  const doSwitch = () => {
    setVisible(!visible);
  };

  const checkpassword = async () => {
    if (managerPassword === '123456') {
      await AsyncStorage.setItem('currentScreen', '社会登录');

      // 使用 reset 方法切换屏幕
      props.navigation.reset({
        index: 0,
        routes: [{name: '社会登录'}],
      });
      setVisible(false);
    } else {
      alert('密码错误');
    }
    setManagerPassword('');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView>
        <View>
          <TouchableOpacity style={styles.switchButton} onPress={doSwitch}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.buttonTextS}>切换模式</Text>
              <Icon name="sync-alt" type="material" color="white" />
            </View>
          </TouchableOpacity>

          <Text style={[styles.h2]}>火星智慧心理 AI检测</Text>

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
                keyboardType="numeric"
              />
            </View>

            <View style={styles.inputContainer}>
              <Icon name="password" type="material" color="#517fa4" />

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
          <TouchableOpacity style={styles.circleButton} onPress={doLogin}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.buttonText}>确认登录</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Overlay
        isVisible={visible}
        onBackdropPress={doSwitch}
        overlayStyle={styles.overlayStyle}>
        <Text style={styles.overlaytext}>输入管理员密码以切换模式</Text>
        <TextInput
          // style={styles.itemBase}
          style={[styles.overlayPassword, {textAlign: 'center'}]}
          placeholder=" 请输入管理员密码"
          value={managerPassword}
          onChangeText={setManagerPassword}
          secureTextEntry={true}
          keyboardType="numeric"
        />
        <Icon
          name="done"
          type="material"
          color="green"
          size={20}
          raised
          onPress={checkpassword}
        />
      </Overlay>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 40,
    marginHorizontal: 100,
    paddingVertical: 40,
    borderRadius: 12,
    borderWidth: 5,
    borderColor: '#ddd',
    padding: 20,
    fontWeight: 'bold',
  },
  h3: {
    color: 'black',
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 10,
  },

  h2: {
    color: '#c5382e',
    fontSize: 53,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 30,
  },

  h4: {color: '#946450', fontSize: 20, textAlign: 'center', marginTop: 10},

  itemBase: {
    borderRadius: 10,
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
    borderRadius: 8,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: 20,
  },
  switchButton: {
    borderRadius: 7,
    padding: 10,
    margin: 7,
    justifyContent: 'center',
    backgroundColor: 'gray',
    alignSelf: 'flex-end',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttonTextS: {
    color: 'white',
    fontSize: 16,
  },
  label: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 20,
    marginHorizontal: 100,
  },
  overlaytext: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  overlayStyle: {
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 100,
  },
  overlayPassword: {
    borderRadius: 10,
    fontSize: 20,
    borderWidth: 1,
    backgroundColor: 'white',
    padding: 10,
    margin: 20,
  },
});

export default LoginPage;
