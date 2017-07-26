'use strict';

import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class TopMenu extends Component {
    constructor(props) {
        super(props);

        this.items = props.items.map((item, index) => {
            return <Icon
                key={index}
                name={item.icon}
                size={30}
                style={styles.ico}
                onPress={item.handler}
            />
        });
    }

    render() {
        return (
            <View style={styles.container}>
                {this.items}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 50,
        backgroundColor: '#1c9b9b',
        flexDirection: 'row-reverse'
    },

    ico: {
        padding: 10,
        alignSelf: 'flex-end',
        color: "#fff"
    },
});
