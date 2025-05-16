const ruta_JSON = "./data/db.json";

document.addEventListener("DOMContentLoaded", () => {
  console.log("Documento cargado - encuentros.js");
  
  // Agregar atributos completos a los personajes desde el archivo db.json
  fetch("/data/db.json")
    .then(response => response.json())
    .then(data => {
      // Actualizar los datos de personajes DC
      const personajesDCCompletos = data.personajes.filter(p => p.universo === "DC").map(p => ({
        id: p.id,
        universo: p.universo,
        nombre: p.nombre,
        nombreClave: p.nombreClave,
        descripcion: p.descripcion,
        trajes: p.trajes,
        ataque1: p.ataque1,
        ataque2: p.ataque2,
        ataque3: p.ataque3,
        debilidad: p.debilidad,
        resistencia: p.resistencia,
        imagen: p.imagen
      }));
      
      // Actualizar los datos de personajes Marvel
      const personajesMarvelCompletos = data.personajes.filter(p => p.universo === "Marvel").map(p => ({
        id: p.id,
        universo: p.universo,
        nombre: p.nombre,
        nombreClave: p.nombreClave,
        descripcion: p.descripcion,
        trajes: p.trajes,
        ataque1: p.ataque1,
        ataque2: p.ataque2,
        ataque3: p.ataque3,
        debilidad: p.debilidad,
        resistencia: p.resistencia,
        imagen: p.imagen
      }));
      
      // Reemplazar los arrays simples por los completos
      window.personajesDC = personajesDCCompletos;
      window.personajesMarvel = personajesMarvelCompletos;
      
      console.log("Personajes cargados:", personajesDCCompletos.length + personajesMarvelCompletos.length);
    })
    .catch(error => {
      console.error("Error al cargar personajes:", error);
    });
  
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

  // Ya no necesitamos este código que redirige a peleas.html
  /*
  const btnIniciarBatalla = document.getElementById("btnIniciarBatalla");
  if (btnIniciarBatalla) {
    btnIniciarBatalla.addEventListener("click", () => {
      if (seleccion.jugador1 && seleccion.jugador2) {
        // Guardar personajes seleccionados
        localStorage.setItem("jugador1", JSON.stringify(seleccion.jugador1));
        localStorage.setItem("jugador2", JSON.stringify(seleccion.jugador2));

        // Redirigir a pelea
        window.location.href = "peleas.html";
      } else {
        alert("Por favor selecciona ambos personajes antes de comenzar la batalla.");
      }
    });
  }
  */
});

const seleccion = {
  jugador1: null,
  jugador2: null
};

