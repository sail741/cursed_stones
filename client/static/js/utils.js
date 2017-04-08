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

function convertPosStrToObj(str){
	var split = str.split('-');
	var pos = {
		x:  parseInt(split[0]),
		y:  parseInt(split[1])
	}
	return pos;
}

function convertPosToStr(pos){
	if(pos.x == null && pos.row != null){
		pos = convertPositionServerToClient(pos);
	}
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

function isEquivalent(a, b) {
    // Create arrays of property names
    var aProps = Object.getOwnPropertyNames(a);
    var bProps = Object.getOwnPropertyNames(b);

    // If number of properties is different,
    // objects are not equivalent
    if (aProps.length != bProps.length) {
        return false;
    }

    for (var i = 0; i < aProps.length; i++) {
        var propName = aProps[i];

        // If values of same property are not equal,
        // objects are not equivalent
        if (a[propName] !== b[propName]) {
            return false;
        }
    }

    // If we made it this far, objects
    // are considered equivalent
    return true;
}


function distance(p1, p2){
	return Math.sqrt((p2.x-p1.x)*(p2.x-p1.x) + (p2.y-p1.y)*(p2.y-p1.y))
}

function isEquivalentPositionEnity(entity , pos){
    if (entity.multiCase) {
        for (var j = 0; j < entity.position.length; j++) {
            if (isEquivalent(convertPositionServerToClient(entity.position[j]), pos)) {
                true
            }
        }
    } else {
        if (isEquivalent(convertPositionServerToClient(entity.position), pos)) {
            return true;
        }
    }
    return false;
}