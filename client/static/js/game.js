var TOUR_TIME = 1000 * 90; // 1min30

var tourTimerId = null;

// Démarre son tour
function startSelfTour(){
	tourTimerId= setTimeout(forceFinTour, TOUR_TIME);
}


function finTour(){

	if(tourTimerId != null){
		clearTimeout(tourTimerId);
	}

}