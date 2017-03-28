var model = require('../../server/model/model');

module.exports = function(app){
	app.get('/', function(req, res){
		/*
		model.decks.get_deck(1, function(res) {
			console.log(res);
		});
		*/

		/*
		model.cards.get_card(37, function(res) {
			console.log(res);
		})
		*/

		/*
		model.decks.create_deck(1, {"deck":[37,37, 37]}, function(res) {
			console.log(res);
			var id_deck = res.id_deck;

			model.decks.update_deck(1, id_deck, {"deck":[37,37]}, function(res) {
				console.log(res);
			})
		})
		*/

		/*
		model.users.update_password(2, "azerty", "test", function(res){
			console.log(res);
		})
		*/

		res.render('index.ejs')
	});
}