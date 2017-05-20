'use strict';
import base64 from 'base-64'

// object to connect to remoted server    
var QarConnector = {
    connect: function(qarTokenUrl, clientID, clientSecret) {
        fetch(qarTokenUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type' : 'application/text',
                "Authorization" : "Basic " + base64.encode(clientID + ":" + clientSecret)
            }
        })
        .then (function(response){
            console.log(response)
        })
   }
}

export default QarConnector;