const Entity = require('./Entity');
const Constant = require('./Constant');
var shortid = require('shortid');

module.exports = class Board {

    constructor(partie, pseudo_J1, pseudo_J2) {
        this.partie = partie;
        this.left_player = pseudo_J1;
        this.right_player = pseudo_J2;
        this.board = [];
        this.id_generates = [];
        for (var i = 0; i < Constant.HEIGHT_SIZE; i++) {
            this.board[i] = [];
            for (var x = 0; x < Constant.WIDTH_SIZE; x++) {
                this.board[i][x] = null;
            }
        }
        var middle = Math.round(Constant.HEIGHT_SIZE / 2);
        this.board[middle][0] = new Entity(this.generate_uid(), pseudo_J1, "Kingdom", 30, "./img/kingdom.png", 0, 0);
        this.board[middle][Constant.WIDTH_SIZE] = new Entity(this.generate_uid(), pseudo_J2, "Kingdom", 30, "./img/kingdom.png", 0, 0);
    }

    generate_uid() {
        var uid = shortid.generate();
        while (uid in this.id_generates) {
            uid = shortid.generate();
        }
        this.id_generates.push(uid);
        return uid;
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
        this.notify_new_entity(entity, position);
        return entity;
    }

    is_in_left_zone(position) {
        return position.column < Constant.WIDTH_PLAYER_ZONE;
    }

    is_in_right_zone(position) {
        return position.column > (Constant.WIDTH_SIZE - Constant.WIDTH_PLAYER_ZONE);
    }

    convert_card_to_entity(pseudo, card) {
        return new Entity(this.generate_uid(), pseudo, card.name, card.life, card.img, card.attack, card.defense);
    }

    is_good_position(position) {
        if (position.hasOwnProperty('row') && position.hasOwnProperty('column')) {
            return true;
        }
        throw new Error(Constant.POSITION_INVALID);
    }

    no_entity_in_position(position) {
        return this.board[position.row][position.column] === null;
    }

    notify_new_entity(entity, position) {
        for (var i = 0; i < this.partie.liste_player.length; i++) {
            this.partie.liste_player[i].socket.emit(Constant.SOCKET_EDIT_BOARD, {
                position: position,
                entity: entity.to_json(this.partie.liste_player[i].pseudo, position)
            });
        }
    }

    to_json() {
        var json = []
        for (var i = 0; i < Constant.HEIGHT_SIZE; i++) {
            for (var x = 0; x < Constant.WIDTH_SIZE; x++) {
                if (this.board[i][x] === null) {
                    json.push({
                        position: {
                            row: i,
                            column: x
                        }
                    });
                } else {
                    json.push({
                        position: {
                            row: i,
                            column: x
                        },
                        entity: this.board[i][x]
                    });
                }
            }
        }
        return json;
    }
};
