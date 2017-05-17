var board = document.querySelector("#board");
var LARGEUR = 16;
var HAUTEUR = 8;
var LARGEUR_SIDE = 4;
var currentSlide = null;
var entities = [];

var entity_selected = null;
var action_entity_selected = null;

function setSlide(slide) {
    currentSlide = slide;
    var tds = board.querySelectorAll('td');
    for (var i = 0; i < tds.length; i++) {
        var td = tds[i];
        var pos = convertPosStrToObj(td.dataset.pos);
        if (pos.y < LARGEUR_SIDE) {
            if (currentSlide == 'left') {
                td.className = 'self';
            } else {
                td.className = 'enemie';
            }
        } else if (pos.y >= (LARGEUR - LARGEUR_SIDE)) {
            if (currentSlide == 'right') {
                td.className = 'self';
            } else {
                td.className = 'enemie';
            }
        }
    }
    renderStatusBar();
}

function initBoard(largeur, hauteur) {
    var table = document.createElement("table");
    for (var r = 0; r < hauteur; r++) {
        var tr = document.createElement('tr');
        tr.dataset.row = r;
        for (var c = 0; c < largeur; c++) {
            var td = document.createElement('td');
            td.dataset.pos = r + '-' + c;
            td.dataset.column = c;

            // if(c < LARGEUR_SIDE){
            // 	td.className += "self ";
            // }
            // if(c >= (HAUTEUR - LARGEUR_SIDE)){
            // 	td.className += "enemie";
            // }

            tr.appendChild(td);
            td.addEventListener('click', clickOnCase);
        }
        table.appendChild(tr);
    }
    board.appendChild(table);
}

function placeOnBoard(posStr, card) {
    var boardCase = board.querySelector('td[data-pos="' + posStr + '"]');
    if (boardCase != null) {
        var pos = convertPosStrToObj(posStr);

        var entity = {
            card: card,
            uid: 'enfeo' + (new Date()).getTime(),
            pos: pos,
            self: true,
            life: 10,
            attack: 2,
            defense: 2,
            defenseMode: true,
            canDoAction: false
        }


        entities[pos.x][pos.y] = entity;

        drawEntity(entity);

    }
}

function clickOnCase() {
    var boardCasePos = this.dataset.pos;
    var pos = convertPosStrToObj(boardCasePos);
    console.log("Click on case", boardCasePos, card_selected);
    if (card_selected) { //dans cards.js
        requestPlaceCard(card_selected, boardCasePos);
        unselectEntity();
    } else if (entity_selected) {
        if (isEquivalentPositionEnity(entity_selected, pos)) {
            console.log("unselect entity", entity_selected);
            unselectEntity();
        } else {
            var entity = getEntity(pos);
            if (entity != null) {
                if (entity.Self == true && action_entity_selected == null) {
                    unselectEntity();
                    clickOnCase();
                } else if (action_entity_selected == "attack") {
                    //TODO : Attaque
                    requestAttack(entity_selected, pos);
                    unselectEntity();
                } else if (action_entity_selected == null) {
                    unselectEntity();
                }
            } else {
                if (action_entity_selected == "move") {
                    requestMove(entity_selected, pos);
                    unselectEntity();
                } else {
                    unselectEntity();
                }

            }
        }
    } else {
        var entity = getEntity(pos);
        if (entity && entity.Self == true) {
            console.log('selection entity', entity);
            entity_selected = entity;
            displaySelected(entity);

            clearContextMenuActions();
            if (entity.canMove) {
                declareContextMenuAction("Deplacement", function () {
                    requestOverlay("move", entity);
                    action_entity_selected = "move";
                });
            }
            if (entity.canDoAction) {
                declareContextMenuAction("Attaque", function () {
                    requestOverlay("attack", entity);
                    action_entity_selected = "attack";
                });

                if (entity.defense > 0) {
                    declareContextMenuAction("Activer le mode défense", function () {
                        unselectEntity();
                        requestDefenseMode(entity);
                    });
                }
            }


            displayContextMenu();

        }
    }
}

function unselectEntity() {
    entity_selected = null;
    action_entity_selected = null;
    displaySelected(null);
    hideContextMenu();
    requestOverlay("off");
}

function displayOverlayBoard(cases) {
    var allOverlay = board.querySelectorAll(".overlay");
    for (var i = 0; i < allOverlay.length; i++) {
        allOverlay[i].remove();
    }

    for (var i = 0; i < cases.length; i++) {
        var caseDraw = cases[i];
        var pos = convertPositionServerToClient(caseDraw.position);
        var type = caseDraw.type;
        console.log(type);
        if (type == "off") continue;
        var caseDom = board.querySelector('td[data-pos="' + convertPosToStr(pos) + '"]');
        if (caseDom) {
            var div = document.createElement('div');
            div.className = 'overlay ' + type;
            caseDom.appendChild(div);
        }
    }


}


function doPlaceCard(card, boardCasePos) {
    placeOnBoard(boardCasePos, card);
    var cardDiv = removeCard(cardsSelf, card);
    if (cardDiv != null) {
        cardDiv.style.transform = '';
        cardDiv.className = 'card placing'
        unSelectCards();

        setInterval(function () {
            cardDiv.remove()
        }, 1900);
    }
}

function listAllEntitiesForPlayer(selfEntity) {
    var res = [];
    for (var i = 0; i < entities.length; i++) {
        var row = entities[i];
        for (var j = 0; j < row.length; j++) {

            var entity = row[j];
            if (entity != null && entity.self == selfEntity) {
                res.push(entity);
            }

        }
    }
    return res;
}

function getEntityFromUID(uid) {
    for (var i = 0; i < entities.length; i++) {
        if (entities[i].uid == uid) {
            return entities[i];
        }
    }
    return null;
}

function getEntity(pos) {
    for (var i = 0; i < entities.length; i++) {
        if(isEquivalentPositionEnity(entities[i], pos)){
            return entities[i];
        }
    }
    return null;
}

function setEntities(a_entities) {
    entities = a_entities;
    redrawBoard();
}

function redrawBoard() {
    //Selections de toutes les entités pour les clear;
    var entitiesOnBoardsDiv = board.querySelectorAll('.entity');
    for (var i = 0; i < entitiesOnBoardsDiv.length; i++) {
        entitiesOnBoardsDiv[i].remove();
    }

    for (var i = 0; i < entities.length; i++) {
        drawEntity(entities[i]);
    }

}

function boardResetSelect() {
    entity_selected = null;
    card_selected = null;
    action_entity_selected = null;
}

initBoard(LARGEUR, HAUTEUR);
