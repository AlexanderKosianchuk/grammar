'use strict';
import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Flight from './Flight';

import readFlights from './actions/readFlights';

class FlightsList extends Component
{
    componentDidMount()
    {
        if (this.props.pending !== false) {
            this.props.readFlights({ key: this.props.flights.storageKey });
        }
    }

    buildList()
    {
        if (this.props.pending !== false) {
            return <Text style={ styles.label }>Loading...</Text>
        }

        let storedFlights = this.props.flights.items;
        let flights =  Object.keys(storedFlights).map((key, index) =>
            <Flight key={index} flight={ storedFlights[key] }/>
        );

        if (!flights.length) {
            return <Text style={ styles.label }>{ 'No flights. Please connect to QAR for readout' }</Text>
        }

        return flights;
    }

    render()
    {
        return(
            <View style={styles.containerViewParent}>
                <ScrollView style={styles.containerScrollView}>
                    { this.buildList() }
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
    },
    label: {
        textAlign: 'center'
    }
});

function mapStateToProps (state) {
    return {
        pending: state.flights.pending,
        flights: state.flights,
        storageKey: state.flights.storageKey,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        readFlights: bindActionCreators(readFlights, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FlightsList);
