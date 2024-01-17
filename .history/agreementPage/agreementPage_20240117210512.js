import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

export default function AgreementPage() {
  return (
    <View>
      <Text style={[styles.h2]>agreementPage</Text>
    </View>
  );
}

const styles = StyleSheet.create({
      h2: {
            color: 'black',
            fontSize: 53,
            fontWeight: 'bold',
            textAlign: 'center',
            marginTop: 90,
          },

});
