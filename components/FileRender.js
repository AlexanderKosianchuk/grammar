'use strict';
import React, { Component } from 'react'; 
import { View, Text, Button, TextInput, StyleSheet, AsyncStorage } from 'react-native';
import { Router, routerReducer, Route } from 'react-native-redux-router';
import Home from './Home';
import Settings from './Settings';

class FileRender extends Component
{
	render(){

		return(
		<View style={{flex: 1, paddingTop: 22, backgroundColor: 'red', flexDirection: 'column', width : 100 }}>
			/*{this.WholeFiles()}*/
		
		</View>);
	}
}
}