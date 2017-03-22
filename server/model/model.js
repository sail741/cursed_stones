var sequelize = require("./config").sequelize;

var users = sequelize.import("./users");
var cards = sequelize.import("./cards");
var cards_chara = sequelize.import("./cards_chara");
var cards_magic = sequelize.import("./cards_magic");
var decks = sequelize.import("./decks");
var histo = sequelize.import("./histo");

exports.users = users;
exports.cards = cards;
exports.cards_chara = cards_chara;
exports.cards_magic = cards_magic;
exports.decks = decks;
exports.histo = histo;
