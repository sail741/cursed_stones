var TOUR_TIME = 1000 * 90; // 1min30

var tourTimerId = null;

var localSelfMana = 0;
var localAdvMana = 0;

var localTourWho = "...";

var localTourNum = 0;

//On envoie l'event de joinGame
function joinGame(){
	sio.emit('joinGame');
}

// Démarre son tour
function startSelfTour(){
	tourTimerId = setTimeout(forceFinTour, TOUR_TIME);
	requestCards(); //On demande une carte pour le nouveau tour
	
}

function setTourData(isMine, numTour, mana){

	localTourNum = numTour;

	localTourWho = "adversaire"; //TODO recup les nom des joueurs
	if(isMine){
		localTourWho = "self";
		localSelfMana = mana;
	}else{
		localAdvMana = mana;
	}

	renderStatusBar();
	
}

function renderStatusBar(){
	document.querySelector('#tourWho').textContent = localTourWho;
	document.querySelector('#tourNum').textContent = localTourNum;
	document.querySelector('#mana_self').textContent = localSelfMana;
	document.querySelector('#mana_adv').textContent = localAdvMana;


}

function forceFinTour(){
	finTour();
}

function finTour(){

	if(tourTimerId != null){
		clearTimeout(tourTimerId);
	}

}



