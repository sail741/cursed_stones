module.exports = function(app){

	require('./login')(app);
	require('./home')(app);
	require('./game')(app);
	require('./add_card')(app);

}