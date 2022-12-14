canvas.onclick = function() {
  canvas.requestPointerLock();
}

const dog = document.getElementById('dogimage');

document.addEventListener(function(event) {
  if (event.keyCode == 87) {
    alert('w was pressed');
    dog.style.bottom += 15;
  }
})
