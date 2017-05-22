'use strict';
import React, { Component } from 'react';
import { View, Text, Button, TextInput, StyleSheet, AsyncStorage, ScrollView, Alert} from 'react-native';
import { Router, routerReducer, Route } from 'react-native-redux-router';
import Home from './Home';
import Settings from './Settings';
import ServerCard from './ServerCard';

var STORAGE_PREFIX = '@QarSyncManagerFiles:files';
var listOfServerCards = []; // an array of ServerCards

class FilesList extends Component
{

    constructor (props)
    {
        super(props);
        this.files = [];
        this.getterAndTakingInList();
    }

    // async method for reading from AsyncStorage
    async getterAndTakingInList ()
    {
        for (var i = 0; i < this.props.filesArrayLength; i++) {
            try {
                var value = await AsyncStorage.getItem(STORAGE_PREFIX + i);
                if (value !== null) {
                    this.files.push(JSON.parse(value));
                }
            } catch (error)  {
                Alert.alert('Gettinf files list error');
            }
        }

        // part of code, to push ServerCard's components into an array
        this.files.map(function(element, i) {
            listOfServerCards.push(<ServerCard
                name = {element.name}
                key = {i}
                lastDateSavingFromQAR = {element.lastDateSavingFromQAR}
                syncDate = {element.syncDate}
                status = {element.status}
            />);
        });
    }

    render(){
        return(
            <View style={styles.containerViewParent}>
                <ScrollView style={styles.containerScrollView}>
                    {listOfServerCards}
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    containerViewParent: {
        flex : 1,
        flexDirection: 'row'
    },
    containerScrollView: {
        flex : 1,
        flexDirection: 'column'
    }
});

module.exports = FilesList;
