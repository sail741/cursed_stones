var cards = sequelize.import('./cards');

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
        }
    }, {
        tableName: 'cards_chara',
        classMethods: {
            add: function(name, description, type_card, cost, img, attack, defence, life, movement) {
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
                        movement: movement
                    })
                })
            },
        }
    });
};

