import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';

export default function FinishPage(props) {
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
          <Text style={styles.buttonText}>退出系统</Text>
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
