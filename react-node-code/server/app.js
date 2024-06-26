/**
 * The Server Can be configured and created here...
 * 
 * You can find the JSON Data file here in the Data module. Feel free to impliment a framework if needed.
 */

/*
-- This is the product data, you can view it in the file itself for more details 
{
    "_id": "019",
    "isActive": "false",
    "price": "23.00",
    "picture": "/img/products/N16501_430.png",
    "name": "Damage Reverse Thickening Conditioner",
    "about": "Dolor voluptate velit consequat duis. Aute ad officia fugiat esse anim exercitation voluptate excepteur pariatur sit culpa duis qui esse. Labore amet ad eu veniam nostrud minim labore aliquip est sint voluptate nostrud reprehenderit. Ipsum nostrud culpa consequat reprehenderit.",
    "tags": [
        "ojon",
        "conditioner"
    ]
}
*/
const data      = require('./data');
const http      = require('http');
const hostname  = 'localhost';
const port      = 3035;
var url = require('url');

/** 
 * Start the Node Server Here...
 * 
 * The http.createServer() method creates a new server that listens at the specified port.  
 * The requestListener function (function (req, res)) is executed each time the server gets a request. 
 * The Request object 'req' represents the request to the server.
 * The ServerResponse object 'res' represents the writable stream back to the client.
 */
// console.log(data)
http.createServer(function (req, res) {
    // .. Here you can create your data response in a JSON format
    let urlInfo = url.parse(req.url, true); // host, pathname, search
    let method = req.method;

    if (method == 'GET') { 
        const path  = urlInfo.pathname;
        const searchBy  = urlInfo.query.searchBy;
        if (path.includes('product')  && searchBy) {
            res.writeHead(200, {'Content-Type': 'application/json;', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'POST, GET, PUT, DELETE, OPTIONS', "Access-Control-Allow-Headers": "If-Modified-Since"});
            let filterData  = data.filter((value)=>value.name.includes(searchBy) ||  value.about.includes(searchBy) || value.tags.includes(searchBy) )
            filterData = filterData || []
            res.write(JSON.stringify(filterData));
            res.end();
        } 
    } else {
        res.write("Server Started"); // Write out the default response
        res.end();
    }
	
	  
    // res.write("Response goes in here..."); // Write out the default response
    // res.end(); //end the response
}).listen( port );


console.log(`[Server running on ${hostname}:${port}]`);
