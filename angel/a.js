// modelo de personaje
class Personaje {
    constructor(nombre, ataque, defensa, vida, resistencia, gifAtaque) {
        this.nombre = nombre;
        this.ataque = ataque;
        this.defensa = defensa;
        // mirar bien lo de la resistencia porque se confunde con la defensa
        this.resistencia = resistencia;
        this.vida = vida;
        this.maxVida = vida;
        this.gifAtaque = gifAtaque;
    }

    recibirDaño(daño) {
        const dañoReal = Math.max(0, daño - this.defensa);
        this.vida = Math.max(0, this.vida - dañoReal);
        return dañoReal;
    }

    estaVivo() {
        return this.vida > 0;
    }
}

// parte 2, iniciar combate
const p1 = new Personaje("Batman", 30, 10, 100, "batman-punch.gif");
const p2 = new Personaje("Thanos", 25, 5, 100, "thanos-blast.gif");
let modoJuego = "PvP"; // PvP, PvE, AI

let turnoJugador = 1;


// parte 3, sistema de turnos 
function atacar(atacante, defensor, gifContainerId, vidaBarId) {
    const daño = defensor.recibirDaño(atacante.ataque);
    console.log(`${atacante.nombre} hizo ${daño} de daño a ${defensor.nombre}`);

    // Mostrar gif
    const gifCont = document.getElementById(gifContainerId);
    gifCont.innerHTML = `<img src="assets/gifs/${atacante.gifAtaque}" alt="ataque">`;

    // Actualizar barra de vida
    const vidaPorcentaje = (defensor.vida / defensor.maxVida) * 100;
    document.getElementById(vidaBarId).style.width = `${vidaPorcentaje}%`;

    // Verificar si terminó el juego
    if (!defensor.estaVivo()) {
        setTimeout(() => mostrarGanador(atacante.nombre), 1000);
    }
    }

// parte 3.1, logica de turnos con los eventos 
document.getElementById("attackBtn").addEventListener("click", () => {
    if (modoJuego === "PvP") {
        if (turnoJugador === 1) {
        atacar(p1, p2, "gif1", "life2");
        turnoJugador = 2;
        } else {
        atacar(p2, p1, "gif2", "life1");
        turnoJugador = 1;
        }
    } else if (modoJuego === "PvE") {
        atacar(p1, p2, "gif1", "life2");
        setTimeout(() => {
        if (p2.estaVivo()) atacar(p2, p1, "gif2", "life1");
        }, 1000);
    } else if (modoJuego === "AI") {
        if (turnoJugador === 1) {
        atacar(p1, p2, "gif1", "life2");
        turnoJugador = 2;
        } else {
        atacar(p2, p1, "gif2", "life1");
        turnoJugador = 1;
        }

        if (p1.estaVivo() && p2.estaVivo()) {
        setTimeout(() => document.getElementById("attackBtn").click(), 1500);
        }
    }
});


// ventana emergente de victoria 
function mostrarGanador(nombreGanador) {
    const overlay = document.createElement("div");
    overlay.className = "overlay-ganador";
    overlay.innerHTML = `
        <p>¡${nombreGanador} ha ganado!</p>
        <img src="../assets/img/${nombreGanador}.jpg" alt="${nombreGanador}">
        <button onclick="location.reload()">Reiniciar</button>
    `;
    document.body.appendChild(overlay);
}


