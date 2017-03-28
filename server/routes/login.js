var passport = require('passport');
module.exports = function(app){

	//post pour la connection
	app.post('/login', passport.authenticate('local', {
			successRedirect: '/loginOK',
			failureRedirect: '/loginFAIL'
		})
	);

	app.get('/loginOK', function(req, res){
		return res.json({status: "success"});
	})

	app.get('/loginFAIL', function(req, res){
		return res.json({status: "error"});
	})

}