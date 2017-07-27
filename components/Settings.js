'use strict';

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {View, Text, Button, StyleSheet, TextInput, Keyboard, ScrollView} from 'react-native';

import TopMenu from './TopMenu';
import CapitalText from './CapitalText';

import getSettings from './actions/getSettings';
import saveSettings from './actions/saveSettings';
import clearSettings from './actions/clearSettings';

class Settings extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            configs: {}
        };
    }

    syncState(storedConfigs, stateConfigs) {
        if (Object.keys(stateConfigs).length !== storedConfigs.length) {
            let newStateConfigs = {};
            storedConfigs.forEach((item, index) => {
                    newStateConfigs = {...newStateConfigs,  ...{
                        [item.key]: item.value
                    }};
                }
            );

            this.setState({
                configs: newStateConfigs
            });
        }
    }

    componentDidMount() {
        if (!(this.props.defaultSettings)
            || !(this.props.defaultSettings.length)
        ) {
            throw new Error('Invalid settings reducer configuration');
        }

        if (this.props.pending !== false) {
            this.props.getSettings({
                storageKeyPrefix: this.props.storageKeyPrefix,
                defaultSettings: this.props.defaultSettings
            });
        }

        this.syncState(this.props.settings.items, this.state.configs);
    }

    componentDidUpdate() {
        this.syncState(this.props.settings.items, this.state.configs);
    }

    componentWillReceiveProps(nextProps) {
        if ((nextProps.pending === false)
            && nextProps.settings.items
            && nextProps.settings.items.length
        ) {
            this.syncState(nextProps.settings.items, this.state.configs);
        }
    }

    putTextInput(configItem) {
        return (
            <View key={configItem.index} style={styles.configItem}>
                <Text>{configItem.label}:</Text>
                <TextInput value={this.state.configs[configItem.key] || ''}
                    onChangeText={(text) => {
                        let configs = this.state.configs;
                        configs[configItem.key] = text;
                        this.setState({
                            configs: configs
                        });
                    }}
                />
            </View>
        );
    }

    buildOptions() {
        if (this.props.pending !== false) {
            return <Text>Loading...</Text>
        }

        let storedConfigs = this.props.settings.items;
        return Object.keys(storedConfigs).map((key, index) =>
            this.putTextInput({...storedConfigs[key], ...{index: index}})
        );
    }

    saveSettings() {
        this.props.saveSettings({
            storageKeyPrefix: this.props.storageKeyPrefix,
            configs: this.state.configs
        }).then(() => Keyboard.dismiss());
    }

    render() {
        return (
            <View style={styles.container}>
                <TopMenu
                    items={[
                        {
                            icon: 'home',
                            handler: this.props.routes.home
                        },
                        {
                            icon: 'save',
                            handler: this.saveSettings.bind(this)
                        }
                    ]}
                />
                <View style={styles.body}>
                    <CapitalText
                        text='Settings'
                    />
                    <View style={styles.containerViewParent}>
                      <ScrollView style={styles.containerScrollView}>
                          {this.buildOptions()}
                      </ScrollView>
                    </View>
                </View>
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
    container: {
        flex: 1,
    },

    body: {
        flex: 5,
        backgroundColor: '#fff',
    },

    content: {
        alignItems: 'center',
        padding: 10,
    },

    configItem: {
        width: '100%',
    }
});

function mapStateToProps (state) {
    return {
        pending: state.settings.pending,
        storageKeyPrefix: state.settings.storageKey,
        settings: state.settings,
        defaultSettings: state.settings.default
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getSettings: bindActionCreators(getSettings, dispatch),
        saveSettings: bindActionCreators(saveSettings, dispatch),
        clearSettings: bindActionCreators(clearSettings, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
