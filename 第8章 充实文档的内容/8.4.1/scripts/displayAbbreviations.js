function displayAbbreviations() {
    if (!document.getElementsByTagName) return false;
    if (!document.createElement) return false;
    if (!document.createTextNode) return false;
    var defs = new Array();
    var dlist = document.createElement("dl");
    var abbreviations = document.getElementsByTagName("abbr");
    for (var i = 0; i < abbreviations.length; i++) {
        var current_abbr = abbreviations[i];
        if (current_abbr.childNodes.length < 1) continue;
        var key = current_abbr.lastChild.nodeValue;
        var definition = current_abbr.getAttribute("title");
        defs[key] = definition;
    }

    for (key in defs) {
        var definition = defs[key];
        var dtitle = document.createElement("dt");
        var dtitle_txt = document.createTextNode(key);
        dtitle.appendChild(dtitle_txt);
        var ddesc = document.createElement("dd");
        var ddesc_txt = document.createTextNode(definition);
        ddesc.appendChild(ddesc_txt);
        dlist.appendChild(dtitle);
        dlist.appendChild(ddesc);
    }
    if (dlist.childNodes.length < 1) return false;

    var header = document.createElement("h2");
    var header_txt = document.createTextNode("Abbreviations");
    header.appendChild(header_txt);
    document.body.appendChild(header);
    document.body.appendChild(dlist);
}

addLoadEvent(displayAbbreviations);
