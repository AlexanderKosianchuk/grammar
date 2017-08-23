'use strict';
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class Flight extends Component
{
    getStyle (status)
    {
        if (status === 'readout') {
            return styles.readout;
        } else if (status === 'sent') {
            return styles.sent;
        } else if (status === 'processed') {
            return styles.processed;
        } else {
            return styles.unknown
        }
    }

    render ()
    {
        return(
            <View style={styles.container}>
                <Text>{ 'File name: ' + this.props.flight.name}</Text>
                <Text>{ 'Fdr ID: ' + this.props.flight.fdrId}</Text>
                <Text>{ 'Readout date: ' + this.props.flight.readoutData}</Text>
                <Text>{ 'Sync with server date: '
                    + (this.props.flight.sendData.length ? this.props.flight.sendData : '-' )}
                </Text>
                <Text style = {this.getStyle(this.props.flight.status)}>
                    { 'File status: ' + this.props.flight.status }
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    readout: {
        color : '#586B8F'
    },
    sent: {
        color : '#3B0944'
    },
    processed: {
        color :  '#588C73'
    },
    unknown: {
        color :  '#D96459'
    },
    container: {
        flex : 1,
        padding: 4,
        paddingLeft: 14,
        backgroundColor: '#fff',
        flexDirection: 'column',
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: '#d6d7da',
    }
});

module.exports = Flight;
