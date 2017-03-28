var passport = require('passport');

module.exports = function(app){

	//post pour le register
	app.post('/register',function(req, res){

		// username
		// password
		// {status: "success"} / {status: "error"}

	  	res.send({status: "success"});
	});
	
}