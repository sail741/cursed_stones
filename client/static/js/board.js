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
		}
		table.appendChild(tr);
	}
	board.appendChild(table);
}

initBoard(HAUTEUR, LARGEUR);