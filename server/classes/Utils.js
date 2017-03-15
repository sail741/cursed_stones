const Deck = require('./Deck');
const CardCharacter = require('./CardCharacter');
const CardMagic = require('./CardMagic');

exports.convertJSONToDeck = function(json) {
    deck = new Deck();
    for (var i = 0; i < json.json_deck.length; i++) {
        card = json.json_deck[i];
        if (card.type_card == "CHARA") {
            deck.add_card(new CardCharacter(card.id_card, card.name, card.description, card.type_card, card.cost, card.img, card.attack, card.defence, card.life, card.movement));
        } else {
            deck.add_card(new CardMagic(card.id_card, card.name, card.description, card.type_card, card.cost, card.img, card.type_spell, card.range_spell, card.power_spell));
        }
    }
    return deck;
};
