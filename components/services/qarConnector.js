'use strict';
import base64 from 'base-64'

// object to connect to remoted server  
let QarConnector = { 
    async connect (qarTokenUrl, clientID, clientSecret) {
        qarAuthToken : "",
        fetch(qarTokenUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type' : 'application/text',
                "Authorization" : "Basic " + base64.encode(clientID + ":" + clientSecret)
            }
        })
        .then (function(response){
            QarConnector.getFilesList(response);
        })
    },
    getFilesList(response) {
        return JSON.stringify(JSON.stringify(response));
    }
}

export default QarConnector;