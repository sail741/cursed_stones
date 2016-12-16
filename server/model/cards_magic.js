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
    tableName: 'cards_magic'
  });
};
