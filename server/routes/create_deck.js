var passport = require('passport');
var model = require('../model/model')
var Constant = require('../classes/Constant');

module.exports = function(app){
	//route d'affichage de la page create_deck
	app.get('/create_deck', function(req, res){
		model.cards.get_cards(function(resCards) {
			if(resCards.status == 0) {
				//TODO : page error
			}
			var tabIdCards = resCards.cards;
			var tabCards = new Array();

            var next = function() {
                cur_id = tabIdCards.pop();
                if(cur_id == null){
                    res.render('create_deck.ejs', {cards: JSON.stringify(tabCards)});
                    return;
                } 

                model.cards.get_card(cur_id, function(resCard) {
                	if(resCard.status == 0) {
						//TODO : page error
					}
                	var card = resCard.card;
					tabCards.push(card);
					next()
                });
                
            }
            next();
   		});
		
	});
	//post pour la create_deck
	app.post('/create_deck',function(req, res){

		var name_deck = req.body.name_deck;
		var tab_cards = new Array();
		var tab_qty = new Array();

		var tab_keys = Object.keys(req.body);
		for (var i = 0; i < tab_keys.length; i++) {

			if(!tab_keys[i].includes("name_deck")) {
				tab_cards.push(parseInt(tab_keys[i].replace("qty_", ""))); // We add the id_card
				tab_qty.push(parseInt(req.body[tab_keys[i]])); // We add the qty
			}
		}

		// We check that there is enought cards (no cheat)
		var sum = 0;
		for (var i = 0; i < tab_qty.length; i++) {
			sum += tab_qty[i];
		}

		if(sum != 30) {
			//TODO : page error
		} else {
			var json_deck = {
				name_deck:name_deck,
				id_card:tab_cards,
				qty_card:tab_qty
			};
			model.decks.create_deck(req.user.id_user, json_deck, function() {
				//TODO : page suite
				res.render('home.ejs');
			})
		}
	});
}