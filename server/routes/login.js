var passport = require('passport');
module.exports = function(app){

	//post pour la connection
	app.post('/login', function(req, res, next) {
		passport.authenticate('local', function(err, user, info, status) {
			if (err) { return res.json({status: "error"}); }
			if (!user) { return res.json({status: "error"}); }
			console.log(...arguments);
			req.logIn(user, function(err) {
		      if (err) { return res.json({status: "error"}); }
		      return res.json({status: "success"});
		    });
			
		})(req, res, next);
	});
}