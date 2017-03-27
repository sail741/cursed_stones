var cards = require('./cards');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('cards_magic', {
    id_card: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'cards',
        key: 'id_card'
    }
},
type_spell: {
  type: DataTypes.INTEGER(11),
  allowNull: false
},
power_spell: {
  type: DataTypes.INTEGER(11),
  allowNull: false
},
range_spell: {
  type: DataTypes.INTEGER(11),
  allowNull: false
}
}, {
    tableName: 'cards_magic',
    classMethods: {
        add: function(name, description, type_card, cost, img, type_spell, power_spell, range_spell) {
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
                    type_spell: type_spell,
                    power_spell:power_spell,
                    range_spell: range_spell
                })
            })
        },
    }
});
};
