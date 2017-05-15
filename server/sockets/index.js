const socketio = require('socket.io');
const Game = require('../classes/Game');
const Player = require('../classes/Player');
const passportSocketIo = require("passport.socketio");
var cookieparser = require('cookie');

module.exports = function (server, storeSquelize) {

    var sio = socketio(server);

    sio.use(passportSocketIo.authorize({
        store: storeSquelize,
        secret: 'eflkn65esr5834ktbf384zle348sju384ozehnfsejbf',
    }));

    var game = new Game(sio);

    function global_socket(socket) {

        socket.on('check_already_in_game', function (callback) {
            var in_game = game.check_is_in_game(socket.request.user.username);
            if (in_game) {
                game.reconnection_player(socket.request.user.username, socket);
            }
            callback(in_game);
        });

        socket.on('select_deck', function (id_deck, callback) {
            game.change_deck(socket.request.user.username, id_deck);
            callback();
        });

        socket.on('joinGame', function () {
            // TODO : a supprimer lors de la mise en place du one page
            console.log('joinGame', socket.request.user.username);
            game.rejoindre_game(socket.request.user.username, socket);
        });
    };

    exports.global_socket = global_socket ;

    sio.on('connection', function (socket) {

        var player = new Player(socket);
        game.add_player(player);

        global_socket(socket);

        console.log('Un client est connecté !');
    });
};