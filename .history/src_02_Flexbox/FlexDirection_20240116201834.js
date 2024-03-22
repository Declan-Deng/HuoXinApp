import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';

export default class FlexDirection extends Component {
  constructor() {
    super();

    this.state = {username: ''};
  }

  doLogin = () => {
    Alert(this.state.username);
  };

  render() {
    return (
      <View>
        <View>
          <Text style={[styles.h2]}>火星智慧心理AI检测</Text>
          <View style={[styles.container]}>
            <Text style={[styles.h3]}>登录</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>学号:</Text>
              <TextInput
                style={[styles.itemBase]}
                placeholder=" 请输入用户名"
                value={this.state.username}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>密码:</Text>
              <TextInput style={styles.itemBase} placeholder="请输入密码" />
            </View>
          </View>
          <TouchableOpacity style={styles.circleButton} onPress={}>
            <Text style={styles.buttonText}>确认登录</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 50,
    marginHorizontal: 200,
    paddingVertical: 50,
    borderRadius: 15,
    //     backgroundColor: 'gray',
    borderWidth: 1,
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
    fontSize: 60,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 100,
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
