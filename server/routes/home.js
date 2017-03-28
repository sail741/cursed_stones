var model = require('../../server/model/model');

module.exports = function(app){

	app.get('/', function(req, res){
		
		res.render('index.ejs');

	});

}