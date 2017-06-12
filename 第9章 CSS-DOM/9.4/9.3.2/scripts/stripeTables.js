function stripeTables() {
    if (!document.getElementsByTagName) return false;
    var tables = document.getElementsByTagName("table");
    var odd, rows;
    for (var i = 0; i < tables.length; i++) {
        odd = false;
        rows = tables[i].getElementsByTagName("tr");
        for (var j = 0; j < rows.length; j++) {
            if (odd == true) {
                addClass(rows[j], "odd");
                odd = false;
            } else {
                addClass(rows[j], "even");
                odd = true;
            }
        }
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

addLoadEvent(stripeTables);
