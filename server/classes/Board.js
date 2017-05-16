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

        this.entity_list = []

        var middle = Math.round(Constant.HEIGHT_SIZE / 2)

        this.J1_kingdom = new Entity(this.generate_uid(), pseudo_J1, "Kingdom", 30, "kingdom.png", 0, 0);
        this.J2_kingdom = new Entity(this.generate_uid(), pseudo_J2, "Kingdom", 30, "kingdom.png", 0, 0);

        this.J1_kingdom.set_no_action();
        this.J1_kingdom.set_multi_case(true);
        this.J2_kingdom.set_no_action();
        this.J2_kingdom.set_multi_case(true);

        this.add_entity(middle, 0, this.J1_kingdom);
        this.add_entity(middle - 1, 0, this.J1_kingdom);
        this.add_entity(middle - 1, 1, this.J1_kingdom);
        this.add_entity(middle, 1, this.J1_kingdom);

        this.add_entity(middle, Constant.WIDTH_SIZE - 1, this.J2_kingdom);
        this.add_entity(middle - 1, Constant.WIDTH_SIZE - 1, this.J2_kingdom);
        this.add_entity(middle - 1, Constant.WIDTH_SIZE - 2, this.J2_kingdom);
        this.add_entity(middle, Constant.WIDTH_SIZE - 2, this.J2_kingdom);

        this.entity_list[this.J1_kingdom.uid] = this.J1_kingdom;
        this.entity_list[this.J2_kingdom.uid] = this.J2_kingdom;
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
        this.add_entity(position.row, position.column, entity);

        this.notify_entity(entity);
        return entity;
    }

    is_in_left_zone(position) {
        return position.column < Constant.WIDTH_PLAYER_ZONE;
    }

    is_in_right_zone(position) {
        return position.column >= (Constant.WIDTH_SIZE - Constant.WIDTH_PLAYER_ZONE);
    }

    convert_card_to_entity(pseudo, card) {
        return new Entity(this.generate_uid(), pseudo, card.name, card.life, card.img, card.attack, card.defence, card.movement);
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

    notify_entity(entity) {
        for (var i = 0; i < this.partie.liste_player.length; i++) {
            this.partie.liste_player[i].socket.emit(Constant.SOCKET_EDIT_BOARD, {
                position: entity.position,
                entity: entity.to_json(this.partie.liste_player[i].pseudo)
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

    attack_entity(entity, origin, destination) {
        this.is_good_position(origin);
        this.is_good_position(destination);
        this.is_good_entity(entity);
        this.entity_position_same(entity, origin);
        var board_entity = this.board[origin.row][origin.column];
        if (this.no_entity_in_position(destination)) {
            throw new Error(Constant.NO_ENTITY_IN_POSITION);
        }
        board_entity.attack_entity(this, origin, destination);
    }

    defense_entity(entity, origin) {
        this.is_good_position(origin);
        this.is_good_entity(entity);
        this.entity_position_same(entity, origin);
        var board_entity = this.board[origin.row][origin.column];
        board_entity.defense_entity(this, origin);
    }


    request_overlay(entity, type) {
        if (entity != null) {
            this.is_good_entity(entity);
        }

        switch (type) {
            case Constant.TYPE_OVERLAY_MOVE :
                return this.board[entity.position.row][entity.position.column].request_overlay_move(this.board, entity.position);
            case Constant.TYPE_OVERLAY_ATTACK :
                return this.board[entity.position.row][entity.position.column].request_overlay_attack(this.board, entity.position);
            default :
                return [];
        }
    }

    entity_position_same(entity, origin) {
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

    add_entity(row, column, entity) {
        this.board[row][column] = entity;
        entity.add_position(row, column);
        this.entity_list[entity.uid] = entity;
    }

    delete_entity(entity) {
        if(entity.multi_case){
            for (var i = 0; i < entity.position.length; i++) {
                this.board[entity.position[i].row][entity.position[i].column] = null;
            }
        } else {
            this.board[entity.position.row][entity.position.column] = null;
        }
        this.entity_list[entity.uid] = null;
    }

    get_entity(row, column) {
        return this.board[row][column];
    }


    reset_etat(pseudo) {
        for (var i = 0; i < Constant.HEIGHT_SIZE; i++) {
            for (var x = 0; x < Constant.WIDTH_SIZE; x++) {
                if (this.board[i][x] !== null && this.board[i][x].pseudo == pseudo) {
                    this.board[i][x].reset_etat();
                }
            }
        }
    }

    to_json(pseudo) {
        var json = [];
        for (var key in this.entity_list) {
            if (this.entity_list[key] != null) {
                json.push({
                    position: this.entity_list[key].position,
                    entity: this.entity_list[key].to_json(pseudo)
                });
            }
        }
        return json;
    }

    kingdom_J1_is_destroy() {
        return this.J1_kingdom.life == 0;
    }

    kingdom_J2_is_destroy() {
        return this.J2_kingdom.life == 0;
    }
};
