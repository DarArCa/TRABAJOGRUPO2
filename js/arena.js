// // arena.js - Sistema de combate para la arena de superhéroes

// // Cargar los datos de los personajes
// let personajes = [];
// let jugador1 = null;
// let jugador2 = null;
// let turnoJugador1 = true;
// let modoJuego = "pvp"; // Valores posibles: "pvp", "pvc", "cvc"
// let juegoEnCurso = false;
// let intervalIA = null;

// // Cargar los datos de los personajes desde el JSON
// function cargarPersonajes() {
//   fetch('../data/db.json')
//     .then(response => response.json())
//     .then(data => {
//       personajes = data.personajes;
//       inicializarSeleccionPersonajes();
//     })
//     .catch(error => {
//       console.error('Error cargando los personajes:', error);
//       // Usar los datos proporcionados como fallback
//       personajes = {
//         "personajes": [
//           {
//             "id": 1,
//             "universo": "Marvel",
//             "nombre": "Tony Stark",
//             "nombreClave": "Iron Man",
//             "descripcion": "Genio millonario con una armadura de alta tecnología.",
//             "trajes": ["Mark I", "Mark XLII", "Endgame"],
//             "ataque1": 27,
//             "ataque2": 20,
//             "ataque3": 30,
//             "debilidad": "Dependencia tecnológica",
//             "resistencia": 70,
//             "imagen": "../assets/img/iron_man.jpg",
//             "gifAtaque": "./assets/video/ironman-attack.gif"
//           },
//           // ... (resto de personajes)
//         ]
//       }.personajes;
//       inicializarSeleccionPersonajes();
//     });
// }

// // Inicializar la selección de personajes
// function inicializarSeleccionPersonajes() {
//   const seleccionJ1 = document.getElementById('seleccion-j1');
//   const seleccionJ2 = document.getElementById('seleccion-j2');
  
//   // Limpiar selecciones previas
//   seleccionJ1.innerHTML = '';
//   seleccionJ2.innerHTML = '';
  
//   // Añadir opción por defecto
//   const defaultOption1 = document.createElement('option');
//   defaultOption1.value = '';
//   defaultOption1.textContent = 'Selecciona un personaje';
//   seleccionJ1.appendChild(defaultOption1);
  
//   const defaultOption2 = document.createElement('option');
//   defaultOption2.value = '';
//   defaultOption2.textContent = 'Selecciona un personaje';
//   seleccionJ2.appendChild(defaultOption2);
  
//   // Añadir personajes a las listas desplegables
//   personajes.forEach(personaje => {
//     const option1 = document.createElement('option');
//     option1.value = personaje.id;
//     option1.textContent = `${personaje.nombreClave} (${personaje.universo})`;
//     seleccionJ1.appendChild(option1);
    
//     const option2 = document.createElement('option');
//     option2.value = personaje.id;
//     option2.textContent = `${personaje.nombreClave} (${personaje.universo})`;
//     seleccionJ2.appendChild(option2);
//   });
  
//   // Añadir event listeners para cambios en la selección
//   seleccionJ1.addEventListener('change', actualizarPersonajeSeleccionado);
//   seleccionJ2.addEventListener('change', actualizarPersonajeSeleccionado);
  
//   // Inicializar modo de juego
//   document.getElementById('modo-juego').addEventListener('change', cambiarModoJuego);
// }

// // Actualizar personaje seleccionado
// function actualizarPersonajeSeleccionado() {
//   const seleccionJ1 = document.getElementById('seleccion-j1');
//   const seleccionJ2 = document.getElementById('seleccion-j2');
//   const infoJ1 = document.getElementById('info-j1');
//   const infoJ2 = document.getElementById('info-j2');
  
