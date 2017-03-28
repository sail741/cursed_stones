var contextMenuDom = document.querySelector("#contextMenu");

var mouseX = -1;
var mouseY = -1;

document.addEventListener("mousemove", function(evt){
    mouseX = evt.clientX;
    mouseY = evt.clientY;
});

function displayContextMenu(){
    contextMenuDom.style.display = "flex";
    contextMenuDom.style.left = mouseX + "px";
    contextMenuDom.style.top = mouseY + "px";

}

function clearContextMenuActions(){
    var children = contextMenuDom.children;
    while(children.length > 0){
        var child = children[0];
        child.remove();
    }
}

function declareContextMenuAction(actionName, evtClick){
    var span = document.createElement("span");
    span.textContent = actionName;
    span.addEventListener("click", function(){
        hideContextMenu();
        evtClick();
    });
    contextMenuDom.appendChild(span);
}

function hideContextMenu(){
    contextMenuDom.style.display ='';
}