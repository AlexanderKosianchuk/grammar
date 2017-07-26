'use strict';

import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import App from './components/App';

import configureStore from './components/store/configureStore';
const store = configureStore({});

export default class QarSyncManager extends Component {
    render() {
      return (
          <Provider store={store}>
              <App />
          </Provider>
      );
    }
  }

AppRegistry.registerComponent('QarSyncManager', () => QarSyncManager);
