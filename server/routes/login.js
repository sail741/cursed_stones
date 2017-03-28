var passport = require('passport');

module.exports = function(app){

	//post pour la connection
	app.post('/login',function(req, res){
		// passport.authenticate('local', { successRedirect: '/',
		//                                  failureRedirect: '/login',
		//                                  failureFlash: true })
		res.send({status: "success"});
	});

}