module.exports = class Player {

  constructor(socket){
    this.socket = socket ;
    this.pseudo = socket.request.user.name ;
  }

  toJson(){
    return {"pseudo":this.pseudo};
  }
}
