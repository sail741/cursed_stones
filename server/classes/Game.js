const Partie = require('./Partie');
const Player = require('./Player');
var shortid = require('shortid');

module.exports = class Game {

    constructor(sio) {
        this.partie_liste = [];
        this.player_partie = [];
        this.id_partie = 1;
        this.global_socket = sio;
    }

    rejoindre_game(player) {
        if(this.check_is_in_game(player)){
            return true;
        }
        for (let id_partie in this.partie_liste) {
            if (!this.partie_liste[id_partie].is_full()) {
                this.partie_liste[id_partie].add_player(player);
                this.player_partie[player.socket.request.user.name] = id_partie;
                return true;
            }
        }
        var id_partie = shortid.generate();
        var partie = new Partie(id_partie, this.global_socket);
        this.player_partie[player.socket.request.user.name] = id_partie;
        partie.add_player(player);
        this.partie_liste[id_partie] = partie;
        return true;
    }

    check_is_in_game(player) {

        var id_partie = this.player_partie[player.socket.request.user.name];
        if (id_partie) {
            this.partie_liste[id_partie].get_player(player.pseudo).reconnection(player);
            return true ;
        } else {
            return false ;
        }
    }
}
