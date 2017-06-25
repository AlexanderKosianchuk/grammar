'use strict';
import base64 from 'base-64'
import parse5 from 'parse5'
var DomParser = require('react-native-html-parser').DOMParser
//var Parser = require('html-react-parser');

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
            let html = response._bodyInit.toString();
            QarConnector.getFilesList(html) 
        })
    },
    getFilesList(html) {
        // slicing here html body
        var posFirst = html.indexOf("<tbody>")
        var posLast = html.lastIndexOf("</tbody>");
        var endOfFile = posLast;
        html = html.slice(posFirst, posLast)
        var arr = [];
        while(posLast != -1){
        //here filling with values an array
            var result;
            posFirst = html.indexOf('<a href')
            posLast = html.indexOf('a>')
            result = html.slice(posFirst /*+ 54*/, posLast - 2)
            arr.push(result)
            html = html.slice(posLast + 2, endOfFile)
        }
        for (var i = 0; i < arr.length; i++){
            // here fixing te get simply file names
            arr[i] = arr[i].slice(54, arr[i].length);
        }             
    }
}

export default QarConnector;