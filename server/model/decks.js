module.exports = function(sequelize, DataTypes) {
    return sequelize.define('decks', {
        id_deck: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
    },
    id_user: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'users',
                key: 'id_user'
        }
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
            get_deck: function(id_deck, callback) {
                this.findAll({
                    where: {
                        id_deck: id_deck
                    }
                }).then(function(res) {
                    if(res.length > 0) {
                        var tab = new Array();
                        for (var i = 0; i < res.length; i++) {
                            for (var j = 0; j < res[i].get("qty_card"); j++) {
                                tab.push(res[i].get("id_card"));
                            }
                        }
                        callback({"status":1, "error":null, "deck":tab});
                    } else {
                        callback({"status":0, "error":"NOT_FOUND", "deck":null});
                    }

                })
            },
            create_deck: function(id_user, json_deck, callback) {
                var tab_deck = json_deck.deck;
                if(tab_deck.length == 0) {
                    callback({"status":0, "error":"NO_CARD", "id_deck":null});
                } else {
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
                    var that = this;
                    var cur_id = tab_id_card.pop();
                    var cur_qty = tab_qty_card.pop();
                    this.create({
                        id_user: id_user,
                        id_card: cur_id,
                        qty_card: cur_qty
                    }).then(function(res) {
                        var id_deck = res.get("id_deck");

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
            },
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
            },
        }
});
};
