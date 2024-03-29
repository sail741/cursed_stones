const Chat = require('./Chat');
require('timers');
const Constant = require('./Constant');
const Utils = require('./Utils');
const Deck = require('./Deck');
const Board = require('./Board');
const Model = require('../model/model');

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
        this.paused_time = null;
        this.board = null;
        this.resume_game_timer = null;
        this.current_player = Math.floor((Math.random() * Constant.MAX_PLAYER));
        this.id_first_player = this.current_player;
        this.chat = new Chat(id_partie, game_manager.global_socket);
    }

    is_full() {
        return this.nb_player == Constant.MAX_PLAYER;
    }

    add_player(player) {
        if (this.is_full()) {
            throw new Error(Constant.GAME_FULL);
        }
        this.liste_player.push(player);
        player.add_to_game(this);
        this.join_socket_room(player.socket);
        this.nb_player++;

        if (this.is_full()) {
            console.log("partie started");
            this.start_partie();
        }
    }

    join_socket_room(socket) {
        socket.join(this.id_partie);
    }

    send_message_to_room(packet, message) {
        this.global_socket.in(this.id_partie).emit(packet, message);
    }

    get_adversaire_player(pseudo) {
        for (var i = 0; i < this.liste_player.length; i++) {
            if (this.liste_player[i].pseudo != pseudo) {
                return this.liste_player[i];
            }
        }
        return null;
    }

    start_partie() {
        this.partie_status = Constant.STATUS_START;
        this.board = new Board(this, this.liste_player[0].pseudo, this.liste_player[1].pseudo);
        var partie = this;
        this.init_player(function () {
            partie.emit_pseudo();
            partie.nouveauTour();
            partie.run_timer_tour(Constant.TIMER_TOUR);
        });
    }

    emit_pseudo() {
        for (let i = 0; i < this.liste_player.length; i++) {
            this.liste_player[i].socket.emit(Constant.SOCKET_START_GAME, {
                Pseudo: this.liste_player[i].pseudo,
                Pseudo_adv: this.liste_player[i == 0 ? 1 : 0].pseudo
            });
        }
    }

    init_player(cb) {
        var partie = this;

        let i = -1;

        let next = function(){
            i++;
            if(i == partie.liste_player.length){
                cb();
                return;
            }
            let deck = new Deck();
            let player = partie.liste_player[i];


            deck.convertJSONToDeck(player.id_deck, function(){
                deck.shuffle_deck();
                player.add_deck(deck, i == partie.current_player);
                player.socket.emit(Constant.SOCKET_SET_SLIDE, i === 0 ? Constant.LEFT : Constant.RIGHT);
                next();

            });



        };

        next();

    }

    run_timer_tour(timer) {
        var partie = this;
        this.timer_tour = setInterval(function () {
            partie.change_current_player();
            if (partie.current_player == partie.id_first_player) {
                partie.num_tour++;
                partie.add_mana();
            }
            partie.nouveauTour();
        }, timer);
    }

    sync_board(player) {
        player.socket.emit(Constant.SOCKET_SYNC_BOARD, this.board.to_json(player.pseudo));
    }

    nouveauTour() {
        this.board.reset_etat(this.liste_player[this.current_player].pseudo);
        for (var i = 0; i < this.liste_player.length; i++) {
            this.liste_player[i].etat = (i == this.current_player ? Constant.ETAT_PIOCHE : Constant.ETAT_STAY);
            this.liste_player[i].mana = this.mana;
            //on met a jour le plateau des joueurs
            this.sync_board(this.liste_player[i]);
            //on signale le nouveau tour
            this.liste_player[i].socket.emit(Constant.SOCKET_NEW_TOUR, {
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

    resume_game(player) {
        this.nb_deco--;
        player.socket.emit(Constant.SOCKET_SET_SLIDE, this.liste_player[0].pseudo === player.pseudo ? Constant.LEFT : Constant.RIGHT);
        this.sync_board(player);

        if (this.partie_status == Constant.STATUS_PAUSED && this.nb_deco == 0) {
            var partie = this;
            this.partie_status = Constant.STATUS_START;
            this.resume_game_timer = setTimeout(function () {
                partie.run_timer_tour(Constant.TIMER_TOUR);
            }, this.paused_time);
        }
    }

    pause_game() {
        if (this.partie_status == Constant.STATUS_START) {
            this.partie_status = Constant.STATUS_PAUSED;
            this.paused_time = (this.current_time + Constant.TIMER_TOUR) - new Date().getTime();
            clearInterval(this.timer_tour);
            clearTimeout(this.resume_game_timer);
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
                //this.game_manager.delete_player(this.liste_player[i].pseudo);
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
            //this.game_manager.delete_player(this.liste_player[i].pseudo);
        }
    }

    maj_point(id_user,nb_point){
        Model.users.update_points(id_user,nb_point,function (res) {
            console.log(res);
            if(res.status == 0){
                console.log(res.error);
            }
        });
    }

    abandon(player) {
        this.send_winner(this.get_adversaire_player(player.pseudo).pseudo);
        this.maj_point(player.id_user,Constant.POINT_RAGE_QUIT);
        this.maj_point(this.get_adversaire_player(player.pseudo).id_user,Constant.POINT_WIN);
        //notifier fin de partie
        this.fin_partie();
    }

    destroy_partie() {
        this.partie_status = Constant.STATUS_END;
        this.game_manager.destroy_partie(this.id_partie);
    }

    fin_tour() {
        clearInterval(this.timer_tour);
        this.change_current_player();
        if (this.current_player == this.id_first_player) {
            this.num_tour++;
            this.add_mana();
        }
        this.nouveauTour();
        this.run_timer_tour(Constant.TIMER_TOUR);
    }

    is_finish() {
        if (this.board.kingdom_J1_is_destroy()) {
            this.send_winner(this.liste_player[1].pseudo);
            this.maj_point(this.liste_player[1].id_user,Constant.POINT_WIN);
            this.maj_point(this.liste_player[0].id_user,Constant.POINT_LOOSE);
            this.fin_partie();
        }
        if (this.board.kingdom_J2_is_destroy()) {
            this.send_winner(this.liste_player[0].pseudo);
            this.maj_point(this.liste_player[1].id_user,Constant.POINT_LOOSE);
            this.maj_point(this.liste_player[0].id_user,Constant.POINT_WIN);
            this.fin_partie();
        }

    }

    fin_partie() {
        clearInterval(this.timer_tour);
        clearTimeout(this.resume_game_timer);
        this.delete_all_player();
        this.destroy_partie();
    }

    send_winner(pseudo) {
        for (var i = 0; i < this.liste_player.length; i++) {
            this.liste_player[i].socket.emit(Constant.SOCKET_FINISH, {
                winner_self: this.liste_player[i].pseudo == pseudo
            });
        }
    }

    get_status() {
        return this.partie_status;
    }
};
