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
		})
		*/

		res.render('index.ejs')
	});
}