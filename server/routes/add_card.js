var passport = require('passport');
var model = require('../model/model')

module.exports = function(app){
	//route d'affichage de la page add_card
	app.get('/add_card', function(req, res){
		res.render('add_card.ejs');
	});
	//post pour la add_card
	app.post('/add_card',function(req, res){
		var name = req.body.name;
		var description = req.body.description;
		var type_card = req.body.type_card;
		var cost = req.body.cost;
		var img = req.body.img;

		if(type_card == "chara") {
			var attack = req.body.attack;
			var defence = req.body.defence;
			var life = req.body.life;
			var movement = req.body.movement;
			model.cards_chara.add(name, description, type_card, cost, img, attack, defence, life, movement);
		} else {
			var type_spell = req.body.type_spell;
			var power_spell = req.body.power_spell;
			var range_spell = req.body.range_spell;
		}
		res.render('add_card.ejs');
	});
}