//   // Actualizar jugador 1
//   if (seleccionJ1.value) {
//     jugador1 = personajes.find(p => p.id == seleccionJ1.value);
//     if (jugador1) {
//       infoJ1.innerHTML = `
//         <div class="personaje-preview">
//           <img src="${jugador1.imagen}" alt="${jugador1.nombreClave}">
//           <h3>${jugador1.nombreClave}</h3>
//           <div class="stats">
//             <div class="stat">
//               <span class="stat-label">Resistencia:</span>
//               <span class="stat-value">${jugador1.resistencia}</span>
//             </div>
//             <div class="stat">
//               <span class="stat-label">Ataque 1:</span>
//               <span class="stat-value">${jugador1.ataque1}</span>
//             </div>
//             <div class="stat">
//               <span class="stat-label">Ataque 2:</span>
//               <span class="stat-value">${jugador1.ataque2}</span>
//             </div>
//             <div class="stat">
//               <span class="stat-label">Ataque 3:</span>
//               <span class="stat-value">${jugador1.ataque3}</span>
//             </div>
//           </div>
//         </div>
//       `;
//     }
//   } else {
//     jugador1 = null;
//     infoJ1.innerHTML = '';
//   }
  
//   // Actualizar jugador 2
//   if (seleccionJ2.value) {
//     jugador2 = personajes.find(p => p.id == seleccionJ2.value);
//     if (jugador2) {
//       infoJ2.innerHTML = `
//         <div class="personaje-preview">
//           <img src="${jugador2.imagen}" alt="${jugador2.nombreClave}">
//           <h3>${jugador2.nombreClave}</h3>
//           <div class="stats">
//             <div class="stat">
//               <span class="stat-label">Resistencia:</span>
//               <span class="stat-value">${jugador2.resistencia}</span>
//             </div>
//             <div class="stat">
//               <span class="stat-label">Ataque 1:</span>
//               <span class="stat-value">${jugador2.ataque1}</span>
//             </div>
//             <div class="stat">
//               <span class="stat-label">Ataque 2:</span>
//               <span class="stat-value">${jugador2.ataque2}</span>
//             </div>
//             <div class="stat">
//               <span class="stat-label">Ataque 3:</span>
//               <span class="stat-value">${jugador2.ataque3}</span>
//             </div>
//           </div>
//         </div>
//       `;
//     }
//   } else {
//     jugador2 = null;
//     infoJ2.innerHTML = '';
//   }
  
//   // Habilitar/deshabilitar botón de inicio
//   const btnIniciar = document.getElementById('btn-iniciar');
//   btnIniciar.disabled = !(jugador1 && jugador2);
// }

// // Cambiar modo de juego
// function cambiarModoJuego() {
//   modoJuego = document.getElementById('modo-juego').value;
  
//   // Actualizar interfaz según el modo de juego
//   const seleccionJ1 = document.getElementById('seleccion-j1');
//   const seleccionJ2 = document.getElementById('seleccion-j2');
  
//   if (modoJuego === "pvc") {
//     seleccionJ1.disabled = false;
//     seleccionJ2.disabled = true;
//     // Seleccionar un personaje aleatorio para la máquina
//     const randomId = Math.floor(Math.random() * personajes.length) + 1;
//     seleccionJ2.value = randomId;
//     actualizarPersonajeSeleccionado();
//   } else if (modoJuego === "cvc") {
//     seleccionJ1.disabled = true;
//     seleccionJ2.disabled = true;
//     // Seleccionar personajes aleatorios para ambos
//     const randomId1 = Math.floor(Math.random() * personajes.length) + 1;
//     const randomId2 = Math.floor(Math.random() * personajes.length) + 1;
//     seleccionJ1.value = randomId1;
//     seleccionJ2.value = randomId2;
//     actualizarPersonajeSeleccionado();
//   } else { // pvp
//     seleccionJ1.disabled = false;
//     seleccionJ2.disabled = false;
//   }
// }

// // Iniciar combate
// function iniciarCombate() {
//   if (!jugador1 || !jugador2) return;
  
//   juegoEnCurso = true;
  
//   // Ocultar sección de selección y mostrar arena
//   document.getElementById('seleccion-personajes').style.display = 'none';
//   document.getElementById('arena-combate').style.display = 'flex';
  
