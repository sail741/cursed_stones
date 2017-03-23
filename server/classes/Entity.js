module.exports = class Entity {

    constructor(uid, pseudo, name, life, img, attack, defense) {
        this.uid = uid;
        this.pseudo = pseudo;
        this.name = name;
        this.life = life;
        this.img = img;
        this.attack = attack;
        this.defense = defense;
        this.defenseMode = false;
        this.canDoAction = false;
    }

    to_json(pseudo, position) {
        return {
            Self: this.pseudo == pseudo, //Si c’est une entité du joueurs actuel
            position: position,
            img: this.img,
            uid: this.uid,
            attack: this.attack,
            defense: this.defense,
            defenseMode: this.defenseMode,
            canDoAction: this.canDoAction
        }
    }

};
