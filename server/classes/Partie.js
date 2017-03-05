const Chat = require('./Chat');
require('timers');

const MAX_PLAYER = 2,
    TIMER_TOUR = 10000,
    MAX_MANA = 9,
    STATUS_WAIT = "WAIT",
    STATUS_PAUSED = "PAUSED",
    STATUS_START = "START",
    STATUS_END = "END";

module.exports = class Partie {

    constructor(id_partie, game_manager, partie_perso) {
        this.partie_perso = partie_perso;
        this.game_manager = game_manager;
        this.global_socket = game_manager.global_socket;
        this.partie_status = STATUS_WAIT;
        this.id_partie = id_partie;
        this.nb_player = 0;
        this.nb_deco = 0;
        this.liste_player = [];
        this.num_tour = 1;
        this.mana = 1;
        this.timer_tour = null;
        this.current_time = null;
        this.current_player = Math.floor((Math.random() * MAX_PLAYER));
        this.chat = new Chat(id_partie, game_manager.global_socket);
    }

    is_full() {
        return this.nb_player == MAX_PLAYER;
    }

    add_player(player) {
        if (this.is_full()) {
            throw "is_full";
        }
        this.liste_player.push(player);
        player.add_to_game(this);
        player.socket.join(this.id_partie);
        this.nb_player++;

        if (this.is_full()) {
            console.log("partie started");
            this.start_partie();
        }
    }

    get_player(pseudo) {
        for (var i = 0; i < this.liste_player.length; i++) {
            if (this.liste_player[i].pseudo == pseudo) {
                return this.liste_player[i];
            }
        }
        return null;
    }

    start_partie() {
        var partie = this;
        this.partie_status = STATUS_START;
        this.nouveauTour();
        this.timer_tour = setInterval(function() {
            partie.nouveauTour();
        }, TIMER_TOUR);
    }

    nouveauTour() {
        for (var i = 0; i < this.liste_player.length; i++) {
            this.liste_player[i].socket.emit('nouveauTour', {
                Self: i === this.current_player,
                Num_tour: this.num_tour,
                Mana: this.mana
            });
        }
        this.change_current_player();
        this.num_tour++;
        this.add_mana();
        this.current_time = new Date().getTime();
    }

    is_current_player(pseudo) {
        return this.liste_player[this.current_player].pseudo == pseudo;
    }

    change_current_player() {
        if (this.current_player < MAX_PLAYER - 1) {
            this.current_player++;
        } else {
            this.current_player = 0;
        }
    }

    add_mana() {
        if (this.mana < MAX_MANA) {
            this.mana++;
        }
    }

    resume_game(timer) {
        this.nb_deco--;
        if (this.partie_status == STATUS_PAUSED) {
            var partie = this;
            setTimeout(function() {
                partie.start_partie();
            }, timer);
        }
    }

    pause_game() {
        if (this.partie_status == STATUS_START) {
            this.partie_status = STATUS_PAUSED;
            clearInterval(this.timer_tour);
        }
    }

    deconnexion_player(pseudo) {
        //on met le jeu en pause
        if (this.partie_status == STATUS_START) {
            this.pause_game();
        }
        if (this.partie_status == STATUS_WAIT) {
            this.delete_player(pseudo);
        }
        if (this.partie_status == STATUS_PAUSED) {
            this.nb_deco++;
        }
        return this.partie_status;
    }

    delete_player(pseudo) {
        for (var i = 0; i < this.liste_player.length; i++) {
            if (this.liste_player[i].pseudo == pseudo) {
                this.liste_player[i].delete_game();
                this.game_manager.delete_player(this.liste_player[i].pseudo);
                this.liste_player.splice(i, 1);
            }
        }
        this.nb_player--;

        if(this.nb_player === 0){
            this.partie_status = STATUS_END;
            this.game_manager.destroy_partie(this.id_partie);
        }
    }

    get_timer_tour() {
        return TIMER_TOUR;
    }

    get_status() {
        return this.partie_status;
    }
};
