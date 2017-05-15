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

        socket.on('check_already_in_game', function(callback){
            callback(game.check_is_in_game(socket.request.user.username,socket));
        });

        socket.on('select_deck', function(id_deck,callback) {
            var player = new Player(socket,id_deck);
            game.add_player(player);
            callback();
        });

        socket.on('joinGame', function() {
            // TODO : a supprimer lors de la mise en place du one page
            console.log('joinGame',socket.request.user.username);
            game.rejoindre_game(socket.request.user.username,socket);
        });
    });
}
