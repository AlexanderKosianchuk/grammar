'use strict';

import React, { Component } from 'react';
import NavigationBar from 'react-native-navbar';
import { View, Text } from 'react-native';

export default class TopMenu extends React.Component {
    render(){
        return (
          <View style={styles.container}>
            <Text>'1111'</Text>
          </View>
        );
    }
}
const styles = {
  container: {
    top: 0,
    backgroundColor: '#ee1',
    alignSelf: 'stretch',
    textAlign: 'center',
  },
};

const rightButtonConfig = {
  title: 'Next',
  handler: () => alert('hello!'),
};

const titleConfig = {
  title: 'Hello, world',
};


module.exports = TopMenu;
