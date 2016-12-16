var passport = require('passport');

module.exports = function(app){
	//route d'affichage de la page login
	app.get('/login', function(req, res){
		res.render('login.ejs')
	});
	//post pour la connection
	app.post('/login',
	  passport.authenticate('local', { successRedirect: '/',
	                                   failureRedirect: '/login',
	                                   failureFlash: true })
	);
}