module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users', {
    id_user: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    points: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'users',
    classMethods: {
    	connect: function(username, pass_unhashed, callback) {
			var crypto = require('crypto');
			var grain = 'easy';
			var sel = 'hash';
			var hash = crypto.createHash('sha256').update(grain + pass_unhashed + sel).digest('base64');
			this.findAll({
				attributes: ['id_user', 'username'],
				where: {
		    		username: username,
		    		password: hash
				}
			}).then(function(res) {
				if(res.length == 0) {
					callback({"status":0, "error":"NOT_FOUND"});
				} else {
					var user = {"id_user":res[0].get("id_user"), "username":res[0].get("username")}
					callback({"status":1, "user":user});
				}
			});
      },
    }
  });
};
