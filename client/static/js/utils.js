var messageTimeout = null;

function convertPositionServerToClient(pos){
	return {
		x: pos.row,
		y: pos.column
	}
}

function convertPositionClientToServer(pos){
	return {
		row: pos.x,
		column: pos.y
	}
}

function convertPosToStr(pos){
	return pos.x + '-' + pos.y;
}

function displayMessage(title, sub, time){
	var messageElement =  document.querySelector('#message');
	messageElement.querySelector('span').textContent = title;
	messageElement.querySelector('p').textContent = sub;
	if(messageTimeout != null){
		clearTimeout(messageTimeout);
		messageTimeout = null;
	}
	messageTimeout = setTimeout(function(){
		messageElement.className = '';
	}, time);
	messageElement.className = 'show';
}