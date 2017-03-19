const Constant = require('./Constant');

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
        }
        else {
            return null;
        }
    }

};
