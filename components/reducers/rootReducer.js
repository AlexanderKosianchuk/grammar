import { combineReducers } from 'redux';
import { routerReducer } from 'react-native-redux-router';

import settings from './settings';
import flights from './flights';

export default combineReducers({
    routerReducer,
    settings,
    flights
});
