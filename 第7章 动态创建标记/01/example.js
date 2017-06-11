window.onload = function() {
    var para = document.createElement("p");
    var testdiv = document.getElementById("testdiv");
    testdiv.appendChild(para);
    var text = document.createTextNode("Hello world");
    para.appendChild(text);
}
