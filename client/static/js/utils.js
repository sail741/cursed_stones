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