function cargarTarjetas(jugadorId) {
  const contenedor = document.getElementById("tarjetas-" + jugadorId);
  if (!contenedor) {
    console.error("Contenedor no encontrado:", "tarjetas-" + jugadorId);
    return;
  }
  
  contenedor.innerHTML = "";

  // Esperar a que se carguen los datos completos
  setTimeout(() => {
    // Verificar que los arrays existan y estén definidos
    if (!window.personajesDC || !window.personajesMarvel) {
      console.error("Arrays de personajes no disponibles");
      return;
    }
    
    const todosLosPersonajes = [...window.personajesDC, ...window.personajesMarvel];
    console.log("Total de personajes:", todosLosPersonajes.length);

    todosLosPersonajes.forEach(personaje => {
      const div = document.createElement("div");
      div.classList.add("tarjeta");
      div.innerHTML = `
        <img src="${personaje.imagen}" alt="${personaje.nombre}" style="width:100%; height:70px; object-fit:cover;" onerror="this.src='/assets/img/placeholder.jpg'; console.error('Error cargando imagen:', this.src);">
        <p>${personaje.nombre}</p>
      `;
      div.addEventListener("click", () => seleccionarPersonaje(jugadorId, personaje, div));
      contenedor.appendChild(div);
    });
  }, 500); // Dar tiempo para que se carguen los personajes
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
  // Verificar que los arrays existan y estén definidos
  if (!window.personajesDC || !window.personajesMarvel) {
    console.error("Arrays de personajes no disponibles para selección aleatoria");
    return;
  }
  
  const todosLosPersonajes = [...window.personajesDC, ...window.personajesMarvel];
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
const cerrarBatalla = document.getElementById("cerrar-modal-batalla") || document.getElementById("cerrar-batalla");
const logBatalla = document.getElementById("logCombate") || document.getElementById("log-batalla");

if (cerrarBatalla) {
  cerrarBatalla.addEventListener("click", () => {
    if (modalBatalla) modalBatalla.style.display = "none";
    if (logBatalla) logBatalla.innerHTML = "";
  });
}

function verificarSeleccion() {
  if (seleccion.jugador1 && seleccion.jugador2) {
    mostrarModalBatalla();
    // Solo mostrar modal visual si existe el elemento
    if (document.getElementById("modal-batalla-visual")) {
      mostrarModalBatallaVisual();
    }
  }
}

function mostrarModalBatalla() {
  // Primero asignamos datos a los personajes y agregamos la propiedad vida
  const p1 = { ...seleccion.jugador1, vida: seleccion.jugador1.resistencia };
  const p2 = { ...seleccion.jugador2, vida: seleccion.jugador2.resistencia };
  
  // Guardamos los datos en el objeto de pelea para acceder desde funciones
  window.estadoPelea = { jugador1: p1, jugador2: p2 };
  
  // Actualizamos el contenido del modal con las cartas y barras de vida de cada jugador
  const jugador1Info = document.getElementById("jugador1-info");
  const jugador2Info = document.getElementById("jugador2-info");
  
  if (jugador1Info && jugador2Info) {
    jugador1Info.innerHTML = `
      <h3>${p1.nombre}</h3>
      <img src="${p1.imagen}" width="100">
      
      <!-- Barra de vida mejorada -->
      <div class="vida-contenedor">
        <div class="vida-etiqueta">HP: ${p1.vida}/${p1.resistencia}</div>
        <div class="vida-barra-contenedor">
          <div id="vida-barra-1" class="vida-barra-relleno" style="width: 100%;"></div>
        </div>
      </div>
      
      <button id="btn-ataque-1" class="btn-ataque">Atacar</button>
    `;
    
    jugador2Info.innerHTML = `
      <h3>${p2.nombre}</h3>
      <img src="${p2.imagen}" width="100">
      
      <!-- Barra de vida mejorada -->
      <div class="vida-contenedor">
        <div class="vida-etiqueta">HP: ${p2.vida}/${p2.resistencia}</div>
        <div class="vida-barra-contenedor">
          <div id="vida-barra-2" class="vida-barra-relleno" style="width: 100%;"></div>
        </div>
      </div>
      
      <button id="btn-ataque-2" class="btn-ataque">Atacar</button>
    `;
    
    // Mostramos el modal de batalla
    modalBatalla.style.display = "block";
    
    // Limpiamos el log de combate si existe
    if (logBatalla) {
      logBatalla.innerHTML = "";
    }
    
    // Agregamos listeners a los botones de ataque
    document.getElementById("btn-ataque-1").addEventListener("click", () => atacarEnModal('jugador1'));
    document.getElementById("btn-ataque-2").addEventListener("click", () => atacarEnModal('jugador2'));
  }
}

// Agregamos la función de ataque que se ejecutará al hacer clic en los botones
function atacarEnModal(atacante) {
  const oponente = atacante === "jugador1" ? "jugador2" : "jugador1";
  const jugadorNum = atacante === "jugador1" ? "1" : "2";
  const oponenteNum = oponente === "jugador1" ? "1" : "2";

  const atacanteDatos = window.estadoPelea[atacante];
  const oponenteDatos = window.estadoPelea[oponente];
  
  console.log(`${atacanteDatos.nombre} ataca a ${oponenteDatos.nombre}`);
  
  // Escoge un ataque aleatorio entre los tres disponibles
  const ataques = [atacanteDatos.ataque1, atacanteDatos.ataque2, atacanteDatos.ataque3];
  const daño = ataques[Math.floor(Math.random() * ataques.length)];
  
  // Restar vida al oponente
  oponenteDatos.vida -= daño;
  if (oponenteDatos.vida < 0) oponenteDatos.vida = 0;
  
  console.log(`Daño causado: ${daño}. ${oponenteDatos.nombre} queda con ${oponenteDatos.vida} de vida`);
  
  // Actualizar barra de vida visual
  const porcentaje = (oponenteDatos.vida / oponenteDatos.resistencia) * 100;
  document.getElementById(`vida-barra-${oponenteNum}`).style.width = `${porcentaje}%`;
  
  // Actualizar texto de vida
  const vidaEtiqueta = document.querySelector(`#jugador${oponenteNum}-info .vida-etiqueta`);
  if (vidaEtiqueta) {
    vidaEtiqueta.textContent = `HP: ${oponenteDatos.vida}/${oponenteDatos.resistencia}`;
  }
  
  // Agregar efecto visual de daño
  const oponenteElement = document.getElementById(`jugador${oponenteNum}-info`);
  if (oponenteElement) {
    oponenteElement.classList.add('recibe-daño');
    setTimeout(() => {
      oponenteElement.classList.remove('recibe-daño');
    }, 300);
  }
  
  // Agregar log del ataque
  if (logBatalla) {
    logBatalla.innerHTML += `<p>${atacanteDatos.nombre} ataca a ${oponenteDatos.nombre} causando ${daño} de daño.</p>`;
    logBatalla.scrollTop = logBatalla.scrollHeight;
  }
  
  // Cambiar color de la barra de vida según porcentaje
  const barraVida = document.getElementById(`vida-barra-${oponenteNum}`);
  if (barraVida) {
    if (porcentaje > 50) {
      barraVida.style.backgroundColor = "#4caf50"; // Verde
    } else if (porcentaje > 25) {
      barraVida.style.backgroundColor = "#ff9800"; // Naranja
    } else {
      barraVida.style.backgroundColor = "#f44336"; // Rojo
    }
  }
  
  // Verificar si hay un ganador
  if (oponenteDatos.vida <= 0) {
    // Deshabilitar botones de ataque
    document.getElementById(`btn-ataque-1`).disabled = true;
    document.getElementById(`btn-ataque-2`).disabled = true;
    
    // Mostrar mensaje de victoria
    if (logBatalla) {
      logBatalla.innerHTML += `<p class="victoria">¡${atacanteDatos.nombre} ha ganado la batalla!</p>`;
    }
    
    // También podemos mostrar un alert o un modal de victoria más elegante
    setTimeout(() => {
      alert(`¡${atacanteDatos.nombre} ha ganado la batalla!`);
    }, 500);
  }
}

// MODAL VISUAL (mantenemos esta función por si la necesitas)
const modalBatallaVisual = document.getElementById("modal-batalla-visual");
const contenedorVisual = document.getElementById("batalla-visual");
const cerrarVisual = document.getElementById("cerrar-batalla-visual");

if (cerrarVisual) {
  cerrarVisual.addEventListener("click", () => {
    if (modalBatallaVisual) modalBatallaVisual.style.display = "none";
  });
}

function mostrarModalBatallaVisual() {
  if (!contenedorVisual) return;
  
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