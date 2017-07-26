'use strict';

import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Router, Route } from 'react-native-redux-router';
import Home from './Home';
import Settings from './Settings';

export default class App extends Component {
    render() {
        return (
            <View style={ styles.container }>
                <Router>
                    <Route name="home" component={ Home } type="replace" />
                    <Route name="settings" component={ Settings } type="replace" />
                </Router>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
