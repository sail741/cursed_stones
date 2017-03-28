function getEntityImage(entity){
	return '/static/img/cards/' + entity.card.img;
}

function buildEntityDiv(entity){
	var div = document.createElement('div');

	div.className = "entity " + (entity.Self ? 'self' : 'enemie');
	div.dataset.entity = entity.uid;

	var img = document.createElement('img');
	img.src = '/static/img/cards/board_c1.png';//getEntityImage(entity);
	img.alt = entity.name;

	div.appendChild(img);

	if(entity.defenseMode){
		var imgShield = document.createElement('img');
		imgShield.className = "shield";
		imgShield.alt = "Le joueur est en mode défense";
		imgShield.src = '/static/img/shield.png';
		div.appendChild(imgShield);
	}

	return div;
}

function removeEntity(pos){
	var posStr = convertPosToStr(pos);
	var boardCase = board.querySelector('td[data-pos="'+posStr+'"]');
	if(boardCase != null){
		while (boardCase.firstChild) {
		    boardCase.removeChild(boardCase.firstChild);
		}
	}
	removeEntityOnArray(pos);

}

function removeEntityOnArray(pos){
    var entity = getEntity(pos);
    if(entity){
    	var index = entities.indexOf(entity);
        entities.splice(index, 1);
    }
}

function drawEntity(entity){
	var actualDiv = document.querySelector('.entity[data-entity="'+entity.uid+'"]');
	var newDiv = buildEntityDiv(entity);
	if(actualDiv != null){
        removeEntityOnArray(convertPositionServerToClient(entity.position));
		actualDiv.remove();
	}
	var posStr = convertPosToStr(entity.position);
	var boardCase = board.querySelector('td[data-pos="'+posStr+'"]');
	if(boardCase != null){
		boardCase.appendChild(newDiv);
	}


}
