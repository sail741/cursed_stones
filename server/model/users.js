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
            hash_pass: function(pass_unhashed) {
                var crypto = require('crypto');
                var grain = 'easy';
                var sel = 'hash';
                var hash = crypto.createHash('sha256').update(grain + pass_unhashed + sel).digest('base64');
                return hash;
            },
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
                        var hash = that.hash_pass(pass_unhashed);

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
                var hash = this.hash_pass(pass_unhashed);
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
            update_password: function(id_user, old_pass_unhashed, new_pass_unhashed, callback) {
                var hash = this.hash_pass(old_pass_unhashed);
                var that = this;
                this.findAll({
                    where: {
                        id_user: id_user,
                        password: hash
                    }
                }).then(function(res) {
                    if(res.length == 0) {
                        callback({"status":0, "error":"WRONG_LOGS"});
                        return;
                    }
                    var new_hash = that.hash_pass(new_pass_unhashed);
                    res[0].updateAttributes({
                        password: new_hash
                    }).then(function(){
                        callback({"status":1, "error":null});
                    })
                });
            },
            update_points: function(id_user, up_down_points, callback) {
                this.findOne({
                    where: {
                        id_user:id_user
                    }
                }).then(function(res){
                    if(res == null) {
                        callback({"status":0, "error":"NOT_FOUND", "points":null});
                        return;
                    }
                    var new_points = res.get("points") + up_down_points
                    res.updateAttributes({
                        points: new_points
                    })
                    callback({"status":1, "error":null, "points":new_points});
                })
            }
        }
    });
};
