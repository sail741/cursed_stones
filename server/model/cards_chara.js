module.exports = function(sequelize, DataTypes) {
    return sequelize.define('cards_chara', {
        id_card: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'cards',
                key: 'id_card'
            }
        },
        attack: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        defence: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        life: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        movement: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        range: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        }
    }, {
        tableName: 'cards_chara',
        classMethods: {
            add: function(name, description, type_card, cost, img, attack, defence, life, movement, range, callback) {
                var cards = this.sequelize.import('./cards');
                var that = this;

                cards.create({
                    name: name,
                    description: description,
                    type_card:type_card,
                    cost: cost,
                    img:img
                }).then(function(res_card) {
                    id_card = res_card.get("id_card");
                    that.create({
                        id_card: id_card,
                        attack: attack,
                        defence: defence,
                        life:life,
                        movement: movement,
                        range: range
                    }).then(function() {
                        callback({"status":1, "error":null, "id_card":id_card})
                    })
                })
            },
            get_card: function(id_card, card_general, callback) {
                this.findAll({
                    where: {
                        id_card: id_card
                    }
                }).then(function(res) {
                    var res;
                    if(res.length == 0) {
                        res = {"status":0, "error":"NOT_FOUND", "card":null};
                    } else {
                        card_general.attack = res[0].get("attack");
                        card_general.defence = res[0].get("defence");
                        card_general.life = res[0].get("life");
                        card_general.movement = res[0].get("movement");
                        res = {
                            "status":1,
                            "error": null,
                            "card": card_general
                        }
                    }
                    callback(res);
                })
            }
        }
    });
};

