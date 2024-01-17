import React, {Component} from 'react';
import {Text, View} from 'react-native';

import LoginPage from './loginPage/loginPage';
import Index from './agreementPage/agreementPage';
import {NavigationContainer} from '@react-navigation/native';
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
