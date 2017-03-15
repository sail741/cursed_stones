const Card = require('./Card');

module.exports = class CardCharacter extends Card {

    constructor(id_card, name, description, type_card, cost, img, attack, defence, life, movement) {
        super(id_card, name, description, type_card, cost, img);
        this.attack = attack;
        this.defence = defence;
        this.life = life;
        this.movement = movement;
    }
};
