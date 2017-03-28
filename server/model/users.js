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
            create_user: function(username, pass_unhashed, country, callback) {
                var that = this;
                this.findAll({
                    attributes: ['id_user'],
                    where: {
                            username: username,
                    }
                }).then(function(res) {
                    if(res.length != 0) {
                        callback({"status":0, "error":"USER_ALREADY_EXIST"});
                    } else {
                        var crypto = require('crypto');
                        var grain = 'easy';
                        var sel = 'hash';
                        var hash = crypto.createHash('sha256').update(grain + pass_unhashed + sel).digest('base64');

                        that.create({
                            username: username,
                            password: hash,
                            points: 0,
                            country:country
                        })
                        callback({"status":1, "error":null});
                    }
                });
            },
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
                        callback({"status":0, "error":"NOT_FOUND", "user":null});
                    } else {
                        var user = {"id_user":res[0].get("id_user"), "username":res[0].get("username")}
                        callback({"status":1, "error":null, "user":user});
                    }
                });
            },
        }
    });
};
