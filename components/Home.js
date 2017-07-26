'use strict';

import React, { Component } from 'react';
import { View, Text, StyleSheet, AsyncStorage, Alert } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import TopMenu from './TopMenu';
import CapitalText from './CapitalText';
import FlightsList from "./FlightsList";

import fetchFlights from "./actions/fetchFlights";
import getSettings from "./actions/getSettings";

class Home extends React.Component
{
    fetchDevice()
    {
        if (!this.settingsValid(['qarIp', 'qarLoginHttpAuthorizationd', 'qarPassHttpAuth'])) {
            Alert.alert('1','1')
            return;
        }
    }

    syncWithServer()
    {

    }

    componentDidMount() {
        if (this.props.settingsPending !== false) {
            this.props.getSettings({
                storageKeyPrefix: this.props.storageKeyPrefix,
                defaultSettings: this.props.defaultSettings
            });
        }
    }

    settingsValid(settingsKeys)
    {
        let settingsValid = true;
        settingsKeys.forEach((item, index) => {
            let searchedIndex = this.props.settings.items.findIndex(
                element => element.key === item
            );
console.log(searchedIndex);
            console.log(this.props.settings.items[searchedIndex].value);

            if (!this.props.settings.items.length
                || (searchedIndex === null)
                || (this.props.settings.items[searchedIndex].value.length < 3)
            ) {
                settingsValid = false;
            }
        });

        return settingsValid;
    }

    putTopMenu()
    {
        let items = [
            {
                icon: 'settings',
                handler: this.props.routes.settings
            }, {
                icon: 'file-download',
                handler: this.fetchDevice.bind(this)
            }, {
                icon: 'cloud-upload',
                handler: this.syncWithServer.bind(this)
            }
        ];

        return <TopMenu items={ items } />
    }

    render ()
    {
        let Actions = this.props.routes;
        return (
            <View style={styles.container}>
                { this.putTopMenu() }
                <View style={ styles.homePage }>
                    <CapitalText
                        text='Flights list'
                    />
                    <FlightsList/>
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
    filesList : {
        alignItems: 'flex-end',
        flexDirection : 'row'
    }
});

function mapStateToProps (state) {
    return {
        flightsPending: state.flights.pending,
        settingsPending: state.settings.pending,
        storageKeyPrefix: state.settings.storageKey,
        settings: state.settings,
        defaultSettings: state.settings.default
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchFlights: bindActionCreators(fetchFlights, dispatch),
        getSettings: bindActionCreators(getSettings, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
