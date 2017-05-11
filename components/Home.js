'use strict';

import React, { Component } from 'react';
import { View, Text, Button, TextInput, StyleSheet, AsyncStorage, ActivityIndicator } from 'react-native';
import FilesList from "./FilesList";

var STORAGE_PREFIX = '@QarSyncManagerFiles:files';// constant for AsyncStorage prefix
var files = [
            {name: 'first', lastDateSavingFromQAR : "somedate", syncDate : "lastSyncDate", status : "sent"},
            {name: 'second', lastDateSavingFromQAR : "somedateNew2", syncDate : "lastSyncDateNew2", status : "loaded"},
            {name: 'Third', lastDateSavingFromQAR : "somedateNew3", syncDate : "lastSyncDateNew3", status : "loaded"},
            {name: 'Third4', lastDateSavingFromQAR : "somedateNew3", syncDate : "lastSyncDateNew3", status : "sent"},
            {name: 'Third5', lastDateSavingFromQAR : "somedateNew3", syncDate : "lastSyncDateNew3", status : "loaded"},
            {name: 'Third6', lastDateSavingFromQAR : "somedateNew3", syncDate : "lastSyncDateNew3", status : "sent"}];

class Home extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            inputText: 'file1',
            file: 'empty',
            isDone : false,
            rendering : true
        };
            

    }

    setFiles() {// method for files settting from an array in AsyncStorage 
                for (var i = 0; i < files.length; i++)
                {
                    AsyncStorage
                        .setItem(STORAGE_PREFIX + i, JSON.stringify(files[i]))
                        .done(()=>{this.setState({file : 'loaded', isDone : !this.state.isDone }) });
                }           
    }

    render() {
        let Actions = this.props.routes;
        return (
            <View style={styles.container}>
                <Text> Home </Text>
                <Button onPress={ Actions.settings }  title={ this.props.btnText } >Go settings</Button>
                <Text style={styles.filesTitle}>Files:</Text>
                <Text>{ this.state.file }</Text>
                <TextInput style={ styles.inputFileName }
                    autoCapitalize="none"
                    value={this.state.inputText}
                    onChangeText={(text) => this.setState({inputText: text})}
                />
                <Button onPress={ this.setFiles.bind(this) }  title="Скачать файлы с сервера" >Add File</Button>
                <FilesList storage_prefix={ STORAGE_PREFIX } LENGTH = {files.length} rendering = {this.state.rendering}/>
            </View>
        
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#55efef',
    },
    filesTitle: {
        margin: 25,
    },
    inputFileName: {
        width: 300,
    },
    filesList : {
        alignItems: 'flex-end',
        flexDirection : 'row'
        
    }
});

module.exports = Home;
