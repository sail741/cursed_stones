module.exports = function(sequelize, DataTypes) {
    return sequelize.define('info_decks', {
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
    name_deck: {
        type: DataTypes.STRING,
        allowNull: false
    }
    }, {
        tableName: 'info_decks',
        classMethods: {
            get_decks: function(id_user, callback) {
                this.findAll({
                    where: {
                        id_user: id_user
                    }
                }).then(function(res) {
                    if(res.length > 0) {
                        var tab_id_deck = new Array();
                        for (var i = 0; i < res.length; i++) {
                            if(!(res[i].get("id_deck") in tab_id_deck)) {
                                tab_id_deck.push(res[i].get("id_deck"));
                            }
                        }
                        callback({"status":1, "error":null, "decks":tab_id_deck});
                    } else {
                        callback({"status":0, "error":"NOT_FOUND", "deck":null});
                    }

                })
            },
            create_deck: function(id_user, json_deck, callback) {
                this.create({
                    id_user: id_user,
                    name_deck: json_deck.name_deck
                }).then(function(info_decks_object) {
                    var info_decks = {"id_deck":info_decks_object.get("id_deck"), "id_user":info_decks_object.get("id_user"), "name_deck":info_decks_object.get("name_deck")};
                    callback({"status":1, "error":null, "info_decks":info_decks});
                }).catch(function(err){
                    callback({"status":0, "error":err, "info_decks":null});
                })
            }
        }
});
};
