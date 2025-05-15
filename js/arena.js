// Variables globales
let personajes = [];
let jugador1 = null;
let jugador2 = null;

// Elementos DOM
const modalSeleccion = document.getElementById("modal-combate");
const modalBatalla = document.getElementById("modal-batalla");
const cerrarModalSeleccion = document.getElementById("cerrar-modal");
const cerrarModalBatalla = document.getElementById("cerrar-modal-batalla");

const tarjetasJugador1 = document.getElementById("tarjetas-jugador1");
const tarjetasJugador2 = document.getElementById("tarjetas-jugador2");

const vidaBarra1 = document.getElementById("vida-barra-1");
const vidaTexto1 = document.getElementById("vida-texto-1");
const vidaBarra2 = document.getElementById("vida-barra-2");
const vidaTexto2 = document.getElementById("vida-texto-2");

const logCombate = document.getElementById("logCombate");
const btnAtaque1 = document.getElementById("btn-ataque-1");
const btnAtaque2 = document.getElementById("btn-ataque-2");
const btnIniciarTurno = document.getElementById("btnIniciarTurno");

const imgJugador1 = document.getElementById("img-jugador1");
const imgJugador2 = document.getElementById("img-jugador2");

const cartaJugador1 = document.getElementById("carta-jugador1");
const cartaJugador2 = document.getElementById("carta-jugador2");

let turno = 1; // 1 o 2

// Carga personajes desde dc.js y marvel.js (asumiendo que cargan window.personajesDC y window.personajesMarvel)
function cargarPersonajes() {
  // Combinar personajes DC y Marvel si existen
  personajes = [];
  if (window.personajesDC) personajes = personajes.concat(window.personajesDC);
  if (window.personajesMarvel) personajes = personajes.concat(window.personajesMarvel);
}

// Mostrar tarjetas para selección manual
// function mostrarTarjetas() {
//   tarjetasJugador1.innerHTML = "";
//   tarjetasJugador2.innerHTML = "";

//   personajes.forEach((p) => {
//     const tarjeta1 = document.createElement("div");
//     tarjeta1.classList.add("tarjeta-personaje");
//     tarjeta1.innerHTML = `
//       <img src="${p.imagen}">
//       <p>${p.nombreClave}</p>
//     `;
//     tarjeta1.onclick = () => {
//       localStorage.setItem("personajeJugador1", JSON.stringify(p));
//       alert(`Jugador 1 seleccionó ${p.nombreClave}`);
//     };

//     const tarjeta2 = tarjeta1.cloneNode(true);
//     tarjeta2.onclick = () => {
//       localStorage.setItem("personajeJugador2", JSON.stringify(p));
//       alert(`Jugador 2 seleccionó ${p.nombreClave}`);
//     };

//     tarjetasJugador1.appendChild(tarjeta1);
//     tarjetasJugador2.appendChild(tarjeta2);
//   });
// }
function mostrarTarjetas() {
  tarjetasJugador1.innerHTML = "";
  tarjetasJugador2.innerHTML = "";

  personajes.forEach((p) => {
    const tarjeta1 = document.createElement("div");
    tarjeta1.classList.add("tarjeta-personaje");
    tarjeta1.innerHTML = /* HTML */ `
      <div class="imagen-contenedor">
        <img src="${p.imagen}" class="imagen-tarjeta">
      </div>
      <p>${p.nombreClave}</p>
    `;
    tarjeta1.onclick = () => {
      localStorage.setItem("personajeJugador1", JSON.stringify(p));
      alert(`Jugador 1 seleccionó ${p.nombreClave}`);
    };

    const tarjeta2 = tarjeta1.cloneNode(true);
    tarjeta2.onclick = () => {
      localStorage.setItem("personajeJugador2", JSON.stringify(p));
      alert(`Jugador 2 seleccionó ${p.nombreClave}`);
    };

    tarjetasJugador1.appendChild(tarjeta1);
    tarjetasJugador2.appendChild(tarjeta2);
  });
}


// Seleccionar personaje aleatorio para jugador 1 o 2
function seleccionarAleatorio(jugadorNum) {
  if (!personajes || personajes.length === 0) return;

  const randomIndex = Math.floor(Math.random() * personajes.length);
  const personaje = personajes[randomIndex];

  if (jugadorNum === 1) {
    localStorage.setItem("personajeJugador1", JSON.stringify(personaje));
    alert(`Jugador 1 seleccionó a ${personaje.nombreClave}`);
  } else if (jugadorNum === 2) {
    localStorage.setItem("personajeJugador2", JSON.stringify(personaje));
    alert(`Jugador 2 seleccionó a ${personaje.nombreClave}`);
  }
}

