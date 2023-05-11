// Obtiene una referencia al botón de modo oscuro
var button = document.getElementById("my-button");

// Agrega un controlador de eventos al botón para cambiar el modo oscuro
button.addEventListener("click", function() {
  // Obtiene una referencia al elemento <body>
  var body = document.body;

  // Alterna la clase "dark-mode" en el elemento <body>
  body.classList.toggle("dark-mode");

  // Cambia el icono del botón según el modo oscuro activado o desactivado
  var icon = button.innerHTML;
  if (icon === "☾") {
    button.innerHTML = "☼";
  } else {
    button.innerHTML = "☾";
  }
});
