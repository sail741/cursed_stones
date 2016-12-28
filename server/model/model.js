var sequelize = require("./config").sequelize;

var users = sequelize.import("./users");
var cards = sequelize.import("./cards");
var cards_chara = sequelize.import("./cards_chara");
var cards_magic = sequelize.import("./cards_magic");
var decks = sequelize.import("./decks");
var histo = sequelize.import("./histo");


function connect(email, pass_unhashed) {
	var crypto = require('crypto');
	var grain = 'easy';
	var sel = 'hash';
	var hash = crypto.createHash('sha256').update(grain + pass_unhashed + sel).digest('base64');
	users.findAll({
		attributes: ['id_user'],
		where: {
    		email: email,
    		password: hash
		}
	});
}

connect("test", "aaaaaaa");
