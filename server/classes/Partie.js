const Chat = require('./Chat');

module.exports = class Partie {

  constructor(id_partie,global_socket){
    this.global_socket = global_socket;
    this.id_partie = id_partie;
    this.max_player = 2;
    this.nb_player = 0;
    this.liste_player = [];
    this.num_tour = 1;
    this.mana = 1;
    this.currentPlayer = Math.floor((Math.random() * this.max_player));
    this.chat = new Chat(id_partie,global_socket);
  }

  is_full(){
    return this.nb_player == this.max_player ;
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
    this.nouveauTour();
  }

  nouveauTour(){
    for (var i = 0; i < this.liste_player.length; i++) {
      this.liste_player[i].socket.emit('nouveauTour',{
        Self: i == this.currentPlayer,
  	    Num_tour: this.num_tour,
  	    Mana: this.mana
      });
    }
    if(this.currentPlayer < this.max_player){
      this.currentPlayer++ ;
    }
    else {
      this.currentPlayer = 0 ;
    }
  }

  socket_function(player){
    var chat = this.chat;
    player.socket.on('message',function(message){
      chat.add_message(player.pseudo,message);
    });
  }
}
