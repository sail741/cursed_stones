//Toutes les sockets provenant du serveur et fonction d'appel au serveur

sio.on('piocheCarte', function(data){
	console.log('evt: piocheCarte', data);
	if(data.new_card != null){
		piocheCard(cardsSelf, data.new_card);	
	}
	drawsCards(cardsSelf, data.hand);
});

sio.on('nouveauTour', function(data){
	console.log('nouveau tour', data);
	setTourData(data.Self, data.Num_tour, data.mana);
	if(data.Self){
		startSelfTour();
	}
});

sio.on('FirstHand', function(data){
	console.log('first hand receive');
	hand_cards = data.hand;
	drawsCards(cardsSelf, hand_cards);
})

function requestCards(){
	sio.emit('piocheCarte');
}

