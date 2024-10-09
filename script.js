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