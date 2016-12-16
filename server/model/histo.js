module.exports = function(sequelize, DataTypes) {
  return sequelize.define('histo', {
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      primaryKey: true
    },
    id_user1: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'users',
        key: 'id_user'
      }
    },
    id_user2: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'users',
        key: 'id_user'
      }
    },
    result: {
      type: DataTypes.INTEGER(4),
      allowNull: false
    }
  }, {
    tableName: 'histo'
  });
};
