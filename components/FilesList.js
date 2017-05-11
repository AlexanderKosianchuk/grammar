'use strict';
import React, { Component } from 'react'; 
import { View, Text, Button, TextInput, StyleSheet, AsyncStorage, ScrollView, StatusBar } from 'react-native';
import { Router, routerReducer, Route } from 'react-native-redux-router';
import Home from './Home';
import Settings from './Settings';
import ServerCard from './ServerCard';


var STORAGE_PREFIX = '@QarSyncManagerFiles:files';

var list = [];// тот самый список серверкардов
var colors = [];
var rendered = false;
class FilesList extends Component
{
	
	constructor(props)
		{
  			super(props);
  			
			this.state = {
      			visible: false,
      			rendered : this.props.rendering
    		};
  			
  			this.files =  [];
  			this.tests = [];
  			
  			if (this.state.rendered === true)
  			{
  				this.getterAndTakingInList();
  			}		
		}

	async getterAndTakingInList() // async method for reading from AsyncStorage
  		{
  			for (var i = 0; i < this.props.LENGTH/*length of an array, using props*/; i++)
  			{
  				try {//code from facebook example, to work with async
  					const value = await AsyncStorage.getItem(STORAGE_PREFIX + i);
  						if (value !== null){
    					this.files.push(JSON.parse(value));
    					
  							}
					} 
					catch (error) 
					{
  						// here to display something
					}
  			}

  			// part of code, to COMPONENTS elements in array
  			this.files.map(function(element, i) {
        list.push( <ServerCard 
        	
        	name = {element.name}

            key = {i}

            lastDateSavingFromQAR = {element.lastDateSavingFromQAR}

            syncDate = {element.syncDate}

            status = {element.status}
            />);
        });
	}

	render(){
		return(
			<View style={styles.containerForViewParent}>
				<ScrollView style={styles.containerForScrollView}>

						{list}
	
				</ScrollView>
			</View>);
			
	}
}


const styles = StyleSheet.create({
    containerForViewParent: {
        flex : 1, 
        flexDirection: 'row' 
    },
    containerForScrollView: {
        flex : 1, 
        flexDirection: 'column'
    }
});

  

module.exports = FilesList;