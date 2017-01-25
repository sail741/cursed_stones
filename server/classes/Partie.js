const Chat = require('./Chat');
require('timers');

const MAX_PLAYER = 2,
      TIMER_TOUR = 10000;
      MAX_MANA = 9;

module.exports = class Partie {

  constructor(id_partie,global_socket){
    this.global_socket = global_socket;
    this.id_partie = id_partie;
    this.nb_player = 0;
    this.liste_player = [];
    this.num_tour = 1;
    this.mana = 1;
    this.current_player = Math.floor((Math.random() * MAX_PLAYER));
    this.chat = new Chat(id_partie,global_socket);
  }

  is_full(){
    return this.nb_player == MAX_PLAYER ;
  }

  add_player(player){
    if(this.is_full()){
      throw "is_full" ;
    }
    this.liste_player.push(player);
    this.socket_function(player);
    player.socket.join(this.id_partie);
    this.nb_player++ ;

    if(this.is_full()){
      this.start_partie();
    }
  }

  start_partie(){
    var partie = this;
    this.nouveauTour();
    setInterval(function(){
      partie.nouveauTour();
    },TIMER_TOUR);
  }

  nouveauTour(){
    for (var i = 0; i < this.liste_player.length; i++) {
      this.liste_player[i].socket.emit('nouveauTour',{
        Self: i === this.current_player,
        Num_tour: this.num_tour,
        Mana: this.mana
      });
    }
    this.change_current_player();
    this.num_tour++;
    this.add_mana();
  }

  change_current_player(){
    if(this.current_player < MAX_PLAYER-1){
      this.current_player++ ;
    }
    else {
      this.current_player = 0 ;
    }
  }

  add_mana(){
    if(this.mana < MAX_MANA){
      this.mana++;
    }
  }

  socket_function(player){
    var chat = this.chat;
    player.socket.on('message',function(message){
      chat.add_message(player.pseudo,message);
    });
  }
}
