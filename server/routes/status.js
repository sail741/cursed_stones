var passport = require('passport');

module.exports = function(app){

	//get pour le status
	app.get('/status', function(req, res){
		if(req.user == null) {
			res.send({status: "unkwon"});
		} else {
			res.send({status: "connected"});
		}
	});
	
}