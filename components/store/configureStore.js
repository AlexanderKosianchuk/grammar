import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { routerReducer } from 'react-native-redux-router';

import rootReducer from '../reducers/rootReducer';

export default function configureStore(initialState) {
    return createStore(
        rootReducer,
        initialState,
        applyMiddleware(thunk)
    );
}
