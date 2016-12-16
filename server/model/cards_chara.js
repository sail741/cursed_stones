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
    tableName: 'cards_chara'
  });
};