// Mostrar personajes seleccionados en el modal batalla
function mostrarCartas() {
  jugador1 = JSON.parse(localStorage.getItem("personajeJugador1"));
  jugador2 = JSON.parse(localStorage.getItem("personajeJugador2"));

  if (!jugador1 || !jugador2) {
    alert("Ambos jugadores deben seleccionar un personaje primero.");
    return;
  }

  // Mostrar cartas en modal batalla
  cartaJugador1.innerHTML = `
    <img src="${jugador1.imagen}" alt="${jugador1.nombreClave}" />
    <h3>${jugador1.nombreClave}</h3>
  `;
  cartaJugador2.innerHTML = `
    <img src="${jugador2.imagen}" alt="${jugador2.nombreClave}" />
    <h3>${jugador2.nombreClave}</h3>
  `;

  // Inicializar vida
  jugador1.vidaActual = jugador1.vidaMaxima;
  jugador2.vidaActual = jugador2.vidaMaxima;

  actualizarVida();

  logCombate.innerHTML = "";
}

// Actualizar barra y texto de vida
function actualizarVida() {
  vidaBarra1.style.width = (jugador1.vidaActual / jugador1.vidaMaxima) * 100 + "%";
  vidaTexto1.textContent = `Vida: ${jugador1.vidaActual} / ${jugador1.vidaMaxima}`;

  vidaBarra2.style.width = (jugador2.vidaActual / jugador2.vidaMaxima) * 100 + "%";
  vidaTexto2.textContent = `Vida: ${jugador2.vidaActual} / ${jugador2.vidaMaxima}`;
}

// Mostrar personajes en la pantalla principal (arena)
function mostrarEnArena() {
  imgJugador1.innerHTML = `<img src="${jugador1.imagen}" alt="${jugador1.nombreClave}" style="max-width: 100%; border-radius: 8px;" />`;
  imgJugador2.innerHTML = `<img src="${jugador2.imagen}" alt="${jugador2.nombreClave}" style="max-width: 100%; border-radius: 8px;" />`;
}

// Iniciar batalla (habilitar botones y mostrar modal batalla)
function iniciarBatalla() {
  mostrarCartas();
  mostrarEnArena();
  modalSeleccion.style.display = "none";
  modalBatalla.style.display = "block";
  btnAtaque1.disabled = false;
  btnAtaque2.disabled = false;
  btnIniciarTurno.disabled = true;
  turno = 1;
  logCombate.innerHTML = `<p>Turno del Jugador 1</p>`;
}

// Función para manejar ataque de un jugador
function atacar(atacanteNum) {
  if ((atacanteNum === 1 && turno !== 1) || (atacanteNum === 2 && turno !== 2)) {
    alert("No es tu turno");
    return;
  }

  const atacante = atacanteNum === 1 ? jugador1 : jugador2;
  const defensor = atacanteNum === 1 ? jugador2 : jugador1;

  // Calcular daño aleatorio entre 5 y 20
  const daño = Math.floor(Math.random() * 16) + 5;
  defensor.vidaActual -= daño;
  if (defensor.vidaActual < 0) defensor.vidaActual = 0;

  logCombate.innerHTML += `<p>Jugador ${atacanteNum} (${atacante.nombreClave}) ataca y causa ${daño} de daño.</p>`;
  actualizarVida();

  // Revisar si el defensor perdió
  if (defensor.vidaActual === 0) {
    logCombate.innerHTML += `<p>¡Jugador ${atacanteNum} gana la batalla!</p>`;
    btnAtaque1.disabled = true;
    btnAtaque2.disabled = true;
    return;
  }

  // Cambiar turno
  turno = turno === 1 ? 2 : 1;
  logCombate.innerHTML += `<p>Turno del Jugador ${turno}</p>`;
}

// Eventos cerrar modales
cerrarModalSeleccion.onclick = () => {
  modalSeleccion.style.display = "none";
};

cerrarModalBatalla.onclick = () => {
  modalBatalla.style.display = "none";
};

// Eventos botones ataque
btnAtaque1.onclick = () => atacar(1);
btnAtaque2.onclick = () => atacar(2);

// Evento iniciar batalla
btnIniciarTurno.onclick = iniciarBatalla;

// Al cargar la página
window.onload = () => {
  cargarPersonajes();
  mostrarTarjetas();
  modalSeleccion.style.display = "block";
};

