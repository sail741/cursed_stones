var board = document.querySelector("#board");
var LARGEUR = 16;
var HAUTEUR = 8;
var LARGEUR_SIDE = 5;
var currentSlide = null;
var entities = null; 

function setSlide(slide){
	currentSlide = slide;
	var tds = board.querySelectorAll('td');
	for(var i = 0; i < tds.length; i++){
		var td = tds[i];
		var pos = convertPosStrToObj(td.dataset.pos);
		if(pos.y < LARGEUR_SIDE){
			if(currentSlide == 'left'){
				td.className = 'self';
			}else{
				td.className = 'enemie';
			}
		}else if(pos.y > (LARGEUR - LARGEUR_SIDE)){
			if(currentSlide == 'right'){
				td.className = 'self';
			}else{
				td.className = 'enemie';
			}
		}
	}
}

function initBoard(largeur, hauteur){
	entities = [];
	var table = document.createElement("table");
	for(var r = 0; r < hauteur; r++){
		var tr = document.createElement('tr');
		tr.dataset.row = r;
		var rowEntities = [];
		for(var c = 0; c < largeur; c++){
			rowEntities.push(null);
			var td = document.createElement('td');
			td.dataset.pos = r + '-' + c;
			td.dataset.column = c;

			// if(c < LARGEUR_SIDE){
			// 	td.className += "self ";
			// }
			// if(c >= (HAUTEUR - LARGEUR_SIDE)){
			// 	td.className += "enemie";
			// }

			tr.appendChild(td);
			td.addEventListener('click', clickOnCase);
		}
		entities.push(rowEntities);
		table.appendChild(tr);
	}
	board.appendChild(table);
}

function placeOnBoard(posStr, card){
	var boardCase = board.querySelector('td[data-pos="'+posStr+'"]');
	if(boardCase != null){
		var pos = convertPosStrToObj(posStr);
		
		var entity = {
			card: card,
			uid :'enfeo' + (new Date()).getTime(),
			pos: pos,
			self: true,
			life: 10, 
			attack: 2,
			defense: 2,
			defenseMode: true,
			canDoAction: false
		}

		
		entities[pos.x][pos.y] = entity;

		drawEntity(entity);

	}
}

function clickOnCase(){
	var boardCasePos = this.dataset.pos;
	console.log("Click on case", boardCasePos, card_selected);
	if(card_selected){ //dans cards.js
		requestPlaceCard(card_selected, boardCasePos);
	}
}

function doPlaceCard(card, boardCasePos){
	placeOnBoard(boardCasePos, card);
		var cardDiv = removeCard(cardsSelf, card);
		if(cardDiv != null){
			cardDiv.style.transform=  '';
			cardDiv.className = 'card placing'
			unSelectCards();

			setInterval(function(){
				cardDiv.remove()
			}, 1900);
		}
}

function listAllEntitiesForPlayer(selfEntity){
	var res = [];
	for(var i = 0; i < entities.length; i++){
		var row = entities[i];
		for(var j =0; j < row.length; j++){

			var entity = row[j];
			if(entity != null && entity.self == selfEntity){
				res.push(entity);
			}

		}
	}
	return res;
}

function setEntities(a_entities){
	entities = a_entities;
	redrawBoard();
}

function redrawBoard(){
	//Selections de toutes les entités pour les clear;
	var entitiesOnBoardsDiv = board.querySelectorAll('.entity');
	for(var i = 0; i < entitiesOnBoardsDiv.length; i++){
		entitiesOnBoardsDiv[i].remove();
	}

	for(var i = 0; i < entities.length; i++){
		drawEntity(entities[i].entity);
	}

}
initBoard(LARGEUR, HAUTEUR);
