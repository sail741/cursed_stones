var WIDTH = 170;

var card_selected = null;

var cardsSelf = document.querySelector('.cards.self');

var hand_cards = [

];

var timeoutIdPiocheRedraw = null;


function drawsCards(elem, cards){

	// elem.innerHTML = ''; //On supprime les anciennes cartes

	// if(cards.length == 0) return;

	// var rotate_angle = (50 / cards.length); //calcules de l'angle

	// var translateStart = -(cards.length * WIDTH / 2);
	// var rotateStart = -(cards.length / 2) * rotate_angle + (rotate_angle / 2);

	// for(var i = 0; i < cards.length; i++){

	// 	var card = cards[i];
	// 	if(card == null){
	// 		continue; //WORKAROUND because Kevin... 
	// 	}
	// 	var divCard = buildDOMCard(card);
	// 	divCard.dataset.card_index = i;

	// 	let move = translateStart;
	// 	translateStart += WIDTH/cards.length;

	// 	let rotate = rotateStart;
	// 	rotateStart += rotate_angle;

	// 	divCard.style.transform = 'translateX(' + move + 'px) translateY(75px)'; // rotateZ('+rotate+'deg)'; 
	// 	//divCard.style['transform-origin'] = (-move) + 'px';
			
	// 	divCard.addEventListener('click', selectCards);

	// 	elem.appendChild(divCard);

	// }

	elem.innerHTML = ''; //On supprime les anciennes cartes

	if(cards.length == 0) return;

	var center = elem.offsetWidth / 2;

	var start = center - (cards.length / 2) * WIDTH;
	if(cards.length % 2 != 0)
	{
		start -= WIDTH/2;
	}

	for(var i = 0; i < cards.length; i++){

		var card = cards[i];
		if(card == null){
			continue; //WORKAROUND because Kevin... 
		}

		var divCard = buildDOMCard(card);
		divCard.dataset.card_index = i;

		divCard.addEventListener('click', selectCards);

		elem.appendChild(divCard);
	}

	elem.style.width = cards.length * WIDTH + "px";
}

function setSelfHand(hand){
	hand_cards = hand;
	card_selected = null;
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

	var translateYN100 = 'translateY(10px)';

	e.preventDefault();
	
	if(this.className.indexOf('selected') > -1){
		this.className = this.className.replace('selected', '');
		this.style.transform = this.style.transform.replace(translateYN100, '');
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

function piocheCard(cardsElem, card, cb){
	hand_cards.push(card);

	console.log("piocheCard", card);
	
	var divCard = buildDOMCard(card);
	divCard.className = "carte comming";
	cardsElem.appendChild(divCard);

	if(timeoutIdPiocheRedraw != null){
		clearTimeout(timeoutIdPiocheRedraw);
	}

	timeoutIdPiocheRedraw = setTimeout(function(){
		if(cb != null){
			cb();
		}else{
            drawsCards(cardsElem, hand_cards);
		}

	}, 2000);
}


function buildDOMCard(card){
	var divCard = document.createElement('button');
	divCard.className = "carte";
	
	divCard.dataset.uid = card.uid;

	var titleSpan = document.createElement('h3');
	titleSpan.textContent = card.name;


	var costSpan = document.createElement('p');
	var iCost = document.createElement('i');
	iCost.className="fa fa-tint";
	iCost.textContent = card.cost;

	costSpan.appendChild(iCost);

	var divGrp1 = document.createElement('div');
	divGrp1.className = "groupe";

    var divGrp2 = document.createElement('div');
    divGrp2.className = "groupe";


    var lifeSpan =  document.createElement('p');
    var iLfe = document.createElement('i');
    iLfe.className="fa fa-heart";
    iLfe.textContent = card.life;

    lifeSpan.appendChild(iLfe);

    divGrp1.appendChild(lifeSpan);

    var moveSpan =  document.createElement('p');
    var iMove = document.createElement('i');
    iMove.className="fa fa-arrows";
    iMove.textContent = card.movement;

    moveSpan.appendChild(iMove);

    divGrp1.appendChild(moveSpan);

    var divClear1 = document.createElement("div");
    divClear1.className = "clear";


    divGrp1.appendChild(divClear1);


    var attackSpan =  document.createElement('p');
    var iAttack = document.createElement('i');
    iAttack.className="fa fa-bomb";
    iAttack.textContent = card.attack;

    attackSpan.appendChild(iAttack);

    divGrp2.appendChild(attackSpan);

    var defenceSpan =  document.createElement('p');
    var iDef = document.createElement('i');
    iDef.className="fa fa-shield";
    iDef.textContent = card.defence;

    defenceSpan.appendChild(iDef);

    divGrp2.appendChild(defenceSpan);

    var divClear2 = document.createElement("div");
    divClear2.className = "clear";


    divGrp2.appendChild(divClear2);

	var image = document.createElement("img");
	image.src = getEntityImage(card);



	divCard.appendChild(titleSpan);
    divCard.appendChild(image);
	divCard.appendChild(costSpan);
    divCard.appendChild(divGrp1);
    divCard.appendChild(divGrp2);

	return divCard;
	
}

function unSelectCards(){
	card_selected = null;
}


//drawsCards(cardsSelf, hand_cards);




// var c7 = {
// 		name: 'C7',
// 		uid: 'C7', 
// 		img: 'board_c1.png'
// 	};


