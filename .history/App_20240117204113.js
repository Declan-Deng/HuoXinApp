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
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginPage} />
          <Stack.Screen name="Agreement" component={AgreementPage} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
