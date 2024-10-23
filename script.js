var konamiCode = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a", "Enter"];

var konamiCodePosition = 0;

document.addEventListener('keydown', function(e) {
  var key = e.key;
  var requiredKey = konamiCode[konamiCodePosition];

  if (key == requiredKey) {
    konamiCodePosition++;
    if (konamiCodePosition == konamiCode.length) {
      sillyism();
      konamiCodePosition = 0;
    }
  } else {
    konamiCodePosition = 0;
  }
});

function sillyism() {
  window.open("https://drive.google.com/file/d/12dAk1K07BqmrUvS59bRCBcwocp9yyQiP/view");
}

var sillyCode = ["ArrowUp", "ArrowDown", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "a", "b", "Enter"];

var sillyCodePosition = 0;

document.addEventListener('keydown', function(e) {
  var key = e.key;
  var requiredKey = sillyCode[sillyCodePosition];

  if (key == requiredKey) {
    sillyCodePosition++;
    if (sillyCodePosition == sillyCode.length) {
      goobert();
      sillyCodePosition = 0;
    }
  } else {
    sillyCodePosition = 0;
  }
});

function sillyism() {
  window.open("https://drive.google.com/file/d/12dAk1K07BqmrUvS59bRCBcwocp9yyQiP/view");
  window.setTimeout(function() {window.close();}, 100);
}

function goobert() {
  fetch("./sandstone.txt")
    .then((res) => res.text())
    .then((text) => {
      let blank = window.open("", "_blank");
      blank.document.write(text);
      window.setTimeout(function() {window.close();}, 100);
    });
}