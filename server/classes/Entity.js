const Constant = require('./Constant');

module.exports = class Entity {

    constructor(uid, pseudo, name, life, img, attack, defense, movement) {
        this.uid = uid;
        this.pseudo = pseudo;
        this.name = name;
        this.life = life;
        this.img = img;
        this.attack = attack;
        this.defense = defense;
        this.defenseMode = false;
        this.canDoAction = false;
        this.movement = movement;
        this.left_movement = 0;
    }

    move_entity(board, origin, destination) {
        if (!this.plus_court_chemin(board.board, origin, destination, this.movement)) {
            throw new Error(Constant.NEED_MORE_MOVEMENT);
        }
        this.position = destination;
        board.board[destination.row][destination.column] = this;
        board.notify_new_entity(this, destination);
        board.board[origin.row][origin.column] = null;
        board.notify_delete_entity(origin);
    }

    plus_court_chemin(board, origin, destination, profondeur) {
        if (origin.row == destination.row && origin.column == destination.column) {
            return true;
        }
        if (profondeur === 0) {
            return false;
        }
        var is_in = false;
        if (origin.row >= 1 && !is_in) {
            if (board[origin.row - 1][origin.column] === null) {
                is_in = this.plus_court_chemin(board, {
                    row: origin.row - 1,
                    column: origin.column
                }, destination, profondeur - 1);
            }
        }
        if (origin.column >= 1 && !is_in) {
            if (board[origin.row][origin.column - 1] === null) {
                is_in = this.plus_court_chemin(board, {
                    row: origin.row,
                    column: origin.column - 1
                }, destination, profondeur - 1);
            }
        }
        if (origin.column < Constant.WIDTH_SIZE-1 && !is_in) {
            if (board[origin.row][origin.column + 1] === null) {
                is_in = this.plus_court_chemin(board, {
                    row: origin.row,
                    column: origin.column + 1
                }, destination, profondeur - 1);
            }
        }
        if (origin.row < Constant.HEIGHT_SIZE-1 && !is_in) {
            if (board[origin.row + 1][origin.column] === null) {
                is_in = this.plus_court_chemin(board, {
                    row: origin.row + 1,
                    column: origin.column
                }, destination, profondeur - 1);
            }
        }
        return is_in;
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
            defenseMode: this.defenseMode,
            canDoAction: this.canDoAction
        }
    }

};
