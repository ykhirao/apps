console.log("Md2Html is started!!")
const md = require('markdown-it')();

window.onload = function () {
  const toHtmlButton = document.getElementById("toHtmlButton");
  const MdAreaInput = document.getElementById("MdAreaInput");

  MdAreaInput.oninput = function () {
    const text = document.getElementById("MdAreaInput").innerText;
    const result = md.render(text);

    document.getElementById("HtmlAreaText").innerText = result;
    document.getElementById("HtmlAreaOutput").innerHTML = result;
  };

  // toHtmlButton.onclick = function () {
  //   const text = document.getElementById("MdAreaInput").innerText;
  //   const result = md.render(text);

  //   document.getElementById("HtmlAreaText").innerText = result;
  //   document.getElementById("HtmlAreaOutput").innerHTML = result;
  // };
}
