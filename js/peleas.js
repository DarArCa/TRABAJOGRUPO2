document.addEventListener("DOMContentLoaded", () => {
  console.log("Página de peleas cargada");
  
  try {
    // Obtener datos de los peleadores desde localStorage
    const peleadoresJSON = localStorage.getItem("peleadores");
    console.log("Datos recuperados:", peleadoresJSON);
    
    if (!peleadoresJSON) {
      console.error("No se encontraron datos de peleadores en localStorage");
      return;
    }
    
    const datos = JSON.parse(peleadoresJSON);
    console.log("Datos parseados:", datos);
    
    if (!datos || !datos.jugador1 || !datos.jugador2) {
      console.error("Datos de peleadores incompletos", datos);
      return;
    }

    const { jugador1, jugador2 } = datos;
    console.log("Jugador 1:", jugador1);
    console.log("Jugador 2:", jugador2);

    // Inicializar vida
    jugador1.vida = jugador1.resistencia;
    jugador2.vida = jugador2.resistencia;

    window.estadoPelea = { jugador1, jugador2 };

    // Jugador 1
    document.getElementById("nombre-j1").textContent = jugador1.nombre;
    document.getElementById("imagen-j1").src = jugador1.imagen;
    document.getElementById("vida-texto-j1").textContent = `Vida: ${jugador1.vida} / ${jugador1.resistencia}`;
    document.getElementById("vida-barra-j1").style.width = "100%";

    // Jugador 2
    document.getElementById("nombre-j2").textContent = jugador2.nombre;
    document.getElementById("imagen-j2").src = jugador2.imagen;
    document.getElementById("vida-texto-j2").textContent = `Vida: ${jugador2.vida} / ${jugador2.resistencia}`;
    document.getElementById("vida-barra-j2").style.width = "100%";
  } catch (error) {
    console.error("Error al inicializar la pelea:", error);
  }
});

function atacar(atacante) {
  try {
    const oponente = atacante === "jugador1" ? "jugador2" : "jugador1";

    const atacanteDatos = window.estadoPelea[atacante];
    const oponenteDatos = window.estadoPelea[oponente];

    console.log(`${atacanteDatos.nombre} ataca a ${oponenteDatos.nombre}`);

    // Escoge un ataque aleatorio
    const ataques = [atacanteDatos.ataque1, atacanteDatos.ataque2, atacanteDatos.ataque3];
    const daño = ataques[Math.floor(Math.random() * ataques.length)];
    console.log(`Daño causado: ${daño}`);

    // Restar vida
    oponenteDatos.vida -= daño;
    if (oponenteDatos.vida < 0) oponenteDatos.vida = 0;

    console.log(`${oponenteDatos.nombre} queda con ${oponenteDatos.vida} de vida`);

    // Actualizar barra
    const porcentaje = (oponenteDatos.vida / oponenteDatos.resistencia) * 100;
    document.getElementById(`vida-barra-${oponente === "jugador1" ? "j1" : "j2"}`).style.width = `${porcentaje}%`;
    document.getElementById(`vida-texto-${oponente === "jugador1" ? "j1" : "j2"}`).textContent =
      `Vida: ${oponenteDatos.vida} / ${oponenteDatos.resistencia}`;

    // Ganador
    if (oponenteDatos.vida <= 0) {
      console.log(`${atacanteDatos.nombre} ha ganado la batalla`);
      const modalVictoria = document.getElementById("modalVictoria");
      if (modalVictoria) {
        const ganadorTexto = document.getElementById("ganadorTexto");
        if (ganadorTexto) ganadorTexto.textContent = `¡${atacanteDatos.nombre} ha ganado la batalla!`;
        modalVictoria.style.display = "flex";
      } else {
        alert(`${atacanteDatos.nombre} ha ganado la batalla.`);
      }
    }
  } catch (error) {
    console.error("Error durante el ataque:", error);
  }
}

function cerrarModal() {
  const modalVictoria = document.getElementById("modalVictoria");
  if (modalVictoria) modalVictoria.style.display = "none";
  window.location.href = "arena.html";
}