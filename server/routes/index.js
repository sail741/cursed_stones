module.exports = function(app){

	// api part, @TBD
	require('./login')(app);
	require('./logout')(app);
	require('./register')(app);
	require('./status')(app);
	require('./get_decks')(app);
	require('./classement')(app);

	// One page for presentation / login / register
	require('./home')(app);


	// Test for Leo
	require('./add_card')(app);

	// create a deck
	require('./create_deck')(app);

}