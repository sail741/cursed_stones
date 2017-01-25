const Message = require('./Message');

module.exports = class Chat {

  constructor(chat_id,global_socket){
    this.global_socket = global_socket;
    this.chat_id = chat_id;
    this.liste_msg = [];
  }

  add_message(player,texte){
    this.liste_msg.push(new Message(player,texte));
    this.global_socket.sockets.in(this.chat_id).emit('chat', {
        player: player,
        message: texte
    });
  }

}
