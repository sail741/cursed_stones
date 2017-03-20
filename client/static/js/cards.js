var WIDTH = 100;

var card_selected = null;

var cardsSelf = document.querySelector('.cards.self');

var hand_cards = [

];

var timeoutIdPiocheRedraw = null;


function drawsCards(elem, cards){

	elem.innerHTML = ''; //On supprime les anciennes cartes

	if(cards.length == 0) return;

	var rotate_angle = (20 / cards.length); //calcules de l'angle

	var translateStart = -(cards.length * WIDTH / 2);
	var rotateStart = -(cards.length / 2) * rotate_angle + (rotate_angle / 2);

	for(var i = 0; i < cards.length; i++){

		var card = cards[i];
		if(card == null){
			continue; //WORKAROUND because Kevin... 
		}
		var divCard = buildDOMCard(card);
		divCard.dataset.card_index = i;

		let move = translateStart;
		translateStart += WIDTH;

		let rotate = rotateStart;
		rotateStart += rotate_angle;

		divCard.style.transform = 'translateX(' + move + 'px) rotateZ('+rotate+'deg)'; 
		divCard.style['transform-origin'] = (-move) + 'px';
			
		divCard.addEventListener('click', selectCards);

		elem.appendChild(divCard);

	}
}

function setSelfHand(hand){
	hand_cards = hand;
	drawsCards(cardsSelf, hand_cards);
}

function removeCard(cardsElem, card){
	var index = indexOfCardFromHand(card);
	if(index < 0){
		console.error('Cards not found in hand');
		return;
	}

	hand_cards.splice(index, 1);
	var divCard = cardsElem.querySelector('div[data-uid="'+card.uid +'"]');
	
	board.appendChild(divCard)

	drawsCards(cardsElem, hand_cards);
	
	return divCard;
}

function indexOfCardFromHand(card){
	for(var i =0; i< hand_cards.length; i++){
		if(hand_cards[i].uid == card.uid){
			return i;
		}
	}
	return -1;
}

/// Action click sur carte
function selectCards(e){

	var translateYN100 = 'translateY(-100px)';

	e.preventDefault();
	
	if(this.className.indexOf('selected') > -1){
		this.className = this.className.replace('selected', '');
		this.style.transform = this.style.transform.replace('translateY(-100px)', '');
		card_selected = null;
		return;
	}	

	var selectedCards = this.parentNode.querySelectorAll('.selected');
	
	for(var i = 0; i < selectedCards.length; i++){
		selectedCards[i].className = selectedCards[i].className.replace('selected', '').trim();
		selectedCards[i].className = selectedCards[i].className.replace('no-hover', '').trim();
		selectedCards[i].style.transform = selectedCards[i].style.transform.replace(translateYN100, ''); 
		
	}

	this.className += " no-hover selected"
	//On evite un second click sur la carte
	
	var card = hand_cards[parseInt(this.dataset.card_index)]

	card_selected = card;

	this.style.transform += translateYN100; 
	
	var that = this;

	setTimeout(function(){
		//that.remove();
		//drawsCards(cardsSelf, [1, 2, 3, 4, 5, 6, 7]);
	}, 2000);

	return false;
}

function piocheCard(cardsElem, card){
	hand_cards.push(card);

	console.log("piocheCard", card);
	
	var divCard = buildDOMCard(card);
	divCard.className = "card comming";
	cardsElem.appendChild(divCard);

	if(timeoutIdPiocheRedraw != null){
		clearTimeout(timeoutIdPiocheRedraw);
	}

	timeoutIdPiocheRedraw = setTimeout(function(){
		drawsCards(cardsElem, hand_cards);
	}, 2000);
}


function buildDOMCard(card){
	var divCard = document.createElement('div');
	divCard.className = "card";
	
	divCard.dataset.uid = card.uid;

	var titleSpan = document.createElement('span');
	titleSpan.className = "title";
	titleSpan.textContent = card.name;

	divCard.appendChild(titleSpan);

	return divCard;
	
}

function unSelectCards(){
	//TODO
}


//drawsCards(cardsSelf, hand_cards);




// var c7 = {
// 		name: 'C7',
// 		uid: 'C7', 
// 		img: 'board_c1.png'
// 	};


