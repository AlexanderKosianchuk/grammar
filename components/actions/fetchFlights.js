import base64 from 'base-64';
import uuidV4 from 'uuid/v4';
import RNFetchBlob from 'react-native-fetch-blob';
import moment from 'moment';

import downloadFlightFile from './downloadFlightFile';

function dispatchFail (dispatch, request, response) {
    dispatch({
        type: 'FETCH_FLIGHTS_FAILED',
        payload: { request: request, response: response}
    });
};

export default function fetchFlights (payload) {
    return function(dispatch) {
        dispatch({
            type: 'FETCH_FLIGHTS_START',
            payload: payload
        });

        fetch(payload.qarIp, {
            method: 'GET',
            headers: {
                'Accept': 'text/html',
                'Content-Type' : 'text/html',
                'Authorization' : 'Basic ' + base64.encode(
                    payload.qarLoginHttpAuthorizationd + ':' + payload.qarPassHttpAuth
                )
            }
        })
        .then (
            (response) => {
                response.text().then(
                    (html) => {
                        let files = [];

                        let match = [];
                        let pattern = /<a href="((.*?).dat)"/g;;

                        while (match = pattern.exec(html)) {
                            files.push(match[1]);
                        }

                        let dfd = [];
                        let flights = [];

                        // callback to add flights in downloadFlightFile fn
                        let pushFlight = (flight) => {
                            flights.push(flight);
                        }

                        files.forEach((url) => {
                            let uuid = uuidV4();
                            let name = url.substring(url.lastIndexOf('/') + 1);
                            let path = RNFetchBlob.fs.dirs.DocumentDir + '/flight-files/' + uuid + '_' + name;

                            dfd.push(downloadFlightFile({
                                    pushFlight: pushFlight,
                                    uuid: uuid,
                                    name: name,
                                    url: url,
                                    path: path,
                                    readoutData: moment().format('DD MM YYYY HH:mm:ss'),
                                    sendData: '',
                                    status: 'readout',
                                    fdrId: payload.fdrId,
                                    qarLoginHttpAuthorizationd: payload.qarLoginHttpAuthorizationd,
                                    qarPassHttpAuth: payload.qarPassHttpAuth
                                })(dispatch)
                            );
                        });

                        Promise.all(dfd).then(
                            () => {
                                dispatch({
                                    type: 'FETCH_FLIGHTS_COMPLETE',
                                    payload: { items: flights }
                                });
                            },
                            () => {
                                dispatch({
                                    type: 'DOWNLOAD_FLIGHT_FILES_FAILED',
                                });
                            }
                        );
                    },
                    (response) => { dispatchFail(dispatch, payload, response) }
                )
            },
            (response) => { dispatchFail(dispatch, payload, response) }
        );
    }
};
