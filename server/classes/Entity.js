const Constant = require('./Constant');
const APied = require('./APied');
const Utils = require('./Utils');

module.exports = class Entity {

    constructor(uid, pseudo, name, life, img, attack, defense, movement) {
        this.move_class = new APied();
        this.uid = uid;
        this.pseudo = pseudo;
        this.name = name;
        this.life = life;
        this.img = img;
        this.attack = attack;
        this.defense = defense;
        this.defense_mode = false;
        this.can_do_action = true;
        this.movement = movement;
        this.can_move = true;
    }

    move_entity(board, origin, destination) {
        let casesCanMove = this.move_class.move(board.board, origin, this.movement);
        if (!Utils.containsInArray(casesCanMove,destination)) {
            throw new Error(Constant.NEED_MORE_MOVEMENT);
        }
        this.position = destination;
        board.board[destination.row][destination.column] = this;
        board.notify_new_entity(this, destination);
        board.board[origin.row][origin.column] = null;
        board.notify_delete_entity(origin);
    }

    request_overlay(board, origin) {
        return this.move_class.move(board, origin, this.movement);
    }

    to_json(pseudo, position) {
        return {
            Self: this.pseudo == pseudo, //Si c’est une entité du joueurs actuel
            position: position,
            img: this.img,
            uid: this.uid,
            attack: this.attack,
            defense: this.defense,
            movement: this.movement,
            defenseMode: this.defense_mode,
            canDoAction: this.can_do_action
        }
    }

};
