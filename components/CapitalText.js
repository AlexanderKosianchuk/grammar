'use strict';

import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default class CapitalText extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>{this.props.text}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },

    text: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});
