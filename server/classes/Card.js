module.exports = class Card {

    constructor(uid, id_card, name, description, type_card, cost, img) {
        this.id_card = id_card;
        this.uid = uid;
        this.name = name;
        this.description = description;
        this.type_card = type_card;
        this.cost = cost;
        this.img = img;
    }

};
