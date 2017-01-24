const Partie = require('./Partie');
const Player = require('./Player');

module.exports = class Game {

  constructor(sio){
    this.partie_liste = [];
    this.id_partie = 1;
    this.partie_liste.push(new Partie(this.id_partie,sio));
    this.global_socket = sio;
  }

  rejoindre_game(player){
    for(let partie of this.partie_liste){
      if(!partie.is_full()){
        partie.add_player(player);
        return true ;
      }
    }
    this.id_partie+= 1 ;
    var p = new Partie(this.id_partie,this.global_socket);
    p.add_player(player);
    this.partie_liste.push(p);
    return true ;
  }
}
