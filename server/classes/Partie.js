const Chat = require('./Chat');
require('timers');
const Constant = require('./Constant');
const Utils = require('./Utils');
const Board = require('./Board');
const Test = require('./Test');

module.exports = class Partie {

    constructor(id_partie, game_manager, partie_perso) {
        this.partie_perso = partie_perso;
        this.game_manager = game_manager;
        this.global_socket = game_manager.global_socket;
        this.partie_status = Constant.STATUS_WAIT;
        this.id_partie = id_partie;
        this.nb_player = 0;
        this.nb_deco = 0;
        this.liste_player = [];
        this.num_tour = 1;
        this.mana = 1;
        this.timer_tour = null;
        this.current_time = null;
        this.board = null;
        this.current_player = Math.floor((Math.random() * Constant.MAX_PLAYER));
        this.id_first_player = this.current_player;
        this.chat = new Chat(id_partie, game_manager.global_socket);
    }

    is_full() {
        return this.nb_player == Constant.MAX_PLAYER;
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
        this.partie_status = Constant.STATUS_START;
        this.board = new Board(this.liste_player[0].pseudo, this.liste_player[1].pseudo)
        this.init_player();
        this.nouveauTour();
        this.run_timer_tour();
    }

    init_player() {
        for (var i = 0; i < this.liste_player.length; i++) {
            //aller chercher un deck en base de donnees
            var json_deck = Test.json_deck;
            var deck = Utils.convertJSONToDeck(json_deck);
            deck.shuffle_deck();
            this.liste_player[i].add_deck(deck, i == this.current_player);
        }
    }

    run_timer_tour() {
        var partie = this;
        this.timer_tour = setInterval(function() {
            partie.change_current_player();
            if (partie.current_player == partie.id_first_player) {
                partie.num_tour++;
                partie.add_mana();
            }
            partie.nouveauTour();
        }, Constant.TIMER_TOUR);
    }

    nouveauTour() {
        for (var i = 0; i < this.liste_player.length; i++) {
            this.liste_player[i].etat = (i == this.current_player ? Constant.ETAT_PIOCHE : Constant.ETAT_STAY);
            this.liste_player[i].mana = this.mana;
            this.liste_player[i].socket.emit('nouveauTour', {
                Self: i === this.current_player,
                Num_tour: this.num_tour,
                Mana: this.mana
            });
        }
        this.current_time = new Date().getTime();
    }

    is_current_player(pseudo) {
        return this.liste_player[this.current_player].pseudo == pseudo;
    }

    change_current_player() {
        if (this.current_player < Constant.MAX_PLAYER - 1) {
            this.current_player++;
        } else {
            this.current_player = 0;
        }
    }

    add_mana() {
        if (this.mana < Constant.MAX_MANA) {
            this.mana++;
        }
    }

    resume_game(timer) {
        this.nb_deco--;
        if (this.partie_status == Constant.STATUS_PAUSED) {
            var partie = this;
            setTimeout(function() {
                partie.start_partie();
            }, timer);
        }
    }

    pause_game() {
        if (this.partie_status == Constant.STATUS_START) {
            this.partie_status = Constant.STATUS_PAUSED;
            clearInterval(this.timer_tour);
        }
    }

    deconnexion_player(pseudo) {
        //on met le jeu en pause
        if (this.partie_status == Constant.STATUS_START) {
            this.pause_game();
        }
        if (this.partie_status == Constant.STATUS_WAIT) {
            this.delete_player(pseudo);
        }
        if (this.partie_status == Constant.STATUS_PAUSED) {
            this.nb_deco++;
            if (this.nb_deco == Constant.MAX_PLAYER) {
                this.delete_all_player();
                this.destroy_partie();
            }
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
        if (this.nb_player === 0) {
            this.destroy_partie();
        }
    }

    delete_all_player() {
        //faire la gestion des points ici
        for (var i = 0; i < this.liste_player.length; i++) {
            this.liste_player[i].delete_game();
            this.game_manager.delete_player(this.liste_player[i].pseudo);
        }
    }

    abandon(pseudo) {
        //gestion des points ici
        //notifier fin de partie
        clearInterval(this.timer_tour);
        this.delete_all_player();
        this.destroy_partie();
    }

    destroy_partie() {
        this.partie_status = Constant.STATUS_END;
        this.game_manager.destroy_partie(this.id_partie);
    }

    get_status() {
        return this.partie_status;
    }
};
