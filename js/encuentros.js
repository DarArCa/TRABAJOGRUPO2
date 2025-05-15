const ruta_JSON = "./data/db.json"

document.addEventListener("DOMContentLoaded", () => {
  const pelea1 = document.querySelector(".pelea"); // Solo la primera pelea
  const modal = document.getElementById("modal-combate");
  const cerrar = document.getElementById("cerrar-modal");

  pelea1.addEventListener("click", () => {
    modal.style.display = "block";
    cargarTarjetas("jugador1");
    cargarTarjetas("jugador2");
  });

  cerrar.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
});

const seleccion = {
  jugador1: null,
  jugador2: null
};

function cargarTarjetas(jugadorId) {
  const contenedor = document.getElementById("tarjetas-" + jugadorId);
  contenedor.innerHTML = "";

  // Combinar personajes DC y Marvel
  const todosLosPersonajes = [...personajesDC, ...personajesMarvel];

  todosLosPersonajes.forEach(personaje => {
    const div = document.createElement("div");
    div.classList.add("tarjeta");
    div.innerHTML = `
      <img src="${personaje.imagen}" alt="${personaje.nombre}" style="width:100%; height:70px; object-fit:cover;">
      <p>${personaje.nombre}</p>
    `;
    div.addEventListener("click", () => seleccionarPersonaje(jugadorId, personaje, div));
    contenedor.appendChild(div);
  });
}

function seleccionarPersonaje(jugadorId, personaje, divSeleccionado) {
  seleccion[jugadorId] = personaje;
  console.log(`Seleccionado para ${jugadorId}:`, personaje);

  // Eliminar clase seleccionada de todas las tarjetas del jugador
  const tarjetas = document.querySelectorAll(`#tarjetas-${jugadorId} .tarjeta`);
  tarjetas.forEach(t => t.classList.remove("seleccionada"));

  // Marcar la tarjeta seleccionada
  divSeleccionado.classList.add("seleccionada");
}
