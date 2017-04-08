var passport = require('passport');
var model = require('../model/model');

module.exports = function(app){

	//post pour le register
	app.post('/register',function(req, res){

		var username = req.body.username;
		var password = req.body.password;
		model.users.create_user(username, password, "EUW", function(json) {
			if(json.status == 0) {
				return res.json({status:"error"});
			}
			req.login(json.user, function(err) {
				if(err) {
					return res.json({status:"error"});
				} 
				return res.json({status:"success"});
			});
		})
	});
	
}