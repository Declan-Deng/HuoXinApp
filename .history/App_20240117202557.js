import React, {Component} from 'react';
import {Text, View} from 'react-native';

import Index from './loginPage';
import Index from './agreementPage';
import {NavigationContainer} from '@react-navigation/native';
export default class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Index />
      </NavigationContainer>
    );
  }
}
