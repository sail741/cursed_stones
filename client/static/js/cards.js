var WIDTH = 200;


var cardsSelf = document.querySelector('.cards.self');



function drawsCards(elem, cards){

	elem.innerHTML = ''; //On supprime les anciennes cartes

	if(cards.length == 0) return;

	var rotate_angle = (20 / cards.length); //calcules de l'angle

	var translateStart = -(cards.length * WIDTH / 2);
	var rotateStart = -(cards.length / 2) * rotate_angle + (rotate_angle / 2);

	for(var i = 0; i < cards.length; i++){

		var card = document.createElement('div');
		card.className = "card";

		let move = translateStart;
		translateStart += WIDTH;

		let rotate = rotateStart;
		rotateStart += rotate_angle;

		card.style.transform = 'translateX(' + move + 'px) rotateZ('+rotate+'deg)'; 
		card.style['transform-origin'] = (-move) + 'px';
			
		card.addEventListener('click', moveToBoardEvent);

		elem.appendChild(card);

	}

}

/// Action click sur carte
function moveToBoardEvent(e){
	e.preventDefault();

	this.className += " no-hover selected"
	//On evite un second click sur la carte
	this.removeEventListener('click', moveToBoardEvent);

	this.style.transform += 'translateY(-100px)'; 
	
	var that = this;

	setTimeout(function(){
		//that.remove();
		//drawsCards(cardsSelf, [1, 2, 3, 4, 5, 6, 7]);
	}, 2000);

	return false;
}

drawsCards(cardsSelf, [1, 2, 3, 4, 5, 6, 7]);