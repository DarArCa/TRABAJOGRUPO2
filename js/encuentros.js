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
    if (e.target === modalBatallaVisual) {
      modalBatallaVisual.style.display = "none";
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

function seleccionarAleatorio(jugadorNum) {
  const todosLosPersonajes = [...personajesDC, ...personajesMarvel];
  const personajeAleatorio = todosLosPersonajes[Math.floor(Math.random() * todosLosPersonajes.length)];
  const jugadorId = `jugador${jugadorNum}`;
  seleccion[jugadorId] = personajeAleatorio;
  console.log(`Selección aleatoria para ${jugadorId}:`, personajeAleatorio);

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

// MODAL DE BATALLA POR TEXTO
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
    mostrarModalBatallaVisual();
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

// 🎯 NUEVO MODAL VISUAL
const modalBatallaVisual = document.getElementById("modal-batalla-visual");
const contenedorVisual = document.getElementById("batalla-visual");
const cerrarVisual = document.getElementById("cerrar-batalla-visual");

cerrarVisual.addEventListener("click", () => {
  modalBatallaVisual.style.display = "none";
});

function mostrarModalBatallaVisual() {
  const p1 = { ...seleccion.jugador1, vida: seleccion.jugador1.resistencia };
  const p2 = { ...seleccion.jugador2, vida: seleccion.jugador2.resistencia };

  contenedorVisual.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; padding: 30px;">
      <!-- Jugador 1 -->
      <div style="text-align: center;">
        <h3>${p1.nombre}</h3>
        <img src="${p1.imagen}" width="150">
        <div style="margin: 10px 0;">
          <div style="width: 150px; height: 20px; background: #ddd;">
            <div id="vida-p1" style="width: 100%; height: 100%; background: green;"></div>
          </div>
          <p id="vida-p1-text">${p1.vida} HP</p>
        </div>
        <button id="btn-atacar" style="padding: 10px 20px;">Atacar</button>
      </div>

      <!-- Jugador 2 -->
      <div style="text-align: center;">
        <h3>${p2.nombre}</h3>
        <img src="${p2.imagen}" width="150">
        <div style="margin: 10px 0;">
          <div style="width: 150px; height: 20px; background: #ddd;">
            <div id="vida-p2" style="width: 100%; height: 100%; background: red;"></div>
          </div>
          <p id="vida-p2-text">${p2.vida} HP</p>
        </div>
      </div>
    </div>
  `;

  modalBatallaVisual.style.display = "block";

  document.getElementById("btn-atacar").addEventListener("click", () => {
    const ataques = [p1.ataque1, p1.ataque2, p1.ataque3];
    const daño = ataques[Math.floor(Math.random() * ataques.length)];

    p2.vida -= daño;
    if (p2.vida < 0) p2.vida = 0;

    document.getElementById("vida-p2").style.width = `${(p2.vida / seleccion.jugador2.resistencia) * 100}%`;
    document.getElementById("vida-p2-text").textContent = `${p2.vida} HP`;

    if (p2.vida <= 0) {
      alert(`${p1.nombre} ha ganado la batalla visual!`);
      document.getElementById("btn-atacar").disabled = true;
    }
  });

}

document.addEventListener("DOMContentLoaded", () => {
  // ... tu código existente ...

  const btnIniciarBatalla = document.getElementById("btnIniciarBatalla");

  btnIniciarBatalla.addEventListener("click", () => {
    if (seleccion.jugador1 && seleccion.jugador2) {
      // Guardar personajes seleccionados en localStorage
      localStorage.setItem("jugador1", JSON.stringify(seleccion.jugador1));
      localStorage.setItem("jugador2", JSON.stringify(seleccion.jugador2));

      // Redirigir a la página de pelea
      window.location.href = "peleas.html";
    } else {
      alert("Por favor selecciona ambos personajes antes de comenzar la batalla.");
    }
  });

  // ... resto de tu código ...
});
