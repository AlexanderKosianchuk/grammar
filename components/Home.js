'use strict';

import React, { Component } from 'react';
import { View, Text, Button, TextInput, StyleSheet, AsyncStorage } from 'react-native';
import TopMenu from './TopMenu';
import FilesList from "./FilesList";
import qarConnector from "./services/qarConnector"

var STORAGE_PREFIX = '@QarSyncManagerFiles:files';// constant for AsyncStorage prefix
var files = [
            {name: 'first', lastDateSavingFromQAR : "somedate", syncDate : "lastSyncDate", status : "sent"},
            {name: 'second', lastDateSavingFromQAR : "somedateNew2", syncDate : "lastSyncDateNew2", status : "loaded"},
            {name: 'Third', lastDateSavingFromQAR : "somedateNew3", syncDate : "lastSyncDateNew3", status : "loaded"},
            {name: 'Third4', lastDateSavingFromQAR : "somedateNew3", syncDate : "lastSyncDateNew3", status : "sent"},
            {name: 'Third5', lastDateSavingFromQAR : "somedateNew3", syncDate : "lastSyncDateNew3", status : "loaded"},
            {name: 'Third6', lastDateSavingFromQAR : "somedateNew3", syncDate : "lastSyncDateNew3", status : "sent"}];
            
var qarTokenUrl = "http://qar-emul.luch15.com";
var userName = 'user';
var passWord = '12345678User';

import Icon from 'react-native-vector-icons/FontAwesome';

const HomeIcon = (<Icon name="home" size={60} color="#708090" />)//home

var STORAGE_PREFIX = '@QarSyncManagerFiles:files';// constant for AsyncStorage prefix
var files = [
    {name: 'first', lastDateSavingFromQAR : "somedate", syncDate : "lastSyncDate", status : "sent"},
    {name: 'second', lastDateSavingFromQAR : "somedateNew2", syncDate : "lastSyncDateNew2", status : "loaded"},
    {name: 'Third', lastDateSavingFromQAR : "somedateNew3", syncDate : "lastSyncDateNew3", status : "loaded"},
    {name: 'Third4', lastDateSavingFromQAR : "somedateNew3", syncDate : "lastSyncDateNew3", status : "sent"},
    {name: 'Third5', lastDateSavingFromQAR : "somedateNew3", syncDate : "lastSyncDateNew3", status : "loaded"},
    {name: 'Third6', lastDateSavingFromQAR : "somedateNew3", syncDate : "lastSyncDateNew3", status : "sent"}
];


class Home extends React.Component
{
    constructor (props) {
        super(props);

        this.state = {
            inputText: 'file1',
            file: 'empty',
            isDone : false,
        };
        qarConnector.connect(qarTokenUrl, userName, passWord)
    }
    // method for files settting from an array in AsyncStorage
    setFiles ()
    {
        for (var i = 0; i < files.length; i++) {
            AsyncStorage
                .setItem(STORAGE_PREFIX + i, JSON.stringify(files[i]))
                .done(()=>{this.setState({file : 'loaded', isDone : !this.state.isDone }) });
        }
    }

    render ()
    {
        let Actions = this.props.routes;
        return (
            <View style={styles.container}>
                <TopMenu settingsActions={ Actions.settings }/>
                <View style={styles.homePage}>
                    <Text>{HomeIcon}</Text>
                    <Text>Home page</Text>
                    <Text style={styles.filesTitle}>Files:</Text>
                    <Text>{ this.state.file }</Text>
                    <TextInput style={ styles.inputFileName }
                        autoCapitalize="none"
                        value={this.state.inputText}
                        onChangeText={(text) => this.setState({inputText: text})}
                    />
                    <Button onPress={ this.setFiles.bind(this) }  title="addFile" >Get Files</Button>
                    <FilesList storage_prefix={ STORAGE_PREFIX } filesArrayLength = {files.length} rendering = {this.state.rendering}/>
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection: 'column',
    },
    homePage: {
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
    },
    filesList : {
        alignItems: 'flex-end',
        flexDirection : 'row'
    }
});

module.exports = Home;
