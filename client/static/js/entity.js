function getEntityImage(entity) {
    return '/static/img/cards/' + entity.card.img;
}

function buildEntityDiv(entity) {
    var div = document.createElement('div');

    div.className = "entity " + (entity.Self ? 'self' : 'enemie');
    div.dataset.entity = entity.uid;
    div.dataset.selected = 0;

    var img = document.createElement('img');
    img.src = '/static/img/cards/board_c1.png';//getEntityImage(entity);
    img.alt = entity.name;
    img.className = "entityimg"

    div.appendChild(img);

    if (entity.defenseMode) {
        var imgShield = document.createElement('img');
        imgShield.className = "shield";
        imgShield.alt = "Le joueur est en mode défense";
        imgShield.src = '/static/img/shield.png';
        div.appendChild(imgShield);
    }

    var elemStatus = document.createElement('div');
    elemStatus.className = "status";

    var elemName = document.createElement('span');
    elemName.className = 'name';
    elemName.textContent = entity.name;

    var elemLife = document.createElement('span');
    elemLife.textContent = entity.life;
    elemLife.className = "icon life";

    var elemAttack = document.createElement('span');
    elemAttack.textContent = entity.attack;
    elemAttack.className = "icon attack";

    var elemDefense = document.createElement('span');
    elemDefense.textContent = entity.defense;
    elemDefense.className = "icon defense";

    elemStatus.appendChild(elemName);
    elemStatus.appendChild(elemLife);
    elemStatus.appendChild(elemAttack);
    elemStatus.appendChild(elemDefense);
    div.appendChild(elemStatus);

    return div;
}

function displaySelected(entity) {

    var selected_dom = board.querySelectorAll('.entity[data-selected="1"]');

    for (var i = 0; i < selected_dom.length; i++) {
        selected_dom[i].dataset.selected = 0;
    }

    if (entity != null) {
        var actualDiv = document.querySelector('.entity[data-entity="' + entity.uid + '"]');
        actualDiv.dataset.selected = 1;
    }
}

function removeEntity(pos) {
    var posStr = convertPosToStr(pos);
    var boardCase = board.querySelector('td[data-pos="' + posStr + '"]');
    if (boardCase != null) {
        while (boardCase.firstChild) {
            boardCase.removeChild(boardCase.firstChild);
        }
    }
    removeEntityOnArray(pos);

}

function removeEntityOnArrayFromUID(uid) {
    var entity = getEntityFromUID(uid);
    if (entity) {
        var index = entities.indexOf(entity);
        entities.splice(index, 1);
    }
}

function removeEntityOnArray(pos) {
    var entity = getEntity(pos);
    if (entity) {
        var index = entities.indexOf(entity);
        entities.splice(index, 1);
    }
}

function drawEntity(entity) {
    var actualDivs = document.querySelectorAll('.entity[data-entity="' + entity.uid + '"]');
    removeEntityOnArray(entity.uid);

    for (var i = 0; i < actualDivs.length; i++) {
        actualDivs.remove();
    }

    var newDiv = buildEntityDiv(entity);
    var positions = entity.multiCase ? entity.position : [entity.position];
    for (var i = 0; i < positions.length; i++){
        var posStr = convertPosToStr(positions[i]);
        var boardCase = board.querySelector('td[data-pos="' + posStr + '"]');
        if (boardCase != null) {
            boardCase.appendChild(newDiv.cloneNode(true));
        }
    }

}


function setDefenseMode() {

}