const Partie = require('./Partie');
const Player = require('./Player');
var shortid = require('shortid');

const STATUS_WAIT = "WAIT",
    STATUS_PAUSED = "PAUSED",
    STATUS_START = "START";

module.exports = class Game {

    constructor(sio) {
        this.current_classed = new Partie(shortid.generate(), sio);
        this.partie_perso_liste = [];
        this.player_liste = [];
        this.id_partie = 1;
        this.global_socket = sio;
    }

    rejoindre_game(player) {
        if (this.check_is_in_game(player)) {
            return true;
        }
        if (!this.current_classed.is_full()) {
            this.current_classed.add_player(player);
            this.player_liste[player.pseudo] = player;
        } else {
            this.current_classed = new Partie(shortid.generate(), this.global_socket);
            this.current_classed.add_player(player);
            this.player_liste[player.pseudo] = player;
        }
    }

    rejoindre_game_perso(id_game, player) {
        if (this.check_is_in_game(player)) {
            return true;
        }
        if (this.partie_perso_liste[id_partie] !== null) {
            if (!this.partie_perso_liste[id_partie].is_full()) {
                this.partie_perso_liste[id_partie].add_player(player);
                this.player_liste[player.pseudo] = player;
                return true;
            }
        }
        return false;
    }

    create_perso(id_partie) {
        if (this.partie_perso_liste[id_partie] !== null) {
            throw "already exist";
        } else {
            this.partie_perso_liste[id_partie] = new Partie(id_partie, this.global_socket);
        }
    }

    create_perso() {
        this.create_perso(shortid.generate());
    }

    check_is_in_game(new_version_player) {
        var old_version_player = this.player_liste[new_version_player.pseudo];
        if (old_version_player !== undefined && old_version_player.game !== null && old_version_player.partie.get_status() !== STATUS_WAIT) {
            old_version_player.reconnection(new_version_player);
            return true;
        } else {
            return false;
        }
    }
};
