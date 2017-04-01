const Constant = require('./Constant');
const APied = require('./APied');
const HandToHand = require('./HandToHand');
const Utils = require('./Utils');

module.exports = class Entity {

    constructor(uid, pseudo, name, life, img, attack, defense, movement) {
        this.move_class = new APied();
        this.attack_class = new HandToHand();
        this.uid = uid;
        this.pseudo = pseudo;
        this.name = name;
        this.life = life;
        this.img = img;
        this.attack = attack;
        this.defense = defense;
        this.defense_left = defense;
        this.defense_mode = false;
        this.can_do_action = false;
        this.movement = movement;
        this.can_move = false;
    }

    move_entity(board, origin, destination) {
        if(!this.can_move){
            throw new Error(Constant.NO_MORE_ACTION);
        }
        let casesCanMove = this.move_class.move(board.board, origin, this.movement);
        if (!Utils.containsInArray(casesCanMove,destination)) {
            throw new Error(Constant.NEED_MORE_MOVEMENT);
        }
        this.position = destination;
        board.board[destination.row][destination.column] = this;
        board.notify_entity(this, destination);
        board.board[origin.row][origin.column] = null;
        board.notify_delete_entity(origin);
        this.can_move = false;
    }

    attack_entity(board, origin, destination) {
        if(!this.can_do_action){
            throw new Error(Constant.NO_MORE_ACTION);
        }
        let cases_can_attack = this.attack_class.attack(board.board, origin, 1, this.pseudo);
        if (!Utils.containsInArray(cases_can_attack,destination)) {
            throw new Error(Constant.NEED_MORE_RANGE);
        }
        var enemy = board.board[destination.row][destination.column];

        // si l'ennemi est en defense
        if(enemy.defense_mode){
            //on verifie qu'il a assez de defense
            if(enemy.defense_left < this.attack){
                // si notre attaque est plus grande on va aussi attaquer ces points de vie
                var left_attack = this.attack - enemy.defense_left;
                enemy.defense_left = 0;
                if (enemy.life <= left_attack) {
                    board.board[destination.row][destination.column] = null;
                    enemy.life = 0;
                    board.notify_delete_entity(destination);
                } else {
                    enemy.life -= left_attack;
                    board.notify_entity(enemy, destination);
                }
            } else {
                enemy.defense_left -= this.attack;
                board.notify_entity(enemy, destination);
            }
        } else {
            if (enemy.life <= this.attack) {
                board.board[destination.row][destination.column] = null;
                enemy.life = 0;
                board.notify_delete_entity(destination);
            } else {
                enemy.life -= this.attack;
                board.notify_entity(enemy, destination);
            }
        }
        this.can_do_action = false;
    }

    defense_entity(board, origin) {
        if(!this.can_do_action){
            throw new Error(Constant.NO_MORE_ACTION);
        }
        this.defense_mode = true ;
        this.can_move = false;
        this.can_do_action = false;
        board.notify_entity(this, origin);
        
    }

    request_overlay_move(board, origin) {
        if(!this.can_move){
            throw new Error(Constant.NO_MORE_ACTION);
        }
        return this.move_class.move(board, origin, this.movement);
    }

    request_overlay_attack(board, origin) {
        if(!this.can_do_action){
            throw new Error(Constant.NO_MORE_ACTION);
        }
        return this.attack_class.attack(board, origin, 1, this.pseudo);
    }

    reset_etat(){
        this.can_move = true ;
        this.can_do_action = true ;
        this.defense_mode = false ;
        this.defense_left = this.defense;
    }

    to_json(pseudo, position) {
        return {
            Self: this.pseudo == pseudo, //Si c’est une entité du joueurs actuel
            position: position,
            img: this.img,
            uid: this.uid,
            attack: this.attack,
            defense: this.defense_left,
            movement: this.movement,
            defenseMode: this.defense_mode,
            canDoAction: this.can_do_action,
            canMove: this.can_move,
            life: this.life
        }
    }

};
