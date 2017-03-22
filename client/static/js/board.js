var board = document.querySelector("#board");
var HAUTEUR = 16;
var LARGEUR = 8;
var LARGEUR_SIDE = 5;

var entities = null; 

function initBoard(hauteur, largeur){
	entities = [];
	var table = document.createElement("table");
	for(var r = 0; r < largeur; r++){
		var tr = document.createElement('tr');
		tr.dataset.row = r;
		var rowEntities = [];
		for(var c = 0; c < hauteur; c++){
			rowEntities.push(null);
			var td = document.createElement('td');
			td.dataset.pos = r + '-' + c;
			td.dataset.column = c;

			if(c < LARGEUR_SIDE){
				td.className += "self ";
			}
			if(c >= (HAUTEUR - LARGEUR_SIDE)){
				td.className += "enemie";
			}

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

function convertPosStrToObj(str){
	var split = str.split('-');
	var pos = {
		x:  parseInt(split[0]),
		y:  parseInt(split[1])
	}
	return pos;
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


initBoard(HAUTEUR, LARGEUR);
