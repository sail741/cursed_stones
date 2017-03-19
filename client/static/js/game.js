var TOUR_TIME = 1000 * 90; // 1min30

var tourTimerId = null;

//On envoie l'event de joinGame
function joinGame(){
	sio.emit('joinGame');
}

// Démarre son tour
function startSelfTour(){
	tourTimerId = setTimeout(forceFinTour, TOUR_TIME);
	requestCards(); //On demande une carte pour le nouveau tour
	
}

function forceFinTour(){
	finTour();
}

function finTour(){

	if(tourTimerId != null){
		clearTimeout(tourTimerId);
	}

}

