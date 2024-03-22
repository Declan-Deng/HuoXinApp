import React, {Component} from 'react';
import {Text, View} from 'react-native';

import LoginPage from './loginPage/LoginPage';
import AgreementPage from './agreementPage/AgreementPage';
import TestPage from './testPage/FinishPage';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Camera} from 'react-native-vision-camera';
import CameraScreen from './testPage/CameraScreen';
import FinishPage from './testPage/FinishPage';
import SocialLoginPage from './loginPage/SocialLoginPage';

const Stack = createNativeStackNavigator();
export default class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: true,
            orientation: 'landscape',
          }}>
          <Stack.Screen
            name="登录"
            component={LoginPage}
            options={{
              headerShown: false,
              presentation: 'card',
            }}
          />
          <Stack.Screen
            name="社会登录"
            component={SocialLoginPage}
            options={{
              headerShown: false,
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
              presentation: 'card',
            }}
          />
          <Stack.Screen
            name="检测界面"
            component={CameraScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="完成界面"
            component={FinishPage}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
