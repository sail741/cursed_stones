const Constant = require('./Constant');
const APied = require('./APied');
const HandToHand = require('./HandToHand');
const Distance = require('./Distance');
const Utils = require('./Utils');

module.exports = class Entity {

    constructor(uid, pseudo, name, life, img, attack, defense, movement, range) {
        this.move_class = new APied();
        if(range == 1) {
            this.attack_class = new HandToHand();
        } else {
            this.attack_class = new Distance();
        }
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
        this.range = range;
        this.can_move = false;
        this.no_action = false;
        this.multi_case = false;
        this.position = [];
    }

    move_entity(board, origin, destination) {
        if(!this.can_move){
            throw new Error(Constant.NO_MORE_ACTION);
        }
        // TODO : pour l'instant on deplace que les entites de 1x1
        let casesCanMove = this.move_class.move(board.board, origin, this.movement);
        if (!Utils.containsInArray(casesCanMove,destination)) {
            throw new Error(Constant.NEED_MORE_MOVEMENT);
        }

        this.can_move = false;

        board.delete_entity(board.get_entity(origin.row,origin.column));
        board.notify_delete_entity(origin);

        board.add_entity(destination.row,destination.column,this);
        board.notify_entity(this, destination);
    }

    attack_entity(board, origin, destination) {
        if(!this.can_do_action){
            throw new Error(Constant.NO_MORE_ACTION);
        }
        let cases_can_attack = this.attack_class.attack(board.board, origin, this.range, this.pseudo);
        if (!Utils.containsInArray(cases_can_attack,destination)) {
            throw new Error(Constant.NEED_MORE_RANGE);
        }
        var enemy = board.get_entity(destination.row,destination.column);

        this.can_do_action = false;

        // si l'ennemi est en defense
        if(enemy.defense_mode){
            //on verifie qu'il a assez de defense
            if(enemy.defense_left < this.attack){
                // si notre attaque est plus grande on va aussi attaquer ces points de vie
                var left_attack = this.attack - enemy.defense_left;
                enemy.defense_left = 0;
                if (enemy.life <= left_attack) {
                    board.delete_entity(enemy);
                    enemy.life = 0;
                    board.notify_delete_entity(enemy.position);
                } else {
                    enemy.life -= left_attack;
                    board.notify_entity(enemy);
                }
            } else {
                enemy.defense_left -= this.attack;
                board.notify_entity(enemy);
            }
        } else {
            if (enemy.life <= this.attack) {
                board.delete_entity(enemy);
                enemy.life = 0;
                board.notify_delete_entity(enemy.position);
            } else {
                enemy.life -= this.attack;
                board.notify_entity(enemy);
            }
        }
        board.notify_entity(this);
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
        return this.attack_class.attack(board, origin, this.range, this.pseudo);
    }

    reset_etat(){
        if(!this.no_action) {
            this.can_move = true;
            this.can_do_action = true;
            this.defense_mode = false;
            this.defense_left = this.defense;
        }
    }

    set_no_action(){
        this.no_action = true ;
    }

    set_multi_case(boolean){
        this.multi_case = boolean ;
    }

    add_position(row,column){
        var json = {
            row : row,
            column: column
        };
        if(this.multi_case){
            this.position.push(json);
        } else {
            this.position = json;
        }
    }

    to_json(pseudo) {
        return {
            Self: this.pseudo == pseudo, //Si c’est une entité du joueurs actuel
            position: this.position,
            multiCase: this.multi_case,
            name: this.name,
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
