module.exports = function(app){

	// api part, @TBD
	require('./login')(app);
	require('./register')(app);
	require('./status')(app);

	// One page for presentation / login / register
	require('./home')(app);

	// Game
	require('./game')(app);

	// Test for Leo
	require('./add_card')(app);

}