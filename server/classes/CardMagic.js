const Card = require('./Card');

module.exports = class CardMagic extends Card {

    constructor(uid, id_card, name, description, type_card, cost, img, type_spell, range_spell, power_spell) {
        super(uid, id_card, name, description, type_card, cost, img);
        this.type_spell = type_spell;
        this.range_spell = range_spell;
        this.power_spell = power_spell;
    }

};
