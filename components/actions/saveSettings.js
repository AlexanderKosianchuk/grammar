import {AsyncStorage} from 'react-native';

export default function saveSettings (payload) {
    return function(dispatch) {
        let settings = [];
        let promises = [];
        Object.keys(payload.configs).forEach((key) => {
            if (payload.configs.hasOwnProperty(key)) {
                if (!payload.configs[key]
                    || (payload.configs[key] === '')
                ) {
                    promises.push(AsyncStorage.removeItem(payload.storageKeyPrefix + key));
                } else {
                    promises.push(AsyncStorage.setItem(payload.storageKeyPrefix + key, payload.configs[key]));
                }

                settings.push({key: key, value: payload.configs[key]});
            }
        });

        return Promise.all(promises).then(() =>
            dispatch({
                type: 'SETTINGS_SAVED',
                payload: {
                    items: settings
                }
            })
        )
    }
};
