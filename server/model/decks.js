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
    tableName: 'decks'
});
};
