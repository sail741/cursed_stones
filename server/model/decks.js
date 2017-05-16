var infos_decks = sequelize.import("./info_decks");

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('decks', {
        id_deck: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
    },
    id_card: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        references: {
            model: 'cards',
            key: 'id_card'
    }
    },
    qty_card: {
        type: DataTypes.INTEGER(11),
        allowNull: false
    }
    }, {
        tableName: 'decks',
        classMethods: {
            get_decks: function(id_user, callback) {
                infos_decks.get_decks(id_user, callback);
            }, 
            get_deck: function(id_deck, callback) {
                this.findAll({
                    where: {
                        id_deck: id_deck
                    }
                }).then(function(res) {
                    if(res.length > 0) {
                        var tab_id_card = new Array();
                        for (var i = 0; i < res.length; i++) {
                            for (var j = 0; j < res[i].get("qty_card"); j++) {
                                tab_id_card.push(res[i].get("id_card"));
                            }
                        }
                        callback({"status":1, "error":null, "deck":tab_id_card});
                    } else {
                        callback({"status":0, "error":"NOT_FOUND", "deck":null});
                    }

                })
            },
            create_deck: function(id_user, json_deck, callback) {
                var tab_id_card = json_deck.id_card;
                var tab_qty_card = json_deck.qty_card;
                if(tab_id_card.length == 0) {
                    callback({"status":0, "error":"NO_CARD", "id_deck":null});
                } else if(tab_qty_card.length == 0) {
                    callback({"status":0, "error":"NO_QTY_CARD", "id_deck":null});
                } else if(tab_qty_card.length != tab_id_card.length) {
                    callback({"status":0, "error":"NOT_SAME_QTY_ID", "id_deck":null});
                } else {
                    that = this;
                    infos_decks.create_deck(id_user, json_deck, function(res_info_decks) {
                        if(res_info_decks.status == 0) {
                            callback({"status":0, "error":"FAIL", "id_deck":null})
                            return;
                        } else {
                            var id_deck = res_info_decks.info_decks.id_deck;
                            console.log(id_deck);
                            var next = function() {
                                cur_id = tab_id_card.pop();
                                cur_qty = tab_qty_card.pop();
                                if(cur_id == null){
                                    callback({"status":1, "error":null, "id_deck":id_deck});
                                    return;
                                } 
                                that.create({
                                    id_deck: id_deck,
                                    id_card: cur_id,
                                    qty_card: cur_qty
                                }).then(next);
                                
                            }
                            next();
                        }
                    })
                }
            },/*
            update_deck: function(id_user, id_deck, json_deck, callback) {

                var that = this;

                var tab_deck = json_deck.deck;
                if(tab_deck.length == 0) {
                    callback({"status":0, "error":"NO_CARD", "id_deck":null});
                } else {
                    this.destroy({
                        where: {
                            id_user: id_user,
                            id_deck: id_deck
                        }
                    }).then(function() {
                        // for each id_card, we count how many time we got it. 
                        // ex : for cards 1 1 1 2 3 will give tab : [1, 2, 3] then [3, 1, 1]
                        var tab_id_card = [], tab_qty_card = [], prev;
                        tab_deck.sort();
                        for ( var i = 0; i < tab_deck.length; i++ ) {
                            if ( tab_deck[i] !== prev ) {
                                tab_id_card.push(tab_deck[i]);
                                tab_qty_card.push(1);
                            } else {
                                tab_qty_card[tab_qty_card.length-1]++;
                            }
                            prev = tab_deck[i];
                        }

                        var cur_id,cur_qty;
                        var next = function() {
                            cur_id = tab_id_card.pop();
                            cur_qty = tab_qty_card.pop();
                            if(cur_id == null){
                                callback({"status":1, "error":null, "id_deck":id_deck});
                                return;
                            } 
                            that.create({
                                id_deck: id_deck,
                                id_user: id_user,
                                id_card: cur_id,
                                qty_card: cur_qty
                            }).then(next);
                            
                        }
                        next();
                    })
                }
            },*/
        }
});
};
