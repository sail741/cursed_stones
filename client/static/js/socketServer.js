//Toutes les sockets provenant du serveur et fonction d'appel au serveur

sio.on('piocheCarte', function(data){
	console.log('evt: piocheCarte', data);
	if(data.new_card != null){
		piocheCard(cardsSelf, data.new_card, function(){
            setSelfHand(data.hand);
		});
	}
});

sio.on('nouveauTour', function(data){
	console.log('nouveau tour', data);
	setTourData(data.Self, data.Num_tour, data.Mana);
	if(data.Self){
		startSelfTour();
	}else{
        startAdvTour();
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

	setManaSelf(data.mana_left);
	setSelfHand(data.hand);
	if(data.sucess){
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
*/	console.log('editBoard', data);
	var entity = data.entity;
	var pos = data.position;
	if(entity){
		drawEntity(entity);
		console.log(entities);
		entities.push(entity);
		console.log(entities);
	}else{
		removeEntity(convertPositionServerToClient(pos));
	}
	

});

sio.on('syncBoard', function(p_entities){
	console.log(entities)
	var entities = [];
	for(var i  =0; i < p_entities.length; i++){
		entities.push(p_entities[i].entity);
	}
	setEntities(entities)
})

sio.on('fintour', function(){
	doFinTour();
});

sio.on('setSlide', function(slide){
	console.log('setSlide', slide);
	setSlide(slide);
})

function requestCards(){
	sio.emit('piocheCarte');
}

function requestPlaceCard(card, pos){
	if(typeof(pos) === "string"){
		pos = convertPosStrToObj(pos); 
	}
	sio.emit('placeCard', {card: card, position: convertPositionClientToServer(pos)})
}

function sendFinTour(){
	sio.emit('fintour');
}

function requestMove(entity, pos){
	console.log(entity);
	sio.emit('moveEntity', {
		entity: entity, 
		origin: entity.position,
		dest: convertPositionClientToServer(pos)
	});
}