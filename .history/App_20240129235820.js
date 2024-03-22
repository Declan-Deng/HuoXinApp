import React, {Component} from 'react';
import {View, ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import LoginPage from './loginPage/LoginPage';
import AgreementPage from './agreementPage/AgreementPage';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CameraScreen from './testPage/CameraScreen';
import FinishPage from './testPage/FinishPage';
import SocialLoginPage from './loginPage/SocialLoginPage';

const Stack = createNativeStackNavigator();
export default class App extends Component {
  state = {
    initialRoute: '登录',
    isReady: false,
  };

  async componentDidMount() {
    try {
      const savedRoute = await AsyncStorage.getItem('currentScreen');
      this.setState({initialRoute: savedRoute || '登录', isReady: true});
    } catch (error) {
      console.error('Failed to load saved route:', error);
      this.setState({isReady: true}); // 确保在发生错误时也设置 isReady
    }
  }

  render() {
    if (!this.state.isReady) {
      return <ActivityIndicator size="large" color="#0000ff" />; // 或者显示一个加载指示器
    }
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={this.state.initialRoute}
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
            name="用户确认"
            component={AgreementPage}
            options={{
              headerTitle: '确认信息',
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
