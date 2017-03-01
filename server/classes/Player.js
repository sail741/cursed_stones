const TIMER_RECONNEXION = 60000;

module.exports = class Player {

    constructor(socket) {
        this.socket = socket;
        this.pseudo = socket.request.user.name;
        this.partie = null;
        this.time_left_before_deconnexion = null;
        this.timer_reconnexion = null;
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

    socket_function() {
        var player = this;

        player.socket.on('message', function(message) {
            player.partie.chat.add_message(player.pseudo, message);
        });


        player.socket.on('disconnect', function() {
            console.log('joueur ' + player.pseudo + ' a deconnecte de la partie ' + player.partie.id_partie);
            player.partie.global_socket.in(player.partie.id_partie).emit('deconnexion', {
                player: player.pseudo,
            });
            clearInterval(player.partie.pause_game());
            player.time_left_before_deconnexion = (player.partie.current_time + player.partie.get_timer_tour()) - new Date().getTime();
            //abandon si le joueur ne se reconnecte pas dans le temps imparti
            player.timer_reconnexion = setTimeout(function() {
                console.log("fin de partie");
            }, TIMER_RECONNEXION);
        });
    }

    reconnection(player) {
        this.socket = player.socket;
        this.socket_function();
        clearTimeout(this.timer_reconnexion);
        this.partie.resume_game(this.time_left_before_deconnexion);
    }
}
