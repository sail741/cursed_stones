function getEntityImage(entity){
	return '/static/img/cards/' + entity.card.img;
}

function buildEntityDiv(entity){
	var div = document.createElement('div');

	div.className = "entity";
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
	var posStr = convertPosToStr(entity.pos);
	var boardCase = board.querySelector('td[data-pos="'+posStr+'"]');
	if(boardCase != null){
		while (boardCase.firstChild) {
		    boardCase.removeChild(boardCase.firstChild);
		}
	}
}

function drawEntity(entity){
	console.log('.entity[data-entity="'+entity.uid+'"]');
	var actualDiv = document.querySelector('.entity[data-entity="'+entity.uid+'"]');
	var newDiv = buildEntityDiv(entity);
	console.log(actualDiv);
	if(actualDiv != null){
		actualDiv.outerHTML =  newDiv.outerHTML;
	}else{
		var posStr = convertPosToStr(entity.pos);
		var boardCase = board.querySelector('td[data-pos="'+posStr+'"]');
		if(boardCase != null){
			boardCase.appendChild(newDiv);
		}
	}
}
