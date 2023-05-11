var countdownInterval; // Variable para almacenar el intervalo del contador

function countdown() {
  var timeLeft, hours, minutes, seconds;
  var endTime = new Date();
  var endHour = document.getElementById('end-time').value;
  var endHourSplit = endHour.split(':');
  var endHourValue = parseInt(endHourSplit[0]);
  var endMinuteValue = parseInt(endHourSplit[1]);
  var endSecondValue = parseInt(endHourSplit[2]);
  endTime.setHours(endHourValue);
  endTime.setMinutes(endMinuteValue);
  endTime.setSeconds(endSecondValue);

  if (isNaN(endTime.getTime())) {
    var duration = document.getElementById('duration').value;
    var time = duration.split(':');
    hours = parseInt(time[0]);
    minutes = parseInt(time[1]);
    seconds = parseInt(time[2]);
    timeLeft = hours * 3600 + minutes * 60 + seconds;
    endTime = new Date().getTime() + (timeLeft * 1000);
  } else {
    endTime = endTime.getTime();
  }

  countdownInterval = setInterval(function() {
    var now = new Date().getTime();
    var distance = endTime - now;

    if (distance > 0) {
      hours = Math.floor(distance / (1000 * 60 * 60));
      minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      seconds = Math.floor((distance % (1000 * 60)) / 1000) + 2;
    } else {
      clearInterval(countdownInterval);
      document.getElementById("countdown").innerHTML = "TEMPS ACABAT";
      document.getElementById("sound").play();
      togglePauseButton(false); // Ocultar el botón de pausa
      return;
    }

    document.getElementById("countdown").innerHTML = hours + "h " + minutes + "m " + seconds + "s ";
  }, 1000);

  togglePauseButton(true); // Mostrar el botón de pausa
}

function pauseCountdown() {
  clearInterval(countdownInterval); // Pausar el contador
  document.getElementById("countdown").innerHTML = ""; // Eliminar la cuenta regresiva
  togglePauseButton(false); // Ocultar el botón de pausa
}

function togglePauseButton(show) {
  var pauseButton = document.getElementById("pause-button");
  if (show) {
    pauseButton.style.display = "inline"; // Mostrar el botón de pausa
  } else {
    pauseButton.style.display = "none"; // Ocultar el botón de pausa
  }
}
