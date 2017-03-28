var passport = require('passport');

module.exports = function(app){

	//get pour le status
	app.get('/status', function(req, res){

	  res.send({status: "nop"});
	  //res.send({status: "unkwon"});
	});
	
}