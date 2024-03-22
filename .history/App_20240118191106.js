import React, {Component} from 'react';
import {Text, View} from 'react-native';

import LoginPage from './loginPage/LoginPage';
import AgreementPage from './agreementPage/AgreementPage';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
export default class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: true,
            // 其他全局配置项
          }}>
          <Stack.Screen
            name="登录"
            component={LoginPage}
            options={{
              headerShown: false,
              // 如果需要特定的卡片式动画，可以在这里配置
            }}
          />
          <Stack.Screen
            name="用户协议"
            component={AgreementPage}
            options={{
              headerTitleAlign: 'center',
              cardShadowEnabled: true,
              cardOverlayEnabled: true,
              animationEnabled: true,
              // 这里也可以添加卡片式动画的特定配置
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
