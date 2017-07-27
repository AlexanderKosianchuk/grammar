import RNFetchBlob from 'react-native-fetch-blob';
import base64 from 'base-64';

export default function downloadFlightFile (payload) {
    return function(dispatch) {
        dispatch({
            type: 'DOWNLOAD_FILE_START',
            payload: payload
        });

        return new Promise((resolve, reject) => {
            RNFetchBlob
            .config({
                path: payload.path
            })
            .fetch('GET', payload.url, {
                'Authorization' : 'Basic ' + base64.encode(
                    payload.qarLoginHttpAuthorizationd + ':' + payload.qarPassHttpAuth
                )
            }).then(() => {
                    payload.pushFlight(payload);

                    resolve({
                        uuid: payload.uuid,
                    })
                }, () => {
                    reject({
                        uuid: payload.uuid
                    })
                }
            );
        });
    }
};
