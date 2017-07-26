import {AsyncStorage} from 'react-native';

export default function fetchFlights (payload) {
    return function(dispatch) {
        dispatch({
            type: 'READ_FLIGHTS_START',
            payload: payload
        });

        AsyncStorage.get(payload.settingsKey, (err, stores) => {
            let stored = {};
            stores.forEach((item) => {
                let key = item[0].replace(payload.storageKeyPrefix, '');
                stored = {...stored, ...{[key]: item[1] || ''}};
            });

            let settings = payload.defaultSettings.map((item) => {
                //clone for prevent modifying defaultSettings items
                let newItem = Object.assign({}, item);
                if (stored[item.key]
                    && (stored[item.key] !== item.value)
                ) {
                    newItem.value = stored[item.key];
                }

                return newItem;
            });

            dispatch({
                type: 'READ_FLIGHTS_COMPLETE',
                payload: {items: flights}
            });
        });
    }
};
