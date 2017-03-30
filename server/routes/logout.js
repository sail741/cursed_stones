var passport = require('passport');
module.exports = function(app){

	//post pour la connection
	app.post('/logout', function(req, res) {
		req.logout();
		return res.json({status: "success"});
	});
}