'use strict';
import base64 from 'base-64'

// object to connect to remoted server  
let QarConnector = { 
    async connect (qarTokenUrl, clientID, clientSecret) {
        qarAuthToken : "",
        fetch(qarTokenUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/text',
                'Content-Type' : 'application/text',
                "Authorization" : "Basic " + base64.encode(clientID + ":" + clientSecret)
            }
        })
        .then (function(response){
            let html = response._bodyInit
            QarConnector.getFilesList(html) 
        })
    },
    getFilesList(html) {// method for getting an array of names of files from server
        var posFirst = html.indexOf("<tbody>")
        var posLast = html.lastIndexOf("</tbody>");
        var endOfFile = posLast;
        html = html.slice(posFirst, posLast)

        var arrayOfFileNames = [];
        var match = [];
        var pattern = /<a href="(.*?)"/g;

        while(match=pattern.exec(html)){
            arrayOfFileNames.push(match[1]);
        }
    }
}
export default QarConnector;