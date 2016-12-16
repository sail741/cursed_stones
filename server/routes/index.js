module.exports = function(app){

	require('./login')(app);
	require('./home')(app);
	require('./game')(app);

}