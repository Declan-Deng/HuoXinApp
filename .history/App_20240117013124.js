import React, {Component} from 'react';
import {Text, View} from 'react-native';
// import Index from './src_01_StyleSheet';
import Index from './src_02_Flexbox';
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
