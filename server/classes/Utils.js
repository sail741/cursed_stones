const Deck = require('./Deck');
const CardCharacter = require('./CardCharacter');
const CardMagic = require('./CardMagic');
var shortid = require('shortid');

exports.convertJSONToDeck = function(json) {
    deck = new Deck();
    id_generates = [];
    for (var i = 0; i < json.json_deck.length; i++) {
        card = json.json_deck[i];
        uid = shortid.generate();
        while (uid in id_generates) {
            uid = shortid.generate();
        }
        id_generates.push(uid);
        if (card.type_card == "CHARA") {
            deck.add_card(new CardCharacter(uid, card.id_card, card.name, card.description, card.type_card, card.cost, card.img, card.attack, card.defence, card.life, card.movement));
        } else {
            deck.add_card(new CardMagic(uid, card.id_card, card.name, card.description, card.type_card, card.cost, card.img, card.type_spell, card.range_spell, card.power_spell));
        }
    }
    return deck;
};
