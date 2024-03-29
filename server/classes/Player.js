const Constant = require('./Constant');
const global_socket = require('../sockets/index');

module.exports = class Player {

    constructor(socket) {
        this.socket = socket;
        this.pseudo = socket.request.user.username;
        this.id_user = socket.request.user.id_user;
        this.id_deck = 1 ;
        this.partie = null;
        this.timer_reconnexion = null;
        this.deck = null;
        this.hand = null;
        this.etat = null;
        this.mana = 0;
        this.is_disconnected = false;
    }

    toJson() {
        return {
            "pseudo": this.pseudo
        };
    }

    change_deck(id_deck) {
        this.id_deck = id_deck;
    }

    add_to_game(partie) {
        this.partie = partie;
        this.socket_function();
    }

    add_deck(deck, first_player) {
        this.deck = deck;
        this.hand = deck.get_hand(first_player);
        var hand = this.hand;
        this.socket.emit(Constant.SOCKET_FIRST_HAND, {
            hand: hand
        });
    }

    delete_game() {
        clearTimeout(this.timer_reconnexion);
        //il faut pas deconnecter pour le one page
        //this.socket.disconnect();
        this.socket.removeAllListeners();
        global_socket.global_socket(this.socket);
        this.partie = null;
    }

    socket_function() {
        var player = this;

        player.socket.on(Constant.SOCKET_MESSAGE, function (message) {
            player.partie.chat.add_message(player.pseudo, message);
        });

        //on ne pioche qu'une fois en debut de tours
        player.socket.on(Constant.SOCKET_GET_CARD, function () {
            try {
                if (!player.partie.is_current_player(player.pseudo)) {
                    throw new Error(Constant.IS_NOT_YOUR_TURN);
                }
                if(player.hand.length >= Constant.NB_CARD_MAX_IN_HAND){
                    throw new Error(Constant.MAX_CARD_IN_HAND_REACH);
                }
                if (player.etat === Constant.ETAT_PIOCHE) {
                    var card = player.deck.piocher_carte();
                    player.hand.push(card);
                    player.etat = Constant.ETAT_PLAYING;

                    //on renvoie la main du joueur + la nouvelle carte
                    player.socket.emit(Constant.SOCKET_GET_CARD, {
                        hand: player.hand,
                        new_card: card
                    });
                }
            } catch (exception) {
                console.error(exception);
                player.socket.emit(Constant.SOCKET_INFORMATION, exception.message);
            }
        });


        player.socket.on(Constant.SOCKET_DISCONNECT, function () {
            console.log('joueur ' + player.pseudo + ' a deconnecte de la partie ' + player.partie.id_partie);

            player.is_disconnected = true;
            //on previens les autres joueurs de la deconnexion
            player.partie.send_message_to_room(Constant.SOCKET_SIGNAL_DISCONNECT, {
                player: player.pseudo,
            });
            //deconnexion du joueur
            var status = player.partie.deconnexion_player(player.pseudo);

            if (status === Constant.STATUS_PAUSED) {
                //abandon si le joueur ne se reconnecte pas dans le temps imparti
                player.timer_reconnexion = setTimeout(function () {
                    player.partie.abandon(player);
                }, Constant.TIMER_RECONNEXION);
            }
        });

        player.socket.on(Constant.SOCKET_PLACE_CARD, function (json) {
            try {
                if (!player.partie.is_current_player(player.pseudo)) {
                    throw new Error(Constant.IS_NOT_YOUR_TURN);
                }
                var card = player.get_card(json.card.uid);
                if (card === null) {
                    throw new Error(Constant.UID_NOT_EXIST_IN_HAND);
                }
                if (card.cost > player.mana) {
                    throw new Error(Constant.NEED_MORE_MANA);
                }
                var entity = player.partie.board.put_card(player.pseudo, card, json.position);
                player.delete_card_in_hand(card);
                player.mana = player.mana - card.cost;
                player.broadcast_msg(Constant.SOCKET_OPPENENT_NOTIFY_CHANGE, {
                    mana_left: player.mana,
                    cards_change: -1
                });
                player.socket.emit(Constant.SOCKET_PLACE_CARD, {
                    hand: player.hand,
                    sucess: true,
                    mana_left: player.mana
                });
            } catch (exception) {
                console.error(exception);
                player.socket.emit(Constant.SOCKET_PLACE_CARD, {
                    hand: player.hand,
                    error: exception.message,
                    sucess: false,
                    mana_left: player.mana
                });
            }
        });

        player.socket.on(Constant.SOCKET_MOVE_ENTITY, function (json) {
            try {
                if(!player.partie.is_current_player(player.pseudo)){
                  throw new Error(Constant.IS_NOT_YOUR_TURN);
                }
                player.partie.board.move_entity(json.entity, json.origin, json.dest);
                player.socket.emit(Constant.SOCKET_MOVE_ENTITY, {
                    success: true
                });
            } catch (exception) {
                console.error(exception);
                player.socket.emit(Constant.SOCKET_MOVE_ENTITY, {
                    success: false,
                    error: exception.message
                });
            }
        });

        player.socket.on(Constant.SOCKET_ATTACK, function (json) {
            try {
                if(!player.partie.is_current_player(player.pseudo)){
                    throw new Error(Constant.IS_NOT_YOUR_TURN);
                }
                player.partie.board.attack_entity(json.entity, json.origin, json.dest);
                player.socket.emit(Constant.SOCKET_ATTACK, {
                    success: true
                });
                player.partie.is_finish();
            } catch (exception) {
                console.error(exception);
                player.socket.emit(Constant.SOCKET_ATTACK, {
                    success: false,
                    error: exception.message
                });
            }
        });

        player.socket.on(Constant.SOCKET_DEFENSE, function (json) {
            try {
                if(!player.partie.is_current_player(player.pseudo)){
                    throw new Error(Constant.IS_NOT_YOUR_TURN);
                }
                player.partie.board.defense_entity(json.entity, json.origin);
                player.socket.emit(Constant.SOCKET_DEFENSE, {
                    success: true
                });
            } catch (exception) {
                console.error(exception);
                player.socket.emit(Constant.SOCKET_DEFENSE, {
                    success: false,
                    error: exception.message
                });
            }
        });

        player.socket.on(Constant.SOCKET_REQUEST_OVERLAY, function (json) {
            try {
                if(!player.partie.is_current_player(player.pseudo)){
                   throw new Error(Constant.IS_NOT_YOUR_TURN);
                }


                let positions = player.partie.board.request_overlay(json.entity, json.type);
                let arrayToSend = [];
                for(let position of positions){
                    arrayToSend.push({
                        type: json.type,
                        position: position
                    });

                }
                player.partie.send_message_to_room(Constant.SOCKET_DISPLAY_OVERLAY, arrayToSend);



            } catch (exception) {
                console.error(exception);
                player.socket.emit(Constant.SOCKET_INFORMATION, exception.message);
            }
        });

        player.socket.on(Constant.SOCKET_END_TURN, function () {
            try {
                if (!player.partie.is_current_player(player.pseudo)) {
                    throw new Error(Constant.IS_NOT_YOUR_TURN);
                }
                player.partie.fin_tour();
            } catch(exception){
                console.error(exception);
                player.socket.emit(Constant.SOCKET_INFORMATION, exception.message);
            }
        });

    }

    get_card(uid) {
        //console.log(this.hand);
        for (var i = 0; i < this.hand.length; i++) {
            var card = this.hand[i];
            //console.log('compare', card.uid, uid);
            if (card.uid == uid) {
                return card;
            }
        }
        return null;
    }

    delete_card_in_hand(card) {
        var index = this.hand.indexOf(card, this);
        if (index > -1) {
            this.hand.splice(index, 1);
        } else {
            throw new Error(Constant.IMPOSSIBLE_DELETE_CARD_IN_HAND);
        }
    }

    reconnection(new_socket) {
        this.socket = new_socket;
        //on rejoins la room socket de la partie
        this.partie.join_socket_room(new_socket);
        //on reactive tout les packets
        this.socket_function();
        //on desactive le timer de reconnexion
        clearTimeout(this.timer_reconnexion);
        //on relance la partie
        this.partie.resume_game(this);
        //on renvoie la main au joueur
        this.socket.emit(Constant.SOCKET_FIRST_HAND, {
            hand: this.hand
        });
        //on signale aux autres joueurs qu'un joueur c'est reco
        console.log(this.pseudo);
        this.broadcast_msg(Constant.SOCKET_SIGNAL_RECONNECT, {player : this.pseudo});
        //on redonne toute les informations nécessaire pour jouer au joueur
        this.socket.emit(Constant.SOCKET_START_GAME, {
            Pseudo : this.pseudo,
            Pseudo_adv: this.partie.get_adversaire_player(this.pseudo).pseudo
        });
        this.socket.emit(Constant.SOCKET_SET_STATUS, {
            Self: this.partie.is_current_player(this.pseudo),
            Num_Tour: this.partie.num_tour,
            Mana: this.mana,
            Mana_adv: this.partie.get_adversaire_player(this.pseudo).mana,
            Mana_max: this.partie.mana
        });


    }

    broadcast_msg(packet,message){
        this.socket.broadcast.to(this.partie.id_partie).emit(packet,message);
    }
}
;
