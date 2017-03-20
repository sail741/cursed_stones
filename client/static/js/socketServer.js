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
	setSelfHand(data.hand);
});

sio.on('placeCard', function(data){ 
	/*
{
	sucess: Boolean,
	error?: String,
	mana_left: int,
	hand:  Card[],

}
	*/

	if(data.sucess){
		setManaSelf(data.mana_left);
		setHand(data.hand);

	}else{
		console.error(data.error);
	}

});

sio.on('editBoard', function(data){
/*
{
	position: {
		row: Int,
		column: Int
	},
	entity?: Entity

}
*/
	if(entity){
		drawEntity(entiy);	
	}else{
		removeEntity(convertPositionServerToClient(pos));
	}
	

});


function requestCards(){
	sio.emit('piocheCarte');
}

function requestPlaceCard(card, pos){
	sio.emit('placeCard', {card: card, position: convertPositionClientToServer(pos)})
}

