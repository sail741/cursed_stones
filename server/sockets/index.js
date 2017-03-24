const socketio = require('socket.io');
const Game = require('../classes/Game');
const Player = require('../classes/Player');
const passportSocketIo = require("passport.socketio");
var cookieparser = require('cookie');

module.exports = function(server, storeSquelize) {

    var sio = socketio(server);

    sio.use(passportSocketIo.authorize({
        store: storeSquelize,
        secret: 'eflkn65esr5834ktbf384zle348sju384ozehnfsejbf',
    }));

    var game = new Game(sio);

    sio.on('connection', function(socket) {

        console.log('Un client est connecté !');

        socket.on('joinGame', function(id_user) {
            console.log('joinGame',socket.request.user.username);
            game.rejoindre_game(new Player(socket));
        });
    });
}
