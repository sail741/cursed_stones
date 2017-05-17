var TOUR_TIME = 1000 * 30; // 1 min

var tourTimerId = null;

var localSelfMana = 0;
var localAdvMana = 0;

var manaMaxSelf = 0;
var manaMaxAdv = 0;

var localTourWho = "...";

var localTourNum = 0;

var localPseudoActual = null;
var localPseudoAdv = null;

var btnFinTour = document.querySelector("#finTour");

function connect() {
	console.log('Connected');
	console.log('send join game');
	sio.emit('check_already_in_game',function (is_reconnect) {
		if(!is_reconnect){
			select_deck();
		}
    })
}

//TODO : a verifier ici le 1 a parametrer quand on pourra selectionner le deck
function select_deck(){
    sio.emit('select_deck',1,function () {
		joinGame();
    })
}
//On envoie l'event de joinGame
function joinGame(){
	
}

// Démarre son tour
function startSelfTour(){
	requestCards(); //On demande une carte pour le nouveau tour
	btnFinTour.dataset.disabled = 0;
	
}

function startAdvTour(){
    btnFinTour.dataset.disabled = 1;
}

function setTourData(isMine, numTour, mana){

	localTourNum = numTour;

	localTourWho = localPseudoAdv;
	if(isMine){
		localTourWho = localPseudoActual;
		localSelfMana = mana;
		displayMessage("C'est a votre tour de jouer !", "", 2000);
        btnFinTour.dataset.disabled = 0;
        manaMaxSelf = mana;
	}else{
		localAdvMana = mana;
		displayMessage("C'est a votre adversaire...", "", 2000);
        btnFinTour.dataset.disabled = 1;
        manaMaxAdv = mana;
	}



	renderStatusBar();
	
}

function renderStatusBar(){

	document.querySelector('#tourWho').textContent = localTourWho ;
	document.querySelector('#tourNum').textContent = localTourNum;

	let manaLeft = currentSlide == 'left' ? localSelfMana + '/' + manaMaxSelf : localAdvMana + '/' + manaMaxAdv ;
    let manaRight = currentSlide == 'right' ? localSelfMana + '/' + manaMaxSelf: localAdvMana + '/' + manaMaxAdv;

    let userLeft = currentSlide == 'left' ? localPseudoActual : localPseudoAdv ;
    let userRight = currentSlide == 'right' ? localPseudoActual : localPseudoAdv ;

    document.querySelector('#mana_left').textContent = manaLeft ;
	document.querySelector('#mana_right').textContent = manaRight;

    document.querySelector('#mana_user_left').textContent = userLeft;
    document.querySelector('#mana_user_right').textContent = userRight;


}

function forceFinTour(){
	finTour();
}

function finTour(){
		sendFinTour();
}
function clearTimeoutFinTour(){
	if(tourTimerId != null){
		clearTimeout(tourTimerId);
	}
}

function setManaSelf(mana){
	localSelfMana = mana;
	console.log("set mana");
	renderStatusBar();
}

function setManaAdv(mana){
	localAdvMana = mana;
	renderStatusBar();
}

function setManaMax(mana){
	manaMaxSelf = mana;
	manaMaxAdv = mana;
	renderStatusBar();
}

btnFinTour.addEventListener("click", function(){
	finTour();
});

