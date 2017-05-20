'use strict';
import base64 from 'base-64'
var response;

// object to connect to remoted server    
var qarConnector = {
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
            console.log(response);
            return response;
        })
   }
}

export default qarConnector;