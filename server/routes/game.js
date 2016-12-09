module.exports = function(app){
	app.get('/game', function(req, res){
		res.render('game.ejs')
	});
}