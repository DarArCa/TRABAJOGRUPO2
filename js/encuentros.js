const ruta_JSON = "./data/db.json";

document.addEventListener("DOMContentLoaded", () => {
  const pelea1 = document.querySelector(".pelea");
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
    if (e.target === modalBatalla) {
      modalBatalla.style.display = "none";
      logBatalla.innerHTML = "";
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

  const tarjetas = document.querySelectorAll(`#tarjetas-${jugadorId} .tarjeta`);
  tarjetas.forEach(t => t.classList.remove("seleccionada"));

  divSeleccionado.classList.add("seleccionada");

  verificarSeleccion();
}

// ✅ Función de selección aleatoria
function seleccionarAleatorio(jugadorNum) {
  const todosLosPersonajes = [...personajesDC, ...personajesMarvel];
  const personajeAleatorio = todosLosPersonajes[Math.floor(Math.random() * todosLosPersonajes.length)];
  const jugadorId = `jugador${jugadorNum}`;
  seleccion[jugadorId] = personajeAleatorio;
  console.log(`Selección aleatoria para ${jugadorId}:`, personajeAleatorio);

  // Resaltar tarjeta seleccionada
  const tarjetas = document.querySelectorAll(`#tarjetas-${jugadorId} .tarjeta`);
  tarjetas.forEach(t => {
    const nombre = t.querySelector("p").textContent;
    if (nombre === personajeAleatorio.nombre) {
      t.classList.add("seleccionada");
    } else {
      t.classList.remove("seleccionada");
    }
  });

  verificarSeleccion();
}

// MODAL DE BATALLA
const modalBatalla = document.getElementById("modal-batalla");
const cerrarBatalla = document.getElementById("cerrar-batalla");
const btnIniciarTurno = document.getElementById("iniciar-turno");
const logBatalla = document.getElementById("log-batalla");

cerrarBatalla.addEventListener("click", () => {
  modalBatalla.style.display = "none";
  logBatalla.innerHTML = "";
});

function verificarSeleccion() {
  if (seleccion.jugador1 && seleccion.jugador2) {
    mostrarModalBatalla();
  }
}

function mostrarModalBatalla() {
  document.getElementById("jugador1-info").innerHTML = `
    <h3>${seleccion.jugador1.nombre}</h3>
    <img src="${seleccion.jugador1.imagen}" width="100">
  `;
  document.getElementById("jugador2-info").innerHTML = `
    <h3>${seleccion.jugador2.nombre}</h3>
    <img src="${seleccion.jugador2.imagen}" width="100">
  `;
  modalBatalla.style.display = "block";
}

function batallaPorTurnos() {
  const p1 = { ...seleccion.jugador1, vida: 100 };
  const p2 = { ...seleccion.jugador2, vida: 100 };
  let turno = 0;
  logBatalla.innerHTML = "";

  const intervalo = setInterval(() => {
    if (p1.vida <= 0 || p2.vida <= 0) {
      const ganador = p1.vida <= 0 ? p2.nombre : p1.nombre;
      logBatalla.innerHTML += `<p><strong>¡${ganador} gana!</strong></p>`;
      clearInterval(intervalo);
      return;
    }

    const atacante = turno % 2 === 0 ? p1 : p2;
    const defensor = turno % 2 === 0 ? p2 : p1;
    const daño = Math.floor(Math.random() * 20) + 5;

    defensor.vida -= daño;
    logBatalla.innerHTML += `<p>${atacante.nombre} ataca a ${defensor.nombre} y causa ${daño} de daño. Vida de ${defensor.nombre}: ${defensor.vida}</p>`;
    logBatalla.scrollTop = logBatalla.scrollHeight;
    turno++;
  }, 1000);
}

btnIniciarTurno.addEventListener("click", batallaPorTurnos);
