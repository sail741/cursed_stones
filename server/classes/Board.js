const Entity = require('./Entity');
const Constant = require('./Constant');

module.exports = class Board {

    constructor(pseudo_J1, pseudo_J2) {
        this.left_player = pseudo_J1;
        this.right_player = pseudo_J2;
        this.board = [];
        for (var i = 0; i < Constant.HEIGHT_SIZE; i++) {
            this.board[i] = [];
            for (var x = 0; x < Constant.WIDTH_SIZE; x++) {
                this.board[i][x] = null;
            }
        }
        var middle = Math.round(Constant.HEIGHT_SIZE / 2);
        this.board[middle][0] = new Entity(pseudo_J1, "Kingdom", 30);
        this.board[middle][Constant.WIDTH_SIZE] = new Entity(pseudo_J2, "Kingdom", 30);
    }

    put_card(pseudo, card, position) {
        this.is_good_position(position);
        if (pseudo == this.left_player) {
            if (!this.is_in_left_zone(position)) {
                throw new Error(Constant.ERROR_NOT_IN_GOOD_ZONE);
            }
        } else {
            if (!this.is_in_right_zone(position)) {
                throw new Error(Constant.ERROR_NOT_IN_GOOD_ZONE);
            }
        }
        if (!this.no_entity_in_position(position)) {
            throw new Error(Constant.ERROR_ENTITY_ALREADY_HERE);
        }
        var entity = this.convert_card_to_entity(pseudo, card);
        this.board[position.row][position.column] = entity;
        return entity;
    }

    is_in_left_zone(position) {
        return position.column < Constant.WIDTH_PLAYER_ZONE;
    }

    is_in_right_zone(position) {
        return position.column > (Constant.WIDTH_SIZE - Constant.WIDTH_PLAYER_ZONE);
    }

    convert_card_to_entity(pseudo, card) {
        return new Entity(pseudo, card.name, card.life);
    }

    is_good_position(position) {
        if (position.hasOwnProperty('row') && position.hasOwnProperty('column')) {
            return true;
        }
        throw new Error(Constant.POSITION_INVALID);
    }

    no_entity_in_position(position){
      return this.board[position.row][position.column] === null;
    }
};
