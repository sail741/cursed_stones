const socketio = require('socket.io');
const Card = require('../classes/Card');
const Game = require('../classes/Game');
const passportSocketIo = require("passport.socketio");

module.exports = function(server,storeSquelize){

	var game = new Game();
	var sio = socketio(server);

	sio.use(passportSocketIo.authorize({
		store :	storeSquelize,
  	secret: 'eflkn65esr5834ktbf384zle348sju384ozehnfsejbf',
	}));

	sio.on('connection', function (socket) {

    	console.log('Un client est connecté !');

			socket.on('joinGame',function (id_user) {
				console.log(socket.request.user.logged_in);
			});
	});
}
