function styleElementSiblings(tag, theclass) {
    if (!document.getElementsByTagName) return false;
    var elems = document.getElementsByTagName(tag);
    var elem;
    for (var i = 0; i < elems.length; i++) {
        elem = getNextElement(elems[i].nextSibling);

        addClass(elem, theclass);
    }
}
function addClass(elem, value) {
    if (!elem.className) {
        elem.className = value;
    } else {
        var newClassName = elem.className;
        newClassName += " ";
        newClassName += value;
        elem.className = newClassName;
    }
}
function getNextElement(node) {
    if (node.nodeType == 1) {
        return node;
    }
    if (node.nextSibling) {
        return getNextElement(node.nextSibling);
    }
    return null;
}

addLoadEvent(function() {
    styleElementSiblings("h1", "intro");
});
