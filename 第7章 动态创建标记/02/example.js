window.onload = function() {
    var para = document.createElement("p");
    var text = document.createTextNode("hello world");
    para.appendChild(text);
    var testdiv = document.getElementById("testdiv");
    testdiv.appendChild(para);
}
