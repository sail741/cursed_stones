const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const flash = require('connect-flash');

const morgan       = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser   = require('body-parser');
const session      = require('express-session');

const PORT = process.env.PORT || 8765;


var app = express(); // web server

app.use(flash()); 
// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms
app.use(session({ secret: 'eflkn65esr5834ktbf384zle348sju384ozehnfsejbf' })); // session secret

// Define a route for a whole path
app.use('/static', express.static('../client/static'));
app.set('view engine', 'ejs');
app.set('views', '../client/');

require('./passport')(app);

// define a http server with express
var server = http.Server(app);

require('./model/model');
require('./routes')(app);
require('./sockets')(server);



server.listen(PORT, function(){
	console.log("Server listen on ", PORT);
})