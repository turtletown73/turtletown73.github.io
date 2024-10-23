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
  for (let item of document.getElementsByClassName("game-hidden")) {
    item.style.display = "inline-block";
  }
}