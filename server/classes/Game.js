const Partie = require('./Partie');
const Player = require('./Player');
var shortid = require('shortid');
const Constant = require('./Constant');

module.exports = class Game {

    constructor(sio) {
        this.partie_perso_liste = [];
        this.player_liste = {};
        this.id_partie = 1;
        this.global_socket = sio;
        this.current_classed = new Partie(shortid.generate(), this, false);
    }

    rejoindre_game(pseudo) {
        if (this.check_is_in_game(pseudo)) {
            return true;
        }
        if (!this.current_classed.is_full() && this.current_classed.partie_status === Constant.STATUS_WAIT) {
            this.current_classed.add_player(this.player_liste[pseudo]);
        } else {
            this.current_classed = new Partie(shortid.generate(), this, false);
            this.current_classed.add_player(this.player_liste[pseudo]);
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
            throw new Error(Constant.GAME_NAME_ALREADY_EXIST);
        } else {
            this.partie_perso_liste[id_partie] = new Partie(id_partie, this, true);
        }
    }

    create_perso() {
        this.create_perso(shortid.generate());
    }

    check_is_in_game(pseudo) {
        var player = this.player_liste[pseudo];
        if (player !== undefined) {
            if (player.partie !== null) {
                if (player.partie.get_status() !== Constant.STATUS_WAIT) {
                    return true;
                }
            }
        }
        return false;
    }

    reconnection_player(pseudo,new_socket) {
        var old_version_player = this.player_liste[pseudo];
        //la personne est deja connecter elle ne devrais pas pouvoir demander la reconnexion
        if (old_version_player.socket.id != new_socket.id) {
            if (!old_version_player.is_disconnected) {
                old_version_player.socket.disconnect();
            }
            old_version_player.reconnection(new_socket);
        }
    }

    add_player(player) {
        if(this.player_liste[player.pseudo] == null) {
            this.player_liste[player.pseudo] = player;
        }
    }

    destroy_partie(id_partie) {
        delete this.partie_perso_liste[id_partie];
    }

    delete_player(pseudo) {
        if(!this.check_is_in_game(pseudo)) {
            delete this.player_liste[pseudo];
        }
    }

    change_deck(pseudo,id_deck) {
        if(!this.check_is_in_game(pseudo)) {
            this.player_liste[pseudo].change_deck(id_deck);
        }
    }
};
