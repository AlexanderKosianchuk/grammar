import {AsyncStorage} from 'react-native';

export default function readFlights (payload) {
    return function(dispatch) {
        dispatch({
            type: 'READ_FLIGHTS_START',
            payload: payload
        });

        AsyncStorage.getItem(payload.key, (err, stores) => {
            dispatch({
                type: 'READ_FLIGHTS_COMPLETE',
                payload: { items: stores || [] }
            });
        });
    }
};
