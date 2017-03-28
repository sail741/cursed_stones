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
                    
                }

                this.create({
                    id_user: id_user,
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
            }
        }
});
};
