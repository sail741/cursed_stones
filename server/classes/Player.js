const Constant = require('./Constant');

module.exports = class Player {

    constructor(socket) {
        this.socket = socket;
        this.pseudo = socket.request.user.name;
        this.partie = null;
        this.time_left_before_deconnexion = null;
        this.timer_reconnexion = null;
        this.deck = null;
        this.hand = null;
        this.etat = null;
    }

    toJson() {
        return {
            "pseudo": this.pseudo
        };
    }

    add_to_game(partie) {
        this.partie = partie;
        this.socket_function();
    }

    add_deck(deck, first_player) {
        this.deck = deck;
        this.hand = deck.get_hand(first_player);
        var hand = this.hand;
        this.socket.emit('FirstHand', {
            hand: hand
        });
    }

    delete_game() {
        clearInterval(this.timer_reconnexion);
        this.partie = null;
    }

    socket_function() {
        var player = this;

        player.socket.on('message', function(message) {
            player.partie.chat.add_message(player.pseudo, message);
        });

        //on ne pioche qu'une fois en debut de tours
        player.socket.on('piocheCarte', function() {
            if (player.etat === Constant.ETAT_PIOCHE) {
                var card = player.deck.piocher_carte();
                player.hand.push(card);
                player.etat = Constant.ETAT_PLAYING;

                //on renvoie la main du joueur + la nouvelle carte
                player.socket.emit('piocheCarte', {
                    hand: player.hand,
                    new_card: card
                });
            }
        });


        player.socket.on('disconnect', function() {
            console.log('joueur ' + player.pseudo + ' a deconnecte de la partie ' + player.partie.id_partie);
            //on previens les autres joueurs de la deconnexion
            player.partie.global_socket.in(player.partie.id_partie).emit('deconnexion', {
                player: player.pseudo,
            });
            //deconnexion du joueur
            var status = player.partie.deconnexion_player(player.pseudo);

            console.log(status)
            if (status === Constant.STATUS_PAUSED) {
                //on garde le temps restant au joueur dans son tour
                player.time_left_before_deconnexion = (player.partie.current_time + Constant.TIMER_TOUR) - new Date().getTime();
                //abandon si le joueur ne se reconnecte pas dans le temps imparti
                player.timer_reconnexion = setTimeout(function() {
                    player.partie.abandon(player.pseudo);
                }, Constant.TIMER_RECONNEXION);
            }
        });
    }

    reconnection(player) {
        this.socket = player.socket;
        this.socket_function();
        clearTimeout(this.timer_reconnexion);
        this.partie.resume_game(this.time_left_before_deconnexion);
    }
};
