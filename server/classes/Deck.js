const Constant = require('./Constant');
var shortid = require('shortid');
const Model = require('../model/model');
const CardCharacter = require('./CardCharacter');
const CardMagic = require('./CardMagic');

module.exports = class Deck {

    constructor() {
        this.card_list = [];
    }

    add_card(card) {
        this.card_list.push(card);
    }

    shuffle_deck() {
        for (let i = this.card_list.length; i; i--) {
            let j = Math.floor(Math.random() * i);
            [this.card_list[i - 1], this.card_list[j]] = [this.card_list[j], this.card_list[i - 1]];
        }
    }

    get_hand(first_player) {
        var five_first_card = [];
        var nb_card = first_player ? Constant.NB_CARD_START_FIRST_PLAYER : Constant.NB_CARD_START_SECOND_PLAYER;
        for (var i = 0; i < nb_card; i++) {
            five_first_card.push(this.card_list.pop());
        }
        return five_first_card;
    }

    piocher_carte() {
        if (this.card_list.length !== 0) {
            return this.card_list.pop();
        } else {
            throw new Error(Constant.EMPTY_DECK);
        }
    }

    convertJSONToDeck(id_deck, next) {
        var deck = this;
        Model.decks.get_deck(id_deck, function (json_card) {
            var next_card = function(){
                var card = json_card.deck.pop();
                if(card == null){
                    next();
                    return;
                }
                Model.cards.get_card(card, function (json) {
                    var card = json.card ;
                    var uid = shortid.generate();
                    var id_generates = [];
                    while (uid in id_generates) {
                        uid = shortid.generate();
                    }
                    id_generates.push(uid);
                    if (card.type_card == Constant.TYPE_CARD_CHARA) {
                        deck.add_card(new CardCharacter(uid, card.id_card, card.name, card.description, card.type_card, card.cost, card.img, card.attack, card.defence, card.life, card.movement, card.range));
                    } else {
                        deck.add_card(new CardMagic(uid, card.id_card, card.name, card.description, card.type_card, card.cost, card.img, card.type_spell, card.range_spell, card.power_spell));
                    }
                    next_card();
                });
            }
            next_card();
        });
    };
};
