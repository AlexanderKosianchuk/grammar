'use strict';

import React, { Component } from 'react';
import { View, Text, StyleSheet, AsyncStorage, Alert } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import TopMenu from './TopMenu';
import CapitalText from './CapitalText';
import FlightsList from './FlightsList';

import fetchFlights from './actions/fetchFlights';
import getSettings from './actions/getSettings';

class Home extends React.Component
{
    fetchDevice()
    {
        let deviceSettings = ['qarIp', 'qarLoginHttpAuthorizationd', 'qarPassHttpAuth', 'fdrId'];
        if (!this.isValid(deviceSettings)) {
            Alert.alert('Settings Misconfiguration','Incorrect QAR connection settings')
            return;
        }

        this.props.fetchFlights(
            this.retrieveSettings(deviceSettings)
        );
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

    componentDidUpdate() {
        if ((this.props.settingsPending === false)
            && (this.props.flightsPending === null)
        ) {
            this.fetchDevice(
                this.retrieveSettings(deviceSettings)
            );
        }
    }

    isValid(settingsKeys)
    {
        let requestedSettings = this.retrieveSettings(settingsKeys);

        if (Object.keys(requestedSettings).length === settingsKeys.length) {
            return true;
        }

        return false;
    }

    retrieveSettings(settingsKeys)
    {
        let requestedSettings = {};
        settingsKeys.forEach((item, index) => {
            let searchedIndex = this.props.settings.items.findIndex(
                element => element.key === item
            );

            if (this.props.settings.items.length
                && (searchedIndex !== null)
                && (this.props.settings.items[searchedIndex].value.length > 3)
            ) {
                requestedSettings = {
                    ...requestedSettings,
                    ...{ [item]: this.props.settings.items[searchedIndex].value}
                }
            }
        });

        return requestedSettings;
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
        settingsPending: state.settings.pending,
        storageKeyPrefix: state.settings.storageKey,
        settings: state.settings,
        defaultSettings: state.settings.default,
        flightsPending: state.flights.pending
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchFlights: bindActionCreators(fetchFlights, dispatch),
        getSettings: bindActionCreators(getSettings, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
