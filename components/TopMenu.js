'use strict';

import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
const myIcon = (<Icon name="map-signs" size={60} color="#F0FFFF" />)//переключение языка
const myIcon2 = (<Icon name="repeat" size={60} color="#F0FFFF" />)//подключение к QAR
const myIcon3 = (<Icon name="cogs" size={60} color="#708090" />) // страница настроек
const myIcon4 = (<Icon name="plus" size={60} color="#F0FFFF" />)//оптравка новых файлов на сервер
import { Col, Row, Grid } from "react-native-easy-grid";


export default class TopMenu extends React.Component {
  render() {
        return (
          <View style={{backgroundColor: '#191970',flexDirection: 'row',justifyContent: 'space-between',}}>
            <Text>{myIcon2}</Text>
            <Text>{myIcon}</Text>
            <Text>{myIcon4}</Text>
          <Text onPress={ this.props.settingsActions }  title={ myIcon3 } >{myIcon3}</Text>
          </View>
        );
    }
}

/*
backgroundColor: '#ee1',
alignSelf: 'stretch',
textAlign: 'center',
onPress={ Actions.settings }
*/

module.exports = TopMenu;
//rocket
