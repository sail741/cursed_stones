module.exports = class Entity {

    constructor(uid, pseudo, name, life, img, attack, defense, movement) {
        this.uid = uid;
        this.pseudo = pseudo;
        this.name = name;
        this.life = life;
        this.img = img;
        this.attack = attack;
        this.defense = defense;
        this.defenseMode = false;
        this.canDoAction = false;
        this.movement = movement;
        this.left_movement = 0;
    }

    to_json(pseudo, position) {
        return {
            Self: this.pseudo == pseudo, //Si c’est une entité du joueurs actuel
            position: position,
            img: this.img,
            uid: this.uid,
            attack: this.attack,
            defense: this.defense,
            movement: this.movement,
            defenseMode: this.defenseMode,
            canDoAction: this.canDoAction
        }
    }

};
