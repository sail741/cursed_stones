const express = require('express');
const http = require('http');
const socketio = require('socket.io');


const PORT = process.env.PORT || 8765;



var app = express();
app.use('/static', express.static('../client/static'));
app.set('view engine', 'ejs');
app.set('views', '../client/');


var server = http.Server(app);

require('./routes')(app);
require('./sockets')(server);



server.listen(PORT, function(){
	console.log("Server listen on ", PORT);
})