'use strict';

import React, { Component } from 'react';
import { View, Text, Button, TextInput, StyleSheet, AsyncStorage } from 'react-native';
import {navbar} from 'react-native';
import { Navigator, Image, TouchableHighlight } from 'react-native';
import TopMenu from './TopMenu';
import { Col, Row, Grid } from "react-native-easy-grid";

import Icon from 'react-native-vector-icons/FontAwesome';
const myIcon3 = (<Icon name="home" size={60} color="#708090" />)//home


const STORAGE_PREFIX = '@QarSyncManagerFiles:files';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputText: 'file1',
            file: 'empty',
        };
    }

    addFile() {
        AsyncStorage
            .setItem(STORAGE_PREFIX, this.state.inputText)
            .done(() => {
                this.setState({file: this.state.inputText});
            });
    }
    render() {
        let Actions = this.props.routes;
        return (
            <View style={{flex:1,flexDirection: 'column',}}>
              <TopMenu settingsActions={ Actions.settings }/>
              <View style={styles.container}>
              <Text>{myIcon3}</Text>
                  <Text>Home page</Text>
                  <Text style={styles.filesTitle}>Files:</Text>
                  <Text>{ this.state.file }</Text>
                  <TextInput style={ styles.inputFileName }
                      autoCapitalize="none"
                      value={this.state.inputText}
                      onChangeText={(text) => this.setState({inputText: text})}
                  />
                  <Button onPress={ this.addFile.bind(this) }  title="addFile" >Add File</Button>
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F0FFFF',
      },
    filesTitle: {
        margin: 25,
    },
    inputFileName: {
        width: 300,
    }
});

module.exports = Home;
