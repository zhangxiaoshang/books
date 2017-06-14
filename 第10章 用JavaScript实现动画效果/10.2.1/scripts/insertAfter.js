function insertAfter(newElement, targetElement) {
    var parent = targetElement.parentNode;
    if (newElement == parent.lastChild) {
        parent.appendChild(newElement);
    } else {
        parent.insertBefore(newElement, targetElement.nextSibling);
    }
}
