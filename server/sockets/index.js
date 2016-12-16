const socketio = require('socket.io');
const Card = require('../classes/Card');

module.exports = function(server){


	var sio = socketio(server);

	sio.on('connection', function (socket) {

		//socket.on('')
    	console.log('Un client est connecté !');
	});

	var p = new Card();
	console.log(p);

}


