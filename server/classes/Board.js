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
        this.board[middle][Constant.WIDTH_SIZE - 1] = new Entity(this.generate_uid(), pseudo_J2, "Kingdom", 30, "./img/kingdom.png", 0, 0);
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
        return position.column >= (Constant.WIDTH_SIZE - Constant.WIDTH_PLAYER_ZONE);
    }

    convert_card_to_entity(pseudo, card) {
        return new Entity(this.generate_uid(), pseudo, card.name, card.life, card.img, card.attack, card.defense, card.movement);
    }

    is_good_position(position) {
        if (position.hasOwnProperty('row') && position.hasOwnProperty('column')) {
            return true;
        } else {
            throw new Error(Constant.POSITION_INVALID);
        }
        if (position.row >= 0 || position.row < Constant.HEIGHT_SIZE || position.column >= 0 || position.column < Constant.WIDTH_SIZE) {
            return true;
        } else {
            throw new Error(Constant.POSITION_OUT_OF_BAND);
        }
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

    notify_delete_entity(position) {
        for (var i = 0; i < this.partie.liste_player.length; i++) {
            this.partie.liste_player[i].socket.emit(Constant.SOCKET_EDIT_BOARD, {
                position: position,
                entity: null
            });
        }
    }

    move_entity(entity, origin, destination) {
        this.is_good_position(origin);
        this.is_good_position(destination);
        this.is_good_entity(entity);
        this.entity_position_same(entity, origin);
        var board_entity = this.board[origin.row][origin.column];
        if (!this.no_entity_in_position(destination)) {
            throw new Error(Constant.ERROR_ENTITY_ALREADY_HERE);
        }
        board_entity.move_entity(this, origin, destination);
    }

    request_overlay(entity, type) {
        if(entity != null){
            this.is_good_entity(entity);
        }

        switch (type){
            case "move" : return this.board[entity.position.row][entity.position.column].request_overlay(this.board,entity.position) ;
            default : return [];
        }
    }

    entity_position_same(entity, origin){
        if (!this.position_same(entity.position, origin)) {
            throw new Error(Constant.CARD_ALTERED);
        }
    }

    is_good_entity(entity) {
        if (!entity.hasOwnProperty('position') || !entity.hasOwnProperty('uid')) {
            throw new Error(Constant.CARD_ALTERED);
        }
        this.is_good_position(entity.position);

        var board_entity = this.board[entity.position.row][entity.position.column];
        if (board_entity === null) {
            throw new Error(Constant.NO_ENTITY_IN_POSITION);
        }
        if (board_entity.uid !== entity.uid) {
            throw new Error(Constant.CARD_ALTERED);
        }
        return true;
    }

    position_same(pos1, pos2) {
        return pos1.row == pos2.row && pos1.column == pos2.column;
    }

    to_json(pseudo) {
        var json = [];
        for (var i = 0; i < Constant.HEIGHT_SIZE; i++) {
            for (var x = 0; x < Constant.WIDTH_SIZE; x++) {
                if (this.board[i][x] !== null) {
                    var pos = {
                        row: i,
                        column: x
                    };
                    json.push({
                        position: pos,
                        entity: this.board[i][x].to_json(pseudo, pos)
                    });
                }
            }
        }
        return json;
    }
};
