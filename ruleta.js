document.addEventListener("DOMContentLoaded", function() {
  var nameList = [];
  var currentIndex = 0;
  var timerId;
  var spinning = false;
  var audioFinal=new Audio ("./multimedia/finalRuleta.mp3");
  var audioGirito=new Audio("./multimedia/ruletaGiro.mp3");

  // Leer el archivo de nombres
  fetch("./multimedia/noms.txt")
    .then(response => response.text())
    .then(data => {
      nameList = data.split("\n");
      displayNames();
    });

  // Mostrar los nombres en la lista
  function displayNames() {
    var nameListElement = document.getElementById("name-list");
    nameListElement.innerHTML = "";

    var angleIncrement = (2 * Math.PI) / nameList.length;
    var rotationAngle = -Math.PI / 2;

    nameList.forEach(function(name) {
      var li = document.createElement("li");
      li.textContent = name;

      // Calcular la posición de cada nombre
      var radius = 200;
      var x = Math.cos(rotationAngle) * radius + 250;
      var y = Math.sin(rotationAngle) * radius + 250;
      li.style.left = x + "px";
      li.style.top = y + "px";

      // Calcular la rotación del texto
      var textRotation = Math.atan2(y - 250, x - 250);
      li.style.transform = "rotate(" + textRotation + "rad)";

      nameListElement.appendChild(li);

      rotationAngle += angleIncrement;
    });
  }

  // Función para girar la ruleta
  function spinRoulette() {
    if (spinning) {
      return;
    }

    var spinButton = document.getElementById("spin-button");
    spinButton.disabled = true;

    var resultElement = document.getElementById("result");
    resultElement.textContent = "";

    var spinCount = Math.floor(Math.random() * 10) + 20; // Número de giros aleatorios
    var spinDuration = 4000; // Duración total del giro (en milisegundos)

    var currentSpin = 0;
    var rotationAngle = 0;
    var rotationIncrement = (0 * Math.PI) / nameList.length;

    spinning = true;
    audioGirito.play();

    timerId = setInterval(function() {
      var currentIndexElement = document.getElementById("name-list").children[currentIndex];
      currentIndexElement.classList.remove("current");

      rotationAngle += rotationIncrement;
      document.getElementById("name-list").style.transform = "rotate(" + rotationAngle + "rad)";

      currentIndex = (currentIndex + 1) % nameList.length;

      var newIndexElement = document.getElementById("name-list").children[currentIndex];
      newIndexElement.classList.add("current");

      currentSpin++;
      if (currentSpin === spinCount) {
        clearInterval(timerId);
        spinButton.disabled = false;
        var result = nameList[currentIndex];
        resultElement.textContent = nameList[currentIndex];
        spinning = false;
        audioGirito.pause();
        audioFinal.play();
      }
    }, spinDuration / spinCount);
  }

  // Event listener para el botón de girar
  var spinButton = document.getElementById("spin-button");
  spinButton.addEventListener("click", spinRoulette);

});


