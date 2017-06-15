function hightlightPage() {
    var headers = document.getElementsByTagName("header");
    if (headers.length == 0) return false;
    var navs = headers[0].getElementsByTagName("nav");
    if (navs.length == 0) return false;
    var links = navs[0].getElementsByTagName("a");
    var linkurl;
    for (var i = 0; i < links.length; i++) {
        linkurl = links[i].getAttribute("href");
        if (window.location.href.indexOf(linkurl) != -1) {
            links[i].className = "here";
            var linktext = links[i].lastChild.nodeValue.toLowerCase();
            document.body.setAttribute("id", linktext);
        }
    }
}

function prepareSlideshow() {
    if (!document.getElementsByTagName) return false;
    if (!document.getElementById) return false;
    if (!document.getElementById("intro")) return false;
    var intro = document.getElementById("intro");
    var slideshow = document.createElement("div");
    slideshow.setAttribute("id", "slideshow");

    var frame= document.createElement("img");
    frame.setAttribute("src", "images/frame.gif");
    frame.setAttribute("alt", "frame");
    frame.setAttribute("id", "frame");
    slideshow.appendChild(frame);


    var preview = document.createElement("img");
    preview.setAttribute("src", "images/slideshow.gif");
    preview.setAttribute("alt", "a glimpse of what awaits you");
    preview.setAttribute("id", "preview");
    slideshow.appendChild(preview);
    insertAfter(slideshow, intro);

    var links = document.getElementsByTagName("a");
    var destination;
    for (var i = 0; i < links.length; i++) {
        links[i].onmouseover = function() {
            destination = this.getAttribute("href");
            if (destination.indexOf("index.html") != -1) {
                moveElement("preview", 0, 0, 5);
            }
            if (destination.indexOf("about.html") != -1) {
                moveElement("preview", -150, 0, 5);
            }
            if (destination.indexOf("photos.html") != -1) {
                moveElement("preview", -300, 0, 5);
            }
            if (destination.indexOf("live.html") != -1) {
                moveElement("preview", -450, 0, 5);
            }
            if (destination.indexOf("contact.html") != -1) {
                moveElement("preview", -600, 0, 5);
            }
        }
    }

}

function showSection(id) {
    var sections = document.getElementsByTagName("section");
    for (var i = 0; i < sections.length; i++) {
        if (sections[i].getAttribute("id") != id) {
            sections[i].style.display = "none";
        } else {
            sections[i].style.display = "block";
        }
    }
}

function prepareInternalnav() {
    if (!document.getElementsByTagName) return false;
    if (!document.getElementsById) return false;
    var articles = document.getElementsByTagName("article");
    if (articles.length == 0) return false;
    var navs = articles.getElementsByTagName("nav");
    if (navs.length == 0) return false;
    var nav = navs[0];
    var links = nav.getElementsByTagName("a");
    for (var i = 0; i < links.length; i++) {
        var sectionId = links[i].getAttribute("href").split("#")[1];
        if (!document.getElementById(sectionId)) continue;
        document.getElementById(sectionId).style.display = "none";
        links[i].destination = sectionId;
        links[i].onclick = function() {
            showSection(this.destination);
            return false;
        }
    }
}

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

function highlightRows() {
    if (!document.getElementsByTagName) return false;
    var rows = document.getElementsByTagName("tr");
    for (var i = 0; i < rows.length; i++) {
        rows[i].oldClassName = rows[i].className;
        rows[i].onmouseover = function() {
            addClass(this, "highlight");
        }
        rows[i].onmouseout = function() {
            this.className = this.oldClassName;
        }
    }
}

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
    var articles = document.getElementsByTagName("article");
    if (articles.length == 0) return false;
    var container = articles[0];
    container.appendChild(header);
    container.appendChild(dlist);
}

function focusLabels() {
    if (!document.getElementByTagName) return false;
    var labels = document.getElementsByTagName("label");
    for (var i = 0; i < labels.length; i++) {
        if (!labels[i].getAttribute("for")) continue;
        labels[i].onclick = function() {
            var id = this.setAttribute("for");
            if (!document.getElementById(id)) return false;
            var element = document.getElementById(id);
            element.focus();
        }
    }
}

function resetFields(whichform) {
    if (Modernizr.input.placeholder) return;
    for (var i = 0; i < whichform.elments.length; i++) {
        var element = whichform.elements[i];
        if (element.type == "submit") continue;
        var check = element.plaeholder || element.getAttribute("placeholder");
        if (!check) continue;
        element.onfocus = function() {
            var text = this.placeholder || this.getAttribute("placeholder");
            if (this.value == text) {
                this.className = '';
                this.value = "";
            }
        }
        element.onblur = function() {
            if (this.value == "") {
                this.className = "placeholder";
                this.value = this.placeholder || this.getAttribute("placeholder");
            }
        }
        element.onblur();
    }
}

function prepareForms() {
    for(var i = 0; i < document.forms.length; i++) {
        var thisform = document.forms[i];
        resetFields(thisform);
        thisform.onsubmit = function() {
            return validateForm(this);
        }
    }

}

function isFilled(field) {
    if (field.value.replace(" ", "").length == 0) return false;
    var placeholder = field.placeholder || field.getAttribute('placehoder');
    return (field.value != placeholder);
}

function isEmail(field) {
    return (field.value.indexOf("@") != -1 && field.value.indexOf('.') != -1);
}

function validateForm(whichform) {
    for (var i = 0; i < whichform.elements.length; i++) {
        var element = whichform.elements[i];
        if (element.required == true) {
            if (!isFilled(element)) {
                alert("Plase fill in the "+element.name+" field.");
                return false;
            }
        }
        if (element.type == "email") {
            if (!isEmail(element)) {
                alert("The "+element.name+" field must be a valid email address.");
                return false;
            }
        }
    }
    return true;
}

addLoadEvent(hightlightPage);
addLoadEvent(prepareSlideshow);
addLoadEvent(prepareInternalnav);
addLoadEvent(stripeTables);
addLoadEvent(highlightRows);
addLoadEvent(displayAbbreviations);
addLoadEvent(focusLabels);
addLoadEvent(prepareForms);
