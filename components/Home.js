'use strict';

import React, { Component } from 'react';
import { View, Text, Button, TextInput, StyleSheet, AsyncStorage } from 'react-native';
import {navbar} from 'react-native';
import { Navigator, Image, TouchableHighlight } from 'react-native';
import TopMenu from './TopMenu';


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
            <View>
              <TopMenu/>

              <View style={styles.container}>

                <Button  title='QAR' ></Button>
                <Button  title='SNfS'></Button>

                  <Button onPress={ Actions.settings }  title={ this.props.btnText } >Go settings</Button>
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
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#55efef',
    },
    filesTitle: {
        margin: 25,
    },
    inputFileName: {
        width: 300,
    }
});

module.exports = Home;
