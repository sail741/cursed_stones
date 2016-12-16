module.exports = function(sequelize, DataTypes) {
  return sequelize.define('cards', {
    id_card: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type_card: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cost: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    img: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'cards'
  });
};