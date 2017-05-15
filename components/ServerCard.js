'use strict';
import React, { Component } from 'react'; 
import { View, Text, Button, TextInput, StyleSheet, AsyncStorage} from 'react-native';
import { Router, routerReducer, Route } from 'react-native-redux-router';
import Home from './Home';
import Settings from './Settings';


class ServerCard extends Component
{
    getStyle (status) 
    {
        if (status === 'loaded'){
            return styles.colorForStatusLoaded
        }
        else if (status === 'sent'){
            return styles.colorForStatusSent
        }
        else {
            return styles.colorForStatusError
        }
    }

    render () 
    {
        return(
            <View key={this.props.i} style={styles.container}>
            <Text>{this.props.name}</Text>
            <Text>{this.props.lastDateSavingFromQAR}</Text>
            <Text>{this.props.syncDate}</Text>
            <Text style = {this.getStyle(this.props.status)}>{this.props.status}</Text>
            <Text>--------------------------------------------------</Text>
            </View>);
    }
}

const styles = StyleSheet.create({
    colorForStatusLoaded: {
        backgroundColor : 'blue'
    },
    colorForStatusSent: {
        flex : 1, 
        backgroundColor :  'red'
    }, 
    colorForStatusError: {
        flex : 1, 
        backgroundColor :  'black'
    }, 
    container: {
    flex : 1,
    paddingTop: 5, 
    backgroundColor: 'yellow', 
    flexDirection: 'column'
    }
});

module.exports = ServerCard;