//   // Inicializar vida de los personajes
//   jugador1.vidaActual = jugador1.resistencia;
//   jugador2.vidaActual = jugador2.resistencia;
  
//   // Configurar la arena
//   document.getElementById('j1-nombre').textContent = jugador1.nombreClave;
//   document.getElementById('j2-nombre').textContent = jugador2.nombreClave;
//   document.getElementById('j1-imagen').src = jugador1.imagen;
//   document.getElementById('j2-imagen').src = jugador2.imagen;
  
//   // Configurar barras de vida
//   actualizarBarrasVida();
  
//   // Configurar botones de ataque
//   const botonesAtaque = document.getElementById('botones-ataque');
//   botonesAtaque.innerHTML = `
//     <button id="ataque1" class="btn-ataque">Ataque 1 (${jugador1.ataque1})</button>
//     <button id="ataque2" class="btn-ataque">Ataque 2 (${jugador1.ataque2})</button>
//     <button id="ataque3" class="btn-ataque">Ataque 3 (${jugador1.ataque3})</button>
//   `;
  
//   document.getElementById('ataque1').addEventListener('click', () => realizarAtaque(1));
//   document.getElementById('ataque2').addEventListener('click', () => realizarAtaque(2));
//   document.getElementById('ataque3').addEventListener('click', () => realizarAtaque(3));
  
//   // Configurar indicador de turno
//   actualizarIndicadorTurno();
  
//   // Si es modo CVC, iniciar la IA para ambos jugadores
//   if (modoJuego === "cvc") {
//     deshabilitarBotonesAtaque();
//     intervalIA = setInterval(turnoIA, 2000);
//   }
//   // Si es modo PVC y es turno de la máquina, iniciar la IA
//   else if (modoJuego === "pvc" && !turnoJugador1) {
//     deshabilitarBotonesAtaque();
//     setTimeout(turnoIA, 1000);
//   }
// }

// // Actualizar barras de vida
// function actualizarBarrasVida() {
//   const barraJ1 = document.getElementById('j1-barra-vida');
//   const barraJ2 = document.getElementById('j2-barra-vida');
//   const vidaJ1Text = document.getElementById('j1-vida-texto');
//   const vidaJ2Text = document.getElementById('j2-vida-texto');
  
//   const porcentajeJ1 = (jugador1.vidaActual / jugador1.resistencia) * 100;
//   const porcentajeJ2 = (jugador2.vidaActual / jugador2.resistencia) * 100;
  
//   barraJ1.style.width = `${porcentajeJ1}%`;
//   barraJ2.style.width = `${porcentajeJ2}%`;
  
//   vidaJ1Text.textContent = `${jugador1.vidaActual}/${jugador1.resistencia}`;
//   vidaJ2Text.textContent = `${jugador2.vidaActual}/${jugador2.resistencia}`;
  
//   // Cambiar color de la barra según la vida restante
//   if (porcentajeJ1 > 50) {
//     barraJ1.style.backgroundColor = '#4CAF50'; // Verde
//   } else if (porcentajeJ1 > 25) {
//     barraJ1.style.backgroundColor = '#FFC107'; // Amarillo
//   } else {
//     barraJ1.style.backgroundColor = '#F44336'; // Rojo
//   }
  
//   if (porcentajeJ2 > 50) {
//     barraJ2.style.backgroundColor = '#4CAF50'; // Verde
//   } else if (porcentajeJ2 > 25) {
//     barraJ2.style.backgroundColor = '#FFC107'; // Amarillo
//   } else {
//     barraJ2.style.backgroundColor = '#F44336'; // Rojo
//   }
// }

// // Actualizar indicador de turno
// function actualizarIndicadorTurno() {
//   const indicadorJ1 = document.getElementById('j1-turno');
//   const indicadorJ2 = document.getElementById('j2-turno');
  
//   if (turnoJugador1) {
//     indicadorJ1.style.display = 'block';
//     indicadorJ2.style.display = 'none';
    
