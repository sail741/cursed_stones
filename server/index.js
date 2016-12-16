const express = require('express');
const http = require('http');
const socketio = require('socket.io');


const PORT = process.env.PORT || 8765;



var app = express(); // web server
// Define a route for a whole path
app.use('/static', express.static('../client/static'));
app.set('view engine', 'ejs');
app.set('views', '../client/');

// define a http server with express
var server = http.Server(app);

require('./model/model');
require('./routes')(app);
require('./sockets')(server);



server.listen(PORT, function(){
	console.log("Server listen on ", PORT);
})