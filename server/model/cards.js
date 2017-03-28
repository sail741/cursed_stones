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
    tableName: 'cards',
    classMethods: {
        get_card: function(id_card, callback) {
            this.findAll({
                where: {
                    id_card: id_card
                }
            }).then(function(res) {
                if(res.length == 0) {
                    callback({"status":0, "error":"NOT_FOUND", "card":null});
                } else {
                    var card_general = {
                        "id_card":res[0].get("id_card"),
                        "name":res[0].get("name"),
                        "description":res[0].get("description"),
                        "type_card":res[0].get("type_card"),
                        "cost":res[0].get("cost"),
                        "img":res[0].get("img")
                    }
                    if(res[0].get("type_card") == "chara") {
                        var cards_chara = this.sequelize.import('./cards_chara');
                        cards_chara.get_card(id_card, card_general, callback);
                    } else if(res[0].get("type_card") == "magic") {
                        var cards_magic = this.sequelize.import('./cards_magic');
                        cards_magic.get_card(id_card, card_general, callback);
                    } else {
                        callback({"status":0, "error":"TYPE_NOT_MANAGED", "card":null});
                    }
                }
            })
        }
    }
  });
};