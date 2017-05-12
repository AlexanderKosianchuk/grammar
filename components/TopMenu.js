'use strict';

import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';//эта страка так же указана как та которая не используеться, что не так
import Icon from 'react-native-vector-icons/FontAwesome';//как и эта, они все нужны для роботы библиотеки с вкторными иконками
const languageIcon = (<Icon name="map-signs" size={60} color="#F0FFFF" />)//переключение языка
const connectionIcon = (<Icon name="repeat" size={60} color="#F0FFFF" />)//подключение к QAR
const settingsPageIconIcon = (<Icon name="cogs" size={60} color="#708090" />) // страница настроек
const sendingFileIcon = (<Icon name="plus" size={60} color="#F0FFFF" />)//оптравка новых файлов на сервер



export default class TopMenu extends React.Component {
  render() {
        return (
          <View style={ styles.container }>
            <Text>{connectionIcon}</Text>
            <Text>{languageIcon}</Text>
            <Text>{sendingFileIcon}</Text>
          <Text onPress={ this.props.settingsActions }  title={ settingsPageIconIcon } >{settingsPageIconIcon}</Text>
          </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#191970',
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
});

//rocket
