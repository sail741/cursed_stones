module.exports = function(app){
	app.get('/board', function(req, res){
		res.render('board.ejs')
	});
}