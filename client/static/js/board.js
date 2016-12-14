var board = document.querySelector("#board");
var HAUTEUR = 16;
var LARGEUR = 8;
var LARGEUR_SIDE = 5;

function initBoard(hauteur, largeur){

	var table = document.createElement("table");
	for(var r = 0; r < largeur; r++){
		var tr = document.createElement('tr');
		tr.dataset.row = r;

		for(var c = 0; c < hauteur; c++){
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
		table.appendChild(tr);
	}
	board.appendChild(table);
}

function placeOnBoard(pos, cards){

	var boardCase = board.querySelector('td[data-pos="'+pos+'"]');
	if(boardCase != null){
		var img = document.createElement('img');
		img.src = cards.img;

		boardCase.appendChild(img);
	}
}

function clickOnCase(){
	var boardCasePos = this.dataset.pos;

	if(card_selected){ //dans cards.js

		placeOnBoard(boardCasePos, card_selected);
		var cardDiv = removeCard(cardsSelf, card_selected);
		if(cardDiv != null){
			cardDiv.style.transform=  '';
			cardDiv.className = 'card placing'
			card_selected = null;

			setInterval(function(){
				cardDiv.remove()
			}, 1900);
		}
	}

}

initBoard(HAUTEUR, LARGEUR);
