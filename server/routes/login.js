var passport = require('passport');

module.exports = function(app){

	//post pour la connection
	app.post('/login',function(req, res){
		// passport.authenticate('local', { successRedirect: '/',
		//                                  failureRedirect: '/login',
		//                                  failureFlash: true })

		// username
		// password
		// {status: "success"} / {status: "error"}
		res.send({status: "success"});
	});

}