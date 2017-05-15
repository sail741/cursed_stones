//Toutes les sockets provenant du serveur et fonction d'appel au serveur
//var entity_waiting_defenseMode = null;


sio.on('piocheCarte', function(data){
	if(data.new_card != null){
		piocheCard(cardsSelf, data.new_card, function(){
            setSelfHand(data.hand);
		});
	}
});

sio.on('nouveauTour', function(data){
	setTourData(data.Self, data.Num_tour, data.Mana);
	boardResetSelect();
	if(data.Self){
        requestOverlay("off");
		startSelfTour();
	}else{
        startAdvTour();
	}
});

sio.on('setStatus', function(data){
    setTourData(data.Self, data.Num_Tour, 0);
    setManaSelf(data.Mana);
    setManaAdv(data.Mana_adv)
});

sio.on('FirstHand', function(data){
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
        vNotify.error({text: data.error, title:'Impossible de placer la carte'});

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
	var entity = data.entity;
	var pos = data.position;
	if(entity){
		drawEntity(entity);
		entities.push(entity);
	}else{
		removeEntity(convertPositionServerToClient(pos));
	}
	

});

sio.on('syncBoard', function(p_entities){
	var entities = [];
	for(var i  =0; i < p_entities.length; i++){
		entities.push(p_entities[i].entity);
	}
	setEntities(entities)
});

sio.on('fintour', function(){
	doFinTour();
});

sio.on('setSlide', function(slide){
	setSlide(slide);
});

sio.on('displayOverlay', function(data){
	displayOverlayBoard(data);
});

sio.on('attack', function(data){
	requestOverlay('off');
	if(data.success){

	}else{
        vNotify.error({text: data.error, title:'Erreur'});
	}
});

sio.on('information', function(msg){
    vNotify.error({text: msg, title:'Erreur'});
});

sio.on('signalDisconnect', function(json){
	vNotify.info({text: 'Déconnexion de ' + json.player, title: "Déconnexion"});
});
sio.on('signalConnexion', function(json){
    vNotify.info({text: 'Reconnexion de ' + json.player, title: "Reconnexion"});
});
sio.on('startGame', function(data){
	localPseudoAdv = data.Pseudo_adv;
	localPseudoActual = data.Pseudo;

});

sio.on('gameOver', function (data) {
    displayMessage("Fin de la partie", data.winner_self ? "Bravo tu as gagné" : "Dommage. La prochaine fois tu y arriveras", 10 * 1000, function(){
    	location.reload(); 
	});
});

sio.on('adversaireChange', function(data){
/*    mana_left: Int,
        cards_change: Int //Si remove nombre négatif
*/

	setManaAdv(data.mana_left);
});


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
	sio.emit('moveEntity', {
		entity: entity, 
		origin: entity.position,
		dest: convertPositionClientToServer(pos)
	});
}

function requestOverlay(type, entity){
	sio.emit('requestOverlay', {
		type: type,
		entity: entity
	})
}

function requestAttack(entity, target){
	sio.emit('attack', {
		entity: entity,
		origin: entity.position,
		dest: convertPositionClientToServer(target)
	});
}

function requestDefenseMode(entity){
	sio.emit('setDefenseEntity', {
		entity: entity,
		origin: entity.position //on aurait pu l'eviter lui ... 
	});
}