//     // En modo PVP o PVC (si es jugador 1), habilitar botones
//     if (modoJuego === "pvp" || (modoJuego === "pvc" && turnoJugador1)) {
//       habilitarBotonesAtaque();
//     } else {
//       deshabilitarBotonesAtaque();
//     }
//   } else {
//     indicadorJ1.style.display = 'none';
//     indicadorJ2.style.display = 'block';
    
//     // En modo PVP, habilitar botones para jugador 2
//     if (modoJuego === "pvp") {
//       // Actualizar botones para mostrar ataques del jugador 2
//       const botonesAtaque = document.getElementById('botones-ataque');
//       botonesAtaque.innerHTML = `
//         <button id="ataque1" class="btn-ataque">Ataque 1 (${jugador2.ataque1})</button>
//         <button id="ataque2" class="btn-ataque">Ataque 2 (${jugador2.ataque2})</button>
//         <button id="ataque3" class="btn-ataque">Ataque 3 (${jugador2.ataque3})</button>
//       `;
      
//       document.getElementById('ataque1').addEventListener('click', () => realizarAtaque(1));
//       document.getElementById('ataque2').addEventListener('click', () => realizarAtaque(2));
//       document.getElementById('ataque3').addEventListener('click', () => realizarAtaque(3));
      
//       habilitarBotonesAtaque();
//     } else {
//       deshabilitarBotonesAtaque();
      
//       // Si es PVC y es turno de la máquina, ejecutar turno de la IA
//       if (modoJuego === "pvc" && !turnoJugador1) {
//         setTimeout(turnoIA, 1000);
//       }
//     }
//   }
// }

// // Habilitar botones de ataque
// function habilitarBotonesAtaque() {
//   const botones = document.querySelectorAll('.btn-ataque');
//   botones.forEach(btn => {
//     btn.disabled = false;
//   });
// }

// // Deshabilitar botones de ataque
// function deshabilitarBotonesAtaque() {
//   const botones = document.querySelectorAll('.btn-ataque');
//   botones.forEach(btn => {
//     btn.disabled = true;
//   });
// }

// // Realizar ataque
// function realizarAtaque(tipoAtaque) {
//   if (!juegoEnCurso) return;
  
//   // Deshabilitar botones durante la animación
//   deshabilitarBotonesAtaque();
  
//   let atacante, defensor, dañoAtaque;
  
//   if (turnoJugador1) {
//     atacante = jugador1;
//     defensor = jugador2;
//     dañoAtaque = atacante[`ataque${tipoAtaque}`];
//   } else {
//     atacante = jugador2;
//     defensor = jugador1;
//     dañoAtaque = atacante[`ataque${tipoAtaque}`];
//   }
  
//   // Mostrar GIF de ataque
//   mostrarGifAtaque(atacante.gifAtaque);
  
//   // Aplicar daño después de un breve retraso (para que se vea el GIF)
//   setTimeout(() => {
//     // Aplicar daño
//     defensor.vidaActual = Math.max(0, defensor.vidaActual - dañoAtaque);
    
//     // Actualizar barras de vida
//     actualizarBarrasVida();
    
//     // Verificar si hay un ganador
//     if (defensor.vidaActual <= 0) {
//       finalizarCombate(atacante);
//       return;
//     }
    
//     // Cambiar turno
//     turnoJugador1 = !turnoJugador1;
//     actualizarIndicadorTurno();
    
//     // Si es modo PVC y es turno de la máquina, ejecutar turno de la IA
//     if (modoJuego === "pvc" && !turnoJugador1) {
//       setTimeout(turnoIA, 1000);
//     }
//     // Si es modo CVC, no hacer nada (el intervalo se encarga)
//   }, 1500); // Esperar 1.5 segundos para que se vea el GIF
// }

// // Mostrar GIF de ataque
// function mostrarGifAtaque(gifUrl) {
//   const contenedorGif = document.getElementById('gif-ataque');
//   contenedorGif.innerHTML = `<img src="${gifUrl}" alt="Ataque">`;
//   contenedorGif.style.display = 'flex';
  
