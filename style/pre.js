function forEachElement(selector, fn) {
  var elements = document.querySelectorAll(selector);
  for (var i = 0; i < elements.length; i++)
    fn(elements[i], i);
}

forEachElement("pre>code[class*='language-']", function(el, i) {
  el.parentNode.insertAdjacentHTML("beforebegin", "<div class='code-header'><a class='copy-code'>Copy</a></div>");
});

forEachElement(".copy-code", function(el, i) {
  el.addEventListener("click", function() {
    var body = document.getElementsByTagName("body")[0];

    var txt = document.createElement("textarea");
    txt.setAttribute("id", "txt-cpy");
    txt.style.position = "absolute";
    txt.style.left = "-9999em";
    txt.value = el.parentNode.nextElementSibling.textContent;
    body.appendChild(txt);

    document.getElementById("txt-cpy").select();

    var div = document.createElement("div");
    div.setAttribute("class", "msg-alert");
    try {
      var successful = document.execCommand('copy');
      successful ? div.innerHTML = "Successfully copied to clipboard !" : div.innerHTML = "Fail to copy to clipboard !";
      body.appendChild(div);
    } catch (err) {
      console.log('Oops, unable to copy');
    }

    body.removeChild(txt);
    setTimeout(function() {
      body.removeChild(div);
    }, 2000)
  })
});