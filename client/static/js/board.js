var board = document.querySelector("#board");
var LARGEUR = 16;
var HAUTEUR = 8;
var LARGEUR_SIDE = 4;
var currentSlide = null;
var entities = [];

var entity_selected = null;
var action_entity_selected = null;

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
		}else if(pos.y >= (LARGEUR - LARGEUR_SIDE)){
			if(currentSlide == 'right'){
				td.className = 'self';
			}else{
				td.className = 'enemie';
			}
		}
	}
}

function initBoard(largeur, hauteur){
	var table = document.createElement("table");
	for(var r = 0; r < hauteur; r++){
		var tr = document.createElement('tr');
		tr.dataset.row = r;
		for(var c = 0; c < largeur; c++){
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
	var pos = convertPosStrToObj(boardCasePos);
	console.log("Click on case", boardCasePos, card_selected);
	if(card_selected){ //dans cards.js
		requestPlaceCard(card_selected, boardCasePos);
	}else if (entity_selected){
		if(isEquivalent(convertPositionServerToClient(entity_selected.position), pos)){
			console.log("unselect entity", entity_selected);
			entity_selected = null;
            action_entity_selected = null;
            hideContextMenu();
            requestOverlay("off");
		}else {
			
			var entity = getEntity(pos);
			if(entity != null && action_entity_selected == "attack"){
				//TODO : Attaque
			}else if(action_entity_selected == "move"){
				requestMove(entity_selected, pos);
				entity_selected = null;
				action_entity_selected = null;
				hideContextMenu();
            	requestOverlay("off");
			}else{
                entity_selected = null;
                action_entity_selected = null;
                requestOverlay("off");
			}
		}
	}else{
		var entity = getEntity(pos);
		if(entity && entity.Self == true){
			console.log('selection entity', entity);
			entity_selected = entity;

			clearContextMenuActions();
			if(entity.movement > 0){
				declareContextMenuAction("Deplacement", function(){
					requestOverlay("move", entity);
					action_entity_selected = "move";
				});
			}
			if(entity.attack > 0){
                declareContextMenuAction("Attaque", function(){
                    requestOverlay("attack", entity);
                    console.log('TODO attaque');
                    action_entity_selected = "attack";
                });
			}
			else if(entity.defense > 0){
				if(entity.defenseMode){
                    declareContextMenuAction("Désactiver le mode défense", function(){
                        console.log('TODO desac def');
                    });
				}else{
                    declareContextMenuAction("Activer le mode défense", function(){
                        console.log('TODO activ def');
                    });
				}
			}

			displayContextMenu();

		}
	}
}

function displayOverlayBoard(cases){
	var allOverlay = board.querySelectorAll(".overlay");
	for(var i = 0; i < allOverlay.length; i++){
		allOverlay[i].remove();
	}

	for(var i = 0; i < cases.length; i++){
		var caseDraw = cases[i];
		var pos = convertPositionServerToClient(caseDraw.position);
		var type = caseDraw.type;
		if(type == "off") continue;
        var caseDom = board.querySelector('td[data-pos="'+convertPosToStr(pos)+'"]');
		if(caseDom){
			var div = document.createElement('div');
			div.className = 'overlay ' + type;
			caseDom.appendChild(div);
		}
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

function getEntity(pos){
	for(var i = 0; i < entities.length; i++){
		if(isEquivalent(convertPositionServerToClient(entities[i].position), pos)){
			return entities[i];
		}
	}
	return null;
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
		drawEntity(entities[i]);
	}

}

function boardResetSelect(){
	entity_selected = null;
	card_selected = null;
	action_entity_selected = null;
}

initBoard(LARGEUR, HAUTEUR);