//   // Ocultar GIF después de un tiempo
//   setTimeout(() => {
//     contenedorGif.style.display = 'none';
//   }, 1500);
// }

// // Turno de la IA
// function turnoIA() {
//   if (!juegoEnCurso) return;
  
//   // Seleccionar un ataque aleatorio (1, 2 o 3)
//   const tipoAtaque = Math.floor(Math.random() * 3) + 1;
  
//   // Realizar el ataque
//   realizarAtaque(tipoAtaque);
// }

// // Finalizar combate
// function finalizarCombate(ganador) {
//   juegoEnCurso = false;
  
//   // Detener intervalo de IA si está activo
//   if (intervalIA) {
//     clearInterval(intervalIA);
//     intervalIA = null;
//   }
  
//   // Mostrar ventana emergente con el ganador
//   const modal = document.getElementById('modal-ganador');
//   const contenidoModal = document.getElementById('contenido-modal');
  
//   contenidoModal.innerHTML = `
//     <h2>¡${ganador.nombreClave} ha ganado!</h2>
//     <div class="ganador-info">
//       <img src="${ganador.imagen}" alt="${ganador.nombreClave}">
//       <div class="ganador-detalles">
//         <h3>${ganador.nombreClave}</h3>
//         <p><strong>Nombre real:</strong> ${ganador.nombre}</p>
//         <p><strong>Universo:</strong> ${ganador.universo}</p>
//         <p><strong>Descripción:</strong> ${ganador.descripcion}</p>
//         <div class="ganador-stats">
//           <div class="stat">
//             <span class="stat-label">Resistencia:</span>
//             <span class="stat-value">${ganador.resistencia}</span>
//           </div>
//           <div class="stat">
//             <span class="stat-label">Ataque 1:</span>
//             <span class="stat-value">${ganador.ataque1}</span>
//           </div>
//           <div class="stat">
//             <span class="stat-label">Ataque 2:</span>
//             <span class="stat-value">${ganador.ataque2}</span>
//           </div>
//           <div class="stat">
//             <span class="stat-label">Ataque 3:</span>
//             <span class="stat-value">${ganador.ataque3}</span>
//           </div>
//         </div>
//       </div>
//     </div>
//     <button id="btn-nuevo-combate" class="btn-principal">Nuevo Combate</button>
//   `;
  
//   modal.style.display = 'flex';
  
//   // Añadir event listener al botón de nuevo combate
//   document.getElementById('btn-nuevo-combate').addEventListener('click', reiniciarJuego);
// }

// // Reiniciar juego
// function reiniciarJuego() {
//   // Ocultar modal
//   document.getElementById('modal-ganador').style.display = 'none';
  
//   // Ocultar arena y mostrar selección de personajes
//   document.getElementById('arena-combate').style.display = 'none';
//   document.getElementById('seleccion-personajes').style.display = 'block';
  
//   // Reiniciar variables
//   jugador1 = null;
//   jugador2 = null;
//   turnoJugador1 = true;
//   juegoEnCurso = false;
  
//   // Limpiar selecciones
//   document.getElementById('seleccion-j1').value = '';
//   document.getElementById('seleccion-j2').value = '';
//   document.getElementById('info-j1').innerHTML = '';
//   document.getElementById('info-j2').innerHTML = '';
  
//   // Deshabilitar botón de inicio
//   document.getElementById('btn-iniciar').disabled = true;
// }

// // Inicializar la aplicación cuando se carga la página
// document.addEventListener('DOMContentLoaded', () => {
//   cargarPersonajes();
  
//   // Añadir event listener al botón de inicio
//   document.getElementById('btn-iniciar').addEventListener('click', iniciarCombate);
  
//   // Cerrar modal al hacer clic fuera de él
//   window.addEventListener('click', (event) => {
//     const modal = document.getElementById('modal-ganador');
//     if (event.target === modal) {
//       modal.style.display = 'none';
//     }
//   });
// }); 