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

};
